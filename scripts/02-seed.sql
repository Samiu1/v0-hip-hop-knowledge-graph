-- ============================================================
-- 02-seed.sql  Hip-Hop Knowledge Graph — Seed Data
-- Columns match 01-schema.sql exactly
-- ============================================================

-- ── ERAS ─────────────────────────────────────────────────────
INSERT INTO eras (id, name, year_start, year_end, description, color, key_events) VALUES
  ('era_roots',      'Pre-Hip-Hop Roots',    1925, 1972, 'Jazz, blues, spoken word, funk, and soul that laid the cultural DNA of hip-hop.',           '#6B4C2A', '["1925: Duke Ellington hits","1965: Last Poets form","1970: Gil Scott-Heron debut"]'),
  ('era_birth',      'The Birth',            1973, 1979, 'South Bronx block parties, DJ Kool Herc''s breakbeat innovation, and the birth of MCing.', '#C94F1A', '["1973: First block party","1979: Rapper''s Delight"]'),
  ('era_old_school', 'Old School',           1980, 1985, 'First wave of commercially released hip-hop — Sugarhill Gang, Grandmaster Flash, Run-DMC.',  '#D4A017', '["1980: Kurtis Blow on Mercury","1983: Run-DMC debut"]'),
  ('era_golden',     'Golden Age',           1986, 1993, 'Artistic peak: Public Enemy, N.W.A, Big Daddy Kane, A Tribe Called Quest, Wu-Tang Clan.',   '#2A7D4F', '["1988: It Takes a Nation","1992: The Chronic","1993: Wu-Tang debut"]'),
  ('era_east_west',  'East/West Coast Wars', 1994, 1999, 'Geographic identity, Biggie vs. Tupac, Death Row vs. Bad Boy, West Coast dominance.',       '#1A4C8B', '["1994: Illmatic","1996: All Eyez on Me","1997: Life After Death"]'),
  ('era_bling',      'Bling Era',            2000, 2005, 'Mainstream crossover, Cash Money, Neptunes production, Def Jam supremacy.',                 '#8B1A6B', '["2000: MMLP","2001: The Blueprint","2004: College Dropout"]'),
  ('era_internet',   'Internet Era',         2006, 2012, 'MySpace, mixtape culture, Lil Wayne domination, Drake''s rise, indie rap explosion.',        '#1A7B8B', '["2008: Carter III","2010: MBDTF","2011: Take Care"]'),
  ('era_trap',       'Trap & Streaming',     2013, 2018, 'Atlanta''s global takeover, SoundCloud rap, streaming disruption, Kendrick vs. Drake.',     '#4A1A8B', '["2012: GKMC","2015: TPAB","2018: DAMN. Pulitzer"]'),
  ('era_modern',     'New Generation',       2019, 2026, 'Hyperpop, drill, conscious rap resurgence, global hip-hop, AI-assisted production.',        '#8B4A1A', '["2023: Rock Hall inductees","2024: Drake/Kendrick beef","2025: Global hip-hop"]')
ON CONFLICT (id) DO NOTHING;

-- ── NODES ────────────────────────────────────────────────────
-- Schema columns: id, name, type, era, year_start, year_end, region, description, influence_score, metadata
INSERT INTO nodes (id, name, type, era, year_start, region, description, influence_score, metadata) VALUES

