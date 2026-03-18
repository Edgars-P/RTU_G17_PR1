Project snapshot

- Language & toolchain: TypeScript (ESM) + Vite. Dev tooling expects `pnpm` (see README).
- Entry: `src/main.ts` — constructs a `GameManager` and selects an AI implementation.

Architecture & responsibilities

- `src/game/board.ts` (`GameManager`)
  - Holds the mutable game state: `board[]`, `points`, `bank`, `turn`, `boardLength`, `aiFirst`.
  - Core APIs used by AI and UI: `replace(index)`, `remove(index)`, `tick()`, `clone()`, `isEnd()`.
  - Note: constructor randomizes the initial `board` (useful for real runs; AI simulations should use `clone()`).

- `src/game/ai.ts` (interface/base)
  - Exposes `Ai` with `evaluate(manager: GameManager): { index: number }`.
  - Concrete AIs live in `ai_minmax.ts` and `ai_alphabeta.ts` (both currently skeletons).

Key patterns & conventions for agents

- AI must return a single move as `{ index }` where `index` refers to the left element of a pair to replace.
- The `GameManager` advances `turn` inside `replace()` and `tick()`; do not rely on external turn mutation.
- For lookahead/search, call `manager.clone()` to create an isolated copy for simulation — do not mutate the passed-in manager instance.
- `aiFirst` controls which parity of `turn` the AI executes on. The `tick()` helper will call `ai.evaluate(this)` when it's AI's turn.
- `boardLength` and initial board size are configured in `src/main.ts` (`boardLength = 20` in example).

Build / run / debug

- Install & dev server (from README):

  pnpm install
  pnpm run dev

- Build: `pnpm run build` (runs `tsc` then `vite build`). Preview via `pnpm run preview`.
- Editor: TypeScript typings are used; prefer an editor with TypeScript 5.x support.

Files to reference when implementing or debugging AI

- [src/main.ts](src/main.ts) — shows how `GameManager` and `Ai` are wired.
- [src/game/board.ts](src/game/board.ts) — game rules, end-state logic, and cloning semantics.
- [src/game/ai.ts](src/game/ai.ts) — AI API shape and expected return value.
- [src/game/ai_minmax.ts](src/game/ai_minmax.ts) and [src/game/ai_alphabeta.ts](src/game/ai_alphabeta.ts) — algorithm entry points to implement.

Practical examples

- Implementing a search node: call `const sim = manager.clone()` then modify `sim` with `replace()`/`remove()` and evaluate `sim.isEnd()` / `sim.points` / `sim.bank` for heuristics.
- Example wiring: `const manager = new GameManager(length, aiFirst, new AiAlphaBeta())` (see `src/main.ts`).

Do not assume

- The initial board is deterministic — it is randomized in the constructor. Tests or deterministic replay should explicitly set `board` on a `GameManager` instance.
- Any UI code exists — UI is TODO in `src/main.ts`; most work targets headless game logic and AI.

What I merged / replaced

- No prior `.github/copilot-instructions.md` present; instructions are distilled from `README.md`, `package.json`, and `src/game/*`.

If anything is unclear or you'd like more examples (unit-test harness, typical heuristic function, or a small simulation runner), tell me which you prefer and I will add it.
