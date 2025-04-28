import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const redConeGeometry = new THREE.ConeGeometry( 1, 3, 16 );
redConeGeometry.translate(0, 1.5, 0);
redConeGeometry.rotateX(Math.PI/2);
const redMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
const redCone = new THREE.Mesh( redConeGeometry, redMaterial );

const whiteConeGeometry = new THREE.ConeGeometry( 1, 3, 16 );
whiteConeGeometry.translate(0, 1.5, 0);
whiteConeGeometry.rotateX(-Math.PI/2);
const whiteMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff });
const whiteCone = new THREE.Mesh( whiteConeGeometry, whiteMaterial );

const needle = new THREE.Group();
needle.add( redCone );
needle.add( whiteCone );

scene.add( needle );

camera.position.z = 5;

let lookX = 0;
let lookY = 0;
let lookZ = 0;

const mag = new Magnetometer({frequency:10});

function onreading() {
  lookX = mag.x;
  lookY = mag.y;
  lookZ = mag.z;
}

function onerror(e) {
  console.log(e.error.message);
}

mag.onreading = onreading;
mag.onerror = onerror;
mag.start();

function animate() {
  requestAnimationFrame( animate );

  needle.lookAt(lookX, lookY, lookZ);

  renderer.render( scene, camera );
}
animate();
