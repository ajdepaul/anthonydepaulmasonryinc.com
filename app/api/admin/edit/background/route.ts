import { getData, mutateData } from "@/app/util/data";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const background = formData.get('background');
  const id = formData.get('id');

  if (
    (background !== 'title' && background !== 'explore')
    || typeof id !== 'string'
  ) {
    return NextResponse.json({ message: 'Bad request format' }, { status: 400 });
  }

  const data = getData();

  if (!data.images[id]) {
    return NextResponse.json({ message: 'Image not found' }, { status: 404 });
  }

  mutateData((data) => {
    if (background === 'title') {
      data.titleBg = id;
    } else {
      data.exploreBg = id;
    }
    return data;
  });

  return NextResponse.json({ message: 'Background image updated' });
}
