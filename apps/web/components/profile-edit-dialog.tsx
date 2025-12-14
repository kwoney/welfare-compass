"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import type { UserProfile } from "@/lib/types"

interface ProfileEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: UserProfile
  onSave: (profile: UserProfile) => void
}

export function ProfileEditDialog({ open, onOpenChange, profile, onSave }: ProfileEditDialogProps) {
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile)

  const handleSave = () => {
    onSave(editedProfile)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>내 정보 수정</DialogTitle>
          <DialogDescription>더 정확한 복지 추천을 위해 정보를 입력해주세요</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="age">나이</Label>
            <Input
              id="age"
              type="number"
              placeholder="예: 28"
              value={editedProfile.age || ""}
              onChange={(e) =>
                setEditedProfile({ ...editedProfile, age: Number.parseInt(e.target.value) || undefined })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gu">거주 자치구</Label>
            <Select
              value={editedProfile.gu}
              onValueChange={(value) => setEditedProfile({ ...editedProfile, gu: value })}
            >
              <SelectTrigger id="gu">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="강남구">강남구</SelectItem>
                <SelectItem value="강동구">강동구</SelectItem>
                <SelectItem value="강북구">강북구</SelectItem>
                <SelectItem value="강서구">강서구</SelectItem>
                <SelectItem value="관악구">관악구</SelectItem>
                <SelectItem value="광진구">광진구</SelectItem>
                <SelectItem value="구로구">구로구</SelectItem>
                <SelectItem value="금천구">금천구</SelectItem>
                <SelectItem value="노원구">노원구</SelectItem>
                <SelectItem value="도봉구">도봉구</SelectItem>
                <SelectItem value="동대문구">동대문구</SelectItem>
                <SelectItem value="동작구">동작구</SelectItem>
                <SelectItem value="마포구">마포구</SelectItem>
                <SelectItem value="서대문구">서대문구</SelectItem>
                <SelectItem value="서초구">서초구</SelectItem>
                <SelectItem value="성동구">성동구</SelectItem>
                <SelectItem value="성북구">성북구</SelectItem>
                <SelectItem value="송파구">송파구</SelectItem>
                <SelectItem value="양천구">양천구</SelectItem>
                <SelectItem value="영등포구">영등포구</SelectItem>
                <SelectItem value="용산구">용산구</SelectItem>
                <SelectItem value="은평구">은평구</SelectItem>
                <SelectItem value="종로구">종로구</SelectItem>
                <SelectItem value="중구">중구</SelectItem>
                <SelectItem value="중랑구">중랑구</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employment">취업 상태</Label>
            <Select
              value={editedProfile.employmentStatus}
              onValueChange={(value) => setEditedProfile({ ...editedProfile, employmentStatus: value })}
            >
              <SelectTrigger id="employment">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="취업">취업</SelectItem>
                <SelectItem value="구직중">구직중</SelectItem>
                <SelectItem value="학생">학생</SelectItem>
                <SelectItem value="무직">무직</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="housing">주거 형태</Label>
            <Select
              value={editedProfile.housingType}
              onValueChange={(value) => setEditedProfile({ ...editedProfile, housingType: value })}
            >
              <SelectTrigger id="housing">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="자가">자가</SelectItem>
                <SelectItem value="전세">전세</SelectItem>
                <SelectItem value="월세">월세</SelectItem>
                <SelectItem value="무상">무상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="income">소득 수준</Label>
            <Select
              value={editedProfile.incomeRange}
              onValueChange={(value) => setEditedProfile({ ...editedProfile, incomeRange: value })}
            >
              <SelectTrigger id="income">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="기초생활수급자">기초생활수급자</SelectItem>
                <SelectItem value="차상위계층">차상위계층</SelectItem>
                <SelectItem value="중위소득 50% 이하">중위소득 50% 이하</SelectItem>
                <SelectItem value="중위소득 80% 이하">중위소득 80% 이하</SelectItem>
                <SelectItem value="중위소득 100% 이하">중위소득 100% 이하</SelectItem>
                <SelectItem value="중위소득 100% 초과">중위소득 100% 초과</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="household">가구 형태</Label>
            <Select
              value={editedProfile.householdType}
              onValueChange={(value) => setEditedProfile({ ...editedProfile, householdType: value })}
            >
              <SelectTrigger id="household">
                <SelectValue placeholder="선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1인 가구">1인 가구</SelectItem>
                <SelectItem value="부부">부부</SelectItem>
                <SelectItem value="부모+자녀">부모+자녀</SelectItem>
                <SelectItem value="한부모">한부모</SelectItem>
                <SelectItem value="조손">조손</SelectItem>
                <SelectItem value="기타">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="disability"
              checked={editedProfile.hasDisability}
              onCheckedChange={(checked) => setEditedProfile({ ...editedProfile, hasDisability: checked as boolean })}
            />
            <Label htmlFor="disability" className="font-normal cursor-pointer">
              장애인
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="veteran"
              checked={editedProfile.isVeteran}
              onCheckedChange={(checked) => setEditedProfile({ ...editedProfile, isVeteran: checked as boolean })}
            />
            <Label htmlFor="veteran" className="font-normal cursor-pointer">
              국가유공자
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button onClick={handleSave}>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
