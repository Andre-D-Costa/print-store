export const getCategories = async () => {
  return fetch("http://localhost:3000/category").then((resp) => resp.json());
};
