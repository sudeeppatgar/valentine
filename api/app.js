import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
// app.use(cookeparser())
app.use(express.static("public"));
app.use(helmet());
app.use("/api", router);
app.use(errorMiddleware);

export default app;
