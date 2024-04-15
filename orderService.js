/*****  Packages  *****/
import cors from "cors";
import express from "express"
import winston from "winston";
import BodyParser from "body-parser";
/*****  Modules  *****/
import connectDB from "#config/db";
import logger from "#utils/logger";
import routes from "#routes/index";
import {envConfig} from "#utils/env";
import cookieParser from "cookie-parser";


envConfig();
connectDB();
logger();

const app = express();
const PORT = process.env.PORT_ORDER;

/*****  Middlewares  *****/
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser());
app.use(express.json())
app.use(BodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static('uploads'));


routes(app, "Order");


app.listen(PORT, () => winston.info(`Server is Listening on port ${PORT}.`));
