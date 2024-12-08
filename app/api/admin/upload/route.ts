import { mutateData } from '@/app/util/data';
import { nanoid } from '@/app/util/nanoid';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { getPlaiceholder } from 'plaiceholder';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const fileBlobs = formData.getAll('files');
  if (
    !fileBlobs
    || !Array.isArray(fileBlobs)
    || !fileBlobs.every(fileBlob => fileBlob instanceof Blob)
  ) {
    return NextResponse.json({ message: 'Bad request format' }, { status: 400 });
  }

  fileBlobs.map(async fileBlob => {
    const buffer = Buffer.from(await fileBlob.arrayBuffer());
    const id = nanoid();
    const filename = `${id}${fileBlob.name.substring(fileBlob.name.lastIndexOf('.'))}`;
    const uploadLoc = path.join(process.cwd(), 'public/images', filename);

    try {
      await writeFile(uploadLoc, buffer);
    } catch (e: unknown) {
      console.error(e);
      return NextResponse.json({ message: 'Failed to save image file' }, { status: 500 });
    }

    try {
      const placeholder = await getPlaiceholder(buffer);
      mutateData((data) => {
        const now = new Date();
        data.images[id] = {
          filename,
          placeholder: placeholder.base64,
          width: placeholder.metadata.width,
          height: placeholder.metadata.height,
          dateUploaded: now.toISOString(),
          lastUpdated: now.toISOString(),
        }
        return data;
      });
    } catch (e: unknown) {
      console.error(e);
      return NextResponse.json({ message: 'Failed to save image data' }, { status: 500 });
    }
  })


  return NextResponse.json({ message: 'Image uploaded' }, { status: 201 }); // created
}
