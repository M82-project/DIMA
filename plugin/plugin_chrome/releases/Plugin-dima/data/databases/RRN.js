// Liste des domaines identifiés dans la campagne RRN de manipulation de l'information
// Source: Rapport VIGINUM - 19 juin 2023
// RRN: une campagne numérique de manipulation de l'information complexe et persistante

const rrnCampaignDomains = [
  // ===== DOMAINES PRINCIPAUX DE LA CAMPAGNE RRN =====
  {
    domain: "rrussianews.com",
    matchType: "exact",
    reason: "Site principal RRN (Reliable Russian News), créé le 10 mars 2022, média pro-russe diffusant de la désinformation sur l'Ukraine",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-03-10",
    riskLevel: "high",
    tags: ["RRN", "core-infrastructure", "France", "multi-langue", "désinformation-Ukraine"]
  },
  {
    domain: "rrn.world",
    matchType: "exact",
    reason: "Nouveau domaine principal de RRN créé le 6 juin 2022 pour masquer les liens avec la Russie (anciennement Reliable Russian News, devenu Reliable Recent News)",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-06-06",
    riskLevel: "high",
    tags: ["RRN", "core-infrastructure", "France", "multi-langue", "désinformation-Ukraine"]
  },
  {
    domain: "waronfakes.com",
    matchType: "exact",
    reason: "Fausse plateforme de fact-checking utilisée par la Russie pour nier les crimes de guerre et légitimer l'invasion de l'Ukraine. Lien technique avec rrussianews.com",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-03-01",
    riskLevel: "high",
    tags: ["RRN", "fact-checking-fake", "désinformation-Ukraine", "propagande-russe"]
  },

  // ===== SITES AFFILIÉS ET FAUX MÉDIAS =====
  {
    domain: "avisindependent.eu",
    matchType: "exact",
    reason: "Site 'La France indépendante' créé le 1er juin 2022, faux média d'analyse sur la guerre en Ukraine. Enregistré par NetBuzz/Mikhaïl TCHEKOMASOV",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-06-01",
    riskLevel: "high",
    tags: ["RRN", "France", "faux-média", "désinformation-Ukraine"]
  },
  {
    domain: "newsroad.online",
    matchType: "exact",
    reason: "Infrastructure parallèle à RRN créée le 6 avril 2022, publie des articles en plusieurs langues et partage des caricatures pro-russes. Enregistré par Andreï CHOUBOTCHKINE",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-04-06",
    riskLevel: "high",
    tags: ["RRN", "multi-langue", "caricatures", "désinformation-Ukraine"]
  },
  {
    domain: "memhouse.online",
    matchType: "exact",
    reason: "Site créé le 15 avril 2022, banque de caricatures anti-occidentales et pro-russes utilisées dans la campagne RRN. Enregistré par Andreï CHOUBOTCHKINE",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-04-15",
    riskLevel: "high",
    tags: ["RRN", "caricatures", "propagande-visuelle"]
  },
  {
    domain: "truemaps.info",
    matchType: "exact",
    reason: "Site créé le 30 juin 2022, carte interactive accusant les pays fournisseurs d'armes à l'Ukraine de tuer des enfants dans le Donbass. Code source en cyrillique",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-06-30",
    riskLevel: "high",
    tags: ["RRN", "propagande-émotionnelle", "désinformation-Ukraine"]
  },
  {
    domain: "tribunalukraine.info",
    matchType: "exact",
    reason: "Site créé le 5 octobre 2022, publie des articles sur de supposés crimes de guerre ukrainiens. Prétend être administré par des allemands",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-10-05",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "désinformation-Ukraine", "crimes-guerre-fake"]
  },
  {
    domain: "ukraine-inc.info",
    matchType: "exact",
    reason: "Site créé le 11 mars 2023, héberge la série de dessins animés 'Ukraine Cocaïne' anti-Zelensky. Serveur hébergé en Russie, relayé massivement par les canaux Telegram russes",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-03-11",
    riskLevel: "high",
    tags: ["RRN", "dessin-animé", "anti-Zelensky", "désinformation-Ukraine"]
  },

  // ===== FAUX SITES D'ACTUALITÉ FRANCOPHONES =====
  {
    domain: "lavirgule.news",
    matchType: "exact",
    reason: "Faux média francophone 'La Virgule' créé le 24 février 2023, critiques du gouvernement français et propagande pro-russe. Primo-diffuseur d'Ukraine Cocaïne",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02-24",
    riskLevel: "high",
    tags: ["RRN", "France", "faux-média", "désinformation-Ukraine"]
  },
  {
    domain: "allons-y.social",
    matchType: "exact",
    reason: "Faux média francophone créé le 24 février 2023, articles sur la politique française avec éléments de langage russes. Erreurs de traduction cyrillique visibles",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02-24",
    riskLevel: "high",
    tags: ["RRN", "France", "faux-média", "désinformation-Ukraine"]
  },
  {
    domain: "candidat.news",
    matchType: "exact",
    reason: "Faux média francophone créé le 24 février 2023, messages d'erreur en russe révélant l'origine russe du site",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02-24",
    riskLevel: "high",
    tags: ["RRN", "France", "faux-média"]
  },
  {
    domain: "notrepays.today",
    matchType: "exact",
    reason: "Faux média francophone créé le 24 février 2023, hébergé sur le même serveur que lavirgule.news",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02-24",
    riskLevel: "high",
    tags: ["RRN", "France", "faux-média"]
  },
  {
    domain: "franceeteu.today",
    matchType: "exact",
    reason: "Faux média francophone créé le 24 février 2023, hébergé sur le même serveur que lavirgule.news",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02-24",
    riskLevel: "high",
    tags: ["RRN", "France", "faux-média"]
  },
  {
    domain: "librelepresse.fr",
    matchType: "exact",
    reason: "Faux site d'actualité francophone, publie des articles traduits du média RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "France", "faux-média"]
  },

  // ===== AUTRES FAUX SITES D'ACTUALITÉ (NON-FRANÇAIS) =====
  {
    domain: "weltereignisse365.de",
    matchType: "exact",
    reason: "Faux site d'actualité allemand, publie du contenu RRN traduit",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "faux-média"]
  },
  {
    domain: "viedo-klis.lv",
    matchType: "exact",
    reason: "Faux site d'actualité letton, publie du contenu RRN traduit",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "Lettonie", "faux-média"]
  },
  {
    domain: "libera-stampa.it",
    matchType: "exact",
    reason: "Faux site d'actualité italien, publie du contenu RRN traduit",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "Italie", "faux-média"]
  },

  // ===== TYPOSQUATTING - MÉDIAS FRANÇAIS =====
  {
    domain: "leparisien.ltd",
    matchType: "exact",
    reason: "Typosquatting du Parisien, au moins 49 faux articles identifiés diffusant de la désinformation pro-russe",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "France", "typosquatting", "Le-Parisien"]
  },
  {
    domain: "20minuts.com",
    matchType: "exact",
    reason: "Typosquatting de 20 Minutes (faute d'orthographe délibérée), 7 faux articles identifiés",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "high",
    tags: ["RRN", "France", "typosquatting", "20-Minutes"]
  },
  {
    domain: "lemonde.ltd",
    matchType: "exact",
    reason: "Typosquatting du Monde, au moins 1 faux article identifié",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "France", "typosquatting", "Le-Monde"]
  },
  {
    domain: "lefigaro.me",
    matchType: "exact",
    reason: "Typosquatting du Figaro à partir du 8 juin 2023, au moins 1 faux article identifié",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-06-08",
    riskLevel: "high",
    tags: ["RRN", "France", "typosquatting", "Le-Figaro"]
  },

  // ===== TYPOSQUATTING - SITES GOUVERNEMENTAUX =====
  {
    domain: "diplomatie.gouv.fm",
    matchType: "exact",
    reason: "Typosquatting du site du ministère de l'Europe et des Affaires étrangères français, faux communiqué sur une taxe de sécurité pour financer l'Ukraine",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-05-29",
    riskLevel: "high",
    tags: ["RRN", "France", "typosquatting", "gouvernement", "MEAE"]
  },
  {
    domain: "bmi.bund.pe",
    matchType: "exact",
    reason: "Typosquatting du site du ministère de l'intérieur allemand, faux communiqué sur l'obligation d'accueillir des réfugiés ukrainiens",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-05-29",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "typosquatting", "gouvernement"]
  },

  // ===== TYPOSQUATTING - MÉDIAS ALLEMANDS =====
  {
    domain: "bild.work",
    matchType: "exact",
    reason: "Typosquatting du média allemand Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "spiegel.ltd",
    matchType: "exact",
    reason: "Typosquatting du média allemand Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "sueddeutsche.ltd",
    matchType: "exact",
    reason: "Typosquatting du média allemand Süddeutsche Zeitung",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "welt.ltd",
    matchType: "exact",
    reason: "Typosquatting du média allemand Die Welt",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "typosquatting", "Die-Welt"]
  },
  {
    domain: "faz.ltd",
    matchType: "exact",
    reason: "Typosquatting du média allemand FAZ",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "typosquatting", "FAZ"]
  },
  {
    domain: "tagesspiegel.ltd",
    matchType: "exact",
    reason: "Typosquatting du média allemand Tagesspiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "high",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },

  // ===== TYPOSQUATTING - AUTRES MÉDIAS INTERNATIONAUX =====
  {
    domain: "dailymail.top",
    matchType: "exact",
    reason: "Typosquatting du Daily Mail britannique",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Royaume-Uni", "typosquatting", "Daily-Mail"]
  },
  {
    domain: "repubblica.life",
    matchType: "exact",
    reason: "Typosquatting du média italien La Repubblica",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Italie", "typosquatting", "La-Repubblica"]
  },
  {
    domain: "ansa.ltd",
    matchType: "exact",
    reason: "Typosquatting de l'agence italienne ANSA",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Italie", "typosquatting", "ANSA"]
  },
  {
    domain: "delfi.life",
    matchType: "exact",
    reason: "Typosquatting du média balte Delfi",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Pays-Baltes", "typosquatting", "Delfi"]
  },
  {
    domain: "rbk.media",
    matchType: "exact",
    reason: "Typosquatting du média russe RBK",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Russie", "typosquatting", "RBK"]
  },
  {
    domain: "obozrevatel.ltd",
    matchType: "exact",
    reason: "Typosquatting du média ukrainien Obozrevatel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "Ukraine", "typosquatting"]
  },
  {
    domain: "washingtonpost.ltd",
    matchType: "exact",
    reason: "Typosquatting du Washington Post",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "États-Unis", "typosquatting", "Washington-Post"]
  },
  {
    domain: "albayan.me",
    matchType: "exact",
    reason: "Typosquatting du média émirati Al Bayan",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "Émirats-Arabes-Unis", "typosquatting"]
  },
  {
    domain: "gulfnews.ltd",
    matchType: "exact",
    reason: "Typosquatting de Gulf News",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "Émirats-Arabes-Unis", "typosquatting"]
  },
  {
    domain: "jewishjournal.info",
    matchType: "exact",
    reason: "Typosquatting du Jewish Journal",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "Israël", "typosquatting"]
  },
  {
    domain: "mako.news",
    matchType: "exact",
    reason: "Typosquatting du média israélien Mako",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "Israël", "typosquatting"]
  },
  {
    domain: "theliberal.net",
    matchType: "exact",
    reason: "Typosquatting d'un média libéral",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "typosquatting"]
  },

  // ===== DOMAINES DE REDIRECTION (INFRASTRUCTURE TECHNIQUE) =====
  {
    domain: "urlbox.online",
    matchType: "exact",
    reason: "Raccourcisseur d'URL utilisé pour masquer les destinations vers les sites typosquattés. Enregistré par Andreï CHOUBOTCHKINE",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-09",
    riskLevel: "high",
    tags: ["RRN", "redirecteur", "infrastructure-technique"]
  },
  {
    domain: "marvelgoodies.com",
    matchType: "exact",
    reason: "Domaine pivot permanent utilisé pour les redirections vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "redirecteur", "infrastructure-technique"]
  },
  {
    domain: "bighorn-advisors.com",
    matchType: "exact",
    reason: "Domaine pivot permanent utilisé pour les redirections vers les sites RRN, avec geofencing",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "redirecteur", "infrastructure-technique", "geofencing"]
  },
  {
    domain: "gitver.com",
    matchType: "exact",
    reason: "Domaine pivot permanent utilisé pour les redirections vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "redirecteur", "infrastructure-technique"]
  },
  {
    domain: "raremotion.com",
    matchType: "exact",
    reason: "Domaine pivot permanent utilisé pour les redirections vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "redirecteur", "infrastructure-technique"]
  },
  {
    domain: "gooddefr.com",
    matchType: "exact",
    reason: "Domaine pivot permanent utilisé pour les redirections vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "high",
    tags: ["RRN", "redirecteur", "infrastructure-technique"]
  },

  // ===== DOMAINES JETABLES DE REDIRECTION (échantillon des 130+ identifiés) =====
  {
    domain: "michaelplaxico.com",
    matchType: "exact",
    reason: "Domaine jetable utilisé dans les publications sponsorisées Facebook pour redirection vers RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "redirecteur-jetable", "Facebook-ads"]
  },
  {
    domain: "google-seo-top.com",
    matchType: "exact",
    reason: "Domaine jetable utilisé pour redirection vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "redirecteur-jetable"]
  },
  {
    domain: "nexusfall.com",
    matchType: "exact",
    reason: "Domaine jetable utilisé pour redirection vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "redirecteur-jetable"]
  },
  {
    domain: "swiftdawn.com",
    matchType: "exact",
    reason: "Domaine jetable utilisé pour redirection vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "redirecteur-jetable"]
  },
  {
    domain: "topsnoep.com",
    matchType: "exact",
    reason: "Domaine jetable utilisé pour redirection vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "redirecteur-jetable"]
  },
  {
    domain: "americanconservativegazette.com",
    matchType: "exact",
    reason: "Domaine jetable utilisé pour redirection vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "redirecteur-jetable", "États-Unis"]
  },
  {
    domain: "americanliberalmedia.com",
    matchType: "exact",
    reason: "Domaine jetable utilisé pour redirection vers les sites RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2023-02",
    riskLevel: "medium",
    tags: ["RRN", "redirecteur-jetable", "États-Unis"]
  },

  // ===== AUTRES VARIANTES DE TYPOSQUATTING (échantillon des 353 domaines) =====
  {
    domain: "blld.live",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.pics",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.live",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.asia",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.vip",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.eu.com",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.llc",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.expert",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "bild.ws",
    matchType: "exact",
    reason: "Variante de typosquatting de Bild",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Bild"]
  },
  {
    domain: "welt.tours",
    matchType: "exact",
    reason: "Variante de typosquatting de Die Welt",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Die-Welt"]
  },
  {
    domain: "welt.ws",
    matchType: "exact",
    reason: "Variante de typosquatting de Die Welt",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Die-Welt"]
  },
  {
    domain: "welt.media",
    matchType: "exact",
    reason: "Variante de typosquatting de Die Welt",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Die-Welt"]
  },
  {
    domain: "spiegel.today",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.fun",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.quest",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.ink",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.pro",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.co.com",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.agency",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.work",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegel.cab",
    matchType: "exact",
    reason: "Variante de typosquatting de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegelr.live",
    matchType: "exact",
    reason: "Variante avec faute d'orthographe de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegelr.today",
    matchType: "exact",
    reason: "Variante avec faute d'orthographe de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegelr.life",
    matchType: "exact",
    reason: "Variante avec faute d'orthographe de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegeli.life",
    matchType: "exact",
    reason: "Variante avec faute d'orthographe de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegeli.live",
    matchType: "exact",
    reason: "Variante avec faute d'orthographe de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "spiegeli.today",
    matchType: "exact",
    reason: "Variante avec faute d'orthographe de Der Spiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "Der-Spiegel"]
  },
  {
    domain: "sueddeutsche.online",
    matchType: "exact",
    reason: "Variante de typosquatting de Süddeutsche Zeitung",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "sueddeutsche.life",
    matchType: "exact",
    reason: "Variante de typosquatting de Süddeutsche Zeitung",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "sueddeutsche.today",
    matchType: "exact",
    reason: "Variante de typosquatting de Süddeutsche Zeitung",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "sueddeutsche.me",
    matchType: "exact",
    reason: "Variante de typosquatting de Süddeutsche Zeitung",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "sueddeutsche.cc",
    matchType: "exact",
    reason: "Variante de typosquatting de Süddeutsche Zeitung",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "sueddeutsche.co",
    matchType: "exact",
    reason: "Variante de typosquatting de Süddeutsche Zeitung",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "t-online.life",
    matchType: "exact",
    reason: "Typosquatting de T-Online (média allemand)",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "tonline.cfd",
    matchType: "exact",
    reason: "Typosquatting de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "tonline.life",
    matchType: "exact",
    reason: "Typosquatting de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "tonline.today",
    matchType: "exact",
    reason: "Typosquatting de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "t-onlinl.life",
    matchType: "exact",
    reason: "Typosquatting avec faute d'orthographe de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "t-onlinl.live",
    matchType: "exact",
    reason: "Typosquatting avec faute d'orthographe de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "t-onlinl.today",
    matchType: "exact",
    reason: "Typosquatting avec faute d'orthographe de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "t-onlinr.life",
    matchType: "exact",
    reason: "Typosquatting avec faute d'orthographe de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "t-onlinr.live",
    matchType: "exact",
    reason: "Typosquatting avec faute d'orthographe de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "t-onlinr.today",
    matchType: "exact",
    reason: "Typosquatting avec faute d'orthographe de T-Online",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "faz.agency",
    matchType: "exact",
    reason: "Variante de typosquatting de FAZ",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "FAZ"]
  },
  {
    domain: "faz.life",
    matchType: "exact",
    reason: "Variante de typosquatting de FAZ",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting", "FAZ"]
  },
  {
    domain: "tagesspiegel.co",
    matchType: "exact",
    reason: "Variante de typosquatting de Tagesspiegel",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "nd-aktuell.net",
    matchType: "exact",
    reason: "Typosquatting du média allemand Neues Deutschland",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "nd-aktuell.pro",
    matchType: "exact",
    reason: "Variante de typosquatting de Neues Deutschland",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "nd-aktuell.co",
    matchType: "exact",
    reason: "Variante de typosquatting de Neues Deutschland",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne", "typosquatting"]
  },
  {
    domain: "dailymail.cam",
    matchType: "exact",
    reason: "Variante de typosquatting du Daily Mail",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Royaume-Uni", "typosquatting", "Daily-Mail"]
  },
  {
    domain: "dailymail.cfd",
    matchType: "exact",
    reason: "Variante de typosquatting du Daily Mail",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Royaume-Uni", "typosquatting", "Daily-Mail"]
  },
  {
    domain: "theguardian.co.com",
    matchType: "exact",
    reason: "Typosquatting du Guardian britannique",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Royaume-Uni", "typosquatting", "The-Guardian"]
  },
  {
    domain: "delfi.today",
    matchType: "exact",
    reason: "Variante de typosquatting de Delfi",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Pays-Baltes", "typosquatting", "Delfi"]
  },
  {
    domain: "delfi.top",
    matchType: "exact",
    reason: "Variante de typosquatting de Delfi",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Pays-Baltes", "typosquatting", "Delfi"]
  },
  {
    domain: "delfl.cc",
    matchType: "exact",
    reason: "Variante avec faute d'orthographe de Delfi",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Pays-Baltes", "typosquatting", "Delfi"]
  },
  {
    domain: "lsm.li",
    matchType: "exact",
    reason: "Typosquatting d'un média balte",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Pays-Baltes", "typosquatting"]
  },
  {
    domain: "rbk.kiev.ua",
    matchType: "exact",
    reason: "Typosquatting de RBK ciblant l'Ukraine",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Ukraine", "typosquatting", "RBK"]
  },
  {
    domain: "rbk.today",
    matchType: "exact",
    reason: "Variante de typosquatting de RBK",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Russie", "typosquatting", "RBK"]
  },
  {
    domain: "reuters.cfd",
    matchType: "exact",
    reason: "Typosquatting de Reuters",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "international", "typosquatting", "Reuters"]
  },
  {
    domain: "obozrevatels.com",
    matchType: "exact",
    reason: "Variante de typosquatting d'Obozrevatel (Ukraine)",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Ukraine", "typosquatting"]
  },
  {
    domain: "schlauespiel.de",
    matchType: "exact",
    reason: "Domaine lié à la campagne RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne"]
  },
  {
    domain: "elfpress.info",
    matchType: "exact",
    reason: "Domaine lié à la campagne RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN"]
  },
  {
    domain: "zestiftung.com",
    matchType: "exact",
    reason: "Domaine lié à la campagne RRN",
    source: "VIGINUM",
    reportUrl: "https://www.sgdsn.gouv.fr/files/files/20230619_NP_VIGINUM_RAPPORT-CAMPAGNE-RRN_VF_0.pdf",
    identifiedDate: "2022-05",
    riskLevel: "medium",
    tags: ["RRN", "Allemagne"]
  }
];

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = rrnCampaignDomains;
}

// Note: Le rapport VIGINUM identifie 353 domaines au total. 
// Cette liste contient les domaines principaux et les plus significatifs.
// Les 130+ domaines jetables de redirection supplémentaires sont disponibles 
// dans l'Annexe 4 du rapport original.