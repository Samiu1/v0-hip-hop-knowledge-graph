-- ============================================================
-- 02-seed.sql  Hip-Hop Knowledge Graph — Seed Data
-- ============================================================

-- ── ERAS ─────────────────────────────────────────────────────
INSERT INTO eras (id, name, start_year, end_year, description, color) VALUES
  ('era_roots',     'Pre-Hip-Hop Roots',     1925, 1972, 'Jazz, blues, spoken word, funk, and soul that laid the cultural DNA of hip-hop.',            '#6B4C2A'),
  ('era_birth',     'The Birth',              1973, 1979, 'South Bronx block parties, DJ Kool Herc''s breakbeat innovation, and the birth of MCing.',    '#C94F1A'),
  ('era_old_school','Old School',             1980, 1985, 'First wave of commercially released hip-hop, Sugarhill Gang, Grandmaster Flash, Run-DMC.',   '#D4A017'),
  ('era_golden',    'Golden Age',             1986, 1993, 'Artistic peak: Public Enemy, N.W.A, Big Daddy Kane, A Tribe Called Quest, Wu-Tang Clan.',    '#2A7D4F'),
  ('era_east_west', 'East/West Coast Wars',  1994, 1999, 'Geographic identity, Biggie vs. Tupac, Death Row vs. Bad Boy, West Coast dominance.',        '#1A4C8B'),
  ('era_bling',     'Bling Era',             2000, 2005, 'Mainstream crossover, Cash Money, Neptunes production, Def Jam supremacy.',                  '#8B1A6B'),
  ('era_internet',  'Internet Era',          2006, 2012, 'MySpace, mixtape culture, Lil Wayne domination, Drake''s rise, indie rap explosion.',         '#1A7B8B'),
  ('era_trap',      'Trap & Streaming',      2013, 2018, 'Atlanta''s global takeover, SoundCloud rap, streaming disruption, Kendrick vs. Drake.',       '#4A1A8B'),
  ('era_modern',    'New Generation',        2019, 2026, 'Hyperpop, drill, conscious rap resurgence, global hip-hop, AI-assisted production.',          '#8B4A1A')
ON CONFLICT (id) DO NOTHING;

-- ── NODES ────────────────────────────────────────────────────
INSERT INTO nodes (id, label, type, era_id, birth_year, origin_city, origin_country, genre_tags, influence_score, description, image_url) VALUES

-- Foundational Roots Figures
('n_blues_roots',   'Delta Blues',         'genre',    'era_roots',     NULL, 'Mississippi',        'USA', ARRAY['blues'],                      75, 'The delta blues tradition that fed directly into hip-hop''s storytelling ethos.',                                     NULL),
('n_jazz_roots',    'Bebop Jazz',          'genre',    'era_roots',     NULL, 'New York City',      'USA', ARRAY['jazz'],                       80, 'Improvisation, rhythm complexity, and cultural rebellion that echoed through rap.',                                   NULL),
('n_last_poets',    'The Last Poets',      'artist',   'era_roots',     1968, 'New York City',      'USA', ARRAY['spoken word','proto-rap'],    88, 'Politically charged spoken word group widely considered proto-rappers.',                                             NULL),
('n_gil_scott',     'Gil Scott-Heron',     'artist',   'era_roots',     1949, 'Chicago',            'USA', ARRAY['spoken word','soul'],         90, '"The Revolution Will Not Be Televised" — proto-rap and social commentary pioneer.',                                  NULL),
('n_james_brown',   'James Brown',         'artist',   'era_roots',     1933, 'Barnwell',           'USA', ARRAY['funk','soul'],                95, 'The most sampled artist in hip-hop history. Funk breaks underpinned entire genres.',                                  NULL),
('n_george_clinton','George Clinton',      'artist',   'era_roots',     1941, 'Kannapolis',         'USA', ARRAY['funk','p-funk'],              88, 'Parliament-Funkadelic''s P-Funk was foundational to West Coast hip-hop sampling.',                                   NULL),

