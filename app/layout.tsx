
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "وَفْر | سوق واحد.. خيارات بلا حدود",
  description:
    "منصة وَفْر، سوق شامل لطلبات البيع والشراء والمنتجات والخدمات والطعام والتوصيل والهدايا وقطع التبديل.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
