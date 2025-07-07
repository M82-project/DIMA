// Plugin DIMA - content.js - Version finale consolidée
// Détection de manipulation cognitive - M82 Project
// Version: 3.0 Refactored with ContentExtractor
// Note: All dependencies are loaded via manifest.json in correct order

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
