// Plugin DIMA - Version avec fichiers PNG
const DIMA_TECHNIQUES = [
    // PHASE DETECTER
    {
        index: "TE0111",
        nom: "Heuristique de disponibilité",
        phase: "Detect",
        mots_cles: ["récent","disponible", "recently", "exemple", "example", "cas", "case", "témoignage", "testimony"]
    },
    {
        index: "TE0112", 
        nom: "Effet de simple exposition",
        phase: "Detect",
        mots_cles: ["encore", "again", "toujours", "always", "répétition", "repetition", "familier", "familiar"]
    },
    {
        index: "TE0121",
        nom: "Illusion de la fréquence",
        phase: "Detect", 
        mots_cles: ["partout", "everywhere", "de plus en plus", "more and more", "fréquent", "frequent", "épidémie", "epidemic"]
    },
    {
        index: "TE0122",
        nom: "Effet de contexte",
        phase: "Detect", 
        mots_cles: ["similaire", "same as", "cela rappelle", "déjà vu", "par ailleurs", "contexte"]
    },
    {
        index: "TE0131",
        nom: "Effet de bizarrerie",
        phase: "Detect",
        mots_cles: ["étrange", "strange", "bizarre", "weird", "incroyable", "incredible", "choquant", "shocking", "inhabituel", "unusual"]
    },
    {
        index: "TE0132",
        nom: "Biais de négativité", 
        phase: "Detect",
        mots_cles: ["catastrophe", "disaster", "danger", "menace", "threat", "risque", "risk", "grave", "serious", "crise", "crisis"]
    },
    {
        index: "TE0141",
        nom: "Effet von Restorff",
        phase: "Detect",
        mots_cles: ["unique", "seul", "only", "exclusif", "exclusive", "spécial", "special", "exceptionnel", "exceptional", "rare"]
    },
    {
        index: "TE0142",
        nom: "Biais d'ancrage",
        phase: "Detect", 
        mots_cles: ["première fois", "first time", "jamais vu", "never seen", "inédit", "unprecedented", "révélation", "revelation"]
    },
    {
        index: "TE0143",
        nom: "Effet de contraste",
        phase: "Detect", 
        mots_cles: ["par rapport à", "compare with", "différence", "difference", "comparaison", "delta", "distinction"]
    },
    {
        index: "TE0500",
        nom: "Clickbait",
        phase: "Detect",
        mots_cles: ["vous ne croirez pas", "you won't believe", "ce qui arrive ensuite", "what happens next", "secret", "shocking", "mind-blowing", "amazing"]
    },

    // PHASE INFORMER
    {
        index: "TE0211",
        nom: "Corrélation illusoire",
        phase: "Informer",
        mots_cles: ["corrélation", "similaire", "pareil", "comparaison"]
    },
    {
        index: "TE0212",
        nom: "Biais de la preuve anecdotique",
        phase: "Informer",
        mots_cles: ["cette histoire démontre", "anecdote", "exemple", "illustration","selon une étude","un témoignage","un témoin"]
    },
    {
        index: "TE0213",
        nom: "Illusion des séries",
        phase: "Informer",
        mots_cles: ["coïncidences", "motif", "données démontrent", "statistiques"]
    },
    {
        index: "TE0221",
        nom: "Stéréotypes",
        phase: "Informer",
        mots_cles: ["tous les", "stéréotype", "les étrangers", "les immigrants", "all the", "toujours", "always", "jamais", "never", "en général", "in general", "les français", "americans"]
    },
       {
        index: "TE0231",
        nom: "Biais d'homogénéité",
        phase: "Informer",
        mots_cles: ["tous les", "Homogène", "tous pareil", "toutes choses égales par ailleurs", "tous"]
    },
        {
        index: "TE0232",
        nom: "Biais de la route connue",
        phase: "Informer",
        mots_cles: ["comme avant", "habitude", "habituel", "conserrver", "rassurant"]
    },
    {
        index: "TE0241",
        nom: "Simplification excessive",
        phase: "Informer", 
        mots_cles: ["simple", "évident", "obvious", "clair", "clear", "facile", "easy", "suffit de", "just need to", "solution"]
    },
    {
        index: "TE0251",
        nom: "Faux consensus",
        phase: "Informer",
        mots_cles: ["tout le monde", "consesnsus", "convergence","everyone", "la plupart", "most people", "nous pensons", "we think", "consensus", "accord"]
    },
    {
        index: "TE0261",
        nom: "Biais rétrospectif",
        phase: "Informer",
        mots_cles: ["j'avais dit", "nous étions prévenus", "on le savait","i told you", "prévisible", "predictable", "on aurait dû", "should have", "signes", "signs"]
    },

    // PHASE MEMORISER
    {
        index: "TE0312",
        nom: "Biais de la confusion des sources",
        phase: "Mémoriser",
        mots_cles: ["des sources affirment", "sources confirment", "rien ne démontre", "hasard ?", "les faits"]
    },
    {
        index: "TE0313",
        nom: "Effet d'espacement",
        phase: "Mémoriser",
        mots_cles: ["comme déjà", "dans un article précédent"]
    },
    {
        index: "TE0314",
        nom: "Effet de suggestion",
        phase: "Mémoriser",
        mots_cles: ["et si", "cela évoque", "évoquer", "image"]
    },
    {
        index: "TE0321",
        nom: "Biais de confirmation",
        phase: "Mémoriser",
        mots_cles: ["confirme", "cela démontre", "démontrer", "confirms", "prouve", "proves", "comme prévu", "as expected", "j'avais raison", "i was right", "évident", "obvious"]
    },
    {
        index: "TE0331",
        nom: "Effet de récence",
        phase: "Mémoriser",
        mots_cles: ["récent", "recent", "nouveauté", "dernier", "last", "nouveau", "new", "frais", "fresh", "actuel", "current"]
    },
    {
        index: "TE0333",
        nom: "Effet de primauté",
        phase: "Mémoriser", 
        mots_cles: ["premier", "first", "initial", "début", "beginning", "origine", "origin", "primordial"]
    },

    // PHASE AGIR
    {
        index: "TE0411",
        nom: "Excès de confiance",
        phase: "Act",
        mots_cles: ["confiant", "confident", "sûr", "sure", "certain", "capable", "expert", "maîtrise", "mastery"]
    },
    {
        index: "TE0421", 
        nom: "Coûts irrécupérables",
        phase: "Act",
        mots_cles: ["continuer", "continue", "persister", "persist", "investir plus", "invest more", "ne pas abandonner", "don't give up"]
    },
    {
        index: "TE0422",
        nom: "Biais d'autorité",
        phase: "Act",
        mots_cles: ["autorité", "authority", "expert", "spécialiste", "specialist", "professeur", "professor", "docteur", "doctor", "officiel"]
    },
    {
        index: "TE0432",
        nom: "Biais du statu quo",
        phase: "Act",
        mots_cles: ["rester", "stay", "maintenir", "maintain", "ne pas changer", "don't change", "status quo", "comme ça", "as is"]
    },
    {
        index: "TE0501",
        nom: "FOMO",
        phase: "Act",
        mots_cles: ["ne ratez pas", "don't miss", "dernière chance", "last chance", "limité", "limited", "exclusif", "exclusive", "hurry"]
    }
];

