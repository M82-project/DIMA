// DIMA - Base de données d'opération Portal Kombat
// Basé sur le rapport VIGINUM de février 2024

/**
 * PORTAL KOMBAT
 * =============
 * 
 * Réseau structuré et coordonné de propagande pro-russe identifié par VIGINUM
 * 
 * Description:
 * Un réseau de 193 "portails d'information" numériques aux caractéristiques similaires,
 * diffusant des contenus pro-russes à destination d'audiences internationales.
 * 
 * Architecture:
 * - Écosystème "historique" (depuis 2013): Sites ciblant Russie et Ukraine
 * - Écosystème "-news.ru" (depuis 2022): Sites ciblant audiences russophones d'Ukraine
 * - Écosystème "pravda" (depuis 2023): Sites ciblant pays occidentaux
 * 
 * Source: Rapport VIGINUM - Février 2024
 */

const portalKombatDomains = [
  // ===== ÉCOSYSTÈME "PRAVDA" - CIBLANT PAYS OCCIDENTAUX =====
  {
    domain: "pravda-fr.com",
    matchType: "exact",
    reason: "Site de l'opération Portal Kombat ciblant la France, diffusant de la propagande pro-Kremlin et des narratifs anti-Ukraine",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "France",
      "Anti-Ukraine",
      "Pro-Kremlin",
      "Propagande",
      "LLM",
      "Automatisation-Massive"
    ]
  },
  {
    domain: "pravda-de.com",
    matchType: "exact",
    reason: "Site de l'opération Portal Kombat ciblant l'Allemagne, l'Autriche et la Suisse avec propagande pro-russe",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2023-02-22",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Allemagne",
      "Autriche",
      "Suisse",
      "Anti-Ukraine",
      "Pro-Kremlin",
      "Automatisation-Massive"
    ]
  },
  {
    domain: "pravda-pl.com",
    matchType: "exact",
    reason: "Site de l'opération Portal Kombat ciblant la Pologne avec des narratifs pro-Kremlin",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Pologne",
      "Anti-Ukraine",
      "Pro-Kremlin"
    ]
  },
  {
    domain: "pravda-es.com",
    matchType: "exact",
    reason: "Site de l'opération Portal Kombat ciblant l'Espagne avec propagande pro-russe",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Espagne",
      "Anti-Ukraine",
      "Pro-Kremlin"
    ]
  },
  {
    domain: "pravda-en.com",
    matchType: "exact",
    reason: "Site de l'opération Portal Kombat ciblant le Royaume-Uni et les États-Unis avec propagande pro-russe",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2023-06-24",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "UK",
      "USA",
      "Anti-Ukraine",
      "Pro-Kremlin"
    ]
  },

  // ===== ÉCOSYSTÈME "-NEWS.RU" - CIBLANT AUDIENCES RUSSOPHONES D'UKRAINE =====
  {
    domain: "kherson-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kherson (Ukraine), amplifiant le ressentiment pro-russe contre les autorités ukrainiennes",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kherson",
      "Territoires-Occupés",
      "Désinformation-Ciblée"
    ]
  },
  {
    domain: "mariupol-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Marioupol (Ukraine), zone stratégique occupée",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Marioupol",
      "Territoires-Occupés"
    ]
  },
  {
    domain: "news-kiev.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kiev avec propagande pro-russe et anti-gouvernement ukrainien",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kiev",
      "Anti-Gouvernement"
    ]
  },
  {
    domain: "donetsk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Donetsk, région stratégique du conflit russo-ukrainien",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Donetsk",
      "DNR",
      "Territoires-Occupés"
    ]
  },
  {
    domain: "lugansk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Louhansk, région stratégique du conflit",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Louhansk",
      "LNR",
      "Territoires-Occupés"
    ]
  },
  {
    domain: "lnr-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat pour la République populaire de Louhansk (LNR)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "LNR",
      "Territoires-Occupés"
    ]
  },
  {
    domain: "dnr-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat pour la République populaire de Donetsk (DNR)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "DNR",
      "Territoires-Occupés"
    ]
  },
  {
    domain: "news-kharkov.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kharkiv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kharkiv"
    ]
  },
  {
    domain: "news-odessa.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Odessa (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Odessa"
    ]
  },
  {
    domain: "dnepr-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Dnipro (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Dnipro"
    ]
  },
  {
    domain: "zp-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Zaporijjia (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Zaporijjia"
    ]
  },
  {
    domain: "cherkassy-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Cherkasy (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Cherkasy"
    ]
  },
  {
    domain: "poltava-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Poltava (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Poltava"
    ]
  },
  {
    domain: "vin-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Vinnytsia (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Vinnytsia"
    ]
  },
  {
    domain: "chernigov-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Tchernihiv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Tchernihiv"
    ]
  },
  {
    domain: "kirovograd-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kropyvnytskyi (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kropyvnytskyi"
    ]
  },
  {
    domain: "nikolaev-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Mykolaïv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Mykolaïv"
    ]
  },
  {
    domain: "sumy-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Sumy (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Sumy"
    ]
  },
  {
    domain: "zhitomir-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Jytomyr (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-03",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Jytomyr"
    ]
  },
  {
    domain: "berdyansk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Berdiansk (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Berdiansk"
    ]
  },
  {
    domain: "melitopol-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Melitopol (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Melitopol"
    ]
  },
  {
    domain: "lvov-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Lviv (Ukraine), créé en décembre 2022 pour étendre la couverture vers l'ouest",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Lviv"
    ]
  },
  {
    domain: "ternopol-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Ternopil (Ukraine), extension vers l'ouest",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Ternopil"
    ]
  },
  {
    domain: "tiraspol-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant la Transnistrie (Moldavie), région sécessionniste pro-russe",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-26",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Moldavie",
      "Transnistrie",
      "Séparatisme"
    ]
  },
  {
    domain: "alchevsk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Alchevsk dans la région de Louhansk",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Alchevsk",
      "LNR"
    ]
  },
  {
    domain: "gorlovka-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Horlivka dans la région de Donetsk",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Horlivka",
      "DNR"
    ]
  },
  {
    domain: "kramatorsk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kramatorsk (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kramatorsk"
    ]
  },
  {
    domain: "slavyansk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Sloviansk (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Sloviansk"
    ]
  },
  {
    domain: "news-makeevka.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Makiïvka dans la région de Donetsk",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Makiïvka",
      "DNR"
    ]
  },
  {
    domain: "chernovcy-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Tchernivtsi (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Tchernivtsi"
    ]
  },
  {
    domain: "if-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Ivano-Frankivsk (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Ivano-Frankivsk"
    ]
  },
  {
    domain: "rovno-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Rivne (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Rivne"
    ]
  },
  {
    domain: "volyn-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant la région de Volhynie (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Volhynie"
    ]
  },
  {
    domain: "khmelnitskiy-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Khmelnytskyi (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Khmelnytskyi"
    ]
  },
  {
    domain: "uzhgorod-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Oujhorod (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-12-17",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Oujhorod",
      "Transcarpatie"
    ]
  },
  {
    domain: "krivoy-rog-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kryvyï Rih (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kryvyï-Rih"
    ]
  },
  {
    domain: "dneprodzerzhinsknews.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kamianske (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kamianske"
    ]
  },
  {
    domain: "kremenchug-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Kremenchouk (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Kremenchouk"
    ]
  },
  {
    domain: "nikopol-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Nikopol (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Nikopol"
    ]
  },
  {
    domain: "pavlograd-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Pavlohrad (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Ukraine",
      "Pavlohrad"
    ]
  },
  {
    domain: "bc-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat (identification à confirmer)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-04-18",
    riskLevel: "medium",
    tags: [
      "Portal_Kombat",
      "Russie"
    ]
  },

  // ===== ÉCOSYSTÈME "HISTORIQUE" - SITES RUSSES (sélection des plus actifs) =====
  {
    domain: "piter-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Saint-Pétersbourg, diffuse contenus pro-FSB et pro-Kremlin",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-03-07",
    riskLevel: "medium",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Saint-Pétersbourg",
      "Infrastructure"
    ]
  },
  {
    domain: "moskva-news.com",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Moscou (inactif)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-03-09",
    riskLevel: "low",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Moscou",
      "Infrastructure",
      "Inactif"
    ]
  },
  {
    domain: "msk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Moscou",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Moscou",
      "Infrastructure"
    ]
  },
  {
    domain: "crimea-news.com",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la Crimée annexée",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-11-05",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Crimée",
      "Annexion",
      "Infrastructure"
    ]
  },
  {
    domain: "sevastopol-news.com",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Sébastopol (Crimée)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2015-06-04",
    riskLevel: "high",
    tags: [
      "Portal_Kombat",
      "Russie",
      "Crimée",
      "Sébastopol",
      "Infrastructure"
    ]
  },

  // ===== ÉCOSYSTÈME "HISTORIQUE" - SITES RUSSES (suite) =====
  {
    domain: "barnaul-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Barnaoul (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Barnaoul", "Infrastructure"]
  },
  {
    domain: "chelyabinsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tcheliabinsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tcheliabinsk", "Infrastructure"]
  },
  {
    domain: "irkutsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Irkoutsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Irkoutsk", "Infrastructure"]
  },
  {
    domain: "izhevsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Ijevsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ijevsk", "Infrastructure"]
  },
  {
    domain: "kazan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kazan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kazan", "Infrastructure"]
  },
  {
    domain: "khabarovsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Khabarovsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Khabarovsk", "Infrastructure"]
  },
  {
    domain: "krasnodar-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Krasnodar (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Krasnodar", "Infrastructure"]
  },
  {
    domain: "krasnoyarsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Krasnoïarsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Krasnoïarsk", "Infrastructure"]
  },
  {
    domain: "nn-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Nijni Novgorod (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Nijni-Novgorod", "Infrastructure"]
  },
  {
    domain: "novosibirsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Novossibirsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Novossibirsk", "Infrastructure"]
  },
  {
    domain: "omsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Omsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Omsk", "Infrastructure"]
  },
  {
    domain: "perm-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Perm (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Perm", "Infrastructure"]
  },
  {
    domain: "rostov-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Rostov-sur-le-Don (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Rostov-sur-le-Don", "Infrastructure"]
  },
  {
    domain: "samara-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Samara (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Samara", "Infrastructure"]
  },
  {
    domain: "saratov-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Saratov (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Saratov", "Infrastructure"]
  },
  {
    domain: "sochi-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Sotchi (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Sotchi", "Infrastructure"]
  },
  {
    domain: "tolyatti-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Togliatti (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Togliatti", "Infrastructure"]
  },
  {
    domain: "tyumen-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tioumen (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tioumen", "Infrastructure"]
  },
  {
    domain: "ufa-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Oufa (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Oufa", "Infrastructure"]
  },
  {
    domain: "ulyanovsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Oulianovsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Oulianovsk", "Infrastructure"]
  },
  {
    domain: "ural-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la région de l'Oural (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Oural", "Infrastructure"]
  },
  {
    domain: "vladivostok-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Vladivostok (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Vladivostok", "Infrastructure"]
  },
  {
    domain: "volgograd-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Volgograd (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Volgograd", "Infrastructure"]
  },
  {
    domain: "voronezh-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Voronej (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Voronej", "Infrastructure"]
  },
  {
    domain: "yaroslavl-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Iaroslavl (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-12-02",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Iaroslavl", "Infrastructure"]
  },
  {
    domain: "astrakhan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Astrakhan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Astrakhan", "Infrastructure"]
  },
  {
    domain: "arkhangelsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Arkhangelsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Arkhangelsk", "Infrastructure"]
  },
  {
    domain: "belgorod-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Belgorod (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Belgorod", "Infrastructure"]
  },
  {
    domain: "vladimir-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Vladimir (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Vladimir", "Infrastructure"]
  },
  {
    domain: "vologda-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Vologda (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Vologda", "Infrastructure"]
  },
  {
    domain: "dagestan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant le Daghestan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Daghestan", "Infrastructure"]
  },
  {
    domain: "ivanovo-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Ivanovo (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ivanovo", "Infrastructure"]
  },
  {
    domain: "kaliningrad-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kaliningrad (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kaliningrad", "Infrastructure"]
  },
  {
    domain: "kirov-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kirov (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-04-09",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kirov", "Infrastructure"]
  },
  {
    domain: "murmansk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Mourmansk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Mourmansk", "Infrastructure"]
  },
  {
    domain: "kemerovo-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kemerovo (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kemerovo", "Infrastructure"]
  },
  {
    domain: "penza-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Penza (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Penza", "Infrastructure"]
  },
  {
    domain: "orenburg-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Orenbourg (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Orenbourg", "Infrastructure"]
  },
  {
    domain: "orel-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Orel (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Orel", "Infrastructure"]
  },
  {
    domain: "stavropol-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Stavropol (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Stavropol", "Infrastructure"]
  },
  {
    domain: "smolensk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Smolensk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Smolensk", "Infrastructure"]
  },
  {
    domain: "tomsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tomsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tomsk", "Infrastructure"]
  },
  {
    domain: "tver-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tver (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tver", "Infrastructure"]
  },
  {
    domain: "ryazan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Riazan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Riazan", "Infrastructure"]
  },
  {
    domain: "tula-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Toula (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Toula", "Infrastructure"]
  },
  {
    domain: "chita-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tchita (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tchita", "Infrastructure"]
  },
  {
    domain: "kursk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Koursk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Koursk", "Infrastructure"]
  },
  {
    domain: "lipetsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Lipetsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Lipetsk", "Infrastructure"]
  },
  {
    domain: "saransk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Saransk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Saransk", "Infrastructure"]
  },
  {
    domain: "kostroma-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kostroma (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kostroma", "Infrastructure"]
  },
  {
    domain: "yamal-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la région de Iamal (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Iamal", "Infrastructure"]
  },
  {
    domain: "tambov-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tambov (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tambov", "Infrastructure"]
  },
  {
    domain: "kaluga-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kalouga (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kalouga", "Infrastructure"]
  },
  {
    domain: "sakhalin-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Sakhaline (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Sakhaline", "Infrastructure"]
  },
  {
    domain: "cheb-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tcheboksary (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tcheboksary", "Infrastructure"]
  },
  {
    domain: "ugra-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Khantys-Mansiïsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Khantys-Mansiïsk", "Infrastructure"]
  },
  {
    domain: "yakutsk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Iakoutsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Iakoutsk", "Infrastructure"]
  },
  {
    domain: "kamchatka-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant le Kamtchatka (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kamtchatka", "Infrastructure"]
  },
  {
    domain: "karelia-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la Carélie (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Carélie", "Infrastructure"]
  },
  {
    domain: "komi-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la République des Komis (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Komis", "Infrastructure"]
  },
  {
    domain: "udmurt-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant l'Oudmourtie (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Oudmourtie", "Infrastructure"]
  },
  {
    domain: "kalmykia-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la Kalmoukie (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kalmoukie", "Infrastructure"]
  },
  {
    domain: "tuva-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la Touva (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Touva", "Infrastructure"]
  },
  {
    domain: "baikal-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la région du Baïkal (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-29",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Baïkal", "Infrastructure"]
  },
  {
    domain: "pskov-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Pskov (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-11-30",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Pskov", "Infrastructure"]
  },
  {
    domain: "altay-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant l'Altaï (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Altaï", "Infrastructure"]
  },
  {
    domain: "ingushetiya-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant l'Ingouchie (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ingouchie", "Infrastructure"]
  },
  {
    domain: "adygheya-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant l'Adyguée (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Adyguée", "Infrastructure"]
  },
  {
    domain: "nalchik-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Naltchik (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Naltchik", "Infrastructure"]
  },
  {
    domain: "mariel-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la République des Maris (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Maris", "Infrastructure"]
  },
  {
    domain: "cherkessk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tcherkessk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tcherkessk", "Infrastructure"]
  },
  {
    domain: "vladikavkaz-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Vladikavkaz (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Vladikavkaz", "Infrastructure"]
  },
  {
    domain: "abakan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Abakan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Abakan", "Infrastructure"]
  },
  {
    domain: "grozny-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Grozny (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Grozny", "Tchétchénie", "Infrastructure"]
  },
  {
    domain: "amur-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la région de l'Amour (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Amour", "Infrastructure"]
  },
  {
    domain: "bryansk-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Briansk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Briansk", "Infrastructure"]
  },
  {
    domain: "kurgan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kourgan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Kourgan", "Infrastructure"]
  },
  {
    domain: "birobidzhan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Birobidjan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Birobidjan", "Infrastructure"]
  },
  {
    domain: "nao-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant le district autonome de Nénétsie (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Nénétsie", "Infrastructure"]
  },
  {
    domain: "chukotka-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant la Tchoukotka (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Tchoukotka", "Infrastructure"]
  },
  {
    domain: "novgorod-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Novgorod (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2018-12-26",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Novgorod", "Infrastructure"]
  },
  {
    domain: "magadan-news.net",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Magadan (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2019-01-10",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Magadan", "Infrastructure"]
  },
  {
    domain: "norilsk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Norilsk (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-11-18",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Norilsk"]
  },
  {
    domain: "nabchelny-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Naberejnye Tchelny (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-11-22",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Naberejnye-Tchelny"]
  },
  {
    domain: "nk-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat (site russe, identification précise à confirmer)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-11-22",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie"]
  },
  {
    domain: "tagil-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Nijni Taguil (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-11-22",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Nijni-Taguil"]
  },
  {
    domain: "news-surgut.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Sourgout (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2022-11-22",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Sourgout"]
  },
  {
    domain: "news-balashiha.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Balachikha (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2023-07-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Balachikha"]
  },
  {
    domain: "volzhskiy-news.ru",
    matchType: "exact",
    reason: "Portail Portal Kombat ciblant Voljski (Russie)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2023-07-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Voljski"]
  },

  // ===== ÉCOSYSTÈME "HISTORIQUE" - SITES UKRAINIENS (.ua) =====
  {
    domain: "lenta.kharkiv.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kharkiv (Ukraine) - extension .ua",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-03-07",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Kharkiv", "Infrastructure"]
  },
  {
    domain: "uanews.kharkiv.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kharkiv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-03-18",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Kharkiv", "Infrastructure"]
  },
  {
    domain: "topnews.kiev.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kiev (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-03-24",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Kiev", "Infrastructure"]
  },
  {
    domain: "topnews.odessa.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Odessa (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-03-30",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Odessa", "Infrastructure"]
  },
  {
    domain: "uanews.odessa.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Odessa (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-03-30",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Odessa", "Infrastructure"]
  },
  {
    domain: "dneprnews.com.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Dnipro (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-04-01",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Dnipro", "Infrastructure"]
  },
  {
    domain: "uanews.dp.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Dnipro (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-04-01",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Dnipro", "Infrastructure"]
  },
  {
    domain: "topnews.zp.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Zaporijjia (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-04-01",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Zaporijjia", "Infrastructure"]
  },
  {
    domain: "uanews.zp.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Zaporijjia (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-04-01",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Zaporijjia", "Infrastructure"]
  },
  {
    domain: "lenta.te.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Ternopil (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-04-08",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Ternopil", "Infrastructure"]
  },
  {
    domain: "lenta.lviv.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Lviv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-04-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Lviv", "Infrastructure"]
  },
  {
    domain: "uanews.donetsk.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Donetsk (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Donetsk", "Infrastructure"]
  },
  {
    domain: "uanews.lviv.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Lviv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Lviv", "Infrastructure"]
  },
  {
    domain: "topnews.volyn.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Volhynie (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Volhynie", "Infrastructure"]
  },
  {
    domain: "topnews.cv.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tchernivtsi (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Tchernivtsi", "Infrastructure"]
  },
  {
    domain: "uanews.te.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Ternopil (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Ternopil", "Infrastructure"]
  },
  {
    domain: "topnews.zt.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Jytomyr (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Jytomyr", "Infrastructure"]
  },
  {
    domain: "nikolaevnews.com.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Mykolaïv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Mykolaïv", "Infrastructure"]
  },
  {
    domain: "topnews.pl.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Poltava (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Poltava", "Infrastructure"]
  },
  {
    domain: "topnews.rv.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Rivne (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Rivne", "Infrastructure"]
  },
  {
    domain: "topnews.cn.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tchernihiv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-11",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Tchernihiv", "Infrastructure"]
  },
  {
    domain: "topnews.ck.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Tcherkasy (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-12",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Tcherkasy", "Infrastructure"]
  },
  {
    domain: "topnews.kr.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kropyvnytskyi (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-12",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Kropyvnytskyi", "Infrastructure"]
  },
  {
    domain: "topnews.vn.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Vinnytsia (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2013-05-14",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Vinnytsia", "Infrastructure"]
  },
  {
    domain: "novyny.kr.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kropyvnytskyi (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2019-01-19",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Kropyvnytskyi", "Infrastructure"]
  },
  {
    domain: "novyny.zt.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Jytomyr (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2019-01-19",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Jytomyr", "Infrastructure"]
  },
  {
    domain: "gazeta.kharkiv.ua",
    matchType: "exact",
    reason: "Portail Portal Kombat historique ciblant Kharkiv (Ukraine)",
    source: "VIGINUM (SGDSN)",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf",
    identifiedDate: "2019-01-19",
    riskLevel: "medium",
    tags: ["Portal_Kombat", "Russie", "Ukraine", "Kharkiv", "Infrastructure"]
  }

];

