import { Injectable } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"

/**
 * ✅ @UseGuards(JwtAuthGuard)로 보호할 API에 붙임
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}
