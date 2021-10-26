// "This is the Construct. It's our loading program. We
// can load anything... From clothing to equipment,
// weapons, training simulations; anything we need."
// —Morpheus

import * as THREE from './vendor/three.module.js'
import * as TWEEN from './vendor/tween.esm.js'
import './vendor/nipplejs.js'
import { STLLoader } from './vendor/STLLoader.js'
import { WEBGL } from './vendor/WebGL.js'
import { OrbitControls } from './vendor/OrbitControls.js'
import { TransformControls } from './vendor/TransformControls.js'
import { updatePosition, getInverseKinematics } from "./update-position.js"

var scene, camera, plane, qrcodeobj, graph, renderer, container, controls, transformControl,
    objectHovered, objectFocusAtMouseDown, objectFocusAtMouseUp, dragcontrols,
    isMouseDown = false, onMouseDownPosition, mouse, raycaster, offset, stats;

init()
animate()

function init() {

  stats = new Stats();
  stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
  //document.body.appendChild( stats.dom )


  THREE.Object3D.DefaultUp.set(0, 0, 1)

  onMouseDownPosition = new THREE.Vector2()

  mouse = new THREE.Vector2()
  raycaster = new THREE.Raycaster()
  offset = new THREE.Vector3()

  // Scene
  scene = new THREE.Scene()

  // Camera
  var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight
  var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR)
  camera.up.set(0,0,1)
  scene.add(camera)
  window.camera = camera

  // Load camera position, if present
  if (localStorage.hasOwnProperty('cameraPosition')) {
    var cameraPosition = JSON.parse(localStorage.getItem('cameraPosition'))
    camera.position.x = cameraPosition.x
    camera.position.y = cameraPosition.y
    camera.position.z = cameraPosition.z
  } else {
    camera.position.set(-75,-250,300)
  }

  // // Load camera target, if present
  // if (localStorage.hasOwnProperty('target')) {
  //   var target = JSON.parse(localStorage.getItem('target'))
  //   camera.lookAt(target.x, target.y, target.z)
  // } else {
  //   camera.lookAt(scene.position)
  // }

  // Plane
  var planeW = 4
  var planeH = 4
  var texture = new THREE.TextureLoader().load( 'image/wood-floor-2.jpg' )

  texture.repeat.set( 4, 4 )
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping

  plane = new THREE.Mesh( new THREE.CubeGeometry( planeW*100, planeH*100, 2),
                          new THREE.MeshBasicMaterial( {
                            //color: 0x000000,
                            wireframe: false,
                            opacity:.6,
                            map: texture,
                            transparent: true
                          } ) )

  plane.rotation.z = -Math.PI/2
  plane.position.set(0, 0, 0 )
  plane.name = "plane"
  plane.visible = true
  scene.add(plane)

  // // Plane
  // var QRtexture = new THREE.TextureLoader().load( 'image/construct-url.png' )
  //
  // QRtexture.repeat.set( 1, 1 )
  // QRtexture.wrapS = THREE.RepeatWrapping
  // QRtexture.wrapT = THREE.RepeatWrapping
  //
  // qrcodeobj = new THREE.Mesh( new THREE.CubeGeometry( 20, 20, .1),
  //                         new THREE.MeshBasicMaterial( {
  //                           //color: 0x000000,
  //                           wireframe: false,
  //                           opacity:1,
  //                           map: QRtexture,
  //                           transparent: true
  //                         } ) )
  //
  // qrcodeobj.rotation.z = -Math.PI/2
  // qrcodeobj.position.set(0, 0, 155 )
  // qrcodeobj.name = "plane"
  // qrcodeobj.visible = true
  // scene.add(qrcodeobj)


  // graph = new THREE.Mesh( new THREE.CubeGeometry( planeW*100, planeH*100, 2),
  //                         new THREE.MeshBasicMaterial( {
  //                           color: 0xdddddd,
  //                           wireframe: false,
  //                           opacity:.6,
  //                           transparent: true
  //                         } ) )
  // graph.rotation.y = Math.PI/2
  // graph.name = "graph"
  // graph.visible = true
  // scene.add(graph)
  //
  // var gridHelper = new THREE.GridHelper( planeW*100, planeH*100/10 )
  // gridHelper.rotation.z = Math.PI/2
  // gridHelper.name = "grid"
  // gridHelper.visible = true
  // scene.add(gridHelper)

  // Lights
  var ambientLight = new THREE.AmbientLight( 0x000000 )
  scene.add( ambientLight )


  // var light = new THREE.SpotLight( 0xffffff, 1.5 )
  // light.position.set( 0, -150, 200 )
  // light.castShadow = true
  // light.shadow.camera.near = 200
  // light.shadow.camera.far = camera.far
  // light.shadow.camera.fov = 70
  // light.shadow.bias = -0.000222
  // light.shadow.darkness = 0.25
  // light.shadow.mapSize.width = 1024
  // light.shadow.mapSize.height = 1024
  // scene.add( light )
  // var spotlight = light

  var light = new THREE.SpotLight( 0xffffff, 1.5 )
  light.position.set( 0, -250, 200 )
  light.castShadow = true
  light.shadow.camera.near = 200
  light.shadow.camera.far = camera.far
  light.shadow.camera.fov = 70
  light.shadow.bias = -0.000222
  light.shadow.darkness = 0.25
  light.shadow.mapSize.width = 1024
  light.shadow.mapSize.height = 1024
  scene.add( light )
  var spotlight = light

  var directionalLight = new THREE.DirectionalLight( 0xffffff )
  directionalLight.position.x = 1
  directionalLight.position.y = 1
  directionalLight.position.z = .75
  directionalLight.position.normalize()
  scene.add( directionalLight )

  var directionalLight = new THREE.DirectionalLight( 0x808080 )
  directionalLight.position.x = -1
  directionalLight.position.y = 1
  directionalLight.position.z = -0.75
  directionalLight.position.normalize()
  scene.add( directionalLight )

  var directionalLight = new THREE.DirectionalLight( 0xfffff )
  directionalLight.position.x = 1
  directionalLight.position.y = 800
  directionalLight.position.z = .75
  directionalLight.position.normalize()
  scene.add( directionalLight )

  var directionalLight = new THREE.DirectionalLight( 0xfffff )
  directionalLight.position.x = 0
  directionalLight.position.y = -100
  directionalLight.position.z = 100
  directionalLight.position.normalize()
  scene.add( directionalLight )

  var directionalLight = new THREE.DirectionalLight( 0xffffff )
  directionalLight.position.x = -50
  directionalLight.position.y = -50
  directionalLight.position.z = -100
  directionalLight.position.normalize()
  scene.add( directionalLight )


  if ( WEBGL.isWebGLAvailable() ) {
    renderer = new THREE.WebGLRenderer( { antialias: true } )
  } else {
    var warning = WEBGL.getWebGLErrorMessage()
    document.getElementById( 'canvas' ).appendChild( warning )
  }

  //renderer.setSize(400, 400);
  renderer.setClearColor( 0xffffff )
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
  renderer.shadowMap.enabled = true
  container = document.getElementById( 'canvas' )
  container.appendChild( renderer.domElement )

  // Controls
  controls = new OrbitControls( camera, renderer.domElement, scene)
  controls.autoRotate = false
  controls.target.z = 90

  // Events
  THREEx.WindowResize(renderer, camera)
  window.scene = scene

  if (camera.position.z <= 0) {
    plane.visible = false
  } else {
    plane.visible = true
  }

  window.utils = {
    cameraLookDir: function(camera) {
      var vector = new THREE.Vector3(0, 0, -1)
      vector.applyEuler(camera.rotation, camera.rotation.order)
      return {x: vector.x, y: vector.y, z: vector.z}
    }
  }

   ////////////////////////////////////////
   var xy_stick = nipplejs.create({
     zone: document.getElementById('jLeft'),
     mode: 'static',
     position: {left: '60px'},
     size: 80,
     restOpacity: .3,
     color: 'black',
     shape: 'square'
   })

   var previous_xy_force = 0
   var xy_interval

   xy_stick.on('end', function (evt, data) {
     if (xy_interval) {
       clearInterval(xy_interval)
       xy_interval = null
     }
   })

   xy_stick.on('move dir', function (evt, data) {
     var position = scene.getObjectByName("end-effector").position

     // Don't move while we're near the center...
     if (data.force < .5) {
       if (xy_interval) {
         clearInterval(xy_interval)
         xy_interval = null
       }
       previous_xy_force = data.force
       return
     }

     // Stop moving if we've switched directions...
     if (data.force < previous_xy_force) {
       if (xy_interval) {
         clearInterval(xy_interval)
         xy_interval = null
       }
       previous_xy_force = data.force
       return
     }

     // We're okay to move!
     console.log(data.direction.angle)
     if (data.direction.angle == 'left') {  // -X
       if (!xy_interval) {
         xy_interval = setInterval( function(scene) {
           var position = scene.getObjectByName("end-effector").position
           if (getInverseKinematics({x: position.x - 1, y: position.y, z: position.z})) {
             position.x -= 1
             updatePosition(scene)
           }
         }, 10, scene);
       }
     } else if (data.direction.angle == 'right') {  // +X
       if (!xy_interval) {
         xy_interval = setInterval( function(scene) {
           var position = scene.getObjectByName("end-effector").position
           if (getInverseKinematics({x: position.x + 1, y: position.y, z: position.z})) {
             position.x += 1
             updatePosition(scene)
           }
         }, 10, scene)
       }
     } else if (data.direction.angle == 'up') {  // +Y
       if (!xy_interval) {
         xy_interval = setInterval( function(scene) {
           var position = scene.getObjectByName("end-effector").position
           if (getInverseKinematics({x: position.x, y: position.y + 1, z: position.z})) {
             position.y += 1
             updatePosition(scene)
           }
         }, 10, scene);
       }
     } else if (data.direction.angle == 'down') {  // -Y
       if (!xy_interval) {
         xy_interval = setInterval( function(scene) {
           var position = scene.getObjectByName("end-effector").position
           if (getInverseKinematics({x: position.x, y: position.y - 1, z: position.z})) {
             position.y -= 1
             updatePosition(scene)
           }
         }, 10, scene);
       }
     }
     previous_xy_force = data.force
   })

   ////////////////////////////////////////
   var z_stick = nipplejs.create({
     zone: document.getElementById('jRight'),
     mode: 'static',
     position: {left: '-60px', top: '90%'},
     size: 80,
     restOpacity: .3,
     lockY: true,
     color: 'black',
     shape: 'square'
   })

   var previous_z_force = 0
   var z_interval

   z_stick.on('end', function (evt, data) {
     if (z_interval) {
       clearInterval(z_interval)
       z_interval = null
     }
   })

   z_stick.on('move dir', function (evt, data) {
     var position = scene.getObjectByName("end-effector").position

     // Don't move while we're near the center...
     if (data.force < .6) {
       if (z_interval) {
         clearInterval(z_interval)
         z_interval = null
       }
       previous_z_force = data.force
       return
     }

     // Stop moving if we've switched directions...
     if (data.force < previous_z_force) {
       if (z_interval) {
         clearInterval(z_interval)
         z_interval = null
       }
       previous_z_force = data.force
       return
     }

     // We're okay to move!
     if (data.direction.angle == 'up') {  // +Z
       if (!z_interval) {
         z_interval = setInterval( function(scene) {
           var position = scene.getObjectByName("end-effector").position
           if (getInverseKinematics({x: position.x, y: position.y, z: position.z + 1})) {
             position.z += 1
             updatePosition(scene)
           }
         }, 10, scene);
       }
     } else {  // -Z
       if (!z_interval) {
         z_interval = setInterval( function(scene) {
           var position = scene.getObjectByName("end-effector").position
           if (getInverseKinematics({x: position.x, y: position.y, z: position.z - 1})) {
             if (position.z - 1 > 2) {
               position.z -= 1
               updatePosition(scene)
             }
           }
         }, 10, scene);
       }
     }
     previous_z_force = data.force
   })


}


