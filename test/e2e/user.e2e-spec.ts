import { INestApplication } from "@nestjs/common";
import { MockAppModule } from "../mock-app.module";
import { AppModule } from "../../src/app.module";
import { LoggingInterceptor } from "../../src/common/interceptors/logging.interceptor";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { AuthSharedModule } from "../../src/shared/auth-shared.module";
import { Test } from "@nestjs/testing";
import * as request from "supertest";

describe("UserController", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                AuthSharedModule,
                MockAppModule
            ]
        }).compile();

        app = module.createNestApplication();
        app.useGlobalInterceptors(
            new LoggingInterceptor(app.get(WINSTON_MODULE_NEST_PROVIDER))
        );

        await app.init();
    });

    it("should be logged", async () => {
        const tasks = [
            request.default(app.getHttpServer()).get("/users/1"),
            request.default(app.getHttpServer()).get("/users/2"),
            request.default(app.getHttpServer()).get("/users/3")
        ];
        const [res] = await Promise.all(
            tasks
        );

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ name: "Lucy", age: 21, email: "abc@abc.com" });
    });

    afterAll(async () => {
        await app.close();
    });
});