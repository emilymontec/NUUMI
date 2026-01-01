import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios";

export const useDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadActivities = async () => {
    try {
      const res = await api.get("/api/activities");
      setActivities(res.data);
    } catch (error) {
      console.error("Error loading activities", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const income = useMemo(
    () =>
      activities
        .filter(a => a.type === "income")
        .reduce((sum, a) => sum + Number(a.amount), 0),
    [activities]
  );

  const expenses = useMemo(
    () =>
      activities
        .filter(a => a.type === "expense")
        .reduce((sum, a) => sum + Number(a.amount), 0),
    [activities]
  );

  const balance = income - expenses;

  const dashboardData = {
    status: {
      balance
    },
    today: {
      expenses
    },
    month: {
      expenses
    }
  };

  return {
    activities,
    dashboardData,
    loading,
    reload: loadActivities
  };
};
