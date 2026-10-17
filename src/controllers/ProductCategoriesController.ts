import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProductCategories } from "../entity/ProductCategories";
import { PaginationServices } from "../services/PaginationServices";

const Router = express.Router();

Router.get("/product-categories", async (req: Request, res: Response) => {
    try {
        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);  
        
        const page = Number(req.query.page) || 1;

        const limit = Number (req.query.limit) || 10;

        const result = await PaginationServices.paginate(productCategoryRepository, page, limit, { id: "DESC" });

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

Router.get("/product-categories/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(String(id), 10) });
        
        if (!productCategory) {
            res.status(404).send("Categoria de produto não encontrada.");
            return;
        }
        
        res.status(200).json(productCategory);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar categoria de produto.");
        return;
    }
});

Router.post("/product-categories", async (req: Request, res: Response) => {
    try {
        var data = req.body;

        const newProductCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const newProductCategory = newProductCategoryRepository.create(data);
        await newProductCategoryRepository.save(newProductCategory);

        res.status(201).json({
            message: "Categoria de produto criada com sucesso!",
            productCategory: newProductCategory
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar categoria de produto.");
    }
});

Router.put("/product-categories/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        var data = req.body;
        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!productCategory) {
            res.status(404).send("Categoria de produto não encontrada.");
            return;
        }
        
        productCategoryRepository.merge(productCategory, data);
        const updatedProductCategory = await productCategoryRepository.save(productCategory);

        res.status(200).json(updatedProductCategory);
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar categoria de produto.");
        return;
    }
});

Router.delete("/product-categories/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
    
        const productCategoryRepository = AppDataSource.getRepository(ProductCategories);
        const productCategory = await productCategoryRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!productCategory) {
            res.status(404).send("Categoria de produto não encontrada.");
            return;
        }
        
        await productCategoryRepository.remove(productCategory);
        res.status(200).json({ message: "Categoria de produto removida com sucesso!" });
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar categoria de produto.");
        return;
    }
});

export default Router;