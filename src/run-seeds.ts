import { AppDataSource } from "./data-source";

const runSeeds = async () => {
    console.log("Iniciando execução das seeds...");

    await AppDataSource.initialize();
    console.log("Conexão com o banco de dados estabelecida.");

    try {
        const situationSeeds = new CreateSituationsSeeds();
        await situationSeeds.run(AppDataSource);
        
    } catch (error) {
        console.error("Erro ao executar as seeds:", error);
    } finally {
        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");
    }
};

export default runSeeds;