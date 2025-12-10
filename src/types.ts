export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  type: string;
  tech: string[];
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Blockchain' | 'Web' | 'Game' | 'Fintech';
  description: string;
  tech: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
}

export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  PROJECTS = 'PROJECTS',
  BLOG = 'BLOG',
  AI_CHAT = 'AI_CHAT',
  ADMIN = 'ADMIN'
}

export interface SystemStats {
  fps: number;
  latency: number;
  memory: number;
}
