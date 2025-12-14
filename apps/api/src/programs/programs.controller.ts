import { Controller, Get, Query, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../auth/jwt-auth.guard"
import { ProgramsService } from "./programs.service"

@Controller("programs")
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  /**
   * ✅ 정책 목록/검색
   * - query, categoryMain 같은 검색 조건을 QueryString으로 받음
   * - 인증을 붙일지/말지는 정책에 따라 선택 (MVP는 공개여도 OK)
   */
  @Get()
  async list(
    @Query("query") query?: string,
    @Query("categoryMain") categoryMain?: string
  ) {
    return this.programsService.list({ query, categoryMain })
  }

  /**
   * ✅ 예시로 보호된 엔드포인트도 하나 보여줌
   */
  @UseGuards(JwtAuthGuard)
  @Get("me/hello")
  async hello() {
    return { ok: true, message: "인증 성공" }
  }
  /** 
   * /programs/me/hello
    - 여기는 @UseGuards(JwtAuthGuard)가 붙어 있음
    - 즉, 요청이 들어오면 컨트롤러 메서드(hello)가 실행되기 전에 Guard가 먼저 검사해.
    Guard가 하는 일:
    - 요청 헤더에서 Authorization: Bearer <token> 찾기
    - 토큰이 있으면 서명(JWT_SECRET)으로 검증
    - 검증 성공하면 통과 → hello() 실행 → { ok: true, message: "인증 성공" }
    - 검증 실패/토큰 없음이면 차단 → 보통 401 Unauthorized 반환
    그래서 “메시지가 안 나오는” 건 보통:
    - 브라우저로 그냥 들어가서 토큰이 없으니까 401로 막힌 것이야.
    - hello 함수 자체가 실행이 안 된 거지.
  */

  // ✅ DB 연결 확인용(임시)
  @Get("health/db")
  healthDb() {
    return this.programsService.health();
  }
  /**
   * ✅ /programs/health/db
    - http://localhost:4000/programs/health/db
    - 가드 없음(공개 엔드포인트)
    - 누구나 호출 가능
    - 내부에서 SELECT 1만 날려서 DB 연결 체크
    - 그래서 브라우저로 그냥 들어가도 { ok: true }가 나옴.
    */

  /**
   * “정리”: 왜 health는 되고 hello는 안 되나?
    health/db = DB 연결 테스트용 공개 API → 토큰 필요 없음
    me/hello = 인증 성공 여부 테스트용 보호 API → 토큰 없으면 Guard가 막아서 message까지 못 감
   */

}
