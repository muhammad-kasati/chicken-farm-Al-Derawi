'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push(`/${lang}/admin`);
        router.refresh();
      } else {
        setError('كلمة السر غير صحيحة | סיסמה שגויה');
      }
    } catch (err) {
      setError('حدث خطأ ما | אירעה שגיאה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f9f7] p-4">
      <div className="w-full max-max-w-md rounded-2xl bg-white p-8 shadow-xl border border-[#e5e7eb] animate-fade-in">
        <h1 className="mb-6 text-center text-2xl font-bold text-[#2d5a27]">
          لوحة تحكم الأدمن | פאנל ניהול
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              كلمة السر | סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#2d5a27] focus:ring-2 focus:ring-[#2d5a27] outline-none transition-all"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#2d5a27] py-3 font-semibold text-white hover:bg-[#1e3d1a] transition-all disabled:opacity-50"
          >
            {loading ? 'جاري الدخول...' : 'دخول | כניסה'}
          </button>
        </form>
      </div>
    </div>
  );
}
