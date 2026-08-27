import { NextResponse } from "next/server";

import { getFundById, mutualFunds } from "@/data/funds";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const fund = getFundById(id);

  if (!fund) {
    return NextResponse.json({ error: "Fund not found" }, { status: 404 });
  }

  return NextResponse.json(fund);
}

export async function POST() {
  const funds = mutualFunds.map((fund) => ({
    ...fund,
    nav: Number((fund.nav * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2)),
  }));

  return NextResponse.json({ funds, updatedAt: new Date().toISOString() });
}