function animate() {
  requestAnimationFrame( animate )
  stats.begin()
  controls.update()
  TWEEN.default.update()
  renderer.render( scene, camera )
  stats.end()
}

function render() {
  renderer.render( scene, camera )
}

window.TAU = Math.TAU = Math.PI*2

window.group = function(options) {

  if (options.hasOwnProperty('name')) {
    var name = options.name
  } else {
    var name = true
  }

  if (options.hasOwnProperty('visible')) {
    var visible = options.visible
  } else {
    var visible = true
  }

  if (options.hasOwnProperty('translate')) {
    var x = options.translate[0]
    var y = options.translate[1]
    var z = options.translate[2]
  } else {
    var x = 0
    var y = 0
    var z = 0
  }

  if (options.hasOwnProperty('parent')) {
    var parent = options.parent
  } else {
    var parent = scene
  }

  if (options.hasOwnProperty('rotate')) {
    var a = TAU * options.rotate[0] / 360
    var b = TAU * options.rotate[1] / 360
    var c = TAU * options.rotate[2] / 360
  } else {
    var a = 0
    var b = 0
    var c = 0
  }

  //var group = new THREE.Object3D()
  var _group = new THREE.Group()
  _group.name = name
  _group.visible = visible
  _group.position.set( x, y, z )
  _group.rotation.set( a, b, c )

  parent.add(_group)

  if (options.hasOwnProperty('parts')) {
    for (var p of options.parts) {
      if (p.hasOwnProperty('group')) {
        p.group['parent'] = _group
        group(p.group)
      } else {
        p['parent'] = _group
        part(p)
      }
    }
  }
}

