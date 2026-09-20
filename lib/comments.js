import { supabase } from "@/lib/supabaseClient";

export async function addComment({ postId, content }) {
  const { data, error } = await supabase
    .from("comments")
    .insert({ post_id: postId, content, author: "익명" })
    .select()
    .single();

  if (error) throw error;
  return data;
}
