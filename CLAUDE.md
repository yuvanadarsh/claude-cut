# CLAUDE.md — claude-cut

## What is this project

claude-cut is a local-first, open-source AI video editing pipeline for Instagram Reels creators.
It generates scripts, transcribes recordings, assigns b-roll clips to script sections, applies effects,
burns subtitles, and exports finished vertical video — all running locally via Docker with no recurring costs
except Anthropic API calls for script/caption generation.

## Repository

https://github.com/yuvanadarsh/claude-cut

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API routes (Node.js) + Python FastAPI sidecar
- **Video processing:** FFmpeg (runs via child_process in API routes or Python sidecar)
- **Transcription:** OpenAI Whisper (open source, runs locally via Python sidecar, free)
- **Script generation:** Anthropic Claude API (claude-sonnet-4-6, pay-per-use, configured via .env)
- **Storage:** Local filesystem only — no database, no cloud
- **Containerization:** Docker + Docker Compose (single command to start everything)
- **State management:** React useState/useReducer — no external state library
- **File handling:** Node.js fs module + volume mounts via Docker

## Architecture — Two Services in Docker Compose

```
docker-compose up
├── web (Next.js — port 3000)
│   ├── All UI pages and components
│   └── API routes for project management and Claude API calls
└── processor (Python FastAPI — port 8000)
    ├── /transcribe — Whisper transcription
    ├── /process — FFmpeg video assembly
    └── /effects — FFmpeg effects application
```

Next.js calls the Python processor via internal Docker network: `http://processor:8000`

## Environment Variables (.env.local — never commit)

```
ANTHROPIC_API_KEY=your_key_here
PROCESSOR_URL=http://processor:8000
CLIPS_BASE_PATH=/clips  # Docker volume mount path
```

## Git Workflow

- `main` — always working, always deployable
- `feat/feature-name` — one branch per session
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`
- PR from feat → main after each session
- Never commit .env.local or /clips volume data

## Design System

### Palette

```
--background:     #0A0A0A   /* near-black canvas */
--surface:        #111111   /* card/panel backgrounds */
--surface-raised: #1A1A1A   /* elevated surfaces, modals */
--border:         #222222   /* subtle dividers */
--border-active:  #333333   /* hover/focus borders */
--accent:         #E8FF47   /* electric yellow-green — primary action color */
--accent-dim:     #B8CC38   /* accent hover state */
--text-primary:   #F0F0F0   /* headings, labels */
--text-secondary: #777777   /* supporting text, timestamps */
--text-muted:     #444444   /* placeholders, disabled */
--destructive:    #FF4444   /* delete, error states */
--success:        #44FF88   /* export complete, success states */
```

### Typography

- **Display/Headings:** `Space Grotesk` (Google Fonts) — geometric, technical, not corporate
- **Body/UI:** `Inter` — clean and readable for labels, buttons, metadata
- **Monospace/Timestamps:** `JetBrains Mono` — for timecodes, file paths, script sections
- Type scale: 12 / 14 / 16 / 20 / 24 / 32 / 48px
- Font weights used: 400 (body), 500 (labels), 600 (headings), 700 (display only)

### Signature Element

The script editor uses a split-panel layout: left side shows the script with color-coded section blocks
(each section is a distinct muted color chip), right side shows the clip assigned to that section
with a live thumbnail. The connection between script section and clip is shown with a subtle
colored left-border that matches across both panels. This is the visual identity of the app.

### Component Rules

- Border radius: `6px` for cards/panels, `4px` for buttons/inputs, `2px` for tags
- Transitions: `150ms ease` for hover states, `200ms ease` for panel reveals
- No drop shadows — use borders and background contrast instead
- Icons: Lucide React only
- Loading states: skeleton shimmer using `--border` color, never spinners
- Empty states: always include an action button, never just text
- Buttons: primary uses `--accent` with `#000` text, secondary uses `--surface-raised` with `--text-primary`

## File Structure