window.part = function(options) {
  var mesh;
  var source = options.source
  if (options.name) {
    var name = options.name
  }

  if (options.hasOwnProperty('visible')) {
    var visible = options.visible
  } else {
    var visible = true
  }

  if (options.hasOwnProperty('color')) {
    var color = options.color
  } else {
    var color = 0xCCCCCC
  }

  if (options.hasOwnProperty('opacity')) {
    var opacity = options.opacity
  } else {
    var opacity = 1
  }

  if (options.hasOwnProperty('transparent')) {
    var transparent = options.transparent
  } else {
    var transparent = false
  }


  if (options.hasOwnProperty('parent')) {
    var parent = options.parent
  } else {
    var parent = scene
  }

  if (options.hasOwnProperty('group')) {
    var g = options.group
    g['parent'] = parent
    group(g)
  }

  if (options.size && options.shape) {
    var width = 0
    var height = 0
    var depth = 0
    var radiusTop = 0
    var radiusBottom = 0
    if (options.shape == 'box') {
      width = options.size[0]
      height = options.size[1]
      depth = options.size[2]
    } else if (options.shape == 'cylinder') {
      radiusTop = options.size[0]
      radiusBottom = options.size[1]
      height = options.size[2]
    }
}

  if (options.translate) {
    var x = options.translate[0]
    var y = options.translate[1]
    var z = options.translate[2]
  } else {
    var x = 0
    var y = 0
    var z = 0
  }

  if (options.rotate) {
    var a = TAU * options.rotate[0] / 360
    var b = TAU * options.rotate[1] / 360
    var c = TAU * options.rotate[2] / 360
  } else {
    var a = 0
    var b = 0
    var c = 0
  }

  if (options.source) {
    var loader = new STLLoader();

    loader.load(source, function(geometry) {
      if (transparent == true) {
        var material = new THREE.MeshBasicMaterial( {
          color: color,
          wireframe: false,
          opacity: opacity,
          transparent: true
        });
      } else {
        var material = new THREE.MeshPhongMaterial({
          color: color,
          specular: 0x111111,
          shininess: 100
        });
      }
      mesh = new THREE.Mesh(geometry, material)
      mesh.name = name
      mesh.visible = visible

      // Make center of mesh the center of its bounding box.
      //mesh.geometry.center()

      // Move to requested position
      mesh.position.set( x, y, z )

      // Set requested rotation
      mesh.rotation.set( a, b, c )

      mesh.castShadow = true
      mesh.receiveShadow = true

      //console.log(parent.type)
      mesh.parent = parent

      //scene.add(mesh)
      parent.attach(mesh)


      if (name) {
        window[name] = mesh
      }

    });
  } else {
    if (options.shape) {
      if (options.shape == 'box') {
        var geometry = new THREE.BoxGeometry( width, height, depth)
      } else if (options.shape == 'cylinder') {
        var geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, 32 )
      }
      if (transparent == true) {
        var material = new THREE.MeshBasicMaterial( {
          color: color,
          wireframe: false,
          opacity: opacity,
          transparent: true
        });
      } else {
        var material = new THREE.MeshPhongMaterial({
          color: color,
          specular: 0x111111,
          shininess: 100
        });
      }
      var shape = new THREE.Mesh( geometry, material )
      shape.name = name
      shape.visible = visible
      shape.position.set( x, y, z )
      shape.rotation.set( a, b, c )
      shape.parent = parent
      parent.attach(shape)
      if (name) {
        window[name] = shape
      }
    }
    // console.log('no source: ' + options.name)
    // var geometry = new THREE.SphereGeometry( 1, 32, 32);
    // var material = new THREE.MeshBasicMaterial( {color: color} );
    // var sphere = new THREE.Mesh( geometry, material );
    // sphere.name = name
    // sphere.position.set( x, y, z )
    // sphere.rotation.set( a, b, c )
    // sphere.parent = parent
    // parent.attach(sphere)
    // if (name) {
    //   window[name] = sphere
    // }
  }
}
part = window.part

window.THREE = THREE