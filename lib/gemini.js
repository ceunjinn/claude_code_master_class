const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";

export async function generateAutoComment({ title, content }) {
  const prompt = `다음은 "현대홈쇼핑 협력사 문의 게시판"에 올라온 Q&A 글입니다.

제목: ${title}
내용: ${content}

이 글에 대해 친절한 댓글을 한국어로 2~3문장 이내로 작성해줘. 댓글 내용만 출력해줘.`;

  const res = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { thinkingConfig: { thinkingBudget: 0 } },
    }),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
}
