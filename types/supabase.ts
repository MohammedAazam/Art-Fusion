export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
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
      account: {
        Row: {
          access_token: string | null
          expires_at: number | null
          id: string
          id_token: string | null
          provider: string
          providerAccountId: string
          refresh_token: string | null
          scope: string | null
          session_state: string | null
          token_type: string | null
          type: string
          userId: string
        }
        Insert: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider: string
          providerAccountId: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type: string
          userId: string
        }
        Update: {
          access_token?: string | null
          expires_at?: number | null
          id?: string
          id_token?: string | null
          provider?: string
          providerAccountId?: string
          refresh_token?: string | null
          scope?: string | null
          session_state?: string | null
          token_type?: string | null
          type?: string
          userId?: string
        }
      }
      prev_projects: {
        Row: {
          id: string
          link: string
          production_name: string
          project_name: string
          released_date: string
          technician_role: string
        }
        Insert: {
          id?: string
          link: string
          production_name: string
          project_name: string
          released_date: string
          technician_role: string
        }
        Update: {
          id?: string
          link?: string
          production_name?: string
          project_name?: string
          released_date?: string
          technician_role?: string
        }
      }
      productionProfiles: {
        Row: {
          address: string
          artistsId: string | null
          budget: number
          created_at: string
          gener_on_prod: string[] | null
          id: string
          no_of_shooting_days: number
          payment_provided: boolean
          poster: string
          release_date: string
          restrictions: string
          title: string
          updated_at: string
        }
        Insert: {
          address: string
          artistsId?: string | null
          budget: number
          created_at?: string
          gener_on_prod?: string[] | null
          id?: string
          no_of_shooting_days: number
          payment_provided: boolean
          poster: string
          release_date: string
          restrictions: string
          title: string
          updated_at?: string
        }
        Update: {
          address?: string
          artistsId?: string | null
          budget?: number
          created_at?: string
          gener_on_prod?: string[] | null
          id?: string
          no_of_shooting_days?: number
          payment_provided?: boolean
          poster?: string
          release_date?: string
          restrictions?: string
          title?: string
          updated_at?: string
        }
      }
      requests: {
        Row: {
          artistId: string | null
          id: string
          productionProfilesId: string | null
          status: "PENDING" | "SUCCESS" | "ERROR"
        }
        Insert: {
          artistId?: string | null
          id?: string
          productionProfilesId?: string | null
          status?: "PENDING" | "SUCCESS" | "ERROR"
        }
        Update: {
          artistId?: string | null
          id?: string
          productionProfilesId?: string | null
          status?: "PENDING" | "SUCCESS" | "ERROR"
        }
      }
      session: {
        Row: {
          expires: string
          id: string
          sessionToken: string
          userId: string
        }
        Insert: {
          expires: string
          id?: string
          sessionToken: string
          userId: string
        }
        Update: {
          expires?: string
          id?: string
          sessionToken?: string
          userId?: string
        }
      }
      user: {
        Row: {
          about: string | null
          address: string | null
          age: number | null
          as: string | null
          date_of_birth: string | null
          email: string | null
          emailVerified: string | null
          expected_payment: boolean | null
          favourites: string[] | null
          id: string
          id_proof: string | null
          image: string | null
          isNewUser: boolean
          name: string
          password: string | null
          phone_no: string | null
          physical_details: string | null
          role_type: Database["public"]["Enums"]["roles"] | null
          skills: string[] | null
        }
        Insert: {
          about?: string | null
          address?: string | null
          age?: number | null
          as?: string | null
          date_of_birth?: string | null
          email?: string | null
          emailVerified?: string | null
          expected_payment?: boolean | null
          favourites?: string[] | null
          id?: string
          id_proof?: string | null
          image?: string | null
          isNewUser?: boolean
          name: string
          password?: string | null
          phone_no?: string | null
          physical_details?: string | null
          role_type?: Database["public"]["Enums"]["roles"] | null
          skills?: string[] | null
        }
        Update: {
          about?: string | null
          address?: string | null
          age?: number | null
          as?: string | null
          date_of_birth?: string | null
          email?: string | null
          emailVerified?: string | null
          expected_payment?: boolean | null
          favourites?: string[] | null
          id?: string
          id_proof?: string | null
          image?: string | null
          isNewUser?: boolean
          name?: string
          password?: string | null
          phone_no?: string | null
          physical_details?: string | null
          role_type?: Database["public"]["Enums"]["roles"] | null
          skills?: string[] | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      request_status: "PENDING" | "ACCEPTED"
      roles: "ARTIST" | "PROD_OWNER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
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

