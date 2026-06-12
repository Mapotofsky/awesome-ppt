# Troubleshooting

Symptoms → root cause → copy-paste fix. Search this file with Ctrl+F when something looks wrong.

## Generation Errors (script crashes)

### `Cannot find module 'pptxgenjs'`

**Cause**: `NODE_PATH` not pointing at the global `node_modules`.

**Fix (Windows)**:

```powershell
$env:NODE_PATH = (npm root -g)
node gen_main.js
```

**Fix (macOS / Linux)**:

```bash
NODE_PATH=$(npm root -g) node gen_main.js
```

If it still fails, verify pptxgenjs is actually installed: `npm list -g --depth=0 | grep pptxgenjs`. If missing, `npm install -g pptxgenjs`.

### `SyntaxError: Unexpected token` near a Chinese string

**Cause**: Chinese curly-quotes (`"` `"` `'` `'`) leaked into JS string literals, breaking the parser.

**Fix**: Replace curly quotes with Unicode escapes inside the string:

```js
// ❌ broken
{ text: "苏州大学 \"挑战杯\"", ... }

// ✅ works
{ text: "苏州大学 \u201C挑战杯\u201D", ... }
```

Or use the `String.raw` form, or simply rewrite without quotes.

### `Error: ENOENT: no such file or directory, open 'figures/foo.png'`

**Cause**: Image path is wrong or relative to the wrong base directory.

**Fix**: Use `path.join(__dirname, "figures", "foo.png")`. The boilerplate already does this — make sure you didn't accidentally hardcode a relative path.

### Script hangs and produces no output

**Cause**: Forgot to call `.then()` / `.catch()` on the writeFile promise; or the writeFile target is locked by an open PowerPoint.

**Fix**:

```js
pres.writeFile({ fileName: "out.pptx" })
  .then(name => console.log("DONE:", name))
  .catch(err => { console.error("ERR:", err); process.exit(1); });
```

Also: close PowerPoint before regenerating (`Get-Process POWERPNT | Stop-Process -Force`).

## Layout Bugs (visible in QA)

### Content is hidden behind the footer

**Cause**: Total height of all elements between `y=1.85` and last element exceeds `5.25"`.

**Fix recipe**: calculate exact heights backward from `y=7.1`:

```
available = 7.1 - 1.85 = 5.25"
sum(card_heights) + sum(gaps) ≤ 5.25
```

If your design needs more, compress in this order:

1. Reduce inter-card gaps from 0.3 → 0.15.
2. Tighten wording or drop one bullet/item per card.
3. Reduce card padding (`y + 0.2` → `y + 0.15`).
4. Reflow or split the slide.
5. Only if all layout fixes fail, record a QA exception and reduce the least important generated text to 10–11pt.

### Right-aligned label text is clipped

**Cause**: Text width exceeds the text frame's right boundary.

**Fix**: Shorten the label or widen the frame; reduce font size only as a recorded QA exception:

```js
// ❌ clipped because frame width 4 is too narrow for long Chinese label
s.addText("第一作者 · CCF-A 类国际学术会议", {
  x: W - 4.4, y: top, w: 4, h: 0.5, align: "right", fontSize: 12, ...
});

// ✅ shortened
s.addText("第一作者 · CCF-A 类会议", {
  x: W - 4.4, y: top, w: 4, h: 0.5, align: "right", fontSize: 12, ...
});

// ✅ alternatively, widen
s.addText("第一作者 · CCF-A 类国际学术会议", {
  x: W - 5.5, y: top, w: 5.1, h: 0.5, align: "right", fontSize: 12, ...
});
```

### Card heights or widths are uneven across a row

**Cause**: Hand-computed positions diverged due to missing constants.

**Fix**: Derive widths from a single formula:

```js
// 3 cards, total 0.8 outer margin + 2 gaps of 0.3
const CW = (W - 0.8 - 0.6) / 3;
cards.forEach((c, i) => {
  const x = 0.4 + i * (CW + 0.3);
  // ...
});
```

Same pattern for 2 or 4 cards. Always compute, never hardcode.

### Embedded image looks pixelated/blurry

**Cause**: Source PNG resolution too low.

**Fix**: Regenerate the source at higher DPI:

```bash
pdftoppm -png -r 250 source.pdf figures/output
# or for screenshots, ensure source is at least 1920x1080 before embedding
```

For pptxgenjs `addImage`, always use `sizing: { type: "contain", w, h }` — `cover` and `crop` modes cause distortion or unexpected cropping.

### Image fills less than expected area

**Cause**: `sizing: { type: "contain" }` shrinks to fit the smaller dimension.

**Fix**: If the image's aspect ratio doesn't match the container, you have two options:

1. Accept the letterboxing and visually-balance with a colored background.
2. Resize/recompose the source image to match the container ratio.

Don't switch to `sizing: { type: "cover" }` — it causes invisible cropping that surprises users.

### Chinese text shows as boxes/squares

**Cause**: `fontFace` value doesn't match an installed font on the rendering machine.

**Fix**: Use the canonical name `Microsoft YaHei` (Windows) or `PingFang SC` (macOS). The boilerplate handles this:

```js
const F = { cn: "Microsoft YaHei", en: "Calibri" };
```

If rendering on Linux: install `wqy-microhei` and substitute. PowerPoint on Windows always has YaHei available.

### Text bullets render as `o` or `25CF` literally

**Cause**: Used a string instead of the bullet code object.

