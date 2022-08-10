import './style.css'
import * as THREE from 'three'
import { Mesh } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),

});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const texture = new THREE.TextureLoader().load('donut.png');
const material = new THREE.MeshStandardMaterial({map:texture , wireframe: false});
const torus = new THREE.Mesh(geometry, material);
const ambientLight = new THREE.AmbientLight(0xffffff)

const controls = new OrbitControls(camera, renderer.domElement);

scene.add(ambientLight)
scene.add(torus)

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

}


function addDonut(){
  const texture = new THREE.TextureLoader().load('donut.png');
  const geometry = new THREE.TorusGeometry(2, .9, 16, 100)
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  })
  const star =  new THREE.Mesh(geometry,material);
  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  
  star.position.set(x, y, z);

  star.rotation.set(x, y , z)
  scene.add(star)
}

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  if(t < -1000){
    camera.position.z += t * .001;
    camera.position.x += t * .001;
    camera.position.y += t * .001;
  }

}

document.body.onscroll = moveCamera;

scene.background = new THREE.Color( 0xb6f0c3 );

Array(200).fill().forEach(addDonut)


animate()