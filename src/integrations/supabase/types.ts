export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_boost_plans: {
        Row: {
          active: boolean
          created_at: string
          extra_daily_requests: number
          extra_daily_tokens: number
          id: string
          monthly_token_cap: number
          name: string
          price_display: string
          slug: string
          stripe_price_id: string
          stripe_product_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          extra_daily_requests: number
          extra_daily_tokens: number
          id?: string
          monthly_token_cap: number
          name: string
          price_display: string
          slug: string
          stripe_price_id: string
          stripe_product_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          extra_daily_requests?: number
          extra_daily_tokens?: number
          id?: string
          monthly_token_cap?: number
          name?: string
          price_display?: string
          slug?: string
          stripe_price_id?: string
          stripe_product_id?: string
        }
        Relationships: []
      }
      ai_limits: {
        Row: {
          daily_request_limit: number
          daily_token_limit: number
          id: string
          min_interval_seconds: number
          tier: string
          updated_at: string
        }
        Insert: {
          daily_request_limit: number
          daily_token_limit: number
          id?: string
          min_interval_seconds?: number
          tier: string
          updated_at?: string
        }
        Update: {
          daily_request_limit?: number
          daily_token_limit?: number
          id?: string
          min_interval_seconds?: number
          tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      ai_usage_daily: {
        Row: {
          created_at: string
          grammar_assistant_count: number
          grammar_drill_count: number
          id: string
          last_used_at: string | null
          total_tokens_estimate: number
          usage_date: string
          user_id: string
        }
        Insert: {
          created_at?: string
          grammar_assistant_count?: number
          grammar_drill_count?: number
          id?: string
          last_used_at?: string | null
          total_tokens_estimate?: number
          usage_date?: string
          user_id: string
        }
        Update: {
          created_at?: string
          grammar_assistant_count?: number
          grammar_drill_count?: number
          id?: string
          last_used_at?: string | null
          total_tokens_estimate?: number
          usage_date?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
          welcome_email_sent: boolean
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
          welcome_email_sent?: boolean
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          welcome_email_sent?: boolean
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          active: boolean
          code: string
          created_at: string
          id: string
          referrer_email: string | null
          referrer_name: string
          stripe_coupon_id: string
        }
        Insert: {
          active?: boolean
          code: string
          created_at?: string
          id?: string
          referrer_email?: string | null
          referrer_name: string
          stripe_coupon_id: string
        }
        Update: {
          active?: boolean
          code?: string
          created_at?: string
          id?: string
          referrer_email?: string | null
          referrer_name?: string
          stripe_coupon_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          converted: boolean
          converted_at: string | null
          created_at: string
          id: string
          referral_code_id: string
          referred_user_id: string
          stripe_session_id: string | null
        }
        Insert: {
          converted?: boolean
          converted_at?: string | null
          created_at?: string
          id?: string
          referral_code_id: string
          referred_user_id: string
          stripe_session_id?: string | null
        }
        Update: {
          converted?: boolean
          converted_at?: string | null
          created_at?: string
          id?: string
          referral_code_id?: string
          referred_user_id?: string
          stripe_session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_progress: {
        Row: {
          a1_checkpoint_passed: boolean
          a1_checkpoint_score: Json | null
          cards: Json
          current_lesson: number
          id: string
          last_practice_date: string | null
          lesson_steps_completed: Json | null
          lessons_completed: number[]
          quiz_results: Json
          streak: number
          streak_freezes: number
          total_words_learned: number
          updated_at: string
          user_id: string
        }
        Insert: {
          a1_checkpoint_passed?: boolean
          a1_checkpoint_score?: Json | null
          cards?: Json
          current_lesson?: number
          id?: string
          last_practice_date?: string | null
          lesson_steps_completed?: Json | null
          lessons_completed?: number[]
          quiz_results?: Json
          streak?: number
          streak_freezes?: number
          total_words_learned?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          a1_checkpoint_passed?: boolean
          a1_checkpoint_score?: Json | null
          cards?: Json
          current_lesson?: number
          id?: string
          last_practice_date?: string | null
          lesson_steps_completed?: Json | null
          lessons_completed?: number[]
          quiz_results?: Json
          streak?: number
          streak_freezes?: number
          total_words_learned?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_email_by_username: { Args: { username: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
