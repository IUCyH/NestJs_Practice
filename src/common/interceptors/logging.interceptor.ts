import {
    LoggerService,
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logger: LoggerService) {}

    intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        const now = Date.now();

        this.logger.log(`Request: ${method} ${url}`, "LoggingInterceptor");

        return next.handle().pipe(
            tap(() => {
                const ms = Date.now() - now;
                this.logger.log(`Response: ${method} ${url} - ${ms}ms`, "LoggingInterceptor");
            })
        );
    }
}