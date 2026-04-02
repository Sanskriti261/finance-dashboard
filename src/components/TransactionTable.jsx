import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const TransactionTable = () => {
  const { transactions, role, setTransactions } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  //  Filter logic
  const filteredData = transactions.filter((t) => {
    return (
      (typeFilter === "all" || t.type === typeFilter) &&
      t.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  //  Delete
  const handleDelete = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">

      {/*  Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
          Recent Transactions
        </h2>

        {/*  Controls */}
        <div className="flex flex-wrap gap-3 items-center">

          {/* Search */}
          <input
            placeholder="Search..."
            className="px-3 py-2 rounded-lg 
            bg-gray-100 dark:bg-gray-700 
            text-black dark:text-white outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Filter */}
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-lg 
            bg-gray-100 dark:bg-gray-700 
            text-black dark:text-white"
          >
            <option value="all">Filter: All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* ➕ Add Button */}
          {role === "admin" && (
            <button className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
              + Add
            </button>
          )}

        </div>
      </div>

      {/*  Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">

          {/* Header */}
          <thead className="text-gray-400 text-sm uppercase border-b">
            <tr>
              <th className="py-3">Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((t, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-3">{t.date}</td>
                  <td>{t.category}</td>
                  <td className="font-semibold">₹{t.amount}</td>

                  {/* Badge */}
                  <td>
                    <span
                      className={`px-2 py-1 text-sm rounded-full
                      ${
                        t.type === "income"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>

                  {/* Actions */}
                  {role === "admin" && (
                    <td className="space-x-3">
                      <button className="text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-400">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default TransactionTable;