"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const ProductCategories_1 = require("./ProductCategories");
const ProductSituations_1 = require("./ProductSituations");
let Products = class Products {
    id;
    name;
    email;
    productSituation;
    productCategory;
    createdAt;
    updatedAt;
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Products.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductSituations_1.ProductSituations, (productSituation) => productSituation.products),
    (0, typeorm_1.JoinColumn)({ name: "productSituationId" }),
    __metadata("design:type", ProductSituations_1.ProductSituations)
], Products.prototype, "productSituation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ProductCategories_1.ProductCategories, (productCategory) => productCategory.products),
    (0, typeorm_1.JoinColumn)({ name: "productCategoryId" }),
    __metadata("design:type", ProductCategories_1.ProductCategories)
], Products.prototype, "productCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Products.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Products.prototype, "updatedAt", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)("products")
], Products);
//# sourceMappingURL=Products.js.map