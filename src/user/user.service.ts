import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IUserService } from "./interfaces/user-service.interface";
import { GetUserDto } from "./dto/response/get-user.dto";
import { User } from "./entities/user";

@Injectable()
export class UserService implements IUserService {
    constructor(@InjectRepository(User)
                private readonly repository: Repository<User>
    ) {}

    async getUser(id: number): Promise<GetUserDto | null> {
        const result = await this.repository.findOne({
            where: { id: id },
            select: ["name", "age", "email"]
        });

        if(!result) {
            return null;
        }

        const user = new GetUserDto(result.name, result.age, result.email);
        return user;
    }
}