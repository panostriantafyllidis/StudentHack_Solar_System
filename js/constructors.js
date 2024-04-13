import * as THREE from "three";

export const createCelestialBody = function (data, parent, depth = 0, isLast = false) {
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
  body.orbitInclinationAngle = data.orbitInclinationAngle;

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
      if (data.orbitInclinationAngle) line.rotation.y = data.orbitInclinationAngle;

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

export const createCelestialParticles = function (data, parent) {
  const colors = [];
  for (let i = 0; i < 10; i++) {
    const color = new THREE.Color(data.color);
    color.offsetHSL(Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1);
    colors.push(color);
  }

  const sizeWeights = [0.8, 0.9, 1, 1.1, 1.2];
  const particleGroups = Array.from({ length: 5 }, () => ({
    points: [],
    colors: [],
  }));

  for (let i = 0; i < data.ringVolume; i++) {
    const radius = Math.random() * (data.orbitOuterRadius - data.orbitInnerRadius) + data.orbitInnerRadius;
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.random() * data.orbitThickness - data.orbitThickness / 2;
    const z = Math.sin(angle) * radius;

    const groupIndex = Math.floor(Math.random() * 5);
    particleGroups[groupIndex].points.push(new THREE.Vector3(x, y, z));

    const color = colors[Math.floor(Math.random() * 10)];
    particleGroups[groupIndex].colors.push(color.r, color.g, color.b);
  }

  const particleSystem = new THREE.Group();

  particleGroups.forEach((group, index) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(group.points);
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(group.colors, 3));
    const material = new THREE.PointsMaterial({
      size: sizeWeights[index] * data.radius,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(geometry, material);
    particleSystem.add(particles);
  });

  // Flags
  particleSystem.isCelestialParticles = true;

  if (data.orbitInclination) particleSystem.rotation.x = data.orbitInclination;
  if (data.orbitInclinationAngle) particleSystem.rotation.y = data.orbitInclinationAngle;
  particleSystem.rotationSpeed = data.orbitSpeed;

  // Parenting
  if (parent) parent.add(particleSystem);

  return particleSystem;
};

export const createStarField = function (
  count = 2500,
  groups = 5,
  innerRadius = 2000,
  outerRadius = 3000,
  colors = [
    { color: 0xfff8e7, weight: 5 },
    { color: 0xffffff, weight: 3 },
    { color: 0xa5d6ff, weight: 2 },
    { color: 0xffffbf, weight: 2 },
    { color: 0xffd6a5, weight: 2 },
    { color: 0xaaaaff, weight: 1 },
    { color: 0xffa5a5, weight: 1 },
    { color: 0xffa5d6, weight: 1 },
    { color: 0xa5a5ff, weight: 1 },
  ]
) {
  const starGroups = Array.from({ length: groups }, () => ({
    points: [],
    colors: [],
  }));

  const totalWeight = colors.reduce((sum, color) => sum + color.weight, 0);
  const weightedColors = colors.flatMap((color) => Array(color.weight).fill(color.color));

  for (let i = 0; i < count; i++) {
    const radius = Math.random() * (outerRadius - innerRadius) + innerRadius;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    const groupIndex = Math.floor(Math.random() * groups);
    starGroups[groupIndex].points.push(new THREE.Vector3(x, y, z));

    const color = new THREE.Color(weightedColors[Math.floor(Math.random() * totalWeight)]);
    starGroups[groupIndex].colors.push(color.r, color.g, color.b);
  }

  const starField = new THREE.Group();

  starGroups.forEach((group, index) => {
    const geometry = new THREE.BufferGeometry().setFromPoints(group.points);
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(group.colors, 3));
    const material = new THREE.PointsMaterial({
      size: 1 + index,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(geometry, material);
    starField.add(stars);
  });

  return starField;
};
