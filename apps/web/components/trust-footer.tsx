export function TrustFooter() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
      <div className="container px-4 py-4">
        <p className="text-xs text-center text-muted-foreground leading-relaxed">
          본 서비스는 참고용이며, 최종 자격요건은 공고문을 확인하세요.
          <span className="hidden sm:inline">
            {" "}
            복지 데이터는 서울시 복지포털 및 정부24 공공데이터를 기반으로 제공됩니다.
          </span>
        </p>
      </div>
    </footer>
  )
}
