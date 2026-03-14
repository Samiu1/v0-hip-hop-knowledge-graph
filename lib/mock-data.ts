/**
 * Mock data for the Hip-Hop Knowledge Graph.
 * Syncs with the structure in scripts/01-schema.sql and content in scripts/02-seed.sql.
 */

export const MOCK_ERAS = [
  {
    id: 'era_roots',
    name: 'Pre-Hip-Hop Roots',
    year_start: 1925,
    year_end: 1972,
    description: 'Jazz, blues, spoken word, funk, and soul that laid the cultural DNA of hip-hop.',
    color: '#6B4C2A',
    key_events: ['1925: Duke Ellington hits', '1965: Last Poets form', '1970: Gil Scott-Heron debut']
  },
  {
    id: 'era_birth',
    name: 'The Birth',
    year_start: 1973,
    year_end: 1979,
    description: 'South Bronx block parties, DJ Kool Herc\'s breakbeat innovation, and the birth of MCing.',
    color: '#C94F1A',
    key_events: ['1973: First block party', '1979: Rapper\'s Delight']
  },
  {
    id: 'era_old_school',
    name: 'Old School',
    year_start: 1980,
    year_end: 1985,
    description: 'First wave of commercially released hip-hop — Sugarhill Gang, Grandmaster Flash, Run-DMC.',
    color: '#D4A017',
    key_events: ['1980: Kurtis Blow on Mercury', '1983: Run-DMC debut']
  },
  {
    id: 'era_golden',
    name: 'Golden Age',
    year_start: 1986,
    year_end: 1993,
    description: 'Artistic peak: Public Enemy, N.W.A, Big Daddy Kane, A Tribe Called Quest, Wu-Tang Clan.',
    color: '#2A7D4F',
    key_events: ['1988: It Takes a Nation', '1992: The Chronic', '1993: Wu-Tang debut']
  },
  {
    id: 'era_east_west',
    name: 'East/West Coast Wars',
    year_start: 1994,
    year_end: 1999,
    description: 'Geographic identity, Biggie vs. Tupac, Death Row vs. Bad Boy, West Coast dominance.',
    color: '#1A4C8B',
    key_events: ['1994: Illmatic', '1996: All Eyez on Me', '1997: Life After Death']
  },
  {
    id: 'era_bling',
    name: 'Bling Era',
    year_start: 2000,
    year_end: 2005,
    description: 'Mainstream crossover, Cash Money, Neptunes production, Def Jam supremacy.',
    color: '#8B1A6B',
    key_events: ['2000: MMLP', '2001: The Blueprint', '2004: College Dropout']
  },
  {
    id: 'era_internet',
    name: 'Internet Era',
    year_start: 2006,
    year_end: 2012,
    description: 'MySpace, mixtape culture, Lil Wayne domination, Drake\'s rise, indie rap explosion.',
    color: '#1A7B8B',
    key_events: ['2008: Carter III', '2010: MBDTF', '2011: Take Care']
  },
  {
    id: 'era_trap',
    name: 'Trap & Streaming',
    year_start: 2013,
    year_end: 2018,
    description: 'Atlanta\'s global takeover, SoundCloud rap, streaming disruption, Kendrick vs. Drake.',
    color: '#4A1A8B',
    key_events: ['2012: GKMC', '2015: TPAB', '2018: DAMN. Pulitzer']
  },
  {
    id: 'era_modern',
    name: 'New Generation',
    year_start: 2019,
    year_end: 2026,
    description: 'Hyperpop, drill, conscious rap resurgence, global hip-hop, AI-assisted production.',
    color: '#8B4A1A',
    key_events: ['2023: Rock Hall inductees', '2024: Drake/Kendrick beef', '2025: Global hip-hop']
  }
];