class DIMAAnalyzer {
    constructor() {
        this.analysisResults = null;
        this.buttonCreated = false;
        this.init();
    }

    init() {
        console.log('DIMA: Initialisation...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
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
                console.error('DIMA: Erreur lors de l\'analyse:', error);
            }
        }, 3000);
    }

    analyzeCurrentPage() {
        try {
            console.log('DIMA: Analyse de la page...');
            
            const title = document.title || '';
            const textElements = document.querySelectorAll('p, h1, h2, h3, article, .content, .article-content');
            let content = '';
            
            for (let i = 0; i < Math.min(textElements.length, 10); i++) {
                const element = textElements[i];
                if (element && element.textContent) {
                    content += element.textContent + ' ';
                }
            }
            
            content = content.substring(0, 1500);
            console.log('DIMA: Texte extrait:', content.length, 'caractères');
            
            this.analysisResults = this.performAnalysis(title, content);
            console.log('DIMA: Analyse terminée, score:', this.analysisResults.globalScore);
            
            this.createButton();
            
        } catch (error) {
            console.error('DIMA: Erreur dans analyzeCurrentPage:', error);
        }
    }

    performAnalysis(title, content) {
        const fullText = (title + ' ' + content).toLowerCase();
        const detected = [];
        let totalScore = 0;

        console.log('DIMA: Analyse du texte...');

        DIMA_TECHNIQUES.forEach(technique => {
            let score = 0;
            const matchedKeywords = [];

            technique.mots_cles.forEach(keyword => {
                if (fullText.includes(keyword.toLowerCase())) {
                    score++;
                    matchedKeywords.push(keyword);
                }
            });

            if (score > 0) {
                detected.push({
                    index: technique.index,
                    nom: technique.nom,
                    phase: technique.phase,
                    score: score,
                    confidence: Math.min(score * 20, 100),
                    matchedKeywords: matchedKeywords
                });
                totalScore += score;
            }
        });

        const globalScore = Math.min(totalScore * 4, 100);
        
        const result = {
            globalScore: globalScore,
            detectedTechniques: detected,
            riskLevel: globalScore < 20 ? 'Faible' : globalScore < 30 ? 'Modéré' : globalScore < 50 ? 'Élevé' :globalScore < 75 ? 'Très Élevé' : 'Critique',
            url: window.location.href,
            title: title
        };

        console.log('DIMA: Résultats:', result);
        return result;
    }

    createButton() {
        try {
            const existing = document.getElementById('dima-btn');
            if (existing) {
                existing.remove();
            }

            if (this.buttonCreated) {
                console.log('DIMA: Bouton déjà créé');
                return;
            }

            const button = document.createElement('div');
            button.id = 'dima-btn';
            
            // Bouton simple SANS logo (comme demandé)
            button.innerHTML = `🧠 ${this.analysisResults.globalScore}`;
            
            button.style.cssText = `
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                z-index: 999999 !important;
                background: ${this.getColor(this.analysisResults.globalScore)} !important;
                color: white !important;
                padding: 12px 16px !important;
                border-radius: 20px !important;
                cursor: pointer !important;
                font-family: Arial, sans-serif !important;
                font-size: 14px !important;
                font-weight: bold !important;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3) !important;
                border: 2px solid rgba(255,255,255,0.3) !important;
                user-select: none !important;
                transition: transform 0.2s !important;
            `;

            button.title = `DIMA Score: ${this.analysisResults.globalScore} - ${this.analysisResults.detectedTechniques.length} techniques détectées`;
            
            button.addEventListener('click', () => {
                this.showModal();
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
            });

            if (document.body) {
                document.body.appendChild(button);
                this.buttonCreated = true;
                console.log('DIMA: Bouton créé avec succès');
            } else {
                console.error('DIMA: document.body non disponible');
            }

        } catch (error) {
            console.error('DIMA: Erreur lors de la création du bouton:', error);
        }
    }

    getColor(score) {
        if (score < 20) return '#27ae60';
        if (score < 30) return '#f39c12'; 
        if (score < 50) return '#e67e22';
        if (score < 75) return '#d35400';
        return '#b30000';
    }

    showModal() {
        try {
            console.log('DIMA: Affichage du modal');
            
            const existing = document.getElementById('dima-modal');
            if (existing) {
                existing.remove();
            }

            const modal = document.createElement('div');
            modal.id = 'dima-modal';
            
            modal.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100% !important;
                height: 100% !important;
                background: rgba(0,0,0,0.8) !important;
                z-index: 9999999 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-family: Arial, sans-serif !important;
            `;

            // Récupérer l'URL du logo via l'API Chrome
            const logoUrl = chrome.runtime.getURL('m82-logo-16.png');

            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 15px; max-width: 600px; max-height: 80vh; overflow-y: auto; margin: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
                            <img src="${logoUrl}" 
                                 style="width: 24px; height: 24px;" 
                                 alt="M82 Project"
                                 onerror="this.style.display='none'">
                            <h2 style="color: #2c3e50; margin: 0;">Analyse DIMA</h2>
                        </div>
                        <p style="color: #7f8c8d; margin: 0;">
                            Détection de manipulation cognitive par 
                            <a href="https://m82-project.org/" target="_blank" 
                               style="color: #3498db; text-decoration: none;">M82 Project</a>
                        </p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2em; font-weight: bold; color: ${this.getColor(this.analysisResults.globalScore)};">${this.analysisResults.globalScore}</div>
                            <div style="color: #7f8c8d; font-size: 0.9em;">Score</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 2em; font-weight: bold; color: #3498db;">${this.analysisResults.detectedTechniques.length}</div>
                            <div style="color: #7f8c8d; font-size: 0.9em;">Techniques</div>
                        </div>
                        <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                            <div style="font-size: 1.2em; font-weight: bold; color: ${this.getColor(this.analysisResults.globalScore)};">${this.analysisResults.riskLevel}</div>
                            <div style="color: #7f8c8d; font-size: 0.9em;">Risque</div>
                        </div>
                    </div>

                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <strong>Page analysée:</strong><br>
                        ${this.analysisResults.title}<br>
                        <small style="color: #666; word-break: break-all;">${this.analysisResults.url}</small>
                    </div>

                    ${this.generateTechniquesFound()}
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button onclick="document.getElementById('dima-modal').remove()" 
                                style="background: #3498db; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px;">
                            Fermer
                        </button>
                    </div>
                </div>
            `;

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

            document.body.appendChild(modal);
            console.log('DIMA: Modal affiché');

        } catch (error) {
            console.error('DIMA: Erreur lors de l\'affichage du modal:', error);
        }
    }

    generateTechniquesFound() {
        if (this.analysisResults.detectedTechniques.length === 0) {
            return `
                <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; text-align: center;">
                    ✅ Aucune manipulation détectée
                </div>
            `;
        }

        return `
            <div style="background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px;">
                <h4 style="margin: 0 0 15px 0;">⚠️ Techniques détectées:</h4>
                ${this.analysisResults.detectedTechniques.map(technique => `
                    <div style="background: white; padding: 10px; margin: 8px 0; border-radius: 5px; border-left: 3px solid #ffc107;">
                        <strong>${technique.index}:</strong> ${technique.nom}<br>
                        <small>Phase: ${technique.phase} | Confiance: ${technique.confidence}%</small>
                        ${technique.matchedKeywords.length > 0 ? `<br><small style="color: #666;">Mots-clés: ${technique.matchedKeywords.slice(0, 3).join(', ')}${technique.matchedKeywords.length > 3 ? '...' : ''}</small>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Initialisation sécurisée
console.log('DIMA: Script chargé');

try {
    new DIMAAnalyzer();
} catch (error) {
    console.error('DIMA: Erreur d\'initialisation:', error);
}
