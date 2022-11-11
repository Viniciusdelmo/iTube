import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://znktxcagdddakxrlkesc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpua3R4Y2FnZGRkYWt4cmxrZXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNjYzNTIsImV4cCI6MTk4Mzc0MjM1Mn0.FI0SDGDJLx2A5mYvAdCH-v5j-KFoo-Vhi1mqm3D2lrg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase
        .from("video")
        .select("*")
        
    }
  }
}
