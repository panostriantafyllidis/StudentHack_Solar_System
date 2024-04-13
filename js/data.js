// All celestials must have the following properties:
// name: string, unique
// color: hex
// radius: number
//
// There are two types of celestials:
// * body (default)
//     Body celestials must have the following properties (except for the root celestial):
//     * orbitRadius: number
//     * orbitSpeed: number
//
//     Body celestials may also have the following properties:
//     * rotationSpeed: number
//     * inclination: number
//     * orbitInclination: number
//     * orbitInclinationAngle: number
//     * children: array of celestials
//     * emmisive: object
//         The `emissive` property must have the following properties:
//         * color: hex
//
//         The `emissive` property may also have the following properties:
//         * intensity: number
//         * distance: number
//         * decay: number
//
// * particles
//     Particle celestials must have the following properties:
//     * orbitInnerRadius: number
//     * orbitOuterRadius: number
//     * orbitThickness: number
//     * ringVolume: number
//
//     Particle celestials may also have the following properties:
//     * orbitSpeed: number
//     * orbitInclination: number

export const data = {
  name: "Sun",
  color: 0xff9966,
  emissive: {
    color: 0xff9966,
    intensity: 100,
    decay: 0.5,
  },
  radius: 5,
  children: [
    {
      name: "Mercury",
      color: 0xaaaaaa,
      radius: 0.38,
      orbitRadius: 10,
      orbitSpeed: 4.0,
      orbitInclination: 1,
    },
    {
      name: "Venus",
      color: 0xffcc99,
      radius: 0.95,
      orbitRadius: 16,
      orbitSpeed: 1.5,
      orbitInclination: 0.5,
      orbitInclinationAngle: 40,
    },
    {
      name: "Earth",
      color: 0x0000ff,
      radius: 1,
      orbitRadius: 40,
      orbitSpeed: 1.0,
      children: [
        {
          name: "Moon",
          color: 0xaaaaaa,
          radius: 0.2,
          orbitRadius: 3,
          orbitSpeed: 1.5,
        },
      ],
    },
    {
      name: "Mars",
      color: 0xff3300,
      radius: 0.53,
      orbitRadius: 50,
      orbitSpeed: 0.8,
      children: [
        {
          name: "Phobos",
          color: 0x888888,
          radius: 0.1,
          orbitRadius: 1.5,
          orbitSpeed: 2.1,
        },
        {
          name: "Deimos",
          color: 0x888888,
          radius: 0.08,
          orbitRadius: 2,
          orbitSpeed: 1.2,
        },
      ],
    },
    {
      name: "Jupiter",
      color: 0xffc880,
      radius: 2.5,
      orbitRadius: 80,
      orbitSpeed: 0.4,
      children: [
        {
          name: "Io",
          color: 0xffd700,
          radius: 0.3,
          orbitRadius: 3.5,
          orbitSpeed: 1.8,
        },
        {
          name: "Europa",
          color: 0xfffff0,
          radius: 0.25,
          orbitRadius: 4.5,
          orbitSpeed: 1.4,
        },
        {
          name: "Ganymede",
          color: 0xc2b280,
          radius: 0.4,
          orbitRadius: 5.5,
          orbitSpeed: 1.1,
        },
        {
          name: "Callisto",
          color: 0x778899,
          radius: 0.35,
          orbitRadius: 6.5,
          orbitSpeed: 0.9,
        },
      ],
    },
    {
      name: "Saturn",
      color: 0xffff66,
      radius: 2.1,
      orbitRadius: 120,
      orbitSpeed: 0.3,
      children: [
        {
          type: "particles",
          name: "Saturn Ring",
          color: 0xffffdd,
          radius: 0.1,
          orbitInnerRadius: 3,
          orbitOuterRadius: 5,
          orbitThickness: 0.1,
          ringVolume: 1000,
          orbitSpeed: 0.001,
          orbitInclination: 0.5,
        },
      ],
    },
    {
      name: "Uranus",
      color: 0x66ccff,
      radius: 1.7,
      orbitRadius: 160,
      orbitSpeed: 0.2,
      children: [
        {
          name: "Titania",
          color: 0xc0c0c0,
          radius: 0.2,
          orbitRadius: 5,
          orbitSpeed: 1.5,
        },
        {
          name: "Oberon",
          color: 0xa9a9a9,
          radius: 0.18,
          orbitRadius: 6,
          orbitSpeed: 1.4,
        },
        {
          name: "Umbriel",
          color: 0x696969,
          radius: 0.15,
          orbitRadius: 4,
          orbitSpeed: 1.6,
        },
      ],
    },
    {
      name: "Neptune",
      color: 0x6666ff,
      radius: 1.6,
      orbitRadius: 200,
      orbitSpeed: 0.1,
      children: [
        {
          name: "Triton",
          color: 0xadd8e6,
          radius: 0.3,
          orbitRadius: 6,
          orbitSpeed: 1.3,
        },
      ],
    },
  ],
};
