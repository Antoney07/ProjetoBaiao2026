import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import login from "./controllers/login";


app.use("/", login);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor Iniciado na porta ${process.env.PORT || 8080}: http://localhost:${process.env.PORT || 8080}`);
});
