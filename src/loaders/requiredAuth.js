import { redirect } from "react-router-dom";
import { getProfile } from "../services/AuthService";

export const requiredAuth = async () => {
  try {
    await getProfile();
  } catch (error) {
    console.log(error.message, error.status);

    if (error.status == 401) {
      localStorage.removeItem("token");
    }

    return redirect("/login");
  }
};
