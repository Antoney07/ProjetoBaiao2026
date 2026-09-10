import express, {Request, Response,} from "express";

import { AppDataSource } from "../data-source";

const Router = express.Router();

AppDataSource.initialize().then(() =>(
    console.log("Conexão com o banco de dados estabelecida com sucesso!")
)).catch((error) => console.log("Erro ao conectar com o banco de dados:", error));

Router.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo, galera! Tela de login");
});

export default Router;