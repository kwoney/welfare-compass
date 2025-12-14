import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    // ✅ 여기서 확실하게 읽기 (키 이름이 다르면 여기서 같이 대응)
    const secret =
      config.get<string>("JWT_SECRET") ||
      config.get<string>("API_JWT_SECRET") ||
      config.get<string>("JWT_ACCESS_SECRET");

    // ✅ passport-jwt 에러 대신, 우리가 원인을 명확히 보여주도록
    if (!secret) {
      throw new Error(
        "JWT secret is missing. Set JWT_SECRET in apps/api/.env (or in deployment env vars)."
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  validate(payload: any) {
    return payload;
  }
}
