import { DataSource } from "typeorm";
import { Situations } from "../entity/Situations";

export class CreateSituationsSeeds {
  public async run(dataSource: DataSource): Promise<void> {
    console.log("|Iniciando seed das situações...");
    const situationRepository = dataSource.getRepository(Situations);
    const existingCount = await situationRepository.count();
    if (existingCount > 0) {
      console.log("|Seed das situações já foi executado.");
      return;
    }

    const situations: any[] = [
      { nameSituation: "Ativo" },
      { nameSituation: "Inativo" },
      { nameSituation: "Pendente" }
    ];

    await situationRepository.save(situations as any);

    console.log("|Seed das situações concluído com sucesso!");

  }
}
