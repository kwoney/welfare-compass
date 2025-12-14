import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"

/**
 * ✅ PrismaClient를 Nest의 라이프사이클에 맞춰 관리하는 서비스
 * - OnModuleInit: 앱 시작 시 DB 연결 준비
 * - OnModuleDestroy: 앱 종료 시 커넥션 정리
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
