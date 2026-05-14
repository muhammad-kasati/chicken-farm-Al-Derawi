import { Phone, MapPin } from 'lucide-react';

export default function Footer({ dict }: { dict: any }) {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12">
      <div className="mx-auto max-w-7xl px-4 text-center space-y-8">
        <h2 className="text-3xl font-black text-white font-outfit">
          الديراوي<span className="text-[#d4a373]">.</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-8">
          <a href="tel:+972595769978" className="flex items-center gap-2 hover:text-[#d4a373] transition-colors">
            <Phone size={20} />
            <span dir="ltr">+972 595-769-978</span>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61568178808843" target="_blank" className="flex items-center gap-2 hover:text-[#d4a373] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            <span>فيسبوك | Facebook</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <span>{dict.common.location}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-gray-500 text-sm font-medium">
          {dict.common.footer_text}
        </div>
      </div>
    </footer>
  );
}
