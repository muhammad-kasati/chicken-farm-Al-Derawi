'use client';

import Link from 'next/link';

export default function Hero({ dict, lang }: { dict: any, lang: string }) {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image Placeholder or User Provided Image */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img 
        src="/images/hero.jpg" 
        alt="Chicken Farm"
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/images/hero.jpg';
        }}
      />

      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
        <div className="max-w-4xl space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            {dict.hero.welcome}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 font-medium max-w-2xl mx-auto">
            {dict.hero.subtitle}
          </p>
          <div className="pt-6">
            <Link 
              href={`/${lang}/birds`}
              className="rounded-full bg-[#2d5a27] px-10 py-5 text-lg font-black text-white shadow-2xl hover:bg-[#d4a373] transition-all hover:scale-105 active:scale-95 inline-block"
            >
              {dict.hero.cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#fdfdfd] to-transparent z-20" />
    </section>
  );
}
