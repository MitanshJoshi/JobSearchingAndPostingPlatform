import express from "express";
import { config } from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";

import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import { newsLetterCron } from "./automation/automationCron.js";
const app = express();

config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

console.log(process.env.MONGO_URI);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/V1/user", userRouter);
app.use("/api/V1/job", jobRouter);
app.use("/api/V1/application", applicationRouter);
newsLetterCron();
mongoose
  .connect("mongodb://127.0.0.1:27017/JOB_PORTAL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect:", err.message);
  });
app.use(errorMiddleware);

export default app;
