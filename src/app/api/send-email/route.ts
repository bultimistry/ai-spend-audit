import { NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(
  req: Request
) {

  try {

    const body = await req.json();

    const {
      email,
      auditUrl,
      monthlySavings,
    } = body;

    /*
      EMAIL CONTENT
    */

    const highSavings =
      monthlySavings > 500;

    const result =
      await resend.emails.send({

        from:
          "StackAudit <onboarding@resend.dev>",

        to: email,

        subject:
          "Your StackAudit Report",

        html: `
          <div style="
            font-family: Arial;
            padding: 24px;
          ">

            <h1>
              Your AI Spend Audit
            </h1>

            <p>
              Your audit report is ready.
            </p>

            <p>
              Estimated monthly savings:
              <strong>
                $${monthlySavings}
              </strong>
            </p>

            <a
              href="${auditUrl}"
              style="
                display:inline-block;
                margin-top:20px;
                background:#22c55e;
                color:white;
                padding:12px 20px;
                border-radius:8px;
                text-decoration:none;
              "
            >
              View Audit Report
            </a>

            ${
              highSavings
                ? `
                  <p style="margin-top:30px;">
                    Credex may be able to help optimize your enterprise AI tooling spend further.
                  </p>
                `
                : ""
            }

          </div>
        `,
      });

    return NextResponse.json({
      success: true,
      result,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Email failed",
      },
      {
        status: 500,
      }
    );
  }
}