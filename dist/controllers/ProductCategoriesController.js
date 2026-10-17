"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const ProductCategories_1 = require("../entity/ProductCategories");
const PaginationServices_1 = require("../services/PaginationServices");
const Router = express_1.default.Router();
Router.get("/product-categories", async (req, res) => {
    try {
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategories);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(productCategoryRepository, page, limit, { id: "DESC" });
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
Router.get("/product-categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!productCategory) {
            res.status(404).send("Categoria de produto não encontrada.");
            return;
        }
        res.status(200).json(productCategory);
        return;
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar categoria de produto.");
        return;
    }
});
Router.post("/product-categories", async (req, res) => {
    try {
        var data = req.body;
        const newProductCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategories);
        const newProductCategory = newProductCategoryRepository.create(data);
        await newProductCategoryRepository.save(newProductCategory);
        res.status(201).json({
            message: "Categoria de produto criada com sucesso!",
            productCategory: newProductCategory
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar categoria de produto.");
    }
});
Router.put("/product-categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!productCategory) {
            res.status(404).send("Categoria de produto não encontrada.");
            return;
        }
        productCategoryRepository.merge(productCategory, data);
        const updatedProductCategory = await productCategoryRepository.save(productCategory);
        res.status(200).json(updatedProductCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar categoria de produto.");
        return;
    }
});
Router.delete("/product-categories/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(String(id), 10) });
        if (!productCategory) {
            res.status(404).send("Categoria de produto não encontrada.");
            return;
        }
        await productCategoryRepository.remove(productCategory);
        res.status(200).json({ message: "Categoria de produto removida com sucesso!" });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar categoria de produto.");
        return;
    }
});
exports.default = Router;
//# sourceMappingURL=ProductCategoriesController.js.map