export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      books: {
        Row: {
          articles: Json | null
          authors: Json | null
          count: number | null
          coverUrl: string | null
          id: number
          title: string | null
          url: string | null
        }
        Insert: {
          articles?: Json | null
          authors?: Json | null
          count?: number | null
          coverUrl?: string | null
          id?: number
          title?: string | null
          url?: string | null
        }
        Update: {
          articles?: Json | null
          authors?: Json | null
          count?: number | null
          coverUrl?: string | null
          id?: number
          title?: string | null
          url?: string | null
        }
        Relationships: []
      }
      journal: {
        Row: {
          content: string[]
          created_at: string
          id: number
          user_id: string
        }
        Insert: {
          content: string[]
          created_at?: string
          id?: number
          user_id?: string
        }
        Update: {
          content?: string[]
          created_at?: string
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      llm_response: {
        Row: {
          created_at: string
          id: number
          journal_id: number
          response: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          journal_id: number
          response?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          journal_id?: number
          response?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meals: {
        Row: {
          date: string | null
          food: string | null
          id: number
          nutrition_info: Json | null
          user_id: string | null
        }
        Insert: {
          date?: string | null
          food?: string | null
          id?: number
          nutrition_info?: Json | null
          user_id?: string | null
        }
        Update: {
          date?: string | null
          food?: string | null
          id?: number
          nutrition_info?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string | null
          createdAt: string
          id: string
          title: string | null
        }
        Insert: {
          content?: string | null
          createdAt?: string
          id: string
          title?: string | null
        }
        Update: {
          content?: string | null
          createdAt?: string
          id?: string
          title?: string | null
        }
        Relationships: []
      }
      "registered-users": {
        Row: {
          email: string
          id: string
          name: string
          password: string
        }
        Insert: {
          email: string
          id?: string
          name: string
          password: string
        }
        Update: {
          email?: string
          id?: string
          name?: string
          password?: string
        }
        Relationships: []
      }
      resources: {
        Row: {
          author: string | null
          category: string | null
          company: string | null
          description: string | null
          id: number
          platform: string | null
          published_at: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          type: string | null
          uni_flag: boolean | null
          url: string
          video_flag: boolean | null
          video_url: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          company?: string | null
          description?: string | null
          id?: number
          platform?: string | null
          published_at?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          type?: string | null
          uni_flag?: boolean | null
          url: string
          video_flag?: boolean | null
          video_url?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          company?: string | null
          description?: string | null
          id?: number
          platform?: string | null
          published_at?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          type?: string | null
          uni_flag?: boolean | null
          url?: string
          video_flag?: boolean | null
          video_url?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      "study-record": {
        Row: {
          content: string | null
          created_at: string
          id: string
          time: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          time?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          time?: number | null
        }
        Relationships: []
      }
      todos: {
        Row: {
          created_at: string
          done: boolean | null
          id: number
          title: string | null
        }
        Insert: {
          created_at?: string
          done?: boolean | null
          id?: number
          title?: string | null
        }
        Update: {
          created_at?: string
          done?: boolean | null
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      user_skill: {
        Row: {
          id: number
          skill_id: number
          user_id: string
        }
        Insert: {
          id?: number
          skill_id: number
          user_id: string
        }
        Update: {
          id?: number
          skill_id?: number
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          description: string
          github_id: string | null
          name: string
          qiita_id: string | null
          user_id: string
          x_id: string | null
        }
        Insert: {
          description: string
          github_id?: string | null
          name: string
          qiita_id?: string | null
          user_id: string
          x_id?: string | null
        }
        Update: {
          description?: string
          github_id?: string | null
          name?: string
          qiita_id?: string | null
          user_id?: string
          x_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      delete_all_records: {
        Args: Record<PropertyKey, never>
        Returns: undefined
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
