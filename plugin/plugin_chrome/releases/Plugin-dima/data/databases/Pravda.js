// DIMA - Base de données d'opération Pravda (Portal Kombat)
// Réseau de désinformation russe documenté par VIGINUM, DFRLab et CheckFirst

/**
 * PRAVDA NETWORK (PORTAL KOMBAT)
 * ===============================
 * 
 * Réseau de désinformation pro-Kremlin actif depuis 2014
 * Opération exposée en février 2024 par l'agence française VIGINUM
 * Plus de 3,7 millions d'articles publiés sur des centaines de sites
 * Cible plus de 83 pays et régions à travers le monde
 * 
 * Sources principales:
 * - VIGINUM (France)
 * - DFRLab (Atlantic Council)
 * - CheckFirst (Finlande)
 * - American Sunlight Project
 * 
 * Liens opérateur:
 * - TigerWeb (entreprise IT basée en Crimée)
 * - Yevgeny Shevchenko (fondateur)
 */

const pravdaDomains = [
  // ===== DOMAINES PRINCIPAUX - EUROPE DE L'OUEST =====
  {
    domain: "pravda-en.com",
    matchType: "exact",
    reason: "Site principal du réseau Pravda ciblant les audiences anglophones avec du contenu pro-Kremlin traduit automatiquement",
    source: "VIGINUM, DFRLab",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "UK", "USA", "Anti-Ukraine", "LLM", "Multi-Langues"]
  },
  {
    domain: "pravda-fr.com",
    matchType: "exact",
    reason: "Site du réseau Pravda ciblant la France, diffusant des narratifs pro-russes et anti-ukrainiens",
    source: "VIGINUM, DFRLab",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_PORTAL-KOMBAT-NETWORK_ENG_VF.pdf",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "France", "Anti-Ukraine", "Élections", "Multi-Langues"]
  },
  {
    domain: "pravda-de.com",
    matchType: "exact",
    reason: "Version allemande du réseau Pravda, amplifiant la désinformation russe en Allemagne",
    source: "VIGINUM, DFRLab",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Allemagne", "Anti-Ukraine", "Anti-NATO", "Multi-Langues"]
  },
  {
    domain: "pravda-pl.com",
    matchType: "exact",
    reason: "Site ciblant la Pologne avec du contenu pro-Kremlin, particulièrement actif avant les élections européennes 2024",
    source: "VIGINUM, DFRLab",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Pologne", "Anti-Ukraine", "Élections", "Multi-Langues"]
  },
  {
    domain: "pravda-es.com",
    matchType: "exact",
    reason: "Version espagnole diffusant des narratifs pro-russes vers l'Espagne et l'Amérique latine",
    source: "VIGINUM, DFRLab",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Espagne", "Anti-Ukraine", "Multi-Langues"]
  },

  // ===== DOMAINES NEWS-PRAVDA.COM (NOUVELLE INFRASTRUCTURE 2024) =====
  {
    domain: "news-pravda.com",
    matchType: "contains",
    reason: "Domaine principal de la nouvelle infrastructure centralisée lancée en 2024, hébergeant plus de 140 sous-domaines ciblant 83+ pays",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Infrastructure", "Multi-Langues", "LLM"]
  },
  {
    domain: "france.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la France, partie de la nouvelle infrastructure centralisée",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "France", "Anti-Ukraine", "Élections"]
  },
  {
    domain: "germany.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Allemagne avec 376,700+ articles publiés",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Allemagne", "Anti-Ukraine", "Élections"]
  },
  {
    domain: "ukraine.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine diffusant des narratifs anti-ukrainiens directement vers l'Ukraine, 270,300+ articles",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Ukraine", "Anti-Ukraine", "Désinformation-Ciblée"]
  },
  {
    domain: "moldova.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Moldavie avec 244,700+ articles, particulièrement actif durant les périodes électorales",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-04-26",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Moldavie", "Élections", "Anti-Ukraine"]
  },
  {
    domain: "serbia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Serbie avec 228,900+ articles pro-russes",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Serbie", "Anti-Ukraine", "Balkans"]
  },

  // ===== ÉTATS BALTES =====
  {
    domain: "estonia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Estonie et sa minorité russophone",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-04-26",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Estonie", "Baltes", "Anti-NATO"]
  },
  {
    domain: "latvia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Lettonie et sa minorité russophone",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-04-26",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Lettonie", "Baltes", "Anti-NATO"]
  },
  {
    domain: "lithuania.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Lituanie et sa minorité russophone",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-04-26",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Lituanie", "Baltes", "Anti-NATO"]
  },

  // ===== SCANDINAVIE =====
  {
    domain: "finland.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Finlande avec propagande anti-OTAN",
    source: "DFRLab, CheckFirst, NORDIS",
    reportUrl: "https://www.nordishub.eu/nordis-investigation/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Finlande", "Anti-NATO", "Scandinavie"]
  },
  {
    domain: "norway.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Norvège, documenté par l'enquête NORDIS",
    source: "DFRLab, CheckFirst, NORDIS",
    reportUrl: "https://www.nordishub.eu/nordis-investigation/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Norvège", "Anti-NATO", "Scandinavie"]
  },
  {
    domain: "sweden.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Suède avec narratifs anti-OTAN",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Suède", "Anti-NATO", "Scandinavie"]
  },
  {
    domain: "denmark.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant le Danemark",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Danemark", "Scandinavie"]
  },

  // ===== EUROPE CENTRALE ET DE L'EST =====
  {
    domain: "czechia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la République tchèque",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Tchéquie", "Anti-Ukraine"]
  },
  {
    domain: "hungary.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Hongrie",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Hongrie", "Anti-Ukraine"]
  },
  {
    domain: "bulgaria.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Bulgarie",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Bulgarie", "Balkans"]
  },
  {
    domain: "romania.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Roumanie",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Roumanie", "Anti-Ukraine"]
  },
  {
    domain: "slovenia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Slovénie",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Slovénie", "Balkans"]
  },
  {
    domain: "croatia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Croatie",
    source: "EDMO",
    reportUrl: "https://edmo.eu/publications/russian-disinformation-network-pravda-tries-a-new-route-to-influence-eu-public-opinions-few-days-ahead-of-the-vote/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Croatie", "Balkans"]
  },

  // ===== EUROPE DU SUD =====
  {
    domain: "italy.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Italie",
    source: "DFRLab, CheckFirst, EDMO",
    reportUrl: "https://edmo.eu/publications/russian-disinformation-network-pravda-tries-a-new-route-to-influence-eu-public-opinions-few-days-ahead-of-the-vote/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Italie", "Anti-Ukraine"]
  },
  {
    domain: "greece.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Grèce, documenté par Greece Fact Check",
    source: "DFRLab, CheckFirst, EDMO",
    reportUrl: "https://edmo.eu/publications/russian-disinformation-network-pravda-tries-a-new-route-to-influence-eu-public-opinions-few-days-ahead-of-the-vote/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Grèce", "Anti-Ukraine"]
  },
  {
    domain: "portugal.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant le Portugal",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Portugal", "Anti-Ukraine"]
  },

  // ===== AUTRES PAYS EUROPÉENS =====
  {
    domain: "austria.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Autriche",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Autriche", "Anti-Ukraine"]
  },
  {
    domain: "netherlands.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant les Pays-Bas",
    source: "DFRLab, CheckFirst, EDMO",
    reportUrl: "https://edmo.eu/publications/russian-disinformation-network-pravda-tries-a-new-route-to-influence-eu-public-opinions-few-days-ahead-of-the-vote/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Pays-Bas", "Anti-Ukraine"]
  },
  {
    domain: "belgium.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Belgique",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Belgique", "Anti-Ukraine"]
  },

  // ===== CAUCASE ET PARTENARIAT ORIENTAL =====
  {
    domain: "georgia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Géorgie, particulièrement actif durant les élections parlementaires d'octobre 2024",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2024-10-01",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Géorgie", "Élections", "Caucase"]
  },
  {
    domain: "armenia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Arménie",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Arménie", "Caucase"]
  },
  {
    domain: "abkhazia.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Abkhazie (territoire contesté)",
    source: "CheckFirst GitHub",
    reportUrl: "https://github.com/CheckFirstHQ/pravda-network",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Abkhazie", "Territoires-Contestés"]
  },

  // ===== ASIE =====
  {
    domain: "japan.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant le Japon",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Japon", "Asie"]
  },
  {
    domain: "taiwan.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant Taïwan",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Taïwan", "Asie"]
  },
  {
    domain: "turkey.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant la Turquie",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Turquie"]
  },

  // ===== AFRIQUE =====
  {
    domain: "algeria.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Algérie, partie de l'expansion africaine du réseau",
    source: "CheckFirst GitHub",
    reportUrl: "https://github.com/CheckFirstHQ/pravda-network",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Algérie", "Afrique", "Sahel"]
  },
  {
    domain: "albania.news-pravda.com",
    matchType: "exact",
    reason: "Sous-domaine ciblant l'Albanie",
    source: "CheckFirst GitHub",
    reportUrl: "https://github.com/CheckFirstHQ/pravda-network",
    identifiedDate: "2024-05-23",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Albanie", "Balkans"]
  },

  // ===== DOMAINES HISTORIQUES (CRIMEA-NEWS, PREMIÈRE VERSION) =====
  {
    domain: "crimea-news.com",
    matchType: "exact",
    reason: "Premier site du réseau Pravda (version 0), créé par Yevgeny Shevchenko en 2011, précurseur de l'opération Portal Kombat",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2011-01-01",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Crimée", "Infrastructure", "TigerWeb"]
  },
  {
    domain: "lenta.crimea.ua",
    matchType: "exact",
    reason: "Agrégateur de nouvelles original créé par Yevgeny Shevchenko, précurseur du réseau Pravda",
    source: "DFRLab",
    reportUrl: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/",
    identifiedDate: "2011-01-01",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Crimée", "Infrastructure", "TigerWeb"]
  },

  // ===== DOMAINES CIBLANT L'UKRAINE (ÉCOSYSTÈME 2) =====
  {
    domain: "topnews",
    matchType: "contains",
    reason: "Domaines de deuxième génération ciblant les russophones en Ukraine, actifs entre avril et décembre 2022",
    source: "VIGINUM, DFRLab",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_PORTAL-KOMBAT-NETWORK_ENG_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Ukraine", "Anti-Ukraine", "Désinformation-Ciblée"]
  },
  {
    domain: "uanews",
    matchType: "contains",
    reason: "Domaines ciblant les russophones en Ukraine, partie du deuxième écosystème (41 sites)",
    source: "VIGINUM, DFRLab",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_PORTAL-KOMBAT-NETWORK_ENG_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Ukraine", "Anti-Ukraine", "Désinformation-Ciblée"]
  },
  {
    domain: "dnr-news.com",
    matchType: "exact",
    reason: "Site ciblant le Donbass, amplifiant les narratifs séparatistes pro-russes",
    source: "DFRLab, CheckFirst",
    reportUrl: "https://dfrlab.org/2025/03/12/pravda-network-wikipedia-llm-x/",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Ukraine", "Donbass", "Territoires-Contestés"]
  },

  // ===== SOURCES AMPLIFIÉES PAR LE RÉSEAU =====
  {
    domain: "news-front.su",
    matchType: "exact",
    reason: "Site pro-russe multilingue établi en août 2023, utilisé comme source par le réseau Pravda",
    source: "EDMO",
    reportUrl: "https://edmo.eu/publications/russian-disinformation-network-pravda-tries-a-new-route-to-influence-eu-public-opinions-few-days-ahead-of-the-vote/",
    identifiedDate: "2023-08-01",
    riskLevel: "high",
    tags: ["Pravda", "Russie", "Infrastructure", "Multi-Langues"]
  }
];

