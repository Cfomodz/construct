# Tapster 3 Assembly
# (c) 2020 Jason R. Huggins
# It's okay to use CoffeeScript ☕

# No, really, pi is wrong
Math.TAU = Math.PI*2
arm_offset = Math.acos(69.912/70) / Math.TAU * 360

ceiling = 190
servo_height_offset = (-28.5 / 2) - 5
servo_width_offset = 44.6 / 2
end_effector_offset = 7.50
upper_arm_joint_width_offset = 23.50 / 2
u_fork_width = 13.30

end_effector = {x: 0, y: 0, z: -150}

a = {
  alpha: 38.097759123032375 - arm_offset,
  beta: 91.23475984385213 - arm_offset,
  gamma: 0
}

b = {
  alpha: 38.097759123032375 - arm_offset,
  beta: 91.23475984385213 - arm_offset,
  gamma: 0
}

c = {
  alpha: 38.097759123032375 - arm_offset,
  beta: 91.23475984385213 - arm_offset,
  gamma: 0
}

part
  name: 'base'
  source: '3d/tapster-3/base.stl'
  color: 0xDF1F1F
  translate: [0, 0, ceiling]
  rotate: [0, 180, 210]

part
  name: 'end-effector'
  source: '3d/tapster-3/end_effector.stl'
  color: 0xDF1F1F
  translate: [end_effector.x,
              end_effector.y,
              ceiling + servo_height_offset - end_effector_offset + end_effector.z]
  rotate: [0, 0, 0]

