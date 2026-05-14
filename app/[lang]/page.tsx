import { getDictionary } from '@/dictionaries/dictionaries';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import Bird from '@/models/Bird';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';

import BirdSlider from '@/components/BirdSlider';

export default async function Home(props: {
  params: Promise<{ lang: 'ar' | 'he' }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  await dbConnect();
  const featuredBirds = await Bird.find({}).limit(10).sort({ createdAt: -1 });

  return (
    <main className="flex-1">
      <Navbar dict={dict} lang={lang} />
      <Hero dict={dict} lang={lang} />

      {/* Latest Additions Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-[#2d5a27] font-outfit">
                {lang === 'ar' ? 'أحدث الإضافات' : 'תוספות אחרונות'}
              </h2>
              <div className="h-1.5 w-24 bg-[#d4a373] rounded-full" />
            </div>
            <Link 
              href={`/${lang}/birds`}
              className="group flex items-center gap-2 text-[#2d5a27] font-bold hover:text-[#d4a373] transition-colors"
            >
              {lang === 'ar' ? 'مشاهدة الكل' : 'צפה בהכל'}
              <ArrowLeft className={`transition-transform group-hover:-translate-x-1 ${lang === 'he' ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
            </Link>
          </div>

          <BirdSlider 
            birds={JSON.parse(JSON.stringify(featuredBirds))} 
            dict={dict} 
            lang={lang} 
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#f7f9f7]">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <SafeImage 
              src="/images/2.jpg" 
              fallback="/images/2.jpg"
              className="h-full w-full object-cover" 
              alt="Farm"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-[#2d5a27] leading-tight">
              {lang === 'ar' ? 'أفضل طيور الزينة في المنطقة' : 'עופות הנוי הטובים ביותר באזור'}
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed font-medium">
              {lang === 'ar' 
                ? 'مزرعة الديراوي هي وجهتكم الأولى للحصول على أرقى أنواع طيور الزينة والدواجن. نتميز بالجودة، الصحة، والجمال في كل طير نقدمه.'
                : 'חוות אל-דיראווי היא היעד הראשון שלכם לקבלת סוגי עופות הנוי והעופות המשובחים ביותר. אנו מתאפיינים באיכות, בריאות ויופי בכל עוף שאנו מציעים.'}
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <span className="text-3xl font-black text-[#d4a373]">100%</span>
                <p className="font-bold text-gray-500 mt-1">{lang === 'ar' ? 'صحة وجودة' : 'בריאות ואיכות'}</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
                <span className="text-3xl font-black text-[#d4a373]">50+</span>
                <p className="font-bold text-gray-500 mt-1">{lang === 'ar' ? 'نوع مختلف' : 'סוגים שונים'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </main>
  );
}