-- Birth Era
('n_dj_herc',       'DJ Kool Herc',        'artist',   'era_birth',     1955, 'Kingston / Bronx',   'USA', ARRAY['DJ','breakbeat'],             98, 'Inventor of the breakbeat — threw the first hip-hop block party on Aug 11, 1973.',                                   NULL),
('n_grandmaster_d', 'Grandmaster DST',     'artist',   'era_birth',     1960, 'New York City',      'USA', ARRAY['DJ','turntablism'],           80, 'Pioneering turntablist who appeared on Herbie Hancock''s "Rockit".',                                                 NULL),
('n_afrika',        'Afrika Bambaataa',    'artist',   'era_birth',     1957, 'South Bronx',        'USA', ARRAY['DJ','electro'],               95, 'Zulu Nation founder. "Planet Rock" fused electro and hip-hop, globalising the culture.',                             NULL),
('n_dj_flash',      'Grandmaster Flash',   'artist',   'era_birth',     1958, 'Barbados / Bronx',   'USA', ARRAY['DJ','hip-hop'],               96, 'Pioneer of precise DJing techniques — the Quick Mix, the Clock Theory.',                                            NULL),
('n_melle_mel',     'Melle Mel',           'artist',   'era_birth',     1961, 'New York City',      'USA', ARRAY['MC','conscious rap'],         90, 'Grandmaster Flash & the Furious Five MC — "The Message" redefined hip-hop lyricism.',                                NULL),
('n_coke_la_rock',  'Coke La Rock',        'artist',   'era_birth',     1955, 'South Bronx',        'USA', ARRAY['MC'],                         82, 'Considered the first MC, hype man for DJ Kool Herc at 1973 block parties.',                                         NULL),

-- Old School
('n_sugarhill',     'Sugarhill Gang',      'artist',   'era_old_school', 1979, 'Englewood NJ',      'USA', ARRAY['hip-hop','old school'],       85, '"Rapper''s Delight" (1979) — first hip-hop single to reach the Billboard Hot 100.',                                  NULL),
('n_run_dmc',       'Run-DMC',             'artist',   'era_old_school', 1981, 'Hollis Queens',     'USA', ARRAY['hip-hop','rock rap'],         97, 'First rap act on MTV, first platinum rap album. Bridged rock and hip-hop.',                                         NULL),
('n_ll_cool_j',     'LL Cool J',           'artist',   'era_old_school', 1968, 'Queens',            'USA', ARRAY['hip-hop','pop rap'],          88, 'First artist signed to Def Jam. Pioneered the rapper-as-sex-symbol archetype.',                                    NULL),
('n_kurtis_blow',   'Kurtis Blow',         'artist',   'era_old_school', 1959, 'Harlem',            'USA', ARRAY['hip-hop'],                    84, 'First rapper to sign with a major label (Mercury Records, 1979).',                                                  NULL),
('n_bdp',           'BDP / KRS-One',       'artist',   'era_old_school', 1965, 'South Bronx',       'USA', ARRAY['hip-hop','conscious rap'],    91, 'Boogie Down Productions. "Criminal Minded" launched independent hip-hop.',                                          NULL),
('n_beastie_boys',  'Beastie Boys',        'artist',   'era_old_school', 1981, 'New York City',     'USA', ARRAY['hip-hop','rock rap'],         90, 'First white rap act to achieve mainstream success. "(You Gotta) Fight For Your Right".',                            NULL),

