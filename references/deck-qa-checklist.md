# Deck QA Checklist

Run this after every page passes `qa-checklist.md`. This is a pass/fail inspection of the whole deck, not a taste score.

## Contact-Sheet Rules

Create or inspect thumbnails for the whole deck, then apply these mechanical rules:

- A 10-slide deck must use at least 4 macro layouts.
- A 14-18 slide deck must use at least 5 macro layouts.
- No 3 consecutive slides may use the same card/grid structure.
- Every major section must include at least 1 anchor slide with a clear visual center.
- Experiment/data sections cannot contain only tables or text cards; include at least 1 main result proof slide.
- Method sections must include at least 1 framework, mechanism, flow, pipeline, or module-relationship slide.
- If thumbnails look like a repeated template pack, remap some slides before polishing.
- If the deck lacks a big image, big flow, big result, or big summary, check whether an anchor slide is needed.

Count macro layouts by visible silhouette, not by exact template ID:

- **Cover / chapter / closing**: `T1`, `T3`, `T16`.
- **Agenda / navigation**: `T2`.
- **Single dominant proof object**: `T5`, `T9`, `T11`, `T12`, `T13`, `T14`, `T15`.
- **Split or side-by-side comparison**: `T5` with side rail, `T6`, controlled split variants.
- **Cards / grid / table**: `T4`, `T7`, `T8`, `T10`.

## Pass/Fail Deck Checks

- Does each slide answer only one main question?
- Does each content slide have a clear main proof object?
- Are there any 3-slide runs with the same card/grid structure?
- Are any titles empty, generic, or interchangeable with another deck?
- Does any slide repeat the previous slide's information without adding a new role?
- Do result slides include a takeaway, highlight, or implication?
- Do method slides explain information flow, component relationships, or causal chain rather than just naming parts?
- Does the summary reconnect the problem, method, evidence, and meaning?
- Do all slides still satisfy the readable-font floor from `SKILL.md` and `qa-checklist.md`?
- If a strong model used custom layout, is it still pptxgenjs-generated, reproducible, maintainable, and rendered cleanly?

## Failure Handling

- If any deck check fails, update the slide contract first.
- Then edit the generation script, regenerate the PPTX, rerender PNGs, rerun page-level visual QA, and rerun this deck QA.
- Use `troubleshooting.md` for fixed repair recipes instead of subjective redesign debates.
