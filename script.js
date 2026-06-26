const currency = new Intl.NumberFormat("ru-RU");

const credentials = {
  username: "manager",
  password: "cybertag2026",
  name: "Менеджер CYBERTAG"
};

const partners = [
  ["LASERWAR", "assets/partner-lw.svg", "https://laserwar.ru"],
  ["CyberTag", "assets/partner-cybertag.svg", "https://cybertag.ru"],
  ["LaserArena", "assets/partner-laserarena.svg", "https://laserarena.ru"],
  ["Майские Маневры", "assets/partner-may-maneuvers.png", "https://maymanevry.ru"],
  ["Laserwar CRM", "assets/partner-crm.svg", "https://laserwar.club"],
  ["Лазертаг Биатлон", "assets/partner-biathlon.svg", "http://laserbiatlon.ru"],
  ["ZombieTag", "assets/partner-zombietag.svg", "https://zombie-lasertag.ru"],
  ["Федерация лазертага", "assets/partner-federation.png", "https://lasertag-federation.ru"],
  ["Alphatag", "assets/partner-alpha.svg", "http://alphatag.ru"],
  ["Laser tag base", "assets/partner-base.svg", "https://lasertagbase.com"]
];

const equipment = [
  {
    title: "Бластер",
    image: "assets/catalog-blaster.jpg",
    meta: ["0,8 кг", "мощность 1-100%"],
    text: "Компактный корпус одинаково удобен детям и взрослым. Сенсоры в бластере и датчик второй руки повышают безопасность игры.",
    details: ["Емкий аккумулятор до 24 часов", "Мягкий бампер на стволе", "Эргономичные рукоятки"]
  },
  {
    title: "Жилет",
    image: "assets/catalog-vest.jpg",
    meta: ["1,0 кг", "индивидуальная регулировка"],
    text: "Легкий прочный жилет не стесняет движений и подстраивается под игроков разной комплекции.",
    details: ["Гигиеническая подкладка", "10 датчиков поражения", "Световая и виброиндикация"]
  },
  {
    title: "BASEX",
    image: "assets/catalog-basex.jpg",
    meta: ["0,5 кг", "интерактивность арены"],
    text: "Игровое устройство связывает площадку в единую систему и помогает строить сценарии на всей территории.",
    details: ["RGB-индикация", "Встроенный радиоканал", "Удобный монтаж"]
  },
  {
    title: "Энерджайзер",
    image: "assets/catalog-energizer.jpg",
    meta: ["0,4 кг", "новые сценарии"],
    text: "Интерактивное устройство для восстановления жизненных сил и боекомплекта во время игры.",
    details: ["Яркая RGB-индикация", "Прочный корпус", "Светящаяся кнопка"]
  },
  {
    title: "Радиобаза",
    image: "assets/catalog-radiobase.jpg",
    meta: ["0,3 кг", "покрытие арены"],
    text: "Радиобаза поддерживает стабильную связь игровых комплектов и локальной сети арены.",
    details: ["Внешняя антенна", "Сетевой порт", "Компактный корпус"]
  }
];

const bundles = [
  {
    title: "Start",
    image: "assets/bundle-start.png",
    players: 12,
    area: "до 200 м²",
    sets: "x12",
    oldPrice: 823900,
    price: 695500,
    badge: "Бонус",
    details: [
      "2 комплекта бластер + жилет",
      "Программное обеспечение",
      "Зарядное устройство Smart Li+ - 16 шт.",
      "Блок питания 12В - 4 шт.",
      "Ремкомплект - 1 шт."
    ]
  },
  {
    title: "Optima Wireless",
    image: "assets/bundle-optima.png",
    players: 18,
    area: "до 300 м²",
    sets: "x18",
    oldPrice: 1209100,
    price: 1016500,
    badge: "Хит продаж",
    hit: true,
    details: [
      "3 комплекта бластер + жилет",
      "Зарядное устройство Smart Li+ - 22 шт.",
      "15 жилетов и 15 бластеров",
      "Радиобаза и BASEX"
    ]
  },
  {
    title: "Smart",
    image: "assets/bundle-smart.png",
    players: 24,
    area: "до 400 м²",
    sets: "x24",
    oldPrice: 1644650,
    price: 1387850,
    badge: "4 комплекта в подарок",
    details: [
      "Программное обеспечение в подарок",
      "Зарядное устройство Smart Li+ - 32 шт.",
      "Блок питания 12В - 6 шт.",
      "20 жилетов и 20 бластеров",
      "3 устройства BASEX и энерджайзер"
    ]
  },
  {
    title: "Pro",
    image: "assets/bundle-pro.png",
    players: 30,
    area: "до 600 м²",
    sets: "x30",
    oldPrice: 2029850,
    price: 1708850,
    badge: "5 комплектов",
    details: [
      "Зарядное устройство Smart Li+ - 38 шт.",
      "Ремкомплект - 2 шт.",
      "25 жилетов и 25 бластеров",
      "Расширенный набор интерактива"
    ]
  },
  {
    title: "Elite",
    image: "assets/bundle-elite.png",
    players: 36,
    area: "до 1000 м²",
    sets: "x36",
    oldPrice: 2453600,
    price: 2068400,
    badge: "6 комплектов",
    details: [
      "Зарядное устройство Smart Li+ - 47 шт.",
      "Блок питания 12В - 8 шт.",
      "30 жилетов и 30 бластеров",
      "4 устройства BASEX и энерджайзер"
    ]
  }
];

