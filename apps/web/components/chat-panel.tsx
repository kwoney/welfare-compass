"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Send, Sparkles } from "lucide-react"
import type { ChatMessage } from "@/lib/types"
import { WelfareCard } from "./welfare-card"
import { cn } from "@/lib/utils"

interface ChatPanelProps {
  messages: ChatMessage[]
  onSendMessage: (message: string) => void
  isLoading: boolean
}

const QUICK_PROMPTS = ["취준생", "월세", "청년", "저소득", "전세", "출산/육아"]

export function ChatPanel({ messages, onSendMessage, isLoading }: ChatPanelProps) {
  const [input, setInput] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // ✅ "스크롤되는 메시지 영역" 자체를 ref로 잡는다
  const messagesScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = messagesScrollRef.current
    if (!el) return

    // ✅ 페이지(body)가 아니라 메시지 영역(div) 안에서만 아래로 내림
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickPrompt = (prompt: string) => {
    if (!isLoading) {
      onSendMessage(prompt)
    }
  }

  return (
    // ✅ min-h-0 / overflow-hidden: 내부 스크롤을 안정적으로 만들고 밖으로 튀는 것 방지
    <Card className="flex h-full min-h-0 flex-col overflow-hidden">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-5 w-5 text-primary" />
          복지 상담
        </CardTitle>
      </CardHeader>

      {/* ✅ min-h-0: 아래 메시지 영역 overflow가 body로 안 새게 하는 핵심 */}
      <CardContent className="flex min-h-0 flex-1 flex-col p-0">
        {/* ✅ 여기가 실제 스크롤 컨테이너 */}
        <div ref={messagesScrollRef} className="min-h-0 flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">복지 혜택 찾기를 도와드립니다</h3>
              <p className="mb-6 max-w-md text-sm text-muted-foreground">
                현재 상황을 말씀해주시면, 받을 수 있는 복지 프로그램을 찾아드려요
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_PROMPTS.map((prompt) => (
                  <Badge
                    key={prompt}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary transition-colors"
                    onClick={() => handleQuickPrompt(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex w-full", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  {message.kind === "markdown" ? (
                    <div
                      className={cn(
                        "max-w-[85%] rounded-lg px-4 py-2.5",
                        message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    </div>
                  ) : message.kind === "card" && message.card ? (
                    <div className="max-w-full">
                      <WelfareCard program={message.card} showRank={false} compact />
                    </div>
                  ) : null}
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg bg-muted px-4 py-2.5">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* 입력 영역 */}
        <div className="border-t p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_PROMPTS.map((prompt) => (
              <Badge
                key={prompt}
                variant="secondary"
                className="cursor-pointer text-xs hover:bg-secondary/80 transition-colors"
                onClick={() => handleQuickPrompt(prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                e.target.style.height = "auto"
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
              }}
              onKeyDown={handleKeyDown}
              placeholder="궁금하신 복지 혜택을 물어보세요..."
              className="min-h-[60px] max-h-[120px] resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
              className="h-[60px] w-[60px] shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
