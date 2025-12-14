import { Sparkles, TrendingUp, Shield } from "lucide-react"
import Image from "next/image"

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden border-b">
      {/* ✅ 배경 이미지: 화면 전체 */}
      <Image src="/images/hero2.png" alt="" fill priority className="object-cover opacity-20" />

      {/* ✅ 그라데이션 오버레이: 화면 전체 */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />

      {/* ✅ 콘텐츠: 중앙 정렬 래퍼 */}
      <div className="relative">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 2xl:px-12 py-20">
          <div className="mx-auto max-w-4xl space-y-4 text-center">
            <h2 className="text-2xl font-bold text-balance md:text-3xl">
              서울시민을 위한 맞춤형 복지 안내
            </h2>

            <p className="mx-auto max-w-2xl text-balance text-muted-foreground">
              복지나침반이 여러분의 상황에 맞는 복지 혜택을 찾아드립니다. 간단한 대화로 시작하세요.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span>AI 맞춤 추천</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>실시간 업데이트</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>개인정보 보호</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
