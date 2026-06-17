export type NoticeType = 'release' | 'update' | 'bugfix' | 'roadmap' | 'support';

export interface Notice {
  id: string;
  type: NoticeType;
  title: string;
  description: string | null;
  app_name: string | null;
  version: string | null;
  date: string;
  status: 'published' | 'draft';
  created_at: string;
}
