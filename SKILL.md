---
name: awesome-ppt
description: Create polished, editable, reproducible .pptx decks programmatically with the user's established pptxgenjs workflow. Use for fast from-scratch decks, especially Chinese academic defenses, business/internal reports, training decks, courseware, talks, and routine slide generation when the user says "做PPT", "PPT", "幻灯片", "答辩", "汇报", "演讲稿", "课件", or explicitly asks for awesome-ppt/pptxgenjs. This skill is a lower-bound stabilizer with fixed presets, themes, T1-T16 templates, slide contracts, and visual/deck QA so weaker agents can produce solid decks while stronger agents can make controlled upgrades. For complex template-following, editing an existing PPTX while preserving its visual system, reference-deck beating, investor/board/IR/product-strategy narratives, or artifact-tool-native Codex delivery, prefer Codex Presentations instead.
---

# Awesome PPT Generator

Build production-quality `.pptx` decks for ANY scenario by composing **themes** + **page templates** + **a foolproof QA loop**.

## Positioning

`awesome-ppt` is a **lower-bound stabilizer**, not an unrestricted creative design system. Its first job is to let a weaker or rushed AI produce a good, editable PowerPoint by following fixed presets, fixed themes, fixed templates, and fixed QA.

Low freedom is intentional. Fixed themes, T1-T16 templates, slide contracts, and rendering QA prevent common model failures: random colors, cramped text, generic bullets, inconsistent navigation, and unverified overflow.

Strong agents may make controlled upgrades only when the default template is insufficient for the content. Every upgrade must stay inside pptxgenjs, keep a reproducible script, pass visual QA and deck QA, and remain checkable and repairable.

## What This Skill Guarantees

- Visually polished slides (semantic colors, consistent typography, proper shadows)
- Zero overflow / clipping (content always fits within safe area)
- Reusable across academic, business, technical, training, and creative contexts
- Idempotent regeneration (one script per section, edit + rerun freely)
- A concrete planning contract before code, so each slide has one role, one message, and one proof object

## The 5-Step Pipeline (Always Follow This Order)

| # | Step | What you do | Reference |
|---|------|-------------|-----------|
| 1 | **Clarify** | Ask the user the 4 framing questions below if unclear | this file |
| 2 | **Choose theme** | Pick or compose a color theme | `references/themes.md` |
| 3 | **Plan pages** | Choose a preset, fill the slide contract, then map content to page templates | `references/presets.md` + `references/slide-contract.md` + `references/page-templates.md` |
| 4 | **Generate** | Copy `assets/boilerplate.js`, fill in slides, run | `references/pipeline.md` |
| 5 | **QA** | Convert PPTX→PDF→PNG, inspect every page, then run deck-level pass/fail QA | `references/qa-checklist.md` + `references/deck-qa-checklist.md` + `references/troubleshooting.md` |

> **Never skip Step 5.** Code that "looks right" routinely produces hidden overflow bugs. The user expects you to verify, not hope.

## Step 1: Framing Questions (ask before generating)

If the user's request is vague, ask **at most these 4** and proceed:

1. **Scenario / preset**: Academic oral / academic defense / business report / training courseware / quick routine / other?
2. **Audience & length**: Who watches it, and roughly how many slides total?
3. **Theme preference**: Academic Red / Business Navy / Tech Cyan / Warm Amber / Minimal Mono — or a brand color (give hex)?
4. **Source material**: Do they have a paper / doc / outline / slide draft to convert? Where is it?

Skip questions whose answers are obvious from context. **Do not interrogate** — one focused message is enough. If the user just says "make me a deck", pick sensible defaults (Business Navy, 10 slides, generic outline) and explicitly state your assumptions before generating.

## Step 2: Choose a Theme

Read `references/themes.md` and select one of the **5 prebuilt themes**:

