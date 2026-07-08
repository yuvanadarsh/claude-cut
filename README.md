# claude-cut

A local-first, open-source AI video editing pipeline for Instagram Reels creators. Generates scripts, transcribes recordings, assigns b-roll clips to script sections, applies effects, burns subtitles, and exports finished vertical video — all running locally via Docker with no recurring costs except Anthropic API calls for script/caption generation.

## Features

### Phase 1 — UI Shell ✅
- [x] Full design system (dark theme, CSS variables, Space Grotesk + JetBrains Mono)
- [x] Dashboard with project cards
- [x] New Project 3-step creation flow
- [x] Project Editor — split ScriptPanel / ClipPanel view
- [x] Script generation screen with tone selector
- [x] Export screen with subtitle settings and progress indicator
- [x] Sidebar navigation + TopBar layout

### Phase 2 — Project Backend ✅
- [x] Filesystem project CRUD (~/.claude-cut/projects/)
- [x] Clip folder scanning
- [x] Thumbnail generation via FFmpeg
- [x] Dashboard, new project flow, and editor wired to real data (no mock data)

### Phase 3 — Script Generation (coming)
- [ ] Anthropic Claude API integration
- [ ] Script generation (topic + format + tone → hook + sections + caption + hashtags)

### Phase 4 — Recording + Transcription (coming)
- [ ] Python FastAPI sidecar (Whisper)
- [ ] Word-level timestamps
- [ ] Clip assignment UI

### Phase 5 — Assembly + Export (coming)
- [ ] FFmpeg assembly pipeline
- [ ] Zoom punch, ken-burns, speed-ramp effects
- [ ] Subtitle burning
- [ ] Export to 1080x1920 vertical MP4

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Mac)
- [ffmpeg](https://ffmpeg.org/) installed on the host machine and available in `PATH` — `brew install ffmpeg` (ffprobe comes bundled with it; used for thumbnail generation and clip duration)
- An Anthropic API key (for script generation in Phase 3+)

## Setup

**1. Clone the repo**

```bash
git clone https://github.com/yuvanadarsh/claude-cut
cd claude-cut
```

**2. Create your environment file**

```bash
cp .env.example .env
```

> **Note:** Docker Compose only reads variables for `${VAR}` substitution in `docker-compose.yml` from a file literally named `.env` in the project root — it does **not** read `.env.local`. The app itself (Next.js) reads both, but for the `CLIPS_BASE_PATH` volume mount below to work, the value must live in `.env`. If you keep secrets in `.env.local`, also copy `CLIPS_BASE_PATH` into `.env` (or symlink one to the other).

Edit `.env` and add your Anthropic API key and clips folder:

```
ANTHROPIC_API_KEY=sk-ant-...
PROCESSOR_URL=http://processor:8000
CLIPS_BASE_PATH=/Users/yourname/Movies
```

`CLIPS_BASE_PATH` should be the **parent folder** containing your project clip folders on your host machine — for example, if your clips live at `/Users/yourname/Movies/NYC_Vlog`, set `CLIPS_BASE_PATH=/Users/yourname/Movies`. This path is bind-mounted into the `web` container at the same path so the app can read clips from folders you select at that location or below.

**3. Start with Docker**

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000)

That's it. Docker handles Node.js, dependencies, and hot reload.

## Project Structure

```
claude-cut/
├── docker-compose.yml          # starts web service (+ processor in Phase 4)
├── .env.example                # copy to .env.local
├── web/                        # Next.js 14 App Router
│   ├── app/
│   │   ├── page.tsx            # dashboard
│   │   ├── projects/
│   │   │   ├── new/page.tsx    # new project flow
│   │   │   └── [id]/
│   │   │       ├── page.tsx    # project editor
│   │   │       ├── script/     # script generation
│   │   │       └── export/     # export settings
│   │   └── api/                # API routes — projects CRUD, clip scanning, thumbnails
│   ├── components/
│   │   ├── ui/                 # Button, Input, Card, Badge, Skeleton
│   │   ├── layout/              # Sidebar, TopBar
│   │   ├── dashboard/           # ProjectCard
│   │   └── editor/              # ScriptPanel, ClipPanel, EffectsBar, ...
│   ├── lib/
│   │   ├── projects.ts          # filesystem CRUD for projects (~/.claude-cut/)
│   │   ├── clips.ts             # scans a folder for video files
│   │   └── ffmpeg.ts            # duration + thumbnail extraction via ffprobe/ffmpeg
│   └── types/index.ts          # all TypeScript interfaces
└── processor/                  # Python FastAPI sidecar (Phase 4)
```

## Screenshots

> Phase 1 UI shell — screenshots coming after local verification

## License

MIT