// Note: Cette liste contient maintenant 193 domaines identifiés par VIGINUM
// dans le rapport de février 2024, répartis en trois écosystèmes distincts.

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

// Filtrer par tag
function filterPortalKombatByTag(tag) {
  return portalKombatDomains.filter(d => d.tags.includes(tag));
}

// Filtrer par niveau de risque
function filterPortalKombatByRiskLevel(level) {
  return portalKombatDomains.filter(d => d.riskLevel === level);
}

// Filtrer par écosystème
function filterPortalKombatByEcosystem(ecosystem) {
  const ecosystemPatterns = {
    "pravda": d => d.domain.startsWith("pravda-"),
    "news.ru": d => d.domain.endsWith("-news.ru") || d.domain.endsWith("news.ru"),
    "historique": d => !d.domain.startsWith("pravda-") && !d.domain.endsWith("-news.ru") && !d.domain.endsWith("news.ru")
  };
  
  const pattern = ecosystemPatterns[ecosystem];
  return pattern ? portalKombatDomains.filter(pattern) : [];
}

// Filtrer par pays ciblé
function filterPortalKombatByTargetCountry(country) {
  return portalKombatDomains.filter(d => 
    d.tags.some(tag => tag.toLowerCase().includes(country.toLowerCase()))
  );
}

