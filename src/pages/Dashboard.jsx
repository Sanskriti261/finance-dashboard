import SummaryCard from "../components/SummaryCard";
import CustomLineChart from "../components/Charts/LineChart";
import CustomPieChart from "../components/Charts/PieChart";
import TransactionTable from "../components/TransactionTable";
import { FaWallet, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const { transactions } = useContext(AppContext);

  //  EXPORT CSV
  const exportToCSV = () => {
    if (!transactions.length) return;

    const headers = ["Date", "Category", "Amount", "Type"];

    const rows = transactions.map((t) => [
      t.date,
      t.category,
      t.amount,
      t.type,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);

    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");

    document.body.appendChild(link);
    link.click();
  };

  //  PIE DATA
  const getPieData = () => {
    const expenseData = transactions.filter((t) => t.type === "expense");

    const grouped = expenseData.reduce((acc, curr) => {
      acc[curr.category] =
        (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    return Object.keys(grouped)
      .map((key) => ({
        name: key,
        value: grouped[key],
      }))
      .sort((a, b) => b.value - a.value);
  };

  const pieData = getPieData();

  //  LINE DATA
  const getLineData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr"];

    const grouped = {
      Jan: { income: 0, expense: 0 },
      Feb: { income: 0, expense: 0 },
      Mar: { income: 0, expense: 0 },
      Apr: { income: 0, expense: 0 },
    };

    transactions.forEach((t) => {
      const date = new Date(t.date);
      if (date.getFullYear() !== 2026) return;

      const month = date.toLocaleString("default", {
        month: "short",
      });

      if (!months.includes(month)) return;

      if (t.type === "income") {
        grouped[month].income += t.amount;
      } else {
        grouped[month].expense += t.amount;
      }
    });

    return months.map((month) => ({
      month,
      balance:
        grouped[month].income - grouped[month].expense,
    }));
  };

  const lineData = getLineData();

  //  SUMMARY
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  //  MONTHLY BALANCES
  const getMonthlyBalances = () => {
    const months = ["Jan", "Feb", "Mar", "Apr"];

    const grouped = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
    };

    transactions.forEach((t) => {
      const date = new Date(t.date);
      if (date.getFullYear() !== 2026) return;

      const month = date.toLocaleString("default", {
        month: "short",
      });

      if (!months.includes(month)) return;

      if (t.type === "income") {
        grouped[month] += t.amount;
      } else {
        grouped[month] -= t.amount;
      }
    });

    return months.map((m) => grouped[m]);
  };

  const balances = getMonthlyBalances();

  const march = balances[2];
  const april = balances[3];

  const growth =
    march !== 0 ? ((april - march) / march) * 100 : 0;

  const barData = [
    { name: "Mar", value: march },
    { name: "Apr", value: april },
  ];

  //  INSIGHTS
  const topCategory = pieData.length > 0 ? pieData[0] : null;
  const difference = april - march;

  const getMonthlyExpenses = () => {
    const months = ["Jan", "Feb", "Mar", "Apr"];

    const grouped = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
    };

    transactions.forEach((t) => {
      const date = new Date(t.date);
      if (date.getFullYear() !== 2026) return;

      const month = date.toLocaleString("default", {
        month: "short",
      });

      if (!months.includes(month)) return;

      if (t.type === "expense") {
        grouped[month] += t.amount;
      }
    });

    return months.map((m) => grouped[m]);
  };

  const expenses = getMonthlyExpenses();

  const expenseGrowth =
    expenses[2] !== 0
      ? ((expenses[3] - expenses[2]) / expenses[2]) * 100
      : 0;

  //  SMART INSIGHTS
  const generateInsights = () => {
    let insights = [];

    if (topCategory) {
      insights.push(
        `${topCategory.name} is your highest spending category `
      );
    }

    if (expenseGrowth > 10) {
      insights.push("Your expenses are increasing rapidly ");
    } else if (expenseGrowth < 0) {
      insights.push("Your expenses are decreasing ");
    }

    if (difference > 0) {
      insights.push(`You saved ₹${difference} more this month `);
    } else {
      insights.push(
        `You spent ₹${Math.abs(difference)} more this month ⚠️`
      );
    }

    return insights;
  };

  const smartInsights = generateInsights();

  return (
    <div className="p-6 space-y-10">

      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Dashboard Overview
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard title="Balance" amount={balance} color="from-blue-500 to-blue-600" icon={<FaWallet />} growth={growth} />
        <SummaryCard title="Income" amount={totalIncome} color="from-green-500 to-green-600" icon={<FaArrowDown />} growth={growth} />
        <SummaryCard title="Expense" amount={totalExpense} color="from-red-500 to-red-600" icon={<FaArrowUp />} growth={growth} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Balance Trend (Jan–Apr 2026)
          </h2>
          <CustomLineChart data={lineData} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-semibold mb-4">
            Spending Breakdown
          </h2>
          <CustomPieChart data={pieData} />
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Top Spending</p>
          <h2 className="text-xl font-bold mt-2">
            {topCategory ? `${topCategory.name} ₹${topCategory.value}` : "No Data"}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Monthly Comparison</p>
            <h2 className="text-lg font-bold mt-2">Mar → Apr</h2>
            <p className="text-sm mt-1 text-blue-500">
              ₹{Math.abs(difference)} {difference >= 0 ? "more" : "less"} in April
            </p>
          </div>

          <div className="w-32 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <p className="text-sm text-gray-500">Expense Trend</p>
          <h2 className={`text-xl font-bold mt-2 ${expenseGrowth >= 0 ? "text-red-500" : "text-green-500"}`}>
            {expenseGrowth.toFixed(1)}%
          </h2>
          <p className="text-sm text-gray-500">
            {expenseGrowth >= 0 ? "Increase" : "Decrease"} from last month
          </p>
        </div>

      </div>

      {/*  SMART INSIGHTS */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500 mb-3">Smart Insights</p>
        <ul className="space-y-2">
          {smartInsights.map((insight, index) => (
            <li key={index}>• {insight}</li>
          ))}
        </ul>
      </div>

      {/* Transactions + Export */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>

          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
          >
            ⬇ Export CSV
          </button>
        </div>

        <TransactionTable />
      </div>

    </div>
  );
};

export default Dashboard;