"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSituationsSeeds = void 0;
const Situations_1 = require("../entity/Situations");
class CreateSituationsSeeds {
    async run(dataSource) {
        console.log("|Iniciando seed das situações...");
        const situationRepository = dataSource.getRepository(Situations_1.Situations);
        const existingCount = await situationRepository.count();
        if (existingCount > 0) {
            console.log("|Seed das situações já foi executado.");
            return;
        }
        const situations = [
            { nameSituation: "Ativo" },
            { nameSituation: "Inativo" },
            { nameSituation: "Pendente" }
        ];
        await situationRepository.save(situations);
        console.log("|Seed das situações concluído com sucesso!");
    }
}
exports.CreateSituationsSeeds = CreateSituationsSeeds;
//# sourceMappingURL=CreateSituationsSeeds.js.map