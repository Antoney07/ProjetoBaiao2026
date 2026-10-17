import express from "express";
import { AppDataSource } from "../data-source";
import { Products } from "../entity/Products";
import { PaginationServices } from "../services/PaginationServices";

const Router = express.Router();

Router.get("/products", async (req, res) => {
    try {
        const productRepository = AppDataSource.getRepository(Products);

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

const result = await PaginationServices.paginate(productRepository, page, limit, { id: "DESC" }, { productSituation: true, productCategory: true });

        res.status(200).json(result);
        return;
    } catch (error) {
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
        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOne({ where: { id: parseInt(String(id), 10) }, relations: { productSituation: true, productCategory: true } });

        if (!product) {
            res.status(404).send("Produto não encontrado.");
            return;
        }

        res.status(200).json(product);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar produto.");
        return;
    }
});

Router.post("/products", async (req, res) => {
    try {
        const data = req.body;

        const newProductRepository = AppDataSource.getRepository(Products);
        const newProduct = newProductRepository.create(data);
        await newProductRepository.save(newProduct);

        res.status(201).json({
            message: "Produto criado com sucesso!",
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar produto.");
    }
});

Router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!product) {
            res.status(404).send("Produto não encontrado.");
            return;
        }

        productRepository.merge(product, data);
        const updatedProduct = await productRepository.save(product);

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar produto.");
        return;
    }
});

Router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const productRepository = AppDataSource.getRepository(Products);
        const product = await productRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!product) {
            res.status(404).send("Produto não encontrado.");
            return;
        }

        await productRepository.remove(product);
        res.status(200).json({ message: "Produto removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar produto.");
        return;
    }
});

export default Router;