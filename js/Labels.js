class Labels {
  constructor(container, camera) {
    this.container = container; // The DOM element where labels will be attached
    this.camera = camera; // The Three.js camera object
    this.labels = []; // Store metadata for each label
  }

  addPlanetLabel(name, object, container) {
    const label = document.createElement("div");
    label.textContent = name;
    label.style.position = "absolute";
    label.style.color = "white";
    label.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    label.style.borderRadius = "5px";
    label.style.padding = "2px 5px";
    label.style.fontSize = "12px";
    label.style.pointerEvents = "none"; // Ensure the label does not obstruct mouse events
    label.style.transform = "translate(-50%, -50%)"; // Center label over calculated position
    container.appendChild(label);

    // Store label with its associated object
    this.labels.push({
      element: label,
      object: object,
    });
  }

  update() {
    this.labels.forEach((labelInfo) => {
      this.updateLabelPosition(labelInfo);
    });
  }

  updateLabelPosition(labelInfo) {
    const vector = new THREE.Vector3();
    // Projects the 3D position to 2D screen position
    labelInfo.object.getWorldPosition(vector).project(this.camera);

    // Convert normalized position (-1, +1) to CSS coordinates
    const x = (vector.x * 0.5 + 0.5) * this.container.clientWidth;
    const y = (vector.y * -0.5 + 0.5) * this.container.clientHeight;

    labelInfo.element.style.left = `${x}px`;
    labelInfo.element.style.top = `${y}px`;
    labelInfo.element.style.display = vector.z > 1 ? "none" : "";
  }
}
