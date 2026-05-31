// Automatikus évszám frissítés
(function updateYear() {
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const yearEl = document.getElementById("year-range");
    if (yearEl) {
        yearEl.textContent = startYear === currentYear ? startYear : `${startYear}-${currentYear}`;
    }
})();

// Projektek toggle + belépő animáció
(function setupProjects() {
    const btn = document.getElementById("toggleProjects");
    const section = document.getElementById("projects");
    if (!btn || !section) return;

    let isAnimating = false;
    const cards = Array.from(document.querySelectorAll(".project-card"));

    // Segédfüggvények
    const setButtonState = (disabled) => {
        btn.disabled = disabled;
        if (disabled) {
            btn.style.opacity = "0.7";
        } else {
            btn.style.opacity = "1";
        }
    };

    const openProjects = () => {
        if (isAnimating) return;
        isAnimating = true;
        setButtonState(true);
        
        section.style.display = "block";
        // Kényszerített reflow a sima animációhoz
        void section.offsetHeight;
        section.classList.add("visible");
        section.setAttribute("aria-hidden", "false");
        btn.setAttribute("aria-expanded", "true");
        
        // Staggered megjelenés
        cards.forEach((card, idx) => {
            setTimeout(() => {
                card.classList.add("show");
                if (idx === cards.length - 1) {
                    setTimeout(() => {
                        isAnimating = false;
                        setButtonState(false);
                    }, 300);
                }
            }, idx * 120);
        });
        
        // Gördülés a projektekhez
        setTimeout(() => {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
    };

    const closeProjects = () => {
        if (isAnimating) return;
        isAnimating = true;
        setButtonState(true);
        
        // Fordított sorrendben eltüntetés
        const reversedCards = [...cards].reverse();
        reversedCards.forEach((card, idx) => {
            setTimeout(() => {
                card.classList.remove("show");
                if (idx === reversedCards.length - 1) {
                    setTimeout(() => {
                        section.classList.remove("visible");
                        section.setAttribute("aria-hidden", "true");
                        btn.setAttribute("aria-expanded", "false");
                        setTimeout(() => {
                            section.style.display = "none";
                            isAnimating = false;
                            setButtonState(false);
                        }, 300);
                    }, 150);
                }
            }, idx * 80);
        });
        
        if (cards.length === 0) {
            section.classList.remove("visible");
            section.setAttribute("aria-hidden", "true");
            btn.setAttribute("aria-expanded", "false");
            setTimeout(() => {
                section.style.display = "none";
                isAnimating = false;
                setButtonState(false);
            }, 350);
        }
    };

    // Toggle esemény
    btn.addEventListener("click", () => {
        if (section.classList.contains("visible")) {
            closeProjects();
        } else {
            openProjects();
        }
    });

    // ESC zárás
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && section.classList.contains("visible")) {
            closeProjects();
        }
    });
    
    // Tabindex a jobb navigációért
    cards.forEach(card => card.setAttribute("tabindex", "0"));
})();