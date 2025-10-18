// Plugin DIMA - content.js - Version  consolidée
// Détection de manipulation cognitive - M82 Project
// Version: 3.0 Refactored with ContentExtractor
// Note: All dependencies are loaded via manifest.json in correct order


// ============================================================================
// PARTIE 1: DÉTECTION DE SITES SUSPECTS (NOUVEAU)
// ============================================================================

/**
 * Vérifie si le site actuel est dans la liste des sites suspects
 * Cette fonction est fournie par suspiciousSitesManager.js
 * et fonctionne automatiquement dès le chargement de la page
 */
function checkCurrentSiteInSuspiciousList() {
  const currentUrl = window.location.href;
  
  // Utiliser la fonction fournie par suspiciousSitesManager.js
  const result = checkSuspiciousSite(currentUrl);
  
  if (result.isSuspicious) {
    console.log('⚠️ DIMA: Site suspect détecté!');
    console.log('Source:', result.siteInfo.source);
    console.log('Raison:', result.siteInfo.reason);
    console.log('Niveau de risque:', result.siteInfo.riskLevel);
    
    // Afficher une alerte visuelle
    showSuspiciousSiteAlert(result);
  }
}

/**
 * Affiche une alerte pour un site suspect
 */
function showSuspiciousSiteAlert(result) {
  // Créer un bandeau d'alerte en haut de la page
  const alertBanner = document.createElement('div');
  alertBanner.id = 'dima-suspicious-site-alert';
  alertBanner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, ${result.riskConfig.color}, ${result.riskConfig.color}dd);
    color: white;
    padding: 15px 20px;
    z-index: 999999;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation: slideDown 0.5s ease-out;
  `;

  alertBanner.innerHTML = `
    <div style="display: flex; align-items: center; gap: 15px; flex: 1;">
      <span style="font-size: 24px;">${result.riskConfig.icon}</span>
      <div>
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">
          ${result.riskConfig.label} - ${result.siteInfo.source}
        </div>
        <div style="font-size: 14px; opacity: 0.95;">
          ${result.siteInfo.reason}
        </div>
        <a href="${result.siteInfo.reportUrl}" target="_blank" 
           style="color: white; text-decoration: underline; font-size: 13px; margin-top: 5px; display: inline-block;">
          → Consulter le rapport source
        </a>
      </div>
    </div>
    <button id="dima-close-alert" style="
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      color: white;
      padding: 8px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.3s;
    ">
      ✕ Fermer
    </button>
  `;

  // Animation CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    #dima-close-alert:hover {
      background: rgba(255,255,255,0.3) !important;
    }
  `;
  document.head.appendChild(style);

  // Ajouter au body
  document.body.insertBefore(alertBanner, document.body.firstChild);

  // Gérer la fermeture
  document.getElementById('dima-close-alert').addEventListener('click', () => {
    alertBanner.style.animation = 'slideDown 0.3s ease-out reverse';
    setTimeout(() => alertBanner.remove(), 300);
  });

  // Ajuster le padding du body pour ne pas cacher le contenu
  document.body.style.paddingTop = `${alertBanner.offsetHeight}px`;
}


// ============================================================================
// PARTIE 2: ANALYSE DIMA du site visité
// ============================================================================

// ===== CLASSE PRINCIPALE DIMA =====
class DIMAAnalyzer {
  constructor() {
    this.analysisResults = null;
    this.cache = new Map();
    this.settings = {
      maxContentLength: 5000,
      minKeywordLength: 3,
      analysisDelay: 2000,
      debugMode: false,
      enhancedKeywords: true,
    }; // Initialize ContentExtractor with settings
    this.contentExtractor = new window.ContentExtractor(this.settings);
    this.pageType = this.contentExtractor.detectPageType();

    // Initialize TechniqueAnalyzer with dependencies
    this.techniqueAnalyzer = new window.TechniqueAnalyzer(
      this.settings,
      window.DIMA_ENHANCED_KEYWORDS,
      window.CONTEXT_PATTERNS,
      window.DIMA_TECHNIQUES,
      this.pageType
    );

    // Initialize UIManager
    this.uiManager = new window.UIManager(this.settings);
    this.uiManager.setPageType(this.pageType);

    this.init();
  }

  init() {
    this.log("Initialisation DIMA avec mots-clés améliorés...");

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.delayedInit();
      });
    } else {
      this.delayedInit();
    }
  }

  delayedInit() {
    setTimeout(() => {
      try {
        this.analyzeCurrentPage();
      } catch (error) {
        console.error("DIMA: Erreur lors de l'analyse:", error);
      }
    }, this.settings.analysisDelay);
  }

  log(message, data = null) {
    if (this.settings.debugMode) {
      console.log(`DIMA: ${message}`, data || "");
    }
  }

  analyzeCurrentPage() {
    try {
      this.log("Analyse de la page...");

      const cacheKey = window.location.href + document.title;
      if (this.cache.has(cacheKey)) {
        this.analysisResults = this.cache.get(cacheKey);
        this.uiManager.createButton(this.analysisResults);
        return;
      }

      const title = this.contentExtractor.extractTitle();
      const content = this.contentExtractor.extractContent();

      this.log("Titre extrait:", title);
      this.log("Contenu extrait:", `${content.length} caractères`);

      this.analysisResults = this.techniqueAnalyzer.performAnalysis(
        title,
        content
      );
      this.cache.set(cacheKey, this.analysisResults);

      this.log("Analyse terminée, score:", this.analysisResults.globalScore);
      this.uiManager.createButton(this.analysisResults);
    } catch (error) {
      console.error("DIMA: Erreur dans analyzeCurrentPage:", error);
    }
  }
}

// ===== INITIALISATION ET STYLES =====

// CSS pour les animations
const style = document.createElement("style");
style.textContent = `
    @keyframes dimaFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    
    #dima-btn {
        animation: dimaFadeIn 0.5s ease-out;
    }
`;
document.head.appendChild(style);

// Initialisation sécurisée avec gestion d'erreurs améliorée
console.log("DIMA: Script chargé - Version complète avec mots-clés améliorés");

// Vérifier que toutes les dépendances sont chargées
function checkDependencies() {
  return (
    window.DIMA_TECHNIQUES &&
    window.DIMA_ENHANCED_KEYWORDS &&
    window.CONTEXT_PATTERNS &&
    window.ContentExtractor &&
    window.TechniqueAnalyzer &&
    window.UIManager
  );
}

// Initialiser avec retry si nécessaire
function initializeDIMA() {
  if (!checkDependencies()) {
    console.log("DIMA: Attente du chargement des dépendances...");
    setTimeout(initializeDIMA, 100);
    return;
  }

  try {
    const analyzer = new DIMAAnalyzer();
    console.log(
      `DIMA: Analyseur initialisé pour page de type: ${analyzer.pageType}`
    );
  } catch (error) {
    console.error("DIMA: Erreur d'initialisation critique:", error);
  }
}

// Démarrer l'initialisation
initializeDIMA();
