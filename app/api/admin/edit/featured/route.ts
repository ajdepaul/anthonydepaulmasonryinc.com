import { getData, mutateData } from "@/app/util/data";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return listUpdateHandler(request, 'featured');
}

export async function listUpdateHandler(request: NextRequest, list: 'featured' | 'published'): Promise<NextResponse> {
  const formData = await request.formData();

  const index1Str = formData.get('index1');
  const index2Str = formData.get('index2');

  if (
    typeof index1Str !== 'string'
    || isNaN(parseInt(index1Str))
    || typeof index2Str !== 'string'
    || isNaN(parseInt(index2Str))
  ) {
    return NextResponse.json({ message: 'Bad request format' }, { status: 400 });
  }

  const index1 = parseInt(index1Str);
  const index2 = parseInt(index2Str);

  const data = getData();
  const listToUpdate = list === 'featured' ? data.featuredImages : data.publishedImages;

  if (listToUpdate.length <= index1 || listToUpdate.length <= index2) {
    return NextResponse.json({ message: 'Image index out of bounds' }, { status: 400 });
  }

  mutateData((data) => {
    const listToUpdate = list === 'featured' ? data.featuredImages : data.publishedImages;
    const temp = listToUpdate[index1];
    listToUpdate[index1] = listToUpdate[index2];
    listToUpdate[index2] = temp;
    return data;
  });

  return NextResponse.json({ message: `${list === 'featured' ? 'Featured' : 'Published'} list updated` });
}
