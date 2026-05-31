// Database type definition for Supabase
// Extracted from monolithic types.ts for better maintainability

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      events: {
        Row: {
          budget_max: number | null;
          budget_min: number | null;
          category: Database["public"]["Enums"]["artist_category"] | null;
          city: string | null;
          created_at: string;
          date: string;
          description: string | null;
          id: string;
          image_url: string | null;
          is_published: boolean;
          location: string;
          organizer_id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          budget_max?: number | null;
          budget_min?: number | null;
          category?: Database["public"]["Enums"]["artist_category"] | null;
          city?: string | null;
          created_at?: string;
          date: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          location: string;
          organizer_id: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          budget_max?: number | null;
          budget_min?: number | null;
          category?: Database["public"]["Enums"]["artist_category"] | null;
          city?: string | null;
          created_at?: string;
          date?: string;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          is_published?: boolean;
          location?: string;
          organizer_id?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      favorites: {
        Row: {
          artist_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          artist_id: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          artist_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      media: {
        Row: {
          created_at: string;
          duration_seconds: number | null;
          id: string;
          position: number;
          storage_path: string | null;
          type: Database["public"]["Enums"]["media_type"];
          url: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          duration_seconds?: number | null;
          id?: string;
          position?: number;
          storage_path?: string | null;
          type: Database["public"]["Enums"]["media_type"];
          url: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          duration_seconds?: number | null;
          id?: string;
          position?: number;
          storage_path?: string | null;
          type?: Database["public"]["Enums"]["media_type"];
          url?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      messages: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          is_read: boolean;
          recipient_id: string;
          sender_id: string;
          subject: string | null;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          recipient_id: string;
          sender_id: string;
          subject?: string | null;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          is_read?: boolean;
          recipient_id?: string;
          sender_id?: string;
          subject?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          category: Database["public"]["Enums"]["artist_category"] | null;
          city: string | null;
          cover_url: string | null;
          created_at: string;
          display_name: string;
          id: string;
          is_published: boolean;
          organizer_company: string | null;
          organizer_email: string | null;
          organizer_name: string | null;
          organizer_phone: string | null;
          organizer_website: string | null;
          plan: Database["public"]["Enums"]["artist_plan"];
          price_from: number | null;
          rating: number | null;
          requirements: string | null;
          reviews_count: number;
          slug: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          category?: Database["public"]["Enums"]["artist_category"] | null;
          city?: string | null;
          cover_url?: string | null;
          created_at?: string;
          display_name: string;
          id: string;
          is_published?: boolean;
          organizer_company?: string | null;
          organizer_email?: string | null;
          organizer_name?: string | null;
          organizer_phone?: string | null;
          organizer_website?: string | null;
          plan?: Database["public"]["Enums"]["artist_plan"];
          price_from?: number | null;
          rating?: number | null;
          requirements?: string | null;
          reviews_count?: number;
          slug?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          category?: Database["public"]["Enums"]["artist_category"] | null;
          city?: string | null;
          cover_url?: string | null;
          created_at?: string;
          display_name?: string;
          id?: string;
          is_published?: boolean;
          organizer_company?: string | null;
          organizer_email?: string | null;
          organizer_name?: string | null;
          organizer_phone?: string | null;
          organizer_website?: string | null;
          plan?: Database["public"]["Enums"]["artist_plan"];
          price_from?: number | null;
          rating?: number | null;
          requirements?: string | null;
          reviews_count?: number;
          slug?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          cancel_at: string | null;
          created_at: string;
          current_period_end: string | null;
          current_period_start: string | null;
          id: string;
          plan: Database["public"]["Enums"]["artist_plan"];
          status: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          cancel_at?: string | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          plan?: Database["public"]["Enums"]["artist_plan"];
          status?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          cancel_at?: string | null;
          created_at?: string;
          current_period_end?: string | null;
          current_period_start?: string | null;
          id?: string;
          plan?: Database["public"]["Enums"]["artist_plan"];
          status?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_user_role: {
        Args: { _user_id: string };
        Returns: Database["public"]["Enums"]["app_role"];
      };
      has_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"]; _user_id: string };
        Returns: boolean;
      };
      is_artist: {
        Args: { _user_id: string };
        Returns: boolean;
      };
      is_organizer: {
        Args: { _user_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: "admin" | "artist" | "organizer";
      artist_category:
        | "musica"
        | "teatro"
        | "magia"
        | "comedia"
        | "danza"
        | "dj"
        | "circo"
        | "arte"
        | "foto_video";
      artist_plan: "spark" | "spotlight" | "headliner";
      media_type: "image" | "video";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

export type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
export type PublicSchema = DatabaseWithoutInternals["public"];