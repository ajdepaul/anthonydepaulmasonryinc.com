import { mutateData } from "@/app/util/data";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  const formData = await request.formData();

  const background = formData.get('background');
  const dimStr = formData.get('dim');

  if (
    (background !== 'title' && background !== 'explore')
    || typeof dimStr !== 'string'
    || isNaN(parseInt(dimStr))
  ) {
    return NextResponse.json({ message: 'Bad request format' }, { status: 400 });
  }

  const dim = parseInt(dimStr) / 100;

  mutateData((data) => {
    if (background === 'title') { data.titleBgDim = dim; }
    else if (background === 'explore') { data.exploreBgDim = dim; }
    return data;
  });

  return NextResponse.json({ message: 'Background dim updated' });
}
