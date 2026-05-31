import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.route.js";
import cors from "cors"

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({credentials: true}));

app.use("/api/auth", AuthRouter);

export default app;