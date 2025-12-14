// ✅ packages/db/prisma/seed.ts
// 샘플 데이터 삽입 스크립트

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // ✅ 개발용 관리자 유저(운영에서는 관리자 생성 로직을 별도로 두는 게 안전)
  await prisma.user.upsert({
    where: { email: "admin@welfare.local" },
    update: {},
    create: {
      email: "admin@welfare.local",
      name: "Admin",
      role: "ADMIN",
      profile: {
        create: {
          regionSi: "서울",
          regionGu: "강남구",
          birthYear: 1999,
          employment: "unemployed",
          housing: "rent"
        }
      }
    }
  })

  // ✅ 복지 프로그램 샘플
  await prisma.welfareProgram.create({
    data: {
      programName: "청년 월세 지원(샘플)",
      agency: "서울시",
      categoryMain: "주거",
      summary: "서울 거주 청년 월세 일부를 지원합니다.",
      applyUrl: "https://example.com/apply",
      sourceUrl: "https://example.com/source",
      tags: ["청년", "월세", "서울"],
      rules: {
        create: [
          { ruleType: "REGION_SI", ruleValue: "서울", isRequired: true },
          { ruleType: "AGE_MIN", ruleValue: "19", isRequired: true },
          { ruleType: "AGE_MAX", ruleValue: "34", isRequired: true }
        ]
      }
    }
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