-- Foundational Roots Figures
('n_blues_roots',    'Delta Blues',          'concept', 'era_roots',     1920, 'Mississippi, USA',       'The delta blues tradition — storytelling and emotion that fed directly into hip-hop''s lyrical ethos.',          75,  '{"genre":"blues"}'),
('n_jazz_roots',     'Bebop Jazz',           'concept', 'era_roots',     1940, 'New York City, USA',     'Improvisation, rhythm complexity, and cultural rebellion that echoed through rap.',                               80,  '{"genre":"jazz"}'),
('n_last_poets',     'The Last Poets',       'artist',  'era_roots',     1968, 'New York City, USA',     'Politically charged spoken word group widely considered proto-rappers.',                                         88,  '{"born":1968}'),
('n_gil_scott',      'Gil Scott-Heron',      'artist',  'era_roots',     1949, 'Chicago, USA',           '"The Revolution Will Not Be Televised" — proto-rap and social commentary pioneer.',                              90,  '{"born":1949}'),
('n_james_brown',    'James Brown',          'artist',  'era_roots',     1933, 'Barnwell, USA',          'The most sampled artist in hip-hop history. Funk breaks underpinned entire genres.',                             95,  '{"born":1933}'),
('n_george_clinton', 'George Clinton',       'artist',  'era_roots',     1941, 'Kannapolis, USA',        'Parliament-Funkadelic P-Funk was foundational to West Coast hip-hop sampling.',                                  88,  '{"born":1941}'),

-- Birth Era
('n_dj_herc',        'DJ Kool Herc',         'artist',  'era_birth',     1955, 'South Bronx, USA',       'Inventor of the breakbeat — threw the first hip-hop block party on Aug 11, 1973.',                              98,  '{"born":1955,"born_in":"Kingston, Jamaica"}'),
('n_grandmaster_d',  'Grandmaster DST',      'artist',  'era_birth',     1960, 'New York City, USA',     'Pioneering turntablist who appeared on Herbie Hancock''s "Rockit".',                                             80,  '{"born":1960}'),
('n_afrika',         'Afrika Bambaataa',     'artist',  'era_birth',     1957, 'South Bronx, USA',       'Zulu Nation founder. "Planet Rock" fused electro and hip-hop, globalising the culture.',                        95,  '{"born":1957}'),
('n_dj_flash',       'Grandmaster Flash',    'artist',  'era_birth',     1958, 'South Bronx, USA',       'Pioneer of precise DJing — the Quick Mix, the Clock Theory.',                                                   96,  '{"born":1958,"born_in":"Barbados"}'),
('n_melle_mel',      'Melle Mel',            'artist',  'era_birth',     1961, 'New York City, USA',     'Grandmaster Flash & the Furious Five MC — "The Message" redefined hip-hop lyricism.',                           90,  '{"born":1961}'),
('n_coke_la_rock',   'Coke La Rock',         'artist',  'era_birth',     1955, 'South Bronx, USA',       'Considered the first MC, hype man for DJ Kool Herc at 1973 block parties.',                                     82,  '{"born":1955}'),

-- Old School
('n_sugarhill',      'Sugarhill Gang',       'artist',  'era_old_school',1979, 'Englewood, USA',         '"Rapper''s Delight" (1979) — first hip-hop single to reach the Billboard Hot 100.',                             85,  '{"formed":1979}'),
('n_run_dmc',        'Run-DMC',              'artist',  'era_old_school',1981, 'Hollis Queens, USA',     'First rap act on MTV, first platinum rap album. Bridged rock and hip-hop.',                                     97,  '{"formed":1981}'),
('n_ll_cool_j',      'LL Cool J',            'artist',  'era_old_school',1968, 'Queens, USA',            'First artist signed to Def Jam. Pioneered the rapper-as-sex-symbol archetype.',                                 88,  '{"born":1968}'),
('n_kurtis_blow',    'Kurtis Blow',          'artist',  'era_old_school',1959, 'Harlem, USA',            'First rapper to sign with a major label (Mercury Records, 1979).',                                               84,  '{"born":1959}'),
('n_bdp',            'BDP / KRS-One',        'artist',  'era_old_school',1965, 'South Bronx, USA',       'Boogie Down Productions. "Criminal Minded" launched independent hip-hop.',                                       91,  '{"born":1965}'),
('n_beastie_boys',   'Beastie Boys',         'artist',  'era_old_school',1981, 'New York City, USA',     'First white rap act to achieve mainstream success. "(You Gotta) Fight For Your Right".',                        90,  '{"formed":1981}'),

