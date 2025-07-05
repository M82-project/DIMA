// Plugin DIMA - content.js - Version finale consolidée
// Détection de manipulation cognitive - M82 Project
// Version: 2.0 Enhanced Keywords

// ===== BASE DE DONNÉES DES MOTS-CLÉS AMÉLIORÉS =====
const DIMA_ENHANCED_KEYWORDS = {
    "TE0111": {
        core: ["exemple", "cas", "témoignage", "example", "case", "testimony"],
        variants: {
            formal: ["illustration", "démonstration", "spécimen"],
            informal: ["histoire", "vécu", "expérience"],
            intensity: {
                weak: ["petit exemple", "simple cas"],
                strong: ["exemple frappant", "cas édifiant", "témoignage bouleversant"]
            }
        },
        patterns: [
            /(?:par\s+exemple|for\s+example|comme\s+dans\s+le\s+cas)/i,
            /(?:prenons\s+l'exemple|take\s+the\s+example)/i
        ]
    },
    
    "TE0500": {
        core: ["secret", "choquant", "incroyable", "shocking", "amazing"],
        variants: {
            clickbait_formulas: [
                "vous ne croirez pas", "ce qui arrive ensuite", "you won't believe",
                "what happens next", "les experts détestent", "un truc simple",
                "cette astuce", "révélation choc", "doctors hate this"
            ],
            emotional_hooks: [
                "ça va vous surprendre", "préparez-vous", "attention",
                "exclusif", "urgent", "will shock you", "prepare yourself"
            ],
            curiosity_gaps: [
                "la raison va vous étonner", "voici pourquoi", "découvrez comment",
                "la vérité sur", "the reason will amaze you", "here's why"
            ]
        },
        patterns: [
            /\d+\s+(?:choses|façons|méthodes|secrets|things|ways|methods)\s+(?:que|pour|de|to|that)/i,
            /(?:voici|découvrez|here's|discover)\s+(?:comment|pourquoi|ce que|how|why|what)/i,
            /(?:cette|cette|this)\s+\w+\s+va\s+vous\s+(?:\w+|will)/i,
            /(?:shocking|amazing|incredible)\s+(?:secret|truth|fact)/i
        ]
    },
    
    "TE0132": {
        core: ["catastrophe", "chaos", "disaster", "danger", "menace", "threat", "risque", "risk", "grave", "serious", "crise", "crisis"],
        variants: {
            intensity: {
                weak: ["problème", "difficulté", "souci", "issue", "concern"],
                strong: ["catastrophe majeure", "crise grave", "danger mortel", "major catastrophe", "deadly danger"]
            },
            temporal: ["imminent", "proche", "bientôt", "soon", "approaching"]
        },
        patterns: [
            /(?:alerte|alert|warning|attention)\s+(?:rouge|red|maximum)/i,
            /(?:situation|crisis|problem)\s+(?:critique|critical|dramatique|dramatic)/i
        ]
    },
    
    "TE0501": {
        core: ["ne ratez pas", "don't miss", "dernière chance", "last chance", "limité", "limited", "exclusif", "exclusive"],
        variants: {
            urgency: ["dépêchez-vous", "hurry up", "vite", "quickly", "maintenant ou jamais", "now or never"],
            scarcity: ["stock limité", "places limitées", "limited stock", "limited seats", "offre limitée"]
        },
        patterns: [
            /(?:seulement|only)\s+\d+\s+(?:jours?|heures?|minutes?|days?|hours?|minutes?)/i,
            /(?:expire|ends?)\s+(?:bientôt|soon|today|demain|tomorrow)/i
        ]
    }
};

// ===== PATTERNS CONTEXTUELS =====
const CONTEXT_PATTERNS = {
    urgency: {
        patterns: [
            /(?:urgent|rapidement|vite|immédiatement|maintenant|now|quickly|immediately)/i,
            /(?:dernière\s+chance|temps\s+limité|offre\s+limitée|last\s+chance|limited\s+time)/i,
            /(?:dépêchez-vous|ne\s+ratez\s+pas|hurry|don't\s+miss)/i
        ],
        boost: 1.3,
        techniques: ['TE0501', 'TE0500']
    },
    authority: {
        patterns: [
            /(?:selon\s+(?:les\s+)?(?:experts?|spécialistes?|docteurs?|doctors?|experts?))/i,
            /(?:étude\s+(?:révèle|montre|démontre|shows?|reveals?))/i,
            /(?:recherche\s+(?:scientifique|universitaire|scientific|university))/i
        ],
        boost: 1.4,
        techniques: ['TE0422', 'TE0212']
    },
    social_proof: {
        patterns: [
            /(?:\d+(?:\.\d+)?[km]?\s+personnes?\s+(?:utilisent|font|pensent|people\s+(?:use|do|think)))/i,
            /(?:tout\s+le\s+monde|la\s+plupart\s+des\s+gens|everyone|most\s+people)/i,
            /(?:viral|tendance|populaire|trending|popular)/i
        ],
        boost: 1.2,
        techniques: ['TE0251', 'TE0221']
    }
};

// ===== BASE DIMA COMPLÈTE =====
const DIMA_TECHNIQUES = [
    // PHASE DETECTER - TACTIQUES
    {
        index: "TA0011",
        nom: "Information préexistante",
        phase: "Detect",
        description: "Exploitation d'informations déjà connues ou familières",
        mots_cles: ["déjà", "connu", "already", "known", "familier", "familiar", "habituel", "usual", "précédemment", "previously"],
        weight: 1.1,
        type: "tactic"
    },
    {
        index: "TA0012", 
        nom: "Information à exposition répétée",
        phase: "Detect",
        description: "Répétition d'informations pour créer une familiarité artificielle",
        mots_cles: ["encore", "again", "répéter", "repeat", "redire", "retell", "rappel", "reminder", "à nouveau", "once again"],
        weight: 1.2,
        type: "tactic"
    },
    {
        index: "TA0013",
        nom: "Information clivante",
        phase: "Detect", 
        description: "Utilisation d'informations polarisantes pour attirer l'attention",
        mots_cles: ["polémique", "controversial", "scandaleux", "outrageous", "choquant", "shocking", "divise", "divides", "clivant"],
        weight: 1.4,
        type: "tactic"
    },
    {
        index: "TA0014",
        nom: "Écart à la norme",
        phase: "Detect",
        description: "Mise en avant d'éléments sortant de l'ordinaire",
        mots_cles: ["inhabituel", "unusual", "anormal", "abnormal", "exception", "extraordinary", "hors norme", "atypique"],
        weight: 1.3,
        type: "tactic"
    },
    {
        index: "TA0015",
        nom: "Détail signifiant",
        phase: "Detect",
        description: "Focus sur des détails pour donner une impression de précision",
        mots_cles: ["précisément", "exactly", "détail", "detail", "spécifiquement", "specifically", "en particulier", "particularly"],
        weight: 1.1,
        type: "tactic"
    },

    // PHASE DETECTER - TECHNIQUES
    {
        index: "TE0111",
        nom: "Heuristique de disponibilité",
        phase: "Detect",
        description: "Surreprésentation d'exemples facilement mémorisables",
        mots_cles: ["récent","disponible", "recently", "exemple", "example", "cas", "case", "témoignage", "testimony"],
        weight: 1.0,
        type: "technique",
        tactic: "TA0011"
    },
    {
        index: "TE0112", 
        nom: "Effet de simple exposition",
        phase: "Detect",
        description: "Répétition pour créer une familiarité artificielle",
        mots_cles: ["encore", "again", "toujours", "always", "répétition", "repetition", "familier", "familiar"],
        weight: 1.2,
        type: "technique",
        tactic: "TA0011"
    },
    {
        index: "TE0121",
        nom: "Illusion de la fréquence",
        phase: "Detect",
        description: "Impression exagérée de fréquence d'un phénomène",
        mots_cles: ["partout", "everywhere", "de plus en plus", "more and more", "fréquent", "frequent", "épidémie", "epidemic"],
        weight: 1.1,
        type: "technique",
        tactic: "TA0012"
    },
    {
        index: "TE0122",
        nom: "Effet de contexte",
        phase: "Detect",
        description: "Utilisation du contexte pour influencer la perception",
        mots_cles: ["similaire", "same as", "cela rappelle", "déjà vu", "par ailleurs", "contexte"],
        weight: 0.9,
        type: "technique",
        tactic: "TA0012"
    },
    {
        index: "TE0131",
        nom: "Effet de bizarrerie",
        phase: "Detect",
        description: "Mise en avant d'éléments inhabituels pour attirer l'attention",
        mots_cles: ["étrange", "strange", "bizarre", "weird", "incroyable", "incredible", "choquant", "shocking", "inhabituel", "unusual"],
        weight: 1.3,
        type: "technique",
        tactic: "TA0013"
    },
    {
        index: "TE0132",
        nom: "Biais de négativité", 
        phase: "Detect",
        description: "Accent mis sur les aspects négatifs pour capter l'attention",
        mots_cles: ["catastrophe", "chaos","disaster", "danger", "menace", "threat", "risque", "risk", "grave", "serious", "crise", "crisis"],
        weight: 1.4,
        type: "technique",
        tactic: "TA0013"
    },
    {
        index: "TE0141",
        nom: "Effet von Restorff",
        phase: "Detect",
        description: "Mise en avant de l'unicité pour marquer les esprits",
        mots_cles: ["unique", "seul", "only", "exclusif", "exclusive", "spécial", "special", "exceptionnel", "exceptional", "rare"],
        weight: 1.1,
        type: "technique",
        tactic: "TA0014"
    },
    {
        index: "TE0142",
        nom: "Biais d'ancrage",
        phase: "Detect",
        description: "Première information comme point de référence",
        mots_cles: ["première fois", "first time", "jamais vu", "never seen", "inédit", "unprecedented", "révélation", "revelation"],
        weight: 1.2,
        type: "technique",
        tactic: "TA0015"
    },
    {
        index: "TE0143",
        nom: "Effet de contraste",
        phase: "Detect",
        description: "Comparaisons pour influencer la perception relative",
        mots_cles: ["par rapport à", "compare with", "différence", "difference", "comparaison", "delta", "distinction"],
        weight: 0.8,
        type: "technique",
        tactic: "TA0015"
    },
    {
        index: "TE0500",
        nom: "Clickbait",
        phase: "Detect",
        description: "Titres accrocheurs pour générer des clics",
        mots_cles: ["vous ne croirez pas", "you won't believe", "ce qui arrive ensuite", "what happens next", "secret", "shocking", "mind-blowing", "amazing"],
        weight: 1.5,
        type: "technique",
        tactic: "TA0013"
    },

    // PHASE INFORMER - TACTIQUES
    {
        index: "TA0021",
        nom: "Création d'un motif",
        phase: "Informer",
        description: "Construction artificielle de patterns ou de tendances",
        mots_cles: ["motif", "pattern", "tendance", "trend", "récurrent", "recurrent", "régulier", "regular", "systématique"],
        weight: 1.3,
        type: "tactic"
    },
    {
        index: "TA0022",
        nom: "Généralisation et renforcement de stéréotypes",
        phase: "Informer",
        description: "Utilisation et amplification de clichés pour simplifier",
        mots_cles: ["tous les", "all the", "stéréotype", "stereotype", "cliché", "généralement", "generally", "typique", "typical"],
        weight: 1.6,
        type: "tactic"
    },
    {
        index: "TA0023",
        nom: "Supériorité familière",
        phase: "Informer",
        description: "Valorisation de ce qui est connu et familier",
        mots_cles: ["mieux", "better", "supérieur", "superior", "préférable", "preferable", "notre", "our", "familier", "familiar"],
        weight: 1.2,
        type: "tactic"
    },
    {
        index: "TA0024",
        nom: "Simplification",
        phase: "Informer",
        description: "Réduction excessive de la complexité",
        mots_cles: ["simple", "simple", "facile", "easy", "évident", "obvious", "clair", "clear", "suffit", "enough"],
        weight: 1.3,
        type: "tactic"
    },
    {
        index: "TA0025",
        nom: "Auto-référence",
        phase: "Informer",
        description: "Utilisation de références internes pour créer une cohérence artificielle",
        mots_cles: ["comme nous", "like us", "notre", "our", "nous-mêmes", "ourselves", "chez nous", "among us"],
        weight: 1.2,
        type: "tactic"
    },
    {
        index: "TA0026",
        nom: "Projection temporelle",
        phase: "Informer",
        description: "Manipulation de la perception du temps",
        mots_cles: ["bientôt", "soon", "déjà", "already", "encore", "still", "toujours", "always", "jamais", "never"],
        weight: 1.1,
        type: "tactic"
    },

// PHASE INFORMER - TECHNIQUES
    {
        index: "TE0211",
        nom: "Corrélation illusoire",
        phase: "Informer",
        description: "Présentation de corrélations trompeuses",
        mots_cles: ["corrélation", "similaire", "pareil", "comparaison", "lien", "relation"],
        weight: 1.3,
        type: "technique",
        tactic: "TA0021"
    },
    {
        index: "TE0212",
        nom: "Biais de la preuve anecdotique",
        phase: "Informer",
        description: "Généralisation basée sur des cas particuliers",
        mots_cles: ["cette histoire démontre", "anecdote", "exemple", "illustration","selon une étude","un témoignage","un témoin"],
        weight: 1.4,
        type: "technique",
        tactic: "TA0021"
    },
    {
        index: "TE0213",
        nom: "Illusion des séries",
        phase: "Informer",
        description: "Perception de motifs dans des données aléatoires",
        mots_cles: ["coïncidences", "motif", "données démontrent", "statistiques", "tendance"],
        weight: 1.1,
        type: "technique",
        tactic: "TA0021"
    },
    {
        index: "TE0221",
        nom: "Stéréotypes",
        phase: "Informer",
        description: "Généralisation excessive de groupes",
        mots_cles: ["tous les", "stéréotype", "les étrangers", "les immigrants", "all the", "toujours", "always", "jamais", "never", "en général", "in general", "les français", "americans"],
        weight: 1.6,
        type: "technique",
        tactic: "TA0022"
    },
    {
        index: "TE0231",
        nom: "Biais d'homogénéité",
        phase: "Informer",
        description: "Perception que tous les membres d'un groupe sont similaires",
        mots_cles: ["tous les", "Homogène", "tous pareil", "toutes choses égales par ailleurs", "tous"],
        weight: 1.2,
        type: "technique",
        tactic: "TA0022"
    },
    {
        index: "TE0232",
        nom: "Biais de la route connue",
        phase: "Informer",
        description: "Préférence pour les solutions familières",
        mots_cles: ["comme avant", "habitude", "habituel", "conserver", "rassurant"],
        weight: 0.9,
        type: "technique",
        tactic: "TA0023"
    },
    {
        index: "TE0241",
        nom: "Simplification excessive",
        phase: "Informer",
        description: "Réduction de problèmes complexes à des solutions simples",
        mots_cles: ["simple", "évident", "obvious", "clair", "clear", "facile", "easy", "suffit de", "just need to", "solution"],
        weight: 1.3,
        type: "technique",
        tactic: "TA0024"
    },
    {
        index: "TE0251",
        nom: "Faux consensus",
        phase: "Informer",
        description: "Illusion d'un accord général inexistant",
        mots_cles: ["tout le monde", "consensus", "convergence","everyone", "la plupart", "most people", "nous pensons", "we think", "accord"],
        weight: 1.4,
        type: "technique",
        tactic: "TA0025"
    },
    {
        index: "TE0261",
        nom: "Biais rétrospectif",
        phase: "Informer",
        description: "Illusion d'avoir prévu un événement après coup",
        mots_cles: ["j'avais dit", "nous étions prévenus", "on le savait","i told you", "prévisible", "predictable", "on aurait dû", "should have", "signes", "signs"],
        weight: 1.1,
        type: "technique",
        tactic: "TA0026"
    },

    // PHASE MEMORISER - TACTIQUES
    {
        index: "TA0031",
        nom: "Renforcement indirect",
        phase: "Mémoriser",
        description: "Consolidation subtile d'informations par répétition indirecte",
        mots_cles: ["renforce", "reinforces", "confirme", "confirms", "soutient", "supports", "appuie", "backs"],
        weight: 1.2,
        type: "tactic"
    },
    {
        index: "TA0032",
        nom: "Renforcement pré-existant",
        phase: "Mémoriser",
        description: "Activation de croyances déjà établies",
        mots_cles: ["comme prévu", "as expected", "j'avais raison", "I was right", "évident", "obvious", "logique", "logical"],
        weight: 1.3,
        type: "tactic"
    },
    {
        index: "TA0033",
        nom: "Exposition de contenus",
        phase: "Mémoriser",
        description: "Présentation répétée de contenus pour ancrage mémoriel",
        mots_cles: ["exposition", "exposure", "présentation", "presentation", "affichage", "display", "montrer", "show"],
        weight: 1.1,
        type: "tactic"
    },

    // PHASE MEMORISER - TECHNIQUES
    {
        index: "TE0312",
        nom: "Biais de la confusion des sources",
        phase: "Mémoriser",
        description: "Difficulté à distinguer les sources d'information",
        mots_cles: ["des sources affirment", "sources confirment", "rien ne démontre", "hasard ?", "les faits"],
        weight: 1.2,
        type: "technique",
        tactic: "TA0031"
    },
    {
        index: "TE0313",
        nom: "Effet d'espacement",
        phase: "Mémoriser",
        description: "Répétition espacée pour renforcer la mémorisation",
        mots_cles: ["comme déjà", "dans un article précédent", "rappelons", "comme nous l'avons vu"],
        weight: 1.0,
        type: "technique",
        tactic: "TA0033"
    },
    {
        index: "TE0314",
        nom: "Effet de suggestion",
        phase: "Mémoriser",
        description: "Implantation d'idées par suggestion indirecte",
        mots_cles: ["et si", "cela évoque", "évoquer", "image", "imaginez", "supposons"],
        weight: 1.1,
        type: "technique",
        tactic: "TA0031"
    },
    {
        index: "TE0321",
        nom: "Biais de confirmation",
        phase: "Mémoriser",
        description: "Recherche d'informations confirmant les croyances existantes",
        mots_cles: ["confirme", "cela démontre", "démontrer", "confirms", "prouve", "proves", "comme prévu", "as expected", "j'avais raison", "i was right", "évident", "obvious"],
        weight: 1.5,
        type: "technique",
        tactic: "TA0032"
    },
    {
        index: "TE0331",
        nom: "Effet de récence",
        phase: "Mémoriser",
        description: "Surpondération des informations récentes",
        mots_cles: ["récent", "recent", "nouveauté", "dernier", "last", "nouveau", "new", "frais", "fresh", "actuel", "current"],
        weight: 1.1,
        type: "technique",
        tactic: "TA0033"
    },
    {
        index: "TE0333",
        nom: "Effet de primauté",
        phase: "Mémoriser",
        description: "Surpondération des premières informations reçues",
        mots_cles: ["premier", "first", "initial", "début", "beginning", "origine", "origin", "primordial"],
        weight: 1.0,
        type: "technique",
        tactic: "TA0033"
    },

    // PHASE AGIR - TACTIQUES
    {
        index: "TA0041",
        nom: "Valorisation individuelle",
        phase: "Act",
        description: "Mise en avant des bénéfices personnels pour motiver l'action",
        mots_cles: ["vous bénéficiez", "you benefit", "votre avantage", "your advantage", "pour vous", "for you", "personnel", "personal"],
        weight: 1.3,
        type: "tactic"
    },
    {
        index: "TA0042",
        nom: "Renforcement escalatoire",
        phase: "Act",
        description: "Augmentation progressive de l'engagement demandé",
        mots_cles: ["progressivement", "progressively", "étape par étape", "step by step", "graduellement", "gradually", "petit à petit"],
        weight: 1.4,
        type: "tactic"
    },
    {
        index: "TA0043",
        nom: "Ozaekomi waza (contrôle par immobilisation)",
        phase: "Act",
        description: "Blocage des alternatives pour forcer une décision",
        mots_cles: ["seule option", "only option", "pas le choix", "no choice", "obligé", "forced", "contrainte", "constraint"],
        weight: 1.5,
        type: "tactic"
    },

    // PHASE AGIR - TECHNIQUES
    {
        index: "TE0411",
        nom: "Excès de confiance",
        phase: "Act",
        description: "Surestimation de ses propres capacités ou connaissances",
        mots_cles: ["confiant", "confident", "sûr", "sure", "certain", "capable", "expert", "maîtrise", "mastery"],
        weight: 1.2,
        type: "technique",
        tactic: "TA0041"
    },
    {
        index: "TE0421", 
        nom: "Coûts irrécupérables",
        phase: "Act",
        description: "Persistance dans une voie du fait d'investissements passés",
        mots_cles: ["continuer", "continue", "persister", "persist", "investir plus", "invest more", "ne pas abandonner", "don't give up"],
        weight: 1.1,
        type: "technique",
        tactic: "TA0042"
    },
    {
        index: "TE0422",
        nom: "Biais d'autorité",
        phase: "Act",
        description: "Influence excessive des figures d'autorité",
        mots_cles: ["autorité", "authority", "expert", "spécialiste", "specialist", "professeur", "professor", "docteur", "doctor", "officiel"],
        weight: 1.3,
        type: "technique",
        tactic: "TA0041"
    },
    {
        index: "TE0432",
        nom: "Biais du statu quo",
        phase: "Act",
        description: "Préférence pour maintenir l'état actuel",
        mots_cles: ["rester", "stay", "maintenir", "maintain", "ne pas changer", "don't change", "status quo", "comme ça", "as is"],
        weight: 1.0,
        type: "technique",
        tactic: "TA0043"
    },
    {
        index: "TE0501",
        nom: "FOMO",
        phase: "Act",
        description: "Peur de rater une opportunité",
        mots_cles: ["ne ratez pas", "don't miss", "dernière chance", "last chance", "limité", "limited", "exclusif", "exclusive", "hurry", "urgent"],
        weight: 1.4,
        type: "technique",
        tactic: "TA0041"
    }
];

// ===== CLASSE PRINCIPALE DIMA =====
class DIMAAnalyzer {
    constructor() {
        this.analysisResults = null;
        this.buttonCreated = false;
        this.cache = new Map();
        this.settings = {
            maxContentLength: 5000,
            minKeywordLength: 3,
            analysisDelay: 2000,
            debugMode: false,
            enhancedKeywords: true
        };
        this.pageType = this.detectPageType();
        this.init();
    }

    detectPageType() {
        const url = window.location.href.toLowerCase();
        if (url.includes('news') || url.includes('article') || url.includes('actualit')) return 'news';
        if (url.includes('blog')) return 'blog';
        if (url.includes('facebook') || url.includes('twitter') || url.includes('instagram')) return 'social';
        if (url.includes('shop') || url.includes('buy') || url.includes('product') || url.includes('commerce')) return 'commerce';
        return 'general';
    }

    init() {
        this.log('Initialisation DIMA avec mots-clés améliorés...');
        
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
        }, this.settings.analysisDelay);
    }

    log(message, data = null) {
        if (this.settings.debugMode) {
            console.log(`DIMA: ${message}`, data || '');
        }
    }
analyzeCurrentPage() {
        try {
            this.log('Analyse de la page...');
            
            const cacheKey = window.location.href + document.title;
            if (this.cache.has(cacheKey)) {
                this.analysisResults = this.cache.get(cacheKey);
                this.createButton();
                return;
            }
            
            const title = this.extractTitle();
            const content = this.extractContent();
            
            this.log('Titre extrait:', title);
            this.log('Contenu extrait:', `${content.length} caractères`);
            
            this.analysisResults = this.performAnalysis(title, content);
            this.cache.set(cacheKey, this.analysisResults);
            
            this.log('Analyse terminée, score:', this.analysisResults.globalScore);
            this.createButton();
            
        } catch (error) {
            console.error('DIMA: Erreur dans analyzeCurrentPage:', error);
        }
    }

    extractTitle() {
        const titleSources = [
            () => document.title,
            () => document.querySelector('meta[property="og:title"]')?.content,
            () => document.querySelector('meta[name="twitter:title"]')?.content,
            () => document.querySelector('h1')?.textContent?.trim(),
            () => document.querySelector('.title, .headline, [class*="title"]')?.textContent?.trim()
        ];

        return titleSources
            .map(fn => fn())
            .filter(Boolean)
            .join(' ')
            .substring(0, 500)
            .trim();
    }

    extractContent() {
        this.log('Début extraction de contenu...');
        
        const extractedTexts = new Set();
        let content = '';
        
        // Sélecteurs prioritaires pour le contenu principal
        const contentSelectors = [
            'article',
            '[role="main"]', 
            'main',
            '.article-content, .post-content, .entry-content',
            '.content, .story-body, .article-body',
            '#article-body, .post-body, .text-content'
        ];
        
        // Extraction du contenu principal
        for (const selector of contentSelectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                this.log(`Contenu trouvé avec: ${selector}`);
                content += this.extractTextFromElements(elements, extractedTexts);
                if (content.length > 1000) break;
            }
        }
        
        // Fallback si contenu insuffisant
        if (content.length < 300) {
            this.log('Contenu insuffisant, utilisation de fallbacks...');
            const fallbackSelectors = [
                'p, h1, h2, h3, h4, h5, h6',
                '.text, .description, .summary',
                '[class*="content"], [class*="text"]',
                'blockquote, figcaption'
            ];
            
            for (const selector of fallbackSelectors) {
                const elements = document.querySelectorAll(selector);
                content += this.extractTextFromElements(elements, extractedTexts, 30);
                if (content.length > 1500) break;
            }
        }
        
        // Dernier recours
        if (content.length < 200) {
            this.log('Dernier recours - texte visible');
            const bodyText = this.cleanText(document.body.innerText);
            content = bodyText.substring(0, this.settings.maxContentLength);
        }
        
        const finalContent = content.substring(0, this.settings.maxContentLength).trim();
        this.log(`Extraction terminée: ${finalContent.length} caractères`);
        
        return finalContent;
    }

    extractTextFromElements(elements, extractedTexts, maxElements = 100) {
        let text = '';
        const elementsArray = Array.from(elements).slice(0, maxElements);
        
        for (const element of elementsArray) {
            if (this.shouldSkipElement(element)) continue;
            
            const elementText = this.cleanText(element.textContent || element.innerText);
            if (elementText && 
                elementText.length > 15 && 
                !extractedTexts.has(elementText)) {
                extractedTexts.add(elementText);
                text += elementText + ' ';
                
                if (text.length > this.settings.maxContentLength) break;
            }
        }
        
        return text;
    }

    shouldSkipElement(element) {
        const skipClasses = ['nav', 'menu', 'footer', 'header', 'sidebar', 'ad', 'advertisement', 'social', 'share'];
        const skipIds = ['nav', 'menu', 'footer', 'header', 'sidebar', 'comments'];
        
        const className = element.className?.toLowerCase() || '';
        const id = element.id?.toLowerCase() || '';
        
        return skipClasses.some(skip => className.includes(skip)) ||
               skipIds.some(skip => id.includes(skip)) ||
               element.getAttribute('aria-hidden') === 'true' ||
               getComputedStyle(element).display === 'none';
    }

    cleanText(text) {
        if (!text) return '';
        
        return text
            .replace(/\s+/g, ' ')
            .replace(/[\r\n\t]/g, ' ')
            .replace(/[^\w\s\.,!?;:()\-'"%àâäéèêëïîôöùûüÿç]/gi, '')
            .trim();
    }

    performAnalysis(title, content) {
        const fullText = (title + ' ' + content).toLowerCase();
        const detected = [];
        let totalScore = 0;
        const phaseScores = {};

        this.log('Analyse du texte...', fullText.substring(0, 200));

        // Analyser SEULEMENT les techniques (TE), pas les tactiques (TA)
        const techniques = DIMA_TECHNIQUES.filter(item => item.type === 'technique');
        
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
            detectedTechniques: detected.sort((a, b) => b.weightedScore - a.weightedScore),
            phaseScores,
            riskLevel: this.calculateRiskLevel(globalScore),
            riskColor: this.getColor(globalScore),
            url: window.location.href,
            title: title.substring(0, 200),
            contentLength: content.length,
            analyzedText: fullText.length,
            timestamp: new Date().toISOString()
        };
    }

    // ===== ANALYSE AMÉLIORÉE DES TECHNIQUES =====
    analyzeTechnique(technique, fullText) {
        // Utiliser le système amélioré si disponible et activé
        if (this.settings.enhancedKeywords && DIMA_ENHANCED_KEYWORDS[technique.index]) {
            return this.analyzeEnhancedTechnique(technique, fullText);
        }
        
        // Fallback vers l'ancienne méthode
        return this.analyzeBasicTechnique(technique, fullText);
    }

    analyzeEnhancedTechnique(technique, fullText) {
        const enhancedData = DIMA_ENHANCED_KEYWORDS[technique.index];
        const results = {
            matches: [],
            score: 0,
            contextBoosts: []
        };

        // 1. Analyse des mots-clés de base
        if (enhancedData.core) {
            const coreMatches = this.findKeywordMatches(fullText, enhancedData.core, 1.0);
            results.matches.push(...coreMatches);
        }

        // 2. Analyse des variantes
        if (enhancedData.variants) {
            for (const [category, variants] of Object.entries(enhancedData.variants)) {
                if (Array.isArray(variants)) {
                    const weight = this.getVariantWeight(category);
                    const variantMatches = this.findKeywordMatches(fullText, variants, weight);
                    results.matches.push(...variantMatches.map(m => ({...m, category})));
                } else if (typeof variants === 'object') {
                    // Variantes avec sous-catégories (ex: intensity.strong)
                    for (const [subcat, subvariants] of Object.entries(variants)) {
                        const weight = this.getIntensityWeight(subcat);
                        const subMatches = this.findKeywordMatches(fullText, subvariants, weight);
                        results.matches.push(...subMatches.map(m => ({...m, category: `${category}.${subcat}`})));
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
        results.score = results.matches.reduce((sum, match) => sum + match.weight, 0);

        // 6. Application des boosts contextuels
        let finalScore = results.score;
        for (const boost of contextBoosts) {
            finalScore *= boost.boost;
        }

        // 7. Pondération contextuelle et dynamique
        let contextualWeight = this.calculateContextualWeight(technique, this.pageType);
        let dynamicWeight = this.calculateDynamicWeight(technique, finalScore);
        
        const totalWeight = (technique.weight || 1.0) * contextualWeight * dynamicWeight;
        const weightedScore = finalScore * totalWeight;
        
        const confidence = Math.min(Math.round(results.score * 15 + results.matches.length * 10), 100);

        return {
            index: technique.index,
            nom: technique.nom,
            phase: technique.phase,
            description: technique.description || '',
            score: Math.round(finalScore),
            weightedScore,
            finalWeight: totalWeight,
            contextualWeight,
            dynamicWeight,
            confidence,
            matchedKeywords: this.formatEnhancedMatches(results.matches),
            enhancedAnalysis: {
                coreMatches: results.matches.filter(m => m.type === 'core').length,
                variantMatches: results.matches.filter(m => m.type === 'variant').length,
                patternMatches: results.matches.filter(m => m.type === 'pattern').length,
                contextBoosts: results.contextBoosts
            }
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
                    type: 'basic'
                });
            }
        }

        // Pondération contextuelle et dynamique
        let contextualWeight = this.calculateContextualWeight(technique, this.pageType);
        let dynamicWeight = this.calculateDynamicWeight(technique, score);
        
        const finalWeight = (technique.weight || 1.0) * contextualWeight * dynamicWeight;
        const weightedScore = score * finalWeight;
        
        const confidence = Math.min(Math.round(score * 15 + weightedScore * 5), 100);

        return {
            index: technique.index,
            nom: technique.nom,
            phase: technique.phase,
            description: technique.description || '',
            score,
            weightedScore,
            finalWeight,
            contextualWeight,
            dynamicWeight,
            confidence,
            matchedKeywords
        };
    }
    // ===== MÉTHODES UTILITAIRES POUR L'ANALYSE =====
    findKeywordMatches(text, keywords, weight = 1.0) {
        const matches = [];
        
        for (const keyword of keywords) {
            const keywordLower = keyword.toLowerCase();
            let regex;
            
            if (keywordLower.includes(' ')) {
                // Expression avec espaces
                regex = new RegExp(this.escapeRegex(keywordLower), 'gi');
            } else {
                // Mot simple avec frontières
                regex = new RegExp('\\b' + this.escapeRegex(keywordLower) + '\\b', 'gi');
            }
            
            let match;
            while ((match = regex.exec(text)) !== null) {
                matches.push({
                    type: 'core',
                    keyword: keyword,
                    position: match.index,
                    weight: weight
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
                type: 'pattern',
                keyword: match[0],
                position: match.index,
                weight: 1.5 // Les patterns ont un poids plus élevé
            });
            
            // Éviter les boucles infinies
            if (!pattern.global) break;
        }
        
        return matches;
    }

    analyzeContext(text, techniqueId) {
        const boosts = [];
        
        for (const [contextType, contextData] of Object.entries(CONTEXT_PATTERNS)) {
            if (contextData.techniques.includes(techniqueId)) {
                for (const pattern of contextData.patterns) {
                    if (pattern.test(text)) {
                        boosts.push({
                            type: contextType,
                            boost: contextData.boost,
                            pattern: pattern.source
                        });
                    }
                }
            }
        }

        return boosts;
    }

    getVariantWeight(category) {
        const weights = {
            'formal': 0.9,
            'informal': 1.1,
            'clickbait_formulas': 1.6,
            'emotional_hooks': 1.4,
            'curiosity_gaps': 1.5,
            'urgency': 1.3,
            'scarcity': 1.4,
            'temporal': 1.2
        };
        return weights[category] || 1.0;
    }

    getIntensityWeight(intensity) {
        const weights = {
            'weak': 0.7,
            'strong': 1.5
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
                    totalWeight: 0
                };
            }
            grouped[key].count++;
            grouped[key].totalWeight += match.weight;
        }
        
        return Object.values(grouped);
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    calculateRiskLevel(score) {
        if (score < 15) return 'Faible';
        if (score < 30) return 'Modéré';
        if (score < 50) return 'Élevé';
        if (score < 75) return 'Très Élevé';
        return 'Critique';
    }

    // ===== PONDÉRATION CONTEXTUELLE =====
    calculateContextualWeight(technique, pageType) {
        let contextualWeight = 1.0;
        
        switch (pageType) {
            case 'news':
                if (technique.index === 'TE0500') contextualWeight = 1.4; // Clickbait très grave
                if (technique.index === 'TE0132') contextualWeight = 1.3; // Biais négativité plus suspect
                if (technique.index === 'TE0221') contextualWeight = 1.5; // Stéréotypes inacceptables
                if (technique.index === 'TE0212') contextualWeight = 1.3; // Preuves anecdotiques problématiques
                if (technique.index === 'TE0261') contextualWeight = 0.8; // Biais rétrospectif plus normal
                break;
                
            case 'social':
                if (technique.index === 'TE0132') contextualWeight = 0.9; // Négativité plus courante
                if (technique.index === 'TE0131') contextualWeight = 0.8; // Bizarrerie normale
                if (technique.index === 'TE0501') contextualWeight = 1.3; // FOMO plus manipulatoire
                if (technique.index === 'TE0221') contextualWeight = 1.6; // Stéréotypes très graves
                if (technique.index === 'TE0251') contextualWeight = 1.2; // Faux consensus suspect
                break;
                
            case 'commerce':
                if (technique.index === 'TE0501') contextualWeight = 0.9; // FOMO plus normale
                if (technique.index === 'TE0141') contextualWeight = 0.8; // Effet Restorff marketing normal
                if (technique.index === 'TE0143') contextualWeight = 0.7; // Comparaisons normales
                if (technique.index === 'TE0422') contextualWeight = 1.2; // Fausse autorité problématique
                if (technique.index === 'TE0411') contextualWeight = 1.1; // Excès confiance suspect
                break;
                
            case 'blog':
                if (technique.index === 'TE0212') contextualWeight = 0.8; // Anecdotes plus normales
                if (technique.index === 'TE0314') contextualWeight = 0.9; // Suggestions plus acceptables
                if (technique.index === 'TE0261') contextualWeight = 0.7; // Biais rétrospectif courant
                if (technique.index === 'TE0321') contextualWeight = 1.1; // Biais confirmation suspect
                break;
        }
        
        this.log(`Poids contextuel pour ${technique.index} sur ${pageType}: ${contextualWeight}`);
        return contextualWeight;
    }

    // ===== PONDÉRATION DYNAMIQUE =====
    calculateDynamicWeight(technique, occurrences) {
        let dynamicWeight = 1.0;
        
        // Plus une technique apparaît, plus elle devient suspecte
        if (occurrences >= 10) {
            dynamicWeight = 1.4; // Très suspect si >10 occurrences
        } else if (occurrences >= 7) {
            dynamicWeight = 1.3; // Suspect si 7-9 occurrences
        } else if (occurrences >= 5) {
            dynamicWeight = 1.2; // Légèrement suspect si 5-6 occurrences
        } else if (occurrences >= 3) {
            dynamicWeight = 1.1; // Un peu suspect si 3-4 occurrences
        }
        
        // Cas spéciaux : certaines techniques sont plus graves même avec peu d'occurrences
        const criticalTechniques = ['TE0221', 'TE0500', 'TE0132', 'TE0501'];
        if (criticalTechniques.includes(technique.index) && occurrences >= 2) {
            dynamicWeight *= 1.1; // Bonus de gravité pour techniques critiques
        }
        
        // Réduire le poids si technique très fréquente mais bénigne
        const benignTechniques = ['TE0143', 'TE0232', 'TE0333'];
        if (benignTechniques.includes(technique.index) && occurrences >= 5) {
            dynamicWeight *= 0.9; // Réduction pour techniques bénignes trop fréquentes
        }
        
        this.log(`Poids dynamique pour ${technique.index} (${occurrences} occ.): ${dynamicWeight}`);
        return dynamicWeight;
    }

    getColor(score) {
        if (score < 15) return '#27ae60';      // Vert
        if (score < 30) return '#f39c12';      // Orange clair
        if (score < 50) return '#e67e22';      // Orange
        if (score < 75) return '#d35400';      // Rouge-orange
        return '#c0392b';                      // Rouge foncé
    }

    // ===== INTERFACE UTILISATEUR =====
    createButton() {
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

            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 20px; max-width: 900px; max-height: 90vh; overflow-y: auto; margin: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.3); animation: slideIn 0.3s ease-out;">
                    
                    <!-- En-tête -->
                    <div style="text-align: center; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 10px;">
                            🧠
                            <h2 style="color: #2c3e50; margin: 0; font-size: 1.8em;">Analyse DIMA (Améliorée)</h2>
                        </div>
                        <p style="color: #7f8c8d; margin: 0; font-size: 0.95em;">
                            Détection de manipulation cognitive par 
                            <a href="https://diod.m82-project.org/" target="_blank" 
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

// ===== INITIALISATION ET STYLES =====

// CSS pour les animations
const style = document.createElement('style');
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
console.log('DIMA: Script chargé - Version complète avec mots-clés améliorés');

try {
    const analyzer = new DIMAAnalyzer();
    console.log(`DIMA: Analyseur initialisé pour page de type: ${analyzer.pageType}`);
} catch (error) {
    console.error('DIMA: Erreur d\'initialisation critique:', error);
}
