# Graph Report - .  (2026-05-31)

## Corpus Check
- Large corpus: 58 files · ~1,434,380 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder.

## Summary
- 234 nodes · 326 edges · 26 communities (15 shown, 11 thin omitted)
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.81)
- Token cost: 21,200 input · 5,700 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Animation & Motion System|Animation & Motion System]]
- [[_COMMUNITY_Terminal UI & Navigation|Terminal UI & Navigation]]
- [[_COMMUNITY_Project Data Model & Display|Project Data Model & Display]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Case Study Pages|Case Study Pages]]
- [[_COMMUNITY_Package Dependencies|Package Dependencies]]
- [[_COMMUNITY_AI Workflow Lab|AI Workflow Lab]]
- [[_COMMUNITY_CV & Credentials|CV & Credentials]]
- [[_COMMUNITY_CWL Editor & ML Skills|CWL Editor & ML Skills]]
- [[_COMMUNITY_Page Assembly & Types|Page Assembly & Types]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_App Routes & Layout|App Routes & Layout]]
- [[_COMMUNITY_AgentOps Screenshots|AgentOps Screenshots]]
- [[_COMMUNITY_Root Layout & Fonts|Root Layout & Fonts]]
- [[_COMMUNITY_Config Files|Config Files]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_TSConfig Root|TSConfig Root]]
- [[_COMMUNITY_ESLint Root|ESLint Root]]
- [[_COMMUNITY_Type Definitions|Type Definitions]]
- [[_COMMUNITY_Work Experience Type|Work Experience Type]]
- [[_COMMUNITY_Skill Group Type|Skill Group Type]]
- [[_COMMUNITY_Pipeline Type|Pipeline Type]]
- [[_COMMUNITY_Model Entry Type|Model Entry Type]]
- [[_COMMUNITY_Button Component|Button Component]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `cn()` - 13 edges
3. `Francesco Sardo` - 10 edges
4. `SectionLabel()` - 9 edges
5. `stagger` - 9 edges
6. `Experience()` - 7 edges
7. `AILab()` - 7 edges
8. `fadeUp` - 7 edges
9. `CWL Visual Workflow Editor` - 7 edges
10. `AgentOps Dashboard - Claude Code agent management tool` - 6 edges

## Surprising Connections (you probably didn't know these)
- `package.json — Project Manifest` --references--> `next.config.ts — Next.js Configuration`  [INFERRED]
  package.json → next.config.ts
- `postcss.config.mjs — PostCSS / Tailwind Config` --references--> `package.json — Project Manifest`  [INFERRED]
  postcss.config.mjs → package.json
- `RootLayout — App Root Layout` --references--> `next.config.ts — Next.js Configuration`  [INFERRED]
  src/app/layout.tsx → next.config.ts
- `Project Data Model` --semantically_similar_to--> `Work Experience Data Model`  [INFERRED] [semantically similar]
  src/lib/projects.ts → src/lib/experience.ts
- `CWL Visual Workflow Editor` --implements--> `Thesis: Visual Editor for CWL Scientific Workflows`  [INFERRED]
  public/img/cwl-editor-layout.png → public/pdf/Francesco_sardo_CV.pdf

## Hyperedges (group relationships)
- **All Three Case Study Pages Share CaseStudyLayout Pattern** — app_cwleditor_page, app_bloomticket_page, app_agentops_page, concept_casestudylayout [EXTRACTED 1.00]
- **UI Primitives Collectively Express Terminal/Monospace Design Language** — ui_terminalwindow, ui_sectionlabel, ui_typewritertext, ui_techbadge, concept_terminaldesignlanguage [INFERRED 0.85]
- **Project Type Definition Drives UI Rendering (StatusDot, TechBadge, StatCard)** — types_project, ui_statusdot, ui_techbadge, ui_statcard [INFERRED 0.80]
- **Sections consuming framer-motion variants from lib/motion** — sections_experience_experience, sections_about_about, sections_certifications_certifications, lib_motion_stagger, lib_motion_fadeup, lib_motion_slideleft [EXTRACTED 1.00]
- **Project data flows from lib to card and case study layout** — lib_projects_projects, projects_projectcard_projectcard, projects_casestudylayout_casestudylayout, concept_project_data_model [INFERRED 0.85]
- **AILab renders three panels from parallel static data sources** — sections_ailab_tool_feed, sections_ailab_pipelines, sections_ailab_models, sections_ailab_ailab [EXTRACTED 1.00]
- **CWL Editor visual assets (thesis diagrams and UI screenshots)** — concept_cwl_editor, img_fig1_1_overview_sistemae, img_fig3_2_layout_ui, img_fig4_1_cwlnode_anatomy, public_img_cwl_editor_layout, public_img_cwl_system_overview, public_img_cwl_node_anatomy, cv_thesis_cwl_visual_editor [INFERRED 0.95]
- **AgentOps Dashboard screenshots (commands, projects, main dashboard)** — concept_agentops_dashboard, img_agent_dash1_commands, img_agent_dash2_projects, img_agent_dash3_dashboard, public_img_agent_dash1, public_img_agent_dash2, public_img_agent_dash3 [EXTRACTED 1.00]
- **Francesco Sardo core technical stack** — cv_person_francesco_sardo, cv_skills_typescript, cv_skills_react, cv_skills_spring_boot, cv_skills_docker_k8s, cv_skills_nextjs, cv_skills_reactflow, cv_skills_machine_learning [EXTRACTED 1.00]

## Communities (26 total, 11 thin omitted)

### Community 0 - "Animation & Motion System"
Cohesion: 0.17
Nodes (19): Framer Motion Animation Variants Pattern, Work Experience Data Model, experience, fadeIn, fadeUp, scaleIn, slideLeft, stagger (+11 more)

### Community 1 - "Terminal UI & Navigation"
Cohesion: 0.13
Nodes (14): Neofetch Terminal UI Pattern, Footer(), NAV_LINKS, Navbar(), Contact(), CONTACT_LINES, Education(), MSC_COURSES (+6 more)

### Community 2 - "Project Data Model & Display"
Cohesion: 0.14
Nodes (17): Project Data Model, getProject(), projects, cn(), ProjectCard(), ProjectCardProps, Project, Button() (+9 more)

### Community 3 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 4 - "Case Study Pages"
Cohesion: 0.12
Nodes (13): IMAGES, metadata, METRICS, IMAGES, metadata, METRICS, IMAGES, metadata (+5 more)

### Community 5 - "Package Dependencies"
Cohesion: 0.11
Nodes (18): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+10 more)

