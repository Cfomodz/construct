import { circleIntersection } from "./circle-intersect.mjs"
/* To test in REPL:
//import("./circle-intersect.mjs").then(module =>
//  { circleIntersection = module.circleIntersection })

// To use in REPL:
import("./tapster-3-kinematics.mjs").then(module => { inverse = module.inverse })
*/

// Example:
// > var end_effector = {x:0 , y: 0, z: -150}
// > console.log(inverse(end_effector))
// {
//   a: {
//     alphaInDegrees: 38.097759123032375,
//     betaInDegrees: 91.23475984385213,
//     gammaInDegrees: 0
//   },
//   b: {
//     alphaInDegrees: 38.097759123032375,
//     betaInDegrees: 91.23475984385213,
//     gammaInDegrees: 0
//   },
//   c: {
//     alphaInDegrees: 38.097759123032375,
//     betaInDegrees: 91.23475984385213,
//     gammaInDegrees: -0
//   }
// }

Math.TAU = Math.PI * 2
let cos120 = Math.round(Math.cos(120 / 360 * Math.TAU) * 100) / 100
let sin120 = Math.sin(120 / 360 * Math.TAU)

let getEndPrime = function(e) {
  let result = {x: 0, y: e.y, z: e.z}
  result.r = Math.sqrt((e.r ** 2) - (e.x ** 2))
  return result
}

let getDistance = function(f, e_prime) {
  // Find length between fixed point and end (prime) point
  // Use the distance formula (aka Pythagorean Theorem)
  let distance = Math.sqrt( ((f.y - e_prime.y) ** 2) + ((f.z - e_prime.z) ** 2))
  return distance
}

let getJoint = function(f, e) {
  // Use two circle intersection algorithm
  let result = circleIntersection(f.y, f.z, f.r, e.y, e.z, e.r)
  if (result[0] == 1) {
    let coords = result[1]
    // Get coordinate with smallest value of y
    if (coords[2] < coords[0]) {
      return {y: coords[2], z: coords[3]}
    } else {
      return {y: coords[0], z: coords[1]}
    }
  }
}

let getAlpha = function(f, j) {
  // Find first joint angle (alpha)
  // Use the arctangent trigonometry function
  let alphaInRadians = Math.atan2(-j.z, (f.y - j.y))
  let alphaInDegrees = (alphaInRadians / Math.TAU) * 360

  if (isNaN(alphaInRadians)) {
    throw new Error('No angle found')
  } else {
    return { radians: alphaInRadians, degrees: alphaInDegrees }
  }
}

let getBeta = function(f, e, distance) {
  // Find second joint angle (beta)
  // Law of Cosines - We know the three sides
  let betaInRadians = Math.acos( ( (f.r ** 2) + (e.r ** 2) - (distance ** 2) ) / (2 * f.r * e.r) )
  let betaInDegrees = (betaInRadians / Math.TAU) * 360
  return { radians: betaInRadians, degrees: betaInDegrees }
}

let getGamma = function(e) {
  // Find third joint angle (gamma)
  // Use the arcsine trigonometry function
  let gammaInRadians = Math.asin(e.x / e.r)
  let gammaInDegrees = (gammaInRadians / Math.TAU) * 360
  return { radians: gammaInRadians, degrees: gammaInDegrees }
}

let getAngles = function(effector, specs) {
  let end_offset = specs.end_offset
  let fixed_offset = specs.fixed_offset
  let end_radius = specs.end_radius
  let fixed_radius = specs.fixed_radius
  let fixed = {x: 0, y: fixed_offset, z: 0, r: fixed_radius}
  let end = {x:effector.x , y: effector.y + end_offset , z: effector.z, r: end_radius}

  let end_prime = getEndPrime(end)
  let distance = getDistance(fixed, end_prime)
  let joint = getJoint(fixed, end_prime)

  let result = {}
  if (!joint) {
    var err = new Error('Invalid end effector position')
    err.effector = effector
    throw err
  }
  result.alpha = getAlpha(fixed, joint)
  result.beta = getBeta(fixed, end_prime, distance)
  result.gamma = getGamma(end)

  if (result.alpha.degrees > 100) {
    throw new Error('Arm Limit Error: angle > 100')
  }
  if (result.alpha.degrees < -80) {
    throw new Error('Arm Limit Error: angle < -80')
  }
  return result
}

let inverse = function(e, s) {
  let result = {}
  // Arm assembly 1
  result.a = getAngles(e, s)
  // Arm assembly 2
  result.b = getAngles({x: (e.x * cos120 + e.y * sin120), y: (e.y * cos120 - e.x * sin120), z: e.z}, s)
  // Arm assembly 3
  result.c = getAngles({x: (e.x * cos120 - e.y * sin120), y: (e.y * cos120 + e.x * sin120), z: e.z}, s)
  return result
}

export { inverse }