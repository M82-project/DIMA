// Technique Analyzer Module
// Responsible for analyzing manipulation techniques in text

class TechniqueAnalyzer {
  constructor(
    settings,
    enhancedKeywords,
    contextPatterns,
    techniques,
    pageType = "general"
  ) {
    this.settings = settings || {
      enhancedKeywords: true,
      minKeywordLength: 3,
      debugMode: false,
    };
    this.enhancedKeywords = enhancedKeywords;
    this.contextPatterns = contextPatterns;
    this.techniques = techniques;
    this.pageType = pageType;
  }

  log(message, data = null) {
    if (this.settings.debugMode) {
      console.log(`TechniqueAnalyzer: ${message}`, data || "");
    }
  }

  performAnalysis(title, content) {
    const fullText = (title + " " + content).toLowerCase();
    const detected = [];
    let totalScore = 0;
    const phaseScores = {};

    this.log("Analyse du texte...", fullText.substring(0, 200));

    // Analyser SEULEMENT les techniques (TE), pas les tactiques (TA)
    const techniques = this.techniques.filter(
      (item) => item.type === "technique"
    );

    for (const technique of techniques) {
      const analysis = this.analyzeTechnique(technique, fullText);

      if (analysis.score > 0) {
        detected.push(analysis);
        totalScore += analysis.weightedScore;

        // Calcul par phase
        if (!phaseScores[technique.phase]) {
          phaseScores[technique.phase] = 0;
        }
        phaseScores[technique.phase] += analysis.weightedScore;

        this.log(`Technique détectée: ${technique.index} (${analysis.score})`);
      }
    }

    // Score global avec normalisation améliorée
    const globalScore = Math.min(Math.round(totalScore * 3), 100);

    return {
      globalScore,
      detectedTechniques: detected.sort(
        (a, b) => b.weightedScore - a.weightedScore
      ),
      phaseScores,
      riskLevel: this.calculateRiskLevel(globalScore),
      riskColor: this.getColor(globalScore),
      url: window.location.href,
      title: title.substring(0, 200),
      contentLength: content.length,
      analyzedText: fullText.length,
      timestamp: new Date().toISOString(),
    };
  }

  analyzeTechnique(technique, fullText) {
    // Utiliser le système amélioré si disponible et activé
    if (
      this.settings.enhancedKeywords &&
      this.enhancedKeywords[technique.index]
    ) {
      return this.analyzeEnhancedTechnique(technique, fullText);
    }

    // Fallback vers l'ancienne méthode
    return this.analyzeBasicTechnique(technique, fullText);
  }

  analyzeEnhancedTechnique(technique, fullText) {
    const enhancedData = this.enhancedKeywords[technique.index];
    const results = {
      matches: [],
      score: 0,
      contextBoosts: [],
    };

    // 1. Analyse des mots-clés de base
    if (enhancedData.core) {
      const coreMatches = this.findKeywordMatches(
        fullText,
        enhancedData.core,
        1.0
      );
      results.matches.push(...coreMatches);
    }

    // 2. Analyse des variantes
    if (enhancedData.variants) {
      for (const [category, variants] of Object.entries(
        enhancedData.variants
      )) {
        if (Array.isArray(variants)) {
          const weight = this.getVariantWeight(category);
          const variantMatches = this.findKeywordMatches(
            fullText,
            variants,
            weight
          );
          results.matches.push(
            ...variantMatches.map((m) => ({ ...m, category }))
          );
        } else if (typeof variants === "object") {
          // Variantes avec sous-catégories (ex: intensity.strong)
          for (const [subcat, subvariants] of Object.entries(variants)) {
            const weight = this.getIntensityWeight(subcat);
            const subMatches = this.findKeywordMatches(
              fullText,
              subvariants,
              weight
            );
            results.matches.push(
              ...subMatches.map((m) => ({
                ...m,
                category: `${category}.${subcat}`,
              }))
            );
          }
        }
      }
    }

    // 3. Analyse des patterns regex
    if (enhancedData.patterns) {
      for (const pattern of enhancedData.patterns) {
        const patternMatches = this.findPatternMatches(fullText, pattern);
        results.matches.push(...patternMatches);
      }
    }

    // 4. Analyse contextuelle
    const contextBoosts = this.analyzeContext(fullText, technique.index);
    results.contextBoosts = contextBoosts;

    // 5. Calcul du score
    results.score = results.matches.reduce(
      (sum, match) => sum + match.weight,
      0
    );

    // 6. Application des boosts contextuels
    let finalScore = results.score;
    for (const boost of contextBoosts) {
      finalScore *= boost.boost;
    }

    // 7. Pondération contextuelle et dynamique
    let contextualWeight = this.calculateContextualWeight(
      technique,
      this.pageType
    );
    let dynamicWeight = this.calculateDynamicWeight(technique, finalScore);

    const totalWeight =
      (technique.weight || 1.0) * contextualWeight * dynamicWeight;
    const weightedScore = finalScore * totalWeight;

    const confidence = Math.min(
      Math.round(results.score * 15 + results.matches.length * 10),
      100
    );

    return {
      index: technique.index,
      nom: technique.nom,
      phase: technique.phase,
      description: technique.description || "",
      score: Math.round(finalScore),
      weightedScore,
      finalWeight: totalWeight,
      contextualWeight,
      dynamicWeight,
      confidence,
      matchedKeywords: this.formatEnhancedMatches(results.matches),
      enhancedAnalysis: {
        coreMatches: results.matches.filter((m) => m.type === "core").length,
        variantMatches: results.matches.filter((m) => m.type === "variant")
          .length,
        patternMatches: results.matches.filter((m) => m.type === "pattern")
          .length,
        contextBoosts: results.contextBoosts,
      },
    };
  }

