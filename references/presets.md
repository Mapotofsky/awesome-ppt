# Scenario Presets

Pick exactly one preset before writing the slide contract. Presets are guardrails, not a router: use the closest preset, apply user overrides, and keep the rest of the workflow unchanged.

## `academic-oral`

- **Use for**: conference talks, seminar talks, invited academic reports.
- **Recommended theme**: `academic-red`; use `tech-cyan` for AI/ML or engineering-heavy venues when the user prefers a modern technical look.
- **Recommended length**: 10-14 slides.
- **Default sequence**: `T1 -> T2 -> T4 -> T6 -> T11 -> T5/T9 -> T9/T13 -> T15 -> T16`.
- **Must include**: one method/proposed approach slide (`T11` or a controlled T11-based variant), one main result proof slide (`T5`, `T9`, or `T13`), one contribution/summary slide (`T15`).
- **Common failures**: too many background slides, result tables without takeaway, method slide as component list rather than information flow.
- **Claim-style title**: allowed but not mandatory; topic titles are acceptable if specific.
- **Section navigation**: yes by default when the deck has 10+ slides.

## `academic-defense`

- **Use for**: thesis defense, dissertation defense, graduation defense, paper defense.
- **Recommended theme**: `academic-red`.
- **Recommended length**: 18-28 slides.
- **Default sequence**: `T1 -> T2 -> T3 Intro -> T4/T6 -> T3 Related Work -> T6/T7 -> T3 Method -> T11 -> T5/T6 -> T3 Experiments -> T10/T9/T13 -> T3 Conclusion -> T15 -> T16`.
- **Must include**: TOC (`T2`), section breaks (`T3`), method mechanism or pipeline (`T11`), experiment/result proof (`T9`, `T10`, `T13`, or `T5`), final summary (`T15`), Q&A (`T16`).
- **Common failures**: over-commercial tone, missing academic navigation, experiment pages as dense raw tables, tiny fonts from trying to cover the whole thesis in one slide.
- **Claim-style title**: optional; academic topic titles are fine but should be concrete.
- **Section navigation**: yes.

## `business-report`

- **Use for**: internal updates, operating reviews, business analysis, board-style readouts, consulting-style reports.
- **Recommended theme**: `business-navy`.
- **Recommended length**: 8-14 slides.
- **Default sequence**: `T1 -> T2 -> T4 -> T6 -> T9/T13 -> T11/T12 -> T7/T8 -> T15 -> T16`.
- **Must include**: problem/context (`T4` or `T6`), evidence/result slide (`T9` or `T13`), implication or next-step slide (`T11`, `T12`, or `T15`).
- **Common failures**: vague status titles, KPI cards without interpretation, repeated 3-card pages, no clear recommendation.
- **Claim-style title**: yes by default.
- **Section navigation**: no by default; enable for decks over 12 slides or formal recurring reviews.

## `training-courseware`

- **Use for**: training, class lectures, workshop material, courseware, onboarding.
- **Recommended theme**: `warm-amber`.
- **Recommended length**: 12-24 slides.
- **Default sequence**: `T1 -> T2 -> T4 -> T7 -> T11 -> T8 -> T14 -> T15`, repeated by module as needed, ending with `T16`.
- **Must include**: learning objective/concept (`T4`), structured concept or practice frame (`T7` or `T8`), process/exercise flow (`T11`), module recap (`T15`).
- **Common failures**: all-text lecture slides, no recap, no exercise flow, decorative examples that do not support the learning objective.
- **Claim-style title**: no by default; use action/topic titles such as "Apply the scoring rubric".
- **Section navigation**: yes for multi-module decks.

## `quick-routine`

- **Use for**: ordinary quick PPTs, short briefings, lightweight summaries when no specialized scenario is supplied.
- **Recommended theme**: `business-navy`.
- **Recommended length**: 6-10 slides.
- **Default sequence**: `T1 -> T2 optional -> T4/T6 -> T7/T9/T13 -> T15 -> T16`.
- **Must include**: cover (`T1`), at least one evidence/proof slide (`T5`, `T9`, `T11`, or `T13`) unless the user only asked for a simple agenda, summary (`T15`) or closing (`T16`).
- **Common failures**: generic filler pages, repeated cards, summary that merely restates slide titles.
- **Claim-style title**: optional; use claim titles for reports and topic titles for neutral explainers.
- **Section navigation**: no by default.

## Preset Rules

- If the user gives a fixed slide count, honor it and adjust the sequence without dropping required page types.
- If the preset and user theme conflict, user theme wins, but keep the preset's page rhythm.
- If no scenario is clear, use `quick-routine`.
- Do not invent additional presets unless the user explicitly asks to extend the skill.
