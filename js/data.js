import { content as callistoContent } from "./data/Callisto.js";
import { content as ceresContent } from "./data/Ceres.js";
import { content as charonContent } from "./data/Charon.js";
import { content as deimosContent } from "./data/Deimos.js";
import { content as earthContent } from "./data/Earth.js";
import { content as europaContent } from "./data/Europa.js";
import { content as ganymedeContent } from "./data/Ganymede.js";
import { content as ioContent } from "./data/Io.js";
import { content as jupiterContent } from "./data/Jupiter.js";
import { content as marsContent } from "./data/Mars.js";
import { content as mercuryContent } from "./data/Mercury.js";
import { content as moonContent } from "./data/Moon.js";
import { content as neptuneContent } from "./data/Neptune.js";
import { content as oberonContent } from "./data/Oberon.js";
import { content as phobosContent } from "./data/Phobos.js";
import { content as plutoContent } from "./data/Pluto.js";
import { content as rheaContent } from "./data/Rhea.js";
import { content as saturnContent } from "./data/Saturn.js";
import { content as sunContent } from "./data/Sun.js";
import { content as titanContent } from "./data/Titan.js";
import { content as titaniaContent } from "./data/Titania.js";
import { content as tritonContent } from "./data/Triton.js";
import { content as umbrielContent } from "./data/Umbriel.js";
import { content as uranusContent } from "./data/Uranus.js";
import { content as venusContent } from "./data/Venus.js";

// All celestials must have the following properties:
// * name: string, unique
// * color: hex
// * radius: number
// * content: string
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
// Notes:
// * Entity Speed method: Entity actual speed % 0.001 (for planets, and 0.01 for moon) = Javascript units on "orbitSpeed"
// * Entity Distance from Sun : Entity actual distance from sun in AU * 80 = the value for orbitRadius

