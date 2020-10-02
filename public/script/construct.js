// "This is the Construct. It's our loading program. We
// can load anything... From clothing to equipment,
// weapons, training simulations; anything we need."
// ―Morpheus



import * as THREE from './vendor/three.module.js';
import { STLLoader } from './vendor/STLLoader.js';
import { WEBGL } from './vendor/WebGL.js';
import { OrbitControls } from './vendor/OrbitControls.js';
import { TransformControls } from './vendor/TransformControls.js';

var scene, camera, plane, renderer, container, controls, transformControl,
    objectHovered, objectFocusAtMouseDown, objectFocusAtMouseUp, dragcontrols,
    isMouseDown = false, onMouseDownPosition, mouse, raycaster, offset, stats;

init();
animate();

function init() {

    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );


    THREE.Object3D.DefaultUp.set(0, 0, 1);

    onMouseDownPosition = new THREE.Vector2();

    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    offset = new THREE.Vector3();

    // Scene
    scene = new THREE.Scene();

    // Camera
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.up.set(0,0,1);
    scene.add(camera);
    window.camera = camera

    // Load camera position, if present
    if (localStorage.hasOwnProperty('cameraPosition')) {
      var cameraPosition = JSON.parse(localStorage.getItem('cameraPosition'))
      camera.position.x = cameraPosition.x
      camera.position.y = cameraPosition.y
      camera.position.z = cameraPosition.z
    } else {
      camera.position.set(-75,-250,300);
    }

    // // Load camera target, if present
    // if (localStorage.hasOwnProperty('target')) {
    //   var target = JSON.parse(localStorage.getItem('target'))
    //   camera.lookAt(target.x, target.y, target.z)
    // } else {
    //   camera.lookAt(scene.position)
    // }

    // Plane
    var planeW = 4;
    var planeH = 4;
    var texture = new THREE.TextureLoader().load( 'image/wood-floor-2.jpg' );

    texture.repeat.set( 4, 4 );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    plane = new THREE.Mesh( new THREE.CubeGeometry( planeW*100, planeH*100, 2),
                            new THREE.MeshBasicMaterial( {
                              //color: 0x000000,
                              wireframe: false,
                              opacity:.6,
                              map: texture,
                              transparent: true
                            } ) );

    plane.rotation.z = -Math.PI/2;
    plane.position.set(0, 0, 0 );
    plane.name = "plane";
    plane.visible = true
    scene.add(plane);

    // Lights
    var ambientLight = new THREE.AmbientLight( 0x000000 );
    scene.add( ambientLight );


    var light = new THREE.SpotLight( 0xffffff, 1.5 );
    light.position.set( 0, -150, 200 );
    light.castShadow = true;
    light.shadow.camera.near = 200;
    light.shadow.camera.far = camera.far;
    light.shadow.camera.fov = 70;
    light.shadow.bias = -0.000222;
    light.shadow.darkness = 0.25;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    scene.add( light );
    var spotlight = light;

    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.x = 1;
    directionalLight.position.y = 1;
    directionalLight.position.z = .75;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    var directionalLight = new THREE.DirectionalLight( 0x808080 );
    directionalLight.position.x = -1;
    directionalLight.position.y = 1;
    directionalLight.position.z = -0.75;
    directionalLight.position.normalize();
    scene.add( directionalLight );

    var directionalLight = new THREE.DirectionalLight( 0xfffff );
    directionalLight.position.x = 1;
    directionalLight.position.y = 800;
    directionalLight.position.z = .75;
    directionalLight.position.normalize();
    scene.add( directionalLight );


    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.x = -50;
    directionalLight.position.y = -50;
    directionalLight.position.z = -100;
    directionalLight.position.normalize();
    scene.add( directionalLight );


    if ( WEBGL.isWebGLAvailable() ) {
      renderer = new THREE.WebGLRenderer( { antialias: true } );
    } else {
      var warning = WEBGL.getWebGLErrorMessage();
      document.getElementById( 'canvas' ).appendChild( warning );
    }

    //renderer.setSize(400, 400);
    renderer.setClearColor( 0xffffff );
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.getElementById( 'canvas' );
    container.appendChild( renderer.domElement );

    // Controls
    controls = new OrbitControls( camera, renderer.domElement, scene);
    controls.autoRotate = false

    // Events
    THREEx.WindowResize(renderer, camera);
    window.scene = scene;

    if (camera.position.z <= 0) {
      plane.visible = false
    } else {
      plane.visible = true
    }

    window.utils = {
        cameraLookDir: function(camera) {
            var vector = new THREE.Vector3(0, 0, -1);
            vector.applyEuler(camera.rotation, camera.rotation.order);
            return {x: vector.x, y: vector.y, z: vector.z};
        }
    }
}


function animate() {
    stats.begin();
    controls.update();
    renderer.render( scene, camera );
    TWEEN.update();
    stats.end();
    requestAnimationFrame( animate );
}

function render() {
    renderer.render( scene, camera );
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

  if (options.hasOwnProperty('parent')) {
    var parent = options.parent
  } else {
    var parent = scene
  }

  if (options.hasOwnProperty('group')) {
    var g = options.group
    console.log("group!")
    console.log(g)
    g['parent'] = parent
    group(g)
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
      var material = new THREE.MeshPhongMaterial({
        color: color,
        specular: 0x111111,
        shininess: 200
      });
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
  }
}
part = window.part