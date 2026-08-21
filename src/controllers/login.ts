import express, {Request, Response, Router} from "express";

const Router = express.Router();

Router.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo, galera! Tela de login");
});

export default Router;