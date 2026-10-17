import express from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../entity/Users";
import { PaginationServices } from "../services/PaginationServices";

const Router = express.Router();


Router.get("/users", async (req, res) => {
    try {
        const userRepository = AppDataSource.getRepository(Users);

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

const result = await PaginationServices.paginate(userRepository, page, limit, { id: "DESC" }, { situation: true });
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

Router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userRepository = AppDataSource.getRepository(Users);
        
const user = await userRepository.findOne({ where: { id: parseInt(String(id), 10) }, relations: { situation: true } });

        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }

        res.status(200).json(user);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao visualizar usuário.");
        return;
    }
});

Router.post("/users", async (req, res) => {
    try {
        const data = req.body;

        const newUserRepository = AppDataSource.getRepository(Users);
        const newUser = newUserRepository.create(data);
        await newUserRepository.save(newUser);

        res.status(201).json({
            message: "Usuário criado com sucesso!",
            user: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao criar usuário.");
    }
});

Router.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }

        userRepository.merge(user, data);
        const updatedUser = await userRepository.save(user);

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao atualizar usuário.");
        return;
    }
});

Router.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOneBy({ id: parseInt(String(id), 10) });

        if (!user) {
            res.status(404).send("Usuário não encontrado.");
            return;
        }

        await userRepository.remove(user);
        res.status(200).json({ message: "Usuário removido com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao apagar usuário.");
        return;
    }
});

export default Router;