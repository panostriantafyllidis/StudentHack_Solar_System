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
//
// * ###  NOTES ::
// ENTITY Speed method:
// Entity actual speed % 0.001 (for planets, and 0.01 for moon) = Javascript units on "orbitspeed"
// ENITY Distance from Sun :
// Entity actual distance from sun in AU * 80 = the value for orbitRadius

export const data = {
  name: "Sun",
  color: 0xff9966,
  emissive: {
    color: 0xeee888,
    intensity: 120,
    decay: 0.5,
  },
  detail: 1,
  radius: 15,
  children: [
    {
      type: "particles",
      name: "Asteroid_belt",
      color: 0xaaaaaa,
      radius: 0.1,
      orbitInnerRadius: 260,
      orbitOuterRadius: 360,
      orbitThickness: 0.1,
      ringVolume: 4000,
      orbitSpeed: 0.0001,
      orbitInclination: Math.PI,
    },
    {
      type: "particles",
      name: "Kuiper_belt",
      color: 0xaaaaaa,
      radius: 0.01,
      orbitInnerRadius: 4800,
      orbitOuterRadius: 6800,
      orbitThickness: 0.1,
      ringVolume: 4000,
      orbitSpeed: 0.00001,
      orbitInclination: Math.PI,
    },
    {
      name: "Mercury",
      color: 0xaaaaaa,
      radius: 0.383,
      orbitRadius: 39,
      orbitSpeed: 0.00479,
      detail: 2,
    },
    {
      name: "Venus",
      color: 0xffcc99,
      radius: 0.95,
      orbitRadius: 72,
      orbitSpeed: 0.0035,
      detail: 2,
    },
    {
      name: "Earth",
      color: 0x0000ff,
      radius: 1,
      orbitRadius: 100,
      orbitSpeed: 0.00298,
      detail: 2,
      children: [
        {
          name: "Moon",
          color: 0xaaaaaa,
          radius: 0.273,
          orbitRadius: 3,
          orbitSpeed: 0.0102,
          detail: 2,
        },
      ],
    },
    {
      name: "Mars",
      color: 0xff3300,
      radius: 0.532,
      orbitRadius: 152,
      orbitSpeed: 0.00241,
      detail: 2,
      children: [
        {
          name: "Phobos",
          color: 0x888888,
          radius: 0.1,
          orbitRadius: 1.81,
          orbitSpeed: 0.0214,
          detail: 2,
        },
        {
          name: "Deimos",
          color: 0x888888,
          radius: 0.08,
          orbitRadius: 3.02,
          orbitSpeed: 0.0135,
          detail: 2,
        },
      ],
    },
    {
      name: "Ceres",
      color: 0xe0ffff,
      radius: 0.074,
      orbitRadius: 270,
      orbitSpeed: 0.0179,
    },
    {
      name: "Jupiter",
      color: 0xffc880,
      radius: 4.5,
      orbitRadius: 520,
      orbitSpeed: 0.00131,
      detail: 1,
      children: [
        {
          name: "Io",
          color: 0xffd700,
          radius: 0.3,
          orbitRadius: 6.28,
          orbitSpeed: 0.1733,
          detail: 2,
        },
        {
          name: "Europa",
          color: 0xfffff0,
          radius: 0.25,
          orbitRadius: 7.45,
          orbitSpeed: 0.1374,
          detail: 2,
        },
        {
          name: "Ganymede",
          color: 0xc2b280,
          radius: 0.4,
          orbitRadius: 8.72,
          orbitSpeed: 0.1088,
          detail: 2,
        },
        {
          name: "Callisto",
          color: 0x778899,
          radius: 0.3,
          orbitRadius: 9.5,
          orbitSpeed: 1.26,
          detail: 2,
        },
      ],
    },
    {
      name: "Saturn",
      color: 0xffff66,
      radius: 5.5,
      orbitRadius: 958,
      orbitSpeed: 0.0097,
      detail: 1,
      children: [
        {
          type: "particles",
          name: "Saturn Ring",
          color: 0xaaaaaa,
          radius: 0.01,
          orbitInnerRadius: 8,
          orbitOuterRadius: 11,
          orbitThickness: 0.1,
          ringVolume: 2200,
          orbitSpeed: 0.001,
          orbitInclination: Math.PI,
        },
        {
          name: "Titan",
          color: 0xf4a460,
          radius: 0.4,
          orbitRadius: 7.82,
          orbitSpeed: 0.0557,
          detail: 2,
        },
        {
          name: "Rhea",
          color: 0xdcdcdc,
          radius: 0.21,
          orbitRadius: 9.2,
          orbitSpeed: 0.0848,
          detail: 2,
        },
      ],
    },
    {
      name: "Uranus",
      color: 0x66ccff,
      radius: 3.9,
      orbitRadius: 1922,
      orbitSpeed: 0.0068,
      detail: 1,
      children: [
        {
          name: "Titania",
          color: 0xc0c0c0,
          radius: 0.02,
          orbitRadius: 6.9,
          orbitSpeed: 0.0364,
          detail: 2,
        },
        {
          name: "Oberon",
          color: 0xa9a9a9,
          radius: 0.018,
          orbitRadius: 7.9,
          orbitSpeed: 0.0315,
          detail: 2,
        },
        {
          name: "Umbriel",
          color: 0x696969,
          radius: 0.015,
          orbitRadius: 9.9,
          orbitSpeed: 0.0467,
          detail: 2,
        },
      ],
    },
    {
      name: "Neptune",
      color: 0x6666ff,
      radius: 3.8,
      orbitRadius: 3005,
      orbitSpeed: 0.0054,
      detail: 1,
      children: [
        {
          name: "Triton",
          color: 0xadd8e6,
          radius: 0.3,
          orbitRadius: 6.24,
          orbitSpeed: 0.0439,
          detail: 2,
        },
      ],
    },
    {
      name: "Pluto",
      color: 0xaaaaaa,
      radius: 0.186,
      orbitRadius: 3948,
      orbitSpeed: 0.0047,
      detail: 1,
      children: [
        {
          name: "Charon",
          color: 0x888888,
          radius: 0.09,
          orbitRadius: 1.9,
          orbitSpeed: 0.021,
          detail: 2,
        },
      ],
    },
    // Adding Dwarf Planets

    {
      name: "Makemake",
      color: 0xffe4c4,
      radius: 0.112,
      orbitRadius: 4579,
      orbitSpeed: 0.04419,
    },
    {
      name: "Haumea",
      color: 0xdec4b0,
      radius: 0.128,
      orbitRadius: 4313,
      orbitSpeed: 0.04484,
    },
    {
      name: "Eris",
      color: 0xc0c0c0,
      radius: 0.183,
      orbitRadius: 6778,
      orbitSpeed: 0.0343,
    },
  ],
};
