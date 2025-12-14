import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  // ✅ DB 연결 확인용(임시)
  async health() {
  // DB에 실제로 쿼리를 날려서 연결 여부를 확정
    await this.prisma.$queryRaw`SELECT 1`;
    return { ok: true };
  }

  // ✅ 정책 목록/검색
  async list(params: { query?: string; categoryMain?: string }) {
    const { query, categoryMain } = params
    
    // ✅ 간단 검색(MVP)
    // - query가 있으면 programName/summary에 contains
    // - categoryMain으로 필터
    return this.prisma.welfareProgram.findMany({
      where: {
        ...(categoryMain ? { categoryMain } : {}),
        ...(query
          ? {
              OR: [
                { programName: { contains: query, mode: "insensitive" } },
                { summary: { contains: query, mode: "insensitive" } }
              ]
            }
          : {})
      },
      orderBy: { updatedAt: "desc" },
      take: 50
    })
  }
}

