"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSituationsTable1792194437427 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductSituationsTable1792194437427 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product_situations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255"
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
        await queryRunner.dropTable("product_situations");
    }
}
exports.CreateProductSituationsTable1792194437427 = CreateProductSituationsTable1792194437427;
//# sourceMappingURL=1792194437427-CreateProductSituationsTable.js.map