-- Golden Age
('n_public_enemy',  'Public Enemy',        'artist',   'era_golden',    1982, 'Long Island',        'USA', ARRAY['hip-hop','conscious rap','political'], 98, '"It Takes a Nation of Millions" — the apex of politically charged hip-hop.',                                     NULL),
('n_nwa',           'N.W.A',              'artist',   'era_golden',    1986, 'Compton',            'USA', ARRAY['gangsta rap','West Coast'],   99, '"Straight Outta Compton" invented gangsta rap and ignited the culture war.',                                        NULL),
('n_ice_cube',      'Ice Cube',            'artist',   'era_golden',    1969, 'South Central LA',   'USA', ARRAY['gangsta rap','West Coast'],   95, 'N.W.A lyricist. Solo career defined West Coast rap''s intellectual wing.',                                         NULL),
('n_dr_dre',        'Dr. Dre',             'artist',   'era_golden',    1965, 'Compton',            'USA', ARRAY['gangsta rap','G-funk','producer'], 99, 'N.W.A. Invented G-Funk. Produced Snoop, Eminem, Kendrick. Beats empire.',                                        NULL),
('n_ll_rakim',      'Rakim',               'artist',   'era_golden',    1968, 'Long Island',        'USA', ARRAY['hip-hop','lyrical'],          98, '"Paid in Full" — introduced internal rhyme schemes that rewrote MCing forever.',                                    NULL),
('n_big_daddy_kane','Big Daddy Kane',      'artist',   'era_golden',    1968, 'Brooklyn',           'USA', ARRAY['hip-hop','lyrical'],          92, 'Technical rap virtuoso who influenced Jay-Z and Notorious B.I.G.',                                                 NULL),
('n_atcq',          'A Tribe Called Quest','artist',   'era_golden',    1985, 'Queens',             'USA', ARRAY['jazz rap','alternative'],     96, 'Jazz-sampling alternative hip-hop collective. "The Low End Theory" is a masterpiece.',                               NULL),
('n_wu_tang',       'Wu-Tang Clan',        'artist',   'era_golden',    1992, 'Staten Island',      'USA', ARRAY['hip-hop','hardcore'],         99, '9-member collective that built an empire. RZA''s cinematic production changed hip-hop.',                            NULL),
('n_rza',           'RZA',                 'artist',   'era_golden',    1969, 'Brooklyn',           'USA', ARRAY['producer','hip-hop'],         95, 'Wu-Tang mastermind. Deconstructed soul samples into something entirely alien and new.',                             NULL),
('n_nas',           'Nas',                 'artist',   'era_golden',    1973, 'Queensbridge',       'USA', ARRAY['hip-hop','lyrical'],          98, '"Illmatic" (1994) — universally considered one of the greatest hip-hop albums.',                                   NULL),
('n_biggie',        'The Notorious B.I.G.','artist',   'era_east_west', 1972, 'Brooklyn',           'USA', ARRAY['hip-hop','East Coast'],       99, 'Greatest rapper of all time debate anchor. "Ready to Die", "Life After Death".',                                   NULL),
('n_snoop',         'Snoop Dogg',          'artist',   'era_east_west', 1971, 'Long Beach',         'USA', ARRAY['G-funk','West Coast'],        95, 'The face of G-Funk. Doggystyle remains one of the best-selling rap albums.',                                      NULL),
('n_tupac',         'Tupac Shakur',        'artist',   'era_east_west', 1971, 'East Harlem',        'USA', ARRAY['hip-hop','West Coast','conscious'], 99, 'Cultural icon. Activist, actor, poet. "All Eyez on Me" — most personal hip-hop odyssey.',                       NULL),
('n_jay_z',         'Jay-Z',               'artist',   'era_east_west', 1969, 'Brooklyn',           'USA', ARRAY['hip-hop','East Coast'],       99, 'Def Jam president. "Reasonable Doubt" to "4:44" — 30 years of reinvention.',                                      NULL),
('n_lauryn_hill',   'Lauryn Hill',         'artist',   'era_east_west', 1975, 'South Orange NJ',   'USA', ARRAY['hip-hop','neo soul','Fugees'], 95, '"The Miseducation of Lauryn Hill" — 5 Grammys, defined the intersection of hip-hop and soul.',                    NULL),
('n_missy',         'Missy Elliott',       'artist',   'era_east_west', 1971, 'Portsmouth VA',      'USA', ARRAY['hip-hop','R&B','producer'],   94, 'Genre-defying producer-rapper. Timbaland collaborator. Inducted Rock Hall 2023.',                                 NULL),
('n_eminem',        'Eminem',              'artist',   'era_bling',     1972, 'Detroit',            'USA', ARRAY['hip-hop','pop rap'],          98, 'Best-selling rapper in history. "The Marshall Mathers LP" — fastest-selling rap album.',                           NULL),
('n_kanye',         'Kanye West',          'artist',   'era_bling',     1977, 'Atlanta/Chicago',    'USA', ARRAY['hip-hop','producer','gospel rap'], 99, 'Redefined hip-hop production, fashion, and celebrity. College Dropout to Donda.',                               NULL),
('n_lil_wayne',     'Lil Wayne',           'artist',   'era_internet',  1982, 'New Orleans',        'USA', ARRAY['hip-hop','mixtape'],          97, 'The mixtape king. "Tha Carter III" opened streaming era. Influenced trap generation.',                              NULL),
('n_drake',         'Drake',               'artist',   'era_internet',  1986, 'Toronto',            'Canada', ARRAY['hip-hop','pop rap','R&B'], 98, 'Most streamed artist of 2010s. Invented a mode of rap vulnerability that defined an era.',                         NULL),
('n_nicki',         'Nicki Minaj',         'artist',   'era_internet',  1982, 'Port of Spain / Queens', 'Trinidad', ARRAY['hip-hop','pop rap','female rap'], 96, 'First female rapper to dominate charts since Lauryn Hill. Alter-ego flows, iconic.',                     NULL),
('n_kendrick',      'Kendrick Lamar',      'artist',   'era_trap',      1987, 'Compton',            'USA', ARRAY['conscious rap','West Coast','lyrical'], 99, '"good kid, m.A.A.d city", "TPAB", "DAMN." — Pulitzer Prize. Greatest of his generation.',                  NULL),
('n_future',        'Future',              'artist',   'era_trap',      1983, 'Atlanta',            'USA', ARRAY['trap','mumble rap'],          90, 'Invented melodic trap. Auto-Tune as instrument. Prolific mixtape machine.',                                        NULL),
('n_travis_scott',  'Travis Scott',        'artist',   'era_trap',      1992, 'Houston',            'USA', ARRAY['trap','psychedelic rap'],     91, 'Astroworld era. Concert experience as total art. Highest-grossing rap tours.',                                    NULL),
('n_j_cole',        'J. Cole',             'artist',   'era_trap',      1985, 'Fayetteville NC',   'USA', ARRAY['conscious rap','lyrical'],    93, 'Dreamville founder. Lyrical bridge between golden age and streaming era.',                                        NULL),
('n_cardi_b',       'Cardi B',             'artist',   'era_modern',    1992, 'The Bronx',          'USA', ARRAY['hip-hop','pop rap','female rap'], 88, 'First female rapper with two No. 1 solo albums since Lauryn Hill.',                                             NULL),
('n_21_savage',     '21 Savage',           'artist',   'era_modern',    1993, 'Atlanta / London',   'UK/USA', ARRAY['trap'],                   87, 'Critically acclaimed trap rapper. "I Am > I Was" Grammy winner.',                                                  NULL),
('n_tyler',         'Tyler the Creator',   'artist',   'era_modern',    1991, 'Ladera Heights CA', 'USA', ARRAY['alternative rap','producer'], 93, 'GOLF/Columbia. "Igor" Grammy. Defies every genre constraint hip-hop set.',                                         NULL),
('n_bad_bunny',     'Bad Bunny',           'artist',   'era_modern',    1994, 'Vega Baja',          'Puerto Rico', ARRAY['reggaeton','Latin trap'], 92, 'Most streamed artist globally 3 years running. Latinx hip-hop''s global moment.',                               NULL),
('n_burna_boy',     'Burna Boy',           'artist',   'era_modern',    1991, 'Port Harcourt',      'Nigeria', ARRAY['afrobeats','hip-hop'],   90, 'Afrofusion icon. Grammy winner. Proves hip-hop''s global diaspora.',                                               NULL),

