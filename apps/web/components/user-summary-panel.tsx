"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Edit, RotateCcw, UserCircle } from "lucide-react"
import type { UserProfile } from "@/lib/types"
import { ProfileEditDialog } from "./profile-edit-dialog"

interface UserSummaryPanelProps {
  profile: UserProfile
  onProfileUpdate: (profile: UserProfile) => void
  onReset: () => void
}

export function UserSummaryPanel({ profile, onProfileUpdate, onReset }: UserSummaryPanelProps) {
  const [editOpen, setEditOpen] = useState(false)

  const hasProfile = Object.keys(profile).length > 0

  const getProfileItems = () => {
    const items: { label: string; value: string }[] = []
    if (profile.age) items.push({ label: "나이", value: `${profile.age}세` })
    if (profile.gu) items.push({ label: "거주지", value: profile.gu })
    if (profile.employmentStatus) items.push({ label: "취업상태", value: profile.employmentStatus })
    if (profile.housingType) items.push({ label: "주거형태", value: profile.housingType })
    if (profile.incomeRange) items.push({ label: "소득수준", value: profile.incomeRange })
    if (profile.householdType) items.push({ label: "가구형태", value: profile.householdType })
    if (profile.hasDisability) items.push({ label: "장애", value: "해당" })
    if (profile.isVeteran) items.push({ label: "보훈", value: "해당" })
    return items
  }

  return (
    <>
      <Card className="h-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-primary" />내 정보 요약
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasProfile ? (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                대화를 통해 맞춤 복지를
                <br />
                추천받아보세요
              </p>
              <Button variant="outline" size="sm" onClick={() => setEditOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                정보 직접 입력
              </Button>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2">
                {getProfileItems().map((item, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {item.label}: {item.value}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" onClick={() => setEditOpen(true)}>
                  <Edit className="mr-2 h-4 w-4" />
                  정보 수정
                </Button>
                <Button variant="ghost" size="sm" onClick={onReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  초기화
                </Button>
              </div>
            </>
          )}

          <div className="pt-4 border-t">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Lock className="h-4 w-4 mt-0.5 shrink-0" />
              <p>민감정보는 저장하지 않아요</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProfileEditDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        profile={profile}
        onSave={(newProfile) => {
          onProfileUpdate(newProfile)
          setEditOpen(false)
        }}
      />
    </>
  )
}
