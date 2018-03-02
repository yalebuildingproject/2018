var Nanocomponent = require('nanocomponent')
var html = require('bel')
var raf = require('raf')

class Logo extends Nanocomponent {
  constructor () {
    super()
  }

  createElement () {
    if (typeof window !== 'undefined') {
      return logoScene()
    } else {
      return ''
    }
  }

  update () {
    return false
  }
}

module.exports = Logo

function logoScene() {
  var THREE = window.THREE
  var scene = new THREE.Scene();
  window.scene = scene
  var width = window.innerWidth;
  var height = window.innerHeight;
  var camera = new THREE.OrthographicCamera( - 70, width - 70, 50, 50  - height, 1, 1000 );
  camera.updateProjectionMatrix();

  scene.add( camera );

  camera.position.z = 100;


  var size = 50
  var geometryCube = cube( THREE, size );
  var lineSegments = new THREE.LineSegments( geometryCube, new THREE.LineDashedMaterial( { color: 0x000000, dashSize: 3, gapSize: 0, linewidth: 3 } ) );
  lineSegments.computeLineDistances();
  scene.add( lineSegments );



  var renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.target = new THREE.Vector3( 50 / 2, 50 * .75 * .75, 50 / 2 )
  controls.enableZoom = false
  controls.enablePan = false
  controls.minAzimuthAngle = controls.minPolarAngle = Math.PI / 4
  controls.maxAzimuthAngle = controls.maxPolarAngle = 3 * Math.PI / 4

  controls.update();
  controls.addEventListener( 'change', render );
  renderer.render(scene, camera)

  return renderer.domElement

  function render() {
    renderer.render( scene, camera );
  }
}

function cube( THREE, size ) {
  var w = size;
  var l = size * .75;

  var geometry = new THREE.BufferGeometry();
  var position = [];

  position.push(
    0, 0, 0,
    w, 0, 0,

    w, 0, 0,
    w, l, 0,

    w, l, 0,
    w * 0.5, l * 1.5, 0,

    w * 0.5, l * 1.5, 0,
    0, l, 0,

    0, l, 0,
    0, 0, 0,

    0, 0, w,
    w, 0, w,

    w, 0, w,
    w, l, w,

    w, l, w,
    w * 0.5, l * 1.5, w,

    w * 0.5, l * 1.5, w,
    0, l, w,

    0, l, w,
    0, 0, w,

    0, 0, 0,
    0, 0, w,

    w, 0, 0,
    w, 0, w,

    w, l, 0,
    w, l, w,

    w * 0.5, l * 1.5, 0,
    w * 0.5, l * 1.5, w,

    0, l, 0,
    0, l, w
  )
  geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( position, 3 ) );
  return geometry;
}
