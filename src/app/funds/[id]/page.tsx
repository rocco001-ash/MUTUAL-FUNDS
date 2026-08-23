import Link from "next/link";
import { notFound } from "next/navigation";

import { getFundById } from "@/data/funds";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default async function FundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fund = getFundById(id);

  if (!fund) {
    notFound();
  }

  return (
    <main>
      <Link className="back-link" href="/">
        ← Back to dashboard
      </Link>

      <section className="panel hero">
        <h1>{fund.name}</h1>
        <p>
          {fund.symbol} · {fund.category}
        </p>
      </section>

      <section className="detail-grid">
        <article className="panel detail-card">
          <span>Net asset value</span>
          <strong>{formatCurrency(fund.nav)}</strong>
        </article>
        <article className="panel detail-card">
          <span>Expense ratio</span>
          <strong>{formatPercent(fund.expenseRatio)}</strong>
        </article>
        <article className="panel detail-card">
          <span>1-year return</span>
          <strong className="positive">{formatPercent(fund.oneYearReturn)}</strong>
        </article>
      </section>
    </main>
  );
}
