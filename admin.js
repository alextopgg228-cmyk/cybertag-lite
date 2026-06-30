(function () {
  "use strict";

  const USERNAME = "admin";
  const PASSWORD = "SGUS2026";
  const SESSION_KEY = "sgus_admin_session";
  const store = window.SgusStore;

  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function setNotice(message, type = "success") {
    const notice = document.querySelector("[data-admin-notice]");
    if (!notice) return;
    notice.textContent = message;
    notice.className = `admin-notice ${type}`;
    notice.hidden = false;
    clearTimeout(setNotice.timer);
    setNotice.timer = setTimeout(() => { notice.hidden = true; }, 3500);
  }

  function setupLogin() {
    const form = document.querySelector("[data-login-form]");
    if (!form) return false;
    if (sessionStorage.getItem(SESSION_KEY) === "active") {
      location.replace("../");
      return true;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const error = document.querySelector("[data-login-error]");
      if (data.get("username") === USERNAME && data.get("password") === PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, "active");
        location.href = "../";
      } else {
        error.hidden = false;
        form.querySelector("[name=password]").value = "";
        form.querySelector("[name=password]").focus();
      }
    });
    return true;
  }

  function ensureAuthorized() {
    const panel = document.querySelector("[data-admin-panel]");
    if (!panel) return false;
    if (sessionStorage.getItem(SESSION_KEY) !== "active") {
      location.replace("login/");
      return false;
    }
    return true;
  }

  function makeId(prefix) {
    const random = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    return `${prefix}-${random}`;
  }

  function formToObject(form, numericFields) {
    const values = Object.fromEntries(new FormData(form).entries());
    numericFields.forEach((field) => { values[field] = Number(values[field]) || 0; });
    return values;
  }

  function fillForm(form, values) {
    [...form.elements].forEach((field) => {
      if (field.name && Object.prototype.hasOwnProperty.call(values, field.name)) {
        field.value = values[field.name] ?? "";
      }
    });
  }

  function clearForm(form) {
    form.reset();
    const id = form.querySelector("[name=id]");
    if (id) id.value = "";
    const heading = form.querySelector("[data-form-title]");
    if (heading) heading.textContent = form.dataset.newTitle;
  }

  function renderFacultyOptions(data) {
    const select = document.querySelector("[name=facultyId]");
    if (!select) return;
    const selected = select.value;
    select.innerHTML = '<option value="">Не выбран</option>' + data.faculties.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join("");
    select.value = selected;
  }

  function render(data) {
    document.querySelector("[data-faculty-total]").textContent = data.faculties.length;
    document.querySelector("[data-specialty-total]").textContent = data.specialties.length;
    renderFacultyOptions(data);

    const facultyList = document.querySelector("[data-admin-faculties]");
    facultyList.innerHTML = data.faculties.length ? data.faculties.map((item) => `
      <article class="admin-record">
        <div><span class="record-code">${escapeHtml(item.programs)} программ</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><small>${escapeHtml(item.budgetPlaces)} бюджетных · ${escapeHtml(item.paidPlaces)} платных мест</small></div>
        <div class="record-actions"><button type="button" class="small-button" data-edit="faculty" data-id="${escapeHtml(item.id)}">Изменить</button><button type="button" class="small-button danger" data-delete="faculty" data-id="${escapeHtml(item.id)}">Удалить</button></div>
      </article>`).join("") : '<p class="empty-state">Факультеты не добавлены.</p>';

    const specialtyList = document.querySelector("[data-admin-specialties]");
    specialtyList.innerHTML = data.specialties.length ? data.specialties.map((item) => `
      <article class="admin-record">
        <div><span class="record-code">${escapeHtml(item.code)} · ${escapeHtml(item.level)}</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.duration)} · ${escapeHtml(item.studyForm)}</p><small>${escapeHtml(item.budgetPlaces)} бюджетных · ${escapeHtml(item.paidPlaces)} платных мест</small></div>
        <div class="record-actions"><a class="small-button" href="../specialties/details/?id=${encodeURIComponent(item.id)}" target="_blank">Открыть</a><button type="button" class="small-button" data-edit="specialty" data-id="${escapeHtml(item.id)}">Изменить</button><button type="button" class="small-button danger" data-delete="specialty" data-id="${escapeHtml(item.id)}">Удалить</button></div>
      </article>`).join("") : '<p class="empty-state">Специальности не добавлены.</p>';
  }

  function activateTab(name) {
    document.querySelectorAll("[data-admin-tab]").forEach((button) => button.classList.toggle("active", button.dataset.adminTab === name));
    document.querySelectorAll("[data-admin-section]").forEach((section) => { section.hidden = section.dataset.adminSection !== name; });
  }

  function setupPanel() {
    if (!ensureAuthorized() || !store) return;
    let data = store.load();
    const facultyForm = document.querySelector("[data-faculty-form]");
    const specialtyForm = document.querySelector("[data-specialty-form]");
    render(data);

    document.querySelectorAll("[data-admin-tab]").forEach((button) => {
      button.addEventListener("click", () => activateTab(button.dataset.adminTab));
    });

    document.querySelector("[data-logout]").addEventListener("click", () => {
      sessionStorage.removeItem(SESSION_KEY);
      location.href = "login/";
    });

    document.querySelectorAll("[data-new-record]").forEach((button) => {
      button.addEventListener("click", () => {
        const form = button.dataset.newRecord === "faculty" ? facultyForm : specialtyForm;
        clearForm(form);
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        form.querySelector("input:not([type=hidden])")?.focus();
      });
    });

    document.querySelectorAll("[data-cancel-edit]").forEach((button) => {
      button.addEventListener("click", () => clearForm(button.closest("form")));
    });

    facultyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = formToObject(facultyForm, ["programs", "budgetScore", "paidScore", "budgetPlaces", "paidPlaces"]);
      values.id ||= makeId("faculty");
      const index = data.faculties.findIndex((item) => item.id === values.id);
      if (index >= 0) data.faculties[index] = values; else data.faculties.push(values);
      store.save(data);
      clearForm(facultyForm);
      render(data);
      setNotice(index >= 0 ? "Факультет обновлён." : "Факультет добавлен.");
    });

    specialtyForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const values = formToObject(specialtyForm, ["budgetPlaces", "paidPlaces", "budgetScore", "paidScore"]);
      values.id ||= makeId("specialty");
      const index = data.specialties.findIndex((item) => item.id === values.id);
      if (index >= 0) data.specialties[index] = values; else data.specialties.push(values);
      store.save(data);
      clearForm(specialtyForm);
      render(data);
      setNotice(index >= 0 ? "Специальность обновлена." : "Специальность добавлена.");
    });

    document.querySelector("[data-admin-panel]").addEventListener("click", (event) => {
      const edit = event.target.closest("[data-edit]");
      const remove = event.target.closest("[data-delete]");
      if (edit) {
        const type = edit.dataset.edit;
        const record = type === "faculty"
          ? data.faculties.find((item) => item.id === edit.dataset.id)
          : data.specialties.find((item) => item.id === edit.dataset.id);
        const form = type === "faculty" ? facultyForm : specialtyForm;
        activateTab(type === "faculty" ? "faculties" : "specialties");
        fillForm(form, record);
        form.querySelector("[data-form-title]").textContent = type === "faculty" ? "Редактирование факультета" : "Редактирование специальности";
        form.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (remove) {
        const type = remove.dataset.delete;
        const collection = type === "faculty" ? data.faculties : data.specialties;
        const record = collection.find((item) => item.id === remove.dataset.id);
        if (!record || !confirm(`Удалить «${record.name}»?`)) return;
        const index = collection.findIndex((item) => item.id === record.id);
        collection.splice(index, 1);
        store.save(data);
        render(data);
        setNotice("Запись удалена.");
      }
    });

    document.querySelector("[data-reset-data]").addEventListener("click", () => {
      if (!confirm("Вернуть исходные факультеты и специальности? Все изменения в этом браузере будут удалены.")) return;
      data = store.reset();
      clearForm(facultyForm);
      clearForm(specialtyForm);
      render(data);
      setNotice("Исходные данные восстановлены.");
    });

    document.querySelector("[data-export-data]").addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `sgus-catalog-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(link.href);
      setNotice("Резервная копия скачана.");
    });

    document.querySelector("[data-import-data]").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      try {
        const imported = JSON.parse(await file.text());
        if (!Array.isArray(imported.faculties) || !Array.isArray(imported.specialties)) throw new Error();
        store.save(imported);
        data = imported;
        render(data);
        setNotice("Данные импортированы.");
      } catch (error) {
        setNotice("Не удалось импортировать файл: неверный формат.", "error");
      } finally {
        event.target.value = "";
      }
    });
  }

  if (!setupLogin()) setupPanel();
})();
