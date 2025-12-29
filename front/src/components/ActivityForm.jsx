import { useState } from "react";
import api from "../api/axios";

export default function ActivityForm({ onClose, onCreated }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const submit = async e => {
    e.preventDefault();

    await api.post("/api/activities", {
      type,
      amount: Number(amount),
      category,
      date,
    });

    onCreated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={submit}
        className="bg-white text-gray-800 p-6 rounded-2xl w-80 space-y-4 shadow-xl"
      >
        <h3 className="text-lg font-bold">Nueva actividad</h3>

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="expense">Gasto</option>
          <option value="income">Ingreso</option>
        </select>

        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        <input
          placeholder="Categoría"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full border rounded p-2"
          required
        />

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
