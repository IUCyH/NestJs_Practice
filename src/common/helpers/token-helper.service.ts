import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenHelperService {
    constructor(private readonly jwtService: JwtService) {}

    verify(token: string){
        try {
            this.jwtService.verify(token);

            const payload = this.jwtService.decode(token);
            return payload;
        } catch(error) {
            throw error;
        }
    }
}