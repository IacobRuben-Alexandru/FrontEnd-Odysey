import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) return NextResponse.json({ error: 'No URL provided' }, { status: 400 });

  try {
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="nasa-image"`,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to proxy image' }, { status: 500 });
  }
}