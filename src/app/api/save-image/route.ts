import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  try {
    const { id, dataUrl } = await request.json();
    if (!id || !dataUrl) return NextResponse.json({ error: 'Missing id or dataUrl' }, { status: 400, headers: CORS_HEADERS });

    const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!matches) return NextResponse.json({ error: 'Invalid dataUrl' }, { status: 400, headers: CORS_HEADERS });

    const ext = matches[1].includes('jpeg') || matches[1].includes('jpg') ? 'jpg' : 'webp';
    const buffer = Buffer.from(matches[2], 'base64');

    const dir = path.join(process.cwd(), 'public', 'produtos');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const filename = `${id}.${ext}`;
    fs.writeFileSync(path.join(dir, filename), buffer);

    return NextResponse.json({ ok: true, path: `/produtos/${filename}` }, { headers: CORS_HEADERS });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500, headers: CORS_HEADERS });
  }
}
