import "dotenv/config";
import express from "express";
import indexRouter from "./routes/indexRouter.js";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Testing-backend - listening on port ${PORT}!`);
  });
}

export default app;
