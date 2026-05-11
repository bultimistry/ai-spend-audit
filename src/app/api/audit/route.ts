import { NextResponse } from "next/server";

import { runAudit } from "@/lib/auditEngine";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      tools,
      teamSize,
      useCase,
    } = body;

    const audit = runAudit(
      tools,
      teamSize,
      useCase
    );

    return NextResponse.json(audit);

  } catch (error) {

    return NextResponse.json(
      {
        error: "Audit failed",
      },
      {
        status: 500,
      }
    );
  }
}