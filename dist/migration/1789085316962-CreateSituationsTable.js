"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSituationsTable1789085316962 = void 0;
const typeorm_1 = require("typeorm");
class CreateSituationsTable1789085316962 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "situations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "nameSituation",
                    type: "varchar",
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP",
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("situations");
    }
}
exports.CreateSituationsTable1789085316962 = CreateSituationsTable1789085316962;
//# sourceMappingURL=1789085316962-CreateSituationsTable.js.map