'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import SafeImage from './SafeImage';

export default function BirdSlider({ birds, dict, lang }: { birds: any[], dict: any, lang: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Triple the birds to create an infinite loop effect
  const repeatedBirds = [...birds, ...birds, ...birds];
  const originalCount = birds.length;

  useEffect(() => {
    if (scrollRef.current && originalCount > 0) {
      // Start from the middle set
      const itemWidth = 320 + 24; // width + gap
      scrollRef.current.scrollLeft = lang === 'ar' ? -(itemWidth * originalCount) : (itemWidth * originalCount);
    }
  }, [originalCount, lang]);

  const handleScroll = () => {
    if (!scrollRef.current || originalCount === 0) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const itemWidth = 320 + 24;
    const threshold = itemWidth * originalCount;

    // Logic for circular infinite scroll
    if (lang === 'ar') {
      if (Math.abs(scrollLeft) < 10) {
        scrollRef.current.scrollLeft = -threshold;
      } else if (Math.abs(scrollLeft) + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollLeft = -threshold;
      }
    } else {
      if (scrollLeft < 10) {
        scrollRef.current.scrollLeft = threshold;
      } else if (scrollLeft + clientWidth >= scrollWidth - 10) {
        scrollRef.current.scrollLeft = threshold;
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      const finalDir = lang === 'ar' ? (direction === 'left' ? 1 : -1) : (direction === 'left' ? -1 : 1);
      scrollRef.current.scrollBy({ left: finalDir * scrollAmount, behavior: 'smooth' });
    }
  };

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      const dir = lang === 'ar' ? 'right' : 'right'; // Always move in one direction
      scroll('right');
    }, 4000);

    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div className="relative group">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white shadow-xl text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white transition-all -ml-6 opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white shadow-xl text-[#2d5a27] hover:bg-[#2d5a27] hover:text-white transition-all -mr-6 opacity-0 group-hover:opacity-100 hidden md:block"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slider Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {repeatedBirds.map((bird, index) => (
          <div 
            key={`${bird._id}-${index}`} 
            className="flex-shrink-0 w-80 group/card relative rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <SafeImage 
                src={bird.image} 
                fallback="/images/hero.jpg"
                alt={bird.name[lang]} 
                className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">{bird.name[lang]}</h3>
                <span className="bg-[#fefae0] text-[#d4a373] px-3 py-1 rounded-full text-sm font-black">
                  {bird.price} ₪
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {bird.features.map((f: string) => (
                  <span key={f} className="text-[10px] uppercase tracking-widest font-black text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    {dict.features_list[f]}
                  </span>
                ))}
              </div>
              <a
                href={`https://wa.me/972595769978?text=${encodeURIComponent(
                  dict.common.whatsapp_message.replace('{bird}', bird.name[lang]) + ` \n ${bird.image}`
                )}`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-all"
              >
                <MessageCircle size={20} />
                {dict.common.order_now}
              </a>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
