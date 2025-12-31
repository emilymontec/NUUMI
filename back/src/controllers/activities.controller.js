import {
  createActivity,
  getActivitiesByUser,
} from "../services/activities.service.js";

export const addActivity = async (req, res) => {
  try {
    const { type, amount, category, description } = req.body;
    const userId = req.user.id;

    if (!type || !amount || !category) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const activity = await createActivity({
      user_id: userId,
      type,
      amount,
      category,
      description,
    });

    res.status(201).json(activity);
  } catch (err) {
    res.status(500).json({
      message: "Error creando actividad",
      debug: err.message,
    });
  }
};

export const getMyActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    const activities = await getActivitiesByUser(userId);
    res.json(activities);
  } catch (err) {
    res.status(500).json({
      message: "Error obteniendo actividades",
      debug: err.message,
    });
  }
};
