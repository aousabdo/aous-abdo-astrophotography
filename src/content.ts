import photoData from './photos.json'

export type Photograph = {
  slug: string
  title: string
  note: string
  src: string
  shape: 'wide' | 'tall' | 'standard'
  group: 'Nebulae' | 'Galaxies' | 'Star fields'
  featured?: boolean
  equipment?: string
  location?: string
  catalog?: string
}

export type Project = {
  title: string
  label: string
  description: string
  url: string
  image?: string
  tone: string
  featured?: boolean
}

export type ProjectFamily = {
  id: string
  number: string
  title: string
  intro: string
  projects: Project[]
}

export const photographs = photoData as Photograph[]

export const projectFamilies: ProjectFamily[] = [
  {
    id: 'astronomy',
    number: '01',
    title: 'Astronomy & stellar science',
    intro: 'The research, simulations, and visual stories that began with looking up.',
    projects: [
      {
        title: 'From the Nucleus to the Cosmos',
        label: 'Research & career',
        description: 'My doctoral work in astrophysics, the Milagro discoveries, and the road into the Fermi-LAT era at NASA.',
        url: 'https://aousabdo.pages.dev/',
        image: 'projects/cosmos.png',
        tone: 'cosmos',
        featured: true,
      },
      {
        title: 'Najm',
        label: 'Interactive astronomy',
        description: 'A bilingual visual journey through how stars are born, live, die, and reshape the universe.',
        url: 'https://najm.analyticadss.com/',
        image: 'projects/najm.jpg',
        tone: 'najm',
      },
      {
        title: 'Stellar Death',
        label: 'Stellar simulator',
        description: 'Watch a star evolve toward a white dwarf, neutron star, black hole—or something stranger.',
        url: 'https://aousabdo.github.io/stellar-death/',
        image: 'astro/crescent.jpg',
        tone: 'stellar',
      },
    ],
  },
  {
    id: 'faith',
    number: '02',
    title: 'Faith, revelation & the sky',
    intro: 'Places where scripture, observation, language, and the physical universe meet carefully.',
    projects: [
      {
        title: 'Al-Tariq',
        label: 'Pulsars & the Quran',
        description: 'A rigorous bilingual look at pulsars, neutron stars, and the “knocking star” of Surah At-Tariq.',
        url: 'https://aousabdo.github.io/al-tariq/',
        image: 'projects/al-tariq.png',
        tone: 'tariq',
      },
      {
        title: 'Moon Splitting',
        label: 'Faith, tafsir & astronomy',
        description: 'A first-person reflection on the moon, belief, observation, and the question of timing.',
        url: 'https://aousabdo.github.io/moon-splitting/',
        image: 'projects/moon.png',
        tone: 'moon',
      },
      {
        title: 'Sujūd — The Shadow as Witness',
        label: 'Revelation, physics & astronomy',
        description: 'A careful reading of Qur’an 22:18 alongside modern physics—where science serves as witness, not interpretation.',
        url: 'https://sujud.analyticadss.com/en/',
        image: 'projects/sujud.png',
        tone: 'sujud',
        featured: true,
      },
      {
        title: 'Islamic Viz Hub',
        label: 'Bilingual visualizations',
        description: 'Interactive explorations of Islamic science, time, qibla, and sky geometry.',
        url: 'https://islamicviz.analyticadss.com/en/',
        tone: 'islamicviz',
      },
    ],
  },
  {
    id: 'knowledge',
    number: '03',
    title: 'Science & public knowledge',
    intro: 'Complex ideas made explorable—through evidence, interaction, maps, and visual explanation.',
    projects: [
      {
        title: 'SciVizHub',
        label: 'Scientific visualization',
        description: 'Interactive visualizations built to make difficult scientific concepts tangible.',
        url: 'https://scivizhub.analyticadss.com/',
        tone: 'sciviz',
        featured: true,
      },
      {
        title: 'Nuclear Explained',
        label: 'Nuclear science',
        description: 'Interactive nuclear physics, blast, fallout, and historical data.',
        url: 'https://nukes.analyticadss.com/',
        tone: 'nuclear',
      },
      {
        title: 'Atlas of Muslim Scholars',
        label: 'History of knowledge',
        description: 'Explore scholars across history by field, region, and century.',
        url: 'https://aousabdo.github.io/muslim-scholars-atlas/',
        tone: 'atlas',
      },
      {
        title: 'The American Dream, Measured',
        label: 'Public-data story',
        description: 'A sourced, interactive comparison of American life in 1955 and 2025.',
        url: 'https://aousabdo.github.io/the-american-dream-measured/',
        tone: 'dream',
      },
    ],
  },
  {
    id: 'signals',
    number: '04',
    title: 'Signals, systems & national security',
    intro: 'Finding structure in noisy public data—from the sky and sea to markets and federal systems.',
    projects: [
      {
        title: 'Skywatch',
        label: 'Counter-UAS incident atlas',
        description: 'A decade of FAA drone sightings mapped against the infrastructure that matters.',
        url: 'https://skywatch.analyticadss.com/',
        tone: 'skywatch',
        featured: true,
      },
      {
        title: 'Constellation',
        label: 'Federal market intelligence',
        description: 'Agencies, primes, and subcontractors mapped as a living network across emerging federal markets.',
        url: 'https://constellation.analyticadss.com/',
        tone: 'constellation',
      },
      {
        title: 'Drift',
        label: 'Defense cost growth',
        description: 'How major acquisition programs move from their original promise to their current cost and shape.',
        url: 'https://drift.analyticadss.com/',
        tone: 'drift',
      },
      {
        title: 'Watchstander',
        label: 'Maritime domain awareness',
        description: 'Unusual vessel behavior surfaced from public AIS, satellite radar, and sanctions data.',
        url: 'https://watchstander.analyticadss.com/',
        tone: 'watchstander',
      },
      {
        title: 'Chokepoint',
        label: 'Energy consequence engine',
        description: 'Model how disruption in the Strait of Hormuz propagates through capacity, producers, and price.',
        url: 'https://chokepoint.analyticadss.com/',
        tone: 'chokepoint',
      },
      {
        title: 'Crucible',
        label: 'Federal SBIR intelligence',
        description: 'Follow an idea from solicitation topic to awardee, Phase II, and later federal contracts.',
        url: 'https://crucible.analyticadss.com/',
        tone: 'crucible',
      },
    ],
  },
]

export const homeProjects = [
  projectFamilies[0].projects[1],
  projectFamilies[1].projects[2],
  projectFamilies[2].projects[0],
  projectFamilies[3].projects[0],
]

