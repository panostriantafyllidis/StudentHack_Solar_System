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
      orbitSpeed: 5, // 50% reduction from 10
    },
    {
      name: "Venus",
      color: 0xffcc99,
      radius: 0.95,
      orbitRadius: 16,
      orbitSpeed: 3, // 50% reduction from 6
    },
    {
      name: "Earth",
      color: 0x0000ff,
      radius: 1,
      orbitRadius: 40,
      orbitSpeed: 2.5, // 50% reduction from 5
      children: [
        {
          name: "Moon",
          color: 0xaaaaaa,
          radius: 0.2,
          orbitRadius: 3,
          orbitSpeed: 15, // 50% reduction from 30
        },
      ],
    },
    {
      name: "Mars",
      color: 0xff3300,
      radius: 0.53,
      orbitRadius: 50,
      orbitSpeed: 2, // 50% reduction from 4
      children: [
        {
          name: "Phobos",
          color: 0x888888,
          radius: 0.1,
          orbitRadius: 1.5,
          orbitSpeed: 1500, // 50% reduction from 3000
        },
        {
          name: "Deimos",
          color: 0x888888,
          radius: 0.08,
          orbitRadius: 2,
          orbitSpeed: 500, // 50% reduction from 1000
        },
      ],
    },
    {
      name: "Jupiter",
      color: 0xffc880,
      radius: 2.5,
      orbitRadius: 80,
      orbitSpeed: 1.25, // 50% reduction from 2.5
      children: [
        {
          name: "Io",
          color: 0xffd700,
          radius: 0.3,
          orbitRadius: 3.5,
          orbitSpeed: 250, // 50% reduction from 500
        },
        {
          name: "Europa",
          color: 0xfffff0,
          radius: 0.25,
          orbitRadius: 4.5,
          orbitSpeed: 200, // 50% reduction from 400
        },
        {
          name: "Ganymede",
          color: 0xc2b280,
          radius: 0.4,
          orbitRadius: 5.5,
          orbitSpeed: 150, // 50% reduction from 300
        },
        {
          name: "Callisto",
          color: 0x778899,
          radius: 0.35,
          orbitRadius: 6.5,
          orbitSpeed: 100, // 50% reduction from 200
        },
      ],
    },
    {
      name: "Saturn",
      color: 0xffff66,
      radius: 2.1,
      orbitRadius: 120,
      orbitSpeed: 1.0, // 50% reduction from 2.0
      children: [
        {
          name: "Titan",
          color: 0xf5deb3,
          radius: 0.4,
          orbitRadius: 7,
          orbitSpeed: 0.8, // 50% reduction from 1.6
        },
        {
          name: "Rhea",
          color: 0xadd8e6,
          radius: 0.2,
          orbitRadius: 5,
          orbitSpeed: 0.9, // 50% reduction from 1.8
        },
        {
          type: "particles",
          name: "Saturn's Rings",
          color: 0xaaaaaa,
          orbitInnerRadius: 2.5,
          orbitOuterRadius: 5,
          orbitThickness: 0.1,
          ringVolume: 1000,
          orbitSpeed: 0.0015, // 50% reduction from 0.003
          orbitInclination: 0.5,
        },
      ],
    },
    {
      name: "Uranus",
      color: 0x66ccff,
      radius: 1.7,
      orbitRadius: 160,
      orbitSpeed: 0.7, // 50% reduction from 1.4
      children: [
        {
          name: "Titania",
          color: 0xc0c0c0,
          radius: 0.2,
          orbitRadius: 5,
          orbitSpeed: 1, // 50% reduction from 2
        },
        {
          name: "Oberon",
          color: 0xa9a9a9,
          radius: 0.18,
          orbitRadius: 6,
          orbitSpeed: 0.9, // 50% reduction from 1.8
        },
        {
          name: "Umbriel",
          color: 0x696969,
          radius: 0.15,
          orbitRadius: 4,
          orbitSpeed: 0.8, // 50% reduction from 1.6
        },
      ],
    },
    {
      name: "Neptune",
      color: 0x6666ff,
      radius: 1.6,
      orbitRadius: 200,
      orbitSpeed: 0.55, // 50% reduction from 1.1
      children: [
        {
          name: "Triton",
          color: 0xadd8e6,
          radius: 0.3,
          orbitRadius: 6,
          orbitSpeed: 0.65, // 50% reduction from 1.3
        },
      ],
    },
  ],
};
