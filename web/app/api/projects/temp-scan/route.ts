import { NextRequest, NextResponse } from 'next/server';
import { scanClipsFolder } from '@/lib/clips';

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');

  if (!path) {
    return NextResponse.json({ count: 0, valid: false });
  }

  try {
    const clips = await scanClipsFolder(path);
    return NextResponse.json({ count: clips.length, valid: true });
  } catch {
    return NextResponse.json({ count: 0, valid: false });
  }
}
