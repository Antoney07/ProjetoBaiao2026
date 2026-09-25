import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Situations } from "../entity/Situations";

const Router = express.Router();

Router.get("/situations", async (req: Request, res: Response) => {
    try {
        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.find();    
        res.status(200).json(situations);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar situações.");
        return;
    }
});

Router.get("/situations/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!situations) {
            res.status(404).send("Situação não encontrada.");
            return;
        }
        
        res.status(200).json(situations);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar situação.");
        return;
    }
});

Router.post("/situations", async (req: Request, res: Response) => {
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

Router.put("/situations/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        var data = req.body;
        const situationRepository = AppDataSource.getRepository(Situations);
        const situations = await situationRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!situations) {
            res.status(404).send("Situação não encontrada.");
            return;
        }
        
        situationRepository.merge(situations, data);
        const updatedSituation = await situationRepository.save(situations);

        res.status(200).json(situations);
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar situação.");
        return;
    }
});

export default Router;