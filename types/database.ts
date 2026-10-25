/**
 * Database types, mirroring supabase/migrations. After changing the schema,
 * regenerate with: npx supabase gen types typescript --linked > types/database.ts
 */
export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  role: string | null;
  year: string | null;
  organization: string | null;
  short_description: string;
  overview: string | null;
  problem: string | null;
  role_detail: string | null;
  solution: string | null;
  process: string | null;
  learnings: string | null;
  outcome: string | null;
  features: string[];
  feature_images: string[];
  stack: string[];
  tags: string[];
  project_url: string | null;
  github_url: string | null;
  thumbnail_url: string | null;
  aspect_ratio: string;
  show_features: boolean;
  featured: boolean;
  status: 'draft' | 'published';
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ExperienceRow = {
  id: string;
  kind: 'work' | 'leadership' | 'education';
  role: string;
  company: string;
  location: string | null;
  date_label: string;
  start_date: string | null;
  end_date: string | null;
  current: boolean;
  summary: string;
  bullets: string[];
  tags: string[];
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ContactMessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  ip_hash: string | null;
  user_agent: string | null;
  read: boolean;
  created_at: string;
};

type Insert<Row, Optional extends keyof Row> = Omit<Row, Optional> & Partial<Pick<Row, Optional>>;

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: ProjectRow;
        Insert: Insert<
          ProjectRow,
          | 'id'
          | 'created_at'
          | 'updated_at'
          | 'featured'
          | 'status'
          | 'sort_order'
          | 'features'
          | 'feature_images'
          | 'stack'
          | 'tags'
          | 'aspect_ratio'
          | 'show_features'
          | 'role'
          | 'year'
          | 'organization'
          | 'overview'
          | 'problem'
          | 'role_detail'
          | 'solution'
          | 'process'
          | 'learnings'
          | 'outcome'
          | 'project_url'
          | 'github_url'
          | 'thumbnail_url'
        >;
        Update: Partial<ProjectRow>;
        Relationships: [];
      };
      experiences: {
        Row: ExperienceRow;
        Insert: Insert<
          ExperienceRow,
          | 'id'
          | 'created_at'
          | 'updated_at'
          | 'location'
          | 'start_date'
          | 'end_date'
          | 'current'
          | 'bullets'
          | 'tags'
          | 'published'
          | 'sort_order'
        >;
        Update: Partial<ExperienceRow>;
        Relationships: [];
      };
      contact_messages: {
        Row: ContactMessageRow;
        Insert: Insert<ContactMessageRow, 'id' | 'created_at' | 'read' | 'subject' | 'ip_hash' | 'user_agent'>;
        Update: Partial<ContactMessageRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
