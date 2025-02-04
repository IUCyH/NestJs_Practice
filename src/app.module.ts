import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppDataSource } from "./configs/orm.config";
import { WinstonModule } from "nest-winston";
import { LogConfig } from "./configs/log.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource),
        WinstonModule.forRoot(LogConfig),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
