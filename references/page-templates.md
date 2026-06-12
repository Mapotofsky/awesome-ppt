# Page Templates

16 drop-in slide archetypes. Each block is fully self-contained — paste, parametrize the data, and you have a polished slide. All templates assume the boilerplate's `addNav`, `addTitle`, `addFooter`, `makeShadow`, and the active theme's `C` and `F` are in scope.

## Quick Index

| ID | Name | When to use |
|----|------|-------------|
| T1 | Cover | Slide 1 of any deck |
| T2 | Table of Contents | Slide 2 of any deck ≥ 8 slides |
| T3 | Section Break | Between major sections |
| T4 | Concept Definition | Introducing a key term or idea |
| T5 | Hero Image | Showing one big visual (figure / screenshot / photo) |
| T6 | Two-Column Compare | Before vs after, problem vs solution, A vs B |
| T7 | Three-Card Row | Three parallel ideas, products, methods |
| T8 | 2×2 Matrix | Quadrant analysis, four directions |
| T9 | Chart / Data | Trend lines, bar comparisons |
| T10 | Table | Dataset specs, feature matrices |
| T11 | Flow / Pipeline | Multi-step process |
| T12 | Timeline | Roadmap, project history |
| T13 | KPI / Metrics | Highlight 3–4 key numbers |
| T14 | Quote / Callout | Single bold statement |
| T15 | Summary | Wrapping up a section or whole deck |
| T16 | Thanks / Q&A | Final slide |

---

## Template Selection Contract

Use T1-T16 as the default design space. The slide contract must name one base template per slide before code is written.

Pass/fail rules:

- Pick the template from the proof object, not from aesthetics. Chart/result -> T9/T13/T5; process/method -> T11; comparison -> T6; dense specs -> T10; recap -> T15.
- Every content slide gets one main proof object. Do not combine unrelated chart + table + flow on one slide.
- If a slide is overloaded, split it or switch to a better base template. Do not reduce text below the font floor.
- Use `T# + local variant` only when T1-T16 cannot express the proof object clearly.
- A local variant may add a takeaway bar, side rail, callout stack, or small component borrowed from another template.
- A local variant may not remove the nav/title/footer regions, ignore theme colors, or become a blank-canvas design.

Macro-layout rhythm:

- Treat `T4`, `T7`, `T8`, and `T10` as card/grid-heavy layouts. Avoid 3 consecutive card/grid-heavy slides.
- Treat `T5`, `T9`, `T11`, `T12`, `T13`, `T14`, and `T15` as anchor-capable layouts. Use at least one anchor-capable slide per major section.
- Method sections need `T11` or a controlled T11-based variant.
- Experiment/data sections need at least one main result proof slide using `T5`, `T9`, or `T13`; tables alone are not enough.
- When thumbnails look repetitive, remap a slide to an anchor-capable template before tweaking colors or spacing.

---

## T1 · Cover

