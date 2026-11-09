export type View = { id: string; src: string; thumb: string; rig: string; label: string; date: string; width: number; height: number; hours?: number | null; integrationNote?: string; acquisition?: string | null; legacy?: boolean; astrobin?: string; dateKind?: string }
export type Photograph = { id: string; title: string; catalog: string; group: string; caption: string; description: string; alt: string; tags: string[]; views: View[] }
export const groups = [
  {
    "id": "dark-dust",
    "title": "Dark nebulae",
    "description": "The shapes made by absence.",
    "cover": "shark"
  },
  {
    "id": "reflection",
    "title": "Reflection nebulae",
    "description": "Starlight caught in the dust.",
    "cover": "pleiades"
  },
  {
    "id": "emission",
    "title": "Emission nebulae",
    "description": "The clouds that glow.",
    "cover": "elephant-trunk"
  },
  {
    "id": "galaxies",
    "title": "Galaxies",
    "description": "Islands beyond our own.",
    "cover": "andromeda"
  },
  {
    "id": "star-fields",
    "title": "Star fields",
    "description": "Windows into the Milky Way.",
    "cover": "v379-vul"
  },
  {
    "id": "solar-system",
    "title": "The Solar System",
    "description": "Our celestial neighborhood.",
    "cover": "moon"
  }
]
export const photographs: Photograph[] = [
  {
    "id": "iris",
    "title": "The Iris Nebula",
    "catalog": "NGC 7023",
    "group": "reflection",
    "caption": "A blue flower in a sea of dust.",
    "description": "The Iris Nebula’s blue reflection glow emerges from a dense cloud of Cepheus dust.",
    "alt": "The Iris Nebula: A blue flower in a sea of dust.",
    "tags": [
      "NGC7023_Origin678C"
    ],
    "views": [
      {
        "id": "58849ae674",
        "src": "/gallery/58849ae674.jpg",
        "thumb": "/gallery/58849ae674-900.jpg",
        "rig": "Celestron Origin",
        "label": "Personal final curve · 9.9 h",
        "date": "2026-11-08",
        "hours": 9.9,
        "acquisition": "2026-06-15, 06-19, 08-18 and 11-03; 594 × 60 s",
        "astrobin": "https://app.astrobin.com/i/3op4q6",
        "width": 3708,
        "height": 1948
      }
    ]
  },
  {
    "id": "seahorse",
    "title": "The Seahorse Nebula",
    "catalog": "vdB 152 · Barnard 175",
    "group": "dark-dust",
    "caption": "A dark pillar with a blue-lit crown.",
    "description": "The Wolf’s Cave, vdB 152, illuminates the head of the long dark cloud LDN 1217.",
    "alt": "The Seahorse Nebula: A dark pillar with a blue-lit crown.",
    "tags": [
      "VdB152_C11HyperStar",
      "VdB152_FLT120_Origin678C",
      "VdB152_Origin678C",
      "VdB152_SQA55"
    ],
    "views": [
      {
        "id": "d9a7f4d5f5",
        "src": "/gallery/d9a7f4d5f5.jpg",
        "thumb": "/gallery/d9a7f4d5f5-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Full frame",
        "date": "2026-11-06",
        "hours": 3.67,
        "acquisition": "2026-11-03/04; 44 × 300 s",
        "astrobin": "https://app.astrobin.com/i/ypfvjq",
        "width": 6096,
        "height": 3968
      },
      {
        "id": "d41dc07e23",
        "src": "/gallery/d41dc07e23.jpg",
        "thumb": "/gallery/d41dc07e23-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Brighter dust · alternate finish",
        "date": "2026-11-08",
        "hours": 3.67,
        "acquisition": "2026-11-03/04; 44 × 300 s",
        "width": 6096,
        "height": 3968
      },
      {
        "id": "b8def1f802",
        "src": "/gallery/b8def1f802.jpg",
        "thumb": "/gallery/b8def1f802-900.jpg",
        "rig": "William Optics FLT120 + Celestron Origin",
        "label": "Combined view",
        "date": "2026-10-29",
        "hours": null,
        "acquisition": "Origin 2026-06-19/20, 2.35 h; FLT120 2026-09-15/16, 5.80 h; stars Origin 1.94 h",
        "integrationNote": "8.15 h of contributing data; depth varies across the frame and image layers.",
        "width": 3696,
        "height": 1904
      },
      {
        "id": "070a677de1",
        "src": "/gallery/070a677de1.jpg",
        "thumb": "/gallery/070a677de1-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-10-28",
        "hours": 2.35,
        "acquisition": "2026-06-19/20; nebula 282 × 30 s, stars 233 × 30 s",
        "astrobin": "https://app.astrobin.com/i/xwedvk",
        "width": 3696,
        "height": 1904
      },
      {
        "id": "25f0bde44e",
        "src": "/gallery/25f0bde44e.jpg",
        "thumb": "/gallery/25f0bde44e-900.jpg",
        "rig": "Askar SQA55",
        "label": "Wide field",
        "date": "2026-11-07",
        "hours": 1.8,
        "acquisition": "2026-11-03/04; 54 × 120 s",
        "astrobin": "https://app.astrobin.com/i/o90ror",
        "width": 6104,
        "height": 3976
      }
    ]
  },
  {
    "id": "horsehead",
    "title": "The Horsehead & Flame",
    "catalog": "IC 434 · NGC 2024",
    "group": "emission",
    "caption": "Silhouette, flame, and the blue light between.",
    "description": "A three-panel broadband mosaic of the Horsehead, Flame and NGC 2023, finished with Aous’s own color edit.",
    "alt": "The Horsehead & Flame: Silhouette, flame, and the blue light between.",
    "tags": [
      "IC434_NGC2024_Origin678C",
      "IC434_FLT120",
      "IC434_C11HyperStar"
    ],
    "views": [
      {
        "id": "ba8eea3695",
        "src": "/gallery/ba8eea3695.jpg",
        "thumb": "/gallery/ba8eea3695-900.jpg",
        "rig": "NGC2024 + Celestron Origin",
        "label": "Personal color edit · mosaic",
        "date": "2026-11-05",
        "hours": null,
        "acquisition": "2026-09-14/15; approximately one hour per mosaic tile",
        "astrobin": "https://app.astrobin.com/i/rkda4c",
        "width": 5584,
        "height": 3736
      },
      {
        "id": "68e848b142",
        "src": "/gallery/68e848b142.jpg",
        "thumb": "/gallery/68e848b142-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-10-22",
        "hours": 5.77,
        "acquisition": "2026-08-24, 08-29 and 09-06; 101 exposures",
        "astrobin": "https://app.astrobin.com/i/x5la7h",
        "width": 8024,
        "height": 5300
      },
      {
        "id": "5366cb96bb",
        "src": "/gallery/5366cb96bb.jpg",
        "thumb": "/gallery/5366cb96bb-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Full frame",
        "date": "2026-10-03",
        "hours": 3.5,
        "acquisition": null,
        "astrobin": "https://app.astrobin.com/i/npklmw",
        "width": 3092,
        "height": 2076
      }
    ]
  },
  {
    "id": "andromeda",
    "title": "The Andromeda Galaxy",
    "catalog": "M31",
    "group": "galaxies",
    "caption": "Dust lanes across our great galactic neighbor.",
    "description": "A two-telescope portrait of Andromeda, joining the SQA55’s broad halo with FLT120 detail.",
    "alt": "The Andromeda Galaxy: Dust lanes across our great galactic neighbor.",
    "tags": [
      "M31_SQA55_FLT120",
      "M31_FLT120",
      "M31_SQA55"
    ],
    "views": [
      {
        "id": "1cb07283ff",
        "src": "/gallery/1cb07283ff.jpg",
        "thumb": "/gallery/1cb07283ff-900.jpg",
        "rig": "Askar SQA55 + William Optics FLT120",
        "label": "Combined detail & wide field",
        "date": "2026-10-21",
        "hours": null,
        "acquisition": "SQA55 7.22 h; FLT120 main frame 3.25 h; two separate FLT120 panels 20 and 25 min",
        "integrationNote": "SQA55 7.22 h + FLT120 4.00 h across three different sky regions",
        "width": 11390,
        "height": 6401
      },
      {
        "id": "b1b73fda10",
        "src": "/gallery/b1b73fda10.jpg",
        "thumb": "/gallery/b1b73fda10-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-10-15",
        "hours": 3.25,
        "acquisition": "2026-08-18/19 and 2026-10-05; 39 × 300 s",
        "astrobin": "https://app.astrobin.com/i/thjwqv",
        "width": 7968,
        "height": 4584
      },
      {
        "id": "7bfffd1e6d",
        "src": "/gallery/7bfffd1e6d.jpg",
        "thumb": "/gallery/7bfffd1e6d-900.jpg",
        "rig": "Askar SQA55",
        "label": "Wide field",
        "date": "2026-10-16",
        "hours": 7.22,
        "acquisition": "2026-08-19/20 and 2026-09-15/16; 179 exposures",
        "astrobin": "https://app.astrobin.com/i/loezef",
        "width": 4500,
        "height": 2531
      }
    ]
  },
  {
    "id": "pleiades",
    "title": "The Pleiades",
    "catalog": "M45",
    "group": "reflection",
    "caption": "Young blue stars passing through ancient dust.",
    "description": "The Pleiades: blue starlight scattered by dust around the Seven Sisters.",
    "alt": "The Pleiades: Young blue stars passing through ancient dust.",
    "tags": [
      "M45_FLT120"
    ],
    "views": [
      {
        "id": "f0822f6497",
        "src": "/gallery/f0822f6497.jpg",
        "thumb": "/gallery/f0822f6497-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-11-07",
        "hours": 3.92,
        "acquisition": "2026-11-03/04; 47 × 300 s",
        "astrobin": "https://app.astrobin.com/i/g5zenp",
        "width": 8088,
        "height": 5328
      }
    ]
  },
  {
    "id": "barnards-e",
    "title": "Barnard’s E",
    "catalog": "B142 · B143",
    "group": "dark-dust",
    "caption": "Two dark clouds interrupt the Milky Way.",
    "description": "Barnard’s E: the dark clouds B142 and B143 interrupt a dense field of Milky Way stars in Aquila.",
    "alt": "Barnard’s E: Two dark clouds interrupt the Milky Way.",
    "tags": [
      "B142_Origin678C"
    ],
    "views": [
      {
        "id": "6910181bae",
        "src": "/gallery/6910181bae.jpg",
        "thumb": "/gallery/6910181bae-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-07",
        "hours": 3.35,
        "acquisition": "2026-09-15; two mosaic panels, 201 × 60 s total",
        "astrobin": "https://app.astrobin.com/i/xmbnd2",
        "width": 3744,
        "height": 3784
      }
    ]
  },
  {
    "id": "orion",
    "title": "The Orion Nebula",
    "catalog": "M42 · M43",
    "group": "emission",
    "caption": "A stellar nursery, in more than one palette.",
    "description": "The Orion Nebula in sulfur and oxygen, with an exposure blend retaining the bright central region.",
    "alt": "The Orion Nebula: A stellar nursery, in more than one palette.",
    "tags": [
      "M42_FLT120_D2",
      "M42_C11HyperStar",
      "M42_FLT120"
    ],
    "views": [
      {
        "id": "7b1ee37c4e",
        "src": "/gallery/7b1ee37c4e.jpg",
        "thumb": "/gallery/7b1ee37c4e-900.jpg",
        "rig": "William Optics FLT120",
        "label": "HOO palette",
        "date": "2026-11-06",
        "hours": 5.9,
        "acquisition": "2026-10-01/02 and 2026-11-02; exposure blend, 277 exposures, 354 min",
        "astrobin": "https://app.astrobin.com/i/5w9u18",
        "width": 7244,
        "height": 4616
      },
      {
        "id": "a725c06544",
        "src": "/gallery/a725c06544.jpg",
        "thumb": "/gallery/a725c06544-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Full frame",
        "date": "2026-10-13",
        "hours": 0.615,
        "acquisition": "2026-10-08/09; exposure-aware merge of 112 exposures, 36.9 min",
        "astrobin": "https://app.astrobin.com/i/cfnsjv",
        "width": 6152,
        "height": 4027
      },
      {
        "id": "0eca2083d2",
        "src": "/gallery/0eca2083d2.jpg",
        "thumb": "/gallery/0eca2083d2-900.jpg",
        "rig": "William Optics FLT120",
        "label": "SHO study",
        "date": "2026-11-06",
        "hours": 6.49,
        "acquisition": "2026-10-01/02 and 11-02 (D2, 5.90 h); 2026-10-09 (Antlia Hα, 35.5 min)",
        "astrobin": "https://app.astrobin.com/i/5w9u18",
        "width": 4800,
        "height": 3200
      }
    ]
  },
  {
    "id": "ngc1333",
    "title": "The Clouds of Perseus",
    "catalog": "NGC 1333",
    "group": "reflection",
    "caption": "Blue reflection and red knots within a dark cloud.",
    "description": "NGC 1333’s blue reflection glow and dark clouds within the Perseus molecular cloud.",
    "alt": "The Clouds of Perseus: Blue reflection and red knots within a dark cloud.",
    "tags": [
      "NGC1333_C11HyperStar",
      "NGC1333_SQA55"
    ],
    "views": [
      {
        "id": "5597e39395",
        "src": "/gallery/5597e39395.jpg",
        "thumb": "/gallery/5597e39395-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Reflection & dust · main finish",
        "date": "2026-11-06",
        "hours": 3.15,
        "acquisition": "2026-11-03/04; 63 × 180 s",
        "astrobin": "https://app.astrobin.com/i/wh908u",
        "width": 6152,
        "height": 4088
      },
      {
        "id": "2ac02fe7f7",
        "src": "/gallery/2ac02fe7f7.jpg",
        "thumb": "/gallery/2ac02fe7f7-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Brighter dust · alternate finish",
        "date": "2026-11-08",
        "hours": 3.15,
        "acquisition": "2026-11-03/04; 63 × 180 s",
        "width": 6152,
        "height": 4088
      },
      {
        "id": "8a02a9df80",
        "src": "/gallery/8a02a9df80.jpg",
        "thumb": "/gallery/8a02a9df80-900.jpg",
        "rig": "Askar SQA55",
        "label": "Wide field",
        "date": "2026-11-08",
        "hours": 3.6,
        "acquisition": "2026-11-03/04; 108 × 120 s",
        "astrobin": "https://app.astrobin.com/i/97srx7",
        "width": 6168,
        "height": 4072
      }
    ]
  },
  {
    "id": "shark",
    "title": "The Shark Nebula",
    "catalog": "LDN 1235",
    "group": "dark-dust",
    "caption": "A vast shape drawn in interstellar dust.",
    "description": "The Shark Nebula, LDN 1235, with the blue reflection nebulae vdB 149 and vdB 150.",
    "alt": "The Shark Nebula: A vast shape drawn in interstellar dust.",
    "tags": [
      "LDN1235_C11HyperStar",
      "LDN1235_SQA55",
      "LDN1235_FLT120"
    ],
    "views": [
      {
        "id": "92f6b04076",
        "src": "/gallery/92f6b04076.jpg",
        "thumb": "/gallery/92f6b04076-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Dust portrait · ASG color",
        "date": "2026-11-05",
        "hours": 14.5,
        "acquisition": "2026-10-05, 10-06 and 11-02; nebula 174 × 300 s, stars 162 × 300 s",
        "astrobin": "https://app.astrobin.com/i/2nl7hu",
        "width": 5440,
        "height": 3400
      },
      {
        "id": "6b71092492",
        "src": "/gallery/6b71092492.jpg",
        "thumb": "/gallery/6b71092492-900.jpg",
        "rig": "Askar SQA55",
        "label": "Wide field",
        "date": "2026-11-02",
        "hours": 8.08,
        "acquisition": "2026-09-09/10 and 2026-09-14/15; 97 × 300 s",
        "astrobin": "https://app.astrobin.com/i/t1qdzr",
        "width": 5932,
        "height": 4000
      },
      {
        "id": "75ed4cc4d2",
        "src": "/gallery/75ed4cc4d2.jpg",
        "thumb": "/gallery/75ed4cc4d2-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-09-08",
        "hours": 3.25,
        "acquisition": "September 7, 2026 · 39 × 300 s",
        "astrobin": "https://app.astrobin.com/i/p2bauz",
        "width": 7753,
        "height": 5185
      }
    ]
  },
  {
    "id": "helix",
    "title": "The Helix Nebula",
    "catalog": "NGC 7293",
    "group": "emission",
    "caption": "A star’s final layers, opening into space.",
    "description": "The Helix Nebula, reprocessed in hydrogen and oxygen from eleven nights of Origin observations.",
    "alt": "The Helix Nebula: A star’s final layers, opening into space.",
    "tags": [
      "NGC7293_Origin678C",
      "NGC7293_FLT120_Origin678C",
      "NGC7293_FLT120",
      "NGC7293_FLT120_D2",
      "NGC7293_C11HyperStar"
    ],
    "views": [
      {
        "id": "356208eb8a",
        "src": "/gallery/356208eb8a.jpg",
        "thumb": "/gallery/356208eb8a-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-05",
        "hours": 24.32,
        "acquisition": "Eleven nights, 2026-06-04 through 2026-10-01; nebula 1,459 × 60 s, stars 1,002 × 60 s",
        "astrobin": "https://app.astrobin.com/i/f0oypf",
        "width": 3000,
        "height": 2000
      },
      {
        "id": "e8462830b3",
        "src": "/gallery/e8462830b3.jpg",
        "thumb": "/gallery/e8462830b3-900.jpg",
        "rig": "William Optics FLT120 + Celestron Origin",
        "label": "Combined view",
        "date": "2026-10-22",
        "hours": null,
        "acquisition": "2026-08-06",
        "integrationNote": "40.1 h of contributing data; depth varies across the frame and image layers.",
        "astrobin": "https://app.astrobin.com/i/dctk11",
        "width": 2952,
        "height": 1968
      },
      {
        "id": "40f5a43aca",
        "src": "/gallery/40f5a43aca.jpg",
        "thumb": "/gallery/40f5a43aca-900.jpg",
        "rig": "William Optics FLT120",
        "label": "SHO study",
        "date": "2026-10-05",
        "hours": 10.9667,
        "acquisition": "L-Ultimate 593 min plus separate D2 SII 65 min",
        "astrobin": "https://app.astrobin.com/i/kguwgu",
        "width": 3000,
        "height": 2000
      },
      {
        "id": "a86191927b",
        "src": "/gallery/a86191927b.jpg",
        "thumb": "/gallery/a86191927b-900.jpg",
        "rig": "William Optics FLT120",
        "label": "HOO study",
        "date": "2026-10-05",
        "hours": 1.0833,
        "acquisition": "13 × 300 s, 65 min",
        "astrobin": "https://app.astrobin.com/i/mv9rny",
        "width": 3000,
        "height": 2000
      },
      {
        "id": "e765c14b82",
        "src": "/gallery/e765c14b82.jpg",
        "thumb": "/gallery/e765c14b82-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Full frame",
        "date": "2026-10-03",
        "hours": 1.0833,
        "acquisition": "13 × 300 s, 65 min",
        "astrobin": "https://app.astrobin.com/i/jyw788",
        "width": 3000,
        "height": 2000
      }
    ]
  },
  {
    "id": "m78",
    "title": "M78 in Orion",
    "catalog": "M78",
    "group": "reflection",
    "caption": "Starlight finding its way through the dust.",
    "description": "M78’s blue reflection glow sits within the dark and reddish dust of Orion.",
    "alt": "M78 in Orion: Starlight finding its way through the dust.",
    "tags": [
      "M78_Origin678C"
    ],
    "views": [
      {
        "id": "56b4ef8b18",
        "src": "/gallery/56b4ef8b18.jpg",
        "thumb": "/gallery/56b4ef8b18-900.jpg",
        "rig": "Celestron Origin",
        "label": "Personal final curve",
        "date": "2026-11-08",
        "hours": 5.35,
        "acquisition": "2026-11-03/04; 321 × 60 s",
        "astrobin": "https://app.astrobin.com/i/t7ftv1",
        "width": 3760,
        "height": 2080
      }
    ]
  },
  {
    "id": "ngc891",
    "title": "An Edge-on Island",
    "catalog": "NGC 891",
    "group": "galaxies",
    "caption": "A thin band of stars divided by a dark lane.",
    "description": "NGC 891: an edge-on spiral galaxy divided by a dark central dust lane.",
    "alt": "An Edge-on Island: A thin band of stars divided by a dark lane.",
    "tags": [
      "NGC891_Origin678C"
    ],
    "views": [
      {
        "id": "63f0247b2b",
        "src": "/gallery/63f0247b2b.jpg",
        "thumb": "/gallery/63f0247b2b-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-05",
        "hours": null,
        "acquisition": "August and September 2026",
        "integrationNote": "3.22 h main image; a separate 0.75 h stack contributes fine detail.",
        "width": 3800,
        "height": 2080
      }
    ]
  },
  {
    "id": "heart",
    "title": "The Heart Nebula",
    "catalog": "IC 1805",
    "group": "emission",
    "caption": "Sculpted pillars inside a heart of glowing gas.",
    "description": "The Heart Nebula: Melotte 15 and its sculpted pillars lie within a broad shell of hydrogen and oxygen emission.",
    "alt": "The Heart Nebula: Sculpted pillars inside a heart of glowing gas.",
    "tags": [
      "IC1805_C11HyperStar",
      "IC1805_FLT120",
      "IC1805_SQA55"
    ],
    "views": [
      {
        "id": "6cd9a4cb54",
        "src": "/gallery/6cd9a4cb54.jpg",
        "thumb": "/gallery/6cd9a4cb54-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "HOO portrait",
        "date": "2026-11-03",
        "hours": 3.08,
        "acquisition": "2026-11-02/03; 37 × 300 s",
        "astrobin": "https://app.astrobin.com/i/r4z5md",
        "width": 6104,
        "height": 3928
      },
      {
        "id": "fde2391d23",
        "src": "/gallery/fde2391d23.jpg",
        "thumb": "/gallery/fde2391d23-900.jpg",
        "rig": "William Optics FLT120",
        "label": "HOO palette",
        "date": "2026-10-21",
        "hours": 3.25,
        "acquisition": "2026-09-01/02; 39 × 300 s",
        "astrobin": "https://app.astrobin.com/i/arcgsn",
        "width": 7768,
        "height": 4840
      },
      {
        "id": "35672a8016",
        "src": "/gallery/35672a8016.jpg",
        "thumb": "/gallery/35672a8016-900.jpg",
        "rig": "Askar SQA55",
        "label": "HOO wide field",
        "date": "2026-10-20",
        "hours": 3.57,
        "acquisition": "2026-09-01/02 plus 2026-08-19/20",
        "astrobin": "https://app.astrobin.com/i/yr88pd",
        "width": 6144,
        "height": 4048
      },
      {
        "id": "15aa865d6c",
        "src": "/gallery/15aa865d6c.jpg",
        "thumb": "/gallery/15aa865d6c-900.jpg",
        "rig": "William Optics FLT120",
        "label": "SHO palette",
        "date": "2026-10-20",
        "hours": 3.25,
        "acquisition": "2026-09-01/02; 39 × 300 s",
        "astrobin": "https://app.astrobin.com/i/arcgsn",
        "width": 7768,
        "height": 4840
      }
    ]
  },
  {
    "id": "ghost",
    "title": "The Ghost Nebula",
    "catalog": "Sh2-136 · vdB 141",
    "group": "dark-dust",
    "caption": "A pale apparition at the edge of a dark cloud.",
    "description": "The Ghost Nebula, vdB 141, rises from a faint brown dust cloud in Cepheus.",
    "alt": "The Ghost Nebula: A pale apparition at the edge of a dark cloud.",
    "tags": [
      "SH2136_FLT120"
    ],
    "views": [
      {
        "id": "78be4d9a44",
        "src": "/gallery/78be4d9a44.jpg",
        "thumb": "/gallery/78be4d9a44-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Wide field · preferred orientation",
        "date": "2026-10-13",
        "hours": 14.25,
        "acquisition": "2026-10-05 and 2026-10-06; 171 × 300 s",
        "astrobin": "https://app.astrobin.com/i/5rqgdl",
        "width": 7824,
        "height": 5112
      },
      {
        "id": "bf9a24495d",
        "src": "/gallery/bf9a24495d.jpg",
        "thumb": "/gallery/bf9a24495d-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Ghost detail · preferred orientation",
        "date": "2026-10-13",
        "hours": 14.25,
        "acquisition": "2026-10-05 and 2026-10-06; 171 × 300 s",
        "astrobin": "https://app.astrobin.com/i/5rqgdl",
        "width": 1560,
        "height": 1040
      },
      {
        "id": "607e614f62",
        "src": "/gallery/607e614f62.jpg",
        "thumb": "/gallery/607e614f62-900.jpg",
        "rig": "William Optics FLT120",
        "label": "True-sky orientation · north up",
        "date": "2026-10-13",
        "hours": 14.25,
        "acquisition": "2026-10-05 and 2026-10-06; 171 × 300 s",
        "astrobin": "https://app.astrobin.com/i/5rqgdl",
        "width": 7824,
        "height": 5112
      }
    ]
  },
  {
    "id": "iris-ghost",
    "title": "The Iris & the Ghost",
    "catalog": "NGC 7023 · Sh2-136",
    "group": "dark-dust",
    "caption": "A wider journey through the Cepheus Flare.",
    "description": "The Iris and Ghost nebulae connected by a broad web of Cepheus dust, assembled from three telescopes.",
    "alt": "The Iris & the Ghost: A wider journey through the Cepheus Flare.",
    "tags": [
      "NGC7023_SH2136_SQA55_Origin678C_FLT120"
    ],
    "views": [
      {
        "id": "30ce414d9c",
        "src": "/gallery/30ce414d9c.jpg",
        "thumb": "/gallery/30ce414d9c-900.jpg",
        "rig": "SH2136 + Askar SQA55 + Celestron Origin + William Optics FLT120",
        "label": "Wide field · preferred orientation",
        "date": "2026-10-26",
        "hours": null,
        "acquisition": null,
        "integrationNote": "25.74 h of contributing data; depth varies across the frame and image layers.",
        "astrobin": "https://app.astrobin.com/i/sq0j61",
        "width": 5488,
        "height": 3144
      }
    ]
  },
  {
    "id": "ldn1147",
    "title": "The Clouds of Cepheus",
    "catalog": "LDN 1147 / 1158",
    "group": "dark-dust",
    "caption": "Dark filaments and golden rims.",
    "description": "The LDN 1147 dark-cloud complex: faint dust and opaque lanes in Cepheus.",
    "alt": "The Clouds of Cepheus: Dark filaments and golden rims.",
    "tags": [
      "LDN1147_FLT120"
    ],
    "views": [
      {
        "id": "14f552cf20",
        "src": "/gallery/14f552cf20.jpg",
        "thumb": "/gallery/14f552cf20-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-11-05",
        "hours": 7.0,
        "acquisition": "2026-11-02 and 2026-11-03; 84 × 300 s",
        "astrobin": "https://app.astrobin.com/i/w776xv",
        "width": 7774,
        "height": 5304
      }
    ]
  },
  {
    "id": "cocoon",
    "title": "The Cocoon Nebula",
    "catalog": "IC 5146",
    "group": "emission",
    "caption": "A glowing cocoon at the end of a dark trail.",
    "description": "The Cocoon Nebula glows at the end of a long dark dust lane in Cygnus.",
    "alt": "The Cocoon Nebula: A glowing cocoon at the end of a dark trail.",
    "tags": [
      "IC5146_FLT120"
    ],
    "views": [
      {
        "id": "e33b16ff99",
        "src": "/gallery/e33b16ff99.jpg",
        "thumb": "/gallery/e33b16ff99-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-11-06",
        "hours": 4.92,
        "acquisition": "2026-09-08 and 2026-11-02; 59 × 300 s",
        "astrobin": "https://app.astrobin.com/i/8ebubo",
        "width": 7854,
        "height": 5072
      }
    ]
  },
  {
    "id": "crescent",
    "title": "The Crescent Nebula",
    "catalog": "NGC 6888",
    "group": "emission",
    "caption": "A stellar wind’s shell against the clouds of Cygnus.",
    "description": "The Crescent Nebula and the surrounding Cygnus emission, combining three telescopes.",
    "alt": "The Crescent Nebula: A stellar wind’s shell against the clouds of Cygnus.",
    "tags": [
      "NGC6888_SQA55_Apo103_Origin678C",
      "NGC6888_SQA55"
    ],
    "views": [
      {
        "id": "e768c77641",
        "src": "/gallery/e768c77641.jpg",
        "thumb": "/gallery/e768c77641-900.jpg",
        "rig": "Askar SQA55 + Apo103 + Celestron Origin",
        "label": "Combined view",
        "date": "2026-10-30",
        "hours": null,
        "acquisition": "2026-06-24/25",
        "integrationNote": "15.23 h of contributing data; depth varies across the frame and image layers.",
        "astrobin": "https://app.astrobin.com/i/y3rdwn",
        "width": 3490,
        "height": 2240
      },
      {
        "id": "c65afd848a",
        "src": "/gallery/c65afd848a.jpg",
        "thumb": "/gallery/c65afd848a-900.jpg",
        "rig": "Askar SQA55 + Apo103 + Celestron Origin",
        "label": "Crescent detail",
        "date": "2026-10-30",
        "hours": null,
        "acquisition": "2026-06-24/25",
        "integrationNote": "15.23 h of contributing data; depth varies across the frame and image layers.",
        "astrobin": "https://app.astrobin.com/i/y3rdwn",
        "width": 1500,
        "height": 1000
      },
      {
        "id": "d299090bae",
        "src": "/gallery/d299090bae.jpg",
        "thumb": "/gallery/d299090bae-900.jpg",
        "rig": "Askar SQA55",
        "label": "Wide field",
        "date": "2026-09-29",
        "hours": 6.25,
        "acquisition": "June 2026; 75 × 300 s",
        "astrobin": "https://app.astrobin.com/i/y3rdwn",
        "width": 6200,
        "height": 4080
      }
    ]
  },
  {
    "id": "sombrero",
    "title": "The Sombrero Galaxy",
    "catalog": "M104",
    "group": "galaxies",
    "caption": "A luminous bulge above a razor-thin dust lane.",
    "description": "The Sombrero Galaxy: a narrow dust lane cuts across its luminous central bulge and broad halo.",
    "alt": "The Sombrero Galaxy: A luminous bulge above a razor-thin dust lane.",
    "tags": [
      "M104_Origin678C"
    ],
    "views": [
      {
        "id": "912b768106",
        "src": "/gallery/912b768106.jpg",
        "thumb": "/gallery/912b768106-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-10-20",
        "hours": 15.1167,
        "acquisition": "907 × 60 s in ALL-DATA stack; 11 observing sessions",
        "astrobin": "https://app.astrobin.com/i/iolywe",
        "width": 3718,
        "height": 2034
      },
      {
        "id": "f0c6723152",
        "src": "/gallery/f0c6723152.jpg",
        "thumb": "/gallery/f0c6723152-900.jpg",
        "rig": "Celestron Origin",
        "label": "Galaxy detail",
        "date": "2026-10-20",
        "hours": 15.1167,
        "acquisition": "907 × 60 s in ALL-DATA stack; 11 observing sessions",
        "astrobin": "https://app.astrobin.com/i/iolywe",
        "width": 1500,
        "height": 1000
      }
    ]
  },
  {
    "id": "pelican",
    "title": "The Pelican Nebula",
    "catalog": "IC 5070",
    "group": "emission",
    "caption": "A glowing landscape sculpted by young stars.",
    "description": "The Pelican Nebula’s bright ionization front and dark lanes, rebuilt from two nights of Origin data.",
    "alt": "The Pelican Nebula: A glowing landscape sculpted by young stars.",
    "tags": [
      "IC5070_Origin678C"
    ],
    "views": [
      {
        "id": "991ef37139",
        "src": "/gallery/991ef37139.jpg",
        "thumb": "/gallery/991ef37139-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-10-28",
        "hours": 4.2,
        "acquisition": "2026-06-13 and 2026-06-24; nebula 252 × 60 s",
        "astrobin": "https://app.astrobin.com/i/9gzphb",
        "width": 3704,
        "height": 2079
      }
    ]
  },
  {
    "id": "moon",
    "title": "The Moon",
    "catalog": "Lunar surface",
    "group": "solar-system",
    "caption": "The familiar world above our own.",
    "description": "The 96 percent illuminated Moon, with its maria, crater fields and bright highlands.",
    "alt": "The Moon: The familiar world above our own.",
    "tags": [
      "Moon_FLT120"
    ],
    "views": [
      {
        "id": "49752bb506",
        "src": "/gallery/49752bb506.jpg",
        "thumb": "/gallery/49752bb506-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-10-18",
        "hours": null,
        "acquisition": "2026-08-29; 35.2 s of selected video frames plus a full-frame brightness base",
        "astrobin": "https://app.astrobin.com/i/ytqqc5",
        "width": 1800,
        "height": 1800
      },
      {
        "id": "00b3559cd4",
        "src": "/gallery/00b3559cd4.jpg",
        "thumb": "/gallery/00b3559cd4-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Enhanced two-band lunar color",
        "date": "2026-08-29",
        "hours": null,
        "acquisition": "2026-08-29; 35.2 s of selected video frames plus a full-frame brightness base",
        "width": 1800,
        "height": 1800
      }
    ]
  },
  {
    "id": "rho-ophiuchi",
    "title": "The Colors of Rho Ophiuchi",
    "catalog": "Rho Ophiuchi",
    "group": "reflection",
    "caption": "Blue reflection, golden light, and dark lanes.",
    "description": "The Rho Ophiuchi cloud complex: colorful reflection clouds, dark lanes and the globular cluster M4.",
    "alt": "The Colors of Rho Ophiuchi: Blue reflection, golden light, and dark lanes.",
    "tags": [
      "RhoOph_SQA55"
    ],
    "views": [
      {
        "id": "cd41c70d64",
        "src": "/gallery/cd41c70d64.jpg",
        "thumb": "/gallery/cd41c70d64-900.jpg",
        "rig": "Askar SQA55",
        "label": "Wide field",
        "date": "2026-10-18",
        "hours": 4.33,
        "acquisition": "2026-09-07, 09-09, 09-14 and 09-15; 61 exposures",
        "astrobin": "https://app.astrobin.com/i/uoxhof",
        "width": 6120,
        "height": 4088
      }
    ]
  },
  {
    "id": "elephant-trunk",
    "title": "The Elephant Trunk",
    "catalog": "IC 1396",
    "group": "emission",
    "caption": "Dark pillars silhouetted against luminous gas.",
    "description": "The Elephant Trunk in the IC 1396 complex, rendered from hydrogen, oxygen and sulfur in the SHO palette.",
    "alt": "The Elephant Trunk: Dark pillars silhouetted against luminous gas.",
    "tags": [
      "IC1396_FLT120",
      "IC1396_C11HyperStar"
    ],
    "views": [
      {
        "id": "ae02052fa4",
        "src": "/gallery/ae02052fa4.jpg",
        "thumb": "/gallery/ae02052fa4-900.jpg",
        "rig": "William Optics FLT120",
        "label": "SHO palette",
        "date": "2026-09-28",
        "hours": 4.0167,
        "acquisition": "2026-09-01/02 (Hα + OIII) and 2026-09-25 (SII + OIII)",
        "astrobin": "https://app.astrobin.com/i/kr4jxj",
        "width": 3906,
        "height": 2609
      },
      {
        "id": "a63eda295a",
        "src": "/gallery/a63eda295a.jpg",
        "thumb": "/gallery/a63eda295a-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "HOO palette",
        "date": "2026-09-28",
        "hours": 0.3167,
        "acquisition": "2026-09-25; 38 × 30 s",
        "astrobin": "https://app.astrobin.com/i/qx759z",
        "width": 3096,
        "height": 2072
      }
    ]
  },
  {
    "id": "eagle",
    "title": "The Eagle Nebula",
    "catalog": "M16",
    "group": "emission",
    "caption": "A star-forming cloud and its sculpted pillars.",
    "description": "The Eagle Nebula and the Pillars of Creation, combining FLT120 emission detail with Origin stars.",
    "alt": "The Eagle Nebula: A star-forming cloud and its sculpted pillars.",
    "tags": [
      "M16_FLT120_Origin678C",
      "M16_Origin678C"
    ],
    "views": [
      {
        "id": "f5da729020",
        "src": "/gallery/f5da729020.jpg",
        "thumb": "/gallery/f5da729020-900.jpg",
        "rig": "William Optics FLT120 + Celestron Origin",
        "label": "Bicolor · combined view",
        "date": "2026-10-23",
        "hours": null,
        "acquisition": "2026-08-05",
        "integrationNote": "24.58 h of contributing data; depth varies across the frame and image layers.",
        "astrobin": "https://app.astrobin.com/i/pilo4g",
        "width": 3720,
        "height": 2026
      },
      {
        "id": "10e000adc4",
        "src": "/gallery/10e000adc4.jpg",
        "thumb": "/gallery/10e000adc4-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-10-19",
        "hours": 15.88,
        "acquisition": "Nine nights, 2026-05-11 through 2026-08-09; nebula 953 × 60 s",
        "width": 3720,
        "height": 2026
      },
      {
        "id": "3016ac203b",
        "src": "/gallery/3016ac203b.jpg",
        "thumb": "/gallery/3016ac203b-900.jpg",
        "rig": "William Optics FLT120 + Celestron Origin",
        "label": "Natural-color rendering",
        "date": "2026-10-23",
        "hours": null,
        "acquisition": "2026-08-05",
        "integrationNote": "24.58 h of contributing data; depth varies across the frame and image layers.",
        "astrobin": "https://app.astrobin.com/i/pilo4g",
        "width": 3720,
        "height": 2026
      }
    ]
  },
  {
    "id": "broom",
    "title": "The Cosmic Broom",
    "catalog": "LDN 1082",
    "group": "dark-dust",
    "caption": "A branching silhouette in a crowded stellar field.",
    "description": "The Seahorse: Barnard 150, a narrow dark cloud winding across a rich Cepheus star field.",
    "alt": "The Cosmic Broom: A branching silhouette in a crowded stellar field.",
    "tags": [
      "LDN1082_FLT120",
      "LDN1082_Origin678C"
    ],
    "views": [
      {
        "id": "e8b0562ad1",
        "src": "/gallery/e8b0562ad1.jpg",
        "thumb": "/gallery/e8b0562ad1-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-10-21",
        "hours": 10.67,
        "acquisition": "2026-09-09/10 and 2026-09-14/15; 128 × 300 s",
        "astrobin": "https://app.astrobin.com/i/v9i460",
        "width": 7472,
        "height": 5166
      },
      {
        "id": "e1f237dcd6",
        "src": "/gallery/e1f237dcd6.jpg",
        "thumb": "/gallery/e1f237dcd6-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-10-22",
        "hours": 3.78,
        "acquisition": "2026-09-06/07 and 2026-09-07/08; 227 × 60 s",
        "astrobin": "https://app.astrobin.com/i/d6j7t5",
        "width": 3792,
        "height": 1964
      }
    ]
  },
  {
    "id": "lagoon",
    "title": "The Lagoon Nebula",
    "catalog": "M8",
    "group": "emission",
    "caption": "A bright nursery carved into the summer Milky Way.",
    "description": "The Lagoon Nebula’s bright core, dark lanes and faint outer emission, from the complete Origin data set.",
    "alt": "The Lagoon Nebula: A bright nursery carved into the summer Milky Way.",
    "tags": [
      "M8_Origin678C",
      "M8_Apo103"
    ],
    "views": [
      {
        "id": "e46a7832d8",
        "src": "/gallery/e46a7832d8.jpg",
        "thumb": "/gallery/e46a7832d8-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-10-19",
        "hours": 49.76,
        "acquisition": null,
        "astrobin": "https://app.astrobin.com/i/tv3uqt",
        "width": 3764,
        "height": 1976
      },
      {
        "id": "6e9ee5cb62",
        "src": "/gallery/6e9ee5cb62.jpg",
        "thumb": "/gallery/6e9ee5cb62-900.jpg",
        "rig": "Apo103",
        "label": "Full frame",
        "date": "2026-11-02",
        "hours": 19.5,
        "acquisition": null,
        "astrobin": "https://app.astrobin.com/i/tl8q07",
        "width": 7664,
        "height": 4876
      }
    ]
  },
  {
    "id": "lagoon-trifid",
    "title": "Lagoon & Trifid",
    "catalog": "M8 · M20",
    "group": "emission",
    "caption": "Two nebulae, one wide field, four telescopes.",
    "description": "The Lagoon and Trifid in one broad Sagittarius portrait, assembled from four telescopes.",
    "alt": "Lagoon & Trifid: Two nebulae, one wide field, four telescopes.",
    "tags": [
      "M8_M20_SQA55_Origin678C_Apo103_FLT120"
    ],
    "views": [
      {
        "id": "596093f9b1",
        "src": "/gallery/596093f9b1.jpg",
        "thumb": "/gallery/596093f9b1-900.jpg",
        "rig": "M20 + Askar SQA55 + Celestron Origin + Apo103 + William Optics FLT120",
        "label": "Combined view",
        "date": "2026-10-26",
        "hours": null,
        "acquisition": null,
        "integrationNote": "113.9 h of contributing data; depth varies across the frame and image layers.",
        "width": 11516,
        "height": 7504
      }
    ]
  },
  {
    "id": "trifid",
    "title": "The Trifid Nebula",
    "catalog": "M20",
    "group": "emission",
    "caption": "Red emission meets blue reflection.",
    "description": "The Trifid Nebula’s red emission, blue reflection lobe and dark dividing lanes.",
    "alt": "The Trifid Nebula: Red emission meets blue reflection.",
    "tags": [
      "M20_Origin678C"
    ],
    "views": [
      {
        "id": "b15774bb2e",
        "src": "/gallery/b15774bb2e.jpg",
        "thumb": "/gallery/b15774bb2e-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-02",
        "hours": 8.05,
        "acquisition": "2026-05-29 and 2026-06-04; 483 × 60 s",
        "astrobin": "https://app.astrobin.com/i/9vpl50",
        "width": 3752,
        "height": 2000
      }
    ]
  },
  {
    "id": "triangulum",
    "title": "The Triangulum Galaxy",
    "catalog": "M33",
    "group": "galaxies",
    "caption": "A face-on spiral rich with star-forming regions.",
    "description": "The Triangulum Galaxy’s open spiral arms and scattered star-forming regions.",
    "alt": "The Triangulum Galaxy: A face-on spiral rich with star-forming regions.",
    "tags": [
      "M33_Origin678C"
    ],
    "views": [
      {
        "id": "2a234fa11c",
        "src": "/gallery/2a234fa11c.jpg",
        "thumb": "/gallery/2a234fa11c-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-10-19",
        "hours": 4.48,
        "acquisition": "2026-08-18, 08-19 and 09-09; 269 × 60 s",
        "astrobin": "https://app.astrobin.com/i/jg99qw",
        "width": 3846,
        "height": 2157
      }
    ]
  },
  {
    "id": "pacman",
    "title": "The Pacman Nebula",
    "catalog": "NGC 281",
    "group": "emission",
    "caption": "A dark bite taken from a glowing cloud.",
    "description": "The Pacman Nebula: a bright emission cloud split by dark lanes in Cassiopeia.",
    "alt": "The Pacman Nebula: A dark bite taken from a glowing cloud.",
    "tags": [
      "NGC281_Origin678C"
    ],
    "views": [
      {
        "id": "b1414e4f82",
        "src": "/gallery/b1414e4f82.jpg",
        "thumb": "/gallery/b1414e4f82-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-06",
        "hours": 2.92,
        "acquisition": "2026-09-25; nebula 350 × 30 s, stars 161 × 30 s",
        "astrobin": "https://app.astrobin.com/i/v6d22z",
        "width": 3768,
        "height": 1936
      }
    ]
  },
  {
    "id": "monkey-head",
    "title": "The Monkey Head Nebula",
    "catalog": "NGC 2174",
    "group": "emission",
    "caption": "A wall of glowing gas and fine dark structure.",
    "description": "The Monkey Head Nebula’s glowing hydrogen is shaped by dark pillars and embedded young stars.",
    "alt": "The Monkey Head Nebula: A wall of glowing gas and fine dark structure.",
    "tags": [
      "NGC2174_Origin678C"
    ],
    "views": [
      {
        "id": "3a5da1198f",
        "src": "/gallery/3a5da1198f.jpg",
        "thumb": "/gallery/3a5da1198f-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-04",
        "hours": 3.35,
        "acquisition": null,
        "width": 3318,
        "height": 2005
      }
    ]
  },
  {
    "id": "bubble",
    "title": "The Bubble Nebula",
    "catalog": "NGC 7635",
    "group": "emission",
    "caption": "A stellar wind makes a delicate sphere.",
    "description": "The Bubble Nebula’s wind-blown shell glows within surrounding gas and star fields.",
    "alt": "The Bubble Nebula: A stellar wind makes a delicate sphere.",
    "tags": [
      "NGC7635_Origin678C"
    ],
    "views": [
      {
        "id": "a78b4705c1",
        "src": "/gallery/a78b4705c1.jpg",
        "thumb": "/gallery/a78b4705c1-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-02",
        "hours": 4.65,
        "acquisition": "2026-09-01/02; 279 × 60 s",
        "astrobin": "https://app.astrobin.com/i/pcd4zm",
        "width": 3540,
        "height": 1928
      }
    ]
  },
  {
    "id": "swan",
    "title": "The Swan Nebula",
    "catalog": "M17",
    "group": "emission",
    "caption": "Dense star-forming gas in the summer sky.",
    "description": "The Omega, or Swan, Nebula: luminous gas and dark lanes along the Sagittarius Milky Way.",
    "alt": "The Swan Nebula: Dense star-forming gas in the summer sky.",
    "tags": [
      "M17_Origin678C"
    ],
    "views": [
      {
        "id": "6952fb39e7",
        "src": "/gallery/6952fb39e7.jpg",
        "thumb": "/gallery/6952fb39e7-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-02",
        "hours": 3.72,
        "acquisition": "2026-06-20, 08-24 and 09-13; nebula 223 × 60 s",
        "astrobin": "https://app.astrobin.com/i/lg0i4v",
        "width": 3746,
        "height": 2099
      }
    ]
  },
  {
    "id": "flying-bat",
    "title": "The Flying Bat & Squid",
    "catalog": "Sh2-129 · Ou4",
    "group": "emission",
    "caption": "A faint blue-green outflow inside a red cloud.",
    "description": "The faint oxygen glow of the Squid Nebula, Ou4, lies within the red Flying Bat, Sh2-129.",
    "alt": "The Flying Bat & Squid: A faint blue-green outflow inside a red cloud.",
    "tags": [
      "SH2129_C11HyperStar"
    ],
    "views": [
      {
        "id": "5c3fd9886f",
        "src": "/gallery/5c3fd9886f.jpg",
        "thumb": "/gallery/5c3fd9886f-900.jpg",
        "rig": "Celestron C11 HyperStar",
        "label": "Full frame",
        "date": "2026-10-12",
        "hours": 4.08,
        "acquisition": "2026-10-08/09; nebula 49 × 300 s, separate broadband star exposures",
        "astrobin": "https://app.astrobin.com/i/wx8peh",
        "width": 6192,
        "height": 4072
      }
    ]
  },
  {
    "id": "ngc6559",
    "title": "The NGC 6559 Complex",
    "catalog": "NGC 6559",
    "group": "emission",
    "caption": "Red clouds, blue reflection, and winding dark lanes.",
    "description": "The NGC 6559 complex mixes red emission, blue reflection and dark dust near the Lagoon Nebula.",
    "alt": "The NGC 6559 Complex: Red clouds, blue reflection, and winding dark lanes.",
    "tags": [
      "NGC6559_Origin678C"
    ],
    "views": [
      {
        "id": "8c760f59d5",
        "src": "/gallery/8c760f59d5.jpg",
        "thumb": "/gallery/8c760f59d5-900.jpg",
        "rig": "Celestron Origin",
        "label": "Full frame",
        "date": "2026-11-06",
        "hours": 1.7,
        "acquisition": "2026-08-28; 102 × 60 s",
        "width": 3808,
        "height": 2140
      },
      {
        "id": "7c3079e2d5",
        "src": "/gallery/7c3079e2d5.jpg",
        "thumb": "/gallery/7c3079e2d5-900.jpg",
        "rig": "Celestron Origin",
        "label": "Portrait crop",
        "date": "2026-11-06",
        "hours": 1.7,
        "acquisition": "2026-08-28; 102 × 60 s",
        "width": 1704,
        "height": 2124
      }
    ]
  },
  {
    "id": "cygnus",
    "title": "Around the Butterfly",
    "catalog": "NGC 6910 · IC 1318",
    "group": "emission",
    "caption": "An open cluster surrounded by the clouds of Cygnus.",
    "description": "The Sadr region’s sweeping hydrogen clouds and dark lanes, rendered in a warm gold palette.",
    "alt": "Around the Butterfly: An open cluster surrounded by the clouds of Cygnus.",
    "tags": [
      "NGC6910_SQA55"
    ],
    "views": [
      {
        "id": "ff4f038545",
        "src": "/gallery/ff4f038545.jpg",
        "thumb": "/gallery/ff4f038545-900.jpg",
        "rig": "Askar SQA55",
        "label": "Wide field",
        "date": "2026-11-02",
        "hours": 1.87,
        "acquisition": "One full-moon night; 56 × 120 s",
        "astrobin": "https://app.astrobin.com/i/vb3tkh",
        "width": 6228,
        "height": 4116
      },
      {
        "id": "dc5fa59b74",
        "src": "/gallery/dc5fa59b74.jpg",
        "thumb": "/gallery/dc5fa59b74-900.jpg",
        "rig": "Askar SQA55",
        "label": "Natural-color palette",
        "date": "2026-09-30",
        "hours": 1.87,
        "acquisition": "One full-moon night; 56 × 120 s",
        "astrobin": "https://app.astrobin.com/i/vb3tkh",
        "width": 6228,
        "height": 4116
      }
    ]
  },
  {
    "id": "v379-vul",
    "title": "A Window into Vulpecula",
    "catalog": "V379 Vul field",
    "group": "star-fields",
    "caption": "A crowded stellar field crossed by faint structure.",
    "description": "A dense Milky Way field in Vulpecula, threaded by dark clouds and faint Sh2-92 emission.",
    "alt": "A Window into Vulpecula: A crowded stellar field crossed by faint structure.",
    "tags": [
      "V379Vul_FLT120"
    ],
    "views": [
      {
        "id": "4111ea9901",
        "src": "/gallery/4111ea9901.jpg",
        "thumb": "/gallery/4111ea9901-900.jpg",
        "rig": "William Optics FLT120",
        "label": "Full frame",
        "date": "2026-10-16",
        "hours": 1.92,
        "acquisition": "2026-10-08; 23 × 300 s",
        "astrobin": "https://app.astrobin.com/i/es6hj6",
        "width": 8104,
        "height": 5344
      }
    ]
  },
  {
    "id": "saturn",
    "title": "Saturn",
    "catalog": "Solar System",
    "group": "solar-system",
    "caption": "A small world with an extraordinary silhouette.",
    "description": "Saturn and its nearly edge-on rings, captured through the C11.",
    "alt": "Saturn: A small world with an extraordinary silhouette.",
    "tags": [
      "Saturn_C11_ASI2600MC_2026-10-01",
      "Saturn_C11_ASI2600MC"
    ],
    "views": [
      {
        "id": "91b6a870db",
        "src": "/gallery/91b6a870db.jpg",
        "thumb": "/gallery/91b6a870db-900.jpg",
        "rig": "Celestron C11 · ASI2600MC",
        "label": "October 1 view",
        "date": "2026-10-02",
        "hours": null,
        "acquisition": "2026-10-01 planetary video",
        "astrobin": "https://app.astrobin.com/i/kltnbx",
        "width": 640,
        "height": 640
      },
      {
        "id": "b460bfa4e9",
        "src": "/gallery/b460bfa4e9.jpg",
        "thumb": "/gallery/b460bfa4e9-900.jpg",
        "rig": "Celestron C11 · ASI2600MC",
        "label": "August 19 view",
        "date": "2026-08-19",
        "hours": null,
        "acquisition": "2026-08-19",
        "width": 450,
        "height": 450
      }
    ]
  },
  {
    "id": "sun",
    "title": "The Sun",
    "catalog": "Solar System",
    "group": "solar-system",
    "caption": "Sunspots on our nearest star.",
    "description": "The full white-light solar disk, showing sunspots and bright faculae, with solar north up.",
    "alt": "The Sun: Sunspots on our nearest star.",
    "tags": [
      "Sun_Apo103"
    ],
    "views": [
      {
        "id": "e2d21e2ac2",
        "src": "/gallery/e2d21e2ac2.jpg",
        "thumb": "/gallery/e2d21e2ac2-900.jpg",
        "rig": "Apo103",
        "label": "Warm white-light rendering",
        "date": "2026-10-18",
        "hours": null,
        "acquisition": "2026-07-31; selected frames from three short videos plus a full-disc base",
        "astrobin": "https://app.astrobin.com/i/iumptr",
        "width": 1600,
        "height": 1600
      },
      {
        "id": "81a42bf532",
        "src": "/gallery/81a42bf532.jpg",
        "thumb": "/gallery/81a42bf532-900.jpg",
        "rig": "Apo103",
        "label": "Neutral white-light rendering",
        "date": "2026-07-31",
        "hours": null,
        "acquisition": "2026-07-31; selected frames from three short videos plus a full-disc base",
        "astrobin": "https://app.astrobin.com/i/iumptr",
        "width": 1600,
        "height": 1600
      }
    ]
  },
  {
    "id": "starfield",
    "title": "Uncounted",
    "catalog": "Milky Way star field",
    "group": "star-fields",
    "caption": "A small window with an extraordinary number of stars.",
    "description": "A small window with an extraordinary number of stars. From the earlier collection.",
    "alt": "A small window with an extraordinary number of stars.",
    "tags": [],
    "views": [
      {
        "id": "archive-starfield",
        "src": "/gallery/archive-starfield.jpg",
        "thumb": "/gallery/archive-starfield-900.jpg",
        "rig": "Not recorded",
        "label": "Earlier collection",
        "date": "2026-07-21",
        "legacy": true,
        "hours": null,
        "acquisition": null,
        "width": 2000,
        "height": 1337
      }
    ]
  },
  {
    "id": "m81",
    "title": "Bode’s Galaxy",
    "catalog": "M81 · M82",
    "group": "galaxies",
    "caption": "A spiral galaxy and its smaller neighbor in Ursa Major.",
    "description": "Bode’s Galaxy spreads its spiral arms across a field shared with its smaller neighbor, M82. Explore the wider view and a closer portrait.",
    "alt": "Two neighboring galaxies in Ursa Major.",
    "tags": [
      "galaxies",
      "Ursa Major",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2026-08-22",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "697a1f24f2",
        "src": "/gallery/697a1f24f2.jpg",
        "thumb": "/gallery/697a1f24f2-900.jpg",
        "dateKind": "Archive label",
        "width": 3338,
        "height": 1126
      },
      {
        "rig": "Not recorded",
        "label": "Alternate framing",
        "date": "2026-06-20",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "0a8c8eea09",
        "src": "/gallery/0a8c8eea09.jpg",
        "thumb": "/gallery/0a8c8eea09-900.jpg",
        "dateKind": "Archive label",
        "width": 1085,
        "height": 1702
      }
    ]
  },
  {
    "id": "m82",
    "title": "The Cigar Galaxy",
    "catalog": "M82",
    "group": "galaxies",
    "caption": "An elongated galaxy with a bright, mottled central region.",
    "description": "The Cigar Galaxy’s long, bright body is textured with dark lanes. This is a closer view of M82 from the wider M81 field.",
    "alt": "An elongated galaxy with a bright, mottled central region.",
    "tags": [
      "galaxy",
      "Ursa Major",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2026-06-20",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "ae6554d787",
        "src": "/gallery/ae6554d787.jpg",
        "thumb": "/gallery/ae6554d787-900.jpg",
        "dateKind": "Archive label",
        "width": 1464,
        "height": 728
      }
    ]
  },
  {
    "id": "m51",
    "title": "The Whirlpool Galaxy",
    "catalog": "M51 · NGC 5195",
    "group": "galaxies",
    "caption": "A grand-design spiral and its interacting companion.",
    "description": "The Whirlpool Galaxy’s curling spiral arms reach toward its smaller interacting companion, NGC 5195.",
    "alt": "A grand-design spiral and its interacting companion.",
    "tags": [
      "galaxy",
      "interacting galaxies",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2023-01-26",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "27918d544f",
        "src": "/gallery/27918d544f.jpg",
        "thumb": "/gallery/27918d544f-900.jpg",
        "dateKind": "Archive label",
        "width": 4614,
        "height": 3511
      }
    ]
  },
  {
    "id": "m64",
    "title": "The Black Eye Galaxy",
    "catalog": "M64",
    "group": "galaxies",
    "caption": "A dark dust patch beside a bright galactic core.",
    "description": "The Black Eye Galaxy takes its name from the dark dust feature beside its luminous center.",
    "alt": "A dark dust patch beside a bright galactic core.",
    "tags": [
      "galaxy",
      "Origin",
      "archival"
    ],
    "views": [
      {
        "rig": "Celestron Origin",
        "label": "Archival final",
        "date": "2026-08-13",
        "legacy": false,
        "hours": 2.4166666666666665,
        "acquisition": null,
        "id": "79809e95b7",
        "src": "/gallery/79809e95b7.jpg",
        "thumb": "/gallery/79809e95b7-900.jpg",
        "dateKind": "Archive label",
        "width": 1814,
        "height": 1095
      }
    ]
  },
  {
    "id": "rosette",
    "title": "The Rosette Nebula",
    "catalog": "NGC 2237–2239 · NGC 2244",
    "group": "emission",
    "caption": "A ring of glowing gas around a young star cluster.",
    "description": "A ring of glowing gas surrounds the young central star cluster in the Rosette Nebula.",
    "alt": "A ring of glowing gas around a young star cluster.",
    "tags": [
      "emission nebula",
      "star cluster",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2025-06-12",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "656b4a698b",
        "src": "/gallery/656b4a698b.jpg",
        "thumb": "/gallery/656b4a698b-900.jpg",
        "dateKind": "Archive label",
        "width": 6097,
        "height": 4033
      }
    ]
  },
  {
    "id": "m27",
    "title": "The Dumbbell Nebula",
    "catalog": "M27",
    "group": "emission",
    "caption": "A compact planetary nebula in a dense field of stars.",
    "description": "The Dumbbell Nebula is the expanding shell shed by a dying star, its glowing gas set against a dense stellar field.",
    "alt": "A compact planetary nebula in a dense field of stars.",
    "tags": [
      "planetary nebula",
      "Origin",
      "archival"
    ],
    "views": [
      {
        "rig": "Celestron Origin",
        "label": "Archival final",
        "date": "2026-08-13",
        "legacy": false,
        "hours": 6.416666666666667,
        "acquisition": null,
        "id": "66c88e5bb1",
        "src": "/gallery/66c88e5bb1.jpg",
        "thumb": "/gallery/66c88e5bb1-900.jpg",
        "dateKind": "Archive label",
        "width": 3732,
        "height": 2080
      }
    ]
  },
  {
    "id": "m5",
    "title": "Messier 5",
    "catalog": "M5",
    "group": "star-fields",
    "caption": "A tightly packed globe of old stars.",
    "description": "The globular cluster Messier 5 brings a dense, nearly spherical gathering of stars into view.",
    "alt": "A tightly packed globe of old stars.",
    "tags": [
      "globular cluster",
      "Origin",
      "archival"
    ],
    "views": [
      {
        "rig": "Celestron Origin",
        "label": "Archival final",
        "date": "2026-08-13",
        "legacy": false,
        "hours": 0.7833333333333333,
        "acquisition": null,
        "id": "0d832e90ad",
        "src": "/gallery/0d832e90ad.jpg",
        "thumb": "/gallery/0d832e90ad-900.jpg",
        "dateKind": "Archive label",
        "width": 3624,
        "height": 2030
      }
    ]
  },
  {
    "id": "ic4756",
    "title": "Open Cluster IC 4756",
    "catalog": "IC 4756",
    "group": "star-fields",
    "caption": "An open cluster set within the Milky Way.",
    "description": "The open cluster IC 4756, sometimes called the Summer Beehive, is a loose gathering of stars in Serpens.",
    "alt": "An open cluster set within the Milky Way.",
    "tags": [
      "open cluster",
      "Milky Way",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2026-07-24",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "dc95289266",
        "src": "/gallery/dc95289266.jpg",
        "thumb": "/gallery/dc95289266-900.jpg",
        "dateKind": "Archive label",
        "width": 6248,
        "height": 4176
      }
    ]
  },
  {
    "id": "witch-head",
    "title": "The Witch Head Nebula",
    "catalog": "IC 2118",
    "group": "reflection",
    "caption": "A pale reflection cloud against the stars of Orion.",
    "description": "The Witch Head Nebula’s long, pale profile is traced by starlight scattered from interstellar dust.",
    "alt": "A pale reflection cloud against the stars of Orion.",
    "tags": [
      "reflection nebula",
      "dark dust",
      "archival"
    ],
    "views": [
      {
        "rig": "Askar SQA55",
        "label": "Archival final",
        "date": "2026-09-08",
        "legacy": false,
        "hours": 2.1,
        "acquisition": null,
        "id": "74f7d5214c",
        "src": "/gallery/74f7d5214c.jpg",
        "thumb": "/gallery/74f7d5214c-900.jpg",
        "dateKind": "Archive label",
        "width": 5622,
        "height": 3754
      },
      {
        "rig": "Not recorded",
        "label": "Alternate framing",
        "date": "2026-09-07",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "5e8cf87481",
        "src": "/gallery/5e8cf87481.jpg",
        "thumb": "/gallery/5e8cf87481-900.jpg",
        "dateKind": "Archive label",
        "width": 6136,
        "height": 4076
      }
    ]
  },
  {
    "id": "cave",
    "title": "The Cave Nebula Field",
    "catalog": "Sh2-155 · NY Cephei",
    "group": "emission",
    "caption": "Red emission and blue reflection clouds threaded by dark dust.",
    "description": "Red emission, blue reflection, and opaque dust meet in the Cave Nebula region of Cepheus. Two fields of view reveal the cloud at different scales.",
    "alt": "Red emission and blue reflection clouds threaded by dark dust.",
    "tags": [
      "emission nebula",
      "reflection nebula",
      "Cepheus",
      "archival"
    ],
    "views": [
      {
        "rig": "Askar SQA55",
        "label": "Archival final",
        "date": "2026-09-07",
        "legacy": false,
        "hours": 2.8333333333333335,
        "acquisition": null,
        "id": "9bf0a63bcb",
        "src": "/gallery/9bf0a63bcb.jpg",
        "thumb": "/gallery/9bf0a63bcb-900.jpg",
        "dateKind": "Archive label",
        "width": 6248,
        "height": 4176
      },
      {
        "rig": "Not recorded",
        "label": "Alternate framing",
        "date": "2026-08-19",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "1b6fec87ee",
        "src": "/gallery/1b6fec87ee.jpg",
        "thumb": "/gallery/1b6fec87ee-900.jpg",
        "dateKind": "Archive label",
        "width": 6403,
        "height": 5052
      }
    ]
  },
  {
    "id": "vdb126",
    "title": "The vdB 126 Field",
    "catalog": "vdB 126",
    "group": "reflection",
    "caption": "Blue starlight and brown dust across a wide field.",
    "description": "The blue reflection glow of vdB 126 lies among broad dusty clouds.",
    "alt": "Blue starlight and brown dust across a wide field.",
    "tags": [
      "reflection nebula",
      "dust",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2026-06-14",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "c4709320ce",
        "src": "/gallery/c4709320ce.jpg",
        "thumb": "/gallery/c4709320ce-900.jpg",
        "dateKind": "Archive label",
        "width": 5933,
        "height": 3832
      }
    ]
  },
  {
    "id": "veil",
    "title": "The Veil Nebula",
    "catalog": "Cygnus Loop",
    "group": "emission",
    "caption": "Fine red and teal filaments from a supernova remnant.",
    "description": "Thin, luminous filaments trace the expanding remains of a supernova in Cygnus.",
    "alt": "Fine red and teal filaments from a supernova remnant.",
    "tags": [
      "supernova remnant",
      "Cygnus",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2026-06-20",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "c0dbb56913",
        "src": "/gallery/c0dbb56913.jpg",
        "thumb": "/gallery/c0dbb56913-900.jpg",
        "dateKind": "Archive label",
        "width": 6248,
        "height": 4176
      }
    ]
  },
  {
    "id": "north-america",
    "title": "The North America Nebula",
    "catalog": "NGC 7000",
    "group": "emission",
    "caption": "A broad mosaic of glowing gas and dark interstellar coastlines.",
    "description": "Glowing gas and a dark cloud form a familiar coastline in the North America Nebula. Explore the wider mosaic and the detailed views of the Cygnus Wall.",
    "alt": "A broad mosaic of glowing gas and dark interstellar coastlines.",
    "tags": [
      "emission nebula",
      "Cygnus",
      "mosaic",
      "archival"
    ],
    "views": [
      {
        "rig": "Not recorded",
        "label": "Archival final",
        "date": "2026-08-23",
        "legacy": false,
        "hours": null,
        "acquisition": null,
        "id": "339b62a44b",
        "src": "/gallery/339b62a44b.jpg",
        "thumb": "/gallery/339b62a44b-900.jpg",
        "dateKind": "Archive label",
        "width": 7661,
        "height": 4982
      },
      {
        "id": "archive-north-america",
        "src": "/gallery/archive-north-america.jpg",
        "thumb": "/gallery/archive-north-america-900.jpg",
        "rig": "Not recorded",
        "label": "Earlier collection",
        "date": "2026-07-21",
        "legacy": true,
        "hours": null,
        "acquisition": null,
        "width": 2000,
        "height": 1316
      },
      {
        "id": "archive-cyan-rift",
        "src": "/gallery/archive-cyan-rift.jpg",
        "thumb": "/gallery/archive-cyan-rift-900.jpg",
        "rig": "Not recorded",
        "label": "Cygnus Wall detail",
        "date": "2026-07-21",
        "legacy": true,
        "hours": null,
        "acquisition": null,
        "width": 2000,
        "height": 1316
      }
    ]
  }
]

photographs.push({
  "id": "loch-ness",
  "title": "The Loch Ness Nebula",
  "catalog": "LDN 772",
  "group": "dark-dust",
  "caption": "The LDN 772 dark-nebula complex winding through a dense river of Milky Way stars in Vulpecula.",
  "description": "The LDN 772 dark-nebula complex winding through a dense river of Milky Way stars in Vulpecula.",
  "alt": "The LDN 772 dark-nebula complex winding through a dense river of Milky Way stars in Vulpecula.",
  "tags": [
    "LDN 772",
    "Loch Ness"
  ],
  "views": [
    {
      "id": "main-loch-ness",
      "src": "/astro/loch-ness-nebula.jpg",
      "thumb": "/astro/responsive/loch-ness-nebula-800.webp",
      "rig": "Not recorded",
      "label": "Earlier collection",
      "date": "2026-09-09",
      "width": 2000,
      "height": 1337,
      "legacy": true,
      "hours": null
    }
  ]
})
