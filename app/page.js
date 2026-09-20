import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { createComment } from "@/app/actions";

export const dynamic = "force-dynamic";

function formatDate(isoString) {
  return new Date(isoString).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container">
      <header className="board-header">
        <span className="board-category">Q&A</span>
        <h1>현대홈쇼핑 협력사 문의 게시판</h1>
        <p className="board-desc">협력사 업무와 관련된 궁금한 점을 편하게 남겨주세요.</p>
        <Link href="/write" className="btn-primary">
          ✍️ 글쓰기
        </Link>
      </header>

      <section className="post-list">
        {posts.length === 0 ? (
          <p className="empty">아직 등록된 글이 없어요. 첫 문의를 남겨보세요!</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-meta">
                <span className="post-author">👤 {post.author}</span>
                <span className="post-date">{formatDate(post.created_at)}</span>
              </div>
              <h2 className="post-title">{post.title}</h2>
              <p className="post-content">{post.content}</p>

              <div className="comments">
                {post.comments.length > 0 && (
                  <ul className="comment-list">
                    {post.comments.map((comment) => (
                      <li key={comment.id} className="comment-item">
                        <div className="comment-meta">
                          <span className="comment-author">👤 {comment.author}</span>
                          <span className="comment-date">{formatDate(comment.created_at)}</span>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <form action={createComment} className="comment-form">
                  <input type="hidden" name="postId" value={post.id} />
                  <input
                    type="text"
                    name="content"
                    required
                    maxLength={300}
                    placeholder="익명으로 댓글을 남겨보세요"
                    aria-label="댓글 내용"
                  />
                  <button type="submit" className="btn-secondary">
                    등록
                  </button>
                </form>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
