import { getDictionary } from '@/dictionaries/dictionaries';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Phone, MapPin, MessageCircle } from 'lucide-react';

export default async function Contact(props: {
  params: Promise<{ lang: 'ar' | 'he' }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex-1 bg-[#fdfdfd]">
      <Navbar dict={dict} lang={lang} />
      
      <header className="bg-[#2d5a27] py-20 text-white text-center">
        <div className="mx-auto max-w-7xl px-4 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black font-outfit">{dict.common.contact}</h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            {lang === 'ar' ? 'نحن هنا للإجابة على استفساراتكم وتلبية طلباتكم' : 'אנחנו כאן כדי לענות על שאלותיכם ולמלא את בקשותיכם'}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-[#2d5a27]">
                {lang === 'ar' ? 'معلومات التواصل' : 'פרטי התקשרות'}
              </h2>
              <div className="grid gap-6">
                <a href="tel:+972595769978" className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-2xl bg-[#fefae0] text-[#d4a373] flex items-center justify-center">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{dict.common.phone}</p>
                    <p className="text-xl font-bold" dir="ltr">+972 595-769-978</p>
                  </div>
                </a>

                <a href="https://wa.me/972595769978" target="_blank" className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-2xl bg-[#e8fbf0] text-[#25D366] flex items-center justify-center">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">WhatsApp</p>
                    <p className="text-xl font-bold">{lang === 'ar' ? "دردشة مباشرة" : "צ'אט ישיר"}</p>
                  </div>
                </a>

                <a href="https://www.facebook.com/profile.php?id=61568178808843" target="_blank" className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="h-12 w-12 rounded-2xl bg-[#e7f0ff] text-[#1877F2] flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Facebook</p>
                    <p className="text-xl font-bold">{lang === 'ar' ? 'صفحة المزرعة' : 'עמוד החווה'}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm">
                  <div className="h-12 w-12 rounded-2xl bg-[#f5f5f5] text-gray-400 flex items-center justify-center">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{lang === 'ar' ? 'العنوان' : 'כתובת'}</p>
                    <p className="text-xl font-bold">{dict.common.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-black text-[#2d5a27]">
              {dict.common.map_title}
            </h2>
            <div className="h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13511.456885662363!2d35.358!3d32.458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d08e5a7b6b3b5%3A0x6b7b7b7b7b7b7b7b!2sDeir%20Abu%20Da'if!5e0!3m2!1sen!2s!4v1715660000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer dict={dict} />
    </main>
  );
}
