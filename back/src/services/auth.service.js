import { supabase } from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/password.js";

export const findUser = async (username) => {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .single();
  return data;
};

export const createUser = async (username, password) => {
  const hash = await hashPassword(password);

  const { data } = await supabase
    .from("users")
    .insert([{ username, password: hash, role: "user" }])
    .select()
    .single();

  return data;
};

export const validatePassword = async (password, hash) =>
  comparePassword(password, hash);
