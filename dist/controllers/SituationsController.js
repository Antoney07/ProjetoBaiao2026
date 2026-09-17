"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Situations_1 = require("../entity/Situations");
const Router = express_1.default.Router();
Router.get("/situations", async (req, res) => {
    try {
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situations);
        const situations = await situationRepository.find();
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao listar situações.");
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
exports.default = Router;
//# sourceMappingURL=SituationsController.js.map