group
  name: 'arm-assembly-1'
  translate: [0, 0, ceiling]
  rotate: [0, 0, 0]
  visible: true
  parts: [
    {
    name: 'servo-1'
    source: '3d/tapster-3/xl-430.stl'
    color: 0x666666
    visible: true
    #translate: [-0, -14.75 - 3.25 - 32, -28.5 / 2 - 5]
    translate: [0, -50, servo_height_offset]
    rotate: [0, 90, 180]
    }
    {
    group:
      name: "base-screws-1"
      translate: [0, 0, 0]
      rotate: [0, 0, 0]
      visible: true
      parts: [
        # Left side - screws
        {
        name: 'shms-m2.5-14-001'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 17.5, -14.75 - 3.35, servo_height_offset + 11]
        rotate: [0, -90, 0]
        }
        {
        name: 'shms-m2.5-14-002'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 17.5, -14.75 - 3.35, servo_height_offset - 11]
        rotate: [0, -90, 0]
        }
        # Right side - screws
        {
        name: 'shms-m2.5-14-003'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 17.5, -14.75 - 3.35, servo_height_offset + 11]
        rotate: [0, 90, 0]
        }
        {
        name: 'shms-m2.5-14-004'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 17.5, -14.75 - 3.35, servo_height_offset - 11]
        rotate: [0, 90, 0]
        }
      ]
    }
    {
    group:
      name: "upper-arm-assembly-1"
      translate: [0, -50, servo_height_offset]
      rotate: [a.alpha, 0, 0]
      parts: [
        {
        name: 'arm-1'
        source: '3d/tapster-3/arm.stl'
        color: 0xDF1F1F
        visible: true
        translate: [0, 0 , 0]
        rotate: [0, 0, 0]
        }

        # Left side - screws
        {
        name: 'shms-m2-04-001'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 0 , 8]
        rotate: [90, -90, 0]
        }

        {
        name: 'shms-m2-04-002'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, -8 , 0]
        rotate: [90, -90, 0]
        }
        {
        name: 'shms-m2-04-003'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 0 , -8]
        rotate: [90, -90, 0]
        }
        {
        name: 'shms-m2-04-004'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 8 , 0]
        rotate: [90, -90, 0]
        }

        # Right side - screws
        {
        name: 'shms-m2-04-005'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 0 , 8]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-006'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 8 , 0]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-007'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 0 , -8]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-008'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, -8 , 0]
        rotate: [90, 90, 0]
        }
        {
        group:
          name: "upper-u-joint-assembly-1"
          translate: [0, -70, -3.5]
          rotate: [270 - a.beta, 0, 0]
          visible: true
          parts: [
            {
            name: 'u-joint-fork-001'
            source: '3d/tapster-3/u_joint_fork.stl'
            color: 0xDF1F1F
            visible: true
            translate: [-upper_arm_joint_width_offset, 0 , 0]
            rotate: [0, 0, 90]
            }
            {
            name: 'u-joint-fork-002'
            source: '3d/tapster-3/u_joint_fork.stl'
            color: 0xDF1F1F
            visible: true
            translate: [upper_arm_joint_width_offset, 0 , 0]
            rotate: [0, 0, -90]
            }
            {
            name: 'bhcs-m3-18-001'
            source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
            color: 0x666666
            visible: true
            translate: [-upper_arm_joint_width_offset - 13.5, 11.35, 0]
            rotate: [90, 0, 0]
            }
            {
            name: 'bhcs-m3-18-002'
            source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
            color: 0x666666
            visible: true
            translate: [upper_arm_joint_width_offset + 13.5, 11.35, 0]
            rotate: [90, 0, 0]
            }
            {
            name: 'hn-m3-nl-001'
            source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
            color: 0x777777
            visible: true
            translate: [-upper_arm_joint_width_offset - 13.5, 13.30/2 , 0]
            rotate: [-90, 0, 0]
            }
            {
            name: 'hn-m3-nl-002'
            source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
            color: 0x777777
            visible: true
            translate: [upper_arm_joint_width_offset + 13.5, 13.30/2 , 0]
            rotate: [-90, 0, 0]
            }
          ]
        }
        {
        group:
          name: "lower-u-joint-assembly-1"
          translate: [0, -70, -3.5]
          rotate: [90 - a.beta, -a.gamma, 0]
          visible: true
          parts: [
            group:
              name: "lower-u-joint-rotation-axis-1"
              translate: [0, 0, -133.5]
              rotate: [0, a.gamma, 0]
              parts: [
                {
                name: 'u-joint-fork-003'
                source: '3d/tapster-3/u_joint_fork.stl'
                color: 0xDF1F1F
                visible: true
                translate: [-upper_arm_joint_width_offset, 0, 0]
                rotate: [0, 0, 90]
                }
                {
                name: 'u-joint-fork-004'
                source: '3d/tapster-3/u_joint_fork.stl'
                color: 0xDF1F1F
                visible: true
                translate: [upper_arm_joint_width_offset, 0, 0]
                rotate: [0, 0, -90]
                }
                {
                name: 'bhcs-m3-18-003'
                source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
                color: 0x666666
                visible: true
                translate: [-upper_arm_joint_width_offset - 13.5, -11.35 , 0]
                rotate: [-90, 0, 0]
                }
                {
                name: 'bhcs-m3-18-004'
                source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
                color: 0x666666
                visible: true
                translate: [upper_arm_joint_width_offset + 13.5, -11.35 , 0]
                rotate: [-90, 0, 0]
                }
                {
                name: 'hn-m3-nl-003'
                source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
                color: 0x777777
                visible: true
                translate: [-upper_arm_joint_width_offset - 13.5, -13.30/2 , 0]
                rotate: [90, 0, 0]
                }
                {
                name: 'hn-m3-nl-004'
                source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
                color: 0x777777
                visible: true
                translate: [upper_arm_joint_width_offset + 13.5, -13.30/2 , 0]
                rotate: [90, 0, 0]
                }
              ]
          ]
        }
        {
        group:
          name: "linkage-assembly-1"
          translate: [0, -70, -3.5]
          rotate: [0, 0, 0]
          visible: true
          parts: [
            group:
              name: "linkage-rotation-axis-1"
              translate: [-upper_arm_joint_width_offset - 13.5, 0, 0]
              rotate: [90 - a.beta, -a.gamma, 0]
              parts: [
                {
                name: 'rod-118mm-001'
                source: '3d/tapster-3/rod-118mm.stl'
                color: 0x666666
                visible: true
                translate: [0, 0 , -7.75]
                rotate: [180, 0, 0]
                }
                {
                name: 'rod-end-001'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'ball-001'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'rod-end-002'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 180, 0]
                }
                {
                name: 'ball-002'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 0, 0]
                }
              ]
          ]
        }
        {
        group:
          name: "linkage-assembly-2"
          translate: [0, -70, -3.5]
          rotate: [0, 0, 0]
          visible: true
          parts: [
            group:
              name: "linkage-rotation-axis-2"
              translate: [upper_arm_joint_width_offset + 13.5, 0, 0]
              rotate: [90 - a.beta, -a.gamma, 0]
              parts: [
                {
                name: 'rod-118mm-002'
                source: '3d/tapster-3/rod-118mm.stl'
                color: 0x666666
                visible: true
                translate: [0, 0 , -7.75]
                rotate: [180, 0, 0]
                }
                {
                name: 'rod-end-003'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'ball-003'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'rod-end-004'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 180, 0]
                }
                {
                name: 'ball-004'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 0, 0]
                }
              ]
          ]
        }
      ]
    }
 ]

