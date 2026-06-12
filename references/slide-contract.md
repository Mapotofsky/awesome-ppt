# Slide Contract

Fill this table before writing pptxgenjs code. The contract turns planning into a checklist: weak agents can follow it, and strong agents can justify limited upgrades without abandoning the fixed workflow.

| Slide | Role | Claim-or-Topic | Proof Object | Template | Source | Notes |
|---|---|---|---|---|---|---|
| 1 | Cover | Deck title | transition/cover | T1 | user brief | audience, date |

## Field Meanings

- **Slide**: slide number in final order.
- **Role**: the job this slide performs in the deck, such as context, method, result, comparison, summary, transition, or Q&A.
- **Claim-or-Topic**: the question answered or message expressed by the slide.
- **Proof Object**: the main visual evidence object, such as method diagram, flow, comparison table, result chart, KPI, timeline, screenshot, or summary matrix.
- **Template**: choose a base template from `T1`-`T16`. If upgrading, write `T# + local variant`, not "custom blank".
- **Source**: where the content comes from: user document, paper section, data table, generated outline, assumption, or derived calculation.
- **Notes**: trimming decisions, split-page warnings, speaker-note hints, or risks.

## Pass/Fail Rules

- Every slide must have exactly one primary role.
- Every content slide must answer one main question or express one main message.
- Business/report slides should use claim-style titles by default, for example "Conversion dropped because repeat visitors fell".
- Academic slides may use topic titles, but they must be specific, for example "Ablation shows graph encoding drives the gain".
- Each content slide gets at most one main proof object. Supporting labels and callouts are allowed only if they point back to that object.
- Cover, TOC, section break, summary, and thanks slides may use `transition/overview/closing` as the proof object, but Notes must say why a normal proof object is not required.
- If a slide has no proof object and is not a transition/overview/closing slide, it fails planning.
- If a slide needs more than one proof object, split it instead of shrinking fonts or stacking unrelated visuals.
- Template must be one of `T1`-`T16` or `T# + local variant`.
- Source cannot be blank. Use `assumption` only when the user did not provide material and the deck is explicitly being drafted from scratch.

## Controlled Upgrade Rules

Use a controlled upgrade only when the default template cannot express the slide's proof object clearly. Write the reason in Notes before generating code.

Allowed upgrades:

- Combine light components from `T1`-`T16` while keeping one base template.
- Convert vague topic titles into specific claim-style titles.
- Add a proof object, takeaway bar, side rail, or callout stack to a key slide.
- Change the rhythm of repeated template pages by swapping one slide to `T5`, `T9`, `T11`, `T12`, `T13`, `T14`, or `T15`.
- Keep academic navigation while making each slide conclusion clearer.
- Extend the active theme with a small number of semantic colors or component styles inside `C`.
- Create a local layout for a complex method diagram, experimental result, or business metric page.

Required conditions:

- Do not start from a blank unrestricted design.
- Do not skip the slide contract.
- Do not skip visual QA.
- Do not skip deck QA.
- Do not break the pptxgenjs script path or make the slide unreproducible.
- Do not trade readability, stability, or maintainability for "premium" styling.

Rollback rule: if the upgraded slide fails visual QA twice or deck QA once, keep the content and return to the nearest `T1`-`T16` base template.
