document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("langToggle");

  const applyLang = (lang) => {
    body.setAttribute("data-lang", lang);
    toggle.textContent = lang === "ko" ? "EN" : "KO";
    document.documentElement.lang = lang;
    localStorage.setItem("stepseoul-lang", lang);
  };

  const saved = localStorage.getItem("stepseoul-lang") || "ko";
  applyLang(saved);

  toggle.addEventListener("click", () => {
    const next = body.getAttribute("data-lang") === "ko" ? "en" : "ko";
    applyLang(next);
  });

  const heroTitle = document.querySelector(".hero .title-drop");
  const sectionTitles = document.querySelectorAll(".section .title-drop");

  if (heroTitle) {
    requestAnimationFrame(() => heroTitle.classList.add("in-view"));
  }

  if (sectionTitles.length && "IntersectionObserver" in window) {
    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            titleObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" }
    );
    sectionTitles.forEach((el) => titleObserver.observe(el));
  } else {
    sectionTitles.forEach((el) => el.classList.add("in-view"));
  }

  document.querySelectorAll(".route-caption").forEach((p) => {
    const text = p.textContent;
    p.textContent = "";
    [...text].forEach((ch, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch === " " ? " " : ch;
      span.style.transitionDelay = `${i * 16}ms`;
      p.appendChild(span);
    });
  });

  const captionWrap = document.querySelector(".route-caption-wrap");
  if (captionWrap && "IntersectionObserver" in window) {
    const captionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            captionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    captionObserver.observe(captionWrap);
  } else if (captionWrap) {
    captionWrap.classList.add("is-visible");
  }

  const routeImg = document.getElementById("routeImg");
  const routeTabs = document.querySelectorAll(".route-tab");
  if (routeImg && routeTabs.length) {
    routeTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        routeTabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        routeImg.src = routeImg.dataset[tab.dataset.target];
      });
    });
  }
});
