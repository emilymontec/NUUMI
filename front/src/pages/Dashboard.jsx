import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "../components/Card";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    api.get("/api/transactions").then(res => setTransactions(res.data));
  }, []);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <Card title="Ingresos" value={`$${income}`} color="from-green-400 to-green-600" />
        <Card title="Gastos" value={`$${expenses}`} color="from-red-400 to-red-600" />
        <Card title="Balance" value={`$${income - expenses}`} color="from-indigo-400 to-indigo-600" />

      </div>

      <ul className="space-y-2">
        {transactions.map(t => (
          <li
            key={t.id}
            className="flex justify-between bg-white p-3 rounded shadow"
          >
            <span>{t.category}</span>
            <span
              className={t.type === "income" ? "text-green-600" : "text-red-600"}
            >
              ${t.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
