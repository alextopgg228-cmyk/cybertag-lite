(function () {
  "use strict";

  const STORAGE_KEY = "sgus_catalog_v1";

  const defaults = {
    faculties: [
      {
        id: "part-time",
        name: "Факультет заочного обучения",
        description: "Подготовка специалистов без отрыва от работы по направлениям физической культуры, адаптивного спорта, туризма и педагогики.",
        cost: "от 43 400 ₽ в год",
        programs: 8,
        budgetScore: 60,
        paidScore: 50,
        budgetPlaces: 100,
        paidPlaces: 80,
        image: "assets/sgus/program-education.jpg"
      },
      {
        id: "sport-wellness",
        name: "Факультет физической культуры, спорта и оздоровительных технологий",
        description: "Очная подготовка тренеров, педагогов, специалистов по реабилитации, туризму и спортивному менеджменту.",
        cost: "от 105 600 ₽ в год",
        programs: 8,
        budgetScore: 56,
        paidScore: 41,
        budgetPlaces: 268,
        paidPlaces: 70,
        image: "assets/sgus/program-coaching.jpg"
      }
    ],
    specialties: [
      {
        id: "tourism-430302",
        code: "43.03.02",
        name: "Туризм",
        qualification: "Бакалавр",
        level: "Бакалавриат",
        studyForm: "Очная, заочная",
        duration: "4 года очно / 4 года 6 месяцев заочно",
        budgetPlaces: 8,
        paidPlaces: 20,
        budgetScore: 62,
        paidScore: 41,
        cost: "от 105 600 ₽ в год",
        exams: "Русский язык, обществознание, история или иностранный язык",
        facultyId: "sport-wellness",
        description: "Подготовка специалистов по разработке и реализации туристских продуктов, организации туроператорских и турагентских услуг.",
        image: "assets/sgus/specialty-tourism.jpg"
      },
      {
        id: "physical-culture-490301",
        code: "49.03.01",
        name: "Физическая культура",
        qualification: "Бакалавр",
        level: "Бакалавриат",
        studyForm: "Очная, заочная",
        duration: "4 года очно / 4 года 6 месяцев заочно",
        budgetPlaces: 30,
        paidPlaces: 25,
        budgetScore: 60,
        paidScore: 52,
        cost: "от 43 400 ₽ в год",
        exams: "Русский язык, биология, профессиональное испытание по физической культуре",
        facultyId: "sport-wellness",
        description: "Программа готовит педагогов, инструкторов и организаторов физкультурно-оздоровительной работы.",
        image: "assets/sgus/specialty-physical.jpg"
      },
      {
        id: "adaptive-culture-490302",
        code: "49.03.02",
        name: "Адаптивная физическая культура",
        qualification: "Бакалавр",
        level: "Бакалавриат",
        studyForm: "Очная, заочная",
        duration: "4 года очно / 4 года 6 месяцев заочно",
        budgetPlaces: 35,
        paidPlaces: 22,
        budgetScore: 64,
        paidScore: 51,
        cost: "от 105 600 ₽ в год",
        exams: "Русский язык, биология, профессиональное испытание",
        facultyId: "sport-wellness",
        description: "Подготовка специалистов по физической реабилитации и адаптивному спорту для людей с ограниченными возможностями здоровья.",
        image: "assets/sgus/specialty-adaptive.jpg"
      },
      {
        id: "recreation-tourism-490303",
        code: "49.03.03",
        name: "Рекреация и спортивно-оздоровительный туризм",
        qualification: "Бакалавр",
        level: "Бакалавриат",
        studyForm: "Очная",
        duration: "4 года",
        budgetPlaces: 17,
        paidPlaces: 12,
        budgetScore: 66,
        paidScore: 51,
        cost: "от 105 600 ₽ в год",
        exams: "Русский язык, биология, профессиональное испытание",
        facultyId: "sport-wellness",
        description: "Обучение организации активного отдыха, спортивного туризма и рекреационно-оздоровительных программ.",
        image: "assets/sgus/program-tourism.jpg"
      },
      {
        id: "youth-work-390303",
        code: "39.03.03",
        name: "Организация работы с молодёжью",
        qualification: "Бакалавр",
        level: "Бакалавриат",
        studyForm: "Очная",
        duration: "4 года",
        budgetPlaces: 0,
        paidPlaces: 20,
        budgetScore: 0,
        paidScore: 71,
        cost: "от 105 600 ₽ в год",
        exams: "Русский язык, обществознание, история",
        facultyId: "sport-wellness",
        description: "Подготовка организаторов молодёжных проектов, мероприятий, добровольческих объединений и социальных инициатив.",
        image: "assets/sgus/program-youth.jpg"
      },
      {
        id: "pedagogy-safety-440305",
        code: "44.03.05",
        name: "Педагогическое образование с двумя профилями",
        qualification: "Бакалавр",
        level: "Бакалавриат",
        studyForm: "Очная",
        duration: "5 лет",
        budgetPlaces: 10,
        paidPlaces: 10,
        budgetScore: 60,
        paidScore: 50,
        cost: "от 105 600 ₽ в год",
        exams: "Русский язык, обществознание, профессиональное испытание",
        facultyId: "sport-wellness",
        description: "Подготовка учителей физической культуры и безопасности жизнедеятельности для общеобразовательных организаций.",
        image: "assets/sgus/program-safety.jpg"
      },
      {
        id: "sport-490304",
        code: "49.03.04",
        name: "Спорт",
        qualification: "Бакалавр",
        level: "Бакалавриат",
        studyForm: "Очная, заочная",
        duration: "4 года очно / 4 года 6 месяцев заочно",
        budgetPlaces: 268,
        paidPlaces: 45,
        budgetScore: 56,
        paidScore: 67,
        cost: "от 43 400 ₽ в год",
        exams: "Русский язык, биология, испытание по избранному виду спорта",
        facultyId: "sport-wellness",
        description: "Тренерско-преподавательская подготовка по избранному виду спорта с углублённым изучением теории и методики тренировок.",
        image: "assets/sgus/program-coaching.jpg"
      }
    ]
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isValid(value) {
    return value && Array.isArray(value.faculties) && Array.isArray(value.specialties);
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return isValid(saved) ? saved : clone(defaults);
    } catch (error) {
      return clone(defaults);
    }
  }

  function save(value) {
    if (!isValid(value)) throw new Error("Некорректная структура данных");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("sgus:data-change"));
  }

  function reset() {
    const value = clone(defaults);
    save(value);
    return value;
  }

  window.SgusStore = {
    key: STORAGE_KEY,
    defaults: clone(defaults),
    load,
    save,
    reset
  };
})();
