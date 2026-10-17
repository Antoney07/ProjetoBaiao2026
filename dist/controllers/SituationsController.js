"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Situations_1 = require("../entity/Situations");
const PaginationServices_1 = require("../services/PaginationServices");
const Router = express_1.default.Router();
Router.get("/situations", async (req, res) => {
    try {
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situations);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(situationRepository, page, limit, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(400).json({
            error: true,
            message: error instanceof Error ? error.message : String(error)
        });
        return;
    }
});
Router.get("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situations);
        const situations = await situationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!situations) {
            res.status(404).send("Situação não encontrada.");
            return;
        }
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar situação.");
        return;
    }
});
Router.post("/situations", async (req, res) => {
    try {
        var data = req.body;
        const newSituationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situations);
        const newSituation = newSituationRepository.create(data);
        await newSituationRepository.save(newSituation);
        res.status(201).json({
            message: "Situação criada com sucesso!",
            situation: newSituation
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar situação.");
    }
});
Router.put("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situations);
        const situations = await situationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!situations) {
            res.status(404).send("Situação não encontrada.");
            return;
        }
        situationRepository.merge(situations, data);
        const updatedSituation = await situationRepository.save(situations);
        res.status(200).json(situations);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar situação.");
        return;
    }
});
Router.delete("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situations);
        const situations = await situationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!situations) {
            res.status(404).send("Situação não encontrada.");
            return;
        }
        await situationRepository.remove(situations);
        res.status(200).json({ message: "Situação removida com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar situação.");
        return;
    }
});
exports.default = Router;
//# sourceMappingURL=SituationsController.js.map