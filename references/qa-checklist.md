# QA Checklist (Mandatory 7-Point Inspection)

For **every rendered `preview/page-N.png`**, walk through these 7 checks. If any item fails, fix per `troubleshooting.md` and re-render. **Do not declare the deck done until every page passes all 7.**

## ☐ Check 1 · Content stays in safe zone

- All text, cards, images visually fit between `y=1.85` and `y=7.1`.
- Nothing is hidden behind the footer (which sits at `y=7.1–7.5`).
- Bottom of bottommost element + 0.1 buffer ≤ 7.1.

**How to verify**: scan the lower 15% of the slide. If you see a text label or card overlapping the footer ribbon, this fails.

## ☐ Check 2 · No clipped or overflowing text

- All text labels are fully visible — no truncation at right/bottom edges.
- Right-aligned labels have ≥ 0.4" right margin.
- Multi-line text in cards doesn't spill below the card boundary.

**How to verify**: read every label end-to-end on the rendered PNG. If you see text cut off (e.g., "first author · CCF-C class confer…"), this fails. Common offenders: long Chinese labels in narrow cards.

## ☐ Check 3 · Navigation bar reflects current section

- Nav bar shows the deck's section names.
- The currently active section is highlighted in `accentLight` color with bold weight and a 0.04" underline.
- Inactive sections are in `ice` (white) regular weight.

**How to verify**: confirm the NAV_ACTIVE index passed to `addNav` matches the section the slide belongs to. For TOC and Section Break slides, NAV_ACTIVE should be the upcoming section's index, not -1.

## ☐ Check 4 · Footer shows correct page number and section

- Left side: `Author · Affiliation · Context` (consistent across all pages).
- Right side: `Section Name · pageNum / totalPages` (or `—` for cover/TOC/thanks).
- Page numbers are 1-indexed within each section's own scope.

**How to verify**: check that `pageNum` and `TOTAL_PAGES` constants in the script match the actual slide count.

## ☐ Check 5 · Theme colors used consistently

- No surprise hex codes — every color comes from the active theme's `C` object.
- Primary color appears on: nav bar, "our work" titles, KPI emphasis.
- Accent color appears on: title left-bar, formula boxes, highlights on dark backgrounds.
- Contrast color appears only on: "problem"/"before" titles, never on positive content.
- Body text is `text` (near-black), captions are `muted` (gray).

**How to verify**: scan the slide for any color that "feels off" — a stray bright blue on an academic-red deck, a warm tan on a tech-cyan deck. If you see one, hunt down the inline hex and replace with `C.accent` etc.

## ☐ Check 6 · Images are crisp and properly sized

- Embedded figures are not pixelated or stretched.
- Aspect ratio is preserved (use `sizing: { type: "contain", w, h }`).
- Image fills its container with reasonable padding (0.15–0.2" from card edge).
- Diagrams/text within images is large enough to read at projector distance.

**How to verify**: zoom into the rendered PNG at 100%. If the embedded image is blurry, regenerate the source PNG at higher DPI (`pdftoppm -r 250` or higher).

## ☐ Check 7 · Visual hierarchy is clean

- One slide answers one question.
- Clear focal point: where does the eye land first?
- Whitespace breathes — no card is pressed against another.
- Card gaps are 0.2–0.3", section gaps are 0.12–0.15".
- Shadows appear only on white cards, not on colored bars.
- Numbered circles are 0.42–0.45" in diameter.

**How to verify**: squint at the rendered PNG. If it looks like a wall of equally-weighted elements, the hierarchy is broken — promote one element (larger / bolder / colored) and demote others.

## Per-Template Spot-Checks

After the 7 universal checks, run template-specific checks based on the slide type:

### Cover (T1)

- ☐ Title is centered horizontally and vertically in upper-mid region.
- ☐ Author block is well below the title with comfortable whitespace.
- ☐ Decorative top/bottom bars are present (not skipped).

### TOC (T2)

- ☐ Numbers are aligned in a consistent column.
- ☐ Section titles align in a consistent column.
- ☐ Vertical rhythm is even (rows equally spaced).

### Section Break (T3)

- ☐ Big block fills most of the safe area.
- ☐ Number is large (≥ 80pt) and visually dominant.
- ☐ Title is below the number, in white on primary background.

### Concept (T4)

- ☐ Definition strip is single-line readable, not crammed.
- ☐ Three supporting cards are equal-width.
- ☐ Numbered circles align horizontally across cards.

### Hero Image (T5)

- ☐ Image dominates left ~63% of slide.
- ☐ Caption + bullets fit cleanly in right column without crowding.

### Compare (T6)

- ☐ Left and right columns are visually parallel (same heights, same item count).
- ☐ Header colors clearly differentiate the two sides (e.g., contrast for "problem", primary for "solution").

### Triple (T7)

- ☐ Three cards are equal-width and equal-height.
- ☐ KPI boxes (if present) all start at the same y-coordinate.

### Matrix (T8)

- ☐ All four quadrants are exactly equal-sized.
- ☐ Numbers 1–4 are in consistent positions within each card.

### Chart (T9)

- ☐ Axis labels are readable (≥ 9pt).
- ☐ Legend is positioned at bottom with theme colors.
- ☐ Takeaway bar (if present) is single-line and bold.

### Table (T10)

- ☐ Header row is in `primaryDark` with white text.
- ☐ Highlight row (if any) is in `primary` with white text.
- ☐ All columns are wide enough that no cell text wraps to 3+ lines.

### Flow (T11)

- ☐ Arrows are visible and centered between steps.
- ☐ Step boxes are equal-width.
- ☐ Captions below steps are short (≤ 8 chars).

### Timeline (T12)

- ☐ Horizontal line passes through the center of all dots.
- ☐ Dates and labels alternate above/below the line for readability.

### KPI (T13)

- ☐ Big numbers are visually dominant (≥ 48pt).
- ☐ Cards are equal-width with consistent internal padding.

### Quote (T14)

- ☐ Opening quotation mark is large and styled distinctively.
- ☐ Quote text is italic, in primary color.
- ☐ Attribution is right-positioned and smaller than the quote.

### Summary (T15)

- ☐ Three takeaway boxes use three distinct accent colors (primary, accent, contrast).
- ☐ Closing line bar is at the bottom and full-width.

### Thanks (T16)

- ☐ "Thank You" / equivalent is centered, large (≥ 50pt).
- ☐ Q&A or contact info is positioned below in muted color.

## Quick Script: Auto-Check Footer Overlap

If you want a programmatic sanity check, run this PowerShell snippet to flag pages where text exists in the y > 7.0 zone:

```powershell
pdftotext -layout preview\preview.pdf preview\text.txt
$lines = Get-Content preview\text.txt
# Manual inspection — automated y-coordinate detection requires PDF parsing libraries
# This is just a content sanity check; visual QA is still required
$lines | Select-String -Pattern "^\s*$" -NotMatch | Measure-Object | Select-Object Count
```

For deeper automated inspection, use Python's `pdfplumber` library to extract bounding boxes — but in practice, visual inspection of PNGs is faster and catches more issues.

## When to Sign Off

The deck is ready when:

1. Every page passes all 7 universal checks.
2. Every page passes its template-specific spot-checks.
3. You have rendered and visually verified at least one PNG per page.
4. The user has not raised any issues on a follow-up review.

**Do not sign off based on "the code looks correct".** Visual QA catches at least one bug per ~5 pages on first pass.
