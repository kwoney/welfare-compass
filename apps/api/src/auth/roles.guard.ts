import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"

export const ROLES_KEY = "roles"
export const Roles = (...roles: Array<"USER" | "ADMIN">) => (target: any, key?: any, desc?: any) => {
  Reflect.defineMetadata(ROLES_KEY, roles, desc?.value ?? target)
}

/**
 * ✅ 토큰(payload)의 role 기반 권한 체크
 * - JwtStrategy의 validate()가 세팅한 request.user.role 사용
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Array<"USER" | "ADMIN">>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass()
    ])

    if (!requiredRoles || requiredRoles.length === 0) return true

    const req = ctx.switchToHttp().getRequest()
    const user = req.user as { role?: "USER" | "ADMIN" }

    if (!user?.role || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException("권한이 없습니다.")
    }
    return true
  }
}
