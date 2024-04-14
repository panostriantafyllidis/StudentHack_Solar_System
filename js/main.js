import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { data } from "./data.js";
import { createCelestialBody, createStarField } from "./constructors.js";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const main = function () {
  // Scene Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100000
  );
  camera.position.y = 120;
  camera.position.z = 150;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  const composer = new EffectComposer(renderer);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  // Basic Controls
  const cameraDamping = 0.05;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = cameraDamping;
  controls.minDistance = 5;
  controls.maxDistance = 6000;

  // Responsive Design
  const onWindowResize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  window.addEventListener("resize", onWindowResize, false);

  // Objects
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

  const sun = createCelestialBody(data, undefined, 0);
  let selectedPlanet = sun;
  let hasFocused = false;
  scene.add(sun);

  const starField = createStarField();
  scene.add(starField);

  // Movement
  const movement = {
    forward: false,
    backward: false,
    left: false,
    right: false,
  };
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

  async function displayInfoForObject(planetName) {
    const scriptPath = `./info_windows/${planetName.toLowerCase()}.js`;

    try {
      const module = await import(scriptPath);
      module.displayInfo(); // Assuming each module exports a function named `displayInfo`
    } catch (error) {
      console.error(
        "Error loading the information module for:",
        planetName,
        error
      );
    }
  }

  // Selection
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let autoFocusEnabled = true; // New flag to control auto-focusing behavior

  const onMouseClick = function (event) {
    if (event.button !== 0) return; // Ignore if not left click

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster
      .intersectObjects(scene.children, true)
      .filter((intersect) => intersect.object.isCelestialBody);

    if (intersects.length === 0) return;
    selectedPlanet = intersects[0].object;
    hasFocused = false;
    document.getElementById("dropdown").value = selectedPlanet.uuid;
  };

  document.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Prevents the default context menu from popping up
    hasFocused = false; // Releases the focus lock
    autoFocusEnabled = false; // Disable auto-focusing
    controls.target.copy(new THREE.Vector3(0, 0, 0)); // Optional: reset target
  });

  document.addEventListener("dblclick", function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster
      .intersectObjects(scene.children, true)
      .filter((intersect) => intersect.object.isCelestialBody);

    if (intersects.length > 0) {
      selectedPlanet = intersects[0].object;
      displayInfoForObject(selectedPlanet.name); // Display info on double-click
    }
  });

  document.addEventListener("click", onMouseClick);

  const onDropdownChange = function (event) {
    const selectedObject = scene.getObjectByProperty(
      "uuid",
      event.target.value
    );
    selectedPlanet = selectedObject;
    hasFocused = false;
    displayInfoForObject(selectedPlanet.name); // Display info on selection from dropdown
  };

  document
    .getElementById("dropdown")
    .addEventListener("change", onDropdownChange);

  // Music
  const music = [
    "assets/music/track1.mp3",
    "assets/music/track2.mp3",
    "assets/music/track3.mp3",
    "assets/music/track4.mp3",
    "assets/music/track5.mp3",
    "assets/music/track6.mp3",
    "assets/music/track7.mp3",
  ];

  let currentMusicIndex = 0;
  const player = document.getElementById("backgroundMusic");

  const playNextTrack = function () {
    if (currentMusicIndex === music.length - 1) currentMusicIndex = 0;
    player.src = music[currentMusicIndex];
    player.play();
    currentMusicIndex++;
  };

  player.addEventListener("ended", playNextTrack);
  playNextTrack();

  // Animation
  let simulationSpeed = 1;

  const onSimulationSpeedChange = function (event) {
    simulationSpeed = parseFloat(event.target.value);
    document.getElementById("speedValue").textContent = simulationSpeed;
  };

  document
    .getElementById("speedSlider")
    .addEventListener("input", onSimulationSpeedChange);

  const updateCelestial = function (celestial) {
    const time = Date.now() * 0.0001 * simulationSpeed;
    const angle = time * celestial.orbitSpeed;

    // Orbit
    if (celestial.orbitRadius) {
      celestial.position.x = celestial.orbitRadius * Math.cos(angle);
      celestial.position.z =
        celestial.orbitRadius *
        Math.sin(angle) *
        Math.cos(celestial.orbitInclination || 0);
      celestial.position.y =
        celestial.orbitRadius *
        Math.sin(angle) *
        -Math.sin(celestial.orbitInclination || 0);
      celestial.orbit.rotation.y = -angle;
    }

    // Rotation
    if (celestial.rotationSpeed)
      celestial.rotation.y += celestial.rotationSpeed;

    // Recursion
    if (celestial.children) {
      celestial.children.forEach((child) => {
        if (child.isCelestialBody || child.isCelestialParticles)
          updateCelestial(child);
      });
    }
  };

  const animate = function () {
    requestAnimationFrame(animate);

    // Celestial Movement
    let startingPosition = selectedPlanet
      ? selectedPlanet.getWorldPosition(new THREE.Vector3())
      : undefined;
    updateCelestial(sun, undefined);
    let endingPosition = selectedPlanet
      ? selectedPlanet.getWorldPosition(new THREE.Vector3())
      : undefined;

    // Camera Movement
    let direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    let forward = direction.multiplyScalar(velocity);
    let right = new THREE.Vector3()
      .crossVectors(camera.up, direction)
      .normalize()
      .multiplyScalar(velocity);

    if (movement.forward) camera.position.add(forward);
    if (movement.backward) camera.position.sub(forward);
    if (movement.left) camera.position.sub(right);
    if (movement.right) camera.position.add(right);

    // Camera Focus
    if (
      selectedPlanet &&
      camera.position.distanceTo(
        selectedPlanet.getWorldPosition(new THREE.Vector3())
      ) > 10000
    ) {
      hasFocused = false;
    }

    if (selectedPlanet && autoFocusEnabled) {
      const target = selectedPlanet.getWorldPosition(new THREE.Vector3());
      const cameraTarget = new THREE.Vector3()
        .copy(target)
        .add(new THREE.Vector3(0, 5, 15));

      if (
        controls.target.distanceTo(target) < 1 &&
        camera.position.distanceTo(cameraTarget) < 100
      ) {
        hasFocused = true;
      }

      if (hasFocused) {
        const delta = new THREE.Vector3().subVectors(
          endingPosition,
          startingPosition
        );
        camera.position.add(delta);
        controls.target.add(delta);
      } else {
        if (simulationSpeed < 30) {
          camera.position.lerp(cameraTarget, cameraDamping * simulationSpeed);
          controls.target.lerp(target, cameraDamping * simulationSpeed);
        } else {
          camera.position.copy(cameraTarget);
          controls.target.copy(target);
          hasFocused = true;
        }
      }
    }

    // Camera Limits
    if (camera.position.x > 10000) camera.position.x = 10000;
    if (camera.position.x < -10000) camera.position.x = -10000;
    if (camera.position.y > 10000) camera.position.y = 10000;
    if (camera.position.y < -10000) camera.position.y = -10000;
    if (camera.position.z > 10000) camera.position.z = 10000;
    if (camera.position.z < -10000) camera.position.z = -10000;

    // Render
    controls.update();
    composer.render();
  };
  animate();
};

main();
