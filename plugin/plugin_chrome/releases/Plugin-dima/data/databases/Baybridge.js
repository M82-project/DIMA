// DIMA - Base de données de l'infrastructure BAYBRIDGE
// Opération d'influence chinoise ciblant des audiences étrangères via des sociétés de marketing digital
// Sources: Tadaweb & Paul Charon, Focus Report 2025
/**
 * OPÉRATION BAYBRIDGE
 * ===================
 * 
 * Description: Vaste écosystème d'influence informationnelle chinoise opéré depuis la région 
 * de Greater Bay Area (Guangdong). L'infrastructure technique combine des campagnes de 
 * marketing digital avec de la manipulation informationnelle ciblant des dizaines de pays.
 * 
 * Acteurs principaux:
 * - Shenzhen Haimai Yunxiang Media Co., Ltd. (深圳市海卖云享传媒有限公司)
 * - Shanghai Haixun Technology Co., Ltd (海讯社文化传播有限公司)
 * 
 * Caractéristiques:
 * - Création de centaines de sites d'information inauthentiques
 * - Diffusion de contenu aligné avec Pékin et Moscou
 * - Narratives contradictoires: "positive energy" chinoise + propagande pro-Kremlin
 * - Traductions de mauvaise qualité, absence de supervision éditoriale
 * - Inefficacité remarquable malgré une infrastructure technique sophistiquée
 * 
 * Date d'identification: 2025
 * Pays ciblés: USA, Europe, Asie, Amérique Latine, Afrique
 */

