import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'instagram-feed.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([]);
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading instagram-feed.json:", error);
    return NextResponse.json([], { status: 500 });
  }
}
