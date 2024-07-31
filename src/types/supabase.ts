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
      Addresses: {
        Row: {
          address: string | null
          addressId: string
          name: string | null
          phone: string | null
          userId: string | null
        }
        Insert: {
          address?: string | null
          addressId?: string
          name?: string | null
          phone?: string | null
          userId?: string | null
        }
        Update: {
          address?: string | null
          addressId?: string
          name?: string | null
          phone?: string | null
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Addresses_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Brands: {
        Row: {
          brandId: number
          enName: string | null
          initialCons: string | null
          krName: string | null
          logoURL: string | null
        }
        Insert: {
          brandId?: number
          enName?: string | null
          initialCons?: string | null
          krName?: string | null
          logoURL?: string | null
        }
        Update: {
          brandId?: number
          enName?: string | null
          initialCons?: string | null
          krName?: string | null
          logoURL?: string | null
        }
        Relationships: []
      }
      Carts: {
        Row: {
          count: number | null
          isSelected: boolean
          productId: number
          userId: string
          volume: number | null
        }
        Insert: {
          count?: number | null
          isSelected?: boolean
          productId: number
          userId: string
          volume?: number | null
        }
        Update: {
          count?: number | null
          isSelected?: boolean
          productId?: number
          userId?: string
          volume?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Carts_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["productId"]
          },
          {
            foreignKeyName: "Carts_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Categories: {
        Row: {
          categoryId: string
          categoryMainTitle: string | null
          categorySubTitle: string | null
          categoryTitle: string
          code: number | null
        }
        Insert: {
          categoryId?: string
          categoryMainTitle?: string | null
          categorySubTitle?: string | null
          categoryTitle: string
          code?: number | null
        }
        Update: {
          categoryId?: string
          categoryMainTitle?: string | null
          categorySubTitle?: string | null
          categoryTitle?: string
          code?: number | null
        }
        Relationships: []
      }
      Coupon: {
        Row: {
          couponId: string
          discount: number | null
          expirationDate: string | null
          issueDate: string | null
          name: string | null
          status: string | null
          userId: string
        }
        Insert: {
          couponId?: string
          discount?: number | null
          expirationDate?: string | null
          issueDate?: string | null
          name?: string | null
          status?: string | null
          userId?: string
        }
        Update: {
          couponId?: string
          discount?: number | null
          expirationDate?: string | null
          issueDate?: string | null
          name?: string | null
          status?: string | null
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Coupon_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Deliveries: {
        Row: {
          addressId: string | null
          arrivalDate: string | null
          deliverId: string
          deliverMemo: string | null
          deliverState: string
          departureDate: string | null
          name: string
          phone: string
        }
        Insert: {
          addressId?: string | null
          arrivalDate?: string | null
          deliverId: string
          deliverMemo?: string | null
          deliverState?: string
          departureDate?: string | null
          name: string
          phone: string
        }
        Update: {
          addressId?: string | null
          arrivalDate?: string | null
          deliverId?: string
          deliverMemo?: string | null
          deliverState?: string
          departureDate?: string | null
          name?: string
          phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "Deliveries_addressId_fkey"
            columns: ["addressId"]
            isOneToOne: false
            referencedRelation: "Addresses"
            referencedColumns: ["addressId"]
          },
          {
            foreignKeyName: "Deliveries_deliverId_fkey"
            columns: ["deliverId"]
            isOneToOne: true
            referencedRelation: "Orders"
            referencedColumns: ["deliverId"]
          },
        ]
      }
      Mileages: {
        Row: {
          count: number | null
          expirationDate: string | null
          issueDate: string | null
          mileageId: string
          userId: string | null
        }
        Insert: {
          count?: number | null
          expirationDate?: string | null
          issueDate?: string | null
          mileageId?: string
          userId?: string | null
        }
        Update: {
          count?: number | null
          expirationDate?: string | null
          issueDate?: string | null
          mileageId?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Mileages_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      Orders: {
        Row: {
          couponId: string | null
          deliverId: string | null
          orderId: string
          orderStatus: string
          payment: string
          total: number
          userId: string | null
        }
        Insert: {
          couponId?: string | null
          deliverId?: string | null
          orderId?: string
          orderStatus?: string
          payment?: string
          total: number
          userId?: string | null
        }
        Update: {
          couponId?: string | null
          deliverId?: string | null
          orderId?: string
          orderStatus?: string
          payment?: string
          total?: number
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Orders_couponId_fkey"
            columns: ["couponId"]
            isOneToOne: false
            referencedRelation: "Coupon"
            referencedColumns: ["couponId"]
          },
          {
            foreignKeyName: "Orders_deliverId_fkey"
            columns: ["deliverId"]
            isOneToOne: true
            referencedRelation: "Deliveries"
            referencedColumns: ["deliverId"]
          },
          {
            foreignKeyName: "Orders_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
      OrdersDetail: {
        Row: {
          count: number
          orderDetailId: string
          orderId: string
          productId: number
        }
        Insert: {
          count?: number
          orderDetailId?: string
          orderId: string
          productId: number
        }
        Update: {
          count?: number
          orderDetailId?: string
          orderId?: string
          productId?: number
        }
        Relationships: [
          {
            foreignKeyName: "OrdersDetail_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "Orders"
            referencedColumns: ["orderId"]
          },
          {
            foreignKeyName: "OrdersDetail_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["productId"]
          },
        ]
      }
      Products: {
        Row: {
          brandId: number | null
          categoryId: string | null
          content: string | null
          createdAt: string
          detailImageURL: string | null
          discount: number | null
          ImagesURL: Json | null
          notes: Json | null
          price: number | null
          productId: number
          size: Json | null
          status: boolean | null
          thumbNailURL: string | null
          title: string | null
          updatedAt: string | null
        }
        Insert: {
          brandId?: number | null
          categoryId?: string | null
          content?: string | null
          createdAt?: string
          detailImageURL?: string | null
          discount?: number | null
          ImagesURL?: Json | null
          notes?: Json | null
          price?: number | null
          productId?: number
          size?: Json | null
          status?: boolean | null
          thumbNailURL?: string | null
          title?: string | null
          updatedAt?: string | null
        }
        Update: {
          brandId?: number | null
          categoryId?: string | null
          content?: string | null
          createdAt?: string
          detailImageURL?: string | null
          discount?: number | null
          ImagesURL?: Json | null
          notes?: Json | null
          price?: number | null
          productId?: number
          size?: Json | null
          status?: boolean | null
          thumbNailURL?: string | null
          title?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Products_brandId_fkey"
            columns: ["brandId"]
            isOneToOne: false
            referencedRelation: "Brands"
            referencedColumns: ["brandId"]
          },
          {
            foreignKeyName: "Products_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["categoryId"]
          },
          {
            foreignKeyName: "Products_categoryId_fkey1"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "Categories"
            referencedColumns: ["categoryId"]
          },
        ]
      }
      Users: {
        Row: {
          birth: string | null
          createdAt: string
          email: string
          gender: string | null
          id: string
          isNew: boolean | null
          mileage: number | null
          name: string | null
          phone: string | null
          updatedAt: string | null
        }
        Insert: {
          birth?: string | null
          createdAt?: string
          email: string
          gender?: string | null
          id?: string
          isNew?: boolean | null
          mileage?: number | null
          name?: string | null
          phone?: string | null
          updatedAt?: string | null
        }
        Update: {
          birth?: string | null
          createdAt?: string
          email?: string
          gender?: string | null
          id?: string
          isNew?: boolean | null
          mileage?: number | null
          name?: string | null
          phone?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      Wishes: {
        Row: {
          productId: number | null
          userId: string
          wishId: string
        }
        Insert: {
          productId?: number | null
          userId?: string
          wishId?: string
        }
        Update: {
          productId?: number | null
          userId?: string
          wishId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Wish_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "Products"
            referencedColumns: ["productId"]
          },
          {
            foreignKeyName: "Wish_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_products_with_categories: {
        Args: {
          searchquery: string
        }
        Returns: {
          productid: number
          title: string
          discount: number
          price: number
          content: string
          thumbnailurl: string
          categoryid: string
          categoryname: string
          categorydetailid: string
          categorydetailname: string
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
