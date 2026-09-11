"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Router = express_1.default.Router();
data_source_1.AppDataSource.initialize().then(() => (console.log("Conexão com o banco de dados estabelecida com sucesso!"))).catch((error) => console.log("Erro ao conectar com o banco de dados:", error));
Router.get("/", (req, res) => {
    res.send("Bem vindo, galera! Tela de login");
});
exports.default = Router;
//# sourceMappingURL=SituationController.js.map