-- Golden Age
('n_public_enemy',   'Public Enemy',         'artist',  'era_golden',    1982, 'Long Island, USA',       '"It Takes a Nation of Millions" — the apex of politically charged hip-hop.',                                    98,  '{"formed":1982}'),
('n_nwa',            'N.W.A',                'artist',  'era_golden',    1986, 'Compton, USA',           '"Straight Outta Compton" invented gangsta rap and ignited the culture war.',                                    99,  '{"formed":1986}'),
('n_ice_cube',       'Ice Cube',             'artist',  'era_golden',    1969, 'South Central LA, USA',  'N.W.A lyricist. Solo career defined West Coast rap''s intellectual wing.',                                      95,  '{"born":1969}'),
('n_dr_dre',         'Dr. Dre',              'artist',  'era_golden',    1965, 'Compton, USA',           'N.W.A producer. Invented G-Funk. Produced Snoop, Eminem, Kendrick. Beats empire.',                             99,  '{"born":1965}'),
('n_rakim',          'Rakim',                'artist',  'era_golden',    1968, 'Long Island, USA',       '"Paid in Full" — introduced internal rhyme schemes that rewrote MCing forever.',                                 98,  '{"born":1968}'),
('n_big_daddy_kane', 'Big Daddy Kane',       'artist',  'era_golden',    1968, 'Brooklyn, USA',          'Technical rap virtuoso who influenced Jay-Z and Notorious B.I.G.',                                              92,  '{"born":1968}'),
('n_atcq',           'A Tribe Called Quest', 'artist',  'era_golden',    1985, 'Queens, USA',            'Jazz-sampling alternative hip-hop collective. "The Low End Theory" is a masterpiece.',                          96,  '{"formed":1985}'),
('n_wu_tang',        'Wu-Tang Clan',         'artist',  'era_golden',    1992, 'Staten Island, USA',     '9-member collective that built an empire. RZA''s cinematic production changed hip-hop.',                       99,  '{"formed":1992}'),
('n_rza',            'RZA',                  'artist',  'era_golden',    1969, 'Brooklyn, USA',          'Wu-Tang mastermind. Deconstructed soul samples into something entirely alien and new.',                         95,  '{"born":1969}'),
('n_nas',            'Nas',                  'artist',  'era_golden',    1973, 'Queensbridge, USA',      '"Illmatic" (1994) — universally considered one of the greatest hip-hop albums.',                                98,  '{"born":1973}'),
('n_dp_beatz',       'DJ Premier',           'artist',  'era_golden',    1966, 'Houston, USA',           'Gang Starr beatmaker. Scratched hooks, soul chops. New York boom-bap''s heart.',                               96,  '{"born":1966}'),

-- East/West Era
('n_biggie',         'The Notorious B.I.G.', 'artist',  'era_east_west', 1972, 'Brooklyn, USA',          'Greatest rapper of all time debate anchor. "Ready to Die", "Life After Death".',                                99,  '{"born":1972}'),
('n_snoop',          'Snoop Dogg',           'artist',  'era_east_west', 1971, 'Long Beach, USA',        'The face of G-Funk. Doggystyle remains one of the best-selling rap albums.',                                   95,  '{"born":1971}'),
('n_tupac',          'Tupac Shakur',         'artist',  'era_east_west', 1971, 'East Harlem, USA',       'Cultural icon. Activist, actor, poet. "All Eyez on Me" — most personal hip-hop odyssey.',                     99,  '{"born":1971}'),
('n_jay_z',          'Jay-Z',                'artist',  'era_east_west', 1969, 'Brooklyn, USA',          'Def Jam president. "Reasonable Doubt" to "4:44" — 30 years of reinvention.',                                  99,  '{"born":1969}'),
('n_lauryn_hill',    'Lauryn Hill',          'artist',  'era_east_west', 1975, 'South Orange, USA',      '"The Miseducation of Lauryn Hill" — 5 Grammys, the intersection of hip-hop and soul.',                        95,  '{"born":1975}'),
('n_missy',          'Missy Elliott',        'artist',  'era_east_west', 1971, 'Portsmouth, USA',        'Genre-defying producer-rapper. Timbaland collaborator. Rock Hall inducted 2023.',                              94,  '{"born":1971}'),

