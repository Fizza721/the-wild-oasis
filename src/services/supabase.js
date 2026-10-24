import { createClient } from "@supabase/supabase-js";
// Create a single supabase client for interacting with your database

export const supabaseUrl = "https://lrgmulhrmprkgzbjgesu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyZ211bGhybXBya2d6YmpnZXN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExODI5MDksImV4cCI6MjEwNjc1ODkwOX0._BRin1ZNKa2y1jq6LAvqxKrLP8iZ7CfaifoB4-jdVWI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
