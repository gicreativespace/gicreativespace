
/* =========================================
   GI CREATIVE SPACE
   Entrance, visitor name and language
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const languageButtons = document.querySelectorAll(
    "[data-language-toggle]"
  );

  const languageLabels = document.querySelectorAll(
    "[data-language-label]"
  );

  const visitorForm = document.querySelector("#visitor-form");
  const visitorInput = document.querySelector("#visitor-name");
  const visitorGreeting = document.querySelector("#visitor-greeting");
  const currentYear = document.querySelector("#current-year");

  let currentLanguage = "te";

  try {
    currentLanguage = localStorage.getItem("gi-language") || "te";
  } catch (error) {
    currentLanguage = "te";
  }

  // Apply Telugu or English to all translated page content.
  function applyLanguage(language) {
    currentLanguage = language === "en" ? "en" : "te";

    document.documentElement.lang = currentLanguage;

    document.querySelectorAll("[data-te][data-en]").forEach((element) => {
      element.textContent =
        currentLanguage === "en"
          ? element.dataset.en
          : element.dataset.te;
    });

    // Translate placeholders separately.
    document.querySelectorAll("[data-placeholder-te][data-placeholder-en]")
      .forEach((element) => {
        element.placeholder =
          currentLanguage === "en"
            ? element.dataset.placeholderEn
            : element.dataset.placeholderTe;
      });

    // Update language switch labels.
    languageLabels.forEach((label) => {
      label.textContent =
        currentLanguage === "en" ? "తెలుగు" : "English";
    });

    document.querySelectorAll(".language-indicator").forEach((indicator) => {
      indicator.textContent = currentLanguage === "en" ? "EN" : "అ";
    });

    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-label",
        currentLanguage === "en"
          ? "Switch to Telugu"
          : "Switch to English"
      );
    });

    // Update page title.
    document.title =
      body.classList.contains("entrance-page")
        ? currentLanguage === "en"
          ? "GI Creative Space | Welcome"
          : "GI Creative Space | స్వాగతం"
        : currentLanguage === "en"
          ? "GI Creative Space | Five Worlds"
          : "GI Creative Space | ఐదు ప్రపంచాలు";

    // Update the visitor greeting.
    updateVisitorGreeting();

    // Save language choice where browser storage is available.
    try {
      localStorage.setItem("gi-language", currentLanguage);
    } catch (error) {
      // The page still works if browser storage is unavailable.
    }
  }

  function updateVisitorGreeting() {
    if (!visitorGreeting) return;

    let visitorName = "";

    try {
      visitorName = sessionStorage.getItem("gi-visitor-name") || "";
    } catch (error) {
      visitorName = "";
    }

    if (!visitorName) {
      visitorGreeting.textContent = "";
      return;
    }

    visitorGreeting.textContent =
      currentLanguage === "en"
        ? `Welcome, ${visitorName}. Your journey begins here.`
        : `స్వాగతం ${visitorName} గారు! మీ ప్రయాణం ఇక్కడ ప్రారంభమవుతుంది.`;
  }

  // Toggle language on entrance and homepage.
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(currentLanguage === "te" ? "en" : "te");
    });
  });

  // Validate the name and proceed to the homepage.
  if (visitorForm && visitorInput) {
    visitorForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const visitorName = visitorInput.value.trim();

      if (!visitorName) {
        visitorInput.focus();
        return;
      }

      try {
        sessionStorage.setItem("gi-visitor-name", visitorName);
      } catch (error) {
        // Navigation still works if session storage is unavailable.
      }

      window.location.href = "home.html";
    });
  }

  // Mobile navigation.
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {
    function setMenuOpen(isOpen) {
      navigation.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    }

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      setMenuOpen(!isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) {
        setMenuOpen(false);
      }
    });
  }

  // Automatic copyright year.
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Start in the visitor's previously selected language.
  applyLanguage(currentLanguage);
});
