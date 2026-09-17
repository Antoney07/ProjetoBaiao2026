import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());

import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";

app.use("/", SituationsController);  
app.use("/", AuthController);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor Iniciado na porta ${process.env.PORT || 8080}: http://localhost:${process.env.PORT || 8080}`);
});
