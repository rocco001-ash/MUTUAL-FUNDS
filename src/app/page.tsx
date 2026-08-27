"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { mutualFunds } from "@/data/funds";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function formatPercent(value: number) {
  return `${value.toFixed(2)}%`;
}

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [funds, setFunds] = useState(mutualFunds);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const categories = useMemo(
    () => ["all", ...new Set(mutualFunds.map((fund) => fund.category))],
    [],
  );

  const filteredFunds = useMemo(() => {
    return funds.filter((fund) => {
      const matchesCategory = category === "all" || fund.category === category;
      const normalizedQuery = query.trim().toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 ||
        fund.name.toLowerCase().includes(normalizedQuery) ||
        fund.symbol.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, funds, query]);

  const averageReturn =
    funds.reduce((total, fund) => total + fund.oneYearReturn, 0) / funds.length;

  async function refreshNavs() {
    setIsRefreshing(true);

    try {
      const response = await fetch("/api/funds/vfiax", { method: "POST" });
      const payload = (await response.json()) as {
        funds: typeof mutualFunds;
        updatedAt: string;
      };

      setFunds(payload.funds);
      setLastUpdated(payload.updatedAt);
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <main>
      <section className="panel hero">
        <h1>Mutual Funds Dashboard</h1>
        <p>
          Browse sample fund data, filter by category, and refresh simulated NAV
          values through the API to verify the development environment end to end.
        </p>
      </section>

      <section className="stats">
        <article className="panel stat-card">
          <span>Funds tracked</span>
          <strong>{funds.length}</strong>
        </article>
        <article className="panel stat-card">
          <span>Average 1Y return</span>
          <strong className="positive">{formatPercent(averageReturn)}</strong>
        </article>
        <article className="panel stat-card">
          <span>Last NAV refresh</span>
          <strong>{lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Not yet"}</strong>
        </article>
      </section>

      <section className="panel" style={{ padding: "1.25rem" }}>
        <div className="toolbar">
          <input
            aria-label="Search funds"
            placeholder="Search by name or symbol"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((value) => (
              <option key={value} value={value}>
                {value === "all" ? "All categories" : value}
              </option>
            ))}
          </select>
          <button type="button" onClick={refreshNavs} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing..." : "Refresh NAVs"}
          </button>
        </div>

        <table className="fund-table">
          <thead>
            <tr>
              <th>Fund</th>
              <th>Category</th>
              <th>NAV</th>
              <th>Expense ratio</th>
              <th>1Y return</th>
            </tr>
          </thead>
          <tbody>
            {filteredFunds.map((fund) => (
              <tr key={fund.id}>
                <td>
                  <Link className="fund-link" href={`/funds/${fund.id}`}>
                    {fund.name}
                  </Link>
                  <div style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                    {fund.symbol}
                  </div>
                </td>
                <td>{fund.category}</td>
                <td>{formatCurrency(fund.nav)}</td>
                <td>{formatPercent(fund.expenseRatio)}</td>
                <td className="positive">{formatPercent(fund.oneYearReturn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
