export enum Platform {
  YouTube = 'YouTube',
  TikTok = 'TikTok',
  InstagramReels = 'Instagram Reels',
  YouTubeShorts = 'YouTube Shorts',
  LinkedInVideo = 'LinkedIn Video'
}

export enum VideoLength {
  Short = 'Short (< 60s)',
  Medium = 'Medium (1-5 mins)',
  Long = 'Long (10+ mins)'
}

export interface VideoConfig {
  niche: string;
  platform: Platform;
  tone: string;
  length: VideoLength;
  audience: string;
}

export interface GeneratedContent {
  idea: string;
  hook: string;
  script: string;
  thumbnail: string;
  titles: string[];
  hashtags: string[];
  cta: string;
}

export interface FormProps {
  onSubmit: (config: VideoConfig) => void;
  isLoading: boolean;
}

export interface ResultProps {
  content: GeneratedContent;
  onReset: () => void;
}
