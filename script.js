const menuButton = document.querySelector("[data-menu-toggle]");
const mainNav = document.querySelector("[data-nav]");

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const opened = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });

  mainNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });

  const current = location.pathname.replace(/index\.html$/, "");
  mainNav.querySelectorAll("a").forEach((link) => {
    const target = new URL(link.href).pathname.replace(/index\.html$/, "");
    if (target === current) link.classList.add("active");
  });
}

const accessibilityButton = document.querySelector("[data-accessibility]");
const contrastKey = "sovfd-high-contrast";

if (localStorage.getItem(contrastKey) === "1") {
  document.body.classList.add("high-contrast");
}

accessibilityButton?.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("high-contrast");
  localStorage.setItem(contrastKey, enabled ? "1" : "0");
  accessibilityButton.setAttribute("aria-pressed", String(enabled));
});

const cookie = document.querySelector("[data-cookie]");
const cookieButton = document.querySelector("[data-cookie-accept]");

if (cookie && localStorage.getItem("sovfd-cookie-accepted") !== "1") {
  cookie.hidden = false;
}

cookieButton?.addEventListener("click", () => {
  localStorage.setItem("sovfd-cookie-accepted", "1");
  cookie.hidden = true;
});

const staffSearch = document.querySelector("[data-staff-search]");
const staffCards = [...document.querySelectorAll("[data-staff-card]")];
const emptySearch = document.querySelector("[data-search-empty]");

if (staffSearch && staffCards.length) {
  const filterStaff = () => {
    const query = staffSearch.value.trim().toLowerCase();
    let visible = 0;
    staffCards.forEach((card) => {
      const matches = card.textContent.toLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    if (emptySearch) emptySearch.hidden = visible !== 0;
  };

  staffSearch.addEventListener("input", filterStaff);
  document.querySelector("[data-staff-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    filterStaff();
  });
}