const offers = [
  {
    title: "Уникальное предложение по апгрейду арены",
    image: "assets/offer-laserwar.jpg",
    date: "Июн 14, 2026 - Июн 14, 2027",
    code: "2762",
    text: "Обновление действующей площадки до CYBERTAG 2.0 Black Edition для арен, которым нужен новый уровень игры."
  },
  {
    title: "CRM-система для лазертага в подарок",
    image: "assets/offer-crm.jpg",
    date: "Июн 14, 2026 - Июн 14, 2027",
    code: "2852",
    text: "При покупке любой комплектации CYBERTAG доступ к Laserwar CRM предоставляется на три месяца."
  },
  {
    title: "Франшиза для лазертаг-клуба в подарок",
    image: "assets/offer-franchise.jpg",
    date: "Июн 14, 2026 - Июн 14, 2027",
    code: "3221",
    text: "Пакет материалов для бизнеса бесплатно при покупке комплекта оборудования для аренного лазертага."
  }
];

const contacts = [
  {
    name: "Алина Данченкова",
    role: "Менеджер по продажам",
    phone: "+7 (900) 225-55-52",
    tel: "+79002255552",
    vk: "https://vk.com/laserwar_order67",
    image: "assets/contact-alina.jpg"
  },
  {
    name: "Дарья Кузьменкова",
    role: "Менеджер по продажам",
    phone: "+7 (904) 360-40-99",
    tel: "+79043604099",
    vk: "https://vk.com/lw_manager",
    image: "assets/contact-darya.jpg"
  },
  {
    name: "Наталья Орлова",
    role: "Менеджер по продажам",
    phone: "+7 (951) 694-01-00",
    tel: "+79516940100",
    vk: "https://vk.com/laserwar_store",
    image: "assets/contact-natalia.jpg"
  },
  {
    name: "Елена Крылова",
    role: "Менеджер по продажам",
    phone: "+7 (951) 701-77-55",
    tel: "+79517017755",
    vk: "https://vk.com/laserwar_shop",
    image: "assets/contact-elena.jpg"
  }
];

const storage = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};

const formatPrice = (value) => `${currency.format(value)} ₽`;

const renderPartners = () => {
  const root = document.querySelector("[data-partners]");
  root.innerHTML = partners.map(([name, image, href]) => `
    <a href="${href}" target="_blank" rel="noreferrer" aria-label="${name}">
      <img src="${image}" alt="${name}" loading="lazy">
    </a>
  `).join("");
};

