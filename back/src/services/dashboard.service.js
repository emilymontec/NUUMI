import { supabase } from "../config/db.js";

const getHomeCards = async () => {
  const { data: activities, error } = await supabase
    .from("activities")
    .select("type, amount, created_at");

  if (error) throw error;

  let income = 0;
  let expenses = 0;

  activities.forEach((a) => {
    if (a.type === "income") income += a.amount;
    if (a.type === "expense") expenses += a.amount;
  });

  return {
    balanceCard: {
      total: income - expenses,
      income,
      expenses,
    },
    todayCard: {
      expensesToday: expenses,
    },
    insightCard: {
      message:
        expenses > income
          ? "¡Ey! Estás gastando más de lo que ganas..."
          : "¡Vas bien! Sigue así.",
    },
  };
};

export default { getHomeCards };
