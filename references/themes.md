# Themes

Each theme is a complete drop-in `C` color object. Copy the entire block into the boilerplate and you're done.

All themes follow the same **6-role structure** so templates are theme-agnostic:

| Role | Purpose |
|------|---------|
| `primary` family (`primary` / `primaryDark` / `primaryLight`) | Main brand color — nav bar, our-work titles, KPI emphasis |
| `accent` family (`accent` / `accentLight` / `accentPale`) | Decorative emphasis — title bars, formula boxes, hover states |
| `contrast` family (`contrast` / `contrastLight` / `contrastPale`) | Negative / cautionary semantics — problems, limitations, "before" states |
| `neutral` family (`white` / `bg` / `iceLight` / `iceMid` / `border`) | Backgrounds, dividers, soft fills |
| `text` family (`text` / `textLight` / `muted`) | Body copy, captions, footnotes |
| Aliases (`navy`, `gold`, `coral`) | Backwards-compatible names some templates still use |

After picking a theme, paste the `C` block and the alias lines into your script's color section. **Do not edit individual hex values without good reason.**

---

## Theme 1 · `academic-red`

academic red + dark gold + charcoal. Best for: thesis defenses, journal talks, university events. Communicates: tradition, rigor, scholarship.

```js
const C = {
  // Primary — academic red
  primary:      "A02123",
  primaryDark:  "7A1A1A",
  primaryLight: "B53338",
  // Accent — dark academic gold
  accent:       "B89860",
  accentLight:  "D4B87A",
  accentPale:   "F4E8D0",
  // Contrast — charcoal (used for "problems / limitations")
  contrast:     "2C2C2C",
  contrastLight:"4A4A4A",
  contrastPale: "F0F0F0",
  // Neutral
  white:        "FFFFFF",
  bg:           "FFFFFF",
  ice:          "FFFFFF",
  iceLight:     "FAFAFA",
  iceMid:       "E0E0E0",
  border:       "D5D5D5",
  // Text
  text:         "1A1A1A",
  textLight:    "4A4A4A",
  muted:        "707070",
};
// Backwards-compatible aliases
C.navy = C.primary; C.navyDark = C.primaryDark; C.navyLight = C.primaryLight;
C.gold = C.accent; C.goldLight = C.accentLight; C.goldPale = C.accentPale;
C.coral = C.contrast; C.coralLight = C.contrastLight; C.coralPale = C.contrastPale;
```

---

## Theme 2 · `business-navy`

Deep navy + brass accent + warm gray. Best for: corporate decks, investor pitches, board meetings, consulting reports. Communicates: trust, authority, polish.

```js
const C = {
  primary:      "1B365D",   // deep navy
  primaryDark:  "0F1F38",
  primaryLight: "2E4F7C",
  accent:       "C9A961",   // brass
  accentLight:  "E0C68B",
  accentPale:   "F5EBD3",
  contrast:     "8B4513",   // muted rust (for "current state" comparisons)
  contrastLight:"A0633A",
  contrastPale: "F0E4DA",
  white:        "FFFFFF",
  bg:           "FFFFFF",
  ice:          "FFFFFF",
  iceLight:     "F7F8FA",
  iceMid:       "DEE3EA",
  border:       "C8CFD8",
  text:         "1A1F2E",
  textLight:    "4A5468",
  muted:        "707A8C",
};
C.navy = C.primary; C.navyDark = C.primaryDark; C.navyLight = C.primaryLight;
C.gold = C.accent; C.goldLight = C.accentLight; C.goldPale = C.accentPale;
C.coral = C.contrast; C.coralLight = C.contrastLight; C.coralPale = C.contrastPale;
```

---

## Theme 3 · `tech-cyan`

Indigo + cyan accent + space-gray. Best for: AI/ML/SaaS pitches, dev conferences, technical demos, internal engineering reviews. Communicates: innovation, precision, modernity.

```js
const C = {
  primary:      "2E3192",   // deep indigo
  primaryDark:  "1B1D5C",
  primaryLight: "4A4FB8",
  accent:       "00B4D8",   // cyan
  accentLight:  "48CAE4",
  accentPale:   "CAF0F8",
  contrast:     "E63946",   // alert red (used for "before" / "bad" states sparingly)
  contrastLight:"EF6776",
  contrastPale: "FBE3E5",
  white:        "FFFFFF",
  bg:           "FFFFFF",
  ice:          "FFFFFF",
  iceLight:     "F4F6FB",
  iceMid:       "D8DDE8",
  border:       "C0C7D6",
  text:         "0F1729",
  textLight:    "3D4663",
  muted:        "6B7494",
};
C.navy = C.primary; C.navyDark = C.primaryDark; C.navyLight = C.primaryLight;
C.gold = C.accent; C.goldLight = C.accentLight; C.goldPale = C.accentPale;
C.coral = C.contrast; C.coralLight = C.contrastLight; C.coralPale = C.contrastPale;
```

