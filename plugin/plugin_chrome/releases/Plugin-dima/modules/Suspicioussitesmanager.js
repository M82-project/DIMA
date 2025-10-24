// DIMA - Gestionnaire Central de Sites Suspects
// Version 2.3 - Support COMPLET des comptes sociaux (format Storm1516 natif)
// Ce fichier charge et agrège toutes les bases de données de domaines suspects

/**
 * Gestionnaire centralisé des sites suspects
 * Compatible avec TOUS les formats de données existants
 */
class SuspiciousSitesManager {
  constructor() {
    this.sources = new Map();
    this.allSites = [];
    this.stats = {
      totalSites: 0,
      totalDomains: 0,
      totalSocialAccounts: 0,
      byRiskLevel: { high: 0, medium: 0, low: 0 },
      bySources: {},
      byTags: {},
      bySocialPlatform: {}
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
    
    console.log(`✅ DIMA: ${this.allSites.length} entrées chargées depuis ${this.sources.size} source(s)`);
    console.log(`   - ${this.stats.totalDomains} domaines`);
    console.log(`   - ${this.stats.totalSocialAccounts} comptes de réseaux sociaux`);
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

    // Source 5: Storm 1516 - Domaines (VIGINUM)
    if (typeof storm1516Domains !== 'undefined' && Array.isArray(storm1516Domains)) {
      this.registerSource('Storm1516_Domains', storm1516Domains, {
        name: 'Opération Storm_1516 (Domaines)',
        description: 'Mode opératoire informationnel (MOI) russe actif depuis août 2023',
        organization: 'VIGINUM',
        reportUrl: 'https://www.defense.gouv.fr/sites/default/files/desinformation/Rapport%20Storm%201516%20-%20SGDSN.pdf',
        reportDate: '2025-05-02'
      });
      console.log(`  ✓ Source Storm 1516 (domaines) chargée: ${storm1516Domains.length} domaines`);
    }

    // Source 6: Storm 1516 - Comptes sociaux (VIGINUM) - FORMAT NATIF
    if (typeof storm1516SocialAccounts !== 'undefined' && Array.isArray(storm1516SocialAccounts)) {
      this.registerSource('Storm1516_Social', storm1516SocialAccounts, {
        name: 'Opération Storm_1516 (Comptes sociaux)',
        description: 'Comptes de réseaux sociaux relayant le MOI russe Storm 1516',
        organization: 'VIGINUM',
        reportUrl: 'https://www.defense.gouv.fr/sites/default/files/desinformation/Rapport%20Storm%201516%20-%20SGDSN.pdf',
        reportDate: '2025-05-02'
      });
      console.log(`  ✓ Source Storm 1516 (comptes sociaux) chargée: ${storm1516SocialAccounts.length} comptes`);
    }

    // Source 7: Pravda 
   if (typeof pravdaDomains !== 'undefined' && Array.isArray(pravdaDomains)) {
      this.registerSource('Pravda_Domains', pravdaDomains, {
        name: 'Réseau Pravda (Domaines)',
        description: 'Réseau de désinformation pro-Kremlin actif depuis 2014, Opération exposée en février 2024 par VIGINUM',
        organization: 'VIGINUM, DFRLab (Atlantic Council), CheckFirst (Finlande),American Sunlight Project',
        reportUrl: 'https://www.sgdsn.gouv.fr/files/files/20240212_NP_SGDSN_VIGINUM_PORTAL-KOMBAT-NETWORK_ENG_VF.pdf',
        reportDate: '2024-12-02'
      });
      console.log(`  ✓ Source Pravda chargée: ${pravdaDomains.length} domaines`);
    }
    
    // Source 8: Doppelganger - noms de domaines 
   if (typeof doppelgangerDomains !== 'undefined' && Array.isArray(doppelgangerDomains)) {
      this.registerSource('Doppelganger_Domains', doppelgangerDomains, {
        name: 'Opération - réseau Doppelganger',
        description: 'Réseau de désinformation pro-Kremlin créant des sites Web usurpant l\'identité de sources d\'information légitimes. Opérée par Social Design Agency (SDA)',
        organization: 'Sources multiples: Wikipedia, Qurium, US DOJ, EU DisinfoLab, DFRLab',
        reportUrl: 'https://en.wikipedia.org/wiki/List_of_political_disinformation_website_campaigns_in_Russia',
        reportDate: '2023-11-23'
      });
      console.log(`  ✓ Source Doppelganger chargée: ${doppelgangerDomains.length} domaines`);
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
    this.stats.totalDomains = 0;
    this.stats.totalSocialAccounts = 0;
    
    // Reset stats
    this.stats.byRiskLevel = { high: 0, medium: 0, low: 0 };
    this.stats.bySources = {};
    this.stats.byTags = {};
    this.stats.bySocialPlatform = {};
    
    // Compter par niveau de risque et tags
    this.allSites.forEach(site => {
      // Distinguer domaines et comptes sociaux
      // Format Storm1516: {platform: "X/Twitter", handle: "@..."}
      // Format standard: {domain: "...", accountType: "twitter"}
      if (site.platform || site.accountType) {
        this.stats.totalSocialAccounts++;
        const platform = site.platform || site.accountType;
        this.stats.bySocialPlatform[platform] = (this.stats.bySocialPlatform[platform] || 0) + 1;
      } else {
        this.stats.totalDomains++;
      }
      
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
    console.log(`   Total: ${this.stats.totalSites} entrées`);
    console.log(`   - Domaines: ${this.stats.totalDomains}`);
    console.log(`   - Comptes sociaux: ${this.stats.totalSocialAccounts}`);
    if (this.stats.totalSocialAccounts > 0) {
      console.log('   Répartition par plateforme:');
      for (const [platform, count] of Object.entries(this.stats.bySocialPlatform)) {
        console.log(`     • ${platform}: ${count}`);
      }
    }
    console.log(`   Risque élevé: ${this.stats.byRiskLevel.high || 0}`);
    console.log(`   Risque moyen: ${this.stats.byRiskLevel.medium || 0}`);
    console.log(`   Risque faible: ${this.stats.byRiskLevel.low || 0}`);
    console.log(`   Sources: ${Object.keys(this.stats.bySources).length}`);
  }

  /**
   * Vérifie si une URL correspond à un site suspect OU un compte social suspect
   * @param {string} url - L'URL à vérifier
   * @returns {Object} Résultat de la vérification
   */
  checkSite(url) {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      const pathname = urlObj.pathname.toLowerCase();
      
      for (const site of this.allSites) {
        let isMatch = false;
        let matchType = 'domain';
        
        // NOUVEAU: Support du format Storm1516 natif
        // Format: {platform: "X/Twitter", handle: "@JimFergusonUK", url: "..."}
        if (site.platform && site.handle) {
          isMatch = this.checkSocialAccountStorm1516Format(url, site, hostname, pathname);
          matchType = 'social_account';
        }
        // Support du format standard avec accountType
        else if (site.accountType) {
          const extractedHandle = this.extractSocialHandle(url, site.accountType);
          if (extractedHandle) {
            const dbHandle = site.domain.toLowerCase().replace(/^@/, '');
            isMatch = extractedHandle === dbHandle;
            matchType = 'social_account';
          }
        }
        // Vérification classique pour les domaines
        else {
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
        }
        
        if (isMatch) {
          console.log(`🎯 DIMA: Match trouvé!`, {
            type: matchType,
            site: site.handle || site.domain,
            url: url
          });
          
          return {
            isSuspicious: true,
            siteInfo: site,
            riskConfig: this.getRiskConfig(site.riskLevel),
            matchedHostname: hostname,
            matchType: matchType,
            matchedIdentifier: matchType === 'social_account' ? (site.handle || site.domain) : hostname
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
   * NOUVEAU: Vérifie un compte social au format Storm1516
   * Format: {platform: "X/Twitter", handle: "@JimFergusonUK"}
   */
  checkSocialAccountStorm1516Format(url, site, hostname, pathname) {
    // Mapping des plateformes Storm1516 vers domaines
    const platformDomains = {
      'X/Twitter': ['twitter.com', 'x.com'],
      'Telegram': ['t.me', 'telegram.me'],
      'YouTube': ['youtube.com', 'youtu.be'],
      'Facebook': ['facebook.com', 'fb.com', 'm.facebook.com'],
      'Instagram': ['instagram.com'],
      'TikTok': ['tiktok.com'],
      'VK': ['vk.com'],
      'Rumble': ['rumble.com']
    };

    const platform = site.platform;
    const handle = site.handle.toLowerCase().replace(/^@/, ''); // Enlever @ et lowercase
    
    // Vérifier si on est sur la bonne plateforme
    const domains = platformDomains[platform];
    if (!domains) {
      console.warn(`DIMA: Plateforme inconnue: ${platform}`);
      return false;
    }
    
    const isCorrectDomain = domains.some(domain => hostname.includes(domain));
    if (!isCorrectDomain) {
      return false;
    }
    
    // Extraire le handle de l'URL actuelle
    let extractedHandle = null;
    
    if (platform === 'X/Twitter') {
      // twitter.com/JimFergusonUK ou x.com/JimFergusonUK
      const match = pathname.match(/^\/([a-zA-Z0-9_]+)(?:\/|$|\?)/);
      if (match) extractedHandle = match[1].toLowerCase();
    } else if (platform === 'Telegram') {
      // t.me/username ou t.me/s/channelname
      const match = pathname.match(/^\/(?:s\/)?([a-zA-Z0-9_]+)(?:\/|$|\?)/);
      if (match) extractedHandle = match[1].toLowerCase();
    } else if (platform === 'YouTube') {
      // youtube.com/@username ou youtube.com/c/username
      const match = pathname.match(/^\/([@c]\/)?([a-zA-Z0-9_-]+)(?:\/|$|\?)/);
      if (match) extractedHandle = match[2].toLowerCase();
    } else if (platform === 'Facebook') {
      // facebook.com/username
      const match = pathname.match(/^\/([a-zA-Z0-9._-]+)(?:\/|$|\?)/);
      if (match) extractedHandle = match[1].toLowerCase();
    } else if (platform === 'Rumble') {
      // rumble.com/c/username
      const match = pathname.match(/^\/c\/([a-zA-Z0-9_-]+)(?:\/|$|\?)/);
      if (match) extractedHandle = match[1].toLowerCase();
    }
    
    if (extractedHandle) {
      console.log(`🔍 DIMA: Comparaison - URL: "${extractedHandle}" vs DB: "${handle}"`);
      return extractedHandle === handle;
    }
    
    return false;
  }

  /**
   * Extrait le handle/username d'une URL de réseau social
   * @param {string} url - L'URL complète
   * @param {string} accountType - Type de compte (twitter, facebook, youtube, etc.)
   * @returns {string|null} Le handle extrait ou null
   */
  extractSocialHandle(url, accountType) {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      const pathname = urlObj.pathname;
      
      // Patterns pour différents réseaux sociaux
      const patterns = {
        twitter: {
          domains: ['twitter.com', 'x.com'],
          regex: /^\/([a-zA-Z0-9_]+)(?:\/|$|\?)/
        },
        facebook: {
          domains: ['facebook.com', 'fb.com'],
          regex: /^\/([a-zA-Z0-9._]+)(?:\/|$|\?)/
        },
        instagram: {
          domains: ['instagram.com'],
          regex: /^\/([a-zA-Z0-9._]+)(?:\/|$|\?)/
        },
        youtube: {
          domains: ['youtube.com'],
          regex: /^\/([@c]\/)?([a-zA-Z0-9_-]+)(?:\/|$|\?)/
        },
        telegram: {
          domains: ['t.me', 'telegram.me'],
          regex: /^\/([a-zA-Z0-9_]+)(?:\/|$|\?)/
        },
        tiktok: {
          domains: ['tiktok.com'],
          regex: /^\/@?([a-zA-Z0-9._]+)(?:\/|$|\?)/
        },
        vk: {
          domains: ['vk.com'],
          regex: /^\/([a-zA-Z0-9._]+)(?:\/|$|\?)/
        }
      };
      
      const pattern = patterns[accountType.toLowerCase()];
      if (!pattern) {
        console.warn(`DIMA: Type de compte non supporté: ${accountType}`);
        return null;
      }
      
      // Vérifier si on est sur le bon domaine
      const isCorrectDomain = pattern.domains.some(domain => hostname.includes(domain));
      if (!isCorrectDomain) return null;
      
      // Extraire le handle
      const match = pathname.match(pattern.regex);
      if (match) {
        const handle = accountType.toLowerCase() === 'youtube' ? (match[2] || match[1]) : match[1];
        console.log(`DIMA: Handle extrait de ${accountType}: ${handle}`);
        return handle;
      }
      
      return null;
    } catch (error) {
      console.error("DIMA: Erreur lors de l'extraction du handle social:", error);
      return null;
    }
  }

  /**
   * Retourne la configuration visuelle pour un niveau de risque
   */
  getRiskConfig(riskLevel) {
    const RISK_LEVELS = {
      critical: {
        color: "#8b0000",
        icon: "🚨",
        label: "Risque Critique",
        message: "Ce site/compte a été identifié comme un acteur majeur de désinformation."
      },
      high: {
        color: "#c0392b",
        icon: "⚠️",
        label: "Risque Élevé",
        message: "Ce site/compte a été identifié comme diffusant de la désinformation de manière systématique."
      },
      medium: {
        color: "#e67e22",
        icon: "⚡",
        label: "Vigilance Requise",
        message: "Ce site/compte a été signalé pour des pratiques douteuses."
      },
      low: {
        color: "#f39c12",
        icon: "ℹ️",
        label: "À Surveiller",
        message: "Ce site/compte présente des caractéristiques suspectes."
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

  /**
   * Recherche des comptes sociaux par plateforme
   */
  searchBySocialPlatform(platform) {
    return this.allSites.filter(site => 
      site.platform === platform || 
      (site.accountType && site.accountType.toLowerCase() === platform.toLowerCase())
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