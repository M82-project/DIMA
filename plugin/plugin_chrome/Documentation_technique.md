# Méthode d'analyse DIMA - Documentation technique

## **1. Processus d'analyse d'une page web**

### **Phase 1 : Extraction du contenu** 🔍

#### **A. Extraction du titre**
```javascript
// Sources prioritaires pour le titre
1. document.title (titre de la page)
2. meta[property="og:title"] (Open Graph)
3. meta[name="twitter:title"] (Twitter Cards)
4. Premier <h1> de la page
5. Éléments avec classes .title, .headline
```

#### **B. Extraction du contenu textuel**
```javascript
// Sélecteurs prioritaires (dans l'ordre)
1. <article> - Contenu éditorial principal
2. [role="main"], <main> - Zone principale
3. .article-content, .post-content, .entry-content
4. .content, .story-body, .article-body
5. #article-body, .post-body, .text-content

// Fallbacks si contenu insuffisant
- <p>, <h1-h6> - Paragraphes et titres
- .text, .description, .summary
- [class*="content"], [class*="text"]
- <blockquote>, <figcaption>
```

#### **C. Filtrage intelligent**
```javascript
// Éléments ignorés
- Navigation (nav, menu)
- En-têtes et pieds de page (header, footer)
- Barres latérales (sidebar)
- Publicités (ad, advertisement)
- Boutons sociaux (social, share)
- Commentaires (comments)
- Éléments cachés (display: none)
```

#### **D. Nettoyage du texte**
```javascript
// Normalisation
- Suppression des caractères spéciaux
- Normalisation des espaces
- Conversion en minuscules
- Limitation à 5000 caractères max
```

### **Phase 2 : Analyse des techniques** 🎯

#### **A. Sélection des techniques**
```javascript
// Filtrage : uniquement les techniques (TE), pas les tactiques (TA)
const techniques = DIMA_TECHNIQUES.filter(item => item.type === 'technique');
// Résultat : 20 techniques analysées
```

#### **B. Analyse basique vs améliorée**

**Mode basique** (mots-clés simples) :
```javascript
// Recherche directe dans le texte
for (keyword in technique.mots_cles) {
    if (text.includes(keyword)) {
        score += 1;
    }
}
```

**Mode amélioré** (système avancé) :
```javascript
// 1. Mots-clés de base (core)
score += analyzeCore(enhancedData.core);

// 2. Variantes avec pondération
score += analyzeVariants(enhancedData.variants);

// 3. Patterns regex complexes
score += analyzePatterns(enhancedData.patterns);

// 4. Analyse contextuelle
boosts = analyzeContext(text, techniqueId);
```

## **2. Méthode de calcul de l'index DIMA**

### **Étape 1 : Score brut par technique** 📈

```javascript
// Pour chaque technique détectée
rawScore = nombreOccurrences * multiplicateurVariante

// Exemple : TE0500 (Clickbait)
// - "vous ne croirez pas" (core) : +1.0
// - "révélation choc" (clickbait_formula) : +1.6  
// - Pattern "X choses que..." : +1.5
// Score brut = 4.1
```

### **Étape 2 : Pondération contextuelle** 🎯

```javascript
// Adaptation selon le type de page
switch(pageType) {
    case 'news':
        if (TE0500) contextWeight = 1.4; // Clickbait plus grave
        if (TE0132) contextWeight = 1.3; // Négativité suspecte
        break;
    case 'commerce':
        if (TE0501) contextWeight = 0.9; // FOMO plus normale
        if (TE0143) contextWeight = 0.7; // Comparaisons normales
        break;
}
```

### **Étape 3 : Pondération dynamique** 

```javascript
// Selon la fréquence d'apparition
if (occurrences >= 10) dynamicWeight = 1.4;      // Très suspect
else if (occurrences >= 7) dynamicWeight = 1.3;  // Suspect  
else if (occurrences >= 5) dynamicWeight = 1.2;  // Légèrement suspect
else if (occurrences >= 3) dynamicWeight = 1.1;  // Un peu suspect
else dynamicWeight = 1.0;                         // Normal

// Bonus pour techniques critiques
if (isCritical && occurrences >= 2) dynamicWeight *= 1.1;
```

