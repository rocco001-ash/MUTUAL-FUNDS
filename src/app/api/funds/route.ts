import { NextResponse } from "next/server";

import { mutualFunds } from "@/data/funds";

export async function GET() {
  return NextResponse.json({ funds: mutualFunds });
}