Use for **slide 1**. The most polished cover has: large title, subtitle / English version, author + date + venue strip.

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│           BIG MAIN TITLE  (centered, primary color)                │
│           ──────                                                   │
│           english subtitle / context line                          │
│                                                                    │
│                                                                    │
│           ────────                                                 │
│           Author · Affiliation · Date                              │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideCover(s, { title, subtitle, author, affiliation, date }) {
  s.background = { color: C.bg };
  // Decorative top bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 0.5,
    fill: { color: C.primary }, line: { type: "none" },
  });
  // Decorative bottom bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: H - 0.5, w: W, h: 0.5,
    fill: { color: C.primary }, line: { type: "none" },
  });
  // Accent stripe under title
  s.addShape(pres.shapes.RECTANGLE, {
    x: W / 2 - 1.5, y: 3.4, w: 3, h: 0.06,
    fill: { color: C.accent }, line: { type: "none" },
  });
  // Main title
  s.addText(title, {
    x: 0.5, y: 2.3, w: W - 1, h: 1.0,
    fontFace: F.cn, fontSize: 36, bold: true, charSpacing: 4,
    color: C.primary, align: "center", valign: "middle", margin: 0,
  });
  // Subtitle
  if (subtitle) {
    s.addText(subtitle, {
      x: 0.5, y: 3.6, w: W - 1, h: 0.5,
      fontFace: F.cn, fontSize: 16, italic: true,
      color: C.muted, align: "center", valign: "middle", margin: 0,
    });
  }
  // Author block
  s.addText(`${author}    ·    ${affiliation}    ·    ${date}`, {
    x: 0.5, y: 5.2, w: W - 1, h: 0.4,
    fontFace: F.cn, fontSize: 13,
    color: C.text, align: "center", valign: "middle", margin: 0,
  });
}
```

---

## T2 · Table of Contents

Use as **slide 2** when total slides ≥ 8. Shows section titles with numbered prefixes, optionally with English subtitles.

```
┌────────────────────────────────────────────────────────────────────┐
│ Title: 目录                                                        │
│ ─────                                                              │
│   01   Section 1 title         ━━━━━━                              │
│   02   Section 2 title         ━━━━━━                              │
│   03   Section 3 title         ━━━━━━                              │
│   04   Section 4 title         ━━━━━━                              │
│   05   Section 5 title         ━━━━━━                              │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideTOC(s, { sections }) {
  // sections: [{ num, title, subtitle, page }]
  s.background = { color: C.bg };
  addNav(s, -1);  // -1 = no active section on TOC
  addTitle(s, "目录", "Table of Contents");
  addFooter(s, "—");

  const startY = 2.0;
  const rowH = (5.0) / sections.length;  // distribute remaining vertical space
  sections.forEach((sec, i) => {
    const y = startY + i * rowH;
    // Number column
    s.addText(String(sec.num).padStart(2, "0"), {
      x: 1.0, y, w: 1.2, h: rowH,
      fontFace: F.en, fontSize: 36, bold: true,
      color: C.accent, align: "left", valign: "middle", margin: 0,
    });
    // Title + subtitle
    s.addText(sec.title, {
      x: 2.4, y, w: 8.0, h: rowH * 0.55,
      fontFace: F.cn, fontSize: 18, bold: true,
      color: C.text, align: "left", valign: "bottom", margin: 0,
    });
    if (sec.subtitle) {
      s.addText(sec.subtitle, {
        x: 2.4, y: y + rowH * 0.55, w: 8.0, h: rowH * 0.4,
        fontFace: F.en, fontSize: 12, italic: true,
        color: C.muted, align: "left", valign: "top", margin: 0,
      });
    }
    // Page number (optional)
    if (sec.page) {
      s.addText(`P.${sec.page}`, {
        x: 11.4, y, w: 1.0, h: rowH,
        fontFace: F.en, fontSize: 12,
        color: C.muted, align: "right", valign: "middle", margin: 0,
      });
    }
  });
}
```

---

## T3 · Section Break

Use **between major sections**. Heavy primary-color block makes it impossible to miss visually.

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│   ████████████████████████████████████████████████████████████     │
│   █                                                          █     │
│   █     03                                                   █     │
│   █     SECTION TITLE                                        █     │
│   █     section subtitle / english version                   █     │
│   █                                                          █     │
│   ████████████████████████████████████████████████████████████     │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideSectionBreak(s, { num, title, subtitle, navIdx }) {
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addFooter(s, "—");

  // Big block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.5, w: W - 0.8, h: 4.8,
    fill: { color: C.primary }, line: { type: "none" },
    shadow: { type: "outer", color: "000000", blur: 18, offset: 4, angle: 90, opacity: 0.18 },
  });
  // Number
  s.addText(String(num).padStart(2, "0"), {
    x: 1.2, y: 1.9, w: 3, h: 1.6,
    fontFace: F.en, fontSize: 96, bold: true,
    color: C.accentLight, align: "left", valign: "middle", margin: 0,
  });
  // Accent stripe
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.2, y: 3.65, w: 1.0, h: 0.05,
    fill: { color: C.accentLight }, line: { type: "none" },
  });
  // Title
  s.addText(title, {
    x: 1.2, y: 3.8, w: W - 2.4, h: 0.9,
    fontFace: F.cn, fontSize: 32, bold: true,
    color: C.white, align: "left", valign: "middle", margin: 0,
  });
  // Subtitle
  if (subtitle) {
    s.addText(subtitle, {
      x: 1.2, y: 4.8, w: W - 2.4, h: 0.5,
      fontFace: F.cn, fontSize: 14, italic: true,
      color: C.accentLight, align: "left", valign: "middle", margin: 0,
    });
  }
}
```

---

## T4 · Concept Definition

Use to **introduce a key term**. Big "what is X" answer + 2–3 supporting bullet cards.

```
┌────────────────────────────────────────────────────────────────────┐
│ Title                                                              │
│ ─────                                                              │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ │ "Definition: one-line punchy explanation"                    │ │
│ └────────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐    │
│ │ ① bullet title  │  │ ② bullet title  │  │ ③ bullet title  │    │
│ │ description...  │  │ description...  │  │ description...  │    │
│ └─────────────────┘  └─────────────────┘  └─────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideConcept(s, { title, subtitle, navIdx, page, definition, points }) {
  // points: [{ title, desc }]  (3 items recommended)
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  // Definition strip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.95, w: W - 0.8, h: 1.1,
    fill: { color: C.iceLight }, line: { color: C.iceMid, width: 0.5 },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.95, w: 0.12, h: 1.1,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText(definition, {
    x: 0.7, y: 1.95, w: W - 1.1, h: 1.1,
    fontFace: F.cn, fontSize: 16, bold: true,
    color: C.primary, valign: "middle", margin: 0,
  });

  // Three supporting cards
  const cardW = (W - 0.8 - 0.6) / 3;
  const cardY = 3.3, cardH = 3.5;
  points.slice(0, 3).forEach((p, i) => {
    const x = 0.4 + i * (cardW + 0.3);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 0.5 },
      shadow: makeShadow(),
    });
    // Number circle
    s.addShape(pres.shapes.OVAL, {
      x: x + cardW / 2 - 0.35, y: cardY + 0.4, w: 0.7, h: 0.7,
      fill: { color: C.primary }, line: { type: "none" },
    });
    s.addText(String(i + 1), {
      x: x + cardW / 2 - 0.35, y: cardY + 0.4, w: 0.7, h: 0.7,
      fontFace: F.en, fontSize: 22, bold: true,
      color: C.accentLight, align: "center", valign: "middle", margin: 0,
    });
    // Title
    s.addText(p.title, {
      x: x + 0.2, y: cardY + 1.3, w: cardW - 0.4, h: 0.5,
      fontFace: F.cn, fontSize: 16, bold: true,
      color: C.primary, align: "center", valign: "middle", margin: 0,
    });
    // Description
    s.addText(p.desc, {
      x: x + 0.3, y: cardY + 1.85, w: cardW - 0.6, h: cardH - 2.0,
      fontFace: F.cn, fontSize: 12,
      color: C.textLight, align: "center", valign: "top", margin: 0,
    });
  });
}
```

