// Base de données DIMA bilingue Français-Anglais
const DIMA_TECHNIQUES = [
    {
        index: "TE011",
        nom: "Heuristique de disponibilité / Availability Heuristic",
        description: "Biais cognitif basé sur un exemple récent facilement accessible",
        phase: "Detect",
        mots_cles: ["récent", "recently", "exemple", "example", "cas", "case", "histoire vraie", "true story"]
    },
    {
        index: "TE013",
        nom: "Biais de négativité / Negativity Bias",
        description: "Tendance à accorder plus d'attention aux expériences négatives",
        phase: "Detect",
        mots_cles: ["catastrophe", "danger", "menace", "threat", "risque", "risk", "grave", "serious", "dramatique", "dramatic", "terrible", "crisis", "alarming"]
    },
    {
        index: "TE014",
        nom: "Effet von Restorff / Von Restorff Effect",
        description: "Un objet qui se détache des autres est plus susceptible d'être retenu",
        phase: "Detect",
        mots_cles: ["unique", "seul", "only", "exclusif", "exclusive", "différent", "different", "spécial", "special", "exceptionnel", "exceptional", "rare"]
    },
    {
        index: "TE050",
        nom: "Clickbait / Appât à clics",
        description: "Titres sensationnalistes conçus pour attirer les clics",
        phase: "Detect",
        mots_cles: ["vous ne croirez pas", "you won't believe", "ce qui arrive ensuite", "what happens next", "secret", "astuce", "trick", "révélé", "revealed", "shocking", "mind-blowing", "choc", "incroyable", "incredible"]
    },
    {
        index: "TE022",
        nom: "Stéréotype / Stereotype",
        description: "Généralisation simpliste sur un groupe",
        phase: "Informer",
        mots_cles: ["tous les", "all the", "les français", "americans", "les jeunes", "young people", "en général", "in general", "toujours", "always", "jamais", "never", "everyone", "nobody"]
    },
    {
        index: "TE024",
        nom: "Simplification excessive / Oversimplification",
        description: "Réduction d'une situation complexe à des termes simples",
        phase: "Informer",
        mots_cles: ["simple", "évident", "obvious", "clair", "clear", "facile", "easy", "suffit de", "just need to", "il n'y a qu'à", "all you have to", "solution", "simply"]
    },
    {
        index: "TE031",
        nom: "Biais de confirmation / Confirmation Bias",
        description: "Privilégier les informations qui confirment ses croyances",
        phase: "Mémoriser",
        mots_cles: ["confirme", "confirms", "prouve", "proves", "démontre", "demonstrates", "comme prévu", "as expected", "j'avais raison", "i was right", "évident", "obvious", "validates"]
    },
    {
        index: "TE051",
        nom: "FOMO - Fear of Missing Out",
        description: "Peur de rater quelque chose d'important",
        phase: "Act",
        mots_cles: ["ne ratez pas", "don't miss", "dernière chance", "last chance", "limité", "limited", "exclusif", "exclusive", "bientôt fini", "ending soon", "hurry", "while supplies last"]
    }
];

