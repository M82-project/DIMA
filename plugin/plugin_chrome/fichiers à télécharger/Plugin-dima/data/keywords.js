// DIMA Enhanced Keywords Database
// Enhanced keyword patterns for manipulation technique detection

const DIMA_ENHANCED_KEYWORDS = {
  TE0111: {
    core: ["exemple", "cas", "témoignage", "example", "case", "testimony"],
    variants: {
      formal: ["illustration", "démonstration", "spécimen"],
      informal: ["vécu", "expérience unique"],
      intensity: {
        weak: ["petit exemple", "simple cas"],
        strong: ["exemple frappant", "cas édifiant", "témoignage bouleversant"],
      },
    },
    patterns: [
      /(?:par\s+exemple|for\s+example|comme\s+dans\s+le\s+cas)/i,
      /(?:prenons\s+l'exemple|take\s+the\s+example)/i,
    ],
  },

  TE0500: {
    core: ["secret", "choquant", "incroyable", "shocking", "amazing"],
    variants: {
      clickbait_formulas: [
        "vous ne croirez pas",
        "ce qui arrive ensuite",
        "you won't believe",
        "what happens next",
        "les experts détestent",
        "un truc simple",
        "cette astuce",
        "révélation choc",
        "doctors hate this",
      ],
      emotional_hooks: [
        "ça va vous surprendre",
        "préparez-vous",
        "attention",
        "exclusif",
        "urgent",
        "will shock you",
        "prepare yourself",
      ],
      curiosity_gaps: [
        "la raison va vous étonner",
        "voici pourquoi",
        "découvrez comment",
        "la vérité sur",
        "the reason will amaze you",
        "here's why",
      ],
    },
    patterns: [
      /\d+\s+(?:choses|façons|méthodes|secrets|things|ways|methods)\s+(?:que|pour|de|to|that)/i,
      /(?:voici|découvrez|here's|discover)\s+(?:comment|pourquoi|ce que|how|why|what)/i,
      /(?:cette|cette|this)\s+\w+\s+va\s+vous\s+(?:\w+|will)/i,
      /(?:shocking|amazing|incredible)\s+(?:secret|truth|fact)/i,
    ],
  },

  TE0132: {
    core: [
      "catastrophe",
      "panique",
      "chaos",
      "disaster",
      "danger",
      "menace",
      "threat",
      "risque",
      "risk",
      "grave",
      "serious",
      "crise",
      "crisis",
    ],
    variants: {
      intensity: {
        weak: ["problème", "difficulté", "souci", "issue", "concern"],
        strong: [
          "catastrophe majeure",
          "crise grave",
          "danger mortel",
          "major catastrophe",
          "deadly danger",
        ],
      },
      temporal: ["imminent", "proche", "bientôt", "soon", "approaching"],
    },
    patterns: [
      /(?:alerte|alert|warning|attention)\s+(?:rouge|red|maximum)/i,
      /(?:situation|crisis|problem)\s+(?:critique|critical|dramatique|dramatic)/i,
    ],
  },

  TE0501: {
    core: [
      "ne ratez pas",
      "don't miss",
      "dernière chance",
      "last chance",
      "limité",
      "limited",
      "exclusif",
      "exclusive",
    ],
    variants: {
      urgency: [
        "dépêchez-vous",
        "hurry up",
        "vite",
        "quickly",
        "maintenant ou jamais",
        "now or never",
      ],
      scarcity: [
        "stock limité",
        "places limitées",
        "limited stock",
        "limited seats",
        "offre limitée",
      ],
    },
    patterns: [
      /(?:seulement|only)\s+\d+\s+(?:jours?|heures?|minutes?|days?|hours?|minutes?)/i,
      /(?:expire|ends?)\s+(?:bientôt|soon|today|demain|tomorrow)/i,
    ],
  },
};

const CONTEXT_PATTERNS = {
  urgency: {
    patterns: [
      /(?:urgent|rapidement|vite|immédiatement|maintenant|now|quickly|immediately)/i,
      /(?:dernière\s+chance|temps\s+limité|offre\s+limitée|last\s+chance|limited\s+time)/i,
      /(?:dépêchez-vous|ne\s+ratez\s+pas|hurry|don't\s+miss)/i,
    ],
    boost: 1.3,
    techniques: ["TE0501", "TE0500"],
  },
  authority: {
    patterns: [
      /(?:selon\s+(?:les\s+)?(?:experts?|spécialistes?|docteurs?|doctors?|experts?))/i,
      /(?:étude\s+(?:révèle|montre|démontre|shows?|reveals?))/i,
      /(?:recherche\s+(?:scientifique|universitaire|scientific|university))/i,
    ],
    boost: 1.4,
    techniques: ["TE0422", "TE0212"],
  },
  social_proof: {
    patterns: [
      /(?:\d+(?:\.\d+)?[km]?\s+personnes?\s+(?:utilisent|font|pensent|people\s+(?:use|do|think)))/i,
      /(?:tout\s+le\s+monde|la\s+plupart\s+des\s+gens|everyone|most\s+people)/i,
      /(?:viral|tendance|populaire|trending|popular)/i,
    ],
    boost: 1.2,
    techniques: ["TE0251", "TE0221"],
  },
};

// Make keywords and patterns available globally for Chrome extension
window.DIMA_ENHANCED_KEYWORDS = DIMA_ENHANCED_KEYWORDS;
window.CONTEXT_PATTERNS = CONTEXT_PATTERNS;