const baybridgeDomains = [
  
  // ===== ENTITÉS COMMERCIALES PRINCIPALES =====
  
  {
    domain: "haipress.com",
    matchType: "exact",
    reason: "Site commercial principal de Shanghai Haixun Technology Co. Ltd., proposant des services de distribution de contenu à l'international",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Marketing-Digital",
      "Sites-Commerciaux",
      "Haixun"
    ]
  },

  {
    domain: "hmedium.com",
    matchType: "exact",
    reason: "Site commercial principal de Haimai, proposant 'increase the value of your brand'. Interface client pour services de marketing",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Marketing-Digital",
      "Sites-Commerciaux",
      "Haimai"
    ]
  },

  {
    domain: "hmedium.net",
    matchType: "exact",
    reason: "Site commercial de Haimai hébergeant les offres commerciales détaillées (packages ciblant audiences étrangères)",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Marketing-Digital",
      "Sites-Commerciaux",
      "Haimai"
    ]
  },

  {
    domain: "haixunpress.com",
    matchType: "exact",
    reason: "Site commercial principal de Haixun. Lien d'infrastructure avec sihaimai.com (IP 47.91.170.222, jan-oct 2024)",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Marketing-Digital",
      "Sites-Commerciaux",
      "Haixun"
    ]
  },

  {
    domain: "sihaimai.com",
    matchType: "exact",
    reason: "Infrastructure de services d'hébergement et de dissémination liée à Haimai. Lien technique avec haixunpress.com",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Hébergement",
      "Haimai"
    ]
  },

  {
    domain: "aisugao.com",
    matchType: "exact",
    reason: "Plateforme de marketing de marque pilotée par IA de Haixun, offrant traduction automatique d'articles via LLMs natifs",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2024-04-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "LLM",
      "IA-Générative",
      "Haixun",
      "Infrastructure"
    ]
  },

  {
    domain: "ebuypress.com",
    matchType: "exact",
    reason: "Site de distribution de contenu (content provider) lié à Haixun. API payante disponible: api.haipress.com/api/media/resources",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Distribution-Contenu",
      "Haixun"
    ]
  },

  {
    domain: "globerelease.com",
    matchType: "exact",
    reason: "Premier site enregistré par Haimai, affichant contenu générique distribué sur de nombreux autres sites de l'écosystème",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Distribution-Contenu",
      "Haimai"
    ]
  },

  {
    domain: "shiworld.cn",
    matchType: "contains",
    reason: "Site d'hébergement lié à Haimai. Contient news.shiworld.cn hébergeant packages commerciaux",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Hébergement",
      "Haimai"
    ]
  },

  {
    domain: "mlzgb.cn",
    matchType: "exact",
    reason: "Site d'hébergement des packages commerciaux de Haimai (fichiers Excel, liens directs). 92% des packages Haimai hébergés ici",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Infrastructure",
      "Hébergement",
      "Haimai"
    ]
  },

  // ===== FOURNISSEURS DE CONTENU (CONTENT PROVIDERS) =====
  
  {
    domain: "timesnewswire.com",
    matchType: "exact",
    reason: "Principal fournisseur de contenu du réseau (13% des articles). Diffuse communiqués de presse + contenu propagande (CGTN, Global Times)",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Distribution-Contenu",
      "Propagande",
      "Positive-Energy"
    ]
  },

  {
    domain: "updatenews.info",
    matchType: "exact",
    reason: "PRINCIPAL fournisseur de contenu (77% des articles sur sites finaux). Diffuse massivement narratives pro-Kremlin + contenu chinois",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "critical",
    tags: [
      "BAYBRIDGE",
      "Russie",
      "Chine",
      "Distribution-Contenu",
      "Propagande-Pro-Kremlin",
      "Ukraine",
      "LLM-Intoxication"
    ]
  },

  {
    domain: "meijiedaka.com",
    matchType: "exact",
    reason: "Fournisseur de contenu identifié dans l'écosystème, alimentant sites finaux de Haimai",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Distribution-Contenu"
    ]
  },

  // ===== SITES FINAUX - FRANCE (Package "Propagande Politique") =====
  
  {
    domain: "alpsbiz.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Diffuse contenu pro-Kremlin + narratives chinoises contradictoires",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "rmtcityfr.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Traductions de mauvaise qualité, erreurs grammaticales multiples",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "provencedaily.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Amplifie narratives pro-Kremlin, cite TASS, RIA Novosti",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "louispress.org",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Usurpation d'identité (naming convention trompeur). Hébergé cluster FR",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Usurpation-Identité",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "friendlyparis.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France ('Paris Amical'). Fautes d'orthographe, images manquantes",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "eiffelpost.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Republie articles CGTN + contenu pro-Kremlin. Faible qualité éditoriale",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Positive-Energy",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "fr.wdpp.org",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Sous-domaine spécifique audience francophone",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "fr.euleader.org",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Version francophone de euleader.org",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Sites-UE",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "fftribune.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Naming convention mimant média légitime",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Usurpation-Identité",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "economyfr.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Focus thématique économie",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "froneplus.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Contenu synchronisé avec autres sites du réseau",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "frnewsfeed.com",
    matchType: "exact",
    reason: "Site final du package 'Propagande Politique' France. Publication synchronisée, architecture similaire Jeecg-Boot",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-France",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  // ===== SITES FINAUX - AUTRES PAYS EUROPÉENS =====
  
  {
    domain: "euleader.org",
    matchType: "exact",
    reason: "Site ciblant audience UE. Diffuse contenu BTS, actualités Shenzhen, narratives pro-Kremlin. Exemple: article BTS 27/05/2025",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-UE",
      "Propagande",
      "Anti-Ukraine"
    ]
  },

  {
    domain: "londonclup.com",
    matchType: "exact",
    reason: "Site package UK. Contenu en vietnamien par erreur (exemple page d'accueil 08/07/2025), images manquantes",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-UK",
      "Propagande"
    ]
  },

  // ===== SITES FINAUX - RUSSIE =====
  
  {
    domain: "findmoscow.com",
    matchType: "exact",
    reason: "Site ciblant audience russe ('Найти Москву'). Hébergé sur cluster serveur russe avec sites ciblant Russie",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-Russie",
      "Propagande"
    ]
  },

  {
    domain: "ekaterintech.com",
    matchType: "exact",
    reason: "Site ciblant audience russe. Hébergé IP 18.171.181.70 avec cluster sites RU. Lien avec louispress.org (même IP FR)",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Russie",
      "Sites-Russie",
      "Infrastructure"
    ]
  },

  // ===== SITES FINAUX - AUSTRALIE =====
  
  {
    domain: "capitalsydney.com",
    matchType: "exact",
    reason: "Site ciblant audience australienne ('Sydney News'). Naming convention usurpation identité",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Sites-Australie",
      "Usurpation-Identité"
    ]
  },

  // ===== EXEMPLES TYPOSQUATTING =====
  
  {
    domain: "dertagesspiegel.com",
    matchType: "exact",
    reason: "Typosquatting de 'Der Tagesspiegel' (journal allemand). Site identifié dans packages commerciaux",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Sites-Allemagne",
      "Usurpation-Identité",
      "Typosquatting"
    ]
  },

  {
    domain: "nrchandelsblad.com",
    matchType: "exact",
    reason: "Typosquatting de 'NRC Handelsblad' (journal néerlandais). Site identifié dans packages commerciaux",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Sites-Pays-Bas",
      "Usurpation-Identité",
      "Typosquatting"
    ]
  },

  {
    domain: "kanagawa-ken.com",
    matchType: "exact",
    reason: "Typosquatting ciblant audience japonaise. Site identifié dans packages commerciaux",
    source: "Tadaweb & Paul Charon - Focus BAYBRIDGE 2025",
    reportUrl: "https://www.tadaweb.com/hub/68e3e66e4f7350000150899b",
    identifiedDate: "2025-03-01",
    riskLevel: "high",
    tags: [
      "BAYBRIDGE",
      "Chine",
      "Sites-Japon",
      "Usurpation-Identité",
      "Typosquatting"
    ]
  }

];

