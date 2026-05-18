// =====================================================================
// AWESOME-PPT MINIMAL EXAMPLE — a complete 5-slide business deck
// Demonstrates: cover + section break + compare + KPI + thanks
// Run:
//   $env:NODE_PATH = (npm root -g)   # Windows
//   node example_minimal.js
// Output: example_minimal.pptx
// =====================================================================

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Q4 Strategy Update";
pres.author = "Acme Corp";

const W = 13.333, H = 7.5;
const TOTAL_PAGES = 5;
const SECTION_NAME = "Strategy Update";
const NAV_ITEMS = ["Vision", "Status", "Plan", "Outlook"];
let NAV_ACTIVE = 0;

// === Theme: business-navy ===
const C = {
  primary:      "1B365D", primaryDark: "0F1F38", primaryLight: "2E4F7C",
  accent:       "C9A961", accentLight: "E0C68B", accentPale:   "F5EBD3",
  contrast:     "8B4513", contrastLight:"A0633A", contrastPale: "F0E4DA",
  white: "FFFFFF", bg: "FFFFFF", ice: "FFFFFF",
  iceLight: "F7F8FA", iceMid: "DEE3EA", border: "C8CFD8",
  text: "1A1F2E", textLight: "4A5468", muted: "707A8C",
};
C.navy = C.primary; C.gold = C.accent; C.coral = C.contrast;
C.accentLight = C.accentLight;

const F = { cn: "Microsoft YaHei", en: "Calibri" };

// Helpers
function makeShadow() {
  return { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.08 };
}

function addNav(s, active) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 0.5, fill: { color: C.primary }, line: { type: "none" },
  });
  s.addText(pres.title, {
    x: 0.4, y: 0.05, w: 6.5, h: 0.4,
    fontFace: F.cn, fontSize: 11, color: C.white, valign: "middle", margin: 0,
  });
  const itemW = 1.2;
  const startX = W - NAV_ITEMS.length * itemW - 0.3;
  NAV_ITEMS.forEach((it, i) => {
    const isActive = i === active;
    s.addText(it, {
      x: startX + i * itemW, y: 0.05, w: itemW, h: 0.4,
      fontFace: F.cn, fontSize: 11,
      color: isActive ? C.accentLight : C.white,
      bold: isActive, align: "center", valign: "middle", margin: 0,
    });
    if (isActive) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: startX + i * itemW + 0.25, y: 0.42, w: itemW - 0.5, h: 0.04,
        fill: { color: C.accentLight }, line: { type: "none" },
      });
    }
  });
}

function addTitle(s, title, sub) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.85, w: 0.12, h: 0.65,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText(title, {
    x: 0.65, y: 0.78, w: 11.5, h: 0.55,
    fontFace: F.cn, fontSize: 26, bold: true,
    color: C.primary, valign: "middle", margin: 0,
  });
  if (sub) {
    s.addText(sub, {
      x: 0.65, y: 1.32, w: 11.5, h: 0.32,
      fontFace: F.cn, fontSize: 12, color: C.muted, valign: "middle", margin: 0,
    });
  }
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.7, w: W - 0.8, h: 0.02,
    fill: { color: C.border }, line: { type: "none" },
  });
}

function addFooter(s, pageNum) {
  s.addText(`${pres.author}  ·  ${SECTION_NAME}`, {
    x: 0.4, y: H - 0.4, w: 6, h: 0.3,
    fontFace: F.cn, fontSize: 10, color: C.muted, valign: "middle", margin: 0,
  });
  const right = (pageNum === "—") ? "—" : `${pageNum} / ${TOTAL_PAGES}`;
  s.addText(right, {
    x: W - 4.4, y: H - 0.4, w: 4, h: 0.3,
    fontFace: F.cn, fontSize: 10, color: C.muted, align: "right", valign: "middle", margin: 0,
  });
}