-- Key Labels / Movements
('n_def_jam',       'Def Jam Records',     'label',    'era_old_school', NULL, 'New York City',    'USA', ARRAY['label'],                      97, 'Rick Rubin & Russell Simmons. Launched LL Cool J, Beastie Boys, Public Enemy, Jay-Z.',                              NULL),
('n_death_row',     'Death Row Records',   'label',    'era_east_west', NULL, 'Los Angeles',       'USA', ARRAY['label'],                      94, 'Suge Knight. Dr. Dre, Snoop Dogg, Tupac. Defined West Coast''s commercial peak.',                                  NULL),
('n_bad_boy',       'Bad Boy Records',     'label',    'era_east_west', NULL, 'New York City',     'USA', ARRAY['label'],                      93, 'Diddy''s label. Biggie, Faith Evans, Mase. East Coast''s commercial HQ.',                                          NULL),
('n_roc_nation',    'Roc Nation',          'label',    'era_internet',  NULL, 'New York City',     'USA', ARRAY['label'],                      91, 'Jay-Z''s empire. Rihanna, J. Cole. Sports mgmt. Entertainment conglomerate.',                                      NULL),
('n_tde',           'Top Dawg Entertainment','label',  'era_trap',      NULL, 'Carson CA',         'USA', ARRAY['label'],                      92, 'Kendrick, SZA, ScHoolboy Q. Most critically acclaimed independent label of 2010s.',                                NULL),
('n_dreamville',    'Dreamville Records',  'label',    'era_trap',      NULL, 'Raleigh NC',        'USA', ARRAY['label'],                      85, 'J. Cole''s label. Bas, Ari Lennox, EarthGang. Lyrical rap''s modern home.',                                       NULL),
('n_quality_ctrl',  'Quality Control',     'label',    'era_modern',    NULL, 'Atlanta',           'USA', ARRAY['label'],                      88, 'Migos, City Girls, Lil Baby, Lil Yachty. Atlanta trap''s most prolific factory.',                                  NULL),

