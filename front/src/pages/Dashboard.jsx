import { useEffect, useState } from "react";
import api from "../api/axios";
import Card from "../components/Card";
import MovementForm from "../components/ActivityForm";

export default function Dashboard() {
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Cargar actividades desde backend
  const loadActivities = async () => {
    try {
      const res = await api.get("/api/activities");
      setActivities(res.data);
    } catch (error) {
      console.error("Error loading activities", error);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  // Cálculos
  const income = activities
    .filter(a => a.type === "income")
    .reduce((sum, a) => sum + Number(a.amount), 0);

  const expenses = activities
    .filter(a => a.type === "expense")
    .reduce((sum, a) => sum + Number(a.amount), 0);

  const balance = income - expenses;

  return (
    <div className="min-h-screen bg-black-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resumen</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          + Agregar actividad
        </button>
      </div>

      {/* Flashcards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card
          title="Ingresos"
          value={`$${income}`}
          color="from-green-400 to-green-600"
        />
        <Card
          title="Gastos"
          value={`$${expenses}`}
          color="from-red-400 to-red-600"
        />
        <Card
          title="Balance"
          value={`$${balance}`}
          color="from-indigo-400 to-indigo-600"
        />
      </div>

      {/* Lista de actividades */}
      <div className="bg-grey rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">Actividades recientes</h2>

        {activities.length === 0 && (
          <p className="text-gray-500 text-sm">No hay actividades aún</p>
        )}

        <ul className="space-y-2">
          {activities.map(activity => (
            <li
              key={activity.id}
              className="flex justify-between items-center border-b last:border-none py-2"
            >
              <div>
                <p className="font-medium">{activity.category}</p>
                <p className="text-xs text-gray-400">{activity.date}</p>
              </div>

              <span
                className={`font-semibold ${
                  activity.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {activity.type === "income" ? "+" : "-"}$
                {activity.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal formulario */}
      {showForm && (
        <MovementForm
          onClose={() => setShowForm(false)}
          onCreated={loadActivities}
        />
      )}
    </div>
  );
}
