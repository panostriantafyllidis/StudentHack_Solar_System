document.addEventListener("DOMContentLoaded", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const svg = d3
    .select("#solar-system")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "black")
    .call(
      d3.zoom().on("zoom", function (event) {
        solarSystem.attr("transform", event.transform);
      })
    );

  const solarSystem = svg
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  const bodies = [
    { name: "Sun", color: "yellow", orbitSize: 0, radius: 20, moons: [] },
    { name: "Mercury", color: "darkgrey", orbitSize: 58, radius: 2, moons: [] },
    { name: "Venus", color: "yellow", orbitSize: 108, radius: 4, moons: [] },
    {
      name: "Earth",
      color: "blue",
      orbitSize: 150,
      radius: 5,
      moons: [{ name: "Moon", orbitSize: 20, radius: 1 }],
    },
    {
      name: "Mars",
      color: "red",
      orbitSize: 228,
      radius: 3,
      moons: [
        { name: "Phobos", orbitSize: 9, radius: 0.5 },
        { name: "Deimos", orbitSize: 15, radius: 0.3 },
      ],
    },
    // Insert additional planets and moons here
  ];

  // Function to draw orbits and celestial bodies
  bodies.forEach((body, index) => {
    const orbitGroup = solarSystem.append("g").attr("class", "orbit-group");

    // Orbit path
    orbitGroup
      .append("circle")
      .attr("class", "orbit")
      .attr("r", body.orbitSize * 10)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-dasharray", "3,3");

    // Planet itself
    const planetGroup = orbitGroup
      .append("g")
      .attr("class", "planet-group")
      .datum(body); // Bind data to the group

    planetGroup
      .append("circle")
      .attr("class", "planet")
      .attr("r", body.radius)
      .attr("fill", body.color);

    planetGroup
      .append("text")
      .text(body.name)
      .attr("x", body.radius + 5)
      .attr("y", 3)
      .attr("fill", "white");

    // Moons
    const moonGroups = planetGroup
      .selectAll(".moon-group")
      .data(body.moons)
      .enter()
      .append("g")
      .attr("class", "moon-group");

    moonGroups
      .append("circle")
      .attr("class", "moon")
      .attr("r", (d) => d.radius)
      .attr("fill", "grey");

    moonGroups
      .append("text")
      .text((d) => d.name)
      .attr("x", (d) => d.radius + 2)
      .attr("y", 2)
      .attr("fill", "white");
  });

  // Function to update positions of planets and moons
  function updatePositions() {
    const time = Date.now() * 0.00005;
    solarSystem.selectAll(".planet-group").attr("transform", function (d) {
      const angle = time * (1 / (d.orbitSize + 0.1)) * Math.PI * 2;
      const x = Math.cos(angle) * d.orbitSize * 10;
      const y = Math.sin(angle) * d.orbitSize * 10;
      return `translate(${x}, ${y})`;
    });

    solarSystem.selectAll(".moon-group").attr("transform", function (d) {
      const angle = time * (1 / (d.orbitSize + 0.1)) * Math.PI * 30; // Faster rotation for moons
      const x = Math.cos(angle) * d.orbitSize;
      const y = Math.sin(angle) * d.orbitSize;
      return `translate(${x}, ${y})`;
    });
  }

  // Start the animation
  d3.timer(updatePositions);
});
