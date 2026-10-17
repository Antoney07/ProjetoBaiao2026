"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const SituationsController_1 = __importDefault(require("./controllers/SituationsController"));
const ProductSituationsController_1 = __importDefault(require("./controllers/ProductSituationsController"));
const ProductCategoriesController_1 = __importDefault(require("./controllers/ProductCategoriesController"));
const ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
app.use("/", SituationsController_1.default);
app.use("/", AuthController_1.default);
app.use("/", ProductSituationsController_1.default);
app.use("/", ProductCategoriesController_1.default);
app.use("/", ProductsController_1.default);
app.use("/", UsersController_1.default);
app.listen(process.env.PORT || 8080, () => {
    console.log(`Servidor Iniciado na porta ${process.env.PORT || 8080}: http://localhost:${process.env.PORT || 8080}`);
});
//# sourceMappingURL=index.js.map