```
claude-cut/
├── CLAUDE.md                        # this file
├── README.md                        # setup instructions, features checklist
├── docker-compose.yml               # starts web + processor
├── .env.local                       # never commit
├── .env.example                     # commit this — shows required vars
│
├── web/                             # Next.js app
│   ├── app/
│   │   ├── layout.tsx               # root layout, fonts, global styles
│   │   ├── page.tsx                 # dashboard — all projects
│   │   ├── projects/
│   │   │   ├── new/page.tsx         # new project creation flow
│   │   │   └── [id]/
│   │   │       ├── page.tsx         # project editor (main screen)
│   │   │       ├── script/page.tsx  # script generation screen
│   │   │       └── export/page.tsx  # export settings + progress
│   │   └── api/
│   │       ├── projects/route.ts    # CRUD for projects (filesystem)
│   │       ├── script/route.ts      # calls Anthropic API
│   │       └── processor/route.ts   # proxies to Python sidecar
│   ├── components/
│   │   ├── ui/                      # shared primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── TopBar.tsx
│   │   ├── dashboard/
│   │   │   └── ProjectCard.tsx
│   │   ├── editor/
│   │   │   ├── ScriptPanel.tsx      # left panel — script sections
│   │   │   ├── ClipPanel.tsx        # right panel — clip browser
│   │   │   ├── ScriptSection.tsx    # individual script section block
│   │   │   ├── ClipThumbnail.tsx    # individual clip card
│   │   │   ├── EffectsBar.tsx       # bottom bar — effects toggles
│   │   │   └── TimelinePreview.tsx  # read-only visual timeline strip
│   │   └── export/
│   │       └── ExportProgress.tsx
│   ├── lib/
│   │   ├── projects.ts              # filesystem read/write for projects
│   │   ├── anthropic.ts             # Claude API wrapper
│   │   └── processor.ts             # fetch wrapper for Python sidecar
│   └── types/
│       └── index.ts                 # all TypeScript interfaces (source of truth)
│
└── processor/                       # Python FastAPI sidecar
    ├── Dockerfile
    ├── requirements.txt
    ├── main.py                      # FastAPI app entry
    ├── whisper_service.py           # Whisper transcription
    ├── ffmpeg_service.py            # all FFmpeg operations
    └── effects_service.py           # zoom, cut, overlay logic
```

## Data Shapes (source of truth — types/index.ts)

```typescript
type ProjectFormat = "on-camera" | "voiceover" | "hybrid";
type ProjectStatus = "draft" | "scripted" | "recorded" | "assembled" | "exported";
type ClipType = "broll" | "recording" | "audio";
type EffectType = "zoom-punch" | "ken-burns" | "speed-ramp" | "fade" | "jump-cut";

interface Project {
  id: string; // uuid
  name: string;
  format: ProjectFormat;
  status: ProjectStatus;
  clipsFolder: string; // absolute path to user's clips folder
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  script?: Script;
  assembly?: Assembly;
}

interface Script {
  topic: string; // user's input prompt
  hook: string; // opening line
  sections: ScriptSection[];
  caption: string; // Instagram caption
  hashtags: string[];
}

interface ScriptSection {
  id: string;
  index: number;
  text: string; // the words spoken/narrated in this section
  durationSeconds: number; // estimated speaking time
  assignedClipId?: string; // which clip plays here
  clipStartTime?: number; // trim start within the clip (seconds)
  clipEndTime?: number; // trim end within the clip (seconds)
  effects: EffectType[];
}

interface Clip {
  id: string;
  filename: string;
  absolutePath: string;
  type: ClipType;
  durationSeconds: number;
  thumbnailPath?: string; // generated on import
  description?: string; // user can label clips for smart suggestions
}

interface Assembly {
  recordingPath?: string; // path to user's recorded audio/video
  transcription?: Transcription;
  clips: Clip[];
  outputPath?: string;
}

interface Transcription {
  fullText: string;
  words: TranscriptionWord[]; // word-level timestamps from Whisper
}

interface TranscriptionWord {
  word: string;
  start: number; // seconds
  end: number; // seconds
}

interface ExportSettings {
  resolution: "1080x1920"; // always vertical for Reels — no other option
  fps: 30 | 60;
  quality: "draft" | "standard" | "high";
  burnSubtitles: boolean;
  subtitleStyle: SubtitleStyle;
}

interface SubtitleStyle {
  fontFamily: string;
  fontSize: number;
  color: string; // hex
  backgroundColor: string; // hex with alpha
  position: "bottom" | "center" | "top";
}
```

Projects are stored as JSON files on the local filesystem:

```
~/.claude-cut/
├── projects/
│   ├── {project-id}.json       # Project object
│   └── {project-id}/
│       └── thumbnails/         # Generated clip thumbnails
```

## Pages — Exact Specs

### Dashboard (/)

