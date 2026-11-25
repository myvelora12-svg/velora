import { NextRequest, NextResponse } from "next/server";
import { findHardcodedOrder } from "@/lib/hardcoded-orders";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ error: "Query parameter q dibutuhkan" }, { status: 400 });
  }
  if (q.length < 3 || q.length > 64) {
    return NextResponse.json({ error: "Format pencarian tidak valid" }, { status: 400 });
  }

  const order = findHardcodedOrder(q);

  if (!order) {
    return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ order });
}
