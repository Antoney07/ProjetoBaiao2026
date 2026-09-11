"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Situations_1 = require("../entity/Situations");
const Router = express_1.default.Router();
Router.get("/", (req, res) => {
    res.send("Bem vindo, galera! Situations");
});
Router.post("/", async (req, res) => {
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