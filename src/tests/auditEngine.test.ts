import { describe, it, expect } from "vitest";

import { runAudit } from "../lib/auditEngine"

describe(
  "Audit Engine",
  () => {

    /*
      CHATGPT DOWNGRADE
    */

    it(
      "should downgrade ChatGPT Team for small teams",
      () => {

        const result =
          runAudit(
            [
              {
                name: "chatgpt",

                plan: "team",

                spend: 60,

                seats: 2,
              },
            ],
            2,
            "coding"
          );

        expect(
          result.totalMonthlySavings
        ).toBeGreaterThan(0);
      }
    );

    /*
      CLAUDE WRITING
    */

    it(
      "should downgrade Claude Max for writing workflows",
      () => {

        const result =
          runAudit(
            [
              {
                name: "claude",

                plan: "max",

                spend: 100,

                seats: 1,
              },
            ],
            1,
            "writing"
          );

        expect(
          result.results[0]
            .recommendation
        ).toContain(
          "Claude Pro"
        );
      }
    );

    /*
      CURSOR WRITING
    */

    it(
      "should recommend ChatGPT for writing-focused Cursor usage",
      () => {

        const result =
          runAudit(
            [
              {
                name: "cursor",

                plan: "business",

                spend: 40,

                seats: 1,
              },
            ],
            1,
            "writing"
          );

        expect(
          result.results[0]
            .recommendation
        ).toContain(
          "ChatGPT"
        );
      }
    );

    /*
      GEMINI DOWNGRADE
    */

    it(
      "should downgrade Gemini Ultra for small teams",
      () => {

        const result =
          runAudit(
            [
              {
                name: "gemini",

                plan: "ultra",

                spend: 50,

                seats: 1,
              },
            ],
            1,
            "research"
          );

        expect(
          result.totalMonthlySavings
        ).toBeGreaterThan(0);
      }
    );

    /*
      NO NEGATIVE SAVINGS
    */

    it(
      "should never return negative savings",
      () => {

        const result =
          runAudit(
            [
              {
                name: "copilot",

                plan: "individual",

                spend: 10,

                seats: 1,
              },
            ],
            1,
            "coding"
          );

        expect(
          result.totalMonthlySavings
        ).toBeGreaterThanOrEqual(
          0
        );
      }
    );
  }
);