export const MOCK_NODES = [
  { id: 'n_nas', name: 'Nas', type: 'artist', era: 'era_golden', year_start: 1973, region: 'Queensbridge, USA', description: '"Illmatic" (1994) — universally considered one of the greatest hip-hop albums.', influence_score: 98 },
  { id: 'n_biggie', name: 'The Notorious B.I.G.', type: 'artist', era: 'era_east_west', year_start: 1972, region: 'Brooklyn, USA', description: 'Greatest rapper of all time debate anchor. "Ready to Die", "Life After Death".', influence_score: 99 },
  { id: 'n_tupac', name: 'Tupac Shakur', type: 'artist', era: 'era_east_west', year_start: 1971, region: 'East Harlem, USA', description: 'Cultural icon. Activist, actor, poet. "All Eyez on Me" — most personal hip-hop odyssey.', influence_score: 99 },
  { id: 'n_jay_z', name: 'Jay-Z', type: 'artist', era: 'era_east_west', year_start: 1969, region: 'Brooklyn, USA', description: 'Def Jam president. "Reasonable Doubt" to "4:44" — 30 years of reinvention.', influence_score: 99 },
  { id: 'n_kendrick', name: 'Kendrick Lamar', type: 'artist', era: 'era_trap', year_start: 1987, region: 'Compton, USA', description: '"good kid, m.A.A.d city", "TPAB", "DAMN." — Pulitzer Prize. Greatest of his generation.', influence_score: 99 },
  { id: 'n_rakim', name: 'Rakim', type: 'artist', era: 'era_golden', year_start: 1968, region: 'Long Island, USA', description: '"Paid in Full" — introduced internal rhyme schemes that rewrote MCing forever.', influence_score: 98 },
  { id: 'n_album_illmatic', name: 'Illmatic', type: 'album', era: 'era_golden', year_start: 1994, region: 'Queensbridge, USA', description: 'Nas. 10 tracks, 39 minutes. The perfect New York rap album.', influence_score: 99 },
  { id: 'n_wu_tang', name: 'Wu-Tang Clan', type: 'artist', era: 'era_golden', year_start: 1992, region: 'Staten Island, USA', description: '9-member collective that built an empire. RZA\'s cinematic production changed hip-hop.', influence_score: 99 },
  { id: 'n_dr_dre', name: 'Dr. Dre', type: 'artist', era: 'era_golden', year_start: 1965, region: 'Compton, USA', description: 'N.W.A producer. Invented G-Funk. Produced Snoop, Eminem, Kendrick. Beats empire.', influence_score: 99 },
  { id: 'n_dj_herc', name: 'DJ Kool Herc', type: 'artist', era: 'era_birth', year_start: 1955, region: 'South Bronx, USA', description: 'Inventor of the breakbeat — threw the first hip-hop block party on Aug 11, 1973.', influence_score: 98 },
  { id: 'n_public_enemy', name: 'Public Enemy', type: 'artist', era: 'era_golden', year_start: 1982, region: 'Long Island, USA', description: '"It Takes a Nation of Millions" — the apex of politically charged hip-hop.', influence_score: 98 },
  { id: 'n_nwa', name: 'N.W.A', type: 'artist', era: 'era_golden', year_start: 1986, region: 'Compton, USA', description: '"Straight Outta Compton" invented gangsta rap and ignited the culture war.', influence_score: 99 },
];

export const MOCK_EDGES = [
  { source: 'n_rakim', target: 'n_nas', relationship: 'influenced', weight: 0.96, year: 1990 },
  { source: 'n_rakim', target: 'n_jay_z', relationship: 'influenced', weight: 0.92, year: 1993 },
  { source: 'n_nas', target: 'n_album_illmatic', relationship: 'pioneered', weight: 0.99, year: 1994 },
  { source: 'n_nas', target: 'n_jay_z', relationship: 'rivals', weight: 0.90, year: 2001 },
  { source: 'n_dr_dre', target: 'n_kendrick', relationship: 'produced', weight: 0.95, year: 2011 },
  { source: 'n_biggie', target: 'n_jay_z', relationship: 'influenced', weight: 0.90, year: 1995 },
  { source: 'n_tupac', target: 'n_biggie', relationship: 'rivals', weight: 0.95, year: 1995 },
  { source: 'n_wu_tang', target: 'n_nas', relationship: 'influenced', weight: 0.85, year: 1993 },
  { source: 'n_dj_herc', target: 'n_dr_dre', relationship: 'influenced', weight: 0.88, year: 1992 },
];

export const MOCK_ANALYTICS = {
  era: 'all',
  top_nodes: [
    { id: 'n_kendrick', score: 99 },
    { id: 'n_jay_z', score: 99 },
    { id: 'n_dr_dre', score: 99 },
    { id: 'n_tupac', score: 99 },
    { id: 'n_biggie', score: 99 }
  ],
  genre_counts: {
    'hip-hop': 38,
    'trap': 8,
    'conscious rap': 6,
    'G-funk': 4,
    'producer': 5,
    'label': 7,
    'concept': 2,
    'album': 15
  },
  region_dist: {
    'USA': 62,
    'Canada': 1,
    'Nigeria': 1,
    'Puerto Rico': 1,
    'UK/USA': 1
  },
  edge_density: 0.043,
  new_nodes: 82
};
