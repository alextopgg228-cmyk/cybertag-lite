const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const opened = document.body.classList.toggle("menu-open");
    menuButton.setAttribute("aria-expanded", String(opened));
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  const current = location.pathname.replace(/index\.html$/, "");
  nav.querySelectorAll("a").forEach((link) => {
    const target = new URL(link.href).pathname.replace(/index\.html$/, "");
    if (target === current) link.classList.add("active");
  });
}

const searchInput = document.querySelector("[data-program-search]");
const programCards = [...document.querySelectorAll("[data-program-card]")];
const emptyState = document.querySelector("[data-empty-state]");

if (searchInput && programCards.length) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let visible = 0;
    programCards.forEach((card) => {
      const matched = card.textContent.toLowerCase().includes(query);
      card.hidden = !matched;
      if (matched) visible += 1;
    });
    if (emptyState) emptyState.hidden = visible !== 0;
  });
}

const chanceForm = document.querySelector("[data-chance-form]");
const chanceNumber = document.querySelector("[data-chance-number]");
const chanceMessage = document.querySelector("[data-chance-message]");

chanceForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const scores = [...chanceForm.querySelectorAll("input[type=number]")].map((input) => Number(input.value));
  if (scores.some((score) => !Number.isFinite(score) || score < 0 || score > 100)) return;
  const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  chanceNumber.textContent = average.toFixed(1);
  chanceMessage.textContent = average >= 66
    ? "Средний балл выше проходного уровня большинства программ. Шансы на бюджет хорошие."
    : average >= 52
      ? "Есть подходящие программы и хорошие варианты платного обучения."
      : "Рекомендуем рассмотреть программы с более низким проходным баллом и платные места.";
});
