import { Module } from "@nestjs/common";
import { UserController } from "../../../src/user/user.controller";
import { USER_SERVICE } from "../../../src/user/interfaces/user-service.interface";
import { MockUserService } from "./user.service";
import { AuthSharedModule } from "../../../src/shared/auth-shared.module";

@Module({
    imports: [
        AuthSharedModule
    ],
    controllers: [UserController],
    providers: [
        {
            provide: USER_SERVICE,
            useClass: MockUserService
        }
    ]
})
export class MockUserModule {}