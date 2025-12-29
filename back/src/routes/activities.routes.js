import { Router } from "express";
import { supabase } from "../../db.js";

const router = Router();

// GET
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("date", { ascending: false });

  if (error) return res.status(500).json(error);
  res.json(data);
});

// POST
router.post("/", async (req, res) => {
  const { type, amount, category, date } = req.body;

  const { data, error } = await supabase
    .from("activities")
    .insert([{ type, amount, category, date }])
    .select()
    .single();

  if (error) return res.status(500).json(error);
  res.status(201).json(data);
});

// DELETE
router.delete("/:id", async (req, res) => {
  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json(error);
  res.json({ success: true });
});

export default router;