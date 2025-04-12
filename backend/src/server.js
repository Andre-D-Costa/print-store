import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import loadRoutes from "./routes/index.js";

const app = express();
const port = 3000;
app.use(cors());

app.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});
loadRoutes(app);

console.log(process.env.MONGO_URL);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => {
    console.log("Mongo db successfully connected");
  })
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Listar produtos no frontend
// Criar endpoint de listar categorias no backend
// Listar categorias no frontend
