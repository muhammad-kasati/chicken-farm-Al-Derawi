'use client';

import { useState } from 'react';
import { MessageCircle, Search, Filter } from 'lucide-react';

export default function BirdCatalog({ initialBirds, dict, lang }: { initialBirds: any[], dict: any, lang: string }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredBirds = initialBirds.filter(bird => {
    const matchesType = filter === 'all' || bird.type === filter;
    const matchesSearch = bird.name[lang].toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const types = ['all', 'chicken', 'duck', 'goose', 'turkey', 'birds', 'eggs'];

  return (
    <div className="space-y-12">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex flex-wrap gap-2 justify-center">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
                filter === t 
                  ? 'bg-[#2d5a27] text-white shadow-lg' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
              }`}
            >
              {t === 'all' ? dict.common.all : dict.types[t]}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={dict.common.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-gray-100 bg-white px-12 py-3 text-sm focus:border-[#2d5a27] focus:ring-2 focus:ring-[#2d5a27] outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {filteredBirds.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredBirds.map(bird => (
            <div key={bird._id} className="group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={bird.image} 
                  alt={bird.name[lang]} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-[#2d5a27] shadow-sm">
                    {dict.types[bird.type]}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{bird.name[lang]}</h3>
                  <span className="text-[#2d5a27] font-black text-lg">
                    {bird.price} ₪
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bird.features.map((f: string) => (
                    <span key={f} className="text-[10px] uppercase tracking-widest font-black text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                      {dict.features_list[f]}
                    </span>
                  ))}
                </div>
                <a
                  href={`https://wa.me/972595769978?text=${encodeURIComponent(
                    dict.common.whatsapp_message.replace('{bird}', bird.name[lang]) + ` \n ${bird.image}`
                  )}`}
                  target="_blank"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#25D366] text-white font-bold hover:bg-[#128C7E] transition-all shadow-md active:scale-95"
                >
                  <MessageCircle size={20} />
                  {dict.common.order_now}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-300">
            <Filter size={40} />
          </div>
          <h3 className="text-xl font-bold text-gray-400">
            {lang === 'ar' ? 'لم يتم العثور على نتائج' : 'לא נמצאו תוצאות'}
          </h3>
        </div>
      )}
    </div>
  );
}
