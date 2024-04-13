import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { data } from "./data.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SMAAPass } from "three/addons/postprocessing/SMAAPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const main = function () {
  // Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 150;
  camera.position.y = 120;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio * 1.5);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const glitchPass = new SMAAPass();
  

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // Basic Controls
  const cameraDamping = 0.05;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = cameraDamping;
  controls.minDistance = 10;
  controls.maxDistance = 500;

  // Responsive Design
  const onWindowResize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener("resize", onWindowResize, false);

  // Objects
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const sun = createCelestialBody(data, undefined, 0);
  let selectedPlanet = sun;
  let hasFocused = false;
  scene.add(sun);

  // Movement
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

  // Selection
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
    document.getElementById("dropdown").value = selectedPlanet.uuid;
  };

  document.addEventListener("click", onMouseClick);

  const onDropdownChange = function (event) {
    const selectedObject = scene.getObjectByProperty("uuid", event.target.value);
    selectedPlanet = selectedObject;
    hasFocused = false;
  };

  document.getElementById("dropdown").addEventListener("change", onDropdownChange);

  // Animation
  const animate = function () {
    requestAnimationFrame(animate);

    // Celestial Movement
    let startingPosition = selectedPlanet ? selectedPlanet.getWorldPosition(new THREE.Vector3()) : undefined;
    updateCelestial(sun, undefined);
    let endingPosition = selectedPlanet ? selectedPlanet.getWorldPosition(new THREE.Vector3()) : undefined;

    // Camera Movement
    let direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    let forward = direction.multiplyScalar(velocity);
    let right = new THREE.Vector3().crossVectors(camera.up, direction).normalize().multiplyScalar(velocity);

    if (movement.forward) camera.position.add(forward);
    if (movement.backward) camera.position.sub(forward);
    if (movement.left) camera.position.sub(right);
    if (movement.right) camera.position.add(right);

    // Camera Focus
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

    // Render
    controls.update();
    composer.render();
  };

  animate();
};

const createCelestialBody = function (data, parent, depth = 0, isLast = false) {
  const geometry = new THREE.SphereGeometry(data.radius, 64, 64);
  const material = new THREE.MeshPhysicalMaterial({ color: data.color, emissive: data.emissive ? data.emissive.color : null });
  const body = new THREE.Mesh(geometry, material);

  // Stars
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

  // Flags
  body.isCelestialBody = true;

  body.position.set(data.orbitRadius || 0, 0, 0);
  body.rotation.x = data.inclination || 0;

  body.rotationSpeed = data.rotationSpeed;
  body.orbitRadius = data.orbitRadius;
  body.orbitSpeed = data.orbitSpeed;
  body.orbitInclination = data.orbitInclination;

  // Parenting
  if (parent) {
    body.parent = parent;
    parent.add(body);

    // Orbit Line
    if (data.orbitRadius) {
      const points = [];
      const colors = [];

      const color1 = new THREE.Color(data.color);
      const color2 = new THREE.Color(0x000000);

      for (let i = 0; i <= 360; i++) {
        const radians = (i * Math.PI) / 180;
        points.push(new THREE.Vector3(data.orbitRadius * Math.cos(radians), 0, data.orbitRadius * -Math.sin(radians)));

        const progress = i / 360;
        const interpolation = progress < 0.8 ? progress / 0.8 : 1;
        const color = color1.clone().lerp(color2, interpolation);
        colors.push(color.r, color.g, color.b);
      }
      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      orbitGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

      const orbitMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        linewidth: 2,
        transparent: true,
        opacity: 0.75,
      });

      const line = new THREE.LineLoop(orbitGeometry, orbitMaterial);

      // Flags
      line.isOrbit = true;
      if (data.orbitInclination) line.rotation.x = data.orbitInclination;

      parent.add(line);
      body.orbit = line;
    }
  }

  // Dropdown
  const dropdown = document.getElementById("dropdown");
  const option = document.createElement("option");
  option.value = body.uuid;

  let prefix = "";
  if (depth > 0) {
    prefix = "│ ".repeat(depth - 1) + (isLast ? "└─ " : "├─ ");
  }
  option.textContent = prefix + data.name;
  dropdown.appendChild(option);

  // Recursion
  if (data.children) {
    length = data.children.length;

    data.children.forEach((data, index) => {
      if (data.type && data.type === "particles") return createCelestialParticles(data, body);
      else return createCelestialBody(data, body, depth + 1, index === length - 1);
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

  // Flags
  particleSystem.isCelestialParticles = true;

  particleSystem.rotation.x = data.orbitInclination || 0;
  particleSystem.rotationSpeed = data.orbitSpeed;

  // Parenting
  if (parent) parent.add(particleSystem);

  return particleSystem;
};

const updateCelestial = function (celestial) {
  const time = Date.now() * 0.0001;
  const angle = time * celestial.orbitSpeed;

  // Orbit
  if (celestial.orbitRadius) {
    celestial.position.x = celestial.orbitRadius * Math.cos(angle);
    celestial.position.z = celestial.orbitRadius * Math.sin(angle) * Math.cos(celestial.orbitInclination || 0);
    celestial.position.y = celestial.orbitRadius * Math.sin(angle) * -Math.sin(celestial.orbitInclination || 0);
    celestial.orbit.rotation.y = -angle;
  }

  // Rotation
  if (celestial.rotationSpeed) celestial.rotation.y += celestial.rotationSpeed;

  // Recursion
  if (celestial.children) {
    celestial.children.forEach((child) => {
      if (child.isCelestialBody || child.isCelestialParticles) updateCelestial(child);
    });
  }
};

main();