### **Étape 4 : Boosts contextuels** 

```javascript
// Multiplicateurs selon le contexte détecté
const contextBoosts = {
    urgency: 1.3,    // Mots d'urgence détectés
    authority: 1.4,   // Références d'autorité
    social_proof: 1.2 // Preuve sociale
};

// Application des boosts
for (boost of contextBoosts) {
    finalScore *= boost.value;
}
```

### **Étape 5 : Score pondéré final** 

```javascript
// Calcul complet pour une technique
const baseWeight = technique.weight || 1.0;        // Poids de base (ex: 1.5 pour clickbait)
const totalWeight = baseWeight * contextualWeight * dynamicWeight;
const weightedScore = finalScore * totalWeight;

// Exemple concret :
// TE0500 sur site d'actualités avec 6 occurrences
// baseWeight = 1.5 (clickbait)
// contextualWeight = 1.4 (site news)  
// dynamicWeight = 1.2 (6 occurrences)
// totalWeight = 1.5 × 1.4 × 1.2 = 2.52
// weightedScore = 4.1 × 2.52 = 10.3
```

### **Étape 6 : Score global de la page** 

```javascript
// Agrégation de toutes les techniques détectées
let totalScore = 0;
for (technique of detectedTechniques) {
    totalScore += technique.weightedScore;
}

// Normalisation finale
const globalScore = Math.min(Math.round(totalScore * 3), 100);
```

## **3. Exemple de calcul complet**

### **Page analysée** : Article clickbait sur site d'actualités

```javascript
// Techniques détectées :
TE0500 (Clickbait): 
- Score brut: 4.1
- Poids: 1.5 × 1.4 × 1.2 = 2.52  
- Score pondéré: 10.3

TE0132 (Biais négativité):
- Score brut: 2.0
- Poids: 1.4 × 1.3 × 1.0 = 1.82
- Score pondéré: 3.6

TE0212 (Preuve anecdotique):
- Score brut: 1.0  
- Poids: 1.4 × 1.3 × 1.0 = 1.82
- Score pondéré: 1.8

// Total : 10.3 + 3.6 + 1.8 = 15.7
// Score global : min(15.7 × 3, 100) = 47
// Niveau de risque : "Élevé"
```


------------------------------------------------------------------------------------------------------------

# ⚖️ Système de pondération DIMA - Guide complet
-------------------------------------------------------------------------------------------------------------

## **1. Architecture du système de poids**

### **Hiérarchie des pondérations** 🏗️

```javascript
Score Final = Score Brut × Poids Base × Poids Contextuel × Poids Dynamique × Boosts
```

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌──────────────┐
│   Score Brut    │ ×  │   Poids Base     │ ×  │ Poids Contextuel│ ×  │Poids Dynamique│
│ (occurrences)   │    │ (par technique)  │    │ (type de page)  │    │ (fréquence)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘    └──────────────┘
                                                        ↓
                                                ┌──────────────┐
                                                │   Boosts     │
                                                │ (contextuels)│
                                                └──────────────┘
