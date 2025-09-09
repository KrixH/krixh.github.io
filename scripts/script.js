// AUTOMATIKUS ÉVSZÁM
(function () {
  const startYear = 2022;
  const currentYear = new Date().getFullYear();
  const el = document.getElementById("year-range");
  if (el) {
    el.textContent = startYear === currentYear ? startYear : `${startYear}-${currentYear}`;
  }
})();

// TOGGLE + STAGGERED ANIMATIONS
(function () {
  const btn = document.getElementById("toggleProjects");
  const section = document.getElementById("projects");
  const cards = Array.from(document.querySelectorAll(".project-card"));
  let animating = false;

  if (!btn || !section) return;

  // aria-controls beállítása a gombra
  if (btn && section) {
    btn.setAttribute("aria-controls", "projects");
  }

  function setBtnDisabled(disabled) {
    btn.disabled = disabled;
    btn.classList.toggle("loading", disabled);
  }

  // helper to show with stagger
  function openProjects() {
    if (animating) return;
    animating = true;
    setBtnDisabled(true);
    section.style.display = "block";
    // allow browser to paint before adding visible class
    requestAnimationFrame(() => {
      section.classList.add("visible");
      section.setAttribute("aria-hidden", "false");
      btn.setAttribute("aria-expanded", "true");
      // stagger-in cards
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.classList.add("show");
          // last one ends animating
          if (i === cards.length - 1) {
            // small extra delay to ensure transitions end
            setTimeout(() => (animating = false), 220);
          }
        }, i * 160);
      });
      // fókusz az első kártyára, ha van
      if (cards.length > 0) {
        setTimeout(() => cards[0].focus && cards[0].focus(), cards.length * 160 + 100);
      }
      // if there are no cards, end animating
      if (cards.length === 0) {
        animating = false;
        setBtnDisabled(false);
      }
      // animáció végén:
      setTimeout(() => {
        animating = false;
        setBtnDisabled(false);
      }, cards.length * 160 + 220);
    });
    setTimeout(() => {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  }

  // helper to hide with reverse stagger
  function closeProjects() {
    if (animating) return;
    animating = true;
    setBtnDisabled(true);
    // reverse hide cards
    const total = cards.length;
    cards.slice().reverse().forEach((card, idx) => {
      setTimeout(() => {
        card.classList.remove("show");
        // when last card removed, hide container
        if (idx === total - 1) {
          // wait for card transition to finish
          setTimeout(() => {
            section.classList.remove("visible");
            section.setAttribute("aria-hidden", "true");
            btn.setAttribute("aria-expanded", "false");
            // after container transition, set display none
            setTimeout(() => {
              section.style.display = "none";
              animating = false;
            }, 320);
          }, 180);
        }
      }, idx * 140);
    });

    // fallback when no cards
    if (cards.length === 0) {
      section.classList.remove("visible");
      section.setAttribute("aria-hidden", "true");
      btn.setAttribute("aria-expanded", "false");
      setTimeout(() => {
        section.style.display = "none";
        animating = false;
      }, 360);
    }
    // animáció végén:
    setTimeout(() => {
      animating = false;
      setBtnDisabled(false);
    }, total * 140 + 500);
  }

  // Toggle on click (button)
  btn.addEventListener("click", () => {
    // Frissítsd a cards tömböt, ha a projektek dinamikusan változnak
    cards.length = 0;
    cards.push(...document.querySelectorAll(".project-card"));
    if (section.classList.contains("visible")) {
      closeProjects();
    } else {
      openProjects();
    }
  });

  // Optional: close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && section.classList.contains("visible")) {
      closeProjects();
    }
  });

  cards.forEach(card => card.setAttribute("tabindex", "0"));
})();
