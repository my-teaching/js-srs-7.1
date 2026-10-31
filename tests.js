"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const results = document.querySelector("#test-results");
  const fixture = document.querySelector("#fixture");
  const api = window.domSrs;
  let failed = 0;

  function assert(condition, message) {
    if (!condition) throw new Error(message);
  }

  function resetFixture() {
    fixture.innerHTML = `
      <div id="catalog"></div>
      <span id="product-count"></span>
      <span id="available-count"></span>
      <span id="total-price"></span>
      <span id="most-expensive"></span>
      <ul id="category-stats"></ul>
    `;
  }

  function test(name, fn) {
    resetFixture();
    try {
      fn();
      const p = document.createElement("p");
      p.className = "ok";
      p.textContent = `✓ ${name}`;
      results.append(p);
    } catch (error) {
      failed++;
      const p = document.createElement("p");
      p.className = "fail";
      p.textContent = `✗ ${name}: ${error.message}`;
      results.append(p);
    }
  }

  const sample = [
    { id: 1, name: "A", price: 100, category: "X", inStock: true },
    { id: 2, name: "B", price: 250, category: "Y", inStock: false },
    { id: 3, name: "C", price: 150, category: "X", inStock: true },
  ];

  test("Карточка товара формируется через DOM", () => {
    const card = api.createProductCard(sample[0]);
    assert(card.tagName === "ARTICLE", "карточка должна быть article");
    assert(card.classList.contains("product-card"), "нет класса product-card");
    assert(card.querySelector("h3").textContent === "A", "неверное название");
    assert(card.querySelector(".product-card__category").textContent === "Категория: X", "неверная категория");
    assert(card.querySelector(".product-card__price").textContent === "Цена: 100 ₸", "неверная цена");
    assert(card.querySelector(".product-card__stock").textContent === "В наличии", "неверный статус");
  });

  test("Отсутствующий товар получает отдельное состояние", () => {
    const card = api.createProductCard(sample[1]);
    assert(card.classList.contains("product-card--out"), "должен быть класс product-card--out");
    assert(card.querySelector(".product-card__stock").textContent === "Нет в наличии", "неверный текст статуса");
  });

  test("Статистика рассчитывается корректно", () => {
    const stats = api.calculateStats(sample);
    assert(stats.count === 3, "count должен быть 3");
    assert(stats.availableCount === 2, "availableCount должен быть 2");
    assert(stats.totalPrice === 500, "totalPrice должен быть 500");
    assert(stats.mostExpensive === sample[1], "нужно вернуть исходный объект самого дорогого товара");
    const empty = api.calculateStats([]);
    assert(empty.mostExpensive === null, "для пустого массива mostExpensive должен быть null");
  });

  test("Категории группируются", () => {
    const categories = api.countByCategory(sample);
    assert(categories.X === 2, "в категории X должно быть 2");
    assert(categories.Y === 1, "в категории Y должен быть 1");
  });

  test("Каталог и блок статистики выводятся на страницу", () => {
    const count = api.renderCatalog(sample);
    assert(count === 3, "renderCatalog должна вернуть 3");
    assert(document.querySelectorAll("#catalog .product-card").length === 3, "нужно вывести 3 карточки");
    assert(document.querySelector("#product-count").textContent === "3", "не заполнено количество");
    assert(document.querySelector("#available-count").textContent === "2", "не заполнено наличие");
    assert(document.querySelector("#total-price").textContent === "500 ₸", "не заполнена сумма цен");
    assert(document.querySelector("#most-expensive").textContent === "B — 250 ₸", "не заполнен самый дорогой товар");
  });

  test("Повторный вывод очищает страницу и обновляет категории", () => {
    api.renderCatalog(sample);
    api.renderCatalog([sample[0]]);
    assert(document.querySelectorAll("#catalog .product-card").length === 1, "старые карточки нужно удалить");
    const categories = [...document.querySelectorAll("#category-stats li")].map((li) => li.textContent);
    assert(categories.length === 1 && categories[0] === "X: 1", "статистика категорий должна обновляться");
  });

  const summary = document.createElement("p");
  summary.id = "test-summary";
  summary.className = failed === 0 ? "ok" : "fail";
  summary.textContent = failed === 0 ? "Все тесты пройдены." : `Ошибок: ${failed}.`;
  results.append(summary);
});
