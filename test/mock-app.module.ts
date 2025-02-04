import { Module } from "@nestjs/common";
import { WinstonModule } from "nest-winston";
import { LogConfig } from "../src/configs/log.config";
import { MockUserModule } from "./user/mocks/user.module";

@Module({
    imports: [
        WinstonModule.forRoot(LogConfig),
        MockUserModule
    ],
})
export class MockAppModule {}