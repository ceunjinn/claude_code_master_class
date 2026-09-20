"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addPost } from "@/lib/posts";
import { addComment } from "@/lib/comments";

export async function createPost(formData) {
  const title = formData.get("title")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  if (title && content) {
    await addPost({ title, content });
  }

  redirect("/");
}

export async function createComment(formData) {
  const postId = formData.get("postId");
  const content = formData.get("content")?.toString().trim() ?? "";

  if (postId && content) {
    await addComment({ postId, content });
  }

  revalidatePath("/");
}
