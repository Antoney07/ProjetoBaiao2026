import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Situations } from "../entity/Situations";

const Router = express.Router();

Router.get("/", (req: Request, res: Response) => {
    res.send("Bem vindo, galera! Situations");
});

Router.post("/", async (req: Request, res: Response) => {
    try {
        var data = req.body;

        const newSituationRepository = AppDataSource.getRepository(Situations);
        const newSituation = newSituationRepository.create(data);
        await newSituationRepository.save(newSituation);

        res.status(201).json({
            message: "Situação criada com sucesso!",
            situation: newSituation
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar situação.");
    }
});

export default Router;