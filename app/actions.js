"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addPost } from "@/lib/posts";
import { addComment } from "@/lib/comments";
import { generateAutoComment } from "@/lib/gemini";

export async function createPost(formData) {
  const title = formData.get("title")?.toString().trim() ?? "";
  const content = formData.get("content")?.toString().trim() ?? "";

  if (title && content) {
    const post = await addPost({ title, content });

    try {
      const aiComment = await generateAutoComment({ title, content });
      if (aiComment) {
        await addComment({ postId: post.id, content: aiComment });
      }
    } catch (error) {
      console.error("Gemini auto comment failed:", error);
    }
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
