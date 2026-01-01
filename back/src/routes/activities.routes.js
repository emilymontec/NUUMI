import { Router } from "express";
import { supabase } from "../config/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error obteniendo actividades",
      debug: err.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const { type, amount, category, date } = req.body;

    if (!type || !amount || !category || !date) {
      return res.status(400).json({
        message: "type, amount, category y date son obligatorios",
      });
    }

    const { data, error } = await supabase
      .from("activities")
      .insert([
        {
          type,
          amount,
          category,
          date,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Error creando actividad",
      debug: err.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("activities")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({
      message: "Error eliminando actividad",
      debug: err.message,
    });
  }
});

export default router;
