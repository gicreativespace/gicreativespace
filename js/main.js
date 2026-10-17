
// =============================================
// GI CREATIVE SPACE
// Five Worlds in One Space
// Main JavaScript
// =============================================

document.addEventListener("DOMContentLoaded", () => {
    const entrance = document.getElementById("entrance");
    const homepage = document.getElementById("homepage");
    const enterForm = document.getElementById("enterForm");
    const visitorNameInput = document.getElementById("visitorName");
    const welcomeName = document.getElementById("welcomeName");
    const languageToggle = document.getElementById("languageToggle");
    const currentYear = document.getElementById("currentYear");

    const supportedLanguages = ["te", "en"];

    let currentLanguage = localStorage.getItem("giLanguage") || "te";

    if (!supportedLanguages.includes(currentLanguage)) {
        currentLanguage = "te";
    }

    // -----------------------------------------
    // LANGUAGE
    // -----------------------------------------

    function applyLanguage(language) {
        currentLanguage = language;
        document.documentElement.lang = language;

        document.querySelectorAll("[data-te][data-en]").forEach((element) => {
            element.textContent = element.dataset[language];
        });

        document.querySelectorAll("[data-placeholder-te][data-placeholder-en]")
            .forEach((element) => {
                element.placeholder =
                    element.dataset[`placeholder${language.toUpperCase()}`] ||
                    element.dataset[
                        language === "te" ? "placeholderTe" : "placeholderEn"
                    ];
            });

        if (languageToggle) {
            languageToggle.textContent = language === "te" ? "English" : "తెలుగు";
        }

        try {
            localStorage.setItem("giLanguage", language);
        } catch (error) {
            // The language still works for this page if storage is unavailable.
        }
    }

    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            applyLanguage(currentLanguage === "te" ? "en" : "te");
        });
    }

    // -----------------------------------------
    // VISITOR NAME AND ENTRANCE
    // -----------------------------------------

    function showHomepage(name) {
        if (!entrance || !homepage) return;

        const safeName = name.trim();

        if (welcomeName) {
            welcomeName.textContent = safeName;
        }

        entrance.hidden = true;
        homepage.hidden = false;

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (enterForm && visitorNameInput) {
        enterForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const name = visitorNameInput.value.trim();

            if (!name) {
                visitorNameInput.focus();
                return;
            }

            try {
                sessionStorage.setItem("giVisitorName", name);
            } catch (error) {
                // Continue without session storage.
            }

            showHomepage(name);
        });
    }

    // -----------------------------------------
    // RESTORE VISITOR DURING THE SAME SESSION
    // -----------------------------------------

    let savedName = "";

    try {
        savedName = sessionStorage.getItem("giVisitorName") || "";
    } catch (error) {
        savedName = "";
    }

    if (savedName && entrance && homepage) {
        showHomepage(savedName);
    }

    // -----------------------------------------
    // FOOTER YEAR
    // -----------------------------------------

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // -----------------------------------------
    // INITIAL LANGUAGE
    // -----------------------------------------

    applyLanguage(currentLanguage);
});