-- Bling Era
('n_eminem',         'Eminem',               'artist',  'era_bling',     1972, 'Detroit, USA',           'Best-selling rapper in history. "The Marshall Mathers LP" fastest-selling rap album.',                         98,  '{"born":1972}'),
('n_kanye',          'Kanye West',           'artist',  'era_bling',     1977, 'Chicago, USA',           'Redefined hip-hop production, fashion, and celebrity. College Dropout to Donda.',                              99,  '{"born":1977}'),
('n_timbaland',      'Timbaland',            'artist',  'era_bling',     1972, 'Norfolk, USA',           'Futuristic drum programming and world music fusion. Defined 2000s pop-rap.',                                   94,  '{"born":1972}'),
('n_neptunes',       'The Neptunes',         'artist',  'era_bling',     1992, 'Virginia Beach, USA',    'Pharrell & Chad Hugo. Skeletal beats and alien chords. Defined early 2000s.',                                  95,  '{"formed":1992}'),
('n_scott_storch',   'Scott Storch',         'artist',  'era_bling',     1973, 'Long Island, USA',       'Mediterranean piano loops. Beyoncé, 50 Cent, Chris Brown hits factory.',                                       85,  '{"born":1973}'),

-- Internet Era
('n_lil_wayne',      'Lil Wayne',            'artist',  'era_internet',  1982, 'New Orleans, USA',       'The mixtape king. "Tha Carter III" opened streaming era. Influenced trap generation.',                         97,  '{"born":1982}'),
('n_drake',          'Drake',                'artist',  'era_internet',  1986, 'Toronto, Canada',        'Most streamed artist of 2010s. Invented a mode of rap vulnerability that defined an era.',                     98,  '{"born":1986}'),
('n_nicki',          'Nicki Minaj',          'artist',  'era_internet',  1982, 'Queens, USA',            'First female rapper to dominate charts since Lauryn Hill. Alter-ego flows, iconic.',                          96,  '{"born":1982,"born_in":"Port of Spain, Trinidad"}'),
('n_metro_boomin',   'Metro Boomin',         'artist',  'era_internet',  1993, 'St. Louis, USA',         '"If Young Metro don''t trust you…" The architect of modern trap sonics.',                                      93,  '{"born":1993}'),

-- Trap Era
('n_kendrick',       'Kendrick Lamar',       'artist',  'era_trap',      1987, 'Compton, USA',           '"good kid, m.A.A.d city", "TPAB", "DAMN." — Pulitzer Prize. Greatest of his generation.',                    99,  '{"born":1987}'),
('n_future',         'Future',               'artist',  'era_trap',      1983, 'Atlanta, USA',           'Invented melodic trap. Auto-Tune as instrument. Prolific mixtape machine.',                                    90,  '{"born":1983}'),
('n_travis_scott',   'Travis Scott',         'artist',  'era_trap',      1992, 'Houston, USA',           'Astroworld era. Concert experience as total art. Highest-grossing rap tours.',                                 91,  '{"born":1992}'),
('n_j_cole',         'J. Cole',              'artist',  'era_trap',      1985, 'Fayetteville, USA',      'Dreamville founder. Lyrical bridge between golden age and streaming era.',                                     93,  '{"born":1985}'),

-- Modern Era
('n_cardi_b',        'Cardi B',              'artist',  'era_modern',    1992, 'The Bronx, USA',         'First female rapper with two No. 1 solo albums since Lauryn Hill.',                                            88,  '{"born":1992}'),
('n_21_savage',      '21 Savage',            'artist',  'era_modern',    1993, 'Atlanta, USA',           'Critically acclaimed trap rapper. "I Am > I Was" Grammy winner.',                                              87,  '{"born":1993,"born_in":"London, UK"}'),
('n_tyler',          'Tyler the Creator',    'artist',  'era_modern',    1991, 'Ladera Heights, USA',    'GOLF/Columbia. "Igor" Grammy. Defies every genre constraint hip-hop set.',                                     93,  '{"born":1991}'),
('n_bad_bunny',      'Bad Bunny',            'artist',  'era_modern',    1994, 'Vega Baja, Puerto Rico', 'Most streamed artist globally 3 years running. Latinx hip-hop''s global moment.',                             92,  '{"born":1994}'),
('n_burna_boy',      'Burna Boy',            'artist',  'era_modern',    1991, 'Port Harcourt, Nigeria', 'Afrofusion icon. Grammy winner. Proves hip-hop''s global diaspora.',                                          90,  '{"born":1991}'),