const renderEquipment = () => {
  const root = document.querySelector("[data-equipment]");
  root.innerHTML = equipment.map((item) => `
    <article class="equipment-card">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="card-body">
        <div class="equipment-meta">
          ${item.meta.map((meta) => `<span class="pill">${meta}</span>`).join("")}
        </div>
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        <ul>${item.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
};

const renderBundles = () => {
  const root = document.querySelector("[data-bundles]");
  root.innerHTML = bundles.map((bundle) => `
    <article class="bundle-card${bundle.hit ? " hit" : ""}">
      <div class="bundle-image">
        <img src="${bundle.image}" alt="${bundle.title}" loading="lazy">
        <span class="badge">${bundle.badge}</span>
      </div>
      <div class="bundle-body">
        <div class="bundle-topline">
          <h3>${bundle.title}</h3>
          <span>${bundle.sets}</span>
        </div>
        <dl class="bundle-facts">
          <div>
            <dt>Игроков</dt>
            <dd>${bundle.players}</dd>
          </div>
          <div>
            <dt>Площадь</dt>
            <dd>${bundle.area}</dd>
          </div>
        </dl>
        <ul>${bundle.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
        <div class="price-row">
          <span class="old-price">${formatPrice(bundle.oldPrice)}</span>
          <span class="new-price">${formatPrice(bundle.price)}</span>
        </div>
        <button class="button primary" type="button" data-add-bundle="${bundle.title}">В корзину</button>
      </div>
    </article>
  `).join("");
};

const renderOffers = () => {
  const root = document.querySelector("[data-offers]");
  root.innerHTML = offers.map((offer) => `
    <article class="offer-card">
      <img src="${offer.image}" alt="${offer.title}" loading="lazy">
      <div class="card-body">
        <div class="offer-date">
          <span>${offer.date}</span>
          <span class="offer-code">ID ${offer.code}</span>
        </div>
        <h3>${offer.title}</h3>
        <p>${offer.text}</p>
      </div>
    </article>
  `).join("");
};

const renderContacts = () => {
  const root = document.querySelector("[data-contacts]");
  root.innerHTML = contacts.map((contact) => `
    <article class="contact-card">
      <img src="${contact.image}" alt="${contact.name}" loading="lazy">
      <h3>${contact.name}</h3>
      <p>${contact.role}</p>
      <strong>${contact.phone}</strong>
      <div class="contact-links">
        <a href="tel:${contact.tel}">Позвонить</a>
        <a href="https://wa.me/${contact.tel.replace("+", "")}" target="_blank" rel="noreferrer">WhatsApp</a>
        <a href="https://t.me/${contact.tel}" target="_blank" rel="noreferrer">Telegram</a>
        <a href="${contact.vk}" target="_blank" rel="noreferrer">VK</a>
      </div>
    </article>
  `).join("");
};

const getCart = () => storage.get("cybertag-cart", []);

const setCart = (cart) => {
  storage.set("cybertag-cart", cart);
  renderCart();
};

const renderCart = () => {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const countText = `${cart.length} ${cart.length === 1 ? "позиция" : cart.length > 1 && cart.length < 5 ? "позиции" : "позиций"}`;

  document.querySelector("[data-cart-count]").textContent = countText;
  document.querySelector("[data-cart-total]").textContent = formatPrice(total);
  document.querySelector("[data-dashboard-cart]").textContent = formatPrice(total);

  const list = document.querySelector("[data-cart-list]");
  if (!cart.length) {
    list.innerHTML = "<li><span>Корзина пуста</span></li>";
    return;
  }

  list.innerHTML = cart.map((item) => `
    <li>
      <span>${item.title}</span>
      <strong>${formatPrice(item.price)}</strong>
    </li>
  `).join("");
};

const addBundleToCart = (title) => {
  const bundle = bundles.find((item) => item.title === title);
  if (!bundle) return;
  setCart([...getCart(), { title: bundle.title, price: bundle.price }]);
};

const getRequests = () => storage.get("cybertag-requests", []);

const renderDashboard = () => {
  const user = storage.get("cybertag-user", null);
  const dashboard = document.querySelector("[data-dashboard]");
  const loginButton = document.querySelector("[data-open-login]");
  const requestCount = document.querySelector("[data-request-count]");
  const userName = document.querySelector("[data-user-name]");

  if (user) {
    dashboard.hidden = false;
    loginButton.textContent = user.username;
    userName.textContent = user.name;
  } else {
    dashboard.hidden = true;
    loginButton.textContent = "Вход";
  }

  requestCount.textContent = String(getRequests().length);
  renderCart();
};

const setupMenu = () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a, button")) {
      document.body.classList.remove("menu-open");
    }
  });
};

const setupCart = () => {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add-bundle]");
    if (!button) return;
    addBundleToCart(button.dataset.addBundle);
  });

  document.querySelector("[data-clear-cart]").addEventListener("click", () => {
    setCart([]);
  });
};

const setupFeedback = () => {
  const form = document.querySelector("[data-feedback-form]");
  const status = document.querySelector("[data-feedback-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const requests = getRequests();
    requests.push({
      email: data.get("email"),
      name: data.get("name"),
      message: data.get("message"),
      cart: getCart(),
      createdAt: new Date().toISOString()
    });
    storage.set("cybertag-requests", requests);
    form.reset();
    status.textContent = "Заявка сохранена.";
    status.classList.add("success");
    renderDashboard();
  });
};

const setupLogin = () => {
  const dialog = document.querySelector("[data-login-dialog]");
  const openButton = document.querySelector("[data-open-login]");
  const closeButton = document.querySelector("[data-close-login]");
  const form = document.querySelector("[data-login-form]");
  const error = document.querySelector("[data-login-error]");

  openButton.addEventListener("click", () => {
    const user = storage.get("cybertag-user", null);
    if (user) {
      document.querySelector("[data-dashboard]").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    error.textContent = "";
    dialog.showModal();
  });

  closeButton.addEventListener("click", () => dialog.close());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const username = String(data.get("username")).trim();
    const password = String(data.get("password"));

    if (username === credentials.username && password === credentials.password) {
      storage.set("cybertag-user", {
        username: credentials.username,
        name: credentials.name
      });
      form.reset();
      dialog.close();
      renderDashboard();
    } else {
      error.textContent = "Неверный пользователь или пароль.";
    }
  });

  document.querySelector("[data-logout]").addEventListener("click", () => {
    storage.remove("cybertag-user");
    renderDashboard();
  });
};

const init = () => {
  renderPartners();
  renderEquipment();
  renderBundles();
  renderOffers();
  renderContacts();
  setupMenu();
  setupCart();
  setupFeedback();
  setupLogin();
  renderDashboard();
};

init();
