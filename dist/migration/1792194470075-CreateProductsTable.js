"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsTable1792194470075 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductsTable1792194470075 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "products",
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
                    name: "productSituationId",
                    type: "int",
                },
                {
                    name: "productCategoryId",
                    type: "int",
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
        await queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
            columnNames: ["productSituationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "product_situations",
            onDelete: "CASCADE",
        }));
        await queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
            columnNames: ["productCategoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "product_categories",
            onDelete: "CASCADE",
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("products");
        const situationForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("productSituationId") !== -1);
        if (situationForeignKey) {
            await queryRunner.dropForeignKey("products", situationForeignKey);
        }
        const categoryForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("productCategoryId") !== -1);
        if (categoryForeignKey) {
            await queryRunner.dropForeignKey("products", categoryForeignKey);
        }
        await queryRunner.dropTable("products");
    }
}
exports.CreateProductsTable1792194470075 = CreateProductsTable1792194470075;
//# sourceMappingURL=1792194470075-CreateProductsTable.js.map