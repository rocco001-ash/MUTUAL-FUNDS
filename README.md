# Mutual Funds

A sample mutual funds dashboard built with Next.js for Cloud Agent development.

## Development

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript without emitting files |

## API

- `GET /api/funds` — list all funds
- `GET /api/funds/:id` — fetch one fund
- `POST /api/funds/:id` — simulate a NAV refresh for all funds