-- Producers
('n_timbaland',     'Timbaland',           'artist',   'era_bling',     1972, 'Norfolk VA',        'USA', ARRAY['producer','hip-hop'],         94, 'Futuristic drum programming and world music fusion. Defined 2000s pop-rap.',                                      NULL),
('n_neptunes',      'The Neptunes',        'artist',   'era_bling',     1992, 'Virginia Beach',    'USA', ARRAY['producer','hip-hop'],         95, 'Pharrell & Chad Hugo. Skeletal beats and alien chords. Defined early 2000s.',                                     NULL),
('n_scott_storch',  'Scott Storch',        'artist',   'era_bling',     1973, 'Long Island',       'USA', ARRAY['producer'],                   85, 'Mediterranean piano loops. Beyoncé, 50 Cent, Chris Brown hits factory.',                                          NULL),
('n_metro_boomin',  'Metro Boomin',        'artist',   'era_trap',      1993, 'St. Louis',         'USA', ARRAY['producer','trap'],            93, '"If Young Metro don''t trust you…" The architect of modern trap sonics.',                                         NULL),
('n_dp_beatz',      'DJ Premier',          'artist',   'era_golden',    1966, 'Houston',           'USA', ARRAY['producer','hip-hop'],         96, 'Gang Starr beatmaker. Scratched hooks, soul chops. New York boom-bap''s heart.',                                  NULL),

-- Key Albums (nodes of type "album")
('n_album_illmatic',      'Illmatic',               'album', 'era_golden',    1994, 'Queensbridge', 'USA', ARRAY['lyrical','East Coast'],  99, 'Nas. 10 tracks, 39 minutes. The perfect New York rap album.',                     NULL),
('n_album_ready_to_die',  'Ready to Die',           'album', 'era_east_west', 1994, 'Brooklyn',    'USA', ARRAY['East Coast'],             98, 'Notorious B.I.G. Debut. Dark, cinematic, autobiographical.',                      NULL),
('n_album_all_eyez',      'All Eyez on Me',         'album', 'era_east_west', 1996, 'Los Angeles', 'USA', ARRAY['West Coast'],             97, 'Tupac. Double album. Defiant, intimate, prophetic.',                              NULL),
('n_album_reasonable',    'Reasonable Doubt',       'album', 'era_east_west', 1996, 'Brooklyn',    'USA', ARRAY['East Coast'],             97, 'Jay-Z debut. Mafioso rap, Pete Rock production.',                                 NULL),
('n_album_blueprint',     'The Blueprint',          'album', 'era_bling',     2001, 'Brooklyn',    'USA', ARRAY['hip-hop'],                98, 'Jay-Z. Kanye West & Just Blaze soul samples. Released 9/11.',                    NULL),
('n_album_tpab',          'To Pimp a Butterfly',    'album', 'era_trap',      2015, 'Compton',     'USA', ARRAY['conscious rap','jazz'],   99, 'Kendrick Lamar. Live jazz, funk, spoken word. Pulitzer-level statement.',         NULL),
('n_album_take_care',     'Take Care',              'album', 'era_internet',  2011, 'Toronto',     'Canada', ARRAY['hip-hop','R&B'],       95, 'Drake. Introduced melodic rap vulnerability to mainstream.',                      NULL),
('n_album_carter3',       'Tha Carter III',         'album', 'era_internet',  2008, 'New Orleans', 'USA', ARRAY['hip-hop'],               96, 'Lil Wayne. 1M copies first week. Mixtape king''s mainstream peak.',              NULL),
('n_album_mbdtf',         'My Beautiful Dark Twisted Fantasy', 'album', 'era_internet', 2010, 'Hawaii', 'USA', ARRAY['hip-hop','producer'], 99, 'Kanye West. Maximum album. Maximalist everything. 2010s blueprint.', NULL),
('n_album_gkmc',          'good kid, m.A.A.d city', 'album', 'era_trap',      2012, 'Compton',    'USA', ARRAY['conscious rap','West Coast'], 99, 'Kendrick Lamar. Narrative concept album. Compton as setting and character.',   NULL),
('n_album_doggystyle',    'Doggystyle',             'album', 'era_east_west', 1993, 'Long Beach',  'USA', ARRAY['G-funk','West Coast'],    97, 'Snoop Dogg. Debut. Dr. Dre produced. 800k copies first week.',                   NULL),
('n_album_chronic',       'The Chronic',            'album', 'era_east_west', 1992, 'Compton',     'USA', ARRAY['G-funk','West Coast'],    98, 'Dr. Dre. Invented G-Funk. Launched Death Row era.',                              NULL),
('n_album_college_drop',  'The College Dropout',    'album', 'era_bling',     2004, 'Chicago',     'USA', ARRAY['hip-hop','soul'],         97, 'Kanye West debut. Soul samples, self-awareness, anti-industry anthem.',          NULL),
('n_album_eminem_mm',     'The Marshall Mathers LP','album', 'era_bling',     2000, 'Detroit',     'USA', ARRAY['hip-hop'],               98, 'Eminem. Fastest-selling rap album in history. Raw autobiography.',              NULL),
('n_album_nation',        'It Takes a Nation',      'album', 'era_golden',    1988, 'Long Island', 'USA', ARRAY['conscious rap','political'], 99, 'Public Enemy. Noise-assault production by Bomb Squad. Most political rap album.', NULL)

