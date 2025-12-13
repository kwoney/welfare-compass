export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  kind: "markdown" | "card"
  content?: string
  card?: ProgramCard
  timestamp: Date
}

export interface UserProfile {
  age?: number
  birthYear?: number
  gu?: string
  employmentStatus?: string
  housingType?: string
  incomeRange?: string
  householdType?: string
  hasDisability?: boolean
  isVeteran?: boolean
}

export interface ProgramCard {
  id: string
  program_name: string
  category: string
  summary: string
  eligibility_chips: string[]
  benefit: string
  deadline?: string
  application_period?: string
  details: {
    full_description: string
    required_documents: string[]
    how_to_apply: string[]
    contact?: string
    link?: string
    warnings?: string
  }
  match_score?: number
}

export type CategoryType = "전체" | "주거" | "생활" | "교육" | "일자리" | "의료"
export type SortType = "추천순" | "지원금액순" | "마감임박"
