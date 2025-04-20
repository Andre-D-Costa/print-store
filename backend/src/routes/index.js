import productRoutes from "./products/index.js";
import authRoutes from "./auth/index.js";

const routes = [...productRoutes, ...authRoutes];

export default function loadRoutes(app) {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
}
