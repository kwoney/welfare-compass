import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { resolve } from "path";

import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { ProgramsModule } from "./programs/programs.module";
import { QueuesModule } from "./queues/queues.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // ✅ 어디서 실행하든 둘 중 하나는 반드시 맞도록
      envFilePath: [
        resolve(process.cwd(), ".env"),             // 현재 작업폴더의 .env (apps/api에서 실행 시 여기 잡힘)
        resolve(process.cwd(), "apps/api/.env"),    // 루트에서 실행 시 여기 잡힘
      ],
    }),

    PrismaModule,
    AuthModule,
    ProgramsModule,
    ...(process.env.REDIS_URL ? [QueuesModule] : []),
  ],
})
export class AppModule {}
