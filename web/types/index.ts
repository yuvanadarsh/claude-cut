export type ProjectFormat = "on-camera" | "voiceover" | "hybrid";
export type ProjectStatus = "draft" | "scripted" | "recorded" | "assembled" | "exported";
export type ClipType = "broll" | "recording" | "audio";
export type EffectType = "zoom-punch" | "ken-burns" | "speed-ramp" | "fade" | "jump-cut";

export interface Project {
  id: string;
  name: string;
  format: ProjectFormat;
  status: ProjectStatus;
  clipsFolder: string;
  createdAt: string;
  updatedAt: string;
  script?: Script;
  assembly?: Assembly;
}

export interface Script {
  topic: string;
  hook: string;
  sections: ScriptSection[];
  caption: string;
  hashtags: string[];
}

export interface ScriptSection {
  id: string;
  index: number;
  text: string;
  durationSeconds: number;
  assignedClipId?: string;
  clipStartTime?: number;
  clipEndTime?: number;
  effects: EffectType[];
}

export interface Clip {
  id: string;
  filename: string;
  absolutePath: string;
  type: ClipType;
  durationSeconds: number;
  thumbnailPath?: string;
  description?: string;
}

export interface Assembly {
  recordingPath?: string;
  transcription?: Transcription;
  clips: Clip[];
  outputPath?: string;
}

export interface Transcription {
  fullText: string;
  words: TranscriptionWord[];
}

export interface TranscriptionWord {
  word: string;
  start: number;
  end: number;
}

export interface ExportSettings {
  resolution: "1080x1920";
  fps: 30 | 60;
  quality: "draft" | "standard" | "high";
  burnSubtitles: boolean;
  subtitleStyle: SubtitleStyle;
}

export interface SubtitleStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  backgroundColor: string;
  position: "bottom" | "center" | "top";
}
