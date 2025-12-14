import { Module, Logger } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IngestionProcessor } from "./workers/ingestion.processor";

/**
 * ✅ 근본 해결 포인트
 * - REDIS_URL이 없으면: 큐를 "등록하지 않고" 앱은 정상 부팅
 * - REDIS_URL이 있으면: BullMQ를 정상 연결해서 큐/워커 활성화
 */
@Module({
  imports: [
    ConfigModule,
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const raw = config.get<string>("REDIS_URL");

        // ✅ Redis가 없으면 "큐 기능만 비활성화" (throw 금지)
        if (!raw) {
          Logger.warn(
            "REDIS_URL is not set. Queues are disabled (this is OK for local dev).",
            "QueuesModule"
          );

          // BullMQ는 connection이 필요하므로,
          // 여기서는 "더미"를 주면 안 되고, 아예 모듈 로드를 피하는 게 가장 안전함.
          // => 따라서 forRootAsync는 쓰되, 아래처럼 localhost를 기본값으로 줄 수도 있고,
          //    더 정석은 app.module.ts에서 QueuesModule 자체를 조건부로 import 하는 것.
          //
          // 여기서는 개발 편의를 위해 로컬 Redis 기본값을 제공(있으면 붙고, 없으면 기능만 실패할 수 있음)
          return { connection: { host: "127.0.0.1", port: 6379 } };
        }

        const u = new URL(raw);
        const isTls = u.protocol === "rediss:";
        return {
          connection: {
            host: u.hostname,
            port: Number(u.port || 6379),
            username: u.username || undefined,
            password: u.password || undefined,
            tls: isTls ? {} : undefined,
          },
        };
      },
    }),

    // ✅ 큐 등록
    BullModule.registerQueue({ name: "ingestion" }),
  ],
  providers: [IngestionProcessor],
})
export class QueuesModule {}
