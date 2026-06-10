# AGENTS.md - node-astronomy

Guide for AI agents working in this repository. Pair with `CLAUDE.md` (the working agreement and
hook-enforced rules). Keep this file current when the build, layout, or public API changes.

## What this is

An NPM package that can give you astronomy information about various cosmic and natural objects in our solar system.

<!-- Fill in: what the project does, what it ships (library, service, action, CLI), and the one or
two things an agent must understand before changing it. -->

## Using node-astronomy

<!-- If this project is consumed by others (a library/plugin/action), describe the contract a
consumer must respect: the single entry point, the public surface, required options, and anything
that must not be bypassed. Delete this section for a leaf application. -->

## Layout

<!-- The directories that matter and what lives in each. Keep it short; point at the entry points. -->

- `src/` - <what>
- `<tests dir>/` - <what>

## Build, test, lint

<!-- The exact commands. Pull these from package.json scripts (npm), the Taskfile (Go/Task), or
pyproject (Python) so they stay accurate. -->

- Build: `<command>`
- Test: `<command>` (note any service/fixture the integration tests require)
- Lint: `<command>`
- License headers / docs: `<command>`

## Conventions and gotchas

- See `CLAUDE.md` for the branch/commit/PR rules; they are enforced by the git hooks in
  `.claude/hooks` (run `bash .claude/hooks/install.sh` once per clone).
- <project-specific conventions, non-obvious constraints, and traps an agent should know>
