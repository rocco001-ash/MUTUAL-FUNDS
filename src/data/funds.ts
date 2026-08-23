export type MutualFund = {
  id: string;
  name: string;
  symbol: string;
  category: string;
  nav: number;
  expenseRatio: number;
  oneYearReturn: number;
};

export const mutualFunds: MutualFund[] = [
  {
    id: "vfiax",
    name: "Vanguard 500 Index Admiral",
    symbol: "VFIAX",
    category: "Large Blend",
    nav: 512.34,
    expenseRatio: 0.04,
    oneYearReturn: 24.8,
  },
  {
    id: "vtsax",
    name: "Vanguard Total Stock Market Admiral",
    symbol: "VTSAX",
    category: "Large Blend",
    nav: 128.91,
    expenseRatio: 0.04,
    oneYearReturn: 23.1,
  },
  {
    id: "vbilx",
    name: "Vanguard Total Bond Market Index Admiral",
    symbol: "VBILX",
    category: "Intermediate Core Bond",
    nav: 10.42,
    expenseRatio: 0.05,
    oneYearReturn: 4.2,
  },
  {
    id: "vigax",
    name: "Vanguard Growth Index Admiral",
    symbol: "VIGAX",
    category: "Large Growth",
    nav: 198.55,
    expenseRatio: 0.05,
    oneYearReturn: 31.6,
  },
  {
    id: "vbtlx",
    name: "Vanguard Total International Bond Admiral",
    symbol: "VBTLX",
    category: "Global Bond",
    nav: 21.07,
    expenseRatio: 0.07,
    oneYearReturn: 3.8,
  },
];

export function getFundById(id: string): MutualFund | undefined {
  return mutualFunds.find((fund) => fund.id === id);
}
