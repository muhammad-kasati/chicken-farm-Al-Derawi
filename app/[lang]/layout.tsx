import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "الديراوي لطيور الزينة | Aldirawi Ornamental Birds",
  description: "أفضل مزارع طيور الزينة والدواجن في فلسطين - جنين",
};

export async function generateStaticParams() {
  return [{ lang: 'ar' }, { lang: 'he' }];
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang;
  const isRtl = lang === 'ar' || lang === 'he';

  return (
    <html
      lang={lang}
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fdfdfd] text-[#1a1a1a]">
        {props.children}
      </body>
    </html>
  );
}
