export const getProducts = async () => {
  return fetch("https://print-store.onrender.com/products").then((resp) =>
    resp.json()
  );
};

export const getProductBySlug = async (slug) => {
  return fetch(`https://print-store.onrender.com/products/${slug}`).then(
    (resp) => resp.json()
  );
};
