import { useState } from "react";
import { useDashboard } from "./useDashboard";
import FlashCard from "../../components/FlashCard";
import SkeletonCard from "../../components/ui/SkeletonCard";

import StatusCard from "../../components/cards/StatusCard";
import TodayCard from "../../components/cards/TodayCard";
import MonthCard from "../../components/cards/MonthCard";

import MovementForm from "../../components/forms/ActivityForm";

export default function Dashboard() {
  const {
    activities,
    dashboardData,
    loading,
    reload
  } = useDashboard();

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-black-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">¿Cómo estoy ahora?</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          + Agregar actividad
        </button>
      </div>

      {/* FLASHCARDS */}
      {loading ? (
        <div className="flex gap-4 overflow-x-auto">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : (
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
          <FlashCard>
            <StatusCard
              balance={dashboardData.status.balance}
            />
          </FlashCard>

          <FlashCard>
            <TodayCard
              expenses={dashboardData.today.expenses}
            />
          </FlashCard>

          <FlashCard>
            <MonthCard
              expenses={dashboardData.month.expenses}
            />
          </FlashCard>
        </div>
      )}

      {/* Actividades recientes (sin tocar) */}
      <div className="bg-grey rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-3">
          Actividades recientes
        </h2>

        {activities.length === 0 && (
          <p className="text-gray-500 text-sm">
            No hay actividades aún
          </p>
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

      {/* Modal */}
      {showForm && (
        <MovementForm
          onClose={() => setShowForm(false)}
          onCreated={reload}
        />
      )}
    </div>
  );
}
