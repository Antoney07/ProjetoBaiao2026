"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSituationsSeeds = void 0;
const ProductSituations_1 = require("../entity/ProductSituations");
class CreateProductSituationsSeeds {
    async run(dataSource) {
        console.log("|Iniciando seed das situações...");
        const productSituationRepository = dataSource.getRepository(ProductSituations_1.ProductSituations);
        const existingCount = await productSituationRepository.count();
        if (existingCount > 0) {
            console.log("|Seed das situações já foi executado.");
            return;
        }
        const productSituations = [
            { name: "Ativo" },
            { name: "Inativo" },
            { name: "Esgotado" }
        ];
        await productSituationRepository.save(productSituations);
        console.log("|Seed das situações concluído com sucesso!");
    }
}
exports.CreateProductSituationsSeeds = CreateProductSituationsSeeds;
//# sourceMappingURL=CreateProductSituationsSeeds.js.map