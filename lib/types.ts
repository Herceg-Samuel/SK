// Global types for Herceg

export interface Post {
  _id: string;
  authorDid: string;
  slug: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface BangerItem {
  _id: string;
  title: string;
  description: string;
  url: string;
  category: "article" | "project" | "person" | "tool" | "podcast" | "comedian";
  author?: string;
  featured: boolean;
  addedAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PostsListResponse extends ApiResponse<Post[]> {
  pagination?: PaginationMeta;
}

export interface BangersListResponse extends ApiResponse<BangerItem[]> {}

export type Category =
  | "article"
  | "project"
  | "person"
  | "tool"
  | "podcast"
  | "comedian";

export const BANGER_CATEGORIES: Record<Category, string> = {
  article: "Articles",
  project: "Projects",
  person: "People",
  tool: "Tools",
  podcast: "Podcasts",
  comedian: "Comedians",
};
