import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const AppDataSource: TypeOrmModuleOptions = {
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "bere6363",
    database: "script",
    synchronize: false,
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
    extra: {
        timezone: "Z",
        dateStrings: true
    },
    entities: [__dirname + "/../**/*.{js,ts}"],
    subscribers: [],
    migrations: []
};
