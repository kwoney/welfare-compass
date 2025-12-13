"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { HeroBanner } from "@/components/hero-banner"
import { UserSummaryPanel } from "@/components/user-summary-panel"
import { ChatPanel } from "@/components/chat-panel"
import { ResultsPanel } from "@/components/results-panel"
import { WelfareSearch } from "@/components/welfare-search"
import { TrustFooter } from "@/components/trust-footer"
import type { ChatMessage, UserProfile, ProgramCard } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

// Mock data for initial preview
const MOCK_PROGRAMS: ProgramCard[] = [
  {
    id: "1",
    program_name: "서울시 청년월세 지원",
    category: "주거",
    summary: "서울시에 거주하는 만 19~39세 청년에게 월세를 지원하는 프로그램입니다.",
    eligibility_chips: ["만 19-39세", "서울 거주", "중위소득 150% 이하", "독립가구"],
    benefit: "월 최대 20만원 (최대 12개월)",
    deadline: "2025-12-31",
    application_period: "2025-01-01 ~ 2025-12-31",
    match_score: 85,
    details: {
      full_description:
        "서울시에 거주하는 만 19세부터 39세까지의 청년이 독립적으로 거주하며 월세를 납부하는 경우, 월세 부담을 덜어주기 위해 월 최대 20만원을 최장 12개월간 지원합니다. 중위소득 150% 이하 가구가 대상이며, 보증금 5천만원 이하, 월세 60만원 이하 주택에 거주해야 합니다.",
      required_documents: [
        "신분증 사본",
        "임대차계약서 사본",
        "통장 사본",
        "소득증빙서류 (원천징수영수증, 소득금액증명원 등)",
        "가족관계증명서",
      ],
      how_to_apply: [
        "서울시 청년포털 접속",
        "회원가입 및 로그인",
        "청년월세 지원 메뉴 선택",
        "온라인 신청서 작성 및 서류 업로드",
        "신청 완료 후 심사 대기 (약 2-3주 소요)",
      ],
      contact: "서울시 청년정책과 02-120",
      link: "https://youth.seoul.go.kr",
      warnings: "신청 시 제출한 서류에 허위 사실이 있을 경우 지원이 취소될 수 있으며, 부정수급 시 환수 조치됩니다.",
    },
  },
  {
    id: "2",
    program_name: "구직활동 지원금",
    category: "일자리",
    summary: "취업 준비 중인 청년에게 구직활동을 지원하는 프로그램입니다.",
    eligibility_chips: ["만 18-34세", "미취업자", "구직등록", "저소득"],
    benefit: "월 50만원 (최대 6개월)",
    deadline: "2025-06-30",
    application_period: "2025-01-01 ~ 2025-06-30",
    match_score: 78,
    details: {
      full_description:
        "취업을 준비하는 청년들에게 구직활동 기간 동안 생활 안정을 위한 지원금을 제공합니다. 월 50만원을 최대 6개월간 지급하며, 취업 프로그램 참여 및 구직활동 증빙이 필요합니다.",
      required_documents: ["신분증", "구직등록확인서", "통장 사본", "소득증빙서류", "구직활동 증빙서류"],
      how_to_apply: [
        "고용센터 방문하여 구직등록",
        "온라인 신청서 작성",
        "서류 제출",
        "면접 및 자격 심사",
        "승인 후 월별 구직활동 보고",
      ],
      contact: "고용노동부 고객센터 1350",
      warnings: "구직활동 보고를 누락하면 지원이 중단될 수 있습니다.",
    },
  },
  {
    id: "3",
    program_name: "전세자금 대출 이자 지원",
    category: "주거",
    summary: "전세 거주 청년의 전세자금 대출 이자를 지원합니다.",
    eligibility_chips: ["만 19-34세", "전세 거주", "대출 보유", "중위소득 100% 이하"],
    benefit: "연 이자의 50% (최대 연 120만원)",
    deadline: "상시",
    match_score: 72,
    details: {
      full_description:
        "전세 거주 청년의 주거비 부담을 줄이기 위해 전세자금 대출 이자의 일부를 지원합니다. 대출 금액 및 이자율에 따라 연 최대 120만원까지 지원받을 수 있습니다.",
      required_documents: ["신분증", "전세자금대출 계약서", "임대차계약서", "소득증빙서류", "통장 사본"],
      how_to_apply: [
        "온라인 신청 포털 접속",
        "신청서 작성",
        "대출 및 계약 서류 업로드",
        "심사 대기",
        "승인 시 분기별 지원금 지급",
      ],
      contact: "주거복지센터 1600-1004",
      warnings: "대출 상환 연체 시 지원이 중단됩니다.",
    },
  },
]

