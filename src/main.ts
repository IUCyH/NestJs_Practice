import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalInterceptors(
        new LoggingInterceptor(app.get(WINSTON_MODULE_NEST_PROVIDER))
    );

    await app.listen(8080);
    console.log("Application is running on: http://localhost:8080");
}
bootstrap();
