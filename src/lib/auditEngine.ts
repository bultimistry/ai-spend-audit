import { AuditResult, ToolInput } from "@/types/audit";
import { pricingData } from "./pricingData";

export function runAudit(
  tools: ToolInput[],
  teamSize: number,
  useCase: string
) {

  const results: AuditResult[] = [];

  let totalMonthlySavings = 0;

  for (const tool of tools) {

    /*
      NORMALIZE INPUTS
    */

    const name =
      tool.name.toLowerCase().trim();

    const plan =
      tool.plan.toLowerCase().trim();

    let recommendation =
      "Current plan looks appropriate";

    let recommendedSpend =
      tool.spend;

    let savings = 0;

    let reason =
      "Your current pricing appears aligned with your usage.";

    /*
      CHATGPT LOGIC
    */

    if (name === "chatgpt") {

      if (
        plan === "team" &&
        tool.seats <= 2
      ) {

        recommendedSpend =
          pricingData.chatgpt.plus *
          tool.seats;

        savings =
          tool.spend -
          recommendedSpend;

        recommendation =
          "Downgrade to ChatGPT Plus";

        reason =
          "ChatGPT Team pricing is typically unnecessary for teams under 3 users unless advanced admin controls are required.";
      }

      else if (
        plan === "enterprise" &&
        tool.seats <= 5
      ) {

        recommendedSpend =
          pricingData.chatgpt.team *
          tool.seats;

        savings =
          tool.spend -
          recommendedSpend;

        recommendation =
          "Downgrade to ChatGPT Team";

        reason =
          "Enterprise plans are generally cost-effective only for larger organizations needing compliance and centralized governance.";
      }
    }

    /*
      CLAUDE LOGIC
    */

    if (name === "claude") {

      if (
        plan === "max" &&
        useCase === "writing"
      ) {

        recommendedSpend =
          pricingData.claude.pro *
          tool.seats;

        savings =
          tool.spend -
          recommendedSpend;

        recommendation =
          "Switch to Claude Pro";

        reason =
          "Claude Max pricing may be excessive for primarily writing-focused workflows with moderate usage.";
      }
    }

    /*
      COPILOT LOGIC
    */

    if (name === "copilot") {

     
      if (
        plan === "business" &&
        tool.seats === 1
      ) {

        recommendedSpend =
          pricingData.copilot.individual;

        savings =
          tool.spend -
          recommendedSpend;

        recommendation =
          "Switch to Copilot Individual";

        reason =
          "Business features are unlikely to provide significant value for a single-seat deployment.";
      }
    }

    /*
      CURSOR LOGIC
    */

    if (name === "cursor") {

      if (
        plan === "business" &&
        tool.seats <= 2
      ) {

        recommendedSpend =
          pricingData.cursor.pro *
          tool.seats;

        savings =
          tool.spend -
          recommendedSpend;

        recommendation =
          "Downgrade to Cursor Pro";

        reason =
          "Cursor Business pricing is typically optimized for larger engineering teams requiring centralized billing and management.";
      }
    }

      /*
  GEMINI LOGIC
*/

if (name === "gemini") {

  if (
    plan === "ultra" &&
    tool.seats <= 2
  ) {

    recommendedSpend =
      pricingData.gemini.pro * tool.seats;

    savings =
      tool.spend - recommendedSpend;

    recommendation =
      "Downgrade to Gemini Pro";

    reason =
      "Gemini Ultra pricing is generally more cost-effective for high-volume enterprise workflows rather than smaller teams.";
  }
}

/*
  OPENAI API LOGIC
*/

if (name === "openaiApi") {

  if (
    plan === "scale" &&
    teamSize <= 5
  ) {

    recommendedSpend =
      pricingData.openaiApi.growth;

    savings =
      tool.spend - recommendedSpend;

    recommendation =
      "Move to OpenAI Growth Tier";

    reason =
      "Scale-tier API commitments may be excessive for smaller engineering organizations with moderate inference workloads.";
  }
}

/*
  ANTHROPIC API LOGIC
*/

if (name === "anthropicApi") {

  if (
    plan === "scale" &&
    useCase === "writing"
  ) {

    recommendedSpend =
      pricingData.anthropicApi.growth;

    savings =
      tool.spend - recommendedSpend;

    recommendation =
      "Reduce to Anthropic Growth";

    reason =
      "Writing-focused workloads rarely justify large-scale API throughput commitments.";
  }
}

/*
  WINDSURF LOGIC
*/

if (tool.name === "windsurf") {

  if (
    tool.plan.toLowerCase() === "teams" &&
    tool.seats <= 2
  ) {

    recommendedSpend =
      pricingData.windsurf.pro * tool.seats;

    savings =
      tool.spend - recommendedSpend;

    recommendation =
      "Downgrade to Windsurf Pro";

    reason =
      "Teams pricing is generally optimized for larger collaborative engineering environments.";
  }
}
     /*
  CROSS-VENDOR OPTIMIZATION
*/

if (
  name === "cursor" &&
  useCase === "writing"
) {

  const cheaperAlternative =
    pricingData.chatgpt.plus;

  if (
    cheaperAlternative <
    tool.spend
  ) {

    recommendedSpend =
      cheaperAlternative;

    savings =
      tool.spend -
      cheaperAlternative;

    recommendation =
      "Switch to ChatGPT Plus";

    reason =
      "Cursor pricing is optimized for engineering workflows. Writing-focused users can often achieve similar outcomes using ChatGPT Plus at lower cost.";
  }
}

if (
  name === "claude" &&
  useCase === "coding"
) {

  const cheaperAlternative =
    pricingData.copilot.individual;

  if (
    cheaperAlternative <
    tool.spend
  ) {

    recommendedSpend =
      cheaperAlternative;

    savings =
      tool.spend -
      cheaperAlternative;

    recommendation =
      "Consider GitHub Copilot";

    reason =
      "For primarily coding-focused workflows, GitHub Copilot may provide similar productivity benefits at significantly lower cost.";
  }
}
    /*
      PREVENT NEGATIVE SAVINGS
    */

    if (savings < 0) {
      savings = 0;
    }

    totalMonthlySavings += savings;

    results.push({
      tool: tool.name,

      currentPlan: tool.plan,

      currentSpend: tool.spend,

      recommendation,

      recommendedSpend,

      savings,

      reason,
    });
  }

  return {
    results,

    totalMonthlySavings,

    totalAnnualSavings:
      totalMonthlySavings * 12,
  };
}