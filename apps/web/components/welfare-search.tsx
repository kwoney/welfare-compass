"use client"

import { useState } from "react"
import { MessageCircle, ThumbsUp, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const REGIONS = [
  { value: "seoul", label: "서울시" },
  { value: "gangnam", label: "강남구" },
  { value: "gangdong", label: "강동구" },
  { value: "gangbuk", label: "강북구" },
  { value: "gangseo", label: "강서구" },
]

const EMPLOYMENT_STATUS = [
  { value: "all", label: "취업상태 선택" },
  { value: "employed", label: "재직중" },
  { value: "unemployed", label: "미취업" },
  { value: "self-employed", label: "자영업" },
  { value: "student", label: "학생" },
]

const AGE_GROUPS = [
  { value: "all", label: "연령 선택" },
  { value: "youth", label: "청년 (19-39세)" },
  { value: "middle", label: "중장년 (40-64세)" },
  { value: "senior", label: "노인 (65세 이상)" },
  { value: "child", label: "아동 (0-18세)" },
]

export function WelfareSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [region, setRegion] = useState("seoul")
  const [employment, setEmployment] = useState("all")
  const [age, setAge] = useState("all")

  const handleSearch = () => {
    console.log("Searching:", { searchQuery, region, employment, age })
    // Implement search logic here
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        {/* Left Button - Customized Policy Search */}
        <Button className="bg-[#3d3d4e] hover:bg-[#2d2d3e] text-white rounded-xl px-6 h-14 flex items-center gap-2 whitespace-nowrap font-semibold">
          맞춤형 정책검색
          <User className="h-5 w-5" />
        </Button>

        {/* Region Select */}
        <div className="relative flex-shrink-0">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="w-[180px] h-14 rounded-xl border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map((reg) => (
                <SelectItem key={reg.value} value={reg.value}>
                  {reg.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Employment Status Select */}
        <div className="relative flex-shrink-0">
          <Select value={employment} onValueChange={setEmployment}>
            <SelectTrigger className="w-[200px] h-14 rounded-xl border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-blue-500" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {EMPLOYMENT_STATUS.map((emp) => (
                <SelectItem key={emp.value} value={emp.value}>
                  {emp.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Age Select */}
        <div className="relative flex-shrink-0">
          <Select value={age} onValueChange={setAge}>
            <SelectTrigger className="w-[180px] h-14 rounded-xl border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {AGE_GROUPS.map((ageGroup) => (
                <SelectItem key={ageGroup.value} value={ageGroup.value}>
                  {ageGroup.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-500" />
          <Input
            placeholder="정책명을 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="h-14 pl-12 rounded-xl border-gray-200 bg-white"
          />
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="bg-[#3d3d4e] hover:bg-[#2d2d3e] text-white rounded-xl px-8 h-14 flex items-center gap-2 whitespace-nowrap font-semibold"
        >
          <Search className="h-5 w-5" />
          검색
        </Button>
      </div>
    </div>
  )
}
