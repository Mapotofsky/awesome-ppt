// =====================================================================
// AWESOME-PPT BOILERPLATE
// Copy this file into your project, rename, fill in the marked TODO blocks.
//
// Usage:
//   $env:NODE_PATH = (npm root -g)   # Windows PowerShell
//   NODE_PATH=$(npm root -g)         # macOS / Linux
//   node gen_main.js
// =====================================================================

const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";  // 13.333 x 7.5 inches — DO NOT CHANGE

// >>> TODO 1: Deck metadata
pres.title  = "My Presentation Title";
pres.author = "Your Name";

const W = 13.333, H = 7.5;
const TOTAL_PAGES = 1;        // >>> TODO 2: total slide count for the footer
const SECTION_NAME = "";      // e.g., "Introduction" — appears in footer right
const NAV_ITEMS = [];         // e.g., ["Intro", "Method", "Results", "Conclusion"]; leave [] for no nav
const NAV_ACTIVE = -1;        // index in NAV_ITEMS; -1 = no highlight
const FIG_DIR = path.join(__dirname, "figures");
const DECK_TITLE_BAR = pres.title;  // shows in nav bar left side

// =====================================================================
// >>> TODO 3: THEME — paste one of the 5 themes from references/themes.md
// =====================================================================
const C = {
  // === academic-red (default placeholder; replace with your chosen theme) ===
  primary:      "A02123",
  primaryDark:  "7A1A1A",
  primaryLight: "B53338",
  accent:       "B89860",
  accentLight:  "D4B87A",
  accentPale:   "F4E8D0",
  contrast:     "2C2C2C",
  contrastLight:"4A4A4A",
  contrastPale: "F0F0F0",
  white:        "FFFFFF",
  bg:           "FFFFFF",
  ice:          "FFFFFF",
  iceLight:     "FAFAFA",
  iceMid:       "E0E0E0",
  border:       "D5D5D5",
  text:         "1A1A1A",
  textLight:    "4A4A4A",
  muted:        "707070",
};
// Backwards-compatible aliases (some templates still reference these)
C.navy = C.primary; C.navyDark = C.primaryDark; C.navyLight = C.primaryLight;
C.gold = C.accent; C.goldLight = C.accentLight; C.goldPale = C.accentPale;
C.coral = C.contrast; C.coralLight = C.contrastLight; C.coralPale = C.contrastPale;

const F = { cn: "Microsoft YaHei", en: "Calibri" };

// =====================================================================
// CORE HELPERS — do not modify unless you know what you're doing
// =====================================================================

function makeShadow() {
  return { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.08 };
}

// Safe line-drawing (handles negative / zero dimensions gracefully)
function addLine(slide, x1, y1, x2, y2, lineOpts) {
  const x = Math.min(x1, x2);
  const y = Math.min(y1, y2);
  const w = Math.max(Math.abs(x2 - x1), 0.001);
  const h = Math.max(Math.abs(y2 - y1), 0.001);
  const flipH = (x1 > x2) !== (y1 > y2);
  slide.addShape(pres.shapes.LINE, { x, y, w, h, flipH, line: lineOpts });
}

// Top navigation bar. Pass active = -1 to suppress highlight (cover/TOC/thanks).
function addNav(slide, active) {
  if (NAV_ITEMS.length === 0) {
    // No nav configured — draw a thin primary stripe so titles stay anchored
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: W, h: 0.5,
      fill: { color: C.primary }, line: { type: "none" },
    });
    slide.addText(DECK_TITLE_BAR, {
      x: 0.4, y: 0.05, w: W - 0.8, h: 0.4,
      fontFace: F.cn, fontSize: 11,
      color: C.white, align: "left", valign: "middle", margin: 0,
    });
    return;
  }
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: 0.5,
    fill: { color: C.primary }, line: { type: "none" },
  });
  slide.addText(DECK_TITLE_BAR, {
    x: 0.4, y: 0.05, w: 6.5, h: 0.4,
    fontFace: F.cn, fontSize: 11,
    color: C.white, align: "left", valign: "middle", margin: 0,
  });
  const itemW = 1.2;
  const startX = W - NAV_ITEMS.length * itemW - 0.3;
  NAV_ITEMS.forEach((item, idx) => {
    const isActive = idx === active;
    slide.addText(item, {
      x: startX + idx * itemW, y: 0.05, w: itemW, h: 0.4,
      fontFace: F.cn, fontSize: 11,
      color: isActive ? C.accentLight : C.white,
      bold: isActive,
      align: "center", valign: "middle", margin: 0,
    });
    if (isActive) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: startX + idx * itemW + 0.25, y: 0.42, w: itemW - 0.5, h: 0.04,
        fill: { color: C.accentLight }, line: { type: "none" },
      });
    }
  });
}

// Slide title area (gold left bar + title + optional subtitle + divider).
function addTitle(slide, title, sub) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.85, w: 0.12, h: 0.65,
    fill: { color: C.accent }, line: { type: "none" },
  });
  slide.addText(title, {
    x: 0.65, y: 0.78, w: 11.5, h: 0.55,
    fontFace: F.cn, fontSize: 26, bold: true,
    color: C.primary, align: "left", valign: "middle", margin: 0,
  });
  if (sub) {
    slide.addText(sub, {
      x: 0.65, y: 1.32, w: 11.5, h: 0.32,
      fontFace: F.cn, fontSize: 12,
      color: C.muted, align: "left", valign: "middle", margin: 0,
    });
  }
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.7, w: W - 0.8, h: 0.02,
    fill: { color: C.border }, line: { type: "none" },
  });
}

// Footer (left: author info; right: section + page x/y). Pass "—" for cover/TOC/thanks.
function addFooter(slide, pageNum) {
  slide.addText(`${pres.author}  ·  ${SECTION_NAME || pres.title}`, {
    x: 0.4, y: H - 0.4, w: 6, h: 0.3,
    fontFace: F.cn, fontSize: 10,
    color: C.muted, align: "left", valign: "middle", margin: 0,
  });
  const right = (pageNum === "—" || pageNum == null)
    ? "—"
    : `${SECTION_NAME ? SECTION_NAME + "  ·  " : ""}${pageNum} / ${TOTAL_PAGES}`;
  slide.addText(right, {
    x: W - 4.4, y: H - 0.4, w: 4, h: 0.3,
    fontFace: F.cn, fontSize: 10,
    color: C.muted, align: "right", valign: "middle", margin: 0,
  });
}

// =====================================================================
// >>> TODO 4: SLIDES — paste templates from references/page-templates.md
// =====================================================================

// Example slide 1 — replace with your actual content
{
  const s = pres.addSlide();
  s.background = { color: C.bg };
  addNav(s, NAV_ACTIVE);
  addTitle(s, "My First Slide", "subtitle / english version");
  addFooter(s, 1);

  // TODO: drop in template body here, e.g. from T6 (Compare):
  //   slideCompare(s, { left: {...}, right: {...} });
  // Or write inline content using the same primitives (addShape, addText).
  s.addText("Replace this with your slide content.", {
    x: 0.4, y: 3.5, w: W - 0.8, h: 0.5,
    fontFace: F.cn, fontSize: 16,
    color: C.muted, align: "center", valign: "middle", margin: 0,
  });
}

// =====================================================================
// SAVE — do not modify
// =====================================================================
const outDir = path.join(__dirname, "output");
require("fs").mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "deck.pptx");

pres.writeFile({ fileName: outPath })
  .then(name => console.log("DONE:", name))
  .catch(err => { console.error("ERR:", err); process.exit(1); });
