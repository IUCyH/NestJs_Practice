import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AccessTokenGuard } from "../common/guards/access-token.guard";
import { TokenHelperService } from "../common/helpers/token-helper.service";

@Module({
    imports: [
        JwtModule.register({
            secret: "Lg24_8TrFZ_wvKZ5N2Qj8J9VpXcTQoYmFqL1X9RYsMzlRmtvOaq6UHpQkE3VMTX",
            signOptions: { expiresIn: "1h" }
        })
    ],
    controllers: [],
    providers: [
        TokenHelperService,
        AccessTokenGuard
    ],
    exports: [
        JwtModule,
        TokenHelperService,
        AccessTokenGuard
    ]
})
export class AuthSharedModule {}