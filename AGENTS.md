# Burns Baptist Church site

## Run

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. HTML/CSS/JS only — no npm.

## Red lines

- **This church only:** Burns Baptist Church, **2308 Hwy 96, Burns, TN 37029**, Pastor Aaron “A.T.” Terlecki. YouTube only `@burnsbaptistchurch-burnstn1436`.
- **Not:** St John Lutheran (2300 Hwy 96), Burns Church of Christ, 548 Hillview as meeting address, Ron Melton / Net Ministries.
- Relative URLs only (GitHub project Pages). No custom domain / WP DNS changes here.
- No second PR for the same plan work. Transcripts stay in `docs/research/` — not on the public site.
- Real BBC photos only — no stock/AI congregation.

## Rules

- `docs/rules/stack.md` — no bundler; `.nojekyll`; `node --check js/site.js`
- `docs/rules/content.md` — church lock; no invented ministries/times
- `docs/rules/images.md` — source table in `img/README.md`
- `docs/rules/git-workflow.md` — commit format; push policy

<!-- ai-guardrails:begin -->
## AI guardrails

Installed by `setup-repo` from a Public-AI clone. Rules: `.claude/rules/`. Enforcing scripts: `scripts/clean-code/`.

### Installed

- Rules: `.claude/rules/` holds clean-code, ban-comments, small-mrs, docs-current-or-dated and research-latest-main.
- Analyzer, size gate and git-command scanner: `scripts/clean-code/`.
- Git hooks: pre-commit runs `check-clean-code.sh` (analyzer on staged lines), pre-push runs `pre-push-gate.sh` (branch size). Wired via none.
- Claude Code hooks in `.claude/settings.json`: PreToolUse(Bash) guard on push and MR create (size and clean code), PostToolUse docs lint and analyzer after edits, Stop analyzer.
- PostToolUse(Bash) `post-git-check.sh`: analyzer on each commit's lines, subject length, branch size, one-PR reminder after push, conflict files after merge or pull.
- Approval gate: `scripts/guard/git-approval-guard.sh` (PreToolUse on Bash).
- Privacy gate: `scripts/check-privacy.sh`; local patterns live in `<git-dir>/info/privacy-patterns` (`--strict` or `PRIVACY_REQUIRE_PATTERNS=1` blocks when missing).

### While editing

Write to `.claude/rules/` on every touched line. The checks above fail the edit, commit, push, or pipeline when a line misses. Also: no added comments, TODO, or empty catch; no parameter mutation; docs are current state or a dated snapshot. Thresholds below. Fix the finding. Never skip the check.

### Thresholds

| Check | Warn | Error |
|---|---|---|
| File size (only when a change grows the file) | 200 lines | 400 lines |
| Function length (`CC_FUNC_SIZE`, default `b`) | 20 lines of logic | 40 lines |
| Parameters | 3 | 4 |
| Nesting depth | 3 | 4 |
| Branch size | 400 changed lines | 800 changed lines; docs and repo-support files omitted |
| Commit subject | | 72 characters |

- Findings count only on lines the change touches
- Hard branch size omits documentation and repo-support files (AI setup, lint and guard scripts). The warning still counts them
- Function length profiles: `CC_FUNC_SIZE=a|b|c` or `.func-size` line `size: a|b|c` (`a` 40/80, `b` 20/40 default, `c` 50/100). `CC_FUNC_WARN` / `CC_FUNC_ERROR` override
- Tune: `CC_*`, `MR_SIZE_*`, `FILE_*` env vars. `scripts/clean-code/code-quality-check.sh -h` lists them
- Blocked commit or push → fix or split. Never bypass

### Guard limits

- Approval guard reads the command line only. Script, Makefile target, or package script running `git commit` or `git push` inside (`./push.sh`, `make push`, `npm run release`) is not analysed → passes unless the command line names the action
- Runtime-built text (base64, string concatenation, downloaded script) passes the same way. So do plain `rebase` and `pull`
- Gated as commit: `merge`, `cherry-pick`, `revert`, `am`, `rebase -x`, `commit-tree`, `update-ref`, `submodule foreach`. `send-pack` gated as push
- `gh pr merge|create`, `glab mr merge|create`, `gh|glab api` writes: ask
- Ask when the text names a commit or push and it is: piped into a shell, inline code in `python`, `perl`, `ruby`, `node`, `awk`, an unknown git subcommand (possible alias), or a runtime-built command word
- Any `core.hooksPath` write (`git -c`, `git config`, `GIT_CONFIG_*`, `--config-env`) and `--no-verify` on a gated command: denied

### Skills

Skills are symlinks `.claude/skills/<name>` (local, one `.git/info/exclude` entry per link) into a Public-AI clone at `$PUBLIC_AI_DIR`; set `core`. Relink: `"$PUBLIC_AI_DIR"/skills/setup-repo/scripts/link-skills.sh . --skills core`.

### Stack notes

No known stack: pick a linter that can cap nesting depth, parameter count and function length.

### Pipeline

No pipeline jobs installed: local and Claude hooks are the guardrails.

### Commit and ship

Default: commit every green change, push, open or update the MR/PR ([commit-and-ship](https://github.com/CodyTVWeber/Public-AI/blob/main/rules/commit-and-ship.md)).

- Low-risk repo (`.mr-size` `risk: low`): merge finished work the user asked for without extra approval
- Other repos: the repo's normal approval before merge

`scripts/guard/git-approval-guard.sh`: low-risk repo → allows commit, push, merge; denies force push. Elsewhere asks before commit and push. Always denies `--no-verify`, `core.hooksPath` overrides, `CLEAN_CODE_SKIP`, `SKIP`, `HUSKY=0`.
### Re-run

`"$PUBLIC_AI_DIR"/skills/setup-repo/scripts/bootstrap.sh . --profile standard --with approval-gate,privacy --without ci --hooks-via none --plan`, then `--apply`. Check with `"$PUBLIC_AI_DIR"/skills/setup-repo/scripts/verify-repo.sh .`. `--upgrade` re-applies files changed upstream and keeps locally modified ones. Differing files are kept unless `--force`.
<!-- ai-guardrails:end -->
