import productRoutes from "./products/index.js";
import authRoutes from "./auth/index.js";
import orderRoutes from "./order/index.js";
import categoryRoutes from "./categories/index.js";

const routes = [
  ...productRoutes,
  ...categoryRoutes,
  ...authRoutes,
  ...orderRoutes,
];

export default function loadRoutes(app) {
  routes.forEach((route) => {
    app[route.method](route.path, route.handler);
  });
}
