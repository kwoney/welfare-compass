import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ✅ 프론트(Vercel)에서 호출 가능하게 CORS 설정
  // - 운영에서는 CORS_ORIGIN에 실제 도메인만 넣는 걸 권장
  const origin = process.env.CORS_ORIGIN?.split(",").map(s => s.trim()) ?? ["http://localhost:3000"]
  app.enableCors({
    origin,
    credentials: true
  })

  const port = Number(process.env.PORT || 3000)
  await app.listen(port)
  console.log(`API running on :${port}`)
}

bootstrap()
