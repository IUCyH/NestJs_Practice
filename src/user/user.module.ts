import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthSharedModule } from "../shared/auth-shared.module";
import { User } from "./entities/user";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthSharedModule
    ],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}