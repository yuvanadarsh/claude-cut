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

### Phase 2 — Project Backend (coming)
- [ ] Filesystem project CRUD
- [ ] Clip folder scanning
- [ ] Thumbnail generation via FFmpeg

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
- An Anthropic API key (for script generation in Phase 3+)

## Setup

**1. Clone the repo**

```bash
git clone https://github.com/yuvanadarsh/claude-cut
cd claude-cut
```

**2. Create your environment file**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
PROCESSOR_URL=http://processor:8000
CLIPS_BASE_PATH=/clips
```

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
│   │   └── api/                # API routes (Phase 2+)
│   ├── components/
│   │   ├── ui/                 # Button, Input, Card, Badge, Skeleton
│   │   ├── layout/             # Sidebar, TopBar
│   │   ├── dashboard/          # ProjectCard
│   │   └── editor/             # ScriptPanel, ClipPanel, EffectsBar, ...
│   └── types/index.ts          # all TypeScript interfaces
└── processor/                  # Python FastAPI sidecar (Phase 4)
```

## Screenshots

> Phase 1 UI shell — screenshots coming after local verification

## License

MIT
