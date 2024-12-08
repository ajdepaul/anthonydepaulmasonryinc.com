import { getData, mutateData } from "@/app/util/data";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const id = formData.get('id');
  const name = formData.get('name');
  const description = formData.get('description');
  const isPublished = formData.get('isPublished');
  const isFeatured = formData.get('isFeatured');

  if (
    typeof id !== 'string'
    || typeof name !== 'string'
    || typeof description !== 'string'
    || (isPublished !== 'true' && isPublished !== 'false')
    || (isFeatured !== 'true' && isFeatured !== 'false')
  ) {
    return NextResponse.json({ message: 'Bad request format' }, { status: 400 });
  }

  const data = getData();

  if (!data.images[id]) {
    return NextResponse.json({ message: 'Image not found' }, { status: 404 });
  }

  let updated = false;
  mutateData((data) => {
    const targetName = name === '' ? undefined : name;

    if (data.images[id].name !== targetName) {
      data.images[id] = { ...data.images[id], name: targetName };
      updated = true;
    }

    const targetDescription = description === '' ? undefined : description;
    if (data.images[id].description !== targetDescription) {
      data.images[id] = { ...data.images[id], description: targetDescription };
      updated = true;
    }

    if (isPublished === 'true' && !data.publishedImages.includes(id)) {
      data.publishedImages.push(id);
      updated = true;
    } else if (isPublished === 'false' && data.publishedImages.includes(id)) {
      const i = data.publishedImages.findIndex((publishedImageId) => publishedImageId === id);
      data.publishedImages.splice(i, 1);
      updated = true;
    }

    if (isFeatured === 'true' && !data.featuredImages.includes(id)) {
      data.featuredImages.push(id);
      updated = true;
    } else if (isFeatured === 'false' && data.featuredImages.includes(id)) {
      const i = data.featuredImages.findIndex((featuredImageId) => featuredImageId === id);
      data.featuredImages.splice(i, 1);
      updated = true;
    }

    if (updated) {
      data.images[id] = { ...data.images[id], lastUpdated: new Date().toISOString() }
    }

    return data;
  });

  return NextResponse.json({ message: updated ? 'Image data updated' : 'Image data unchanged' }, { status: 200 });
}
