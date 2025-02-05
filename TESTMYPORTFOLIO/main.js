import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);

scene.add(pointLight, ambientLight, light);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x,y,z);
    scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('12.jpg');
scene.background = spaceTexture;

const cubeTexture = new THREE.TextureLoader().load('diamond.jpg');

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshPhongMaterial({ map: cubeTexture })
);

scene.add(cube);

const sphereTexture = new THREE.TextureLoader().load('gold.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshBasicMaterial({ 
        map: sphereTexture, 
        normalmap: sphereTexture,
    })
);

scene.add(sphere);

sphere.position.z = 30;
sphere.position.setX(-10);


function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    sphere.rotation.x += 0.05;
    sphere.rotation.y += 0.075;
    sphere.rotation.z += 0.05;

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera

function animate(){
    requestAnimationFrame(animate);
    torus.rotation.x += 0.001;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.0001;

    controls.update();

    renderer.render(scene, camera);
}

animate()