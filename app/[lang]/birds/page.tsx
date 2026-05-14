import { getDictionary } from '@/dictionaries/dictionaries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import dbConnect from '@/lib/mongodb';
import Bird from '@/models/Bird';
import BirdCatalog from '@/components/BirdCatalog';

export default async function Catalog(props: {
  params: Promise<{ lang: 'ar' | 'he' }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  await dbConnect();
  const birds = await Bird.find({}).sort({ createdAt: -1 });

  return (
    <main className="flex-1 bg-[#fdfdfd]">
      <Navbar dict={dict} lang={lang} />
      
      <header className="bg-[#2d5a27] py-20 text-white text-center">
        <div className="mx-auto max-w-7xl px-4 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-outfit">{dict.common.catalog}</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {lang === 'ar' ? 'استعرض مجموعتنا المميزة من الطيور المتاحة للبيع' : 'צפו באוסף המיוחד שלנו של עופות הזמינים למכירה'}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <BirdCatalog 
          initialBirds={JSON.parse(JSON.stringify(birds))} 
          dict={dict} 
          lang={lang} 
        />
      </section>

      <Footer dict={dict} />
    </main>
  );
}