group
  name: 'arm-assembly-2'
  translate: [0, 0, ceiling]
  rotate: [0, 0, 120]
  visible: true
  parts: [
    {
    name: 'servo-2'
    source: '3d/tapster-3/xl-430.stl'
    color: 0x666666
    visible: true
    translate: [0, -50, servo_height_offset]
    rotate: [0, 90, 180]
    }
    {
    group:
      name: "base-screws-2"
      translate: [0, 0, 0]
      rotate: [0, 0, 0]
      visible: true
      parts: [
        # Left side - screws
        {
        name: 'shms-m2.5-14-005'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 17.5, -14.75 - 3.35, servo_height_offset + 11]
        rotate: [0, -90, 0]
        }
        {
        name: 'shms-m2.5-14-006'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 17.5, -14.75 - 3.35, servo_height_offset - 11]
        rotate: [0, -90, 0]
        }
        # Right side - screws
        {
        name: 'shms-m2.5-14-007'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 17.5, -14.75 - 3.35, servo_height_offset + 11]
        rotate: [0, 90, 0]
        }
        {
        name: 'shms-m2.5-14-008'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 17.5, -14.75 - 3.35, servo_height_offset - 11]
        rotate: [0, 90, 0]
        }
      ]
    }
    {
    group:
      name: "upper-arm-assembly-2"
      translate: [0, -50, servo_height_offset]
      rotate: [b.alpha, 0, 0]
      parts: [
        {
        name: 'arm-2'
        source: '3d/tapster-3/arm.stl'
        color: 0xDF1F1F
        visible: true
        translate: [0, 0 , 0]
        rotate: [0, 0, 0]
        }

        # Left side - screws
        {
        name: 'shms-m2-04-009'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 0 , 8]
        rotate: [90, -90, 0]
        }

        {
        name: 'shms-m2-04-010'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, -8 , 0]
        rotate: [90, -90, 0]
        }
        {
        name: 'shms-m2-04-011'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 0 , -8]
        rotate: [90, -90, 0]
        }
        {
        name: 'shms-m2-04-012'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 8 , 0]
        rotate: [90, -90, 0]
        }

        # Right side - screws
        {
        name: 'shms-m2-04-013'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 0 , 8]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-014'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 8 , 0]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-015'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 0 , -8]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-016'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, -8 , 0]
        rotate: [90, 90, 0]
        }
        {
        group:
          name: "upper-u-joint-assembly-2"
          translate: [0, -70, -3.5]
          rotate: [270 - b.beta, 0, 0]
          visible: true
          parts: [
            {
            name: 'u-joint-fork-005'
            source: '3d/tapster-3/u_joint_fork.stl'
            color: 0xDF1F1F
            visible: true
            translate: [-upper_arm_joint_width_offset, 0 , 0]
            rotate: [0, 0, 90]
            }
            {
            name: 'u-joint-fork-006'
            source: '3d/tapster-3/u_joint_fork.stl'
            color: 0xDF1F1F
            visible: true
            translate: [upper_arm_joint_width_offset, 0 , 0]
            rotate: [0, 0, -90]
            }
            {
            name: 'bhcs-m3-18-005'
            source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
            color: 0x666666
            visible: true
            translate: [-upper_arm_joint_width_offset - 13.5, 11.35 , 0]
            rotate: [90, 0, 0]
            }
            {
            name: 'bhcs-m3-18-006'
            source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
            color: 0x666666
            visible: true
            translate: [upper_arm_joint_width_offset + 13.5, 11.35 , 0]
            rotate: [90, 0, 0]
            }
            {
            name: 'hn-m3-nl-005'
            source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
            color: 0x777777
            visible: true
            translate: [-upper_arm_joint_width_offset - 13.5, 13.30/2 , 0]
            rotate: [-90, 0, 0]
            }
            {
            name: 'hn-m3-nl-006'
            source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
            color: 0x777777
            visible: true
            translate: [upper_arm_joint_width_offset + 13.5, 13.30/2 , 0]
            rotate: [-90, 0, 0]
            }
          ]
        }

        {
        group:
          name: "lower-u-joint-assembly-2"
          translate: [0, -70, -3.5]
          rotate: [90 - b.beta, -b.gamma, 0]
          visible: true
          parts: [
            group:
              name: "lower-u-joint-rotation-axis-2"
              translate: [0, 0, -133.5]
              rotate: [0, b.gamma, 0]
              parts: [
                {
                name: 'u-joint-fork-007'
                source: '3d/tapster-3/u_joint_fork.stl'
                color: 0xDF1F1F
                visible: true
                translate: [-upper_arm_joint_width_offset, 0, 0]
                rotate: [0, 0, 90]
                }
                {
                name: 'u-joint-fork-008'
                source: '3d/tapster-3/u_joint_fork.stl'
                color: 0xDF1F1F
                visible: true
                translate: [upper_arm_joint_width_offset, 0, 0]
                rotate: [0, 0, -90]
                }
                {
                name: 'bhcs-m3-18-007'
                source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
                color: 0x666666
                visible: true
                translate: [-upper_arm_joint_width_offset - 13.5, -11.35 , 0]
                rotate: [-90, 0, 0]
                }
                {
                name: 'bhcs-m3-18-008'
                source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
                color: 0x666666
                visible: true
                translate: [upper_arm_joint_width_offset + 13.5, -11.35 , 0]
                rotate: [-90, 0, 0]
                }
                {
                name: 'hn-m3-nl-007'
                source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
                color: 0x777777
                visible: true
                translate: [-upper_arm_joint_width_offset - 13.5, -13.30/2 , 0]
                rotate: [90, 0, 0]
                }
                {
                name: 'hn-m3-nl-008'
                source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
                color: 0x777777
                visible: true
                translate: [upper_arm_joint_width_offset + 13.5, -13.30/2 , 0]
                rotate: [90, 0, 0]
                }
              ]
          ]
        }
        {
        group:
          name: "linkage-assembly-3"
          translate: [0, -70, -3.5]
          rotate: [0, 0, 0]
          parts: [
            group:
              name: "linkage-rotation-axis-3"
              translate: [-upper_arm_joint_width_offset - 13.5, 0, 0]
              rotate: [90 - b.beta, -b.gamma, 0]
              parts: [
                {
                name: 'rod-118mm-003'
                source: '3d/tapster-3/rod-118mm.stl'
                color: 0x666666
                visible: true
                translate: [0, 0 , -7.75]
                rotate: [180, 0, 0]
                }
                {
                name: 'rod-end-005'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'ball-005'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'rod-end-006'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 180, 0]
                }
                {
                name: 'ball-006'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 0, 0]
                }
              ]
          ]
        }
        {
        group:
          name: "linkage-assembly-4"
          translate: [0, -70, -3.5]
          rotate: [0, 0, 0]
          parts: [
            group:
              name: "linkage-rotation-axis-4"
              translate: [upper_arm_joint_width_offset + 13.5, 0, 0]
              rotate: [90 - b.beta, -b.gamma, 0]
              parts: [
                {
                name: 'rod-118mm-004'
                source: '3d/tapster-3/rod-118mm.stl'
                color: 0x666666
                visible: true
                translate: [0, 0 , -7.75]
                rotate: [180, 0, 0]
                }
                {
                name: 'rod-end-007'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'ball-007'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'rod-end-008'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 180, 0]
                }
                {
                name: 'ball-008'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 0, 0]
                }
              ]
          ]
        }
      ]
    }
  ]

