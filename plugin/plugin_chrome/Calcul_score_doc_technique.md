# Calcul du Score DIMA - Documentation Technique

## Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture du système](#architecture-du-système)
3. [Processus de calcul détaillé](#processus-de-calcul-détaillé)
4. [Pondérations et coefficients](#pondérations-et-coefficients)
5. [Contextes Regex](#contextes-regex)
6. [Niveaux de risque](#niveaux-de-risque)
7. [Exemples de calcul](#exemples-de-calcul)

---

## Vue d'ensemble

Le **score DIMA** (Détection et Identification des Manipulations en ligne et Analytiques) est un indicateur quantitatif qui mesure le niveau de techniques de manipulation détectées dans un contenu web. Le score final est compris entre **0 et 100**, où :

- **0** = Aucune manipulation détectée
- **100** = Niveau critique de manipulation

### Principes fondamentaux

Le système analyse uniquement les **techniques de manipulation (TE)**, pas les tactiques (TA). Chaque technique détectée contribue au score global selon :

1. Le nombre d'occurrences
2. Les pondérations multiples appliquées
3. Le contexte de la page
4. Les patterns linguistiques détectés

---

## Architecture du système

### Composants principaux

```
Texte à analyser
    ↓
Détection de mots-clés/patterns
    ↓
Application des pondérations
    ↓
Agrégation des scores
    ↓
Score DIMA final (0-100)
```

### Types d'analyse

Le système propose deux modes d'analyse :

1. **Analyse basique** : Recherche simple de mots-clés
2. **Analyse améliorée** : Inclut variantes, patterns regex et contextes

---

## Processus de calcul détaillé

### Étape 1 : Détection des correspondances

Pour chaque technique, le système recherche :

#### A. Mots-clés de base (Core Keywords)
- **Poids** : `1.0`
- Recherche exacte avec frontières de mots
- Exemple : "urgent", "gratuit", "exclusif"

#### B. Variantes par catégorie

| Catégorie | Poids | Description |
|-----------|-------|-------------|
| `formal` | `0.9` | Variantes formelles (registre soutenu) |
| `informal` | `1.1` | Variantes informelles (registre familier) |
| `clickbait_formulas` | `1.6` | Formules clickbait typiques |
| `emotional_hooks` | `1.4` | Accroches émotionnelles |
| `curiosity_gaps` | `1.5` | Trous de curiosité |
| `urgency` | `1.3` | Marqueurs d'urgence |
| `scarcity` | `1.4` | Marqueurs de rareté |
| `temporal` | `1.2` | Marqueurs temporels |

#### C. Variantes par intensité

| Intensité | Poids | Exemple |
|-----------|-------|---------|
| `weak` | `0.7` | "peut-être", "possiblement" |
| `strong` | `1.5` | "ABSOLUMENT", "JAMAIS" |

#### D. Patterns Regex
- **Poids** : `1.5`
- Détection de structures linguistiques complexes
- Exemples : questions rhétoriques, formules répétitives, etc.

### Étape 2 : Calcul du score brut

```javascript
score_brut = Σ(poids de chaque correspondance)
```

**Exemple** :
- 3 mots-clés de base (×1.0) = 3 points
- 2 variantes clickbait (×1.6) = 3.2 points
- 1 pattern regex (×1.5) = 1.5 points
- **Total** : 7.7 points

### Étape 3 : Application des boosts contextuels

Les **contextes regex** sont des patterns qui amplifient le score lorsqu'ils sont détectés.

```javascript
score_avec_contexte = score_brut × boost_1 × boost_2 × ... × boost_n
```

**Exemple** :
- Score brut : 7.7
- Contexte d'urgence détecté (×1.3)
- Contexte émotionnel détecté (×1.4)
- **Score avec contexte** : 7.7 × 1.3 × 1.4 = **14.0**

### Étape 4 : Pondérations multiples

Chaque technique reçoit trois types de pondérations :

#### A. Poids de base (`technique.weight`)
- Défini par la gravité intrinsèque de la technique
- Valeur par défaut : `1.0`
- Peut varier selon l'importance de la technique

#### B. Poids contextuel (`contextualWeight`)

Adapté selon le type de page :

**Page NEWS**
| Technique | Code | Poids |
|-----------|------|-------|
| Désinformation | TE0500 | `1.4` |
| Appel à l'émotion | TE0132 | `1.3` |
| Polarisation | TE0221 | `1.5` |
| Titre sensationnaliste | TE0212 | `1.3` |
| Citation hors contexte | TE0261 | `0.8` |

**Page SOCIAL**
| Technique | Code | Poids |
|-----------|------|-------|
| Appel à l'émotion | TE0132 | `0.9` |
| Témoignage fabriqué | TE0131 | `0.8` |
| Preuve sociale | TE0501 | `1.3` |
| Polarisation | TE0221 | `1.6` |
| Bandwagon effect | TE0251 | `1.2` |

**Page COMMERCE**
| Technique | Code | Poids |
|-----------|------|-------|
| Preuve sociale | TE0501 | `0.9` |
| Scarcité artificielle | TE0141 | `0.8` |
| Urgence artificielle | TE0143 | `0.7` |
| Ancrage de prix | TE0422 | `1.2` |
| Promotion trompeuse | TE0411 | `1.1` |

**Page BLOG**
| Technique | Code | Poids |
|-----------|------|-------|
| Titre sensationnaliste | TE0212 | `0.8` |
| Simplification excessive | TE0314 | `0.9` |
| Citation hors contexte | TE0261 | `0.7` |
| Liste numérotée | TE0321 | `1.1` |

#### C. Poids dynamique (`dynamicWeight`)

Basé sur le nombre d'occurrences :

| Occurrences | Poids de base |
|-------------|---------------|
| 1-2 | `1.0` |
| 3-4 | `1.1` |
| 5-6 | `1.2` |
| 7-9 | `1.3` |
| 10+ | `1.4` |

**Techniques critiques** (bonus ×1.1 dès 2 occurrences) :
- TE0221 (Polarisation)
- TE0500 (Désinformation)
- TE0132 (Appel à l'émotion)
- TE0501 (Preuve sociale)

**Techniques bénignes** (malus ×0.9 à partir de 5 occurrences) :
- TE0143 (Urgence artificielle)
- TE0232 (Répétition)
- TE0333 (Analogie simpliste)

### Étape 5 : Calcul du score pondéré

```javascript
poids_total = technique.weight × contextualWeight × dynamicWeight

score_pondéré = score_avec_contexte × poids_total
```

**Exemple complet** :
- Score avec contexte : 14.0
- Poids de base : 1.0
- Poids contextuel (news) : 1.5
- Poids dynamique (5 occurrences) : 1.2
- **Poids total** : 1.0 × 1.5 × 1.2 = 1.8
- **Score pondéré** : 14.0 × 1.8 = **25.2**

### Étape 6 : Score global

```javascript
total_score = Σ(tous les scores pondérés)

score_global = min(round(total_score × 3), 100)
```

Le **facteur d'amplification ×3** permet d'étaler les scores sur la plage 0-100.

**Exemple final** :
- Technique 1 : 25.2 points
- Technique 2 : 18.5 points
- Technique 3 : 12.0 points
- **Total** : 55.7 points
- **Score global** : min(round(55.7 × 3), 100) = min(167, 100) = **100**

---

## Contextes Regex

### Qu'est-ce qu'un contexte regex ?

Les **contextes regex** sont des expressions régulières qui détectent des structures linguistiques spécifiques dans le texte. Lorsqu'un contexte est détecté, il **amplifie le score** des techniques associées.

### Architecture des contextes

```javascript
contextPatterns = {
  "nom_du_contexte": {
    techniques: ["TE0xxx", "TE0yyy"],  // Techniques concernées
    boost: 1.3,                         // Multiplicateur
    patterns: [                         // Expressions régulières
      /pattern1/gi,
      /pattern2/gi
    ]
  }
}
```

### Exemples de contextes courants

#### 1. Contexte d'urgence

```javascript
{
  techniques: ["TE0143", "TE0221", "TE0141"],
  boost: 1.3,
  patterns: [
    /urgent|maintenant|immédiatement|vite|rapidement/gi,
    /dernière chance|derniers jours|plus que \d+ heures/gi,
    /ne tardez (pas|plus)|dépêchez-vous/gi
  ]
}
```

**Effet** : Si le texte contient "URGENT : Plus que 24 heures !", les techniques d'urgence voient leur score multiplié par **×1.3**.

#### 2. Contexte émotionnel

```javascript
{
  techniques: ["TE0132", "TE0212"],
  boost: 1.4,
  patterns: [
    /choquant|scandaleux|incroyable|inacceptable/gi,
    /vous ne croirez (jamais|pas)|hallucinant/gi,
    /indignation|colère|rage|honte/gi
  ]
}
```

**Effet** : "Ce scandale CHOQUANT va vous mettre en colère" → multiplicateur **×1.4**.

#### 3. Contexte de curiosité

```javascript
{
  techniques: ["TE0212", "TE0321"],
  boost: 1.5,
  patterns: [
    /vous ne devinerez jamais|vous allez être surpris/gi,
    /ce qui s'est passé ensuite|la suite va vous étonner/gi,
    /\d+ (raisons|choses|secrets) que .* ne veut pas/gi
  ]
}
```

**Effet** : "10 secrets que les médias ne veulent pas révéler" → multiplicateur **×1.5**.

#### 4. Contexte de rareté

```javascript
{
  techniques: ["TE0141", "TE0143"],
  boost: 1.4,
  patterns: [
    /stock limité|quantité limitée|édition limitée/gi,
    /plus que \d+ (disponibles?|restants?|en stock)/gi,
    /dernier exemplaire|derniers articles/gi
  ]
}
```

**Effet** : "Stock limité : plus que 5 disponibles" → multiplicateur **×1.4**.

#### 5. Contexte de preuve sociale

```javascript
{
  techniques: ["TE0501", "TE0251"],
  boost: 1.3,
  patterns: [
    /\d+(\s*\d+)* (personnes?|clients?|utilisateurs?) (ont|achètent)/gi,
    /tout le monde|la plupart des gens|millions de/gi,
    /rejoignez les \d+|déjà \d+ membres/gi
  ]
}
```

**Effet** : "Déjà 50 000 clients satisfaits !" → multiplicateur **×1.3**.

#### 6. Contexte de question rhétorique

```javascript
{
  techniques: ["TE0212", "TE0221"],
  boost: 1.2,
  patterns: [
    /(pourquoi|comment|qui|que|quoi) .{10,80}\?/gi,
    /n'est-ce pas|vous ne pensez pas|vous aussi/gi
  ]
}
```

**Effet** : "Pourquoi les médias cachent-ils cette vérité ?" → multiplicateur **×1.2**.

### Cumul des contextes

Les boosts contextuels se **multiplient entre eux** :

```javascript
score_final = score_brut × boost_1 × boost_2 × boost_3
```

**Exemple concret** :

Texte analysé :
> "URGENT : Ce scandale CHOQUANT va vous mettre en colère ! Plus que 48 heures pour découvrir la vérité que 10 000 personnes connaissent déjà !"

Contextes détectés :
1. Urgence (×1.3) : "URGENT", "Plus que 48 heures"
2. Émotion (×1.4) : "CHOQUANT", "colère"
3. Preuve sociale (×1.3) : "10 000 personnes"

**Calcul** :
- Score brut : 10 points
- Avec contextes : 10 × 1.3 × 1.4 × 1.3 = **23.66 points**

---

## Niveaux de risque

Le score global est converti en un niveau de risque qualitatif :

| Score | Niveau | Couleur | Code couleur | Description |
|-------|--------|---------|--------------|-------------|
| 0-14 | **Faible** | Vert | `#27ae60` | Peu ou pas de manipulation détectée |
| 15-29 | **Modéré** | Orange clair | `#f39c12` | Techniques légères présentes |
| 30-49 | **Élevé** | Orange | `#e67e22` | Manipulation significative |
| 50-74 | **Très Élevé** | Rouge-orange | `#d35400` | Manipulation importante |
| 75-100 | **Critique** | Rouge foncé | `#c0392b` | Manipulation massive |

### Interprétation des niveaux

**Faible (0-14)** : Le contenu peut contenir quelques formulations marketing standard, mais rien d'alarmant.

**Modéré (15-29)** : Présence de techniques de persuasion courantes. Vigilance recommandée.

**Élevé (30-49)** : Utilisation significative de techniques manipulatoires. Analyse critique nécessaire.

**Très Élevé (50-74)** : Manipulation intentionnelle évidente. Forte méfiance recommandée.

**Critique (75-100)** : Combinaison de multiples techniques de manipulation intensive. Risque élevé de désinformation ou d'escroquerie.

---

## Exemples de calcul

### Exemple 1 : Article de blog standard

**Texte** :
> "Découvrez 5 astuces pour améliorer votre productivité. Ces conseils ont aidé de nombreuses personnes."

**Analyse** :
- Technique TE0321 (Liste numérotée) : 1 occurrence
  - Score brut : 1
  - Poids contextuel (blog) : 1.1
  - Poids dynamique : 1.0
  - Score pondéré : 1 × 1.0 × 1.1 × 1.0 = **1.1**

- Technique TE0501 (Preuve sociale) : 1 occurrence
  - Score brut : 1
  - Poids contextuel (blog) : 1.0
  - Poids dynamique : 1.0
  - Score pondéré : 1 × 1.0 × 1.0 × 1.0 = **1.0**

**Score total** : 1.1 + 1.0 = 2.1
**Score global** : min(round(2.1 × 3), 100) = **6**
**Niveau** : Faible ✅

---

### Exemple 2 : Publicité e-commerce agressive

**Texte** :
> "URGENT ! Stock limité : plus que 3 articles ! 50% de réduction, mais seulement pendant les 24 prochaines heures ! Déjà 5000 clients satisfaits. Ne ratez pas cette DERNIÈRE CHANCE !"

**Analyse** :

**Technique TE0143 (Urgence artificielle)** : 4 occurrences
- Mots-clés : "URGENT", "pendant les 24 prochaines heures"
- Patterns : "DERNIÈRE CHANCE"
- Score brut : 6
- Contextes détectés :
  - Urgence (×1.3) : "URGENT", "24 prochaines heures"
  - Rareté (×1.4) : "Stock limité", "plus que 3"
- Score avec contexte : 6 × 1.3 × 1.4 = **10.92**
- Poids contextuel (commerce) : 0.7
- Poids dynamique (4 occ.) : 1.1
- Score pondéré : 10.92 × 1.0 × 0.7 × 1.1 = **8.4**

**Technique TE0141 (Rareté artificielle)** : 2 occurrences
- Mots-clés : "Stock limité", "plus que 3 articles"
- Score brut : 3
- Contexte rareté (×1.4) : 3 × 1.4 = **4.2**
- Poids contextuel (commerce) : 0.8
- Poids dynamique : 1.0
- Score pondéré : 4.2 × 1.0 × 0.8 × 1.0 = **3.36**

**Technique TE0501 (Preuve sociale)** : 1 occurrence
- Mots-clés : "Déjà 5000 clients"
- Score brut : 2
- Contexte preuve sociale (×1.3) : 2 × 1.3 = **2.6**
- Poids contextuel (commerce) : 0.9
- Poids dynamique : 1.0
- Score pondéré : 2.6 × 1.0 × 0.9 × 1.0 = **2.34**

**Score total** : 8.4 + 3.36 + 2.34 = **14.1**
**Score global** : min(round(14.1 × 3), 100) = **42**
**Niveau** : Élevé ⚠️

---

### Exemple 3 : Article de désinformation

**Texte** :
> "CHOQUANT : Ce que le gouvernement vous cache ! La VÉRITÉ sur ce scandale que les médias refusent de révéler. Vous ne croirez JAMAIS ce qui s'est vraiment passé. URGENT : partagez avant la censure ! Pourquoi veulent-ils nous empêcher de savoir ? Rejoignez les 50 000 personnes qui connaissent déjà la vérité !"

**Analyse** :

**Technique TE0500 (Désinformation)** : 5 occurrences
- Mots-clés : "vérité", "vraiment passé"
- Variantes clickbait : "ce que le gouvernement cache", "médias refusent"
- Score brut : 12
- Contextes :
  - Émotion (×1.4) : "CHOQUANT", "scandale"
  - Curiosité (×1.5) : "Vous ne croirez JAMAIS"
  - Question rhétorique (×1.2) : "Pourquoi veulent-ils"
- Score avec contexte : 12 × 1.4 × 1.5 × 1.2 = **30.24**
- Poids contextuel (news) : 1.4
- Poids dynamique (5 occ.) : 1.2
- **Technique critique** → bonus ×1.1
- Score pondéré : 30.24 × 1.0 × 1.4 × 1.2 × 1.1 = **55.72**

**Technique TE0132 (Appel à l'émotion)** : 3 occurrences
- Mots-clés : "CHOQUANT", "scandale"
- Score brut : 5
- Contexte émotion (×1.4) : 5 × 1.4 = **7**
- Poids contextuel (news) : 1.3
- Poids dynamique (3 occ.) : 1.1
- Score pondéré : 7 × 1.0 × 1.3 × 1.1 = **10.01**

**Technique TE0221 (Polarisation)** : 4 occurrences
- Mots-clés : "nous vs eux", "empêcher de savoir"
- Score brut : 8
- Contextes : urgence (×1.3) + question (×1.2) = 8 × 1.3 × 1.2 = **12.48**
- Poids contextuel (news) : 1.5
- Poids dynamique (4 occ.) : 1.1
- **Technique critique** → bonus ×1.1
- Score pondéré : 12.48 × 1.0 × 1.5 × 1.1 × 1.1 = **22.66**

**Technique TE0501 (Preuve sociale)** : 1 occurrence
- Mots-clés : "50 000 personnes"
- Score brut : 2
- Contexte preuve sociale (×1.3) : 2 × 1.3 = **2.6**
- Poids contextuel (news) : 1.0
- Poids dynamique : 1.0
- Score pondéré : 2.6 × 1.0 × 1.0 × 1.0 = **2.6**

**Score total** : 55.72 + 10.01 + 22.66 + 2.6 = **90.99**
**Score global** : min(round(90.99 × 3), 100) = **100**
**Niveau** : Critique 🚨

---

## Calcul du niveau de confiance

En plus du score, chaque technique reçoit un **niveau de confiance** (0-100) :

```javascript
confidence = min(round(score × 15 + nb_matches × 10), 100)
```

Ce niveau indique la fiabilité de la détection :
- **0-30** : Faible confiance (peu d'éléments détectés)
- **31-60** : Confiance moyenne
- **61-100** : Haute confiance (nombreux éléments convergents)

**Exemple** :
- Score : 5
- Nombre de matches : 8
- Confiance : min(round(5 × 15 + 8 × 10), 100) = min(155, 100) = **100**

---

## Résumé des formules

### Score d'une technique

```
score_technique = Σ(poids_des_matches)

score_avec_contexte = score_technique × Π(boosts_contextuels)

poids_total = technique.weight × contextualWeight × dynamicWeight

score_pondéré = score_avec_contexte × poids_total
```

### Score global

```
score_global = min(round(Σ(scores_pondérés) × 3), 100)
```

### Niveau de confiance

```
confidence = min(round(score × 15 + nb_matches × 10), 100)
```

---

## Limitations et considérations

### Points importants à noter

1. **Longueur minimale des mots-clés** : Par défaut, les mots de moins de 3 caractères sont ignorés.

2. **Sensibilité au contexte** : Le même texte peut recevoir des scores différents selon le type de page (news, social, commerce, blog).

3. **Cumul non linéaire** : Les contextes et pondérations se multiplient, ce qui peut créer des amplifications importantes.

4. **Plafonnement** : Le score est toujours plafonné à 100, même si les calculs donnent des valeurs supérieures.

5. **Analyse en minuscules** : Tout le texte est converti en minuscules avant analyse (sauf pour les détections de majuscules intentionnelles).

### Cas particuliers

- **Techniques critiques** : Certaines techniques (TE0221, TE0500, TE0132, TE0501) reçoivent des bonus même avec peu d'occurrences.

- **Techniques bénignes** : À l'inverse, certaines techniques courantes (TE0143, TE0232, TE0333) reçoivent des malus si elles sont trop fréquentes.

- **Patterns regex** : Ont un poids de base de 1.5 (plus élevé que les mots-clés simples).

---

## Conclusion

Le score DIMA est un système sophistiqué qui combine :
- **Détection lexicale** (mots-clés et variantes)
- **Analyse structurelle** (patterns regex)
- **Évaluation contextuelle** (type de page, boosts)
- **Pondérations dynamiques** (fréquence, gravité)

Cette approche multi-niveaux permet une évaluation nuancée et adaptative du niveau de manipulation dans un contenu, tout en tenant compte du contexte d'utilisation.

---

**Document généré le** : {{ date }}
**Version** : 1.0
**Système** : DIMA (Détection et Identification des Manipulations en ligne et Analytiques)
