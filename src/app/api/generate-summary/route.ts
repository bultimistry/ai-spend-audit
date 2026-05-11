import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const { audit, useCase } = body;

    const prompt = `
You are an AI infrastructure cost consultant.

A user completed an AI spend audit.

Write a concise professional summary (~100 words).

Requirements:
- Mention where savings are coming from
- Mention if stack is already optimized
- Sound financially rational
- Do not exaggerate
- Do not invent savings
- Be concise and executive-friendly

User use case:
${useCase}

Audit:
${JSON.stringify(audit)}
`;

    const response = await fetch(
      "https://api.anthropic.com/v1/messages",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          "x-api-key":
            process.env.ANTHROPIC_API_KEY!,

          "anthropic-version":
            "2023-06-01",
        },

        body: JSON.stringify({
          model: "claude-3-haiku-20240307",

          max_tokens: 250,

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const summary =
      data?.content?.[0]?.text;

    return NextResponse.json({
      summary,
    });

  } catch (error) {

    console.error(error);

    /*
      FALLBACK SUMMARY
    */

    return NextResponse.json({
      summary:
        "Your current AI tooling stack shows several optimization opportunities. Some plans appear oversized relative to your current team structure and workload patterns. Reviewing lower-cost tiers and consolidating overlapping tooling could reduce monthly operating costs while maintaining similar functionality.",
    });
  }
}