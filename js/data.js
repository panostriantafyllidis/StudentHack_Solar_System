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
      name: "Mercury",
      color: 0xaaaaaa,
      radius: 0.38,
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
      radius: 0.53,
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
        },
        {
          name: "Deimos",
          color: 0x888888,
          radius: 0.08,
          orbitRadius: 3.02,
          orbitSpeed: 0.0135,
        },
      ],
    },
    {
      name: "Jupiter",
      color: 0xffc880,
      radius: 2.5,
      orbitRadius: 520,
      orbitSpeed: 0.00131,
      detail: 1,
      children: [
        {
          name: "Io",
          color: 0xffd700,
          radius: 0.3,
          orbitRadius: 3.28,
          orbitSpeed: 0.1733,
        },
        {
          name: "Europa",
          color: 0xfffff0,
          radius: 0.25,
          orbitRadius: 4.45,
          orbitSpeed: 0.1374,
        },
        {
          name: "Ganymede",
          color: 0xc2b280,
          radius: 0.4,
          orbitRadius: 5.72,
          orbitSpeed: 0.1088,
        },
        {
          name: "Callisto",
          color: 0x778899,
          radius: 0.25,
          orbitRadius: 6.5,
          orbitSpeed: 1.26,
        },
      ],
    },
    {
      name: "Saturn",
      color: 0xffff66,
      radius: 2.1,
      orbitRadius: 958,
      orbitSpeed: 0.0097,
      detail: 1,
      children: [
        {
          type: "particles",
          name: "Saturn Ring",
          color: 0xaaaaaa,
          radius: 0.1,
          orbitInnerRadius: 5,
          orbitOuterRadius: 7,
          orbitThickness: 0.1,
          ringVolume: 1000,
          orbitSpeed: 0.001,
          orbitInclination: 0.5,
        },
        {
          name: "Titan",
          color: 0xf4a460,
          radius: 0.4,
          orbitRadius: 5.82,
          orbitSpeed: 0.0557,
        },
        {
          name: "Rhea",
          color: 0xdcdcdc,
          radius: 0.12,
          orbitRadius: 7.2,
          orbitSpeed: 0.0848,
        },
      ],
    },
    {
      name: "Uranus",
      color: 0x66ccff,
      radius: 1.7,
      orbitRadius: 1922,
      orbitSpeed: 0.0068,
      detail: 1,
      children: [
        {
          name: "Titania",
          color: 0xc0c0c0,
          radius: 0.2,
          orbitRadius: 3,
          orbitSpeed: 0.0364,
        },
        {
          name: "Oberon",
          color: 0xa9a9a9,
          radius: 0.18,
          orbitRadius: 5,
          orbitSpeed: 0.0315,
        },
        {
          name: "Umbriel",
          color: 0x696969,
          radius: 0.15,
          orbitRadius: 7,
          orbitSpeed: 0.0467,
        },
      ],
    },
    {
      name: "Neptune",
      color: 0x6666ff,
      radius: 1.6,
      orbitRadius: 3005,
      orbitSpeed: 0.0054,
      detail: 1,
      children: [
        {
          name: "Triton",
          color: 0xadd8e6,
          radius: 0.3,
          orbitRadius: 3.24,
          orbitSpeed: 0.0439,
        },
      ],
    },
    {
      name: "Pluto",
      color: 0xaaaaaa,
      radius: 0.18,
      orbitRadius: 3948,
      orbitSpeed: 0.0047,
      children: [
        {
          name: "Charon",
          color: 0x888888,
          radius: 0.09,
          orbitRadius: 1.9,
          orbitSpeed: 0.021,
        },
      ],
    },
    /*     // Adding Dwarf Planets and their moons

    {
      name: "Eris",
      color: 0xc0c0c0,
      radius: 0.18,
      orbitRadius: 300,
      orbitSpeed: 0.343,
      children: [
        {
          name: "Dysnomia",
          color: 0x999999,
          radius: 0.05,
          orbitRadius: 1.2,
          orbitSpeed: 0.01, // Estimated speed for visualization
        },
      ],
    },
    {
      name: "Haumea",
      color: 0xdec4b0,
      radius: 0.12,
      orbitRadius: 270,
      orbitSpeed: 0.44,
      children: [
        {
          name: "Hi'iaka",
          color: 0xeeeeee,
          radius: 0.04,
          orbitRadius: 1,
          orbitSpeed: 0.4,
        },
        {
          name: "Namaka",
          color: 0xcccccc,
          radius: 0.02,
          orbitRadius: 1.5,
          orbitSpeed: 0.2,
        },
      ],
    },
    {
      name: "Makemake",
      color: 0xffe4c4,
      radius: 0.14,
      orbitRadius: 280,
      orbitSpeed: 0.44,
      children: [
        {
          name: "S/2015 (136472) 1",
          color: 0xfffacd,
          radius: 0.02,
          orbitRadius: 0.9,
          orbitSpeed: 0.1,
        },
      ],
    },
    {
      name: "Ceres",
      color: 0xe0ffff,
      radius: 0.08,
      orbitRadius: 220,
      orbitSpeed: 0.179,
    }, */
  ],
};
