import {circleIntersection} from "./circle-intersect.mjs"
/* In REPL:
import("./circle-intersect.mjs").then(module =>
  { circleIntersection = module.circleIntersection })
*/

Math.TAU = Math.PI * 2
var cos120 = Math.round(Math.cos(120 / 360 * Math.TAU) * 100) / 100
var sin120 = Math.sin(120 / 360 * Math.TAU)

var end_offset = -25
var fixed_offset = -50
var end_radius = 133.5
var fixed_radius = 70

var getEndPrime = function(e) {
  let result = {x: 0, y: e.y, z: e.z}
  result.r = Math.sqrt((e.r ** 2) - (e.x ** 2))
  return result
}

var getDistance = function(f, e_prime) {
  // Find length between fixed point and end (prime) point
  // Use the distance formula (aka Pythagorean Theorem)  
  let distance = Math.sqrt( ((f.y - e_prime.y) ** 2) + ((f.z - e_prime.z) ** 2))
  return distance
}

var getJoint = function(f, e) {
  // Use two circle intersection algorithm
  let result = circleIntersection(f.y, f.z, f.r, e.y, e.z, e.r)
  if (result[0] == 1) {
    var coords = result[1]
    // Get coordinate with smallest value of y
    if (coords[2] < coords[0]) {
      return {y: coords[2], z: coords[3]}
    } else {
      return {y: coords[0], z: coords[1]}
    }
  }
}

var getAlpha = function(f, j) {
  // Find first joint angle (alpha)
  // Use the arctangent trigonometry function
  let alphaInRadians = Math.atan(-j.z / (f.y - j.y))
  let alphaInDegrees = (alphaInRadians / Math.TAU) * 360
  return alphaInDegrees
}

var getBeta = function(f, e, distance) {
  // Find second joint angle (beta)
  // Law of Cosines - We know the three sides
  let betaInRadians = Math.acos( ( (f.r ** 2) + (e.r ** 2) - (distance ** 2) ) / (2 * f.r * e.r) )
  let betaInDegrees = (betaInRadians / Math.TAU) * 360
  return betaInDegrees
}

var getGamma = function(e) {
  // Find third joint angle (gamma)
  // Use the arcsine trigonometry function
  let gammaInRadians = Math.asin(e.x / e.r)
  let gammaInDegrees = (gammaInRadians / Math.TAU) * 360
  return gammaInDegrees
}

var inverse = function(effector) {
  var fixed = {x: 0, y: fixed_offset, z: 0, r: fixed_radius}
  var end = {x:effector.x , y: effector.y + end_offset , z: effector.z, r: end_radius}

  var end_prime = getEndPrime(end)
  let distance = getDistance(fixed, end_prime)
  var joint = getJoint(fixed, end_prime)

  let result = {}
  result.alphaInDegrees = getAlpha(fixed, joint)
  result.betaInDegrees = getBeta(fixed, end_prime, distance)
  result.gammaInDegrees = getGamma(end)
  return result
}

//var e = {x:0 , y: 0, z: -150}

// Arm assembly 1
//console.log(inverse(e))

// Arm assembly 2
//console.log(inverse({x: (e.x * cos120 + e.y * sin120), y: (e.y * cos120 - e.x * sin120), z: e.z}))

// Arm assembly 3
//console.log(inverse({x: (e.x * cos120 - e.y * sin120), y: (e.y * cos120 + e.x * sin120), z: e.z}))

export { inverse }