---

## T5 · Hero Image

Use to **showcase one big visual** (figure, screenshot, photo, diagram). The image dominates; brief annotation on the side.

```
┌────────────────────────────────────────────────────────────────────┐
│ Title                                                              │
│ ─────                                                              │
│ ┌────────────────────────────────┐  ┌────────────────────────────┐│
│ │                                │  │ ▌ caption / what to notice ││
│ │     [BIG IMAGE]                │  │                            ││
│ │                                │  │ • point 1                  ││
│ │                                │  │ • point 2                  ││
│ │                                │  │ • point 3                  ││
│ └────────────────────────────────┘  └────────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideHero(s, { title, subtitle, navIdx, page, imagePath, caption, points }) {
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  // Image frame (left, ~63% width)
  const FX = 0.4, FY = 1.95, FW = 8.4, FH = 5.0;
  s.addShape(pres.shapes.RECTANGLE, {
    x: FX, y: FY, w: FW, h: FH,
    fill: { color: C.white }, line: { color: C.border, width: 0.5 },
    shadow: makeShadow(),
  });
  s.addImage({
    path: imagePath,
    x: FX + 0.2, y: FY + 0.2, w: FW - 0.4, h: FH - 0.4,
    sizing: { type: "contain", w: FW - 0.4, h: FH - 0.4 },
  });

  // Annotation column (right)
  const RX = 9.0, RW = W - 9.4;
  s.addShape(pres.shapes.RECTANGLE, {
    x: RX, y: FY, w: 0.08, h: FH,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText(caption, {
    x: RX + 0.2, y: FY, w: RW - 0.2, h: 0.8,
    fontFace: F.cn, fontSize: 14, bold: true,
    color: C.primary, valign: "top", margin: 0,
  });
  // Bullet points
  const bulletItems = points.map(p => ({
    text: p,
    options: { bullet: { code: "25CF" }, color: C.text, breakLine: true, paraSpaceAfter: 6 },
  }));
  s.addText(bulletItems, {
    x: RX + 0.2, y: FY + 0.9, w: RW - 0.2, h: FH - 1.0,
    fontFace: F.cn, fontSize: 12, color: C.text,
    valign: "top", margin: 0,
  });
}
```

---

## T6 · Two-Column Compare

Use for **A vs B** structure: before/after, problem/solution, current/proposed, competitor/us.

```
┌────────────────────────────────────────────────────────────────────┐
│ Title                                                              │
│ ─────                                                              │
│ ┌────────────────────────┐    ┌────────────────────────┐          │
│ │ ████ LEFT HEADER  ████ │    │ ████ RIGHT HEADER ████ │          │
│ ├────────────────────────┤    ├────────────────────────┤          │
│ │  ① point title         │    │  ① point title         │          │
│ │     description        │    │     description        │          │
│ │  ② point title         │    │  ② point title         │          │
│ │     description        │    │     description        │          │
│ └────────────────────────┘    └────────────────────────┘          │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideCompare(s, { title, subtitle, navIdx, page, left, right }) {
  // left/right: { header, color, items: [{ title, desc }] }  (color: C.contrast for "bad", C.primary for "good")
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  const CY = 1.95, CH = 5.0;
  const CW = (W - 0.8 - 0.4) / 2;
  const LX = 0.4, RX = LX + CW + 0.4;

  [["L", LX, left], ["R", RX, right]].forEach(([_tag, x, side]) => {
    // Header bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: CY, w: CW, h: 0.55,
      fill: { color: side.color }, line: { type: "none" },
    });
    s.addText(side.header, {
      x: x + 0.3, y: CY, w: CW - 0.6, h: 0.55,
      fontFace: F.cn, fontSize: 16, bold: true,
      color: C.white, valign: "middle", margin: 0,
    });
    // Body
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: CY + 0.55, w: CW, h: CH - 0.55,
      fill: { color: C.white }, line: { color: C.border, width: 0.5 },
      shadow: makeShadow(),
    });
    side.items.forEach((it, i) => {
      const py = CY + 0.85 + i * 1.15;
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.3, y: py + 0.05, w: 0.45, h: 0.45,
        fill: { color: side.color === C.contrast ? C.contrastPale : C.accentPale },
        line: { color: side.color, width: 1.5 },
      });
      s.addText(String(i + 1), {
        x: x + 0.3, y: py + 0.05, w: 0.45, h: 0.45,
        fontFace: F.en, fontSize: 14, bold: true,
        color: side.color, align: "center", valign: "middle", margin: 0,
      });
      s.addText(it.title, {
        x: x + 0.85, y: py, w: CW - 1.05, h: 0.4,
        fontFace: F.cn, fontSize: 14, bold: true,
        color: C.text, valign: "middle", margin: 0,
      });
      s.addText(it.desc, {
        x: x + 0.85, y: py + 0.4, w: CW - 1.05, h: 0.6,
        fontFace: F.cn, fontSize: 12,
        color: C.textLight, valign: "top", margin: 0,
      });
    });
  });
}
```

