export interface Paper {
  id: number;
  title: string;
  abstract: string;
  keywords: string[];
  ref_number: string;
  assigned: boolean;
  current_paper: boolean;
  author?: string;
  manuscript: string;
  pages?: number;
  status: string;
  area_id: number;
  user_id: number;
}
