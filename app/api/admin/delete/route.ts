import { getData, mutateData } from "@/app/util/data";
import { unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const id = formData.get('id');

  if (typeof id !== 'string') {
    return NextResponse.json({ message: 'Bad request format' }, { status: 400 });
  }

  const data = getData();

  if (!data.images[id]) {
    return NextResponse.json({ message: 'Image not found' }, { status: 404 });
  }

  try {
    await unlink(path.join(process.cwd(), 'public/images', data.images[id].filename));
  } catch (e: unknown) {
    console.error(e);
    return NextResponse.json({ message: 'Failed to delete image file' }, { status: 500 });
  }

  mutateData((data) => {
    delete data.images[id];
    if (data.featuredImages.includes(id)) {
      data.featuredImages.splice(data.featuredImages.findIndex(x => x === id), 1);
    }
    if (data.publishedImages.includes(id)) {
      data.publishedImages.splice(data.publishedImages.findIndex(x => x === id), 1);
    }
    if (data.titleBg === id) {
      data.titleBg = undefined;
    }
    if (data.exploreBg === id) {
      data.exploreBg = undefined;
    }
    return data;
  });

  return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });
}