group
  name: 'arm-assembly-3'
  translate: [0, 0, ceiling]
  rotate: [0, 0, - 120]
  visible: true
  parts: [
    {
    name: 'servo-3'
    source: '3d/tapster-3/xl-430.stl'
    color: 0x666666
    visible: true
    translate: [0, -50, servo_height_offset]
    rotate: [0, 90, 180]
    }
    {
    group:
      name: "base-screws-3"
      translate: [0, 0, 0]
      rotate: [0, 0, 0]
      visible: true
      parts: [
        # Left side - screws
        {
        name: 'shms-m2.5-14-009'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 17.5, -14.75 - 3.35, servo_height_offset + 11]
        rotate: [0, -90, 0]
        }
        {
        name: 'shms-m2.5-14-010'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 17.5, -14.75 - 3.35, servo_height_offset - 11]
        rotate: [0, -90, 0]
        }
        # Right side - screws
        {
        name: 'shms-m2.5-14-011'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 17.5, -14.75 - 3.35, servo_height_offset + 11]
        rotate: [0, 90, 0]
        }
        {
        name: 'shms-m2.5-14-012'
        source: '3d/tapster-3/socket-head-machine-screw-M2.5-14.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 17.5, -14.75 - 3.35, servo_height_offset - 11]
        rotate: [0, 90, 0]
        }
      ]
    }
    {
    group:
      name: "upper-arm-assembly-3"
      translate: [0, -50, servo_height_offset]
      rotate: [c.alpha, 0, 0]
      parts: [
        {
        name: 'arm-3'
        source: '3d/tapster-3/arm.stl'
        color: 0xDF1F1F
        visible: true
        translate: [0, 0 , 0]
        rotate: [0, 0, 0]
        }

        # Left side - screws
        {
        name: 'shms-m2-04-017'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 0 , 8]
        rotate: [90, -90, 0]
        }

        {
        name: 'shms-m2-04-018'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, -8 , 0]
        rotate: [90, -90, 0]
        }
        {
        name: 'shms-m2-04-019'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 0 , -8]
        rotate: [90, -90, 0]
        }
        {
        name: 'shms-m2-04-020'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [-servo_width_offset + 6, 8 , 0]
        rotate: [90, -90, 0]
        }

        # Right side - screws
        {
        name: 'shms-m2-04-021'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 0 , 8]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-022'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 8 , 0]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-023'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, 0 , -8]
        rotate: [90, 90, 0]
        }
        {
        name: 'shms-m2-04-024'
        source: '3d/tapster-3/socket-head-machine-screw-M2-04.stl'
        color: 0x666666
        visible: true
        translate: [servo_width_offset - 6, -8 , 0]
        rotate: [90, 90, 0]
        }
        {
        group:
          name: "upper-u-joint-assembly-3"
          translate: [0, -70, -3.5]
          rotate: [270 - c.beta, 0, 0]
          visible: true
          parts: [
            {
            name: 'u-joint-fork-009'
            source: '3d/tapster-3/u_joint_fork.stl'
            color: 0xDF1F1F
            visible: true
            translate: [-upper_arm_joint_width_offset, 0 , 0]
            rotate: [0, 0, 90]
            }
            {
            name: 'u-joint-fork-010'
            source: '3d/tapster-3/u_joint_fork.stl'
            color: 0xDF1F1F
            visible: true
            translate: [upper_arm_joint_width_offset, 0 , 0]
            rotate: [0, 0, -90]
            }
            {
            name: 'bhcs-m3-18-009'
            source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
            color: 0x666666
            visible: true
            translate: [-upper_arm_joint_width_offset - 13.5, 11.35 , 0]
            rotate: [90, 0, 0]
            }
            {
            name: 'bhcs-m3-18-010'
            source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
            color: 0x666666
            visible: true
            translate: [upper_arm_joint_width_offset + 13.5, 11.35 , 0]
            rotate: [90, 0, 0]
            }
            {
            name: 'hn-m3-nl-009'
            source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
            color: 0x777777
            visible: true
            translate: [-upper_arm_joint_width_offset - 13.5, 13.30/2 , 0]
            rotate: [-90, 0, 0]
            }
            {
            name: 'hn-m3-nl-010'
            source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
            color: 0x777777
            visible: true
            translate: [upper_arm_joint_width_offset + 13.5, 13.30/2 , 0]
            rotate: [-90, 0, 0]
            }
          ]
        }
        {
        group:
          name: "lower-u-joint-assembly-3"
          translate: [0, -70, -3.5]
          rotate: [90 - c.beta, -c.gamma, 0]
          visible: true
          parts: [
            group:
              name: "lower-u-joint-rotation-axis-3"
              translate: [0, 0, -133.5]
              rotate: [0, c.gamma, 0]
              parts: [
                {
                name: 'u-joint-fork-011'
                source: '3d/tapster-3/u_joint_fork.stl'
                color: 0xDF1F1F
                visible: true
                translate: [-upper_arm_joint_width_offset, 0, 0]
                rotate: [0, 0, 90]
                }
                {
                name: 'u-joint-fork-012'
                source: '3d/tapster-3/u_joint_fork.stl'
                color: 0xDF1F1F
                visible: true
                translate: [upper_arm_joint_width_offset, 0, 0]
                rotate: [0, 0, -90]
                }
                {
                name: 'bhcs-m3-18-011'
                source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
                color: 0x666666
                visible: true
                translate: [-upper_arm_joint_width_offset - 13.5, -11.35 , 0]
                rotate: [-90, 0, 0]
                }
                {
                name: 'bhcs-m3-18-012'
                source: '3d/tapster-3/button-head-cap-screw-M3-18.stl'
                color: 0x666666
                visible: true
                translate: [upper_arm_joint_width_offset + 13.5, -11.35 , 0]
                rotate: [-90, 0, 0]
                }
                {
                name: 'hn-m3-nl-011'
                source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
                color: 0x777777
                visible: true
                translate: [-upper_arm_joint_width_offset - 13.5, -13.30/2 , 0]
                rotate: [90, 0, 0]
                }
                {
                name: 'hn-m3-nl-012'
                source: '3d/tapster-3/hex-nut-m3-nyloc.stl'
                color: 0x777777
                visible: true
                translate: [upper_arm_joint_width_offset + 13.5, -13.30/2 , 0]
                rotate: [90, 0, 0]
                }
              ]
          ]
        }
        {
        group:
          name: "linkage-assembly-5"
          translate: [0, -70, -3.5]
          rotate: [0, 0, 0]
          parts: [
            group:
              name: "linkage-rotation-axis-5"
              translate: [-upper_arm_joint_width_offset - 13.5, 0, 0]
              rotate: [90 - c.beta, -c.gamma, 0]
              parts: [
                {
                name: 'rod-118mm-005'
                source: '3d/tapster-3/rod-118mm.stl'
                color: 0x666666
                visible: true
                translate: [0, 0 , -7.75]
                rotate: [180, 0, 0]
                }
                {
                name: 'rod-end-09'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'ball-009'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'rod-end-010'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 180, 0]
                }
                {
                name: 'ball-010'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 0, 0]
                }
              ]
          ]
        }
        {
        group:
          name: "linkage-assembly-6"
          translate: [0, -70, -3.5]
          rotate: [0, 0, 0]
          parts: [
            group:
              name: "linkage-rotation-axis-6"
              translate: [upper_arm_joint_width_offset + 13.5, 0, 0]
              rotate: [90 - c.beta, -c.gamma, 0]
              parts: [
                {
                name: 'rod-118mm-006'
                source: '3d/tapster-3/rod-118mm.stl'
                color: 0x666666
                visible: true
                translate: [0, 0 , -7.75]
                rotate: [180, 0, 0]
                }
                {
                name: 'rod-end-011'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'ball-011'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , 0]
                rotate: [0, 0, 0]
                }
                {
                name: 'rod-end-012'
                source: '3d/tapster-3/rod-end.stl'
                color: 0x333333
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 180, 0]
                }
                {
                name: 'ball-012'
                source: '3d/tapster-3/traxxas-5347-hollow-ball.stl'
                color: 0xAAAAAA
                visible: true
                translate: [0, 0 , -133.5]
                rotate: [0, 0, 0]
                }
              ]
          ]
        }
      ]
    }
  ]