// Obtenir tous les tags uniques
function getPortalKombatTags() {
  const allTags = new Set();
  portalKombatDomains.forEach(d => {
    d.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

// Obtenir les statistiques
function getPortalKombatStats() {
  const stats = {
    total: portalKombatDomains.length,
    highRisk: portalKombatDomains.filter(d => d.riskLevel === "high").length,
    mediumRisk: portalKombatDomains.filter(d => d.riskLevel === "medium").length,
    lowRisk: portalKombatDomains.filter(d => d.riskLevel === "low").length,
    byEcosystem: {
      pravda: filterPortalKombatByEcosystem("pravda").length,
      newsRu: filterPortalKombatByEcosystem("news.ru").length,
      historique: filterPortalKombatByEcosystem("historique").length
    },
    tags: getPortalKombatTags()
  };
  
  return stats;
}

// =============================================================================
// EXPORTS ET DISPONIBILITÉ GLOBALE
// =============================================================================

// Export pour Node.js / modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    portalKombatDomains,
    filterPortalKombatByTag,
    filterPortalKombatByRiskLevel,
    filterPortalKombatByEcosystem,
    filterPortalKombatByTargetCountry,
    getPortalKombatTags,
    getPortalKombatStats
  };
}

// Disponibilité globale pour le navigateur
if (typeof window !== 'undefined') {
  window.portalKombatDomains = portalKombatDomains;
  window.portalKombatUtils = {
    filterByTag: filterPortalKombatByTag,
    filterByRiskLevel: filterPortalKombatByRiskLevel,
    filterByEcosystem: filterPortalKombatByEcosystem,
    filterByTargetCountry: filterPortalKombatByTargetCountry,
    getTags: getPortalKombatTags,
    getStats: getPortalKombatStats
  };
}

// Log de chargement
console.log(`Liste Portal Kombat chargée: ${portalKombatDomains.length} domaines identifiés`);
if (portalKombatDomains.length > 0) {
  const stats = getPortalKombatStats();
  console.log("Statistiques Portal Kombat:", stats);
  console.log(`  - Écosystème "pravda": ${stats.byEcosystem.pravda} sites`);
  console.log(`  - Écosystème "-news.ru": ${stats.byEcosystem.newsRu} sites`);
  console.log(`  - Écosystème "historique": ${stats.byEcosystem.historique} sites`);
}

// =============================================================================
// INFORMATIONS TECHNIQUES ADDITIONNELLES
// =============================================================================

/**
 * CARACTÉRISTIQUES TECHNIQUES DU RÉSEAU (source: rapport VIGINUM)
 * 
 * Infrastructure:
 * - Système autonome: AS49352 (Reg.ru)
 * - Adresses IP partagées (ex: 178.21.15.*)
 * - Favicon identique: MurmurHash3 -200225920
 * - E-Tag caractéristique: 640ba6a8-d9c
 * 
 * Modes opératoires:
 * - Automatisation massive des publications (jusqu'à 1734 articles/jour)
 * - Optimisation SEO pour mots-clés de "longue traîne"
 * - Traduction automatique (erreurs typiques RU → FR/EN/DE/ES/PL)
 * - Publication 24/7 avec baisse entre 1h-6h
 * - Moyenne de 9 publications/heure sur Telegram
 * 
 * Sources principales:
 * - Chaînes Telegram pro-russes
 * - Agences de presse russes (TASS, RIA Novosti, Izvestia)
 * - Sites officiels russes (crimea.gov.ru, etc.)
 * 
 * Narratifs diffusés:
 * - Légitimation de "l'opération militaire spéciale"
 * - Dénigrement de l'Ukraine et de ses dirigeants
 * - Critique de "l'Occident collectif"
 * - Promotion du FSB et services de sécurité russes
 * - Polarisation du débat public numérique
 */