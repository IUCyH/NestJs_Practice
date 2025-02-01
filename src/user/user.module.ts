import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthSharedModule } from "../shared/auth-shared.module";
import { User } from "./entities/user";
import { USER_SERVICE } from "./interfaces/user-service.interface";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        AuthSharedModule
    ],
    controllers: [UserController],
    providers: [
        {
            provide: USER_SERVICE,
            useClass: UserService
        }
    ]
})
export class UserModule {}