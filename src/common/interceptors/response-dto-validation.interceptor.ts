import { ExecutionContext, CallHandler, Injectable, NestInterceptor, InternalServerErrorException } from "@nestjs/common";
import { validate } from "class-validator";
import { Observable, from } from "rxjs";
import { mergeMap } from "rxjs/operators";

@Injectable()
export class ResponseDtoValidationInterceptor implements NestInterceptor  {
    intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
        return next.handle().pipe(
            mergeMap((data) => from(this.validate(data)))
        );
    }

    private async validate(dto: any) {
        const errors = await validate(dto);
        if(errors.length > 0) {
            throw new InternalServerErrorException({
                message: "Response Validation failed",
                errors: errors.map(error => ({
                    filed: error.property,
                    constraints: error.constraints
                }))
            });
        }

        return dto;
    }
}