// =============================================================================
// FONCTIONS UTILITAIRES
// =============================================================================

// Filtrer par tag
function filterBaybridgeByTag(tag) {
  return baybridgeDomains.filter(d => d.tags.includes(tag));
}

// Filtrer par niveau de risque
function filterBaybridgeByRiskLevel(level) {
  return baybridgeDomains.filter(d => d.riskLevel === level);
}

// Obtenir tous les tags uniques
function getBaybridgeTags() {
  const allTags = new Set();
  baybridgeDomains.forEach(d => {
    d.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

// Obtenir les statistiques
function getBaybridgeStats() {
  return {
    total: baybridgeDomains.length,
    critical: baybridgeDomains.filter(d => d.riskLevel === "critical").length,
    highRisk: baybridgeDomains.filter(d => d.riskLevel === "high").length,
    mediumRisk: baybridgeDomains.filter(d => d.riskLevel === "medium").length,
    lowRisk: baybridgeDomains.filter(d => d.riskLevel === "low").length,
    tags: getBaybridgeTags()
  };
}

// Obtenir sites par catégorie
function getBaybridgeByCategory() {
  return {
    infrastructure: filterBaybridgeByTag("Infrastructure"),
    contentProviders: filterBaybridgeByTag("Distribution-Contenu"),
    france: filterBaybridgeByTag("Sites-France"),
    russia: filterBaybridgeByTag("Sites-Russie"),
    uk: filterBaybridgeByTag("Sites-UK"),
    propaganda: filterBaybridgeByTag("Propagande"),
    typosquatting: filterBaybridgeByTag("Typosquatting")
  };
}

// =============================================================================
// EXPORTS ET DISPONIBILITÉ GLOBALE
// =============================================================================

// Export pour Node.js / modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    baybridgeDomains,
    filterBaybridgeByTag,
    filterBaybridgeByRiskLevel,
    getBaybridgeTags,
    getBaybridgeStats,
    getBaybridgeByCategory
  };
}

// Disponibilité globale pour le navigateur
if (typeof window !== 'undefined') {
  window.baybridgeDomains = baybridgeDomains;
  window.baybridgeUtils = {
    filterByTag: filterBaybridgeByTag,
    filterByRiskLevel: filterBaybridgeByRiskLevel,
    getTags: getBaybridgeTags,
    getStats: getBaybridgeStats,
    getByCategory: getBaybridgeByCategory
  };
}

// Log de chargement
console.log(`Liste BAYBRIDGE chargée: ${baybridgeDomains.length} domaines identifiés`);
if (baybridgeDomains.length > 0) {
  console.log("Statistiques BAYBRIDGE:", getBaybridgeStats());
  console.log("Catégories:", getBaybridgeByCategory());
}

// =============================================================================
// NOTES IMPORTANTES SUR L'OPÉRATION
// =============================================================================

/**
 * CONTEXTE GÉOPOLITIQUE:
 * 
 * Acteurs identifiés:
 * - Wu Yanni (吴燕妮): Chercheur SZAS, membre du Comité de propagande municipale de Shenzhen,
 *   directrice exécutive Haimai Yunxiang Media
 * - Zhu Haisong (朱海松): Expert en marketing, chercheur, PDG Haixun, liens avec le 
 *   Département de propagande du Guangdong
 * 
 * Caractéristiques techniques:
 * - Infrastructure partagée entre Haimai et Haixun (IP 47.91.170.222)
 * - 24% d'overlap dans les offres commerciales internationales (104 packages communs)
 * - Utilisation de Jeecg-Boot pour génération automatique de sites web
 * - API Haixun: api.haipress.com/api/media/resources
 * - Traduction IA via aisugao.com (LLMs natifs)
 * 
 * Pays principalement ciblés:
 * - USA (6% des packages, cible #1)
 * - Asie du Sud-Est (Corée du Sud, Inde, Vietnam, Thaïlande, Japon, Taiwan)
 * - Europe: UK (21 packages), Espagne (20), Italie (18), Portugal (17), France (15), Allemagne (15)
 * 
 * Narratives diffusées:
 * 1. Contenu chinois "positive energy" (< 5% du volume):
 *    - Republication CGTN, Global Times
 *    - Focus: harmony, win-win cooperation, innovation, développement durable
 *    - Vocabulaire récurrent: "innovation" (68%), "transformation" (54%), "leadership" (47%)
 * 
 * 2. Contenu pro-Kremlin (volume dominant):
 *    - Sources: TASS, RIA Novosti, RT, Tsargrad TV, Rambler.ru
 *    - Focus: guerre Ukraine, anti-OTAN, amplification Florian Philippot
 *    - Channels Telegram: Maria Zakharova, Alexey Pushkov
 *    - Similarités avec réseau Portal Kombat / Pravda
 * 
 * Inefficacité opérationnelle:
 * - Traductions automatiques de très mauvaise qualité
 * - Narratives contradictoires (Chine positive vs. Russie agressive)
 * - Aucune traction sur réseaux sociaux (SimilarWeb: pas de données)
 * - Système en boucle fermée (sites s'auto-citent)
 * - Erreurs techniques: encodage cyrillique raté (oct 2024 - fév 2025)
 * - Contenu vietnamien sur sites UK, images manquantes
 * 
 * Risque LLM:
 * - Infrastructure potentiellement utilisée pour "intoxiquer" les LLMs
 * - Contournement sanctions médias russes (RT, Sputnik) via "laundering machine"
 * - Aucune preuve directe d'assimilation par ChatGPT/Copilot/Gemini/DeepSeek (avril 2025)
 * 
 * Date pivot: 09 mars 2024
 * Apparition massive contenu pro-Kremlin sur updatenews.info (hors catégorie TimesNewsWire)
 * Hypothèse: appropriation infrastructure chinoise par acteurs russes
 * 
 * Connexion Portal Kombat:
 * - Similarités narratives et sources avec réseau "Pravda"
 * - Pas de lien technique formel établi
 * - Exemple: même citation Philippot sur updatenews.info (05/01/25) et 
 *   france.news-pravda.com (06/01/25)
 */