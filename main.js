import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { data } from "./data.js";

const main = function () {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 150;
  camera.position.y = 120;
  const cameraDamping = 0.05;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = cameraDamping;
  controls.minDistance = 10;
  controls.maxDistance = 500;

  const onWindowResize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", onWindowResize, false);

  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const sun = createCelestialBody(data, undefined);
  let selectedPlanet = sun;
  let hasFocused = false;
  scene.add(sun);

  const movement = { forward: false, backward: false, left: false, right: false };
  const velocity = 0.5;

  const onKeyDown = function (event) {
    switch (event.code) {
      case "KeyW":
        movement.forward = true;
        break;
      case "KeyS":
        movement.backward = true;
        break;
      case "KeyA":
        movement.left = true;
        break;
      case "KeyD":
        movement.right = true;
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "KeyW":
        movement.forward = false;
        break;
      case "KeyS":
        movement.backward = false;
        break;
      case "KeyA":
        movement.left = false;
        break;
      case "KeyD":
        movement.right = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true).filter((intersect) => intersect.object.isCelestialBody);

    if (intersects.length === 0) return;
    selectedPlanet = intersects[0].object;
    hasFocused = false;
  };

  document.addEventListener("click", onMouseClick);

  const animate = function () {
    requestAnimationFrame(animate);

    let startingPosition = selectedPlanet ? selectedPlanet.getWorldPosition(new THREE.Vector3()) : undefined;
    updateCelestial(sun, undefined);
    let endingPosition = selectedPlanet ? selectedPlanet.getWorldPosition(new THREE.Vector3()) : undefined;

    let direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    let forward = direction.multiplyScalar(velocity);
    let right = new THREE.Vector3().crossVectors(camera.up, direction).normalize().multiplyScalar(velocity);

    if (movement.forward) camera.position.add(forward);
    if (movement.backward) camera.position.sub(forward);
    if (movement.left) camera.position.sub(right);
    if (movement.right) camera.position.add(right);

    if (selectedPlanet && camera.position.distanceTo(selectedPlanet.getWorldPosition(new THREE.Vector3())) > 400) {
      hasFocused = false;
    }

    if (selectedPlanet) {
      const target = selectedPlanet.getWorldPosition(new THREE.Vector3());
      const delta = new THREE.Vector3().subVectors(endingPosition, startingPosition);

      camera.position.add(delta);

      if (controls.target.distanceTo(target) < 0.5) {
        hasFocused = true;
      }

      if (hasFocused) {
        controls.target.add(delta);
      } else {
        controls.target.lerp(target, cameraDamping);
      }
    }

    controls.update();
    renderer.render(scene, camera);
  };

  animate();
};

const createCelestialBody = function (data, parent) {
  const geometry = new THREE.SphereGeometry(data.radius, 32, 32);
  const material = new THREE.MeshPhysicalMaterial({ color: data.color, emissive: data.emissive ? data.emissive.color : null });
  const body = new THREE.Mesh(geometry, material);

  if (data.emissive) {
    const light = new THREE.PointLight(data.emissive.color, data.emissive.intensity, data.emissive.distance, data.emissive.decay);
    light.position.set(0, 0, 0);
    light.castShadow = true;
    body.add(light);
  }

  body.receiveShadow = true;
  if (!data.emissive) {
    body.castShadow = true;
  }

  body.isCelestialBody = true;

  body.position.set(data.orbitRadius || 0, 0, 0);
  body.rotation.x = data.inclination || 0;

  body.rotationSpeed = data.rotationSpeed;
  body.orbitRadius = data.orbitRadius;
  body.orbitSpeed = data.orbitSpeed;
  body.orbitInclination = data.orbitInclination;

  if (parent) {
    body.parent = parent;
    parent.add(body);

    if (data.orbitRadius) {
      const points = [];
      for (let i = 0; i <= 360; i++) {
        const radians = (i * Math.PI) / 180;
        points.push(new THREE.Vector3(data.orbitRadius * Math.cos(radians), 0, data.orbitRadius * Math.sin(radians)));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineDashedMaterial({
        color: 0x666666,
        linewidth: 1,
        scale: 1,
        dashSize: 1,
        gapSize: 1,
      });

      const line = new THREE.LineLoop(geometry, material);
      line.computeLineDistances();

      line.isOrbit = true;
      if (data.orbitInclination) line.rotation.x = data.orbitInclination;

      parent.add(line);
    }
  }

  if (data.children) {
    data.children.forEach((data) => {
      if (data.type && data.type === "particles") return createCelestialParticles(data, body);
      else return createCelestialBody(data, body);
    });
  }

  return body;
};

const createCelestialParticles = function (data, parent) {
  const points = [];
  for (let i = 0; i < data.ringVolume; i++) {
    const radius = Math.random() * (data.orbitOuterRadius - data.orbitInnerRadius) + data.orbitInnerRadius;
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.random() * data.orbitThickness - data.orbitThickness / 2;
    points.push(new THREE.Vector3(x, y, z));
  }


  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.PointsMaterial({
    size: data.radius,
    sizeAttenuation: true,
    transparent: true,
    alphaTest: 0.5,
    opacity: 0.75,
    depthWrite: false,
  });

  const particleSystem = new THREE.Points(geometry, material);

  particleSystem.isCelestialParticles = true;

  particleSystem.rotation.x = data.orbitInclination || 0;
  particleSystem.rotationSpeed = data.orbitSpeed;

  if (parent) parent.add(particleSystem);

  return particleSystem;
};

const updateCelestial = function (celestial) {
  const time = Date.now() * 0.0001;
  const angle = time * celestial.orbitSpeed;

  if (celestial.orbitRadius) {
    celestial.position.x = celestial.orbitRadius * Math.cos(angle);
    celestial.position.z = celestial.orbitRadius * Math.sin(angle) * Math.cos(celestial.orbitInclination || 0);
    celestial.position.y = celestial.orbitRadius * Math.sin(angle) * -Math.sin(celestial.orbitInclination || 0);
  }

  if (celestial.rotationSpeed) celestial.rotation.y += celestial.rotationSpeed;

  if (celestial.children) {
    celestial.children.forEach((child) => {
      if (child.isCelestialBody || child.isCelestialParticles) updateCelestial(child);
    });
  }
};

main();