-- Labels
('n_def_jam',        'Def Jam Records',      'movement','era_old_school',1984, 'New York City, USA',     'Rick Rubin & Russell Simmons. Launched LL Cool J, Beastie Boys, Public Enemy, Jay-Z.',                       97,  '{"type":"label","founded":1984}'),
('n_death_row',      'Death Row Records',    'movement','era_east_west', 1991, 'Los Angeles, USA',       'Suge Knight. Dr. Dre, Snoop Dogg, Tupac. Defined West Coast commercial peak.',                               94,  '{"type":"label","founded":1991}'),
('n_bad_boy',        'Bad Boy Records',      'movement','era_east_west', 1993, 'New York City, USA',     'Diddy''s label. Biggie, Faith Evans, Mase. East Coast commercial HQ.',                                       93,  '{"type":"label","founded":1993}'),
('n_roc_nation',     'Roc Nation',           'movement','era_internet',  2008, 'New York City, USA',     'Jay-Z''s empire. Rihanna, J. Cole. Sports management. Entertainment conglomerate.',                          91,  '{"type":"label","founded":2008}'),
('n_tde',            'Top Dawg Entertainment','movement','era_trap',     2004, 'Carson, USA',            'Kendrick, SZA, ScHoolboy Q. Most critically acclaimed independent label of 2010s.',                           92,  '{"type":"label","founded":2004}'),
('n_dreamville',     'Dreamville Records',   'movement','era_trap',      2007, 'Raleigh, USA',           'J. Cole''s label. Bas, Ari Lennox, EarthGang. Lyrical rap''s modern home.',                                 85,  '{"type":"label","founded":2007}'),
('n_quality_ctrl',   'Quality Control',      'movement','era_modern',    2013, 'Atlanta, USA',           'Migos, City Girls, Lil Baby, Lil Yachty. Atlanta trap''s most prolific factory.',                            88,  '{"type":"label","founded":2013}'),

