// Generic type utilities for Supabase
// Provides Tables, TablesInsert, TablesUpdate, Enums, CompositeTypes

import type { DatabaseWithoutInternals, PublicSchema } from "./database";

export type Tables<
  TableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends TableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof (DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Views"])
    : never = never,
> = TableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Views"])[TableName] extends { Row: infer R }
    ? R
    : never
  : TableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    ? (PublicSchema["Tables"] & PublicSchema["Views"])[TableNameOrOptions] extends { Row: infer R }
      ? R
      : never
    : never;

export type TablesInsert<
  TableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends TableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = TableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Tables"][TableName] extends { Insert: infer I }
    ? I
    : never
  : TableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][TableNameOrOptions] extends { Insert: infer I }
      ? I
      : never
    : never;

export type TablesUpdate<
  TableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends TableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = TableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[TableNameOrOptions["schema"]]["Tables"][TableName] extends { Update: infer U }
    ? U
    : never
  : TableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][TableNameOrOptions] extends { Update: infer U }
      ? U
      : never
    : never;

export type Enums<
  EnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends EnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[EnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = EnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[EnumNameOrOptions["schema"]]["Enums"][EnumName]
  : EnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][EnumNameOrOptions]
    : never;

export type CompositeTypes<
  CompositeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeName extends CompositeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
    ? keyof DatabaseWithoutInternals[CompositeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = CompositeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[CompositeNameOrOptions["schema"]]["CompositeTypes"][CompositeName]
  : CompositeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][CompositeNameOrOptions]
    : never;