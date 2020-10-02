import {circleIntersection} from "./circle-intersect.mjs"
// In REPL:
// import("./circle-intersect.mjs").then(module =>
      { circleIntersection = module.circleIntersection })

Math.TAU = Math.PI * 2

let fixed = {y: -50, z: 0, r: 70}
let end = {y: -25, z: -150, r: 133.5}

var findJoint = function(f,e) {
  var result = circleIntersection(f.y, f.z, f.r, e.y, e.z, e.r)
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

//var findAngleYZ = function() {
  // 1) Find joint point
  // Use two circle intersection algorithm
  var joint = findJoint(fixed, end)

  // 2) Find first joint angle (theta)
  // Use the arctangent trigonometry function
  var thetaInRadians = Math.atan(-joint.z / (fixed.y - joint.y))
  var thetaInDegrees = (thetaInRadians / Math.TAU) * 360

  // 3) Find length between fixed point and end effector point
  // Use the distance formula (aka Pythagorean Theorem)
  let distance = Math.sqrt( (fixed.y - end.y) ** 2 + (fixed.z - end.z) ** 2)

  // 4) Find second joint angle (gamma)
  // Law of Cosines - We know the three sides
  var gammaInRadians = Math.acos(((fixed.r ** 2) + (end.r ** 2) - (distance ** 2) ) /
                                  (2 * fixed.r * end.r))
  var gammaInDegrees = (gammaInRadians / Math.TAU) * 360
//}

// Result:
(function result() {
  console.log('joint: [' + joint.y + ', ' + joint.z + ']')
  console.log('distance: ' + distance)
  console.log('theta: ' + thetaInDegrees)
  console.log('gamma: ' + gammaInDegrees)
})()