import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import dbConnect from '@/lib/mongodb';
import Bird from '@/models/Bird';

export default async function AdminPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  const { lang } = await props.params;

  if (!adminSession || adminSession.value !== 'authenticated') {
    redirect(`/${lang}/admin/login`);
  }

  await dbConnect();
  const birds = await Bird.find({}).sort({ createdAt: -1 });

  return (
    <div className="min-h-screen bg-[#f7f9f7] py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-[#2d5a27]">
            لوحة تحكم الطيور | ניהול עופות
          </h1>
          <a
            href={`/${lang}`}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm border border-gray-200 hover:bg-gray-50 transition-all"
          >
            العودة للموقع | חזרה לאתר
          </a>
        </div>
        <AdminDashboard initialBirds={JSON.parse(JSON.stringify(birds))} lang={lang} />
      </div>
    </div>
  );
}
