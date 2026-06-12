# Awesome PPT Generator

使用 [pptxgenjs](https://github.com/gitbrent/pptxgenjs) 程序化创建专业级 `.pptx` 演示文稿的技能套件。

## 简介

本 Skill 提供完整的 5 步工作流，通过**场景 preset** + **主题系统** + **Slide Contract** + **页面模板** + **质量检查闭环**，为常见场景稳定生成视觉精致、可编辑、可复现的幻灯片。

awesome-ppt 的定位是 **lower-bound stabilizer**：默认用固定流程和固定模板防止 AI 乱设计、乱配色、乱排版；当任务确实需要时，允许强模型在可检查、可复现、可修复的范围内做受控升级。

### 核心保证

- **视觉专业** — 语义化配色、统一排版、精致阴影
- **零溢出/裁剪** — 内容始终适配安全区域
- **场景全覆盖** — 学术、商业、技术、培训、创意
- **可重复生成** — 一个脚本对应一个章节，自由编辑重跑
- **生成前有契约** — 每页先明确作用、主题/结论、主 proof object、模板和来源
- **整套 Deck QA** — 不只逐页看溢出，还检查重复版式、弱标题、缺失证据页和失控自定义

## 适用场景

| Preset | 场景 |
|--------|------|
| `academic-oral` | 学术会议口头报告、研讨会报告 |
| `academic-defense` | 毕业论文答辩、论文答辩 |
| `business-report` | 内部汇报、经营分析、董事会/管理层汇报 |
| `training-courseware` | 培训课件、课程、工作坊、onboarding |
| `quick-routine` | 普通快速 PPT、短汇报、轻量总结 |

## 5 步工作流

```
1. 明确需求 → 2. 选择主题 → 3. 规划页面 → 4. 生成代码 → 5. 视觉 QA + Deck QA
```

| 步骤 | 内容 | 参考文档 |
|------|------|----------|
| **明确需求** | 4 个问题框定方向：场景、受众/长度、主题偏好、素材来源 | 见 `SKILL.md` |
| **选择主题** | 从 5 套预设主题中挑选，或基于品牌色定制 | `references/themes.md` |
| **规划页面** | 选择 preset，填写 Slide Contract，再映射到 16 种页面模板 | `references/presets.md`、`references/slide-contract.md`、`references/page-templates.md` |
| **生成代码** | 复制 boilerplate，填充内容，执行脚本 | `references/pipeline.md` |
| **QA** | PPTX→PDF→PNG 逐页检查，再执行整套 deck pass/fail 检查 | `references/qa-checklist.md`、`references/deck-qa-checklist.md` |

## 目录结构

```
awesome-ppt/
├── SKILL.md                    # 完整使用指南（必读）
├── README.md                   # 本文件
│
├── references/
│   ├── themes.md              # 5 套预设主题 + 品牌色定制指南
│   ├── presets.md             # 5 个场景 preset 与默认页面序列
│   ├── slide-contract.md      # 生成前填写的页面契约
│   ├── page-templates.md      # 16 种页面模板（含代码片段）
│   ├── pipeline.md            # 环境配置与生成流程
│   ├── qa-checklist.md        # 7 项视觉检查清单
│   ├── deck-qa-checklist.md   # 整套 deck 的 pass/fail 检查
│   └── troubleshooting.md     # 常见问题修复方案
│
└── assets/
    ├── boilerplate.js         # 启动模板（含主题+工具函数）
    └── example_minimal.js     # 完整示例（演示最佳实践）
```

## 快速开始

### 1. 查看完整指南

```bash
# 阅读核心文档
cat SKILL.md
```

### 2. 选择主题

```bash
# 查看可用主题
cat references/themes.md
```

5 套预设主题：
- `academic-red` — 学术答辩
- `business-navy` — 商业路演
- `tech-cyan` — 技术/AI 产品
- `warm-amber` — 教育培训
- `minimal-mono` — 简约编辑风格

### 3. 选择 Preset 并填写 Slide Contract

```bash
# 查看场景 preset
cat references/presets.md

# 填写每页的 Role / Claim-or-Topic / Proof Object / Template / Source
cat references/slide-contract.md
```

Slide Contract 固定字段：

| Slide | Role | Claim-or-Topic | Proof Object | Template | Source | Notes |
|---|---|---|---|---|---|---|

### 4. 规划页面结构

```bash
# 查看 16 种页面模板
cat references/page-templates.md
```

模板概览：
- **导航类**: 封面 (T1)、目录 (T2)、章节分隔 (T3)、致谢 (T16)
- **内容类**: 概念定义 (T4)、主图展示 (T5)、两栏对比 (T6)、三卡片 (T7)、2×2矩阵 (T8)
- **数据类**: 图表 (T9)、表格 (T10)、流程/管道图 (T11)、时间线 (T12)、KPI 指标 (T13)
- **强调类**: 引用/高亮 (T14)、总结 (T15)

### 5. 复制模板生成

```bash
# 复制启动模板
cp assets/boilerplate.js gen_mydeck.js

# 编辑填充内容后执行
node gen_mydeck.js
```

### 6. 执行 QA 检查

```powershell
# Windows PowerShell 示例
Get-Process POWERPNT -ErrorAction SilentlyContinue | Stop-Process -Force
$ppt = New-Object -ComObject PowerPoint.Application
$p = $ppt.Presentations.Open("$PWD\out.pptx", $false, $true, $false)
$p.SaveAs("$PWD\preview\preview.pdf", 32)
$p.Close(); $ppt.Quit()
pdftoppm -png -r 130 preview\preview.pdf preview\page
```

逐页检查 `preview/page-*.png` 是否符合 `qa-checklist.md` 的 7 项标准。全部通过后，再用 `deck-qa-checklist.md` 检查整套 deck 是否存在连续同构页面、缺少 proof object、弱标题、缺少结果 takeaway 或失控自定义布局。

## 黄金规则速查

1. **画布尺寸**: 固定 `13.333" × 7.5"`（LAYOUT_WIDE）
2. **安全区域**: `y=1.85` 到 `y=7.1`（共 5.25" 垂直空间）
3. **字体层级**: 封面标题 36pt → 幻灯片标题 26pt → 卡片标题 13-15pt → 正文 11-13pt → 脚注 9-10pt
4. **颜色来源**: 始终使用主题 `C` 对象（如 `C.navy`、`C.gold`），禁止内联硬编码
5. **中文字体**: `Microsoft YaHei`；英文: `Calibri`
6. **白底卡片**: 必须添加 `makeShadow()` 阴影
7. **图片嵌入**: 始终使用 `sizing: { type: "contain", w, h }` 防变形
8. **先填 Slide Contract 再写代码**: 没有 Role / Claim / Proof Object / Template / Source 的页面不生成
9. **受控升级不等于自由设计**: 必须基于 T1-T16，保留 pptxgenjs、主题、页眉页脚、安全区和渲染 QA

## 参考索引

| 需要了解... | 阅读文件 |
|-------------|----------|
| 配色方案、主题表、品牌色定制 | `references/themes.md` |
| 场景 preset、推荐页数、默认页面序列 | `references/presets.md` |
| Slide Contract、受控升级、回退规则 | `references/slide-contract.md` |
| 16 种页面模板的视觉草图 + 代码片段 | `references/page-templates.md` |
| 环境配置 (NODE_PATH, npm install, OS 转换脚本) | `references/pipeline.md` |
| 7 项 QA 检查清单 | `references/qa-checklist.md` |
| Contact-sheet 规则、整套 Deck QA | `references/deck-qa-checklist.md` |
| 常见 Bug 与修复方案 | `references/troubleshooting.md` |
| 完整启动模板 | `assets/boilerplate.js` |
| 最小完整示例 | `assets/example_minimal.js` |

## 触发关键词

当用户提及以下内容时自动调用本 Skill：

- 做PPT、PPT、幻灯片、slides、deck、presentation
- 答辩、汇报、演讲稿、课件
- 将论文/报告/文档转换为幻灯片

---

**提示**: 优秀的演示文稿是**决策树**，而非信息堆砌。每页幻灯片应回答一个问题并自然引导至下一页。如果一页塞了 6 个想法，拆分它；如果一页没有提供新信息，删除它。观众的注意力每页只有 60 秒 —— 让它产生价值。