  analyzeBasicTechnique(technique, fullText) {
    let score = 0;
    const matchedKeywords = [];

    for (const keyword of technique.mots_cles) {
      if (keyword.length < this.settings.minKeywordLength) continue;

      const keywordLower = keyword.toLowerCase();
      const matches = this.findKeywordMatches(fullText, [keywordLower], 1.0);

      if (matches.length > 0) {
        score += matches.length;
        matchedKeywords.push({
          keyword,
          count: matches.length,
          type: "basic",
        });
      }
    }

    // Pondération contextuelle et dynamique
    let contextualWeight = this.calculateContextualWeight(
      technique,
      this.pageType
    );
    let dynamicWeight = this.calculateDynamicWeight(technique, score);

    const finalWeight =
      (technique.weight || 1.0) * contextualWeight * dynamicWeight;
    const weightedScore = score * finalWeight;

    const confidence = Math.min(
      Math.round(score * 15 + weightedScore * 5),
      100
    );

    return {
      index: technique.index,
      nom: technique.nom,
      phase: technique.phase,
      description: technique.description || "",
      score,
      weightedScore,
      finalWeight,
      contextualWeight,
      dynamicWeight,
      confidence,
      matchedKeywords,
    };
  }

  findKeywordMatches(text, keywords, weight = 1.0) {
    const matches = [];

    for (const keyword of keywords) {
      const keywordLower = keyword.toLowerCase();
      let regex;

      if (keywordLower.includes(" ")) {
        // Expression avec espaces
        regex = new RegExp(this.escapeRegex(keywordLower), "gi");
      } else {
        // Mot simple avec frontières
        regex = new RegExp(
          "\\b" + this.escapeRegex(keywordLower) + "\\b",
          "gi"
        );
      }

      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          type: "core",
          keyword: keyword,
          position: match.index,
          weight: weight,
        });
      }
    }

    return matches;
  }

  findPatternMatches(text, pattern) {
    const matches = [];
    let match;

    // Réinitialiser le regex pour éviter les problèmes de state
    pattern.lastIndex = 0;

    while ((match = pattern.exec(text)) !== null) {
      matches.push({
        type: "pattern",
        keyword: match[0],
        position: match.index,
        weight: 1.5, // Les patterns ont un poids plus élevé
      });

      // Éviter les boucles infinies
      if (!pattern.global) break;
    }

    return matches;
  }

  analyzeContext(text, techniqueId) {
    const boosts = [];

    for (const [contextType, contextData] of Object.entries(
      this.contextPatterns
    )) {
      if (contextData.techniques.includes(techniqueId)) {
        for (const pattern of contextData.patterns) {
          if (pattern.test(text)) {
            boosts.push({
              type: contextType,
              boost: contextData.boost,
              pattern: pattern.source,
            });
          }
        }
      }
    }

    return boosts;
  }

  getVariantWeight(category) {
    const weights = {
      formal: 0.9,
      informal: 1.1,
      clickbait_formulas: 1.6,
      emotional_hooks: 1.4,
      curiosity_gaps: 1.5,
      urgency: 1.3,
      scarcity: 1.4,
      temporal: 1.2,
    };
    return weights[category] || 1.0;
  }

  getIntensityWeight(intensity) {
    const weights = {
      weak: 0.7,
      strong: 1.5,
    };
    return weights[intensity] || 1.0;
  }

  formatEnhancedMatches(matches) {
    const grouped = {};

    for (const match of matches) {
      const key = match.keyword;
      if (!grouped[key]) {
        grouped[key] = {
          keyword: key,
          count: 0,
          type: match.type,
          category: match.category,
          totalWeight: 0,
        };
      }
      grouped[key].count++;
      grouped[key].totalWeight += match.weight;
    }

    return Object.values(grouped);
  }

  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  calculatePositionWeight(position, textLength) {
  const relativePosition = position / textLength;
  // Boost pour les éléments en début de texte (titres, accroches)
    if (relativePosition < 0.15) return 1.4;
  // Boost modéré pour le premier tiers
    if (relativePosition < 0.33) return 1.1;
  // Boost pour la fin (conclusions, appels à l'action)
    if (relativePosition > 0.85) return 1.2;
  // Poids normal pour le milieu
    return 1.0;
  }
  calculateRiskLevel(score) {
    if (score < 15) return "Faible";
    if (score < 30) return "Modéré";
    if (score < 50) return "Élevé";
    if (score < 75) return "Très Élevé";
    return "Critique";
  }

  calculateContextualWeight(technique, pageType) {
    let contextualWeight = 1.0;

    switch (pageType) {
      case "news":
        if (technique.index === "TE0500") contextualWeight = 1.4;
        if (technique.index === "TE0132") contextualWeight = 1.3;
        if (technique.index === "TE0221") contextualWeight = 1.5;
        if (technique.index === "TE0212") contextualWeight = 1.3;
        if (technique.index === "TE0261") contextualWeight = 0.8;
        break;

      case "social":
        if (technique.index === "TE0132") contextualWeight = 0.9;
        if (technique.index === "TE0131") contextualWeight = 0.8;
        if (technique.index === "TE0501") contextualWeight = 1.3;
        if (technique.index === "TE0221") contextualWeight = 1.6;
        if (technique.index === "TE0251") contextualWeight = 1.2;
        break;

      case "commerce":
        if (technique.index === "TE0501") contextualWeight = 0.9;
        if (technique.index === "TE0141") contextualWeight = 0.8;
        if (technique.index === "TE0143") contextualWeight = 0.7;
        if (technique.index === "TE0422") contextualWeight = 1.2;
        if (technique.index === "TE0411") contextualWeight = 1.1;
        break;

      case "blog":
        if (technique.index === "TE0212") contextualWeight = 0.8;
        if (technique.index === "TE0314") contextualWeight = 0.9;
        if (technique.index === "TE0261") contextualWeight = 0.7;
        if (technique.index === "TE0321") contextualWeight = 1.1;
        break;
    }

    this.log(
      `Poids contextuel pour ${technique.index} sur ${pageType}: ${contextualWeight}`
    );
    return contextualWeight;
  }

  calculateDynamicWeight(technique, occurrences) {
    let dynamicWeight = 1.0;

    // Plus une technique apparaît, plus elle devient suspecte
    if (occurrences >= 10) {
      dynamicWeight = 1.4;
    } else if (occurrences >= 7) {
      dynamicWeight = 1.3;
    } else if (occurrences >= 5) {
      dynamicWeight = 1.2;
    } else if (occurrences >= 3) {
      dynamicWeight = 1.1;
    }

    // Cas spéciaux : certaines techniques sont plus graves même avec peu d'occurrences
    const criticalTechniques = ["TE0221", "TE0500", "TE0132", "TE0501"];
    if (criticalTechniques.includes(technique.index) && occurrences >= 2) {
      dynamicWeight *= 1.1;
    }

    // Réduire le poids si technique très fréquente mais bénigne
    const benignTechniques = ["TE0143", "TE0232", "TE0333"];
    if (benignTechniques.includes(technique.index) && occurrences >= 5) {
      dynamicWeight *= 0.9;
    }

    this.log(
      `Poids dynamique pour ${technique.index} (${occurrences} occ.): ${dynamicWeight}`
    );
    return dynamicWeight;
  }

  getColor(score) {
    if (score < 15) return "#27ae60"; // Vert
    if (score < 30) return "#f39c12"; // Orange clair
    if (score < 50) return "#e67e22"; // Orange
    if (score < 75) return "#d35400"; // Rouge-orange
    return "#c0392b"; // Rouge foncé
  }
}

// Make TechniqueAnalyzer available globally for Chrome extension
window.TechniqueAnalyzer = TechniqueAnalyzer;