// =============================================================================
// MÉTADONNÉES DU RÉSEAU
// =============================================================================

const pravdaNetworkMetadata = {
  operationName: "Pravda Network (Portal Kombat)",
  aliases: ["Portal Kombat", "Pravda Ecosystem"],
  active: true,
  firstDetected: "2024-02-12",
  operatorEntity: "TigerWeb (Crimée)",
  operatorIndividual: "Yevgeny Shevchenko",
  primaryTargets: ["Europe", "Ukraine", "Afrique", "Asie"],
  articlesPublished: "3,700,000+",
  domainsCount: "224+ (avril 2024), 140 sous-domaines actifs (2025)",
  countriesTargeted: "83+",
  
  primarySources: [
    "TASS (136,000 citations)",
    "RIA Novosti (99,000 citations)",
    "Lenta (89,000 citations)",
    "Komsomolskaya Pravda (59,000 citations)",
    "RT (54,000 citations)",
    "Telegram channels pro-russes",
    "InfoDefense/SurfNoise network"
  ],
  
  techniques: [
    "Traduction automatique de masse",
    "Publication automatisée à haute fréquence (jusqu'à 650 articles/heure)",
    "Optimisation SEO pour moteurs de recherche",
    "LLM grooming (pollution des données d'entraînement IA)",
    "Pollution de Wikipedia",
    "Réutilisation cross-platform du contenu"
  ],
  
  exposedBy: [
    "VIGINUM (France)",
    "DFRLab (Atlantic Council)",
    "CheckFirst (Finlande)",
    "American Sunlight Project",
    "EDMO (European Digital Media Observatory)",
    "NewsGuard Technologies"
  ],
  
  majorReports: [
    {
      date: "2024-02-12",
      organization: "VIGINUM",
      title: "Portal Kombat Network Report",
      url: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_PORTAL-KOMBAT-NETWORK_ENG_VF.pdf"
    },
    {
      date: "2025-02-24",
      organization: "DFRLab & CheckFirst",
      title: "Russia's so-called 'Pravda' network expands worldwide",
      url: "https://dfrlab.org/2025/02/24/russia-pravda-network-expands-worldwide/"
    },
    {
      date: "2025-03-12",
      organization: "DFRLab & CheckFirst",
      title: "Russia-linked Pravda network cited on Wikipedia, LLMs, and X",
      url: "https://dfrlab.org/2025/03/12/pravda-network-wikipedia-llm-x/"
    },
    {
      date: "2025-04-18",
      organization: "DFRLab & CheckFirst",
      title: "Russia's Pravda network in numbers: Introducing the Pravda Dashboard",
      url: "https://dfrlab.org/2025/04/18/introducing-the-pravda-dashboard/"
    }
  ],
  
  dashboardUrl: "https://dfrlab.org/the-pravda-network/",
  githubDataset: "https://github.com/CheckFirstHQ/pravda-network"
};

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

