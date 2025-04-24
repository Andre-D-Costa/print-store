export const getCategories = async () => {
  return fetch("https://print-store.onrender.com/categories").then((resp) =>
    resp.json()
  );
};
