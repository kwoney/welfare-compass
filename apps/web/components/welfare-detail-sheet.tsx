"use client"

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, FileText, AlertCircle } from "lucide-react"
import type { ProgramCard } from "@/lib/types"

interface WelfareDetailSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  program: ProgramCard
}

export function WelfareDetailSheet({ open, onOpenChange, program }: WelfareDetailSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{program.category}</Badge>
            {program.match_score && <Badge className="bg-primary">적합도 {program.match_score}%</Badge>}
          </div>
          <SheetTitle className="text-xl text-balance leading-tight">{program.program_name}</SheetTitle>
          <SheetDescription className="text-base leading-relaxed">{program.summary}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4" />
              상세 설명
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{program.details.full_description}</p>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">지원 대상</h4>
            <div className="flex flex-wrap gap-2">
              {program.eligibility_chips.map((chip, idx) => (
                <Badge key={idx} variant="secondary">
                  {chip}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">지원 내용</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-lg font-semibold text-primary">{program.benefit}</p>
            </div>
          </div>

          {program.deadline && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-3">신청 기간</h4>
                <p className="text-sm">{program.application_period || "상시 신청"}</p>
                <p className="text-sm text-muted-foreground mt-1">마감: {program.deadline}</p>
              </div>
            </>
          )}

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">필요 서류</h4>
            <ul className="space-y-2">
              {program.details.required_documents.map((doc, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground mt-0.5">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3">신청 방법</h4>
            <ol className="space-y-2">
              {program.details.how_to_apply.map((step, idx) => (
                <li key={idx} className="text-sm flex items-start gap-2">
                  <span className="font-medium text-primary shrink-0">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {program.details.contact && (
            <>
              <Separator />
              <div>
                <h4 className="font-semibold mb-2">문의처</h4>
                <p className="text-sm text-muted-foreground">{program.details.contact}</p>
              </div>
            </>
          )}

          {program.details.warnings && (
            <>
              <Separator />
              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">유의사항</h4>
                    <p className="text-sm text-amber-800 dark:text-amber-200">{program.details.warnings}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {program.details.link && (
            <Button className="w-full" asChild>
              <a href={program.details.link} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                공식 사이트 방문
              </a>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
