import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import errorHandler from "./helpers/error-handler.js";
import ApiError from "./utils/api-error.util.js";

const app = express();

app.use(cors());
app.use(express.json({limit:'15kb'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import indexRouter from "./routes/index.route.js";
app.use('/api/v1',indexRouter);

app.use((req, res, next) => {
  throw ApiError.notFound("Route not found");
});    

app.use(errorHandler);

export default app;