---

## T7 · Three-Card Row

Use for **three parallel ideas** of equal weight: three products, three methods, three pillars.

```
┌────────────────────────────────────────────────────────────────────┐
│ Title                                                              │
│ ─────                                                              │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│ │ ████ TITLE 1 │  │ ████ TITLE 2 │  │ ████ TITLE 3 │              │
│ │ subtitle     │  │ subtitle     │  │ subtitle     │              │
│ ├──────────────┤  ├──────────────┤  ├──────────────┤              │
│ │ • bullet 1   │  │ • bullet 1   │  │ • bullet 1   │              │
│ │ • bullet 2   │  │ • bullet 2   │  │ • bullet 2   │              │
│ │ • bullet 3   │  │ • bullet 3   │  │ • bullet 3   │              │
│ │ ┌──────────┐ │  │ ┌──────────┐ │  │ ┌──────────┐ │              │
│ │ │ KPI box  │ │  │ │ KPI box  │ │  │ │ KPI box  │ │              │
│ │ └──────────┘ │  │ └──────────┘ │  │ └──────────┘ │              │
│ └──────────────┘  └──────────────┘  └──────────────┘              │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideTriple(s, { title, subtitle, navIdx, page, cards }) {
  // cards: [{ headerColor, num, title, subtitle, bullets: [string], kpi: string }]
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  const CY = 1.95, CH = 4.6;
  const CW = (W - 0.8 - 0.6) / 3;
  cards.slice(0, 3).forEach((c, i) => {
    const x = 0.4 + i * (CW + 0.3);
    // Header strip
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: CY, w: CW, h: 1.0,
      fill: { color: c.headerColor || C.primary }, line: { type: "none" },
    });
    s.addText(String(c.num), {
      x: x + 0.2, y: CY + 0.1, w: 0.6, h: 0.8,
      fontFace: F.en, fontSize: 28, bold: true,
      color: C.accentLight, valign: "middle", margin: 0,
    });
    s.addText(c.title, {
      x: x + 0.85, y: CY + 0.15, w: CW - 1.0, h: 0.45,
      fontFace: F.cn, fontSize: 16, bold: true, italic: true,
      color: C.white, valign: "middle", margin: 0,
    });
    s.addText(c.subtitle, {
      x: x + 0.85, y: CY + 0.55, w: CW - 1.0, h: 0.4,
      fontFace: F.cn, fontSize: 12,
      color: C.accentLight, valign: "middle", margin: 0,
    });
    // Body
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: CY + 1.0, w: CW, h: CH - 1.0,
      fill: { color: C.white }, line: { color: C.border, width: 0.5 },
      shadow: makeShadow(),
    });
    // Bullets
    const bulletList = c.bullets.map(b => ({
      text: b,
      options: { bullet: { code: "25CF" }, color: C.text, breakLine: true, paraSpaceAfter: 4 },
    }));
    s.addText(bulletList, {
      x: x + 0.25, y: CY + 1.2, w: CW - 0.5, h: CH - 2.3,
      fontFace: F.cn, fontSize: 12, color: C.text,
      valign: "top", margin: 0,
    });
    // KPI box
    if (c.kpi) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.25, y: CY + CH - 0.95, w: CW - 0.5, h: 0.75,
        fill: { color: c.headerColor || C.primary }, line: { type: "none" },
      });
      s.addText(c.kpi, {
        x: x + 0.25, y: CY + CH - 0.95, w: CW - 0.5, h: 0.75,
        fontFace: F.cn, fontSize: 13, bold: true,
        color: C.accentLight, align: "center", valign: "middle", margin: 0,
      });
    }
  });
}
```

---

## T8 · 2×2 Matrix

Use for **four parallel directions** or **two-axis classification** (e.g. future work directions, four pillars).