-- Key Albums
('n_album_illmatic',       'Illmatic',                        'album','era_golden',    1994,'Queensbridge, USA','Nas. 10 tracks, 39 minutes. The perfect New York rap album.',                    99,'{"artist":"Nas","year":1994}'),
('n_album_ready_to_die',   'Ready to Die',                    'album','era_east_west', 1994,'Brooklyn, USA',    'Notorious B.I.G. Debut. Dark, cinematic, autobiographical.',                     98,'{"artist":"The Notorious B.I.G.","year":1994}'),
('n_album_all_eyez',       'All Eyez on Me',                  'album','era_east_west', 1996,'Los Angeles, USA', 'Tupac. Double album. Defiant, intimate, prophetic.',                               97,'{"artist":"Tupac Shakur","year":1996}'),
('n_album_reasonable',     'Reasonable Doubt',                'album','era_east_west', 1996,'Brooklyn, USA',    'Jay-Z debut. Mafioso rap, Pete Rock production.',                                 97,'{"artist":"Jay-Z","year":1996}'),
('n_album_blueprint',      'The Blueprint',                   'album','era_bling',     2001,'Brooklyn, USA',    'Jay-Z. Kanye West & Just Blaze soul samples. Released 9/11.',                    98,'{"artist":"Jay-Z","year":2001}'),
('n_album_tpab',           'To Pimp a Butterfly',             'album','era_trap',      2015,'Compton, USA',     'Kendrick Lamar. Live jazz, funk, spoken word. Pulitzer-level statement.',        99,'{"artist":"Kendrick Lamar","year":2015}'),
('n_album_take_care',      'Take Care',                       'album','era_internet',  2011,'Toronto, Canada',  'Drake. Introduced melodic rap vulnerability to mainstream.',                       95,'{"artist":"Drake","year":2011}'),
('n_album_carter3',        'Tha Carter III',                  'album','era_internet',  2008,'New Orleans, USA', 'Lil Wayne. 1M copies first week. Mixtape king''s mainstream peak.',               96,'{"artist":"Lil Wayne","year":2008}'),
('n_album_mbdtf',          'My Beautiful Dark Twisted Fantasy','album','era_internet', 2010,'Hawaii, USA',      'Kanye West. Maximum album. Maximalist everything. 2010s blueprint.',              99,'{"artist":"Kanye West","year":2010}'),
('n_album_gkmc',           'good kid, m.A.A.d city',          'album','era_trap',      2012,'Compton, USA',     'Kendrick Lamar. Narrative concept album. Compton as setting and character.',     99,'{"artist":"Kendrick Lamar","year":2012}'),
('n_album_doggystyle',     'Doggystyle',                      'album','era_east_west', 1993,'Long Beach, USA',  'Snoop Dogg debut. Dr. Dre produced. 800k copies first week.',                    97,'{"artist":"Snoop Dogg","year":1993}'),
('n_album_chronic',        'The Chronic',                     'album','era_east_west', 1992,'Compton, USA',     'Dr. Dre. Invented G-Funk. Launched Death Row era.',                              98,'{"artist":"Dr. Dre","year":1992}'),
('n_album_college_drop',   'The College Dropout',             'album','era_bling',     2004,'Chicago, USA',     'Kanye West debut. Soul samples, self-awareness, anti-industry anthem.',          97,'{"artist":"Kanye West","year":2004}'),
('n_album_eminem_mm',      'The Marshall Mathers LP',         'album','era_bling',     2000,'Detroit, USA',     'Eminem. Fastest-selling rap album in history. Raw autobiography.',               98,'{"artist":"Eminem","year":2000}'),
('n_album_nation',         'It Takes a Nation of Millions',   'album','era_golden',    1988,'Long Island, USA', 'Public Enemy. Noise-assault production. Most political rap album.',              99,'{"artist":"Public Enemy","year":1988}')

ON CONFLICT (id) DO NOTHING;

-- ── EDGES ────────────────────────────────────────────────────
-- Valid relationships: influenced, collaborated, sampled, member_of, pioneered, rivals, produced, released_in, originated_in
INSERT INTO edges (source_id, target_id, relationship, weight, year) VALUES

-- Roots → Birth influences
('n_james_brown',   'n_dj_herc',          'influenced',   0.95, 1973),
('n_james_brown',   'n_afrika',           'influenced',   0.90, 1977),
('n_james_brown',   'n_dr_dre',           'influenced',   0.88, 1992),
('n_george_clinton','n_dr_dre',           'influenced',   0.92, 1992),
('n_george_clinton','n_snoop',            'influenced',   0.85, 1993),
('n_last_poets',    'n_public_enemy',     'influenced',   0.90, 1986),
('n_last_poets',    'n_gil_scott',        'collaborated', 0.80, 1971),
('n_gil_scott',     'n_public_enemy',     'influenced',   0.88, 1986),
('n_gil_scott',     'n_kendrick',         'influenced',   0.87, 2012),
('n_jazz_roots',    'n_atcq',             'influenced',   0.95, 1989),
('n_blues_roots',   'n_james_brown',      'influenced',   0.70, 1956),

-- Birth era
('n_dj_herc',       'n_dj_flash',         'influenced',   0.95, 1975),
('n_dj_herc',       'n_afrika',           'influenced',   0.90, 1974),
('n_dj_herc',       'n_coke_la_rock',     'collaborated', 0.99, 1973),
('n_dj_flash',      'n_melle_mel',        'collaborated', 0.99, 1976),
('n_dj_flash',      'n_sugarhill',        'influenced',   0.70, 1979),
('n_afrika',        'n_run_dmc',          'influenced',   0.75, 1983),

