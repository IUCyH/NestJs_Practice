import { GetUserDto } from "../dto/response/get-user.dto";

export const USER_SERVICE = "IUserService";

export interface IUserService {
    getUser(id: number): Promise<GetUserDto | null>;
}