```
┌────────────────────────────────────────────────────────────────────┐
│ Title                                                              │
│ ─────                                                              │
│ ┌────────────────────────┐    ┌────────────────────────┐          │
│ │ ▌ 1  Direction title   │    │ ▌ 2  Direction title   │          │
│ │   English subtitle     │    │   English subtitle     │          │
│ │   gap description...   │    │   gap description...   │          │
│ │   → next-step box      │    │   → next-step box      │          │
│ └────────────────────────┘    └────────────────────────┘          │
│ ┌────────────────────────┐    ┌────────────────────────┐          │
│ │ ▌ 3  Direction title   │    │ ▌ 4  Direction title   │          │
│ │   ...                  │    │   ...                  │          │
│ └────────────────────────┘    └────────────────────────┘          │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideMatrix(s, { title, subtitle, navIdx, page, quadrants }) {
  // quadrants: [{ num, title, subtitle, gapLabel, gap, nextStep }]  (4 items)
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  const CW = (W - 0.8 - 0.3) / 2;
  const CH = (5.1 - 0.3) / 2;
  const positions = [
    { x: 0.4,        y: 1.95 },
    { x: 0.7 + CW,   y: 1.95 },
    { x: 0.4,        y: 1.95 + CH + 0.3 },
    { x: 0.7 + CW,   y: 1.95 + CH + 0.3 },
  ];
  quadrants.slice(0, 4).forEach((q, i) => {
    const { x, y } = positions[i];
    // Outer card
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: CW, h: CH,
      fill: { color: C.white }, line: { color: C.border, width: 0.5 },
      shadow: makeShadow(),
    });
    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.12, h: CH,
      fill: { color: C.primary }, line: { type: "none" },
    });
    // Number
    s.addText(String(q.num), {
      x: x + 0.3, y: y + 0.15, w: 0.7, h: 0.7,
      fontFace: F.en, fontSize: 36, bold: true,
      color: C.primary, valign: "middle", margin: 0,
    });
    // Title
    s.addText(q.title, {
      x: x + 1.1, y: y + 0.2, w: CW - 1.3, h: 0.4,
      fontFace: F.cn, fontSize: 16, bold: true,
      color: C.text, valign: "middle", margin: 0,
    });
    // Subtitle
    if (q.subtitle) {
      s.addText(q.subtitle, {
        x: x + 1.1, y: y + 0.6, w: CW - 1.3, h: 0.3,
        fontFace: F.en, fontSize: 12, italic: true,
        color: C.muted, valign: "middle", margin: 0,
      });
    }
    // Gap label + description
    s.addText([
      { text: q.gapLabel || "现状", options: { bold: true, color: C.primary, fontSize: 12 } },
      { text: "  " + q.gap, options: { color: C.textLight, fontSize: 12 } },
    ], {
      x: x + 0.3, y: y + 1.1, w: CW - 0.5, h: 0.7,
      fontFace: F.cn, valign: "top", margin: 0,
    });
    // Next step box
    if (q.nextStep) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.3, y: y + CH - 0.6, w: CW - 0.5, h: 0.4,
        fill: { color: C.accentPale }, line: { color: C.accent, width: 0.5 },
      });
      s.addText("→  " + q.nextStep, {
        x: x + 0.3, y: y + CH - 0.6, w: CW - 0.5, h: 0.4,
        fontFace: F.cn, fontSize: 12, bold: true, italic: true,
        color: C.primary, align: "center", valign: "middle", margin: 0,
      });
    }
  });
}
```

---

(continued in part 2 of this file — see T9–T16 below)

---

## T9 · Chart / Data

Use for **trend lines, bar comparisons, distributions**. Built-in `addChart` supports LINE, BAR, PIE, etc.

```js
function slideChart(s, { title, subtitle, navIdx, page, chartType, data, takeaway }) {
  // chartType: "LINE" | "BAR" | "PIE"
  // data: pptxgenjs chart-data array — see https://gitbrent.github.io/PptxGenJS/docs/api-charts/
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  // Chart frame
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.95, w: W - 0.8, h: 4.3,
    fill: { color: C.white }, line: { color: C.border, width: 0.5 },
    shadow: makeShadow(),
  });
  s.addChart(pres.charts[chartType], data, {
    x: 0.6, y: 2.1, w: W - 1.2, h: 4.0,
    chartColors: [C.primary, C.accent, C.contrast, C.primaryLight],
    chartArea:  { fill: { color: C.iceLight } },
    plotArea:   { fill: { color: C.iceLight } },
    catAxisLabelColor: C.muted, catAxisLabelFontFace: F.cn, catAxisLabelFontSize: 12,
    valAxisLabelColor: C.muted, valAxisLabelFontFace: F.cn, valAxisLabelFontSize: 12,
    valGridLine: { color: C.border, size: 0.5 },
    catGridLine: { style: "none" },
    showLegend: true, legendPos: "b",
    legendFontFace: F.cn, legendFontSize: 12, legendColor: C.text,
    lineSize: 2.5, lineSmooth: true,
  });

  // Takeaway bar
  if (takeaway) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 6.45, w: W - 0.8, h: 0.55,
      fill: { color: C.primary }, line: { type: "none" },
    });
    s.addText([
      { text: "关键发现  ", options: { bold: true, color: C.accentLight, fontSize: 12 } },
      { text: takeaway, options: { color: C.white, fontSize: 12 } },
    ], {
      x: 0.6, y: 6.45, w: W - 1.2, h: 0.55,
      fontFace: F.cn, valign: "middle", margin: 0,
    });
  }
}
```

