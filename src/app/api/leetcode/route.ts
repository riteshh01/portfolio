import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.NEXT_PUBLIC_LEETCODE_USERNAME || "riteshh_0";

  const query = `
    query userProblemsSolved($username: String!) {
      allQuestionsCount {
        difficulty
        count
      }
      matchedUser(username: $username) {
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
      // Revalidate every 24 hours
      next: { revalidate: 86400 },
    });

    const data = await response.json();
    
    if (data.errors || !data.data.matchedUser) {
      return NextResponse.json({ error: "Failed to fetch data from LeetCode" }, { status: 500 });
    }

    const allQuestionsCount = data.data.allQuestionsCount;
    const acSubmissionNum = data.data.matchedUser.submitStatsGlobal.acSubmissionNum;

    return NextResponse.json({
      all: {
        total: allQuestionsCount.find((q: any) => q.difficulty === "All")?.count || 0,
        solved: acSubmissionNum.find((q: any) => q.difficulty === "All")?.count || 0
      },
      easy: {
        total: allQuestionsCount.find((q: any) => q.difficulty === "Easy")?.count || 0,
        solved: acSubmissionNum.find((q: any) => q.difficulty === "Easy")?.count || 0
      },
      medium: {
        total: allQuestionsCount.find((q: any) => q.difficulty === "Medium")?.count || 0,
        solved: acSubmissionNum.find((q: any) => q.difficulty === "Medium")?.count || 0
      },
      hard: {
        total: allQuestionsCount.find((q: any) => q.difficulty === "Hard")?.count || 0,
        solved: acSubmissionNum.find((q: any) => q.difficulty === "Hard")?.count || 0
      }
    });
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
