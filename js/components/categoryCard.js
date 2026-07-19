export function createCategoryCard(category) {
  const article = document.createElement("article");
  article.className = "category-card";
  article.id = category.id;

  const label = document.createElement("span");
  label.textContent = category.label;

  const title = document.createElement("h3");
  title.textContent = category.title;

  const description = document.createElement("p");
  description.textContent = category.description;

  article.append(label, title, description);
  return article;
}
