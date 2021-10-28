export async function getCategories() {
  const request = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await request.json();

  return categories;
}

export async function getProductByID(ItemID) {
  const request = await fetch(`https://api.mercadolibre.com/items/${ItemID}`);
  const product = await request.json();

  return product;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let products;

  if (!categoryId && query) {
    products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
  }

  if (categoryId && !query) {
    products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
  }

  if (categoryId && query) {
    products = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  }
  const response = products.json();

  return response;
}
