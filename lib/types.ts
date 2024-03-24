export interface AuthData {
    email : string,
    password: string
}


export interface ButtonProps {
  action: string,
  inAction: string,
  className: string
}

export interface NavProps {
  currentUserRole: string; 
  children: React.ReactNode; 
}

export interface UpdateCategoryProps {
  id: string,
  name: string,
  description: string | null
} 

export interface PollBadgeParams {
  starts: Date,
  ends:Date,
  finished: string,
  label:string
  userVote: boolean
}

export interface Poll {
    id: string;
    title: string;
    starts_at: string; 
    ends_at: string;
    category_id: string;
    description: string
  }

export interface PollProps {
  poll: {
    id: string;
    title: string;
    starts_at: string; 
    ends_at: string;
    categories: Category
  };
  status:string 
  // have_voted: boolean | null;
  user: { id: string } | null;
}


export type Category ={
  id:string
  name:string,
  description: string | null
}

export type Id = {
  id: string
}

export interface Option  {
  id: string; 
  option_text: string; poll_id: string; votes_count: number | null; 
}


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
      categories: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      options: {
        Row: {
          id: string
          option_text: string
          poll_id: string
          votes_count: number | null
        }
        Insert: {
          id?: string
          option_text: string
          poll_id: string
          votes_count?: number | null
        }
        Update: {
          id?: string
          option_text?: string
          poll_id?: string
          votes_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "options_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          }
        ]
      }
      polls: {
        Row: {
          category_id: string | null
          created_at: string | null
          description: string | null
          ends_at: string | null
          id: string
          starts_at: string
          title: string
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          starts_at: string
          title: string
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          starts_at?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          id: string
          role: string | null
        }
        Insert: {
          id?: string
          role?: string | null
        }
        Update: {
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      uservotes: {
        Row: {
          has_voted: boolean
          poll_id: string
          user_id: string
        }
        Insert: {
          has_voted?: boolean
          poll_id: string
          user_id: string
        }
        Update: {
          has_voted?: boolean
          poll_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "uservotes_poll_id_fkey"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "uservotes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_votes_count: {
        Args: {
          option_text_param: string
        }
        Returns: undefined
      }
      increment_votes_count_by_id: {
        Args: {
          option_id: string
        }
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
