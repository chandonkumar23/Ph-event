// src/utils/auth.js
import { redirect } from "react-router-dom";

export function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    return redirect("/unauthorized"); 
  }
  return null; 
}
