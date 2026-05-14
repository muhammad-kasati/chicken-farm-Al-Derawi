'use client';

import { useState, useMemo } from 'react';
import { Trash2, Plus, Upload, X, Edit2, Search } from 'lucide-react';

interface Bird {
  _id: string;
  name: { ar: string; he: string };
  image: string;
  price: number;
  features: string[];
  type: string;
}

export default function AdminDashboard({ initialBirds, lang }: { initialBirds: Bird[], lang: string }) {
  const [birds, setBirds] = useState(initialBirds);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    nameAr: '',
    nameHe: '',
    price: '',
    image: '',
    type: 'chicken',
    features: [] as string[],
  });

  const filteredBirds = useMemo(() => {
    return birds.filter(bird => 
      bird.name.ar.includes(searchQuery) || 
      bird.name.he.includes(searchQuery) ||
      bird.type.includes(searchQuery)
    );
  }, [birds, searchQuery]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'medicine_app'); 

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dr0kmgjex/image/upload`, {
        method: 'POST',
        body: data,
      });
      const result = await res.json();
      setFormData({ ...formData, image: result.secure_url });
    } catch (err) {
      alert(lang === 'ar' ? 'فشل رفع الصورة' : 'העלאת התמונה נכשלה');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.nameAr || !formData.nameHe || !formData.price || !formData.image) {
      alert(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'אנא מלא את כל השדות הנדרשים');
      return;
    }

    setLoading(true);

    const birdData = {
      name: { ar: formData.nameAr, he: formData.nameHe },
      price: Number(formData.price),
      image: formData.image,
      type: formData.type,
      features: formData.features,
    };

    try {
      const url = editingId ? `/api/birds/${editingId}` : '/api/birds';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(birdData),
      });

      if (res.ok) {
        const savedBird = await res.json();
        if (editingId) {
          setBirds(birds.map(b => b._id === editingId ? savedBird : b));
        } else {
          setBirds([savedBird, ...birds]);
        }
        resetForm();
      }
    } catch (err) {
      alert(lang === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'אירעה שגיאה במהלך השמירה');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (bird: Bird) => {
    setEditingId(bird._id);
    setFormData({
      nameAr: bird.name.ar,
      nameHe: bird.name.he,
      price: bird.price.toString(),
      image: bird.image,
      type: bird.type,
      features: bird.features,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm(lang === 'ar' ? 'هل أنت متأكد من الحذف؟' : 'האם אתה בטוח שברצונך למחוק?')) return;

    try {
      const res = await fetch(`/api/birds/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setBirds(birds.filter(b => b._id !== id));
      }
    } catch (err) {
      alert(lang === 'ar' ? 'فشل الحذف' : 'המחיקה נכשלה');
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setFormData({ nameAr: '', nameHe: '', price: '', image: '', type: 'chicken', features: [] });
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-[#2d5a27] px-6 py-3 font-semibold text-white hover:bg-[#1e3d1a] transition-all shadow-lg"
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm 
            ? (lang === 'ar' ? 'إلغاء' : 'ביטול') 
            : (lang === 'ar' ? 'إضافة طير جديد' : 'הוסף עוף חדש')}
        </button>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={lang === 'ar' ? 'بحث عن اسم أو نوع...' : 'חיפוש שם או סוג...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-12 py-3 text-sm focus:ring-2 focus:ring-[#2d5a27] outline-none shadow-sm transition-all"
          />
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-md border border-gray-100 animate-fade-in space-y-4">
          <h2 className="text-xl font-bold text-[#2d5a27] border-b pb-2 mb-4">
            {editingId 
              ? (lang === 'ar' ? 'تعديل بيانات الطير' : 'עריכת נתוני העוף') 
              : (lang === 'ar' ? 'إضافة طير جديد' : 'הוספת עוף חדש')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'ar' ? 'اسم الطير (عربي)' : 'שם העוף (ערבית)'}
              </label>
              <input
                type="text"
                required
                value={formData.nameAr}
                onChange={e => setFormData({ ...formData, nameAr: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d5a27] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'ar' ? 'اسم الطير (عبري)' : 'שם העוף (עברית)'}
              </label>
              <input
                type="text"
                required
                dir="rtl"
                value={formData.nameHe}
                onChange={e => setFormData({ ...formData, nameHe: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d5a27] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'ar' ? 'السعر' : 'מחיר'}
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d5a27] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'ar' ? 'النوع' : 'סוג'}
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 mt-1 focus:ring-2 focus:ring-[#2d5a27] outline-none"
              >
                <option value="chicken">{lang === 'ar' ? 'دجاج' : 'תרנגולת'}</option>
                <option value="duck">{lang === 'ar' ? 'بط' : 'ברווז'}</option>
                <option value="goose">{lang === 'ar' ? 'وز' : 'אווז'}</option>
                <option value="turkey">{lang === 'ar' ? 'حبش' : 'תרנגול הודו'}</option>
                <option value="birds">{lang === 'ar' ? 'عصافير' : 'ציפורים'}</option>
                <option value="eggs">{lang === 'ar' ? 'بيض' : 'ביצים'}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {lang === 'ar' ? 'المميزات' : 'מאפיינים'}
            </label>
            <div className="flex flex-wrap gap-2">
              {['eggs', 'meat', 'ornamental'].map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFeature(f)}
                  className={`rounded-full px-4 py-1 text-sm font-medium transition-all border ${
                    formData.features.includes(f) 
                      ? 'bg-[#2d5a27] text-white border-[#2d5a27]' 
                      : 'bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {f === 'eggs' 
                    ? (lang === 'ar' ? 'بيض' : 'ביצים') 
                    : f === 'meat' 
                      ? (lang === 'ar' ? 'لحم' : 'בשר') 
                      : (lang === 'ar' ? 'زينة' : 'נוי')}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                {lang === 'ar' ? 'الصورة' : 'תמונה'}
              </label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 hover:border-[#2d5a27] transition-all"
                >
                  {uploading ? (
                    <span className="text-gray-500 animate-pulse">
                      {lang === 'ar' ? 'جاري الرفع...' : 'מעלה...'}
                    </span>
                  ) : (
                    <>
                      <Upload size={20} className="text-gray-400" />
                      <span className="text-gray-500">
                        {lang === 'ar' ? 'اختر صورة' : 'בחר תמונה'}
                      </span>
                    </>
                  )}
                </label>
              </div>
            </div>
            {formData.image && (
              <img src={formData.image} alt="Preview" className="h-24 w-24 rounded-lg object-cover border border-gray-200 shadow-sm" />
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploading || !formData.image}
            className="w-full rounded-xl bg-[#2d5a27] py-4 font-bold text-white hover:bg-[#1e3d1a] transition-all disabled:opacity-50 shadow-lg"
          >
            {loading 
              ? (lang === 'ar' ? 'جاري الحفظ...' : 'שומר...') 
              : (editingId ? (lang === 'ar' ? 'تحديث البيانات' : 'עדכן נתונים') : (lang === 'ar' ? 'حفظ الطير' : 'שמור'))}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBirds.map(bird => (
          <div key={bird._id} className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="relative aspect-square">
              <img src={bird.image} alt={bird.name[lang as 'ar'|'he']} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => handleEdit(bird)}
                  className="rounded-full bg-blue-500 p-2 text-white shadow-lg hover:bg-blue-600 transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(bird._id)}
                  className="rounded-full bg-red-500 p-2 text-white shadow-lg hover:bg-red-600 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{bird.name[lang as 'ar'|'he']}</h3>
              <p className="text-[#2d5a27] font-semibold">{bird.price} ₪</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="text-[10px] uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-bold">{bird.type}</span>
                {bird.features.map(f => (
                  <span key={f} className="text-[10px] uppercase tracking-wider bg-[#fefae0] px-2 py-0.5 rounded text-[#d4a373] font-bold">{f}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredBirds.length === 0 && searchQuery && (
        <div className="text-center py-20 text-gray-400 font-medium">
          {lang === 'ar' ? 'لا يوجد نتائج للبحث...' : 'אין תוצאות לחיפוש...'}
        </div>
      )}
    </div>
  );
}