| Theme | Best for | Palette identity |
|-------|----------|------------------|
| `academic-red` | Thesis defenses, journal talks, university events | academic red + dark gold + charcoal |
| `business-navy` | Corporate decks, investor pitches, board meetings | Deep navy + brass accent + warm gray |
| `tech-cyan` | AI/ML/SaaS, dev conferences, technical demos | Indigo + cyan accent + space-gray |
| `warm-amber` | Training, education, internal kickoffs | Burnt orange + cream + slate |
| `minimal-mono` | Editorial, design portfolio, art talks | Black + warm white + single accent |

If the user provides a brand color, use the **theme composer** procedure at the bottom of `themes.md` instead.

If `references/presets.md` recommends a theme and the user gave no preference, use the preset's recommendation. User-supplied brand colors or explicit theme choices override the preset.

## Step 3: Plan Pages

First read `references/presets.md` and pick the closest preset. Then fill the slide contract from `references/slide-contract.md`. Do **not** write pptxgenjs code until the contract passes its rules.

The contract forces every slide to have:

- one role in the story,
- one claim or topic,
- one main proof object,
- one base template from T1-T16,
- one source.

Read `references/page-templates.md` after the contract has a first draft. Pick from these **16 page archetypes**:

```
T1  Cover                 T9   Chart / Data
T2  Table of contents     T10  Table
T3  Section break         T11  Flow / pipeline
T4  Concept definition    T12  Timeline
T5  Hero image            T13  KPI / metrics
T6  Two-column compare    T14  Quote / callout
T7  Three-card row        T15  Summary
T8  2x2 matrix            T16  Thanks / Q&A
```

A typical 10-slide business deck looks like:
`T1 Cover → T2 TOC → T4 Problem → T6 Compare (status quo vs ours) → T11 Flow (solution arch) → T9 Chart (impact) → T13 KPIs → T7 Cases → T15 Summary → T16 Thanks`

A typical 25-slide academic defense looks like:
`T1 → T2 → T3 (intro) → T4 → T5 → T3 (related work) → T6 → T7 → T3 (method) → T11 → T6 ×2 → T3 (experiments) → T10 → T9 → T13 → T3 (conclusion) → T15 → T16`

If the default template cannot express a method, result, or KPI proof object clearly, use the controlled-upgrade rules in `references/slide-contract.md`. The base template must still be visible in the plan, for example `T9 + takeaway side rail`, not "custom slide".

## Step 4: Generate

1. Copy `assets/boilerplate.js` into the user's working directory (or alongside their content). Rename per section if the deck spans multiple files.
2. Replace the marked `// >>> TODO` blocks with actual slide content. Each template in `page-templates.md` is a drop-in code block — paste, parametrize, done.
3. Run `node <script>.js`. Read `references/pipeline.md` for environment setup (NODE_PATH, global pptxgenjs, etc.).

**Multi-section rule**: Long decks (≥15 slides) should be split into one `gen_<section>.js` per logical section. Each script is **fully self-contained** (full theme palette, full helpers). This is intentional — duplication beats import hell, and each section can be regenerated independently when content changes.

## Step 5: Visual QA (NON-NEGOTIABLE)

Always run the QA pipeline and **read each rendered PNG** before declaring done:

```powershell
# Windows (PowerShell). For macOS / Linux see references/pipeline.md
Get-Process POWERPNT -ErrorAction SilentlyContinue | Stop-Process -Force
$ppt = New-Object -ComObject PowerPoint.Application
$p = $ppt.Presentations.Open("$PWD\out.pptx", $false, $true, $false)
$p.SaveAs("$PWD\preview\preview.pdf", 32)
$p.Close(); $ppt.Quit()
pdftoppm -png -r 130 preview\preview.pdf preview\page
```

Then for each `preview\page-N.png`, run through the **mandatory 7-point checklist** in `references/qa-checklist.md`. If anything fails, consult `references/troubleshooting.md` for the fix recipe and regenerate.

After all pages pass visual QA, run the deck-level pass/fail checklist in `references/deck-qa-checklist.md`. This catches repeated layouts, missing proof slides, weak titles, and uncontrolled custom layouts.

## The Golden Rules (Defaults That Prevent 90% of Bugs)

