import { Gowun_Batang } from "next/font/google";
import "./globals.css";

const gowunBatang = Gowun_Batang({
  variable: "--font-gowun-batang",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "현대홈쇼핑 협력사 문의 게시판",
  description: "협력사 업무 질의응답을 위한 Q&A 게시판입니다.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={gowunBatang.variable}>
      <body>{children}</body>
    </html>
  );
}