---

## Theme 4 · `warm-amber`

Burnt orange + cream + slate. Best for: training decks, education, internal kickoffs, team workshops, brand storytelling. Communicates: warmth, approachability, energy.

```js
const C = {
  primary:      "C5530A",   // burnt orange
  primaryDark:  "8E3A06",
  primaryLight: "E07020",
  accent:       "F4A261",   // soft amber
  accentLight:  "F8C088",
  accentPale:   "FCE7D2",
  contrast:     "264653",   // deep slate (gives "serious" counterpoint)
  contrastLight:"3F6072",
  contrastPale: "DCE4E8",
  white:        "FFFFFF",
  bg:           "FFFEFA",   // warm white
  ice:          "FFFFFF",
  iceLight:     "FBF6EE",
  iceMid:       "EDE2D0",
  border:       "D6CAB5",
  text:         "2A1F12",
  textLight:    "55432B",
  muted:        "8A7559",
};
C.navy = C.primary; C.navyDark = C.primaryDark; C.navyLight = C.primaryLight;
C.gold = C.accent; C.goldLight = C.accentLight; C.goldPale = C.accentPale;
C.coral = C.contrast; C.coralLight = C.contrastLight; C.coralPale = C.contrastPale;
```

---

## Theme 5 · `minimal-mono`

Black + warm white + single accent. Best for: editorial decks, design portfolios, art talks, premium product launches. Communicates: confidence, restraint, sophistication.

```js
const C = {
  primary:      "1A1A1A",   // near-black
  primaryDark:  "000000",
  primaryLight: "404040",
  accent:       "D4AF37",   // single brass accent (or override per deck)
  accentLight:  "E6C863",
  accentPale:   "F5EBC8",
  contrast:     "707070",   // mid gray for "before" states
  contrastLight:"909090",
  contrastPale: "EEEEEE",
  white:        "FFFFFF",
  bg:           "FAFAF7",   // off-white
  ice:          "FFFFFF",
  iceLight:     "F5F5F2",
  iceMid:       "E0E0DC",
  border:       "C8C8C4",
  text:         "0A0A0A",
  textLight:    "3A3A3A",
  muted:        "6E6E6E",
};
C.navy = C.primary; C.navyDark = C.primaryDark; C.navyLight = C.primaryLight;
C.gold = C.accent; C.goldLight = C.accentLight; C.goldPale = C.accentPale;
C.coral = C.contrast; C.coralLight = C.contrastLight; C.coralPale = C.contrastPale;
```

---

## Brand-Color Composer

When the user supplies their own brand color (e.g. "use #2563EB" or "match our company purple"), build a custom theme by following these rules:

### Step 1 · Identify the brand color and classify it

- Saturated cool (blue/cyan/teal) → start from `business-navy` or `tech-cyan`
- Saturated warm (red/orange) → start from `academic-red` or `warm-amber`
- Black/gray → start from `minimal-mono`

### Step 2 · Replace the `primary` family

Use a color tool (or manually) to compute:

- `primary` = the brand hex
- `primaryDark` = brand at ~70% lightness (multiply each channel by 0.7)
- `primaryLight` = brand at ~115% lightness or shifted toward its analogous hue

### Step 3 · Pick a complementary accent

Pick one accent that contrasts but doesn't compete:

- Cool primary → warm accent (gold, amber, copper)
- Warm primary → cool accent (slate, deep teal, indigo)
- Mono primary → any saturated accent the brand allows

Set `accentLight` and `accentPale` by lightening 20% / 80% respectively.

### Step 4 · Keep neutrals and contrast unchanged

Reuse the neutral and `contrast` families from the closest base theme. Don't overthink — neutrals carry across themes well.

### Step 5 · Verify legibility

After assembling, mentally render: white text on `primary`, `text` on `bg`, `accentLight` on `primary`. All three must be clearly readable. If any fail, adjust the lightness values until they pass.

---

## Theme Selection Cheat Sheet

| User says | Use this theme |
|-----------|----------------|
| "毕业答辩" / "thesis defense" / "学术汇报" | `academic-red` |
| "公司汇报" / "投资人 pitch" / "董事会" / "consulting" | `business-navy` |
| "AI/ML/技术分享" / "产品发布" (科技) / "dev conference" | `tech-cyan` |
| "培训" / "教学" / "新员工 onboarding" / "团队 workshop" | `warm-amber` |
| "极简" / "设计作品集" / "艺术展" / "高端品牌" | `minimal-mono` |
| Provides hex / brand color | Use composer with closest base |
| No preference stated | Default to `business-navy` (most universally appropriate) |
