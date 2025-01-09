export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      challenge_scores: {
        Row: {
          challenge_token: string
          winning_player_id: string | null
          winning_score: number | null
        }
        Insert: {
          challenge_token: string
          winning_player_id?: string | null
          winning_score?: number | null
        }
        Update: {
          challenge_token?: string
          winning_player_id?: string | null
          winning_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "challenge_scores_challenge_token_fkey"
            columns: ["challenge_token"]
            isOneToOne: true
            referencedRelation: "challenges"
            referencedColumns: ["challenge_token"]
          },
          {
            foreignKeyName: "challenge_scores_winning_player_id_fkey"
            columns: ["winning_player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
        ]
      }
      challenges: {
        Row: {
          challenge_token: string
          created_at: string | null
          forbid_moving: boolean
          forbid_rotating: boolean
          forbid_zooming: boolean
          map: string
          rounds: number
          time_limit: number
        }
        Insert: {
          challenge_token: string
          created_at?: string | null
          forbid_moving: boolean
          forbid_rotating: boolean
          forbid_zooming: boolean
          map: string
          rounds: number
          time_limit: number
        }
        Update: {
          challenge_token?: string
          created_at?: string | null
          forbid_moving?: boolean
          forbid_rotating?: boolean
          forbid_zooming?: boolean
          map?: string
          rounds?: number
          time_limit?: number
        }
        Relationships: []
      }
      player: {
        Row: {
          created_at: string | null
          pin_url: string | null
          player_id: string
          player_name: string
        }
        Insert: {
          created_at?: string | null
          pin_url?: string | null
          player_id: string
          player_name: string
        }
        Update: {
          created_at?: string | null
          pin_url?: string | null
          player_id?: string
          player_name?: string
        }
        Relationships: []
      }
      player_challenge_scores: {
        Row: {
          challenge_token: string
          player_id: string
          total_score: number | null
        }
        Insert: {
          challenge_token: string
          player_id: string
          total_score?: number | null
        }
        Update: {
          challenge_token?: string
          player_id?: string
          total_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "player_challenge_scores_challenge_token_fkey"
            columns: ["challenge_token"]
            isOneToOne: false
            referencedRelation: "challenges"
            referencedColumns: ["challenge_token"]
          },
          {
            foreignKeyName: "player_challenge_scores_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "player"
            referencedColumns: ["player_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_best_rounds: {
        Args: Record<PropertyKey, never>
        Returns: {
          created_at: string
          challenge_token: string
          player_id: string
          player_name: string
          pin_url: string
          total_score: number
        }[]
      }
      get_latest_challenge: {
        Args: Record<PropertyKey, never>
        Returns: {
          challenge_token: string
          created_at: string | null
          forbid_moving: boolean
          forbid_rotating: boolean
          forbid_zooming: boolean
          map: string
          rounds: number
          time_limit: number
        }
      }
      get_overall_standings: {
        Args: Record<PropertyKey, never>
        Returns: {
          player_id: string
          player_name: string
          pin_url: string
          victories: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
