# Prompt for Ravi — paste this into Claude Code (VS Code) in the proarc-website repo

Before pasting:

1. Put the two files you received into the repo's `docs/` folder (if not already there):
   - `docs/ProArc-Typography-Guideline-v1.2.md`
   - `docs/ProArc-Work-Order-R1-FINAL.md`
2. Open a terminal in the **repository root** (the folder containing `CLAUDE.md`) and start a **fresh Claude Code session** there — don't reuse an old conversation. Starting at the root matters: Claude Code auto-loads the project's `CLAUDE.md` rules only from there, and a stale session may carry assumptions from earlier work.

Then paste this prompt:

---

I'm working on the ProArc website in this repository, on the `proarc-premium` branch. We've had an external design and setup review, and the resulting work order is at `docs/ProArc-Work-Order-R1-FINAL.md`, written against the locked spec at `docs/ProArc-Typography-Guideline-v1.2.md`.

Read the work order in full before touching anything, and then execute it exactly as it instructs. The non-negotiables from it:

1. Confirm you are on `proarc-premium` with a clean tree, then create the branch `design-review-r1` and work there.
2. The root HTML files and everything in `projects/` are build outputs — never hand-edit them. Edit `pages-src/`, `partials/`, `src/styles/`, `data/` only, and rebuild with the build scripts as the work order describes. If a rebuild fails on `images/manifest.json`, stop and tell me instead of regenerating with empty data.
3. Every task is CHECK → CHANGE → VERIFY. Run the CHECK first; if the code doesn't match what the work order describes, stop and report the difference instead of proceeding.
4. Work one phase at a time, in order (Phase 0, S, 1, 2, 3, 4, 5, 6). At the end of each phase, stop, report what changed and what you found, and wait for my go-ahead before the next phase.
5. `CLAUDE.md` is append-only. Copy CSS token blocks from the work order verbatim — and respect its Phase 2 warning about the `--space-*` naming collisions; do not redefine existing tokens.
6. Anything the work order says to "propose and ask" (copy rewrites, deleting clients from the logo grid, the services-grid layout choice, the years wording, the branch decision) — propose it and wait; don't apply it.
7. Run `npx stylelint "src/**/*.css"` after every phase; it must stay clean. Commit at the end of each approved phase with a message naming the phase, e.g. `R1 Phase 1: accessibility fixes`. Do not push until I say so.

Start now with Phase 0 and give me its report, including the "Questions to raise" list at the end of the work order.

---