### Community 6 - "AI Workflow Lab"
Cohesion: 0.18
Nodes (13): AI Workflow Lab Section Concept, AILab(), MAIN_TOOLS, MainTool, MODELS, PIPELINES, TAGS, TOOL_COLORS (+5 more)

### Community 7 - "CV & Credentials"
Cohesion: 0.15
Nodes (13): Certification: Building with the Claude API - Anthropic 2026, Certification: Claude in Action - Anthropic 2026, BSc Computer Science - University of Turin, Full Stack Developer at Impero Soft SRLS, Shopify Developer at Excelsior Group SRL, UI Developer at Linfa SRL, Francesco Sardo, BloomTicket - Mobile App (iOS & Android) (+5 more)

### Community 8 - "CWL Editor & ML Skills"
Cohesion: 0.21
Nodes (12): CWL Visual Workflow Editor, MSc Computer Science (AI) - University of Turin, Machine Learning / Deep Learning / Computer Vision, ReactFlow, TypeScript, Thesis: Visual Editor for CWL Scientific Workflows, CWL Editor - Log Analysis Pipeline System Overview, CWL Editor - BAM Processing Pipeline UI Layout (+4 more)

### Community 9 - "Page Assembly & Types"
Cohesion: 0.20
Nodes (11): Home Page — Portfolio Landing Page, Animate-on-scroll / In-view Animation Pattern, Terminal / Monospace Design Language, Projects Section — Portfolio Projects Grid, Project Interface, SectionLabel — Section Heading Label UI Component, StatCard — Animated Metric Card UI Component, StatusDot — Project Status Badge UI Component (+3 more)

### Community 10 - "Runtime Dependencies"
Cohesion: 0.18
Nodes (11): dependencies, clsx, framer-motion, lucide-react, next, next-themes, @radix-ui/react-slot, react (+3 more)

### Community 11 - "App Routes & Layout"
Cohesion: 0.32
Nodes (8): AgentOpsDashboardPage — AgentOps Dashboard Case Study, BloomTicketPage — BloomTicket Case Study, CWLEditorPage — CWL Visual Editor Case Study, ProjectsLayout — Shared Projects Layout, AgentOps Dashboard Architecture (Next.js + FastAPI + SQLite + PM2), BloomTicket React Native Architecture (Firebase + Redux + Laravel + Stripe), CaseStudyLayout — Shared Case Study Page Layout Pattern, CWL YAML ↔ Redux ↔ ReactFlow Bidirectional Pipeline

### Community 12 - "AgentOps Screenshots"
Cohesion: 0.43
Nodes (7): AgentOps Dashboard - Claude Code agent management tool, AgentOps Dashboard - Commands Panel Screenshot, AgentOps Dashboard - Projects List Screenshot, AgentOps Dashboard - Main Dashboard Screenshot, AgentOps Dashboard - Commands Panel (public), AgentOps Dashboard - Projects List (public), AgentOps Dashboard - Main Dashboard (public)

### Community 13 - "Root Layout & Fonts"
Cohesion: 0.40
Nodes (3): inter, jetbrainsMono, metadata

### Community 14 - "Config Files"
Cohesion: 0.50
Nodes (4): RootLayout — App Root Layout, next.config.ts — Next.js Configuration, package.json — Project Manifest, postcss.config.mjs — PostCSS / Tailwind Config

## Knowledge Gaps
- **106 isolated node(s):** `config`, `name`, `version`, `private`, `dev` (+101 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `TechBadge()` connect `Project Data Model & Display` to `Animation & Motion System`, `Case Study Pages`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `cn()` connect `Project Data Model & Display` to `Animation & Motion System`, `Terminal UI & Navigation`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `SectionLabel()` connect `Animation & Motion System` to `Terminal UI & Navigation`, `Project Data Model & Display`, `AI Workflow Lab`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `config`, `name`, `version` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Terminal UI & Navigation` be split into smaller, more focused modules?**
  _Cohesion score 0.13043478260869565 - nodes in this community are weakly interconnected._
- **Should `Project Data Model & Display` be split into smaller, more focused modules?**
  _Cohesion score 0.14130434782608695 - nodes in this community are weakly interconnected._
- **Should `TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._