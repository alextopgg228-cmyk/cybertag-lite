(function () {
  "use strict";

  const root = document.body.dataset.root || "./";
  const store = window.SgusStore;

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const valueOrDash = (value) => value === "" || value === null || value === undefined ? "—" : value;
  const scoreText = (value) => Number(value) > 0 ? `от ${escapeHtml(value)}` : "нет набора";
  const assetUrl = (path) => /^(https?:|data:|\/)/.test(path || "") ? path : `${root}${path}`;

  function addAdminNavigation() {
    const nav = document.querySelector("[data-nav]");
    if (!nav || nav.querySelector(".nav-admin")) return;
    const link = document.createElement("a");
    link.className = "nav-admin";
    link.href = `${root}admin/login/`;
    link.textContent = "Админ-панель";
    nav.append(link);
  }

  function setupNavigation() {
    const menuButton = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (!menuButton || !nav) return;
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

  function renderSpecialties() {
    if (!store) return;
    const data = store.load();
    document.querySelectorAll("[data-specialty-count]").forEach((node) => {
      node.textContent = data.specialties.length;
    });

    document.querySelectorAll("[data-specialty-list]").forEach((list) => {
      const limit = Number(list.dataset.limit) || data.specialties.length;
      const empty = list.dataset.empty || "Специальности пока не добавлены.";
      const records = data.specialties.slice(0, limit);
      list.innerHTML = records.length ? records.map((item) => `
        <a class="specialty-card" href="${root}specialties/details/?id=${encodeURIComponent(item.id)}">
          <img src="${escapeHtml(assetUrl(item.image))}" alt="">
          <span class="specialty-card-copy">
            <small>${escapeHtml(item.level)}</small>
            <strong>${escapeHtml(item.code)} ${escapeHtml(item.name)}</strong>
            <em>${escapeHtml(item.duration)}</em>
          </span>
        </a>`).join("") : `<p class="empty-state">${escapeHtml(empty)}</p>`;
    });
  }

  function renderFaculties() {
    const list = document.querySelector("[data-faculty-list]");
    if (!list || !store) return;
    const faculties = store.load().faculties;
    list.innerHTML = faculties.length ? faculties.map((item) => `
      <article class="faculty-card">
        <img src="${escapeHtml(assetUrl(item.image))}" alt="${escapeHtml(item.name)}">
        <div class="faculty-card-body">
          <h2>${escapeHtml(item.name)}</h2>
          <p>${escapeHtml(item.description)}</p>
          <div class="program-meta">
            <div><small>Стоимость</small><strong>${escapeHtml(item.cost)}</strong></div>
            <div><small>Программ</small><strong>${escapeHtml(item.programs)}</strong></div>
            <div><small>Баллы бюджет / платно</small><strong>${escapeHtml(item.budgetScore)} / ${escapeHtml(item.paidScore)}</strong></div>
            <div><small>Места бюджет / платно</small><strong>${escapeHtml(item.budgetPlaces)} / ${escapeHtml(item.paidPlaces)}</strong></div>
          </div>
        </div>
      </article>`).join("") : '<p class="empty-state">Факультеты пока не добавлены.</p>';
  }

  function renderSpecialtyDetails() {
    const host = document.querySelector("[data-specialty-details]");
    if (!host || !store) return;

    const id = new URLSearchParams(location.search).get("id");
    const data = store.load();
    const specialty = data.specialties.find((item) => item.id === id);

    if (!specialty) {
      document.title = "Специальность не найдена — СГУС";
      host.innerHTML = `
        <section class="page-section"><div class="container not-found-card">
          <span class="status-pill">Ошибка 404</span>
          <h1>Специальность не найдена</h1>
          <p>Запись могла быть удалена или адрес указан неверно.</p>
          <a class="button" href="${root}specialties/">Вернуться к специальностям</a>
        </div></section>`;
      return;
    }

    const faculty = data.faculties.find((item) => item.id === specialty.facultyId);
    document.title = `${specialty.code} ${specialty.name} — СГУС`;
    host.innerHTML = `
      <section class="detail-hero">
        <img class="detail-hero-bg" src="${escapeHtml(assetUrl(specialty.image))}" alt="">
        <div class="container detail-hero-content">
          <div class="breadcrumbs"><a href="${root}">СГУС</a><span>→</span><a href="${root}specialties/">Специальности</a><span>→</span><span>${escapeHtml(specialty.code)}</span></div>
          <span class="status-pill">${escapeHtml(specialty.level)}</span>
          <h1>${escapeHtml(specialty.code)}<br>${escapeHtml(specialty.name)}</h1>
          <p>${escapeHtml(specialty.description)}</p>
        </div>
      </section>
      <section class="page-section">
        <div class="container detail-layout">
          <div>
            <h2 class="detail-heading">Обучение и поступление</h2>
            <div class="fact-grid">
              <article><small>Квалификация</small><strong>${escapeHtml(specialty.qualification)}</strong></article>
              <article><small>Форма обучения</small><strong>${escapeHtml(specialty.studyForm)}</strong></article>
              <article><small>Срок обучения</small><strong>${escapeHtml(specialty.duration)}</strong></article>
              <article><small>Бюджетных мест</small><strong>${escapeHtml(valueOrDash(specialty.budgetPlaces))}</strong></article>
              <article><small>Платных мест</small><strong>${escapeHtml(valueOrDash(specialty.paidPlaces))}</strong></article>
              <article><small>Проходной на бюджет</small><strong>${scoreText(specialty.budgetScore)} баллов</strong></article>
              <article><small>Проходной на платное</small><strong>${scoreText(specialty.paidScore)} баллов</strong></article>
              <article><small>Стоимость</small><strong>${escapeHtml(specialty.cost)}</strong></article>
            </div>
            <article class="info-panel">
              <h2>Вступительные испытания</h2>
              <p>${escapeHtml(specialty.exams)}</p>
            </article>
            <article class="info-panel">
              <h2>Факультет</h2>
              <p>${faculty ? escapeHtml(faculty.name) : "Факультет уточняется"}</p>
            </article>
          </div>
          <aside class="sticky-card detail-aside">
            <span class="status-pill orange-pill">Приём 2026</span>
            <h3>Оцените шансы поступить</h3>
            <p>Введите результаты экзаменов и сравните средний балл с проходными значениями.</p>
            <a class="button full orange" href="${root}admissions/">Проверить шансы</a>
            <a class="text-link" href="${root}contacts/">Связаться с приёмной комиссией →</a>
          </aside>
        </div>
      </section>`;
  }

  function setupProgramSearch() {
    const searchInput = document.querySelector("[data-program-search]");
    const programCards = [...document.querySelectorAll("[data-program-card]")];
    const emptyState = document.querySelector("[data-empty-state]");
    if (!searchInput || !programCards.length) return;

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

  function setupChanceCalculator() {
    const chanceForm = document.querySelector("[data-chance-form]");
    const chanceNumber = document.querySelector("[data-chance-number]");
    const chanceMessage = document.querySelector("[data-chance-message]");
    if (!chanceForm || !chanceNumber || !chanceMessage) return;

    chanceForm.addEventListener("submit", (event) => {
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
  }

  function addAdminLink() {
    const footer = document.querySelector(".footer-bottom");
    if (!footer || footer.querySelector(".admin-footer-link")) return;
    const link = document.createElement("a");
    link.className = "admin-footer-link";
    link.href = `${root}admin/login/`;
    link.textContent = "Вход для администратора";
    footer.append(" · ", link);
  }

  addAdminNavigation();
  setupNavigation();
  renderSpecialties();
  renderFaculties();
  renderSpecialtyDetails();
  setupProgramSearch();
  setupChanceCalculator();
  addAdminLink();
})();
