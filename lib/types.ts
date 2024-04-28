import React from 'react';
export interface AuthData {
    email : string,
    password: string
}

export interface PollFormsProps {
  children: React.ReactNode;
  id?:string;
  action : "update" | "create";
  title?: string;
  image?: string;
  description?: string;
  starts_at?: string;
  ends_at?: string;
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
  id?: string,
  name?: string,
  description?: string | null,
  action: string,

} 

export interface PollBadgeParams {
  starts: Date,
  ends:Date,
  finished: string,
  label:string
  userVote: boolean
}

export interface CategoryDetails {
  id: string;
  name: string;
}

export interface NavigationButtonProps {
  to: string,
  back?: boolean,
  className?: string,
  text: string
}


export interface PollP {
  categories?: Category; // Now 'category' instead of 'category_id'
  category_id: string
          created_at: string | null
          description: string | null
          ends_at: string | null
          id: string
          image: string | null
          starts_at: string
          status: string
          title: string
}
export interface Poll {
    id: string;
    title: string;
    starts_at: string; 
    ends_at: string;
    category_id: string;
    description: string;
    image:string
    children: React.ReactNode
  }

export interface OptionFormProps {
  children: React.ReactNode;
  text?: string,
  poll_id?: string,
  image?: string
  id?:string
  action : "update" | "create"

}

  
export interface PollProps {
  poll: {
    id: string;
    title: string;
    starts_at: string; 
    ends_at: string | null;
    categories: Category | null;
  };
  status:string 
  // have_voted: boolean | null;
  user: { id: string } | null;
}
export interface ImagePickerProps {
  label: string,
  name: string
  picture?: string 
}

export enum poll_status {
  open = "open",
  closed = "closed",
  not_started = "not_started",
  check_results = "check_results"
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
  id?: string,
  option_text: string,
  votes_count: number | null,
  image: string |null|  undefined,
  children? : React.ReactNode;
  className? : string
  classNameContainer? : string
}

export interface CharProps { 
  charData: Option[];
  pollData: any; 
  top3Data: any[];

}

export interface children {
  children: React.ReactNode
}

export interface ErrHandlingPollsArguments {
  message: string,
  code: string,
  title: string,
  starts_at: string,
  ends_at: string,
}

export interface LoadingPropsPolls{
  count: number
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
          image: string | null
          option_text: string
          poll_id: string
          votes_count: number | null
        }
        Insert: {
          id?: string
          image?: string | null
          option_text: string
          poll_id: string
          votes_count?: number | null
        }
        Update: {
          id?: string
          image?: string | null
          option_text?: string
          poll_id?: string
          votes_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "poll_id"
            columns: ["poll_id"]
            isOneToOne: false
            referencedRelation: "polls"
            referencedColumns: ["id"]
          },
        ]
      }
      polls: {
        Row: {
          category_id: string
          created_at: string | null
          description: string | null
          ends_at: string | null
          id: string
          image: string | null
          starts_at: string
          status: string
          title: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          image?: string | null
          starts_at: string
          status?: string
          title: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          image?: string | null
          starts_at?: string
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "polls_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
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
            foreignKeyName: "poll_id"
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
          },
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
      update_poll_status: {
        Args: {
          poll_id: string
        }
        Returns: undefined
      }
      update_poll_statuses: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      poll_status: "open" | "closed" | "not_started" | "check_results"
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
