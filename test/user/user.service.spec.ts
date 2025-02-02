import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserService } from "../../src/user/user.service";
import { User } from "../../src/user/entities/user";

describe("UserService", () => {
    let userService: UserService;
    const mockRepository = {
        findOne: jest.fn().mockResolvedValue({ name: "Lucy", age: "12", email: "abc@abc.com" }),
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockRepository
                }
            ],
        }).compile();
        userService = module.get(UserService);
    });

    it("should be return name, age, email", async () => {
        const user = await userService.getUser(12);
        expect(user).toEqual({ name: "Lucy", age: "12", email: "abc@abc.com" });
    });
});