// Filtrer par tag
function filterPravdaByTag(tag) {
  return pravdaDomains.filter(d => d.tags.includes(tag));
}

// Filtrer par niveau de risque
function filterPravdaByRiskLevel(level) {
  return pravdaDomains.filter(d => d.riskLevel === level);
}

// Filtrer par pays cible
function filterPravdaByCountry(country) {
  return pravdaDomains.filter(d => d.tags.includes(country));
}

// Obtenir tous les tags uniques
function getPravdaTags() {
  const allTags = new Set();
  pravdaDomains.forEach(d => {
    d.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

// Obtenir les statistiques
function getPravdaStats() {
  return {
    total: pravdaDomains.length,
    highRisk: pravdaDomains.filter(d => d.riskLevel === "high").length,
    mediumRisk: pravdaDomains.filter(d => d.riskLevel === "medium").length,
    lowRisk: pravdaDomains.filter(d => d.riskLevel === "low").length,
    tags: getPravdaTags(),
    metadata: pravdaNetworkMetadata
  };
}

// Obtenir les domaines par région
function getPravdaByRegion() {
  return {
    europe_ouest: filterPravdaByTag("France").concat(
      filterPravdaByTag("Allemagne"),
      filterPravdaByTag("UK"),
      filterPravdaByTag("Belgique"),
      filterPravdaByTag("Pays-Bas")
    ),
    europe_est: filterPravdaByTag("Pologne").concat(
      filterPravdaByTag("Tchéquie"),
      filterPravdaByTag("Hongrie"),
      filterPravdaByTag("Roumanie")
    ),
    baltes: filterPravdaByTag("Baltes"),
    balkans: filterPravdaByTag("Balkans"),
    scandinavie: filterPravdaByTag("Scandinavie"),
    ukraine: filterPravdaByTag("Ukraine"),
    caucase: filterPravdaByTag("Caucase"),
    afrique: filterPravdaByTag("Afrique"),
    asie: filterPravdaByTag("Asie")
  };
}

// =============================================================================
// EXPORTS ET DISPONIBILITÉ GLOBALE
// =============================================================================

// Export pour Node.js / modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    pravdaDomains,
    pravdaNetworkMetadata,
    filterPravdaByTag,
    filterPravdaByRiskLevel,
    filterPravdaByCountry,
    getPravdaTags,
    getPravdaStats,
    getPravdaByRegion
  };
}

// Disponibilité globale pour le navigateur
if (typeof window !== 'undefined') {
  window.pravdaDomains = pravdaDomains;
  window.pravdaNetworkMetadata = pravdaNetworkMetadata;
  window.pravdaUtils = {
    filterByTag: filterPravdaByTag,
    filterByRiskLevel: filterPravdaByRiskLevel,
    filterByCountry: filterPravdaByCountry,
    getTags: getPravdaTags,
    getStats: getPravdaStats,
    getByRegion: getPravdaByRegion
  };
}

// Log de chargement
console.log(`Liste Pravda Network chargée: ${pravdaDomains.length} domaines identifiés`);
console.log("Note: Le réseau compte 140+ sous-domaines actifs sur news-pravda.com");
console.log("Pour la liste complète et mise à jour: https://github.com/CheckFirstHQ/pravda-network");
if (pravdaDomains.length > 0) {
  console.log("Statistiques Pravda Network:", getPravdaStats());
}

// =============================================================================
// NOTES IMPORTANTES
// =============================================================================

/**
 * CARACTÉRISTIQUES DU RÉSEAU PRAVDA:
 * 
 * 1. ÉVOLUTION EN TROIS PHASES:
 *    - Phase 1 (2011-2022): Crimea News et domaines locaux russes/ukrainiens
 *    - Phase 2 (2022): 41 sites ciblant les russophones en Ukraine (-news.ru)
 *    - Phase 3 (2023-2025): Expansion mondiale avec domaines pravda-XX.com puis XX.news-pravda.com
 * 
 * 2. INFRASTRUCTURE TECHNIQUE:
 *    - Opéré par TigerWeb (Crimée, Russie)
 *    - Serveurs hébergés en Russie
 *    - Traduction automatique multilingue
 *    - Publication automatisée massive
 * 
 * 3. IMPACT:
 *    - 3,7+ millions d'articles publiés
 *    - Présent sur Wikipedia (1,907 liens dans 44 langues)
 *    - 33% de taux de reproduction dans les LLMs (ChatGPT, Gemini, etc.)
 *    - Contenu cité sur X/Twitter via Community Notes
 * 
 * 4. MODUS OPERANDI:
 *    - Aucun contenu original
 *    - Réplication de médias d'État russes sanctionnés (RT, Sputnik, RIA)
 *    - Amplification de chaînes Telegram pro-Kremlin
 *    - Optimisation SEO pour algorithmes de recherche
 *    - "LLM grooming" pour polluer les données d'entraînement IA
 * 
 * 5. DONNÉES ACTUALISÉES:
 *    - Dataset mis à jour toutes les heures sur GitHub CheckFirst
 *    - Dashboard interactif disponible via DFRLab
 *    - Liste complète: https://github.com/CheckFirstHQ/pravda-network
 * 
 * AVERTISSEMENT: Cette liste représente un échantillon des domaines principaux.
 * Le réseau compte 140+ sous-domaines actifs. Pour une liste exhaustive et
 * mise à jour en temps réel, consultez le dépôt GitHub de CheckFirst.
 */