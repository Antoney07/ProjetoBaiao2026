"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const CreateSituationsSeeds_1 = require("./seeds/CreateSituationsSeeds");
const CreateProductSituationsSeeds_1 = require("./seeds/CreateProductSituationsSeeds");
const CreateProductCategoriesSeeds_1 = require("./seeds/CreateProductCategoriesSeeds");
const runSeeds = async () => {
    console.log("Iniciando execução das seeds...");
    await data_source_1.AppDataSource.initialize();
    console.log("Conexão com o banco de dados estabelecida.");
    try {
        const situationSeeds = new CreateSituationsSeeds_1.CreateSituationsSeeds();
        await situationSeeds.run(data_source_1.AppDataSource);
        const productSituationSeeds = new CreateProductSituationsSeeds_1.CreateProductSituationsSeeds();
        await productSituationSeeds.run(data_source_1.AppDataSource);
        const productCategorySeeds = new CreateProductCategoriesSeeds_1.CreateProductCategoriesSeeds();
        await productCategorySeeds.run(data_source_1.AppDataSource);
    }
    catch (error) {
        console.error("Erro ao executar as seeds:", error);
    }
    finally {
        await data_source_1.AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");
    }
};
exports.default = runSeeds;
runSeeds();
//# sourceMappingURL=run-seeds.js.map