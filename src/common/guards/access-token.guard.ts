import {
    Injectable,
    CanActivate,
    ExecutionContext,
    BadRequestException,
    UnauthorizedException
} from "@nestjs/common";
import { TokenHelperService } from "../helpers/token-helper.service";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(private readonly tokenHelperService: TokenHelperService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;

        if(!authorization) {
            throw new BadRequestException("Authorization header is missing");
        }

        const token = authorization.split(" ")[1];
        if(!token) {
            throw new BadRequestException("Token is required");
        }

        let payload = undefined;
        try {
            payload = this.tokenHelperService.verify(token);
        } catch(error) {
            if(error instanceof Error) {
                throw new UnauthorizedException("Invalid token: " + error.message);
            }
        }

        if(!payload || payload.type !== "access") {
            throw new UnauthorizedException("Invalid token type");
        }

        request.user = { id: payload.sub };
        return true;
    }
}