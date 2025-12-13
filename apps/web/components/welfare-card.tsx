"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Bookmark, Share2, Medal } from "lucide-react"
import type { ProgramCard } from "@/lib/types"
import { WelfareDetailSheet } from "./welfare-detail-sheet"
import { cn } from "@/lib/utils"

interface WelfareCardProps {
  program: ProgramCard
  showRank?: boolean
  rank?: number
  compact?: boolean
}

export function WelfareCard({ program, showRank = false, rank, compact = false }: WelfareCardProps) {
  const [detailOpen, setDetailOpen] = useState(false)

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return "bg-amber-500 text-white"
    if (rank === 2) return "bg-slate-400 text-white"
    if (rank === 3) return "bg-amber-700 text-white"
    return "bg-muted text-muted-foreground"
  }

  return (
    <>
      <Card className={cn("hover:shadow-md transition-shadow", compact && "max-w-md")}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {showRank && rank && (
                  <Badge className={cn("shrink-0", getRankBadgeColor(rank))}>
                    <Medal className="h-3 w-3 mr-1" />
                    {rank}순위
                  </Badge>
                )}
                <Badge variant="outline" className="shrink-0">
                  {program.category}
                </Badge>
              </div>
              <h3 className="font-semibold leading-tight text-balance">{program.program_name}</h3>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">{program.summary}</p>

          <div className="flex flex-wrap gap-1.5">
            {program.eligibility_chips.slice(0, 4).map((chip, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {chip}
              </Badge>
            ))}
            {program.eligibility_chips.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{program.eligibility_chips.length - 4}
              </Badge>
            )}
          </div>

          <div className="pt-2 border-t space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">지원 혜택</span>
              <span className="font-medium text-primary">{program.benefit}</span>
            </div>
            {program.deadline && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">신청 마감</span>
                <span className="font-medium">{program.deadline}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <Button variant="default" size="sm" className="flex-1" onClick={() => setDetailOpen(true)}>
              <Eye className="mr-2 h-4 w-4" />
              상세보기
            </Button>
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <WelfareDetailSheet open={detailOpen} onOpenChange={setDetailOpen} program={program} />
    </>
  )
}
