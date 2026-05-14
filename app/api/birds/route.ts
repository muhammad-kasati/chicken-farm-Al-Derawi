import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bird from '@/models/Bird';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await dbConnect();
    const birds = await Bird.find({}).sort({ createdAt: -1 });
    return NextResponse.json(birds);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminSession = cookieStore.get('admin_session');

    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    const bird = await Bird.create(data);
    return NextResponse.json(bird, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
