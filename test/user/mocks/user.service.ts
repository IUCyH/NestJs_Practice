import { Injectable } from "@nestjs/common";
import { IUserService } from "../../../src/user/interfaces/user-service.interface";
import { GetUserDto } from "../../../src/user/dto/response/get-user.dto";

@Injectable()
export class MockUserService implements IUserService {
    getUser(id: number): Promise<GetUserDto | null> {
        const user = new GetUserDto("Lucy", 21, "abc@abc.com");
        return Promise.resolve(user);
    }
}