-- Old School
('n_run_dmc',       'n_ll_cool_j',        'influenced',   0.82, 1984),
('n_kurtis_blow',   'n_run_dmc',          'influenced',   0.85, 1981),
('n_bdp',           'n_public_enemy',     'influenced',   0.88, 1987),
('n_beastie_boys',  'n_run_dmc',          'influenced',   0.78, 1983),
('n_ll_cool_j',     'n_def_jam',          'pioneered',    0.99, 1984),
('n_beastie_boys',  'n_def_jam',          'pioneered',    0.99, 1986),
('n_public_enemy',  'n_def_jam',          'pioneered',    0.99, 1987),
('n_run_dmc',       'n_def_jam',          'pioneered',    0.90, 1983),

-- Golden Age
('n_public_enemy',  'n_kendrick',         'influenced',   0.90, 2011),
('n_public_enemy',  'n_j_cole',           'influenced',   0.80, 2007),
('n_nwa',           'n_ice_cube',         'member_of',    0.99, 1987),
('n_nwa',           'n_dr_dre',           'member_of',    0.99, 1987),
('n_nwa',           'n_death_row',        'influenced',   0.90, 1991),
('n_ice_cube',      'n_kendrick',         'influenced',   0.85, 2008),
('n_dr_dre',        'n_snoop',            'produced',     0.99, 1993),
('n_dr_dre',        'n_eminem',           'produced',     0.99, 1999),
('n_dr_dre',        'n_kendrick',         'produced',     0.95, 2011),
('n_dr_dre',        'n_death_row',        'pioneered',    0.99, 1991),
('n_rakim',         'n_nas',              'influenced',   0.96, 1990),
('n_rakim',         'n_jay_z',            'influenced',   0.92, 1993),
('n_rakim',         'n_big_daddy_kane',   'collaborated', 0.85, 1987),
('n_big_daddy_kane','n_jay_z',            'influenced',   0.90, 1993),
('n_big_daddy_kane','n_biggie',           'influenced',   0.88, 1992),
('n_atcq',          'n_nas',              'influenced',   0.82, 1991),
('n_atcq',          'n_kendrick',         'influenced',   0.87, 2010),
('n_wu_tang',       'n_rza',              'member_of',    0.99, 1992),
('n_rza',           'n_metro_boomin',     'influenced',   0.80, 2012),
('n_dp_beatz',      'n_nas',              'produced',     0.96, 1994),
('n_dp_beatz',      'n_jay_z',            'produced',     0.82, 1996),

-- Album releases (released_in = node originated in / was released in this context)
('n_nas',           'n_album_illmatic',   'pioneered',    0.99, 1994),
('n_nas',           'n_jay_z',            'rivals',       0.90, 2001),

-- East/West era
('n_biggie',        'n_bad_boy',          'pioneered',    0.99, 1993),
('n_biggie',        'n_jay_z',            'influenced',   0.90, 1995),
('n_biggie',        'n_album_ready_to_die','pioneered',   0.99, 1994),
('n_tupac',         'n_death_row',        'pioneered',    0.95, 1995),
('n_tupac',         'n_album_all_eyez',   'pioneered',    0.99, 1996),
('n_tupac',         'n_biggie',           'rivals',       0.95, 1995),
('n_snoop',         'n_death_row',        'pioneered',    0.99, 1992),
('n_snoop',         'n_album_doggystyle', 'pioneered',    0.99, 1993),
('n_dr_dre',        'n_album_chronic',    'pioneered',    0.99, 1992),
('n_jay_z',         'n_bad_boy',          'rivals',       0.75, 1997),
('n_jay_z',         'n_def_jam',          'pioneered',    0.90, 1996),
('n_jay_z',         'n_roc_nation',       'pioneered',    0.99, 2008),
('n_jay_z',         'n_album_reasonable', 'pioneered',    0.99, 1996),
('n_jay_z',         'n_album_blueprint',  'pioneered',    0.99, 2001),
('n_jay_z',         'n_kanye',            'collaborated', 0.95, 2001),
('n_lauryn_hill',   'n_missy',            'influenced',   0.82, 1997),
('n_missy',         'n_timbaland',        'collaborated', 0.99, 1997),
('n_eminem',        'n_dr_dre',           'collaborated', 0.99, 1999),
('n_eminem',        'n_album_eminem_mm',  'pioneered',    0.99, 2000),

