'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ dict, lang }: { dict: any, lang: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const switchLang = () => {
    const newLang = lang === 'ar' ? 'he' : 'ar';
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    return newPath;
  };

  const navItems = [
    { name: dict.common.home, href: `/${lang}` },
    { name: dict.common.catalog, href: `/${lang}/birds` },
    { name: dict.common.contact, href: `/${lang}/contact` },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-[#2d5a27] font-outfit">
              الديراوي<span className="text-[#d4a373]">.</span>
            </span>
          </Link>

          {/* Desktop Nav - Centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-bold transition-colors whitespace-nowrap ${
                  pathname === item.href ? 'text-[#2d5a27]' : 'text-gray-700 hover:text-[#2d5a27]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Lang Switcher */}
          <div className="hidden md:block">
            <Link
              href={switchLang()}
              className="flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-xs font-black uppercase tracking-widest text-gray-600 hover:bg-gray-200 transition-all"
            >
              <Globe size={14} />
              {lang === 'ar' ? 'HE' : 'AR'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href={switchLang()}
              className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-600"
            >
              <Globe size={12} />
              {lang === 'ar' ? 'HE' : 'AR'}
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-[#2d5a27] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden glass border-b border-white/20 animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-lg font-bold ${
                  pathname === item.href 
                    ? 'bg-[#2d5a27] text-white' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
