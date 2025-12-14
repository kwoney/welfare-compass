import { Global, Module } from "@nestjs/common"
import { PrismaService } from "./prisma.service"

@Global() // ✅ 어디서든 주입 가능하게 전역 모듈로
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