- Top bar: "claude-cut" wordmark left, "New Project" button right (accent color)
- Grid of ProjectCards (3 columns desktop, 1 column mobile)
- ProjectCard shows: project name, format badge, status badge, clip count, last updated
- Empty state: centered, "No projects yet", "Create your first reel" button
- No sidebar on dashboard — full width

### New Project (/projects/new)

- 3-step flow (not separate pages — steps within the same page)
- Step 1: Project name input + format selector (3 cards: On Camera / Voiceover / Hybrid — each with icon and 1-line description)
- Step 2: Folder picker — "Select your clips folder" with a path input + browse button. Shows clip count once folder is selected.
- Step 3: Topic input — "What is this reel about?" textarea, 2-3 sentences max guidance shown
- "Create Project" button creates the project JSON and redirects to /projects/[id]

### Project Editor (/projects/[id])

- Sidebar left (240px): project name, status indicator, nav links (Script / Editor / Export)
- Main area: split panel
  - Left 55%: ScriptPanel — script sections stacked vertically, each as a block
  - Right 45%: ClipPanel — grid of clip thumbnails from the selected folder
- EffectsBar at bottom: toggles for effects applied to selected section
- TopBar: project name, "Generate Script" button (if no script), "Export" button

### Script Screen (/projects/[id]/script)

- Topic textarea (pre-filled from project creation)
- Format selector reminder (shows current format)
- Tone selector: Casual / Educational / Hype / Storytelling
- "Generate Script" button — calls /api/script
- Generated output shows hook, sections, caption, hashtags in read-only styled cards
- "Use This Script" → saves to project and redirects to editor
- "Regenerate" → calls API again

### Export Screen (/projects/[id]/export)

- Quality selector: Draft (fast) / Standard / High
- FPS toggle: 30 / 60
- Subtitle toggle + style options (font size, color, position)
- "Export Reel" button → calls processor
- Progress bar with status text ("Assembling clips...", "Burning subtitles...", "Finalizing...")
- When done: file path shown + "Open in Finder" button + caption text to copy

## Current Phase

**Phase 1 — UI Shell (Session 1)**

- [ ] Docker + docker-compose setup
- [ ] Next.js scaffold with design system (fonts, colors, global styles)
- [ ] Dashboard page
- [ ] New Project flow (3 steps, no backend logic yet — mock data)
- [ ] Project Editor shell (split panel layout, no clip loading yet)
- [ ] Script screen (form only, no API call yet)
- [ ] Export screen (UI only, no processing yet)
- [ ] Sidebar + TopBar layout components

**Phase 2 — Project Backend (Session 2)**

- [ ] Filesystem project CRUD (create, read, list)
- [ ] Folder scanning — read clips from selected folder
- [ ] Thumbnail generation via FFmpeg
- [ ] Project state persisted to ~/.claude-cut/

**Phase 3 — Script Generation (Session 3)**

- [ ] Anthropic API integration
- [ ] Script generation prompt (topic + format + tone → hook + sections + caption + hashtags)
- [ ] Script saved to project JSON

**Phase 4 — Recording + Transcription (Session 4)**

- [ ] Python FastAPI sidecar running in Docker
- [ ] Whisper transcription endpoint
- [ ] Word-level timestamp extraction
- [ ] Clip assignment UI (drag or click to assign clip to section)

**Phase 5 — Assembly + Export (Session 5)**

- [ ] FFmpeg assembly pipeline
- [ ] Effects application (zoom-punch, ken-burns, speed-ramp)
- [ ] Subtitle burning
- [ ] Export progress + output

## What NOT to Build Yet

- No user accounts, no auth, no cloud sync
- No drag-and-drop timeline (not building CapCut)
- No color grading beyond brightness/contrast presets
- No text animations or motion graphics
- No TTS (text-to-speech) — user records their own voice
- No mobile browser support (desktop only for now)
- No multi-user / collaboration features
- No audio mixing beyond volume adjustment
- No Playwright tests (too token-heavy for now)

## CLAUDE.md Rules

- Update at end of every session
- Check off completed phase items
- Add new components or decisions made during the session
- Never delete old content — strikethrough superseded items instead
- README and CLAUDE.md updated in the same commit at session end

## README Rules

- Keep features checklist in sync with phase checklist above
- Include: how to install Docker, how to clone and run, required .env vars
- Include screenshots once UI shell is built (Session 1 deliverable)
