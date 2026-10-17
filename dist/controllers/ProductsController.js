"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Products_1 = require("../entity/Products");
const PaginationServices_1 = require("../services/PaginationServices");
const Router = express_1.default.Router();
Router.get("/products", async (req, res) => {
    try {
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(productRepository, page, limit, { id: "DESC" }, { productSituation: true, productCategory: true });
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
Router.get("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
        const product = await productRepository.findOne({ where: { id: parseInt(String(id), 10) }, relations: { productSituation: true, productCategory: true } });
        if (!product) {
            res.status(404).send("Produto não encontrado.");
            return;
        }
        res.status(200).json(product);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar produto.");
        return;
    }
});
Router.post("/products", async (req, res) => {
    try {
        const data = req.body;
        const newProductRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
        const newProduct = newProductRepository.create(data);
        await newProductRepository.save(newProduct);
        res.status(201).json({
            message: "Produto criado com sucesso!",
            product: newProduct
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar produto.");
    }
});
Router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
        const product = await productRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!product) {
            res.status(404).send("Produto não encontrado.");
            return;
        }
        productRepository.merge(product, data);
        const updatedProduct = await productRepository.save(product);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar produto.");
        return;
    }
});
Router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Products);
        const product = await productRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!product) {
            res.status(404).send("Produto não encontrado.");
            return;
        }
        await productRepository.remove(product);
        res.status(200).json({ message: "Produto removido com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar produto.");
        return;
    }
});
exports.default = Router;
//# sourceMappingURL=ProductsController.js.map