```

## **2. Poids de base par technique**

### **Classification par gravité** 📊

#### **🔴 Très élevé (1.4-1.6)**
```javascript
TE0132: 1.4,  // Biais de négativité - Joue sur la peur
TE0501: 1.4,  // FOMO - Manipulation pure
TE0500: 1.5,  // Clickbait - Tromperie délibérée
TE0221: 1.6   // Stéréotypes - Impact social grave
```

#### **🟠 Élevé (1.1-1.3)**
```javascript
TE0131: 1.3,  // Effet de bizarrerie - Sensationnalisme
TE0212: 1.4,  // Preuve anecdotique - Fausse généralisation
TE0251: 1.4,  // Faux consensus - Illusion d'accord
TE0321: 1.5   // Biais de confirmation - Renforce les préjugés
```

#### **🟡 Modéré (1.0-1.1)**
```javascript
TE0111: 1.0,  // Heuristique disponibilité - Biais naturel
TE0112: 1.2,  // Simple exposition - Répétition
TE0121: 1.1,  // Illusion fréquence - Perception biaisée
```

#### **🟢 Faible (0.8-0.9)**
```javascript
TE0143: 0.8,  // Effet de contraste - Comparaison normale
TE0232: 0.9   // Route connue - Préférence naturelle
```

### **Justification des poids** 🧠

| Technique | Poids | Justification |
|-----------|-------|---------------|
| **TE0221 (Stéréotypes)** | **1.6** | Impact social majeur, discrimination, propagation de préjugés |
| **TE0500 (Clickbait)** | **1.5** | Manipulation pure pour générer des clics, tromperie délibérée |
| **TE0132 (Négativité)** | **1.4** | Exploitation de la peur, impact émotionnel fort |
| **TE0501 (FOMO)** | **1.4** | Création d'urgence artificielle, pression psychologique |
| **TE0143 (Contraste)** | **0.8** | Technique normale de comparaison, usage légitime |

## **3. Pondération contextuelle**

### **Adaptation selon le type de page** 🎯

#### **Sites d'actualités (news)**
```javascript
case 'news':
    TE0500 → ×1.4  // Clickbait inacceptable dans l'info
    TE0132 → ×1.3  // Négativité suspecte 
    TE0221 → ×1.5  // Stéréotypes graves
    TE0212 → ×1.3  // Preuves anecdotiques problématiques
    TE0261 → ×0.8  // Biais rétrospectif plus normal
```

#### **Réseaux sociaux (social)**
```javascript
case 'social':
    TE0132 → ×0.9  // Négativité plus courante
    TE0131 → ×0.8  // Bizarrerie normale
    TE0501 → ×1.3  // FOMO plus manipulatoire
    TE0221 → ×1.6  // Stéréotypes très graves
    TE0251 → ×1.2  // Faux consensus suspect
```

#### **Sites commerciaux (commerce)**
```javascript
case 'commerce':
    TE0501 → ×0.9  // FOMO plus normale en marketing
    TE0141 → ×0.8  // Unicité = argument de vente normal
    TE0143 → ×0.7  // Comparaisons légitimes
    TE0422 → ×1.2  // Fausse autorité problématique
    TE0411 → ×1.1  // Excès confiance suspect
```

#### **Blogs personnels (blog)**
```javascript
case 'blog':
    TE0212 → ×0.8  // Anecdotes plus normales
    TE0314 → ×0.9  // Suggestions plus acceptables
    TE0261 → ×0.7  // Biais rétrospectif courant
    TE0321 → ×1.1  // Biais confirmation suspect
```

### **Exemple concret** 📝

```javascript
// TE0500 (Clickbait) détecté
// Site d'actualités vs Site commercial

// Site d'actualités :
baseWeight = 1.5
contextualWeight = 1.4  // Très grave dans l'info
finalWeight = 1.5 × 1.4 = 2.1

// Site commercial :
baseWeight = 1.5  
contextualWeight = 1.0  // Normal en marketing
finalWeight = 1.5 × 1.0 = 1.5

// Impact : 40% plus sévère sur site d'actualités
```

## **4. Pondération dynamique**

### **Selon la fréquence d'apparition** 📈

```javascript
calculateDynamicWeight(technique, occurrences) {
    if (occurrences >= 10) return 1.4;      // 🔴 Très suspect
    if (occurrences >= 7)  return 1.3;      // 🟠 Suspect  
    if (occurrences >= 5)  return 1.2;      // 🟡 Légèrement suspect
    if (occurrences >= 3)  return 1.1;      // 🟢 Un peu suspect
    return 1.0;                             // ⚪ Normal
}
```

### **Règles spéciales** ⚡

#### **Techniques critiques** 🚨
```javascript
const criticalTechniques = ['TE0221', 'TE0500', 'TE0132', 'TE0501'];

// Bonus si ≥2 occurrences d'une technique critique
if (isCritical && occurrences >= 2) {
    dynamicWeight *= 1.1;  // +10% supplémentaire
}
```

#### **Techniques bénignes** 🟢
```javascript
const benignTechniques = ['TE0143', 'TE0232', 'TE0333'];

