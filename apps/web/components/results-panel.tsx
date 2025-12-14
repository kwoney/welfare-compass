"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ListFilter, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import type { ProgramCard, CategoryType, SortType } from "@/lib/types"
import { WelfareCard } from "./welfare-card"

interface ResultsPanelProps {
  programs: ProgramCard[]
}

export function ResultsPanel({ programs }: ResultsPanelProps) {
  const [category, setCategory] = useState<CategoryType>("전체")
  const [sortBy, setSortBy] = useState<SortType>("추천순")
  const [highEligibilityOnly, setHighEligibilityOnly] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const CARDS_PER_PAGE = 3

  const filteredPrograms = programs
    .filter((p) => category === "전체" || p.category === category)
    .filter((p) => !highEligibilityOnly || (p.match_score && p.match_score >= 70))
    .sort((a, b) => {
      if (sortBy === "추천순") {
        return (b.match_score || 0) - (a.match_score || 0)
      }
      return 0
    })

  const totalPages = Math.ceil(filteredPrograms.length / CARDS_PER_PAGE)
  const startIndex = currentPage * CARDS_PER_PAGE
  const visiblePrograms = filteredPrograms.slice(startIndex, startIndex + CARDS_PER_PAGE)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="text-base flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          우선순위별 추천 복지 ({filteredPrograms.length})
        </CardTitle>
      </CardHeader>

      <div className="border-b p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">카테고리</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as CategoryType)}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="주거">주거</SelectItem>
                <SelectItem value="생활">생활</SelectItem>
                <SelectItem value="교육">교육</SelectItem>
                <SelectItem value="일자리">일자리</SelectItem>
                <SelectItem value="의료">의료</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">정렬</Label>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortType)}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="추천순">추천순</SelectItem>
                <SelectItem value="지원금액순">지원금액순</SelectItem>
                <SelectItem value="마감임박">마감임박</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="eligibility-filter" className="text-sm cursor-pointer">
            가능성 높은 것만
          </Label>
          <Switch id="eligibility-filter" checked={highEligibilityOnly} onCheckedChange={setHighEligibilityOnly} />
        </div>
      </div>

      <CardContent className="flex-1 overflow-y-auto p-4">
        {filteredPrograms.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="bg-muted rounded-full p-4 mb-4">
              <ListFilter className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">추천 복지가 없습니다</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              대화를 통해 상황을 알려주시면
              <br />
              맞춤 복지를 추천해드려요
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {visiblePrograms.map((program, idx) => (
              <WelfareCard
                key={program.id}
                program={program}
                showRank={sortBy === "추천순"}
                rank={startIndex + idx + 1}
              />
            ))}

            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="gap-1 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  이전
                </Button>
                <span className="text-sm text-muted-foreground">
                  {currentPage + 1} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="gap-1 bg-transparent"
                >
                  다음
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
