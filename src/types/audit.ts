export type ToolInput = {
  name: string;
  plan: string;
  spend: number;
  seats: number;
};

export type AuditResult = {
  tool: string;
  currentPlan: string;
  currentSpend: number;

  recommendation: string;

  recommendedSpend: number;

  savings: number;

  reason: string;
};