// =====================================================================
// SLIDE 1 — Cover
// =====================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 0.5, fill: { color: C.primary }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: H - 0.5, w: W, h: 0.5, fill: { color: C.primary }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: W / 2 - 1.5, y: 3.4, w: 3, h: 0.06,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText("Q4 Strategy Update", {
    x: 0.5, y: 2.3, w: W - 1, h: 1.0,
    fontFace: F.cn, fontSize: 36, bold: true, charSpacing: 4,
    color: C.primary, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Path to Profitable Growth", {
    x: 0.5, y: 3.6, w: W - 1, h: 0.5,
    fontFace: F.cn, fontSize: 16, italic: true,
    color: C.muted, align: "center", valign: "middle", margin: 0,
  });
  s.addText("Acme Corporation    ·    CEO Office    ·    2026-Q4", {
    x: 0.5, y: 5.2, w: W - 1, h: 0.4,
    fontFace: F.cn, fontSize: 13, color: C.text,
    align: "center", valign: "middle", margin: 0,
  });
}

// =====================================================================
// SLIDE 2 — Section Break (Vision)
// =====================================================================
{
  NAV_ACTIVE = 0;
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addNav(s, NAV_ACTIVE);
  addFooter(s, "—");
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.5, w: W - 0.8, h: 4.8,
    fill: { color: C.primary }, line: { type: "none" },
    shadow: { type: "outer", color: "000000", blur: 18, offset: 4, angle: 90, opacity: 0.18 },
  });
  s.addText("01", {
    x: 1.2, y: 1.9, w: 3, h: 1.6,
    fontFace: F.en, fontSize: 96, bold: true,
    color: C.accentLight, valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.2, y: 3.65, w: 1.0, h: 0.05,
    fill: { color: C.accentLight }, line: { type: "none" },
  });
  s.addText("Vision", {
    x: 1.2, y: 3.8, w: W - 2.4, h: 0.9,
    fontFace: F.cn, fontSize: 32, bold: true, color: C.white, valign: "middle", margin: 0,
  });
  s.addText("Where we are heading and why it matters", {
    x: 1.2, y: 4.8, w: W - 2.4, h: 0.5,
    fontFace: F.cn, fontSize: 14, italic: true,
    color: C.accentLight, valign: "middle", margin: 0,
  });
}

// =====================================================================
// SLIDE 3 — Compare (status quo vs proposed)
// =====================================================================
{
  NAV_ACTIVE = 1;
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addNav(s, NAV_ACTIVE);
  addTitle(s, "Status Quo vs Proposed Direction", "Why we need to shift now");
  addFooter(s, 3);

  const CY = 1.95, CH = 5.0, CW = (W - 0.8 - 0.4) / 2;
  const sides = [
    { x: 0.4, color: C.contrast, header: "Status Quo", items: [
      { title: "Reactive operations", desc: "Engineering responds to inbound requests with no central roadmap." },
      { title: "Siloed data", desc: "Each team maintains its own dashboards; metrics conflict across reports." },
      { title: "Delayed decisions", desc: "Weekly cycles for cross-team alignment slow product launches." },
    ]},
    { x: 0.4 + CW + 0.4, color: C.primary, header: "Proposed Direction", items: [
      { title: "Strategic roadmap", desc: "Quarterly OKRs cascade from a unified company strategy." },
      { title: "Single source of truth", desc: "Centralized data warehouse + canonical KPI definitions." },
      { title: "Daily decisions", desc: "Stand-up rituals + async dashboards keep velocity high." },
    ]},
  ];

  sides.forEach(side => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: side.x, y: CY, w: CW, h: 0.55,
      fill: { color: side.color }, line: { type: "none" },
    });
    s.addText(side.header, {
      x: side.x + 0.3, y: CY, w: CW - 0.6, h: 0.55,
      fontFace: F.cn, fontSize: 16, bold: true,
      color: C.white, valign: "middle", margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: side.x, y: CY + 0.55, w: CW, h: CH - 0.55,
      fill: { color: C.white }, line: { color: C.border, width: 0.5 },
      shadow: makeShadow(),
    });
    side.items.forEach((it, i) => {
      const py = CY + 0.85 + i * 1.35;
      s.addShape(pres.shapes.OVAL, {
        x: side.x + 0.3, y: py + 0.05, w: 0.45, h: 0.45,
        fill: { color: side.color === C.contrast ? C.contrastPale : C.accentPale },
        line: { color: side.color, width: 1.5 },
      });
      s.addText(String(i + 1), {
        x: side.x + 0.3, y: py + 0.05, w: 0.45, h: 0.45,
        fontFace: F.en, fontSize: 14, bold: true,
        color: side.color, align: "center", valign: "middle", margin: 0,
      });
      s.addText(it.title, {
        x: side.x + 0.85, y: py, w: CW - 1.05, h: 0.4,
        fontFace: F.cn, fontSize: 14, bold: true, color: C.text, valign: "middle", margin: 0,
      });
      s.addText(it.desc, {
        x: side.x + 0.85, y: py + 0.4, w: CW - 1.05, h: 0.7,
        fontFace: F.cn, fontSize: 11.5, color: C.textLight, valign: "top", margin: 0,
      });
    });
  });
}

