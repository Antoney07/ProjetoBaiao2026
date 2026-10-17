"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategoriesTable1792194447282 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductCategoriesTable1792194447282 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product_categories",
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
        await queryRunner.dropTable("product_categories");
    }
}
exports.CreateProductCategoriesTable1792194447282 = CreateProductCategoriesTable1792194447282;
//# sourceMappingURL=1792194447282-CreateProductCategoriesTable.js.map