ON CONFLICT (id) DO NOTHING;

-- ── EDGES ────────────────────────────────────────────────────
INSERT INTO edges (source_id, target_id, relationship, weight, description) VALUES

-- Roots → Birth
('n_james_brown',   'n_dj_herc',     'influenced',   0.95, 'Herc built the breakbeat from James Brown records'),
('n_james_brown',   'n_afrika',      'influenced',   0.90, '"Planet Rock" sampling of JB breaks'),
('n_james_brown',   'n_dr_dre',      'influenced',   0.88, 'G-Funk built on JB funk architecture'),
('n_george_clinton','n_dr_dre',      'influenced',   0.92, 'G-Funk IS P-Funk recontextualized'),
('n_george_clinton','n_snoop',       'influenced',   0.85, 'Snoop''s flow absorbed P-Funk aesthetics'),
('n_last_poets',    'n_public_enemy','influenced',   0.90, 'Political spoken word DNA in PE''s messaging'),
('n_last_poets',    'n_gil_scott',   'collaborated', 0.80, 'Shared stages and poetic traditions'),
('n_gil_scott',     'n_public_enemy','influenced',   0.88, 'Social commentary tradition'),
('n_gil_scott',     'n_kendrick',    'influenced',   0.87, 'Narrative political poetry tradition'),
('n_jazz_roots',    'n_atcq',        'influenced',   0.95, 'A Tribe Called Quest''s entire sonic palette is jazz'),
('n_blues_roots',   'n_james_brown', 'influenced',   0.70, 'Blues emotion and call-response in funk'),

-- Birth era
('n_dj_herc',       'n_dj_flash',    'influenced',   0.95, 'Flash studied and extended Herc''s breakbeat technique'),
('n_dj_herc',       'n_afrika',      'influenced',   0.90, 'Afrika attended Herc''s parties, built on the blueprint'),
('n_dj_herc',       'n_coke_la_rock','collaborated', 0.99, 'Coke La Rock was Herc''s MC at the original 1973 party'),
('n_dj_flash',      'n_melle_mel',   'collaborated', 0.99, 'Furious Five — Flash''s MC crew'),
('n_dj_flash',      'n_sugarhill',   'influenced',   0.70, 'Flash''s DJing style influenced early recording artists'),
('n_afrika',        'n_run_dmc',     'influenced',   0.75, 'Electro-funk laid groundwork for rock-rap crossover'),

-- Old School
('n_run_dmc',       'n_def_jam',     'signed_to',    0.90, 'Profile Records, distributed through major but aligned with Def Jam scene'),
('n_run_dmc',       'n_ll_cool_j',   'influenced',   0.82, 'Defined the template LL and others followed'),
('n_ll_cool_j',     'n_def_jam',     'signed_to',    0.99, 'Def Jam''s first artist, launched by Rick Rubin'),
('n_kurtis_blow',   'n_run_dmc',     'influenced',   0.85, 'First rapper on major label; Run-DMC followed his commercial path'),
('n_bdp',           'n_public_enemy','influenced',   0.88, 'Gangsta/conscious hybrid that PE politicized further'),
('n_beastie_boys',  'n_def_jam',     'signed_to',    0.99, 'Rick Rubin produced Licensed to Ill for Def Jam'),
('n_beastie_boys',  'n_run_dmc',     'influenced',   0.78, 'Run-DMC''s rock-rap crossover inspired Beasties'),

