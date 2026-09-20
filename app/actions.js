"use server";

import { redirect } from "next/navigation";
import { addPost } from "@/lib/posts";

export async function createPost(formData) {
  const title = formData.get("title")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  if (title && content) {
    addPost({ title, content });
  }

  redirect("/");
}
