import { listUpdateHandler } from "@/app/api/admin/edit/featured/route";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest): Promise<NextResponse> {
  return listUpdateHandler(request, 'published');
}