These rules apply universally regardless of theme or template. Violating them produces broken slides.

1. **Canvas is `13.333" × 7.5"`** (`LAYOUT_WIDE`). Never use a different layout.
2. **Safe content area is `y=1.85` to `y=7.1`** — total **5.25"** vertical budget. Sum of all card heights + gaps must be ≤ 5.25.
3. **Every slide has 3 fixed regions**: nav bar (`y=0–0.5`), title area (`y=0.78–1.7`), footer (`y=7.1–7.5`). Use the helpers `addNav`, `addTitle`, `addFooter` from the boilerplate — do not redraw them.
4. **All colors come from the active theme's `C` object**. Define deck-level color semantics before generation and use them consistently; never inline hex strings in slide code.
5. **Generated text defaults to ≥12pt**: body text, captions, footers, tables, chart labels, legends, card text, and value labels. Use 10–11pt only as a recorded QA exception after trimming, enlarging, reflowing, or splitting cannot solve the layout.
6. **Chinese fonts use `Microsoft YaHei`, English uses `Calibri`**. Mixing is fine within one text run via `fontFace` per option.
7. **All white cards use `makeShadow()` for depth**. Colored bars (titles, headers) do NOT get shadows.
8. **Numbered circles are 0.42–0.45" diameter**. Smaller looks weak; larger steals visual weight from titles.
9. **Image embedding always uses `sizing: { type: "contain", w, h }`**. The `contain` mode prevents distortion.
10. **Right-aligned labels need ≥0.4" right margin**. Without it, text gets clipped at projector edges.
11. **Slide contract comes before code**. If a slide has no role, message, proof object, template, or source, it is not ready to generate.
12. **Controlled upgrades are local, not blank-canvas redesigns**. Start from T1-T16, keep theme colors and helpers, render-check the result, and roll back if it fails QA.

## Anti-Patterns (Things That Look Reasonable But Fail)

| ❌ Don't | ✅ Do | Why |
|----------|-------|-----|
| Dump bullet lists onto a slide | Restructure into cards / matrix / flow | Bullets read as "lazy AI output", not professional |
| Use 5+ colors on one page | Stick to 2 main + 1 accent from the theme | Color noise destroys hierarchy |
| Auto-fit text with `fit: "shrink"` or smaller fonts | Cut content, enlarge/reflow, or split; record any 10–11pt exception | Tiny text fails the 12pt generated-text rule |
| Hand-write hex codes inline | Reference `C.navy` / `C.gold` etc. | Inconsistency = unprofessional |
| Skip QA "because the code looks right" | Always render PNGs and inspect | Overflow bugs are invisible in source |
| Use stock-photo placeholders | Use the user's actual figures, or skip | Stock photos look generic |
| Translate every Chinese title to English in subtitle | Use English subtitles only when they add info | Redundant subtitles look amateur |

## Quick Reference Index

When you need to know... → Read this file:

- Color palettes, theme tables, brand-color composer → `references/themes.md`
- Scenario presets and default page sequences → `references/presets.md`
- Slide contract fields, pass/fail rules, controlled upgrades → `references/slide-contract.md`
- Visual sketches + drop-in code for each of 16 page templates → `references/page-templates.md`
- Full setup commands (NODE_PATH, npm install, OS-specific PDF conversion) → `references/pipeline.md`
- The 7-point QA inspection checklist → `references/qa-checklist.md`
- Whole-deck contact-sheet rules and pass/fail deck QA → `references/deck-qa-checklist.md`
- Common bugs and copy-paste fixes → `references/troubleshooting.md`
- Starter script with all helpers wired up → `assets/boilerplate.js`
- Worked example (one minimal complete deck) → `assets/example_minimal.js`

## Final Reminder

A great deck is a **decision tree**, not a brain dump. Every slide should answer one question and lead naturally to the next. If you find yourself cramming 6 ideas onto one slide, split it. If you find a slide saying nothing the previous slide didn't, cut it. The user's audience has 60 seconds of attention per slide — make it count.
