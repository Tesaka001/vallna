// Vallna — database types
// Hand-authored to mirror supabase/migrations. Regenerate after linking a project:
//   npx supabase gen types typescript --linked > src/lib/supabase/types.ts
// Source of truth: _docs/01_vallna_technical_design_v1_3.md §5

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type SubscriptionTier = "free" | "pro" | "premium";
export type NotificationPreference = "email" | "push" | "both" | "none";
export type ReportType = "daily" | "weekly" | "monthly";

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          display_name: string | null;
          subscription_tier: SubscriptionTier;
          onboarding_complete: boolean;
          notification_preference: NotificationPreference;
          timezone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          display_name?: string | null;
          subscription_tier?: SubscriptionTier;
          onboarding_complete?: boolean;
          notification_preference?: NotificationPreference;
          timezone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string | null;
          subscription_tier?: SubscriptionTier;
          onboarding_complete?: boolean;
          notification_preference?: NotificationPreference;
          timezone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      astro_profiles: {
        Row: {
          id: string;
          user_id: string;
          birth_date: string;
          birth_time: string | null;
          birth_location: string | null;
          birth_lat: number | null;
          birth_lng: number | null;
          sun_sign: string | null;
          moon_sign: string | null;
          rising_sign: string | null;
          dreamspell_kin: number | null;
          dreamspell_seal: string | null;
          dreamspell_tone: number | null;
          dreamspell_wavespell: string | null;
          profile_json: Json | null;
          computed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          birth_date: string;
          birth_time?: string | null;
          birth_location?: string | null;
          birth_lat?: number | null;
          birth_lng?: number | null;
          sun_sign?: string | null;
          moon_sign?: string | null;
          rising_sign?: string | null;
          dreamspell_kin?: number | null;
          dreamspell_seal?: string | null;
          dreamspell_tone?: number | null;
          dreamspell_wavespell?: string | null;
          profile_json?: Json | null;
          computed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          birth_date?: string;
          birth_time?: string | null;
          birth_location?: string | null;
          birth_lat?: number | null;
          birth_lng?: number | null;
          sun_sign?: string | null;
          moon_sign?: string | null;
          rising_sign?: string | null;
          dreamspell_kin?: number | null;
          dreamspell_seal?: string | null;
          dreamspell_tone?: number | null;
          dreamspell_wavespell?: string | null;
          profile_json?: Json | null;
          computed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "astro_profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      onboarding_surveys: {
        Row: {
          id: string;
          user_id: string;
          responses: Json | null;
          self_perception_score: number | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          responses?: Json | null;
          self_perception_score?: number | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          responses?: Json | null;
          self_perception_score?: number | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "onboarding_surveys_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      journal_entries: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          entry_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          entry_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          entry_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "journal_entries_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tracking_categories: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          emoji: string | null;
          is_active: boolean;
          display_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          emoji?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          emoji?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tracking_categories_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      daily_grades: {
        Row: {
          id: string;
          user_id: string;
          category_id: string;
          grade: number;
          note: string | null;
          grade_date: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          category_id: string;
          grade: number;
          note?: string | null;
          grade_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          category_id?: string;
          grade?: number;
          note?: string | null;
          grade_date?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "daily_grades_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "daily_grades_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "tracking_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      reports: {
        Row: {
          id: string;
          user_id: string;
          report_type: ReportType;
          period_start: string;
          period_end: string;
          content: string | null;
          recommendations: Json | null;
          model_used: string | null;
          tokens_used: number | null;
          generated_at: string;
          delivered_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          report_type: ReportType;
          period_start: string;
          period_end: string;
          content?: string | null;
          recommendations?: Json | null;
          model_used?: string | null;
          tokens_used?: number | null;
          generated_at?: string;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          report_type?: ReportType;
          period_start?: string;
          period_end?: string;
          content?: string | null;
          recommendations?: Json | null;
          model_used?: string | null;
          tokens_used?: number | null;
          generated_at?: string;
          delivered_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reports_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      usage_costs: {
        Row: {
          id: string;
          user_id: string;
          operation: string;
          model: string;
          input_tokens: number | null;
          output_tokens: number | null;
          cost_usd: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          operation: string;
          model: string;
          input_tokens?: number | null;
          output_tokens?: number | null;
          cost_usd?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          operation?: string;
          model?: string;
          input_tokens?: number | null;
          output_tokens?: number | null;
          cost_usd?: number | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "usage_costs_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      referrals: {
        Row: {
          id: string;
          referrer_user_id: string;
          referred_email: string | null;
          referred_user_id: string | null;
          converted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          referrer_user_id: string;
          referred_email?: string | null;
          referred_user_id?: string | null;
          converted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          referrer_user_id?: string;
          referred_email?: string | null;
          referred_user_id?: string | null;
          converted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "referrals_referrer_user_id_fkey";
            columns: ["referrer_user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "referrals_referred_user_id_fkey";
            columns: ["referred_user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};

type PublicSchema = Database["public"];

export type Tables<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Row"];
export type TablesInsert<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof PublicSchema["Tables"]> =
  PublicSchema["Tables"][T]["Update"];
