import {
    ParseIntPipe,
    Inject,
    Controller,
    Get,
    Param,
    UseGuards,
    UseInterceptors,
    NotFoundException,
    InternalServerErrorException,
} from "@nestjs/common";
import { AccessTokenGuard } from "../common/guards/access-token.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { IUserService, USER_SERVICE } from "./interfaces/user-service.interface";
import { User } from "../common/types/user.type";

@Controller("users")
export class UserController {
    constructor(@Inject(USER_SERVICE) private readonly service: IUserService) {}

    @UseGuards(AccessTokenGuard)
    @Get("me")
    async getMyUser(@CurrentUser() user?: User) {
        if(!user) {
            throw new InternalServerErrorException("User is not defined");
        }

        const id = user.id;
        const userResult = await this.service.getUser(id);
        if(!userResult) {
            throw new NotFoundException("User not found");
        }

        return userResult;
    }

    @Get(":id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        const user = await this.service.getUser(id);
        if(!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }
}