---

## T10 · Table

Use for **dataset specs, feature matrices, results comparison**. Highlight your row by inverting colors.

```js
function slideTable(s, { title, subtitle, navIdx, page, headers, rows, highlightRow, footnote }) {
  // headers: [string]
  // rows: [[string, string, ...]]
  // highlightRow: index of the row to invert (e.g., your method's row), or null
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  // Build cell array with styling
  const headerStyle = {
    bold: true, color: C.white, fill: { color: C.primaryDark },
    align: "center", valign: "middle", fontFace: F.cn, fontSize: 12,
  };
  const cellBase = {
    color: C.text, align: "center", valign: "middle",
    fontFace: F.cn, fontSize: 12,
  };
  const highlightStyle = {
    bold: true, color: C.white, fill: { color: C.primary },
    align: "center", valign: "middle", fontFace: F.cn, fontSize: 12,
  };

  const tableData = [
    headers.map(h => ({ text: h, options: headerStyle })),
    ...rows.map((row, i) => {
      const style = (i === highlightRow) ? highlightStyle : cellBase;
      return row.map(cell => ({ text: cell, options: style }));
    }),
  ];

  // Auto-size columns
  const colCount = headers.length;
  const totalW = W - 0.8;
  const colW = Array(colCount).fill(totalW / colCount);

  s.addTable(tableData, {
    x: 0.4, y: 2.0, w: totalW,
    colW, rowH: 0.4,
    border: { type: "solid", color: C.border, pt: 0.5 },
  });

  if (footnote) {
    s.addText(footnote, {
      x: 0.4, y: H - 1.0, w: W - 0.8, h: 0.4,
      fontFace: F.cn, fontSize: 12, italic: true,
      color: C.muted, align: "left", valign: "middle", margin: 0,
    });
  }
}
```

---

## T11 · Flow / Pipeline

Use for **multi-step process** or **system architecture**. Horizontal flow with arrows.

```
┌────────────────────────────────────────────────────────────────────┐
│ Title                                                              │
│ ─────                                                              │
│ ┌──────┐  →  ┌──────┐  →  ┌──────┐  →  ┌──────┐  →  ┌──────┐     │
│ │ Step │     │ Step │     │ Step │     │ Step │     │ Step │     │
│ │  1   │     │  2   │     │  3   │     │  4   │     │  5   │     │
│ └──────┘     └──────┘     └──────┘     └──────┘     └──────┘     │
│  caption     caption      caption      caption      caption        │
└────────────────────────────────────────────────────────────────────┘
```

```js
function slideFlow(s, { title, subtitle, navIdx, page, steps, summary }) {
  // steps: [{ label, desc }]
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  const n = steps.length;
  const arrowW = 0.6;
  const totalArrows = (n - 1) * arrowW;
  const totalAvail = W - 0.8 - totalArrows;
  const stepW = totalAvail / n;
  const stepH = 1.4;
  const yMid = 3.5;
  const yStep = yMid - stepH / 2;

  steps.forEach((st, i) => {
    const x = 0.4 + i * (stepW + arrowW);
    // Step box
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: yStep, w: stepW, h: stepH,
      fill: { color: C.primary }, line: { type: "none" },
      shadow: makeShadow(),
    });
    s.addText(String(i + 1), {
      x, y: yStep + 0.1, w: stepW, h: 0.4,
      fontFace: F.en, fontSize: 14, bold: true,
      color: C.accentLight, align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.label, {
      x: x + 0.1, y: yStep + 0.5, w: stepW - 0.2, h: 0.8,
      fontFace: F.cn, fontSize: 13, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0,
    });
    // Caption below
    s.addText(st.desc, {
      x: x - 0.1, y: yMid + stepH / 2 + 0.15, w: stepW + 0.2, h: 0.7,
      fontFace: F.cn, fontSize: 12,
      color: C.textLight, align: "center", valign: "top", margin: 0,
    });
    // Arrow
    if (i < n - 1) {
      s.addText("→", {
        x: x + stepW, y: yStep, w: arrowW, h: stepH,
        fontFace: F.en, fontSize: 24, bold: true,
        color: C.accent, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  // Summary footer
  if (summary) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: 6.0, w: W - 0.8, h: 0.7,
      fill: { color: C.accentPale }, line: { color: C.accent, width: 0.5 },
    });
    s.addText(summary, {
      x: 0.6, y: 6.0, w: W - 1.2, h: 0.7,
      fontFace: F.cn, fontSize: 12, italic: true,
      color: C.text, align: "center", valign: "middle", margin: 0,
    });
  }
}
```

