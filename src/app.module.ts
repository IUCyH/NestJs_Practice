import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";
import { transports, format } from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { AppDataSource } from "./configs/orm.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";

const logDir = __dirname + "/../logs";
const logFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource),
        WinstonModule.forRoot({
            format: format.combine(
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                format.label({ label: "Lucy Server" }),
                logFormat
            ),
            transports: [
                new winstonDaily({
                    level: "info",
                    datePattern: "YYYY-MM-DD",
                    dirname: logDir,
                    filename: "%DATE%.log",
                    maxFiles: "14d",
                    zippedArchive: true
                }),
                new winstonDaily({
                    level: "error",
                    datePattern: "YYYY-MM-DD",
                    dirname: logDir + "/error",
                    filename: "%DATE%.error.log",
                    maxFiles: "14d",
                    zippedArchive: true
                }),
                new transports.Console({
                    format: format.combine(
                        format.colorize(),
                        format.printf(({ level, label, message }) => `[${label}] ${level}: ${message}`)
                    )
                })
            ]
        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
