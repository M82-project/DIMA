// UI Manager Module
// Responsible for creating and managing the user interface elements

class UIManager {
  constructor(settings) {
    this.settings = settings || {
      debugMode: false,
    };
    this.buttonCreated = false;
    this.analysisResults = null;
    this.pageType = 'general';
  }

  log(message, data = null) {
    if (this.settings.debugMode) {
      console.log(`UIManager: ${message}`, data || "");
    }
  }

  setPageType(pageType) {
    this.pageType = pageType;
  }

  createButton(analysisResults = null) {
    if (analysisResults) {
      this.analysisResults = analysisResults;
    }
    
    if (!this.analysisResults) {
      console.error('DIMA: Aucun résultat d\'analyse disponible pour créer le bouton');
      return;
    }
        try {
            // Supprimer bouton existant
            document.getElementById('dima-btn')?.remove();

            if (this.buttonCreated) return;

            const button = document.createElement('div');
            button.id = 'dima-btn';
            
            button.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    🧠 
                    <span style="font-weight: bold;">${this.analysisResults.globalScore}</span>
                    <span style="font-size: 0.8em; opacity: 0.9;">${this.analysisResults.riskLevel}</span>
                </div>
            `;
            
            button.style.cssText = `
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                z-index: 999999 !important;
                background: linear-gradient(135deg, ${this.analysisResults.riskColor}, ${this.adjustColor(this.analysisResults.riskColor, -20)}) !important;
                color: white !important;
                padding: 12px 16px !important;
                border-radius: 25px !important;
                cursor: pointer !important;
                font-family: 'Segoe UI', Arial, sans-serif !important;
                font-size: 14px !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1) !important;
                border: 2px solid rgba(255,255,255,0.2) !important;
                user-select: none !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                backdrop-filter: blur(10px) !important;
            `;

            button.title = this.generateTooltip();
            
            // Événements
            button.addEventListener('click', () => this.showModal());
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05) translateY(-2px)';
                button.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.2)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1) translateY(0)';
                button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2), 0 2px 5px rgba(0,0,0,0.1)';
            });

            document.body?.appendChild(button);
            this.buttonCreated = true;
            this.log('Bouton créé avec succès');

        } catch (error) {
            console.error('DIMA: Erreur création bouton:', error);
        }
    }

    adjustColor(color, amount) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * amount);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
                     (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
                     (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    generateTooltip() {
        const techniques = this.analysisResults.detectedTechniques.slice(0, 3);
        return `DIMA Score: ${this.analysisResults.globalScore} (${this.analysisResults.riskLevel})
${this.analysisResults.detectedTechniques.length} techniques détectées
${techniques.map(t => `• ${t.nom}`).join('\n')}
Contenu: ${this.analysisResults.contentLength} caractères`;
    }

    getScoreIcon(score) {
    if (score >= 75) return '🚨'; // Critique
    if (score >= 50) return '⚠️';  // Élevé
    if (score >= 30) return '⚡';  // Modéré
    if (score >= 15) return '👀'; // Faible
    return '✅'; // Très faible
    }

    generateExecutiveSummary() {
    const score = this.analysisResults.globalScore;
    const techniqueCount = this.analysisResults.detectedTechniques.length;
    const topTechniques = this.analysisResults.detectedTechniques.slice(0, 3);
    
    let summary = "";
    
    // Évaluation générale selon le score
    if (score >= 75) {
        summary = `🚨 <strong>Manipulation intensive détectée</strong> : Ce contenu présente un niveau critique de techniques manipulatoires (${techniqueCount} technique${techniqueCount > 1 ? 's' : ''}). `;
    } else if (score >= 50) {
        summary = `⚠️ <strong>Manipulation significative</strong> : Ce contenu utilise plusieurs techniques suspectes (${techniqueCount} technique${techniqueCount > 1 ? 's' : ''}). `;
    } else if (score >= 30) {
        summary = `⚡ <strong>Éléments manipulatoires présents</strong> : Quelques techniques détectées nécessitent votre attention (${techniqueCount} technique${techniqueCount > 1 ? 's' : ''}). `;
    } else {
        summary = `👀 <strong>Faible niveau de manipulation</strong> : Peu d'éléments manipulatoires détectés (${techniqueCount} technique${techniqueCount > 1 ? 's' : ''}). `;
    }
    
