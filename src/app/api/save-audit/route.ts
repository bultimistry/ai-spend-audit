import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { rateLimit } from "@/lib/rateLimit";

export async function POST(
  req: Request
) {

  try {

    const body = await req.json();

    /*
  HONEYPOT PROTECTION
*/

    if (body.website) {

      return NextResponse.json(
        {
          error: "Spam detected",
        },
        {
          status: 400,
        }
      );
    }

    /*
      RATE LIMIT
    */

    const ip =
      req.headers.get(
        "x-forwarded-for"
      ) || "unknown";

    const allowed =
      rateLimit(ip);

    if (!allowed) {

      return NextResponse.json(
        {
          error:
            "Too many requests",
        },
        {
          status: 429,
        }
      );
    }

    const {
      email,
      company,
      role,
      teamSize,
      useCase,
      tools,
      audit,
      summary,
    } = body;

    const { data, error } =
      await supabase
        .from("audits")
        .insert([
          {
            email,
            company,
            role,

            team_size:
              teamSize,

            use_case:
              useCase,

            tools,

            audit,

            summary,

            total_monthly_savings:
              audit.totalMonthlySavings,

            total_annual_savings:
              audit.totalAnnualSavings,
          },
        ])
        .select()
        .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      auditId: data.id,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Failed to save audit",
      },
      {
        status: 500,
      }
    );
  }
}