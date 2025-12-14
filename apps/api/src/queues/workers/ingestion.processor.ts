import { Processor, WorkerHost } from "@nestjs/bullmq"
import { Job } from "bullmq"
import { PrismaService } from "../../prisma/prisma.service"

/**
 * ✅ ingestion 큐의 작업 처리자(Worker)
 * - “정책 수집 → 정규화 → DB upsert” 같은 작업을 여기에 넣으면 됨
 * - 지금은 샘플로 로그만 찍고 끝냄
 */
@Processor("ingestion")
export class IngestionProcessor extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super()
  }

  async process(job: Job) {
    // ✅ job.data에는 enqueue할 때 넣은 payload가 들어옴
    const payload = job.data as { source: string }

    // (예시) payload.source 기반으로 외부 API/CSV를 가져와서 저장하는 로직
    console.log("[ingestion] start:", payload)

    // TODO:
    // 1) 외부 데이터 fetch
    // 2) 정규화(필드 매핑, 태그 생성, rule 생성)
    // 3) prisma.welfareProgram.upsert(...) 반복
    // 4) 완료 후 통계 리턴

    return { ok: true }
  }
}