-- Golden Age
('n_public_enemy',  'n_def_jam',     'signed_to',    0.99, 'Def Jam''s flagship political act'),
('n_public_enemy',  'n_kendrick',    'influenced',   0.90, 'TPAB''s political scope owes much to PE'),
('n_public_enemy',  'n_j_cole',      'influenced',   0.80, 'Conscious rap tradition'),
('n_nwa',           'n_ice_cube',    'member_of',    0.99, 'Ice Cube was N.W.A''s primary lyricist'),
('n_nwa',           'n_dr_dre',      'member_of',    0.99, 'Dr. Dre produced and rapped in N.W.A'),
('n_nwa',           'n_death_row',   'influenced',   0.90, 'Dre left NWA to found Death Row'),
('n_ice_cube',      'n_kendrick',    'influenced',   0.85, 'West Coast storytelling tradition'),
('n_dr_dre',        'n_snoop',       'produced',     0.99, 'Dre produced and launched Snoop on Doggystyle'),
('n_dr_dre',        'n_eminem',      'produced',     0.99, 'Dre discovered and produced Eminem''s entire early career'),
('n_dr_dre',        'n_kendrick',    'produced',     0.95, 'Dre signed and co-produced Kendrick''s major albums'),
('n_dr_dre',        'n_death_row',   'founded',      0.99, 'Co-founded Death Row with Suge Knight'),
('n_ll_rakim',      'n_nas',         'influenced',   0.96, 'Rakim''s internal rhyme schemes are Nas''s DNA'),
('n_ll_rakim',      'n_jay_z',       'influenced',   0.92, 'Jay-Z''s flow complexity comes from Rakim study'),
('n_ll_rakim',      'n_big_daddy_kane','collaborated',0.85, 'Peers in the Juice Crew/Long Island lyrical scene'),
('n_big_daddy_kane','n_jay_z',       'influenced',   0.90, 'Jay-Z acknowledged Kane as primary influence'),
('n_big_daddy_kane','n_biggie',      'influenced',   0.88, 'Kane''s Brooklyn charisma blueprint'),
('n_atcq',          'n_nas',         'influenced',   0.82, 'Alternative lyrical jazz-rap shared DNA'),
('n_atcq',          'n_kendrick',    'influenced',   0.87, 'Tribe''s album-as-statement model'),
('n_wu_tang',       'n_rza',         'member_of',    0.99, 'RZA is the Wu-Tang production mastermind'),
('n_rza',           'n_metro_boomin','influenced',   0.80, 'Cinematic, deconstructed sampling aesthetic'),
('n_dp_beatz',      'n_nas',         'produced',     0.96, 'DJ Premier produced key Illmatic and later tracks'),
('n_dp_beatz',      'n_jay_z',       'produced',     0.82, '"D''Evils", "Friend or Foe" — formative Jay-Z tracks'),
('n_nas',           'n_album_illmatic','released',   0.99, 'Nas released Illmatic in 1994'),
('n_nas',           'n_jay_z',       'rival',        0.90, '"Ether" vs "Takeover" — rap''s greatest beef'),

-- East/West era
('n_biggie',        'n_bad_boy',     'signed_to',    0.99, 'Bad Boy was Biggie''s home'),
('n_biggie',        'n_jay_z',       'influenced',   0.90, 'East Coast storytelling and cadence blueprint'),
('n_biggie',        'n_album_ready_to_die','released',0.99,'Biggie released Ready to Die on Bad Boy'),
('n_tupac',         'n_death_row',   'signed_to',    0.95, 'Tupac joined Death Row after Suge bailed him out'),
('n_tupac',         'n_album_all_eyez','released',   0.99, 'Tupac released All Eyez on Me on Death Row'),
('n_snoop',         'n_death_row',   'signed_to',    0.99, 'Doggystyle on Death Row'),
('n_snoop',         'n_album_doggystyle','released', 0.99, 'Snoop released Doggystyle in 1993'),
('n_dr_dre',        'n_album_chronic','released',    0.99, 'Dr. Dre released The Chronic in 1992'),
('n_jay_z',         'n_bad_boy',     'rival',        0.75, 'East Coast competition, later allies'),
('n_jay_z',         'n_def_jam',     'signed_to',    0.90, 'Jay-Z signed to Def Jam, later became president'),
('n_jay_z',         'n_roc_nation',  'founded',      0.99, 'Jay-Z founded Roc Nation in 2008'),
('n_jay_z',         'n_album_reasonable','released', 0.99, 'Jay-Z released Reasonable Doubt in 1996'),
('n_jay_z',         'n_album_blueprint','released',  0.99, 'Jay-Z released The Blueprint on 9/11/2001'),
('n_jay_z',         'n_kanye',       'collaborated', 0.95, 'Watch the Throne, Jay mentored Kanye'),
('n_lauryn_hill',   'n_missy',       'influenced',   0.82, 'Female rap excellence tradition'),
('n_missy',         'n_timbaland',   'collaborated', 0.99, 'Timbaland produced Missy''s breakthrough records'),
('n_eminem',        'n_dr_dre',      'signed_to',    0.99, 'Dr. Dre signed Eminem to Aftermath'),
('n_eminem',        'n_def_jam',     'influenced',   0.80, 'Def Jam''s ethos in Detroit transplant'),
('n_eminem',        'n_album_eminem_mm','released',  0.99, 'Eminem released MMLP in 2000'),

