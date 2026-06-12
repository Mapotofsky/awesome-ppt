# Pipeline: From Zero to Polished Deck

Concrete commands for the full generation + QA workflow. Includes Windows / macOS / Linux variants.

## Prerequisites (One-time setup)

### Node.js + pptxgenjs

Check globally first — do NOT `npm install` per-project:

```powershell
# Windows
npm list -g --depth=0 | Select-String pptxgenjs
```

```bash
# macOS / Linux
npm list -g --depth=0 | grep pptxgenjs
```

If absent, install globally:

```bash
npm install -g pptxgenjs
```

### Locate the global node_modules path

Scripts must find `pptxgenjs` via `NODE_PATH`. Get the path:

```powershell
# Windows
npm root -g
# Typical output: C:\Users\<user>\AppData\Roaming\npm\node_modules
```

```bash
# macOS / Linux
npm root -g
# Typical: /usr/local/lib/node_modules  or  /opt/homebrew/lib/node_modules
```

### PDF tools (for QA)

- **pdftoppm** and **pdftotext** (poppler-utils) — for PDF → PNG and text extraction
- **PowerPoint** (Windows) or **LibreOffice** (cross-platform fallback) — for PPTX → PDF

```powershell
# Windows: install poppler via Chocolatey or scoop
scoop install poppler
# Or download from https://github.com/oschwartz10612/poppler-windows/releases
```

```bash
# macOS
brew install poppler

# Linux (Debian/Ubuntu)
sudo apt-get install poppler-utils
```

## The Standard Project Layout

```
my-deck/
├── figures/                    # all PNG assets used in slides
│   ├── arch.png
│   ├── results.png
│   └── ...
├── slide_contract.md            # optional but recommended planning record
├── gen_<section>.js            # one script per logical section
├── gen_<section>.js
├── output/                     # generated .pptx files (recommended .gitignore)
│   └── deck.pptx
└── preview/                    # QA artifacts (recommended .gitignore)
    ├── preview.pdf
    └── preview-page-N.png
```

## Step-by-Step Generation

### Planning gate before code

Before writing or editing `gen_<section>.js`:

1. Choose one preset from `references/presets.md`.
2. Fill the slide contract from `references/slide-contract.md`.
3. Confirm every content slide has one proof object and one base template from `T1`-`T16`.
4. Check the planned deck rhythm against `references/deck-qa-checklist.md` so the deck does not become repeated cards.
5. If using a controlled upgrade, write the base template and the reason in the contract before coding.

If the contract fails, fix the plan first. Do not compensate by shrinking fonts or inventing a blank custom slide.

### 1. Prepare figures

If sources are PDF (e.g., LaTeX-generated):

```powershell
# Windows
pdftoppm -png -r 200 source/arch.pdf figures/arch
# Produces figures/arch-1.png (-1 because PDF page index)
```

If multiple PDFs:

```powershell
Get-ChildItem source\*.pdf | ForEach-Object {
  $base = $_.BaseName
  pdftoppm -png -r 200 $_.FullName "figures\$base"
}
```

If sources are PNG, just copy:

```powershell
Copy-Item source\*.png figures\ -Force
```

### 2. Write the generation script

Start by copying the boilerplate:

```powershell
Copy-Item .claude\skills\awesome-ppt\assets\boilerplate.js .\my-deck\gen_main.js
```

Then edit the script to:

1. Replace the `// >>> THEME` block with the chosen theme's `C` object from `themes.md`.
2. Set `pres.title`, `pres.author`, deck metadata.
3. Set `NAV_ITEMS` to the section names that should appear in the top nav (or leave empty array `[]` if no nav is needed for non-academic decks).
4. Insert slide-creation calls — one per slide. Each template from `page-templates.md` is a paste-and-fill function.

### 3. Run the script

Windows PowerShell:

```powershell
$env:NODE_PATH = (npm root -g)
node gen_main.js
```

macOS / Linux:

```bash
NODE_PATH=$(npm root -g) node gen_main.js
```

If the script terminates with `Cannot find module 'pptxgenjs'`, the `NODE_PATH` env var did not propagate — set it before invoking node, not on a separate line.

### 4. QA (NON-NEGOTIABLE)

#### 4a. Convert PPTX → PDF

**Windows (PowerPoint COM, fastest, fidelity guaranteed):**

```powershell
# Always kill any leftover PowerPoint processes first
Get-Process POWERPNT -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 1

$pptPath = "$PWD\output\deck.pptx"
$pdfPath = "$PWD\preview\preview.pdf"
New-Item -ItemType Directory -Force -Path "preview" | Out-Null

$ppt = New-Object -ComObject PowerPoint.Application
$p = $ppt.Presentations.Open($pptPath, $false, $true, $false)
$p.SaveAs($pdfPath, 32)   # 32 = ppSaveAsPDF
$p.Close()
$ppt.Quit()
```

**Cross-platform (LibreOffice fallback, slightly lower fidelity):**

```bash
soffice --headless --convert-to pdf --outdir preview output/deck.pptx
```

#### 4b. Convert PDF → PNG

```bash
pdftoppm -png -r 130 preview/preview.pdf preview/page
# Produces preview/page-1.png, preview/page-2.png, ...
```

Use `-r 130` for fast iteration; `-r 200` if you want to inspect fine details. Higher DPI files are slow to load.

#### 4c. Read every page

In your conversation with the user, **read each `preview/page-N.png` and apply the 7-point QA checklist** from `qa-checklist.md`. Do not summarize what's on the page — verify it. If you cannot view images in your environment, use `pdftotext -layout preview/preview.pdf -` to confirm text content at least.

#### 4d. Iterate

If any page fails QA, fix the script per `troubleshooting.md` and re-run from Step 3. Each iteration should:

1. Stop any running PowerPoint instances (Step 4a's first line).
2. Delete or rename old `output/deck.pptx` (PowerPoint may lock it otherwise).
3. Delete old PNG previews if you want clean slate, OR use a different prefix (`page2-`) to bypass IDE image cache.

#### 4e. Run deck QA

After every page passes the visual checklist, inspect the whole deck using `references/deck-qa-checklist.md`.

Deck QA is pass/fail. It checks contact-sheet rhythm, repeated structures, missing proof slides, weak titles, missing result takeaways, and whether any controlled custom layout is still reproducible. If any item fails, update the slide contract, regenerate, rerender, and repeat page QA before signing off.

## Multi-Section Decks

For decks ≥15 slides, split into one script per logical section. Each script outputs its own `.pptx`. Don't try to merge them programmatically — pptxgenjs has no merge API. Either:

- **Recommended**: Keep them as separate files; present them as a sequence to the user. They can be rehearsed independently.
- **If single-file required**: After generating individual `.pptx` files, manually combine in PowerPoint via "Reuse Slides" feature, or use a Python script with `python-pptx` to merge.

Each major section still needs an anchor slide in the slide contract: a dominant method, result, timeline, KPI, image, or summary slide that gives the section a clear thumbnail identity.

## .gitignore Recommendations

```
output/
preview/
figures/*.png   # if figures are derived from PDFs
*.pptx
```

Keep figures' source PDFs and the generation scripts in version control. Generated artifacts are reproducible.
