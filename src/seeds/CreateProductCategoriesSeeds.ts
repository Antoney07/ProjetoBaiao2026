import { DataSource } from "typeorm";
import { ProductCategories } from "../entity/ProductCategories";

export class CreateProductCategoriesSeeds {
  public async run(dataSource: DataSource): Promise<void> {
    console.log("|Iniciando seed das categorias...");
    const productCategoryRepository = dataSource.getRepository(ProductCategories);
    const existingCount = await productCategoryRepository.count();
    if (existingCount > 0) {
      console.log("|Seed das categorias já foi executado.");
      return;
    }

    const productCategories: any[] = [
      { name: "Eletrônicos" },
      { name: "Roupas" },
      { name: "Alimentos" }
    ];

    await productCategoryRepository.save(productCategories as any);

    console.log("|Seed das categorias concluído com sucesso!");

  }
}
