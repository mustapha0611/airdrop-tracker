# Airdrop Tracker

A lightweight Vue 3 + Vite app for tracking crypto airdrops. It uses Pinia for state management and Supabase for auth and storage.

**Features**
- Add, edit, delete airdrops (per-user)
- Status and tag filtering
- Supabase authentication integration

**Tech stack**
- Vue 3 + Vite
- TypeScript
- Pinia (state)
- Supabase (backend)
- Tailwind CSS

**Prerequisites**
- Node.js (16+ recommended)
- npm or yarn
- A Supabase project (for database + auth)

## Local setup

1. Install dependencies

```sh
npm install
```

2. Add environment variables (create a `.env` or `.env.local` in project root):

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Run the dev server

```sh
npm run dev
```

4. Build for production

```sh
npm run build
```

## Supabase notes
- The client is initialized in [src/lib/supabase.ts](src/lib/supabase.ts).
- The app intentionally avoids returning inserted rows from INSERT requests (free tier limitation). After inserting an item the store refreshes data with `fetchAirdrops()` in [src/stores/airdropStore.ts](src/stores/airdropStore.ts).

## Key files
- `src/lib/supabase.ts` — Supabase client init
- `src/stores/airdropStore.ts` — Pinia store for airdrops
- `src/components/addAirdropForm.vue` — form used to add airdrops
- `src/views/dashboard.vue` — main app view listing airdrops

## Notes and troubleshooting
- If you see a Supabase error like `PRO FEATURE ONLY` when inserting with `.select()` on insert, remove `.select()` and refetch (this project already follows that pattern).

## Contributing
- Fork, create a branch, and open a PR. Keep changes focused and run the app locally to verify.

## License
- MIT