    // Analyse des phases dominantes
    if (this.analysisResults.phaseScores && Object.keys(this.analysisResults.phaseScores).length > 0) {
        const sortedPhases = Object.entries(this.analysisResults.phaseScores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 2);
        
        if (sortedPhases.length > 0) {
            const dominantPhase = sortedPhases[0][0];
            summary += `La manipulation se concentre principalement sur la phase "<strong>${dominantPhase}</strong>" (${this.getPhaseExplanation(dominantPhase)}). `;
        }
    }
    
    // Technique principale
    if (topTechniques.length > 0) {
        const mainTechnique = topTechniques[0];
        summary += `La technique dominante est <strong>${mainTechnique.nom}</strong> avec ${mainTechnique.confidence}% de confiance. `;
        
        // Conseil spécifique selon la technique
        summary += this.getTechniqueAdvice(mainTechnique.index);
    }
    
    return summary; 
    }

    getPhaseEmoji(phase) {
    const emojis = {
        'Detect': '👁️',
        'Informer': '📢', 
        'Mémoriser': '🧠',
        'Act': '⚡'
    };
    return emojis[phase] || '📍';
    }

    getPhaseColor(phase) {
    const colors = {
        'Detect': '#e3f2fd',      // Bleu clair
        'Informer': '#f3e5f5',    // Violet clair
        'Mémoriser': '#e8f5e8',   // Vert clair
        'Act': '#fff3e0'          // Orange clair
    };
    return colors[phase] || '#f5f5f5';
    }

    getPhaseDescription(phase) {
    const descriptions = {
        'Detect': 'Capter l\'attention',
        'Informer': 'Influencer ou orienter la compréhension', 
        'Mémoriser': 'Ancrer l\'information',
        'Act': 'Provoquer l\'action'
    };
    return descriptions[phase] || phase;
    }

    getPhaseExplanation(phase) {
    const explanations = {
        'Detect': 'techniques pour attirer et capter votre attention',
        'Informer': 'méthodes pour orienter votre interprétation des faits', 
        'Mémoriser': 'stratégies pour ancrer certaines idées dans votre mémoire',
        'Act': 'pressions pour vous pousser à agir rapidement'
    };
    return explanations[phase] || 'manipulation cognitive';
    }

    getTechniqueAdvice(techniqueIndex) {
    const advices = {
        'TE0500': 'Méfiez-vous des titres sensationnalistes et vérifiez les sources.',
        'TE0132': 'Prenez du recul face aux messages alarmistes excessifs.',
        'TE0501': 'Résistez à la pression temporelle et prenez le temps de réfléchir.',
        'TE0422': 'Vérifiez les qualifications réelles des "experts" cités.',
        'TE0251': 'Questionnez les affirmations sur ce que "tout le monde" pense.',
        'TE0221': 'Attention aux généralisations excessives sur des groupes.',
        'TE0212': 'Ne tirez pas de conclusions générales à partir d\'anecdotes.',
        'TE0321': 'Cherchez des sources contradictoires pour éviter le biais de confirmation.'
    };
    return advices[techniqueIndex] || 'Restez critique et vérifiez les informations.';
    }

    showModal() {
        try {
            this.log('Affichage du modal');
            
            document.getElementById('dima-modal')?.remove();

            const modal = document.createElement('div');
            modal.id = 'dima-modal';
            
            modal.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0,0,0,0.75) !important;
                backdrop-filter: blur(5px) !important;
                z-index: 9999999 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-family: 'Segoe UI', Arial, sans-serif !important;
                animation: fadeIn 0.3s ease-out !important;
            `;
 // Récupérer l'URL du logo
            const logoUrl = chrome.runtime.getURL('M82-logo-16.png');
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 20px; max-width: 900px; max-height: 90vh; overflow-y: auto; margin: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.3); animation: slideIn 0.3s ease-out;">
                    
                    <!-- En-tête -->
                    <div style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 10px;">
                            <img src="${logoUrl}" 
                                 style="width: 24px; height: 24px;" 
                                 alt="M82 Project"
                                 onerror="this.style.display='none'">
                            <h2 style="color: #2c3e50; margin: 0; font-size: 1.8em;">Analyse DIMA</h2>
                        </div>
                        <p style="color: #7f8c8d; margin: 0; font-size: 0.95em;">
                            Détection de techniques de manipulation cognitive par 
                            <a href="https://m82-project.org/" target="_blank" 
                               style="color: #3498db; text-decoration: none; font-weight: 500;">M82 Project</a>
                        </p>
                    </div>
                    
                    <!-- Métriques principales -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 15px; margin-bottom: 25px;">
                        <div style="background: linear-gradient(135deg, ${this.analysisResults.riskColor}, ${this.adjustColor(this.analysisResults.riskColor, -15)}); color: white; padding: 20px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                            <div style="font-size: 2.2em; font-weight: bold; margin-bottom: 5px;">${this.analysisResults.globalScore}</div>
                            <div style="font-size: 0.9em; opacity: 0.9;">Score Global</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #e9ecef;">
                            <div style="font-size: 2.2em; font-weight: bold; color: #3498db; margin-bottom: 5px;">${this.analysisResults.detectedTechniques.length}</div>
                            <div style="color: #7f8c8d; font-size: 0.9em;">Techniques</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #e9ecef;">
                            <div style="font-size: 1.4em; font-weight: bold; color: ${this.analysisResults.riskColor}; margin-bottom: 5px;">${this.analysisResults.riskLevel}</div>
                            <div style="color: #7f8c8d; font-size: 0.9em;">Niveau Risque</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid #e9ecef;">
                            <div style="font-size: 1.6em; font-weight: bold; color: #17a2b8; margin-bottom: 5px;">${this.analysisResults.contentLength}</div>
                            <div style="color: #7f8c8d; font-size: 0.9em;">Caractères</div>
                        </div>
                    </div>

                    <!-- Résumé exécutif -->
                    ${this.analysisResults.globalScore > 15 ? `
                        <div style="background: ${this.analysisResults.globalScore >= 50 ? '#ffebee' : this.analysisResults.globalScore >= 30 ? '#fff3e0' : '#e8f5e8'}; padding: 20px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid ${this.analysisResults.riskColor};">
                            <h4 style="margin: 0 0 10px 0; color: ${this.analysisResults.riskColor}; font-size: 1.1em;">
                                ${this.getScoreIcon(this.analysisResults.globalScore)} Résumé de l'analyse
                            </h4>
                            <p style="margin: 0; color: #444; line-height: 1.5; font-size: 0.95em;">
                                ${this.generateExecutiveSummary()}
                            </p>
                        </div>
                    ` : ''}

                    <!-- Informations sur la page -->
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #e9ecef;">
                        <h4 style="margin: 0 0 10px 0; color: #2c3e50; font-size: 1.1em;">📄 Page analysée</h4>
                        <div style="font-weight: 500; margin-bottom: 8px; line-height: 1.4;">${this.analysisResults.title}</div>
                        <div style="color: #666; font-size: 0.9em; word-break: break-all; margin-bottom: 8px;">${this.analysisResults.url}</div>
                        <div style="color: #888; font-size: 0.85em;">
                            Analysé le ${new Date(this.analysisResults.timestamp).toLocaleString('fr-FR')} • 
                            ${this.analysisResults.analyzedText} caractères traités • Type: ${this.pageType}
                        </div>
                    </div>

                    <!-- NOUVEAU : Répartition par phase DIMA -->
                    ${this.analysisResults.phaseScores && Object.keys(this.analysisResults.phaseScores).length > 0 ? `
                        <div style="background: #f8f9fa; padding: 20px; border-radius: 12px; margin-bottom: 25px; border: 1px solid #e9ecef;">
                            <h4 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 1.1em;">📊 Répartition par phase DIMA</h4>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px;">
                                ${Object.entries(this.analysisResults.phaseScores).map(([phase, score]) => {
                                    const maxScore = Math.max(...Object.values(this.analysisResults.phaseScores));
                                    const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
                                    return `
                                        <div style="text-align: center;">
                                            <div style="font-size: 0.85em; color: #666; margin-bottom: 8px; font-weight: 500;">
                                                ${this.getPhaseEmoji(phase)} ${phase}
                                            </div>
                                            <div style="background: ${this.getPhaseColor(phase)}; height: 12px; border-radius: 6px; margin-bottom: 8px; overflow: hidden;">
                                                <div style="background: ${this.analysisResults.riskColor}; height: 100%; width: ${Math.min(percentage, 100)}%; border-radius: 6px; transition: width 0.8s ease;"></div>
                                            </div>
                                            <div style="font-size: 0.8em; font-weight: bold; color: #333;">
                                                ${score.toFixed(1)} pts
                                            </div>
                                            <div style="font-size: 0.7em; color: #888;">
                                                ${this.getPhaseDescription(phase)}
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e9ecef; font-size: 0.8em; color: #666; text-align: center;">
                                💡 La matrice DIMA analyse comment l'information traverse les 4 phases cognitives
                            </div>
                        </div>
                    ` : ''}

                    <!-- Message si aucune technique -->
                    ${this.analysisResults.detectedTechniques.length === 0 ? `
                        <div style="background: linear-gradient(135deg, #d4edda, #c3e6cb); color: #155724; padding: 25px; border-radius: 12px; text-align: center; border: 1px solid #c3e6cb;">
                            <div style="font-size: 2em; margin-bottom: 10px;">✅</div>
                            <div style="font-size: 1.2em; font-weight: bold; margin-bottom: 8px;">Aucune manipulation détectée</div>
                            <div style="font-size: 0.95em; opacity: 0.8;">Le contenu analysé semble exempt de techniques de manipulation cognitive manifestes</div>
                        </div>
                    ` : `
                        <div style="background: linear-gradient(135deg, #fff3cd, #ffeaa7); padding: 20px; border-radius: 12px; border: 1px solid #ffeaa7;">
                            <h4 style="margin: 0 0 20px 0; color: #856404; font-size: 1.2em;">⚠️ Techniques de manipulation détectées</h4>
                            <div style="display: grid; gap: 12px;">
                                ${this.analysisResults.detectedTechniques.slice(0, 8).map(technique => `
                                    <div style="background: white; padding: 16px; border-radius: 10px; border-left: 4px solid #e67e22; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                                        <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 8px;">
                                            <div style="flex: 1;">
                                                <div style="font-weight: bold; color: #2c3e50; margin-bottom: 4px; font-size: 1.05em;">
                                                    ${technique.phase === 'Detect' ? '👁️' : technique.phase === 'Informer' ? '📢' : technique.phase === 'Mémoriser' ? '🧠' : '⚡'} ${technique.index}: ${technique.nom}
                                                </div>
                                                ${technique.tactic ? `<div style="font-size: 0.75em; color: #7f8c8d; margin-bottom: 8px;">↳ Tactique: ${technique.tactic}</div>` : ''}
                                                ${technique.description ? `<div style="color: #666; font-size: 0.9em; margin-bottom: 8px; line-height: 1.4;">${technique.description}</div>` : ''}
                                            </div>
                                            <span style="background: #27ae60; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold; margin-left: 15px;">
                                                ${technique.confidence}%
                                            </span>
                                        </div>
                                        
                                        <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 8px;">
                                            <span style="background: #e67e22; color: white; padding: 3px 8px; border-radius: 6px; font-size: 0.8em; font-weight: 500;">
                                                ${technique.phase}
                                            </span>
                                            <div style="text-align: right; font-size: 0.75em; color: #7f8c8d;">
                                                <div>Score pondéré: ${technique.weightedScore?.toFixed(1) || technique.score}</div>
                                            </div>
                                        </div>
                                        
                                        ${technique.matchedKeywords?.length > 0 ? `
                                            <div style="margin-top: 10px;">
                                                <div style="font-size: 0.85em; color: #666; margin-bottom: 6px; font-weight: 500;">
                                                    🔍 Mots-clés détectés:
                                                </div>
                                                <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                                                    ${technique.matchedKeywords.slice(0, 4).map(keyword => 
                                                        `<span style="background: #e9ecef; color: #495057; padding: 2px 6px; border-radius: 4px; font-size: 0.75em;">
                                                            ${keyword.keyword} ${(keyword.count > 1) ? `(×${keyword.count})` : ''}
                                                        </span>`
                                                    ).join('')}
                                                    ${technique.matchedKeywords.length > 4 ? 
                                                        `<span style="color: #999; font-size: 0.75em; padding: 2px 4px;">+${technique.matchedKeywords.length - 4} autres...</span>` 
                                                        : ''
                                                    }
                                                </div>
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `}
                    
                    <!-- Actions -->
                    <div style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #e9ecef;">
                        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="document.getElementById('dima-modal').remove()" 
                                    style="background: #3498db; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 500; transition: background 0.3s;">
                                Fermer
                            </button>
                            <button onclick="window.open('https://diod.m82-project.org/', '_blank')" 
                                    style="background: #95a5a6; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 500; transition: background 0.3s;">
                                En savoir plus
                            </button>
                        </div>
                    </div>

                    <style>
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes slideIn {
                            from { transform: translateY(30px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                        #dima-modal button:hover {
                            transform: translateY(-1px);
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        }
                    </style>
                </div>
            `;

            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.remove();
            });

            document.body.appendChild(modal);
            this.log('Modal affiché');

        } catch (error) {
            console.error('DIMA: Erreur modal:', error);
        }
    }
}
// Make UIManager available globally for Chrome extension
window.UIManager = UIManager;
