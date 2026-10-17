import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProductSituations } from "../entity/ProductSituations";
import { PaginationServices } from "../services/PaginationServices";

const Router = express.Router();

Router.get("/product-situation", async (req: Request, res: Response) => {
    try {
        const ProductSituationRepository = AppDataSource.getRepository(ProductSituations);  
        
        const page = Number(req.query.page) || 1;

        const limit = Number (req.query.limit) || 10;

        const result = await PaginationServices.paginate(ProductSituationRepository, page, limit, { id: "DESC" });

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

Router.get("/product-situation/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        const ProductSituationRepository = AppDataSource.getRepository(ProductSituations);
        const productsituation = await ProductSituationRepository.findOneBy({ id: parseInt(String(id), 10) });
        
        if (!productsituation) {
            res.status(404).send("Situação de produto não encontrada.");
            return;
        }
        
        res.status(200).json(productsituation);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar situação de produto.");
        return;
    }
});

Router.post("/product-situation", async (req: Request, res: Response) => {
    try {
        var data = req.body;

        const newProductSituationRepository = AppDataSource.getRepository(ProductSituations);
        const newProductSituation = newProductSituationRepository.create(data);
        await newProductSituationRepository.save(newProductSituation);

        res.status(201).json({
            message: "Situação de produto criada com sucesso!",
            productSituation: newProductSituation
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar situação de produto.");
    }
});

Router.put("/product-situation/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
        var data = req.body;
        const ProductSituationRepository = AppDataSource.getRepository(ProductSituations);
        const productsituation = await ProductSituationRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!productsituation) {
            res.status(404).send("Situação de produto não encontrada.");
            return;
        }
        
        ProductSituationRepository.merge(productsituation, data);
        const updatedProductSituation = await ProductSituationRepository.save(productsituation);

        res.status(200).json(updatedProductSituation);
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar situação de produto.");
        return;
    }
});

Router.delete("/product-situation/:id", async (req: Request, res: Response) => {
    try {

        const { id } = req.params;
    
        const ProductSituationRepository = AppDataSource.getRepository(ProductSituations);
        const productsituation = await ProductSituationRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!productsituation) {
            res.status(404).send("Situação de produto não encontrada.");
            return;
        }
        
        await ProductSituationRepository.remove(productsituation);
        res.status(200).json({ message: "Situação de produto removida com sucesso!" });
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar situação de produto.");
        return;
    }
});

export default Router;