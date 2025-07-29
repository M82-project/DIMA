// Content Extractor Module
// Responsible for extracting and cleaning content from web pages

class ContentExtractor {
  constructor(settings) {
    this.settings = settings || {
      maxContentLength: 5000,
      minKeywordLength: 3,
      debugMode: false,
    };
  }

  log(message, data = null) {
    if (this.settings.debugMode) {
      console.log(`ContentExtractor: ${message}`, data || "");
    }
  }

  extractTitle() {
    const titleSources = [
      () => document.title,
      () => document.querySelector('meta[property="og:title"]')?.content,
      () => document.querySelector('meta[name="twitter:title"]')?.content,
      () => document.querySelector("h1")?.textContent?.trim(),
      () =>
        document
          .querySelector('.title, .headline, [class*="title"]')
          ?.textContent?.trim(),
    ];

    return titleSources
      .map((fn) => fn())
      .filter(Boolean)
      .join(" ")
      .substring(0, 500)
      .trim();
  }

  extractContent() {
    this.log("Début extraction de contenu...");

    const extractedTexts = new Set();
    let content = "";

    // Sélecteurs prioritaires pour le contenu principal
    const contentSelectors = [
      "article",
      '[role="main"]',
      "main",
      ".article-content, .post-content, .entry-content",
      ".content, .story-body, .article-body",
      "#article-body, .post-body, .text-content",
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
      this.log("Contenu insuffisant, utilisation de fallbacks...");
      const fallbackSelectors = [
        "p, h1, h2, h3, h4, h5, h6",
        ".text, .description, .summary",
        '[class*="content"], [class*="text"]',
        "blockquote, figcaption",
      ];

      for (const selector of fallbackSelectors) {
        const elements = document.querySelectorAll(selector);
        content += this.extractTextFromElements(elements, extractedTexts, 30);
        if (content.length > 1500) break;
      }
    }

    // Dernier recours
    if (content.length < 200) {
      this.log("Dernier recours - texte visible");
      const bodyText = this.cleanText(document.body.innerText);
      content = bodyText.substring(0, this.settings.maxContentLength);
    }

    const finalContent = content
      .substring(0, this.settings.maxContentLength)
      .trim();
    this.log(`Extraction terminée: ${finalContent.length} caractères`);

    return finalContent;
  }

  extractTextFromElements(elements, extractedTexts, maxElements = 100) {
    let text = "";
    const elementsArray = Array.from(elements).slice(0, maxElements);

    for (const element of elementsArray) {
      if (this.shouldSkipElement(element)) continue;

      const elementText = this.cleanText(
        element.textContent || element.innerText
      );
      if (
        elementText &&
        elementText.length > 15 &&
        !extractedTexts.has(elementText)
      ) {
        extractedTexts.add(elementText);
        text += elementText + " ";

        if (text.length > this.settings.maxContentLength) break;
      }
    }

    return text;
  }

  shouldSkipElement(element) {
    const skipClasses = [
      "nav",
      "menu",
      "footer",
      "header",
      "sidebar",
      "ad",
      "advertisement",
      "social",
      "share",
      "cookie", "popup", "modal", "overlay", "banner", "newsletter",
    "related", "suggest", "recommend", "widget", "promo", "promotion",
    "comment", "rating", "review", "breadcrumb", "pagination", "tag",
    "metadata", "byline", "author-bio", "subscription", "paywall"
    ];
    const skipIds = ["nav", "menu", "footer", "header", "sidebar", "comments","cookie-banner", "newsletter", "popup", "modal", "overlay",
    "related-articles", "advertisement", "social-sharing"];
    const skipAttributes = [
    'data-module="Advertisement"',
    'data-component="SocialShare"', 
    'data-track-component="Newsletter"',
    'role="banner"',
    'role="navigation"',
    'role="complementary"'
    ];

    const className = element.className?.toLowerCase() || "";
    const id = element.id?.toLowerCase() || "";

    return (
      skipClasses.some((skip) => className.includes(skip)) ||
      skipIds.some((skip) => id.includes(skip)) ||
      skipAttributes.some((attr) => element.getAttribute(attr.split('=')[0]) === attr.split('=')[1]?.replace(/"/g, '')) ||
      element.getAttribute("aria-hidden") === "true" ||
      element.getAttribute("role") === "banner" ||
      element.getAttribute("role") === "navigation" ||
      getComputedStyle(element).display === "none"
    );
  }

  cleanText(text) {
    if (!text) return "";

    return text
      .replace(/\s+/g, " ")
      .replace(/[\r\n\t]/g, " ")
      .replace(/[^\w\s\.,!?;:()\-'"%àâäéèêëïîôöùûüÿç]/gi, "")
      .trim();
  }

  detectPageType() {
    const url = window.location.href.toLowerCase();
    if (
      url.includes("news") ||
      url.includes("article") ||
      url.includes("actualit")
    )
      return "news";
    if (url.includes("blog")) return "blog";
    if (
      url.includes("facebook") ||
      url.includes("twitter") ||
      url.includes("instagram")
    )
      return "social";
    if (
      url.includes("shop") ||
      url.includes("buy") ||
      url.includes("product") ||
      url.includes("commerce")
    )
      return "commerce";
    return "general";
  }
}

// Make ContentExtractor available globally for Chrome extension
window.ContentExtractor = ContentExtractor;