// Réduction si technique bénigne très fréquente
if (isBenign && occurrences >= 5) {
    dynamicWeight *= 0.9;  // -10%
}
```

### **Courbe de pondération dynamique** 📊

```
Poids dynamique
    ↑
1.4 |     ●────────────  (≥10 occurrences)
1.3 |   ●─┘              (7-9 occurrences) 
1.2 | ●─┘                (5-6 occurrences)
1.1 |●┘                  (3-4 occurrences)
1.0 ●────────────────── → Occurrences
    0  1  2  3  4  5  6  7  8  9  10+
```

## **5. Boosts contextuels**

### **Multiplicateurs selon le contexte détecté** 🚀

```javascript
const CONTEXT_PATTERNS = {
    urgency: {
        boost: 1.3,  // +30%
        patterns: [
            /urgent|rapidement|vite|immédiatement/i,
            /dernière\s+chance|temps\s+limité/i
        ],
        techniques: ['TE0501', 'TE0500']
    },
    
    authority: {
        boost: 1.4,  // +40%  
        patterns: [
            /selon\s+(?:les\s+)?(?:experts?|docteurs?)/i,
            /étude\s+(?:révèle|montre|démontre)/i
        ],
        techniques: ['TE0422', 'TE0212']
    },
    
    social_proof: {
        boost: 1.2,  // +20%
        patterns: [
            /\d+(?:\.\d+)?[km]?\s+personnes?\s+(?:utilisent|pensent)/i,
            /tout\s+le\s+monde|viral|tendance/i
        ],
        techniques: ['TE0251', 'TE0221']
    }
};
```

### **Application des boosts** ⚡

```javascript
// Exemple : TE0501 (FOMO) avec contexte d'urgence
score = 3.0  // Score de base
contextualWeight = 1.0
dynamicWeight = 1.1  // 3 occurrences

// Détection du contexte "urgency"
urgencyBoost = 1.3

// Calcul final
finalScore = 3.0 × 1.3 = 3.9  // Application du boost
weightedScore = 3.9 × 1.4 × 1.0 × 1.1 = 6.0
```

## **6. Calcul final complet**

### **Exemple détaillé** 📊

```javascript
// Page d'actualités avec article clickbait

// TE0500 (Clickbait) détecté
rawScore = 4.1           // 2 core + 1 variant + 1 pattern
baseWeight = 1.5         // Poids élevé du clickbait
contextualWeight = 1.4   // Site d'actualités
dynamicWeight = 1.2      // 6 occurrences  
urgencyBoost = 1.3       // Mots d'urgence détectés

// Étapes de calcul :
1. Score avec boost: 4.1 × 1.3 = 5.33
2. Poids total: 1.5 × 1.4 × 1.2 = 2.52  
3. Score pondéré: 5.33 × 2.52 = 13.4

// Résultat : Cette technique contribue 13.4 points au score global
```

### **Impact des pondérations** 📈

```javascript
// Comparaison avec/sans pondération

// Sans pondération :
simpleScore = 4.1 points

// Avec pondération complète :
weightedScore = 13.4 points

// Facteur multiplicateur : ×3.27
// → Le système de pondération amplifie significativement 
//   les techniques problématiques dans des contextes suspects
```

## **7. Avantages du système**

### **Précision** 🎯
- **Réduction des faux positifs** : Techniques marketing normales moins pénalisées
- **Amplification des vrais positifs** : Manipulation grave détectée avec précision

### **Contextualisation** 🌍  
- **Adaptation intelligente** : Même technique jugée différemment selon le contexte
- **Réalisme** : Prise en compte des usages légitimes

### **Granularité** ⚖️
- **Nuances fines** : 16 niveaux de poids différents
- **Évolutivité** : Facile d'ajuster les seuils selon l'expérience

### **Transparence** 🔍
- **Traçabilité complète** : Chaque coefficient est visible et justifié
- **Debug facilité** : Possibilité de suivre chaque étape du calcul

Ce système de pondération transforme un simple compteur de mots-clés en un analyseur sophistiqué capable de distinguer manipulation intentionnelle et usage légitime des techniques de persuasion.