---

## T12 · Timeline

Use for **roadmap, project history, milestones**. Horizontal timeline with date markers.

```js
function slideTimeline(s, { title, subtitle, navIdx, page, milestones }) {
  // milestones: [{ date, label, desc }]
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  const yLine = 4.0;
  const xStart = 0.8, xEnd = W - 0.8;
  // Main horizontal line
  s.addShape(pres.shapes.RECTANGLE, {
    x: xStart, y: yLine - 0.02, w: xEnd - xStart, h: 0.04,
    fill: { color: C.border }, line: { type: "none" },
  });

  const n = milestones.length;
  const stepX = (xEnd - xStart) / (n - 1);
  milestones.forEach((m, i) => {
    const cx = xStart + i * stepX;
    const above = (i % 2 === 0);
    // Dot
    s.addShape(pres.shapes.OVAL, {
      x: cx - 0.18, y: yLine - 0.18, w: 0.36, h: 0.36,
      fill: { color: C.primary }, line: { color: C.white, width: 3 },
    });
    // Date
    s.addText(m.date, {
      x: cx - 1.0, y: above ? yLine - 1.6 : yLine + 0.4, w: 2.0, h: 0.3,
      fontFace: F.en, fontSize: 12, bold: true,
      color: C.accent, align: "center", valign: "middle", margin: 0,
    });
    // Label
    s.addText(m.label, {
      x: cx - 1.2, y: above ? yLine - 1.3 : yLine + 0.7, w: 2.4, h: 0.4,
      fontFace: F.cn, fontSize: 13, bold: true,
      color: C.text, align: "center", valign: "middle", margin: 0,
    });
    // Description
    s.addText(m.desc, {
      x: cx - 1.3, y: above ? yLine - 0.9 : yLine + 1.1, w: 2.6, h: 0.7,
      fontFace: F.cn, fontSize: 12,
      color: C.textLight, align: "center", valign: "top", margin: 0,
    });
  });
}
```

---

## T13 · KPI / Metrics

Use to **highlight 3–4 key numbers**. Big numbers + units + labels + sub-context.

```js
function slideKPI(s, { title, subtitle, navIdx, page, metrics, narrative }) {
  // metrics: [{ value, unit, label, sub, color }]  (3 or 4 items)
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  const n = metrics.length;
  const cardH = 2.4;
  const totalW = W - 0.8 - (n - 1) * 0.3;
  const cardW = totalW / n;
  const cardY = 2.5;

  metrics.forEach((m, i) => {
    const x = 0.4 + i * (cardW + 0.3);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.iceLight }, line: { color: C.border, width: 0.5 },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: 0.12,
      fill: { color: m.color || C.primary }, line: { type: "none" },
    });
    // Big value
    s.addText(m.value, {
      x: x + 0.2, y: cardY + 0.3, w: cardW - 0.4, h: 1.0,
      fontFace: F.en, fontSize: 56, bold: true,
      color: m.color || C.primary, align: "center", valign: "middle", margin: 0,
    });
    // Unit
    if (m.unit) {
      s.addText(m.unit, {
        x: x + 0.2, y: cardY + 1.25, w: cardW - 0.4, h: 0.3,
        fontFace: F.cn, fontSize: 14, bold: true,
        color: C.muted, align: "center", valign: "middle", margin: 0,
      });
    }
    // Label
    s.addText(m.label, {
      x: x + 0.2, y: cardY + 1.6, w: cardW - 0.4, h: 0.4,
      fontFace: F.cn, fontSize: 14, bold: true,
      color: C.text, align: "center", valign: "middle", margin: 0,
    });
    // Sub-label
    if (m.sub) {
      s.addText(m.sub, {
        x: x + 0.2, y: cardY + 2.0, w: cardW - 0.4, h: 0.35,
        fontFace: F.cn, fontSize: 12, italic: true,
        color: C.muted, align: "center", valign: "middle", margin: 0,
      });
    }
  });

  // Narrative below
  if (narrative) {
    s.addText(narrative, {
      x: 0.6, y: 5.3, w: W - 1.2, h: 1.4,
      fontFace: F.cn, fontSize: 13, italic: true,
      color: C.textLight, align: "center", valign: "middle", margin: 0,
    });
  }
}
```

---

## T14 · Quote / Callout

Use for **single bold statement**: a manifesto line, a key insight, a customer quote, a vision.

