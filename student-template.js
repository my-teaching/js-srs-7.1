"use strict";

// СРС №7.1
// Мини-проект: каталог товаров средствами DOM.
// Новых тем в этой работе нет: используются массивы, объекты, методы массивов и DOM.
// Заполните участки TODO. Имена функций и объект window.domSrs не изменяйте.

const products = [
  { id: 1, name: "Ноутбук", price: 350000, category: "Техника", inStock: true },
  { id: 2, name: "Мышь", price: 7000, category: "Аксессуары", inStock: true },
  { id: 3, name: "Монитор", price: 120000, category: "Техника", inStock: false },
  { id: 4, name: "Клавиатура", price: 15000, category: "Аксессуары", inStock: true },
  { id: 5, name: "Наушники", price: 28000, category: "Аудио", inStock: true },
  { id: 6, name: "Микрофон", price: 45000, category: "Аудио", inStock: false },
];

// Создайте DOM-карточку одного товара.
// Требуемая структура:
// article.product-card
//   h3.product-card__title
//   p.product-card__category   -> "Категория: ..."
//   p.product-card__price      -> "Цена: ... ₸"
//   p.product-card__stock      -> "В наличии" / "Нет в наличии"
// Для отсутствующего товара добавьте карточке класс product-card--out.
function createProductCard(product) {
  // TODO
}

// Верните объект статистики:
// { count, availableCount, totalPrice, mostExpensive }
// mostExpensive — исходный объект самого дорогого товара или null для пустого массива.
function calculateStats(items) {
  // TODO
}

// Верните объект вида { "Техника": 2, "Аксессуары": 2, ... }.
function countByCategory(items) {
  // TODO
}

// Главная функция мини-проекта.
// 1. Очистите #catalog и добавьте карточки всех товаров.
// 2. Заполните #product-count, #available-count, #total-price, #most-expensive.
// 3. Очистите #category-stats и добавьте по одному li для каждой категории
//    в формате "Категория: количество".
// 4. Верните количество отрисованных карточек.
function renderCatalog(items) {
  // TODO
}

window.domSrs = {
  products,
  createProductCard,
  calculateStats,
  countByCategory,
  renderCatalog,
};

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("#catalog")) {
    renderCatalog(products);
  }
});