export const data = {
  name: "Sun",
  color: 0xff9966,
  emissive: {
    color: 0xaaa888,
    intensity: 120,
    decay: 0.5,
  },
  detail: 1,
  radius: 15,
  content: sunContent,
  children: [
    {
      type: "particles",
      name: "Asteroid Belt",
      color: 0xaaaaaa,
      radius: 0.25,
      orbitInnerRadius: 260,
      orbitOuterRadius: 360,
      orbitThickness: 0.1,
      ringVolume: 20000,
      orbitSpeed: 0.0001,
      orbitInclination: 0.185,
      orbitInclination: Math.PI,
    },
    {
      type: "particles",
      name: "Kuiper Belt",
      color: 0xaaaaaa,
      radius: 0.5,
      orbitInnerRadius: 4800,
      orbitOuterRadius: 6800,
      orbitThickness: 0.1,
      ringVolume: 1000000,
      orbitSpeed: 0.00001,
      orbitInclination: 0.299,
    },
    {
      name: "Mercury",
      color: 0xaaaaaa,
      radius: 0.383,
      orbitRadius: 39,
      orbitSpeed: 0.00479,
      orbitInclination: 0.122,
      detail: 2,
      content: mercuryContent,
    },
    {
      name: "Venus",
      color: 0xffcc99,
      radius: 0.95,
      orbitRadius: 72,
      orbitSpeed: 0.0035,
      orbitInclination: 0.059,
      detail: 2,
      content: venusContent,
    },
    {
      name: "Earth",
      color: 0x0000ff,
      radius: 1,
      orbitRadius: 100,
      orbitSpeed: 0.00298,
      orbitInclination: 0.017,
      detail: 2,
      content: earthContent,
      children: [
        {
          name: "Moon",
          color: 0xaaaaaa,
          radius: 0.273,
          orbitRadius: 3,
          orbitSpeed: 0.0102,
          detail: 2,
          content: moonContent,
        },
      ],
    },
    {
      name: "Mars",
      color: 0xff3300,
      radius: 0.532,
      orbitRadius: 152,
      orbitSpeed: 0.00241,
      orbitInclination: 0.032,
      detail: 2,
      content: marsContent,
      children: [
        {
          name: "Phobos",
          color: 0x888888,
          radius: 0.1,
          orbitRadius: 1.81,
          orbitSpeed: 0.0214,
          detail: 2,
          content: phobosContent,
        },
        {
          name: "Deimos",
          color: 0x888888,
          radius: 0.08,
          orbitRadius: 3.02,
          orbitSpeed: 0.0135,
          detail: 2,
          content: deimosContent,
        },
      ],
    },
    {
      name: "Ceres",
      color: 0xe0ffff,
      radius: 0.074,
      orbitRadius: 270,
      orbitSpeed: 0.0179,
      orbitInclination: 0.185,
      content: ceresContent,
    },
    {
      name: "Jupiter",
      color: 0xffc880,
      radius: 4.5,
      orbitRadius: 520,
      orbitSpeed: 0.00131,
      orbitInclination: 0.0223,
      detail: 1,
      content: jupiterContent,
      children: [
        {
          name: "Io",
          color: 0xffd700,
          radius: 0.3,
          orbitRadius: 6.28,
          orbitSpeed: 0.1733,
          detail: 2,
          content: ioContent,
        },
        {
          name: "Europa",
          color: 0xfffff0,
          radius: 0.25,
          orbitRadius: 7.45,
          orbitSpeed: 0.1374,
          detail: 2,
          content: europaContent,
        },
        {
          name: "Ganymede",
          color: 0xc2b280,
          radius: 0.4,
          orbitRadius: 8.72,
          orbitSpeed: 0.1088,
          detail: 2,
          content: ganymedeContent,
        },
        {
          name: "Callisto",
          color: 0x778899,
          radius: 0.3,
          orbitRadius: 9.5,
          orbitSpeed: 1.26,
          detail: 2,
          content: callistoContent,
        },
      ],
    },
    {
      name: "Saturn",
      color: 0xffff66,
      radius: 5.5,
      orbitRadius: 958,
      orbitSpeed: 0.0097,
      orbitInclination: 0.044,
      detail: 1,
      content: saturnContent,
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
          content: titanContent,
        },
        {
          name: "Rhea",
          color: 0xdcdcdc,
          radius: 0.21,
          orbitRadius: 9.2,
          orbitSpeed: 0.0848,
          detail: 2,
          content: rheaContent,
        },
      ],
    },
    {
      name: "Uranus",
      color: 0x66ccff,
      radius: 3.9,
      orbitRadius: 1922,
      orbitSpeed: 0.0068,
      orbitInclination: 0.014,
      detail: 1,
      content: uranusContent,
      children: [
        {
          name: "Titania",
          color: 0xc0c0c0,
          radius: 0.02,
          orbitRadius: 6.9,
          orbitSpeed: 0.0364,
          detail: 2,
          content: titaniaContent,
        },
        {
          name: "Umbriel",
          color: 0x696969,
          radius: 0.015,
          orbitRadius: 7.9,
          orbitSpeed: 0.0467,
          detail: 2,
          content: umbrielContent,
        },
        {
          name: "Oberon",
          color: 0xa9a9a9,
          radius: 0.018,
          orbitRadius: 9.9,
          orbitSpeed: 0.0315,
          detail: 2,
          content: oberonContent,
        },
      ],
    },
    {
      name: "Neptune",
      color: 0x6666ff,
      radius: 3.8,
      orbitRadius: 3005,
      orbitSpeed: 0.0054,
      orbitInclination: 0.031,
      detail: 1,
      content: neptuneContent,
      children: [
        {
          name: "Triton",
          color: 0xadd8e6,
          radius: 0.3,
          orbitRadius: 6.24,
          orbitSpeed: 0.0439,
          detail: 2,
          content: tritonContent,
        },
      ],
    },
    {
      name: "Pluto",
      color: 0xaaaaaa,
      radius: 0.186,
      orbitRadius: 3948,
      orbitSpeed: 0.0047,
      orbitInclination: 0.299,
      detail: 1,
      content: plutoContent,
      children: [
        {
          name: "Charon",
          color: 0x888888,
          radius: 0.09,
          orbitRadius: 1.9,
          orbitSpeed: 0.021,
          detail: 2,
          content: charonContent,
        },
      ],
    },
    // Dwarf Planets
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
