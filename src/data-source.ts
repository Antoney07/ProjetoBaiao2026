import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
import { Users } from "./entity/Users";
import { Situations } from "./entity/Situations";


const dialect = process.env.DB_DIALECT ?? "mysql";
export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb",
    host: process.env.DB_HOST!,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
    synchronize: false,
    logging: true,
    entities: [Users, Situations],
    migrations: [__dirname + "/migration/*.js"],
    subscribers: [],
});


AppDataSource.initialize().then(() =>(
    console.log("Conexão com o banco de dados estabelecida com sucesso!")
)).catch((error) => console.log("Erro ao conectar com o banco de dados:", error));

