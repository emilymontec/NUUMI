import { Router } from "express";
import { transactions } from "../db.js";

const router = Router();

// GET all
router.get("/", (req, res) => {
  res.json(transactions);
});

// POST create
router.post("/", (req, res) => {
  const { type, amount, category, date } = req.body;

  const newTransaction = {
    id: Date.now(),
    type,
    amount,
    category,
    date,
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// DELETE
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = transactions.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: "Not found" });

  transactions.splice(index, 1);
  res.json({ success: true });
});

export default router;