```js
function slideQuote(s, { title, subtitle, navIdx, page, quote, attribution }) {
  s.background = { color: C.bg };
  addNav(s, navIdx);
  if (title) addTitle(s, title, subtitle);
  addFooter(s, page);

  const yQ = title ? 2.5 : 1.8;
  // Big quote mark
  s.addText("\u201C", {
    x: 0.8, y: yQ - 0.3, w: 1.5, h: 1.5,
    fontFace: F.en, fontSize: 120, bold: true,
    color: C.accent, valign: "top", margin: 0,
  });
  // Quote text
  s.addText(quote, {
    x: 1.5, y: yQ + 0.5, w: W - 3.0, h: 2.5,
    fontFace: F.cn, fontSize: 24, italic: true,
    color: C.primary, align: "left", valign: "middle", margin: 0,
  });
  // Underline accent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.5, y: yQ + 3.2, w: 2.0, h: 0.04,
    fill: { color: C.accent }, line: { type: "none" },
  });
  // Attribution
  if (attribution) {
    s.addText(`— ${attribution}`, {
      x: 1.5, y: yQ + 3.4, w: W - 3.0, h: 0.4,
      fontFace: F.cn, fontSize: 14,
      color: C.muted, align: "left", valign: "middle", margin: 0,
    });
  }
}
```

---

## T15 · Summary

Use to **wrap up a section or whole deck**. Three takeaway boxes + closing line.

```js
function slideSummary(s, { title, subtitle, navIdx, page, takeaways, closing }) {
  // takeaways: [{ label, content }]  (3 items recommended)
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addTitle(s, title, subtitle);
  addFooter(s, page);

  const cardW = (W - 0.8 - 0.4) / takeaways.length;
  const cardY = 2.2, cardH = 3.5;
  takeaways.forEach((tk, i) => {
    const x = 0.4 + i * (cardW + 0.2);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.white }, line: { color: C.border, width: 0.5 },
      shadow: makeShadow(),
    });
    // Top color bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: cardY, w: cardW, h: 0.6,
      fill: { color: i === 0 ? C.primary : (i === 1 ? C.accent : C.contrast) },
      line: { type: "none" },
    });
    s.addText(tk.label, {
      x: x + 0.2, y: cardY, w: cardW - 0.4, h: 0.6,
      fontFace: F.cn, fontSize: 14, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0,
    });
    // Body
    s.addText(tk.content, {
      x: x + 0.3, y: cardY + 0.8, w: cardW - 0.6, h: cardH - 1.0,
      fontFace: F.cn, fontSize: 12,
      color: C.text, align: "left", valign: "top", margin: 0, paraSpaceAfter: 6,
    });
  });

  // Closing line
  if (closing) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: cardY + cardH + 0.3, w: W - 0.8, h: 0.7,
      fill: { color: C.primary }, line: { type: "none" },
    });
    s.addText(closing, {
      x: 0.6, y: cardY + cardH + 0.3, w: W - 1.2, h: 0.7,
      fontFace: F.cn, fontSize: 14, bold: true,
      color: C.white, align: "center", valign: "middle", margin: 0,
    });
  }
}
```

---

## T16 · Thanks / Q&A

Use for the **final slide**. Big "Thank You" + contact info + Q&A invitation.

```js
function slideThanks(s, { mainText, secondary, contact, navIdx }) {
  // mainText defaults to "Thank You", secondary to "Q & A"
  s.background = { color: C.bg };
  addNav(s, navIdx);
  addFooter(s, "—");

  // Centered content
  s.addText(mainText || "Thank You", {
    x: 0.5, y: 2.5, w: W - 1, h: 1.2,
    fontFace: F.en, fontSize: 60, bold: true, charSpacing: 6,
    color: C.primary, align: "center", valign: "middle", margin: 0,
  });
  // Accent stripe
  s.addShape(pres.shapes.RECTANGLE, {
    x: W / 2 - 1.5, y: 3.85, w: 3, h: 0.05,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText(secondary || "Q & A", {
    x: 0.5, y: 4.0, w: W - 1, h: 0.6,
    fontFace: F.cn, fontSize: 22, italic: true,
    color: C.muted, align: "center", valign: "middle", margin: 0,
  });
  // Contact
  if (contact) {
    s.addText(contact, {
      x: 0.5, y: 5.5, w: W - 1, h: 0.4,
      fontFace: F.cn, fontSize: 13,
      color: C.textLight, align: "center", valign: "middle", margin: 0,
    });
  }
}
```

---

## How To Combine Templates

Each template is a `function slideX(s, { ... })`. In your generation script:

```js
const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
// ... C, F, helpers ...

slideCover(pres.addSlide(), { title: "...", subtitle: "...", author: "...", affiliation: "...", date: "..." });
slideTOC(pres.addSlide(), { sections: [...] });
slideSectionBreak(pres.addSlide(), { num: 1, title: "...", subtitle: "...", navIdx: 0 });
slideConcept(pres.addSlide(), { title: "...", subtitle: "...", navIdx: 0, page: 4, definition: "...", points: [...] });
// ... more slides ...
slideThanks(pres.addSlide(), { mainText: "Thank You", secondary: "Q & A", contact: "..." });

pres.writeFile({ fileName: "out.pptx" });
```

**Tip**: For multi-section decks, define each `slideX` once in the boilerplate and call them per slide. For single-script decks, inline the relevant template body directly.