**Fix**:

```js
// ❌ renders the literal string "25CF"
{ text: "item", options: { bullet: "25CF" } }

// ✅ renders a filled circle
{ text: "item", options: { bullet: { code: "25CF" } } }
```

Common bullet codes: `25CF` (filled circle), `25A0` (filled square), `25B6` (right triangle), `2192` (right arrow).

## QA Workflow Issues

### IDE shows "outdated" PNG after regeneration

**Cause**: IDE cached the previous file with the same name.

**Fix**: Use a different prefix on regeneration:

```bash
pdftoppm -png -r 130 preview.pdf preview/page-v2
```

Then read `page-v2-1.png` etc. — the new prefix bypasses the cache. Or close and reopen the IDE pane.

### `pdftotext` output shows `?????` for Chinese on Windows

**Cause**: Windows console encoding (CP936 vs UTF-8 mismatch) — the PDF is fine, terminal can't display.

**Fix**: Use `Select-String -Pattern "specific Chinese phrase"` to verify content existence rather than reading the dump. Or pipe to a file and open in an editor:

```powershell
pdftotext -layout preview.pdf preview\text.txt
notepad preview\text.txt
```

### PowerPoint COM throws `System.Runtime.InteropServices.COMException`

**Cause**: Lingering POWERPNT process holding the file, or PowerPoint trying to display a security prompt.

**Fix**:

```powershell
Get-Process POWERPNT -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
# then retry
```

If repeated failures, open PowerPoint manually once, dismiss any "trust this file?" prompt, save, close. Subsequent COM automation will succeed.

### `pdftoppm` produces only the first page

**Cause**: Default behavior is single-page. Need `-r N` plus auto multi-page (already default for unspecified `-f` / `-l` flags).

**Fix**: Don't override `-f` / `-l`. The command `pdftoppm -png -r 130 in.pdf prefix` automatically renders all pages as `prefix-1.png`, `prefix-2.png`, etc.

## Content Quality Issues

### "It looks like a text dump, not a slide"

**Cause**: Single big text block instead of structured cards / matrix / flow.

**Fix**: Restructure using one of these templates from `page-templates.md`:

- 3 parallel ideas → T7 Triple
- 4 parallel directions → T8 Matrix
- Sequence of steps → T11 Flow
- Pair comparison → T6 Compare

Never paste raw paragraph prose onto a slide.

### "Too much information per slide"

**Cause**: Trying to fit a section's worth of content into one slide.

**Fix**: Split into 2 slides. The 60-second rule: if reading aloud what's on the slide takes > 60 seconds, split.

### "Visual hierarchy is flat"

**Cause**: Everything is the same size / weight / color — no clear focal point.

**Fix**: Pick one element to promote (1.5× size, bold, primary color). Demote others (smaller, regular, muted color). The eye must know where to land.

### "It looks AI-generated / generic"

**Cause**: Bullet-list dump on plain background, generic stock-photo placeholders, default font sizes.

**Fix**:

- Use the structured templates (T6/T7/T8/T11/T13).
- Embed the user's actual figures, not stock placeholders.
- Add visual elements: numbered circles, accent stripes, KPI boxes.
- Vary the page types — no two consecutive slides should use the same template.

## Planning and Deck QA Repair Recipes

Use these when the slide contract or `deck-qa-checklist.md` fails. Apply the fixed action first, then regenerate and rerun visual QA.

| Failure | Repair action |
|---|---|
| Title is vague or generic | Rewrite as `topic + specific conclusion`. Example: "Results" -> "Ablation shows graph encoding drives the gain". |
| One slide is too crowded | Split into 2 slides, or switch to T7/T8/T11 based on the proof object. Never solve by shrinking below the font floor. |
| Three card/grid slides appear in a row | Insert or replace one slide with T5/T9/T11/T12/T13/T14/T15 as an anchor slide. |
| Slide has no proof object | Pull a figure, table, flow, KPI, timeline, matrix, or comparison from the source; if none exists, convert the idea into T8, T11, or T15. |
| Experiment page looks like data dumping | Add a takeaway bar, highlight the winning row/series, or split raw table and main result into separate T10 and T9/T13 slides. |
| Method page only lists components | Rebuild as information flow, module relationship, pipeline, or causal chain using T11 or a T11-based local variant. |
| Academic deck feels too commercial | Restore clear academic section navigation such as Introduction / Related Work / Method / Experiments / Conclusion, reduce sales-like claims, and keep topic titles concrete. |
| Business/report deck has neutral topic titles | Convert important titles into claim-style messages that state what changed, why it matters, or what decision follows. |
| Custom layout is failing visual QA | Keep the content, roll back to the nearest T1-T16 template, then add only one local component if still needed. |
| Strong agent over-designed the deck | Keep the content but restore the active theme, font scale, nav/title/footer helpers, safe area, and T1-T16 base templates. |
| Deck thumbnails look repetitive | Remap the slide contract before polishing: add a big image, big flow, big result, or big summary where the section needs an anchor. |
| Summary does not close the argument | Rewrite it to connect problem, method, evidence, and meaning; use T15 instead of another card list. |

## When To Escalate

If after 3 fix iterations the issue persists, the problem is likely structural rather than cosmetic:

- The wrong template is being used for this content type.
- The slide is overloaded — split into 2.
- The content itself is unclear — ask the user to restate the key message.

Don't keep tweaking pixel positions on a fundamentally ill-suited template.