-- Bling Era
('n_kanye',         'n_def_jam',          'pioneered',    0.99, 2004),
('n_kanye',         'n_album_college_drop','pioneered',   0.99, 2004),
('n_kanye',         'n_album_mbdtf',      'pioneered',    0.99, 2010),
('n_kanye',         'n_album_blueprint',  'produced',     0.95, 2001),
('n_timbaland',     'n_neptunes',         'rivals',       0.80, 2003),
('n_neptunes',      'n_jay_z',            'produced',     0.85, 2001),
('n_neptunes',      'n_kanye',            'influenced',   0.75, 2003),

-- Internet Era
('n_lil_wayne',     'n_quality_ctrl',     'influenced',   0.85, 2010),
('n_lil_wayne',     'n_drake',            'collaborated', 0.95, 2009),
('n_lil_wayne',     'n_nicki',            'collaborated', 0.95, 2007),
('n_lil_wayne',     'n_album_carter3',    'pioneered',    0.99, 2008),
('n_drake',         'n_roc_nation',       'influenced',   0.75, 2010),
('n_drake',         'n_album_take_care',  'pioneered',    0.99, 2011),
('n_drake',         'n_kendrick',         'rivals',       0.99, 2013),
('n_nicki',         'n_cardi_b',          'rivals',       0.88, 2017),
('n_album_mbdtf',   'n_tyler',            'influenced',   0.85, 2012),
('n_metro_boomin',  'n_future',           'produced',     0.95, 2014),
('n_metro_boomin',  'n_21_savage',        'produced',     0.92, 2016),

-- Trap & Modern
('n_kendrick',      'n_tde',              'pioneered',    0.99, 2004),
('n_kendrick',      'n_album_tpab',       'pioneered',    0.99, 2015),
('n_kendrick',      'n_album_gkmc',       'pioneered',    0.99, 2012),
('n_j_cole',        'n_dreamville',       'pioneered',    0.99, 2007),
('n_j_cole',        'n_roc_nation',       'pioneered',    0.90, 2009),
('n_future',        'n_travis_scott',     'influenced',   0.85, 2014),
('n_travis_scott',  'n_quality_ctrl',     'influenced',   0.75, 2016),
('n_21_savage',     'n_quality_ctrl',     'influenced',   0.72, 2016),
('n_tyler',         'n_kendrick',         'influenced',   0.78, 2013),
('n_bad_bunny',     'n_kendrick',         'collaborated', 0.70, 2022),
('n_burna_boy',     'n_drake',            'collaborated', 0.75, 2020),
('n_cardi_b',       'n_quality_ctrl',     'pioneered',    0.95, 2017),

-- Album ← artist (pioneered / originated_in for album nodes)
('n_album_nation',  'n_public_enemy',     'pioneered',    0.99, 1988),
('n_album_illmatic','n_nas',              'pioneered',    0.99, 1994)

ON CONFLICT (source_id, target_id, relationship) DO NOTHING;

-- ── INITIAL ANALYTICS SNAPSHOT ───────────────────────────────
INSERT INTO analytics_snapshots (era, top_nodes, genre_counts, region_dist, edge_density, new_nodes)
VALUES (
  'all',
  '[{"id":"n_kendrick","score":99},{"id":"n_jay_z","score":99},{"id":"n_dr_dre","score":99},{"id":"n_tupac","score":99},{"id":"n_biggie","score":99}]',
  '{"hip-hop":38,"trap":8,"conscious rap":6,"G-funk":4,"producer":5,"label":7,"concept":2,"album":15}',
  '{"USA":62,"Canada":1,"Nigeria":1,"Puerto Rico":1,"UK/USA":1}',
  0.043,
  82
)
ON CONFLICT DO NOTHING;
