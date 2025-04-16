import productRoutes from "./products/index.js";
import userRoutes from "./users/index.js";

const routes = [...productRoutes, ...userRoutes];

export default function loadRoutes(app) {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
}