-- Bling Era
('n_kanye',         'n_def_jam',     'signed_to',    0.99, 'Def Jam after years trying to be taken seriously'),
('n_kanye',         'n_album_college_drop','released',0.99,'Kanye released College Dropout in 2004'),
('n_kanye',         'n_album_mbdtf', 'released',     0.99, 'Kanye released MBDTF in 2010'),
('n_kanye',         'n_blueprint',   'produced',     0.95, 'Kanye produced many Blueprint soul samples'),
('n_timbaland',     'n_neptunes',    'rival',        0.80, 'Competed for production dominance in early 2000s'),
('n_neptunes',      'n_jay_z',       'produced',     0.85, 'Pharrell produced key Jay-Z tracks'),
('n_neptunes',      'n_kanye',       'influenced',   0.75, 'Sample-flipping aesthetic'),
('n_scott_storch',  'n_timbaland',   'influenced',   0.70, 'Mediterranean/piano loop overlap'),

-- Internet Era
('n_lil_wayne',     'n_quality_ctrl','influenced',   0.85, 'Wayne''s Carter III mixtape-to-album pipeline inspired QC'),
('n_lil_wayne',     'n_drake',       'signed_to',    0.95, 'Drake was signed to Young Money, Lil Wayne''s label'),
('n_lil_wayne',     'n_nicki',       'signed_to',    0.95, 'Nicki Minaj was signed to Young Money'),
('n_lil_wayne',     'n_album_carter3','released',    0.99, 'Lil Wayne released Tha Carter III in 2008'),
('n_drake',         'n_roc_nation',  'influenced',   0.75, 'OVO Sound operates in Roc Nation''s shadow'),
('n_drake',         'n_album_take_care','released',  0.99, 'Drake released Take Care in 2011'),
('n_drake',         'n_kendrick',    'rival',        0.99, 'The decade-long beef culminating in 2024'),
('n_nicki',         'n_cardi_b',     'rival',        0.88, 'Female rap throne competition'),
('n_album_mbdtf',   'n_tyler',       'influenced',   0.85, 'Tyler cited MBDTF as formative'),

-- Trap & Modern
('n_kendrick',      'n_tde',         'signed_to',    0.99, 'TDE was Kendrick''s home for his defining run'),
('n_kendrick',      'n_album_tpab',  'released',     0.99, 'Kendrick released TPAB in 2015'),
('n_kendrick',      'n_album_gkmc',  'released',     0.99, 'Kendrick released good kid, m.A.A.d city in 2012'),
('n_j_cole',        'n_dreamville',  'founded',      0.99, 'J. Cole founded Dreamville Records'),
('n_j_cole',        'n_roc_nation',  'signed_to',    0.90, 'J. Cole was signed to Roc Nation'),
('n_metro_boomin',  'n_future',      'produced',     0.95, 'Metro Boomin''s defining early partnership'),
('n_metro_boomin',  'n_21_savage',   'produced',     0.92, 'Metro & 21 Savage — Savage Mode I and II'),
('n_future',        'n_travis_scott','influenced',   0.85, 'Melodic trap template'),
('n_travis_scott',  'n_quality_ctrl','influenced',   0.75, 'Atlanta trap ecosystem'),
('n_21_savage',     'n_quality_ctrl','influenced',   0.72, 'ATL trap scene overlap'),
('n_tyler',         'n_kendrick',    'influenced',   0.78, 'Both reject genre constraints'),
('n_bad_bunny',     'n_kendrick',    'collaborated', 0.70, 'Cross-genre Latin-rap collaboration'),
('n_burna_boy',     'n_drake',       'collaborated', 0.75, 'Afrobeats-rap fusion collaboration'),
('n_cardi_b',       'n_quality_ctrl','signed_to',    0.95, 'Cardi B was signed to Quality Control'),

-- Album → Artist back-links (artist released album)
('n_album_nation',  'n_public_enemy','released_by',  0.99, 'It Takes a Nation released by Public Enemy'),
('n_album_illmatic','n_nas',         'released_by',  0.99, 'Illmatic released by Nas')

ON CONFLICT DO NOTHING;
