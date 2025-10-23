// DIMA - Template pour nouvelle base de données d'opération
// REMPLACEZ "OPERATION_NAME" par le nom de votre opération (ex: Doppelganger, Portal_Kombat, etc.)

/**
 * INSTRUCTIONS D'UTILISATION
 * ==========================
 * 
 * 1. Copiez ce fichier et renommez-le (ex: Doppelganger.js)
 * 2. Remplacez tous les "OPERATION_NAME" par le nom de l'opération
 * 3. Remplissez les domaines dans le tableau
 * 4. Chargez ce fichier AVANT suspiciousSites.js dans votre HTML
 * 
 * EXEMPLE:
 * <script src="data/Copycop.js"></script>
 * <script src="data/Doppelganger.js"></script>
 * <script src="data/suspiciousSites.js"></script>
 */

// Nom de la variable globale (à adapter selon votre opération)
// Exemples:
// - copycopDomains (déjà existant)
// - doppelgangerDomains
// - portalKombatDomains
// - yourOperationDomains

const OPERATION_NAMEDomains = [
  // ===== EXEMPLE D'ENTRÉE =====
  {
    domain: "example-fake-news.com",
    matchType: "exact", // "exact", "contains", ou "pattern"
    reason: "Site identifié dans l'opération [NOM], diffusant de la désinformation ciblée",
    source: "Nom de l'organisation source (ex: EU DisinfoLab, DFRLab, etc.)",
    reportUrl: "https://lien-vers-le-rapport-complet.com",
    identifiedDate: "2025-01-15", // Format: YYYY-MM-DD
    riskLevel: "high", // "high", "medium", ou "low"
    tags: [
      "OPERATION_NAME", // Tag obligatoire : nom de l'opération
      "Russie", // Origine géographique si connue
      "USA", // Pays ciblé
      "Anti-Ukraine", // Thématique
      "Élections" // Type de campagne
    ]
  },

  // ===== AJOUTEZ VOS DOMAINES ICI =====
  
  /*
  // Template à copier pour chaque nouveau domaine:
  {
    domain: "votre-domaine.com",
    matchType: "exact",
    reason: "Description précise de la raison",
    source: "Organisation source",
    reportUrl: "https://...",
    identifiedDate: "YYYY-MM-DD",
    riskLevel: "high|medium|low",
    tags: ["OPERATION_NAME", "tag1", "tag2"]
  },
  */

];

// =============================================================================
// FONCTIONS UTILITAIRES (OPTIONNELLES)
// =============================================================================

/**
 * Ces fonctions sont optionnelles mais recommandées pour faciliter
 * l'utilisation de votre base de données indépendamment du gestionnaire principal
 */

// Filtrer par tag
function filterOPERATION_NAMEByTag(tag) {
  return OPERATION_NAMEDomains.filter(d => d.tags.includes(tag));
}

// Filtrer par niveau de risque
function filterOPERATION_NAMEByRiskLevel(level) {
  return OPERATION_NAMEDomains.filter(d => d.riskLevel === level);
}

// Obtenir tous les tags uniques
function getOPERATION_NAMETags() {
  const allTags = new Set();
  OPERATION_NAMEDomains.forEach(d => {
    d.tags.forEach(tag => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

// Obtenir les statistiques
function getOPERATION_NAMEStats() {
  return {
    total: OPERATION_NAMEDomains.length,
    highRisk: OPERATION_NAMEDomains.filter(d => d.riskLevel === "high").length,
    mediumRisk: OPERATION_NAMEDomains.filter(d => d.riskLevel === "medium").length,
    lowRisk: OPERATION_NAMEDomains.filter(d => d.riskLevel === "low").length,
    tags: getOPERATION_NAMETags()
  };
}

// =============================================================================
// EXPORTS ET DISPONIBILITÉ GLOBALE
// =============================================================================

// Export pour Node.js / modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    OPERATION_NAMEDomains,
    filterOPERATION_NAMEByTag,
    filterOPERATION_NAMEByRiskLevel,
    getOPERATION_NAMETags,
    getOPERATION_NAMEStats
  };
}

// Disponibilité globale pour le navigateur
if (typeof window !== 'undefined') {
  window.OPERATION_NAMEDomains = OPERATION_NAMEDomains;
  window.OPERATION_NAMEUtils = {
    filterByTag: filterOPERATION_NAMEByTag,
    filterByRiskLevel: filterOPERATION_NAMEByRiskLevel,
    getTags: getOPERATION_NAMETags,
    getStats: getOPERATION_NAMEStats
  };
}

// Log de chargement
console.log(`Liste OPERATION_NAME chargée: ${OPERATION_NAMEDomains.length} domaines identifiés`);
if (OPERATION_NAMEDomains.length > 0) {
  console.log("Statistiques OPERATION_NAME:", getOPERATION_NAMEStats());
}

// =============================================================================
// GUIDE DES TAGS RECOMMANDÉS
// =============================================================================

/**
 * TAGS OBLIGATOIRES:
 * - Le nom de votre opération (ex: "Doppelganger", "Portal_Kombat")
 * 
 * TAGS GÉOGRAPHIQUES (origine):
 * - Russie, Chine, Iran, Corée_du_Nord, etc.
 * 
 * TAGS GÉOGRAPHIQUES (cible):
 * - USA, France, Canada, UK, Allemagne, Ukraine, etc.
 * - Sites-US, Sites-France, Sites-Canada (pour collections de sites locaux)
 * 
 * TAGS THÉMATIQUES:
 * - Anti-Ukraine
 * - Élections
 * - COVID-19
 * - Climat
 * - Immigration
 * - Santé
 * 
 * TAGS TECHNIQUES:
 * - LLM (contenu généré par IA)
 * - Deepfake
 * - Usurpation-Identité
 * - Bot-Network
 * - Infrastructure
 * 
 * TAGS DE MÉTHODE:
 * - Désinformation-Ciblée
 * - Amplification-Artificielle
 * - Multi-Langues
 * - Coordination-Cross-Platform
 */