class DIMAAnalyzer {
    constructor() {
        this.analysisResults = null;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.analyzeCurrentPage(), 1000);
            });
        } else {
            setTimeout(() => this.analyzeCurrentPage(), 1000);
        }
    }

    analyzeCurrentPage() {
        try {
            const title = document.title || '';
            const paragraphs = Array.from(document.querySelectorAll('p, article p, .content p, .article p, h1, h2'))
                                    .slice(0, 8)
                                    .map(p => p.textContent || p.innerText || '')
                                    .join(' ')
                                    .substring(0, 1500);

            this.analysisResults = this.performDIMAAnalysis(title, paragraphs);
            this.createFloatingButton();
        } catch (error) {
            console.log('DIMA: Erreur lors de l\'analyse de la page:', error);
        }
    }

    performDIMAAnalysis(title, content) {
        const text = (title + ' ' + content).toLowerCase();
        const detectedTechniques = [];
        const phaseScores = {
            'Detect': 0,
            'Informer': 0,
            'Mémoriser': 0,
            'Act': 0
        };

        DIMA_TECHNIQUES.forEach(technique => {
            let score = 0;
            technique.mots_cles.forEach(motCle => {
                try {
                    const escapedMotCle = motCle.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp('\\b' + escapedMotCle + '\\b', 'gi');
                    const matches = text.match(regex);
                    if (matches) {
                        score += matches.length;
                    }
                } catch (e) {
                    if (text.includes(motCle.toLowerCase())) {
                        score += 1;
                    }
                }
            });

            if (score > 0) {
                detectedTechniques.push({
                    ...technique,
                    score: score,
                    confidence: Math.min(score * 20, 100)
                });
                phaseScores[technique.phase] += score;
            }
        });

        const totalScore = Object.values(phaseScores).reduce((a, b) => a + b, 0);
        const globalScore = Math.min(totalScore * 4, 100);

        return {
            globalScore,
            detectedTechniques,
            phaseScores,
            riskLevel: globalScore < 25 ? 'Faible' : globalScore < 50 ? 'Modéré' : 'Élevé',
            analyzedAt: new Date().toISOString(),
            url: window.location.href,
            title: title
        };
    }

    createFloatingButton() {
        const existing = document.getElementById('dima-floating-btn');
        if (existing) {
            existing.remove();
        }

        const button = document.createElement('div');
        button.id = 'dima-floating-btn';
        
        const scoreColor = this.getScoreColor(this.analysisResults.globalScore);
        
        button.style.cssText = `
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 999999 !important;
            background: linear-gradient(135deg, ${scoreColor}, #c0392b) !important;
            color: white !important;
            padding: 12px 16px !important;
            border-radius: 25px !important;
            cursor: pointer !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2) !important;
            font-family: 'Segoe UI', Arial, sans-serif !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            transition: all 0.2s !important;
            user-select: none !important;
            border: 2px solid rgba(255,255,255,0.2) !important;
            text-align: center !important;
            min-width: 80px !important;
        `;
        
        button.innerHTML = `🧠 DIMA: ${this.analysisResults.globalScore}<br><small style="font-size: 10px;">${this.analysisResults.riskLevel}</small>`;
        
        button.addEventListener('click', () => this.showResults());
        button.title = 'Cliquez pour voir l\'analyse DIMA détaillée';
        
        if (document.body) {
            document.body.appendChild(button);
        }
    }

    getScoreColor(score) {
        if (score < 25) return '#27ae60';
        if (score < 50) return '#f39c12';
        return '#e74c3c';
    }

    showResults() {
        const existing = document.getElementById('dima-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'dima-modal';
        
        modal.style.cssText = `
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0,0,0,0.8) !important;
            z-index: 10000000 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-family: 'Segoe UI', Arial, sans-serif !important;
            padding: 20px !important;
            box-sizing: border-box !important;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 15px; padding: 30px; max-width: 600px; max-height: 80vh; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h2 style="color: #2c3e50; margin: 0 0 10px 0;">🧠 Analyse DIMA</h2>
                    <p style="color: #7f8c8d; margin: 0;">Détection de manipulation cognitive</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.8em; font-weight: bold; color: ${this.getScoreColor(this.analysisResults.globalScore)};">${this.analysisResults.globalScore}</div>
                        <div style="color: #7f8c8d; font-size: 0.9em;">Score</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.8em; font-weight: bold; color: #3498db;">${this.analysisResults.detectedTechniques.length}</div>
                        <div style="color: #7f8c8d; font-size: 0.9em;">Techniques</div>
                    </div>
                    <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.2em; font-weight: bold; color: ${this.getScoreColor(this.analysisResults.globalScore)};">${this.analysisResults.riskLevel}</div>
                        <div style="color: #7f8c8d; font-size: 0.9em;">Risque</div>
                    </div>
                </div>
                
                ${this.generateTechniquesFound()}
                
                <div style="text-align: center; margin-top: 20px;">
                    <button onclick="this.closest('#dima-modal').remove()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">Fermer</button>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        document.body.appendChild(modal);
    }

    generateTechniquesFound() {
        if (this.analysisResults.detectedTechniques.length === 0) {
            return `<div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 8px; text-align: center;">✅ Aucune manipulation détectée</div>`;
        }

        return `
            <div style="background: #f8d7da; color: #721c24; padding: 15px; border-radius: 8px;">
                <h4 style="margin: 0 0 10px 0;">⚠️ Techniques détectées :</h4>
                ${this.analysisResults.detectedTechniques.map(t => `
                    <div style="background: white; padding: 10px; margin: 5px 0; border-radius: 5px; border-left: 3px solid #e74c3c;">
                        <strong>${t.index}:</strong> ${t.nom}<br>
                        <small>Confiance: ${t.confidence}%</small>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

// Initialiser l'analyseur
try {
    new DIMAAnalyzer();
} catch (error) {
    console.log('DIMA: Erreur d\'initialisation:', error);
}
