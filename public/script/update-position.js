import { inverse } from "./tapster-3-kinematics.mjs"

Math.TAU = Math.PI * 2

// TODO, FIXME: Import these from either kinematics or scene description
let ceiling = 190
let servo_height_offset = (-28.5 / 2) - 5
let end_effector_offset = 7.50
let arm_offset = Math.acos(69.912/70)
console.log('arm_offset: ', arm_offset)

let updatePosition = function(scene) {
  var position = scene.getObjectByName("end-effector").position
  var angles = getInverseKinematics(position)

  if (angles) {
    // Arm Assembly 1
    var arm1 = scene.getObjectByName("upper-arm-assembly-1")
    arm1.rotation.x = angles.a.alpha.radians - arm_offset

    var upperUJointAssembly1 = scene.getObjectByName("upper-u-joint-assembly-1")
    upperUJointAssembly1.rotation.x = (270 / 360 * Math.TAU) - (angles.a.beta.radians - arm_offset)

    var lowerUJointAssembly1 = scene.getObjectByName("lower-u-joint-assembly-1")
    lowerUJointAssembly1.rotation.x = (90 / 360 * Math.TAU) - (angles.a.beta.radians - arm_offset)
    lowerUJointAssembly1.rotation.y = - angles.a.gamma.radians

    var lowerUJointRotationAxis1 = scene.getObjectByName("lower-u-joint-rotation-axis-1")
    lowerUJointRotationAxis1.rotation.y = angles.a.gamma.radians

    var linkageRotationAxis1 = scene.getObjectByName("linkage-rotation-axis-1")
    linkageRotationAxis1.rotation.x = (90 / 360 * Math.TAU) - (angles.a.beta.radians - arm_offset)
    linkageRotationAxis1.rotation.y = - angles.a.gamma.radians

    var linkageRotationAxis2 = scene.getObjectByName("linkage-rotation-axis-2")
    linkageRotationAxis2.rotation.x = (90 / 360 * Math.TAU) - (angles.a.beta.radians - arm_offset)
    linkageRotationAxis2.rotation.y = - angles.a.gamma.radians


    // Arm Assembly 2
    var arm2 = scene.getObjectByName("upper-arm-assembly-2")
    arm2.rotation.x = angles.b.alpha.radians - arm_offset

    var upperUJointAssembly2 = scene.getObjectByName("upper-u-joint-assembly-2")
    upperUJointAssembly2.rotation.x = (270 / 360 * Math.TAU) - (angles.b.beta.radians - arm_offset)

    var lowerUJointAssembly2 = scene.getObjectByName("lower-u-joint-assembly-2")
    lowerUJointAssembly2.rotation.x = (90 / 360 * Math.TAU) - (angles.b.beta.radians - arm_offset)
    lowerUJointAssembly2.rotation.y = - angles.b.gamma.radians

    var lowerUJointRotationAxis2 = scene.getObjectByName("lower-u-joint-rotation-axis-2")
    lowerUJointRotationAxis2.rotation.y = angles.b.gamma.radians

    var linkageRotationAxis3 = scene.getObjectByName("linkage-rotation-axis-3")
    linkageRotationAxis3.rotation.x = (90 / 360 * Math.TAU) - (angles.b.beta.radians - arm_offset)
    linkageRotationAxis3.rotation.y = - angles.b.gamma.radians

    var linkageRotationAxis4 = scene.getObjectByName("linkage-rotation-axis-4")
    linkageRotationAxis4.rotation.x = (90 / 360 * Math.TAU) - (angles.b.beta.radians - arm_offset)
    linkageRotationAxis4.rotation.y = - angles.b.gamma.radians


    // Arm Assembly 3
    var arm3 = scene.getObjectByName("upper-arm-assembly-3")
    arm3.rotation.x = angles.c.alpha.radians - arm_offset

    var upperUJointAssembly3 = scene.getObjectByName("upper-u-joint-assembly-3")
    upperUJointAssembly3.rotation.x = (270 / 360 * Math.TAU) - (angles.c.beta.radians - arm_offset)

    var lowerUJointAssembly3 = scene.getObjectByName("lower-u-joint-assembly-3")
    lowerUJointAssembly3.rotation.x = (90 / 360 * Math.TAU) - (angles.c.beta.radians - arm_offset)
    lowerUJointAssembly3.rotation.y = - angles.c.gamma.radians

    var lowerUJointRotationAxis3 = scene.getObjectByName("lower-u-joint-rotation-axis-3")
    lowerUJointRotationAxis3.rotation.y = angles.c.gamma.radians

    var linkageRotationAxis5 = scene.getObjectByName("linkage-rotation-axis-5")
    linkageRotationAxis5.rotation.x = (90 / 360 * Math.TAU) - (angles.c.beta.radians - arm_offset)
    linkageRotationAxis5.rotation.y = - angles.c.gamma.radians

    var linkageRotationAxis6 = scene.getObjectByName("linkage-rotation-axis-6")
    linkageRotationAxis6.rotation.x = (90 / 360 * Math.TAU) - (angles.c.beta.radians - arm_offset)
    linkageRotationAxis6.rotation.y = - angles.c.gamma.radians
  }
}

let getInverseKinematics = function(position) {
  try {
    let adjusted_position = {x: position.x, y: position.y, z: -1 * (ceiling + servo_height_offset - end_effector_offset - position.z)}
    // console.log('position.z: ', position.z)
    // console.log('adjusted_position: ', adjusted_position)
    return inverse(adjusted_position)
  } catch(err) {
    // console.log('error')
    return false
  }
}

export { updatePosition }