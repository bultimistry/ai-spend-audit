# Architecture Decisions

## Frontend

Next.js App Router was selected for:
- server rendering
- route-based metadata
- API routes
- deployment simplicity

## Styling

Tailwind CSS was used for:
- rapid iteration
- responsive design
- consistent spacing and theming

## State Management

Zustand persistence middleware stores audit forms locally to satisfy persistence requirements.

## Backend

Supabase stores audit leads and report data.

## AI Layer

Anthropic API generates personalized summaries while deterministic business rules handle financial calculations.
