import { supabase } from "../config/db.js";

export const createActivity = async (activity) => {
  const { data, error } = await supabase
    .from("activities")
    .insert([activity])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getActivitiesByUser = async (userId) => {
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};
