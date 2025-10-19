// DIMA - Gestionnaire Central de Sites Suspects
// Ce fichier charge et agrège toutes les bases de données de domaines suspects

/**
 * Gestionnaire centralisé des sites suspects
 * Charge automatiquement toutes les bases de données disponibles
 * et fournit une API unifiée pour vérifier les sites
 */
class SuspiciousSitesManager {
  constructor() {
    this.sources = new Map();
    this.allSites = [];
    this.stats = {
      totalSites: 0,
      byRiskLevel: { high: 0, medium: 0, low: 0 },
      bySources: {},
      byTags: {}
    };
    
    this.init();
  }

  /**
   * Initialise le gestionnaire en chargeant toutes les sources disponibles
   */
  init() {
    console.log('🛡️ DIMA: Initialisation du gestionnaire de sites suspects...');
    
    // Détecter et charger les sources disponibles
    this.detectAndLoadSources();
    
    // Agréger tous les sites
    this.aggregateAllSites();
    
    // Calculer les statistiques
    this.calculateStats();
    
    console.log(`✅ DIMA: ${this.allSites.length} sites suspects chargés depuis ${this.sources.size} source(s)`);
    this.logStats();
  }

  /**
   * Détecte et charge automatiquement toutes les sources disponibles
   */
  detectAndLoadSources() {
    // Source 1: CopyCop (Recorded Future)
    if (typeof copycopDomains !== 'undefined' && Array.isArray(copycopDomains)) {
      this.registerSource('CopyCop', copycopDomains, {
        name: 'Opération CopyCop',
        description: 'Réseau russe de sites fictifs et de désinformation',
        organization: 'Recorded Future - Insikt Group',
        reportUrl: 'https://www.recordedfuture.com/research/cta-ru-2025-0917',
        reportDate: '2025-09-17'
      });
      console.log(`  ✓ Source CopyCop chargée: ${copycopDomains.length} domaines`);
    }

    // Source 2: RRN (VIGINUM)
    if (typeof rrnDomains !== 'undefined' && Array.isArray(rrnDomains)) {
      this.registerSource('RRN', rrnDomains, {
        name: 'Réseau RRN',
        description: 'Réseau de faux médias et infrastructure de désinformation pro-russe',
        organization: 'VIGINUM',
        reportUrl: 'https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf',
        reportDate: '2023-06-19'
      });
      console.log(`  ✓ Source RRN chargée: ${rrnDomains.length} domaines`);
    }

    // Source 3: Portal Kombat (VIGINUM)
    if (typeof portalKombatDomains !== 'undefined' && Array.isArray(portalKombatDomains)) {
      this.registerSource('PortalKombat', portalKombatDomains, {
        name: 'Opération Portal Kombat',
        description: 'Réseau d\'influence',
        organization: 'Viginum',
        reportUrl: 'https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_RAPPORT-RESEAU-PORTAL-KOMBAT_VF.pdf',
        reportDate: '2024-02-01'
      });
      console.log(`  ✓ Source Portal Kombat chargée: ${portalKombatDomains.length} domaines`);
    }

    // Source 4: Baybridge (IRSEM)
    if (typeof baybridgeDomains !== 'undefined' && Array.isArray(baybridgeDomains)) {
      this.registerSource('Baybridge', baybridgeDomains, {
        name: 'Opération Baybridge',
        description: 'Vaste écosystème d\'influence informationnelle chinoise ',
        organization: 'IRSEM & TadaWeb',
        reportUrl: 'https://www.irsem.fr/focus',
        reportDate: '2025-10-17'
      });
      console.log(`  ✓ Source Baybridge chargée: ${baybridgeDomains.length} domaines`);
    }
    
    // Avertissement si aucune source n'est chargée
    if (this.sources.size === 0) {
      console.warn('⚠️  DIMA: Aucune base de données de sites suspects n\'a été chargée');
      console.warn('   Vérifiez que les fichiers de bases de données sont correctement chargés avant ce gestionnaire');
    }
  }

  /**
   * Enregistre une nouvelle source de données
   */
  registerSource(sourceName, domains, metadata) {
    this.sources.set(sourceName, {
      domains: domains,
      metadata: metadata,
      count: domains.length
    });
  }

  /**
   * Agrège tous les sites de toutes les sources
   */
  aggregateAllSites() {
    this.allSites = [];
    
    for (const [sourceName, sourceData] of this.sources) {
      this.allSites.push(...sourceData.domains);
    }
  }

