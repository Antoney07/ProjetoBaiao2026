"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategoriesSeeds = void 0;
const ProductCategories_1 = require("../entity/ProductCategories");
class CreateProductCategoriesSeeds {
    async run(dataSource) {
        console.log("|Iniciando seed das categorias...");
        const productCategoryRepository = dataSource.getRepository(ProductCategories_1.ProductCategories);
        const existingCount = await productCategoryRepository.count();
        if (existingCount > 0) {
            console.log("|Seed das categorias já foi executado.");
            return;
        }
        const productCategories = [
            { name: "Eletrônicos" },
            { name: "Roupas" },
            { name: "Alimentos" }
        ];
        await productCategoryRepository.save(productCategories);
        console.log("|Seed das categorias concluído com sucesso!");
    }
}
exports.CreateProductCategoriesSeeds = CreateProductCategoriesSeeds;
//# sourceMappingURL=CreateProductCategoriesSeeds.js.map