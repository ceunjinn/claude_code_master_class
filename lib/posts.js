import { supabase } from "@/lib/supabaseClient";

export async function getPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addPost({ title, content }) {
  const { data, error } = await supabase
    .from("posts")
    .insert({ title, content, author: "익명" })
    .select()
    .single();

  if (error) throw error;
  return data;
}
