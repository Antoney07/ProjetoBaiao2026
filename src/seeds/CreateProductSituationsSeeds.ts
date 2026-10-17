import { DataSource } from "typeorm";
import { ProductSituations } from "../entity/ProductSituations";

export class CreateProductSituationsSeeds {
  public async run(dataSource: DataSource): Promise<void> {
    console.log("|Iniciando seed das situações...");
    const productSituationRepository = dataSource.getRepository(ProductSituations);
    const existingCount = await productSituationRepository.count();
    if (existingCount > 0) {
      console.log("|Seed das situações já foi executado.");
      return;
    }

    const productSituations: any[] = [
      { name: "Ativo" },
      { name: "Inativo" },
      { name: "Esgotado" }
    ];

    await productSituationRepository.save(productSituations as any);

    console.log("|Seed das situações concluído com sucesso!");

  }
}