export default function WelfareCompassPage() {
  const { toast } = useToast()
  const [userProfile, setUserProfile] = useState<UserProfile>({})
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [recommendedPrograms, setRecommendedPrograms] = useState<ProgramCard[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (message: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      kind: "markdown",
      content: message,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Placeholder API call
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          userProfile,
          messages,
        }),
      })

      if (!response.ok) {
        throw new Error("API request failed")
      }

      const data = await response.json()

      // Update profile if extracted
      if (data.extractedProfile) {
        setUserProfile((prev) => ({ ...prev, ...data.extractedProfile }))
      }

      // Update recommended programs
      if (data.recommendedPrograms) {
        setRecommendedPrograms(data.recommendedPrograms)
      }

      // Add assistant message
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        kind: "markdown",
        content: data.assistantMessage,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      // Mock response for demo
      setTimeout(() => {
        const mockResponse = getMockResponse(message)

        if (mockResponse.profile) {
          setUserProfile((prev) => ({ ...prev, ...mockResponse.profile }))
        }

        if (mockResponse.programs) {
          setRecommendedPrograms(mockResponse.programs)
        }

        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          kind: "markdown",
          content: mockResponse.message,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
        setIsLoading(false)
      }, 1500)
      return
    }

    setIsLoading(false)
  }

  const getMockResponse = (userMessage: string) => {
    const lower = userMessage.toLowerCase()

    if (lower.includes("취준") || lower.includes("구직")) {
      return {
        message:
          "취업 준비 중이시군요. 구직활동 지원금과 취업 관련 프로그램을 추천해드립니다. 나이와 거주 지역을 알려주시면 더 정확한 추천이 가능합니다.",
        profile: { employmentStatus: "구직중" },
        programs: MOCK_PROGRAMS.filter((p) => p.category === "일자리"),
      }
    }

    if (lower.includes("월세")) {
      return {
        message:
          "월세 거주 중이시네요. 서울시 청년월세 지원 프로그램을 추천드립니다. 나이와 소득 수준을 알려주시면 자격 여부를 확인해드릴 수 있습니다.",
        profile: { housingType: "월세" },
        programs: MOCK_PROGRAMS.filter((p) => p.program_name.includes("월세")),
      }
    }

    if (lower.includes("청년")) {
      return {
        message:
          "청년을 위한 다양한 복지 프로그램이 있습니다. 주거, 일자리, 생활 등 여러 분야의 지원이 가능합니다. 어떤 분야의 지원이 필요하신가요?",
        profile: { age: 28 },
        programs: MOCK_PROGRAMS,
      }
    }

    if (lower.includes("전세")) {
      return {
        message:
          "전세 거주 중이시군요. 전세자금 대출 이자 지원 프로그램을 확인해보세요. 중위소득 100% 이하 청년에게 연 최대 120만원까지 지원됩니다.",
        profile: { housingType: "전세" },
        programs: MOCK_PROGRAMS.filter((p) => p.program_name.includes("전세")),
      }
    }

    return {
      message:
        "안녕하세요! 복지 혜택 찾기를 도와드리겠습니다. 현재 상황(거주지, 나이, 취업 상태 등)을 말씀해주시면 맞춤형 복지 프로그램을 추천해드릴 수 있어요.",
      programs: MOCK_PROGRAMS.slice(0, 2),
    }
  }

  const handleProfileUpdate = (newProfile: UserProfile) => {
    setUserProfile(newProfile)
    toast({
      title: "프로필 업데이트 완료",
      description: "맞춤 복지 추천이 더 정확해집니다.",
    })
  }

  const handleReset = () => {
    setUserProfile({})
    setMessages([])
    setRecommendedPrograms([])
    toast({
      title: "초기화 완료",
      description: "모든 정보가 삭제되었습니다.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <HeroBanner />

      {/* ✅ main 자체는 full width, 내부에서만 가운데 정렬/여백을 통일 */}
      <main className="flex-1">
        <div
          className="
            mx-auto w-full
            max-w-screen-2xl
            px-4 sm:px-6 lg:px-8 2xl:px-12
            py-6
          "
        >
          {/* ✅ 3열 그리드도 래퍼 안에서 자연스럽게 중앙에 위치 */}
          <div className="grid gap-6 lg:grid-cols-[minmax(260px,320px)_minmax(0,1fr)_minmax(320px,420px)] lg:h-[calc(100vh-180px)]">
            {/* Left Sidebar - User Summary */}
            <aside className="hidden lg:block min-h-0">
              {/* ✅ sticky는 '그리드 영역' 안에서만 유지되고, 그리드 끝에서 멈춤 */}
              <div className="sticky top-24 h-full min-h-0">
                {/* ✅ 패널 자체가 길어지면 내부만 스크롤 */}
                <div className="h-full overflow-auto">
                  <UserSummaryPanel
                    profile={userProfile}
                    onProfileUpdate={handleProfileUpdate}
                    onReset={handleReset}
                  />
                </div>
              </div>
            </aside>

            {/* Chat - 가운데 컬럼도 sticky로 고정 */}
            <div className="min-h-0">
              <div className="sticky top-24 h-full min-h-0">
                {/* ✅ 내부 요소가 튀어나와 겹치지 않도록 클리핑 */}
                <div className="relative h-full min-w-0 overflow-hidden">
                  <ChatPanel
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>

              {/* Right Panel - Results */}
              <aside className="hidden lg:block min-h-0">
                <div className="sticky top-24 h-full min-h-0">
                  <div className="h-full overflow-auto">
                    <ResultsPanel programs={recommendedPrograms} />
                  </div>
                </div>
              </aside>
          </div>

          <div className="mt-6 space-y-6 lg:hidden">
            <UserSummaryPanel profile={userProfile} onProfileUpdate={handleProfileUpdate} onReset={handleReset} />
            <ResultsPanel programs={recommendedPrograms} />
          </div>

          <div className="mt-8">
            <WelfareSearch />
          </div>
        </div>
      </main>

      <TrustFooter />
    </div>
  )
}
