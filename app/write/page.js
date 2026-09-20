import Link from "next/link";
import { createPost } from "@/app/actions";

export default function WritePage() {
  return (
    <main className="container">
      <header className="board-header">
        <span className="board-category">Q&A</span>
        <h1>문의 글쓰기</h1>
        <p className="board-desc">작성자는 별도 로그인 없이 &apos;익명&apos;으로 등록됩니다.</p>
      </header>

      <form action={createPost} className="post-form">
        <label htmlFor="title">제목</label>
        <input id="title" name="title" type="text" required maxLength={100} placeholder="문의 제목을 입력해주세요" />

        <label htmlFor="content">내용</label>
        <textarea id="content" name="content" required rows={8} placeholder="문의 내용을 자세히 적어주세요" />

        <div className="form-actions">
          <Link href="/" className="btn-secondary">
            취소
          </Link>
          <button type="submit" className="btn-primary">
            등록하기
          </button>
        </div>
      </form>
    </main>
  );
}