  /**
   * Calcule les statistiques globales
   */
  calculateStats() {
    this.stats.totalSites = this.allSites.length;
    
    // Reset stats
    this.stats.byRiskLevel = { high: 0, medium: 0, low: 0 };
    this.stats.bySources = {};
    this.stats.byTags = {};
    
    // Compter par niveau de risque et tags
    this.allSites.forEach(site => {
      // Par niveau de risque
      if (site.riskLevel) {
        this.stats.byRiskLevel[site.riskLevel] = (this.stats.byRiskLevel[site.riskLevel] || 0) + 1;
      }
      
      // Par source
      if (site.source) {
        this.stats.bySources[site.source] = (this.stats.bySources[site.source] || 0) + 1;
      }
      
      // Par tags
      if (site.tags && Array.isArray(site.tags)) {
        site.tags.forEach(tag => {
          this.stats.byTags[tag] = (this.stats.byTags[tag] || 0) + 1;
        });
      }
    });
  }

  /**
   * Affiche les statistiques dans la console
   */
  logStats() {
    console.log('📊 Statistiques:');
    console.log(`   Total: ${this.stats.totalSites} sites`);
    console.log(`   Risque élevé: ${this.stats.byRiskLevel.high || 0}`);
    console.log(`   Risque moyen: ${this.stats.byRiskLevel.medium || 0}`);
    console.log(`   Risque faible: ${this.stats.byRiskLevel.low || 0}`);
    console.log(`   Sources: ${Object.keys(this.stats.bySources).length}`);
  }

  /**
   * Vérifie si une URL correspond à un site suspect
   * @param {string} url - L'URL à vérifier
   * @returns {Object} Résultat de la vérification
   */
  checkSite(url) {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      
      for (const site of this.allSites) {
        let isMatch = false;
        
        switch (site.matchType) {
          case "exact":
            isMatch = hostname === site.domain.toLowerCase() || 
                     hostname === `www.${site.domain.toLowerCase()}`;
            break;
            
          case "contains":
            isMatch = hostname.includes(site.domain.toLowerCase());
            break;
            
          case "pattern":
            try {
              const regex = new RegExp(site.domain, "i");
              isMatch = regex.test(hostname);
            } catch (e) {
              console.error(`DIMA: Pattern regex invalide pour ${site.domain}:`, e);
            }
            break;
        }
        
        if (isMatch) {
          return {
            isSuspicious: true,
            siteInfo: site,
            riskConfig: this.getRiskConfig(site.riskLevel),
            matchedHostname: hostname
          };
        }
      }
      
      return { isSuspicious: false };
    } catch (error) {
      console.error("DIMA: Erreur lors de la vérification du site suspect:", error);
      return { isSuspicious: false, error: error.message };
    }
  }

  /**
   * Retourne la configuration visuelle pour un niveau de risque
   */
  getRiskConfig(riskLevel) {
    const RISK_LEVELS = {
      high: {
        color: "#c0392b",
        icon: "⚠️",
        label: "Risque Élevé",
        message: "Ce site a été identifié comme diffusant de la désinformation de manière systématique."
      },
      medium: {
        color: "#e67e22",
        icon: "⚡",
        label: "Vigilance Requise",
        message: "Ce site a été signalé pour des pratiques douteuses."
      },
      low: {
        color: "#f39c12",
        icon: "ℹ️",
        label: "À Surveiller",
        message: "Ce site présente des caractéristiques suspectes."
      }
    };
    
    return RISK_LEVELS[riskLevel] || RISK_LEVELS.low;
  }

  /**
   * Retourne les statistiques
   */
  getStats() {
    return this.stats;
  }

  /**
   * Retourne les informations sur toutes les sources chargées
   */
  getSourcesInfo() {
    const sourcesInfo = [];
    for (const [sourceName, sourceData] of this.sources) {
      sourcesInfo.push({
        name: sourceName,
        count: sourceData.count,
        ...sourceData.metadata
      });
    }
    return sourcesInfo;
  }

  /**
   * Recherche des sites par tag
   */
  searchByTag(tag) {
    return this.allSites.filter(site => 
      site.tags && site.tags.includes(tag)
    );
  }

  /**
   * Recherche des sites par source
   */
  searchBySource(sourceName) {
    return this.allSites.filter(site => 
      site.source === sourceName
    );
  }
}

// Initialisation automatique du gestionnaire
let suspiciousSitesManager;

// Initialiser après le chargement de toutes les bases de données
if (typeof window !== 'undefined') {
  // Dans le navigateur, initialiser après un court délai pour laisser les autres fichiers se charger
  setTimeout(() => {
    suspiciousSitesManager = new SuspiciousSitesManager();
    
    // Rendre disponible globalement
    window.suspiciousSitesManager = suspiciousSitesManager;
    
    // Pour compatibilité avec l'ancien code, exposer aussi checkSuspiciousSite
    window.checkSuspiciousSite = (url) => suspiciousSitesManager.checkSite(url);
    
    // Exposer aussi les statistiques et infos
    window.getSuspiciousSitesStats = () => suspiciousSitesManager.getStats();
    window.getSuspiciousSitesSourcesInfo = () => suspiciousSitesManager.getSourcesInfo();
  }, 100);
}

// Export pour Node.js si nécessaire
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SuspiciousSitesManager;
}