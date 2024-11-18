export interface Resource {
    id: number;
    title: string;
    url: string;
    company: string;
    slug:string;
    author: string;
    description: string;
    category: string;
    type: string;
    platform: string;
    tags: string[];
    thumbnail_url: string | null;
    published_at: string;
    video_url: string | null;
    video_flag: boolean;
  }

