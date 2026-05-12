# Testing Strategy

The audit engine is tested using Vitest.

## Covered Scenarios

1. ChatGPT Team downgrade recommendations for small teams
2. Claude Max optimization for writing-focused workflows
3. Cursor-to-ChatGPT alternative recommendations
4. Gemini Ultra downgrade recommendations
5. Prevention of negative savings calculations

## Test Framework

- Vitest
- TypeScript

## CI/CD

Tests run automatically using GitHub Actions on every push and pull request to the `main` branch.

## Running Tests Locally

```bash
npm test -- --run
```

## Example Test Coverage

The following logic paths are validated:

- same-vendor downgrades
- cross-vendor recommendations
- pricing optimization
- no negative savings edge cases
- use-case-based recommendations