// =====================================================================
// SLIDE 4 — KPI metrics
// =====================================================================
{
  NAV_ACTIVE = 2;
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addNav(s, NAV_ACTIVE);
  addTitle(s, "Targets for Q4", "What success looks like in 90 days");
  addFooter(s, 4);

  const metrics = [
    { value: "+18", unit: "%",  label: "Revenue Growth", sub: "vs Q3 baseline",   color: C.primary },
    { value: "92",  unit: "pt", label: "NPS Score",      sub: "from 78 in Q3",    color: C.accent  },
    { value: "<3",  unit: "wk", label: "Decision Cycle", sub: "from 6 wk avg",    color: C.contrast},
    { value: "100", unit: "%",  label: "OKR Visibility", sub: "all teams aligned",color: C.primary },
  ];
  const n = metrics.length;
  const cardH = 2.4;
  const cardW = (W - 0.8 - (n - 1) * 0.3) / n;
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
      fill: { color: m.color }, line: { type: "none" },
    });
    s.addText(m.value, {
      x: x + 0.2, y: cardY + 0.3, w: cardW - 0.4, h: 1.0,
      fontFace: F.en, fontSize: 56, bold: true,
      color: m.color, align: "center", valign: "middle", margin: 0,
    });
    s.addText(m.unit, {
      x: x + 0.2, y: cardY + 1.25, w: cardW - 0.4, h: 0.3,
      fontFace: F.cn, fontSize: 14, bold: true,
      color: C.muted, align: "center", valign: "middle", margin: 0,
    });
    s.addText(m.label, {
      x: x + 0.2, y: cardY + 1.6, w: cardW - 0.4, h: 0.4,
      fontFace: F.cn, fontSize: 14, bold: true,
      color: C.text, align: "center", valign: "middle", margin: 0,
    });
    s.addText(m.sub, {
      x: x + 0.2, y: cardY + 2.0, w: cardW - 0.4, h: 0.35,
      fontFace: F.cn, fontSize: 10, italic: true,
      color: C.muted, align: "center", valign: "middle", margin: 0,
    });
  });
  s.addText("Hitting all four metrics signals readiness for the international expansion announced in Q1 2027.", {
    x: 0.6, y: 5.3, w: W - 1.2, h: 1.4,
    fontFace: F.cn, fontSize: 13, italic: true,
    color: C.textLight, align: "center", valign: "middle", margin: 0,
  });
}

// =====================================================================
// SLIDE 5 — Thanks / Q&A
// =====================================================================
{
  NAV_ACTIVE = 3;
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addNav(s, NAV_ACTIVE);
  addFooter(s, "—");

  s.addText("Thank You", {
    x: 0.5, y: 2.5, w: W - 1, h: 1.2,
    fontFace: F.en, fontSize: 60, bold: true, charSpacing: 6,
    color: C.primary, align: "center", valign: "middle", margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: W / 2 - 1.5, y: 3.85, w: 3, h: 0.05,
    fill: { color: C.accent }, line: { type: "none" },
  });
  s.addText("Q & A", {
    x: 0.5, y: 4.0, w: W - 1, h: 0.6,
    fontFace: F.cn, fontSize: 22, italic: true,
    color: C.muted, align: "center", valign: "middle", margin: 0,
  });
  s.addText("strategy@acme.com    ·    acme.com/q4", {
    x: 0.5, y: 5.5, w: W - 1, h: 0.4,
    fontFace: F.cn, fontSize: 13,
    color: C.textLight, align: "center", valign: "middle", margin: 0,
  });
}

// Save
const outPath = path.join(__dirname, "example_minimal.pptx");
pres.writeFile({ fileName: outPath })
  .then(name => console.log("DONE:", name))
  .catch(err => { console.error("ERR:", err); process.exit(1); });
