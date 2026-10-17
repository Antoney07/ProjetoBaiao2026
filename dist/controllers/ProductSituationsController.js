"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const ProductSituations_1 = require("../entity/ProductSituations");
const PaginationServices_1 = require("../services/PaginationServices");
const Router = express_1.default.Router();
Router.get("/product-situations", async (req, res) => {
    try {
        const ProductSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituations);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(ProductSituationRepository, page, limit, { id: "DESC" });
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
Router.get("/product-situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ProductSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituations);
        const productsituation = await ProductSituationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!productsituation) {
            res.status(404).send("Situação de produto não encontrada.");
            return;
        }
        res.status(200).json(productsituation);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar situação de produto.");
        return;
    }
});
Router.post("/product-situations", async (req, res) => {
    try {
        var data = req.body;
        const newProductSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituations);
        const newProductSituation = newProductSituationRepository.create(data);
        await newProductSituationRepository.save(newProductSituation);
        res.status(201).json({
            message: "Situação de produto criada com sucesso!",
            productSituation: newProductSituation
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar situação de produto.");
    }
});
Router.put("/product-situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const ProductSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituations);
        const productsituation = await ProductSituationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!productsituation) {
            res.status(404).send("Situação de produto não encontrada.");
            return;
        }
        ProductSituationRepository.merge(productsituation, data);
        const updatedProductSituation = await ProductSituationRepository.save(productsituation);
        res.status(200).json(updatedProductSituation);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar situação de produto.");
        return;
    }
});
Router.delete("/product-situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const ProductSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituations);
        const productsituation = await ProductSituationRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!productsituation) {
            res.status(404).send("Situação de produto não encontrada.");
            return;
        }
        await ProductSituationRepository.remove(productsituation);
        res.status(200).json({ message: "Situação de produto removida com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar situação de produto.");
        return;
    }
});
exports.default = Router;
//# sourceMappingURL=ProductSituationsController.js.map