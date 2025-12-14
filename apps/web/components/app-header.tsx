"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      {/* ✅ 배경은 full width, 내부 콘텐츠만 중앙 정렬 */}
      <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="복지나침반 로고"
            width={40}
            height={40}
            className="object-contain"
          />
          <h1 className="text-xl font-semibold tracking-tight">복지나침반</h1>
          <h6 className="text-xl font-semibold tracking-tight">welfare</h6>
        </div>

        <nav className="flex flex-1 items-center justify-center gap-3">
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            복지찾기
          </Button>
          <Button variant="ghost" size="sm" className="hidden md:inline-flex">
            복지달력
          </Button>
          <Button variant="ghost" size="sm">
            <span className="hidden sm:inline">복지맵</span>
          </Button>
          <Button variant="ghost" size="sm">
            <span className="hidden sm:inline">마이페이지</span>
          </Button>
        </nav>

        <div className="flex items-center">
          <Button variant="default" size="sm">
            <User className="mr-2 h-4 w-4" />
            로그인
          </Button>
        </div>
      </div>

      {/* ✅ 아래 줄도 같은 래퍼 적용 (텍스트만 중앙정렬 유지) */}
      <div className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-8 2xl:px-12 py-1.5">
          <p className="text-center text-xs text-muted-foreground">마지막 업데이트: 2025-01-15</p>
        </div>
      </div>
    </header>
  )
}
