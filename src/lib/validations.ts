// lib/validations/auth.ts
import { UserData } from "@/types/types";
import { toast } from "sonner";
import { z } from "zod";

export const authSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export type AuthFormData = z.infer<typeof authSchema>;

export const validateCredentials = (
  email: string,
  password: string,
  authType: string
) => {
  const existingUser = localStorage.getItem("userData");
  const existingUserObject = existingUser && JSON.parse(existingUser);

  if (authType === "signup") {
    const userData: UserData = {
      email,
      password,
      kidMode: false,
      language: "en",
      favorites: {
        movies: [],
        tv: [],
      },
      watchLater: {
        movies: [],
        tv: [],
      },
      watchHistory: [],
      searchHistory: [],
    };

    if (existingUser && existingUserObject?.email === email) {
      toast.error("Account already exist! Go to sign in.");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(userData));

    document.cookie = "auth=true; path=/; max-age=604800";

    return { success: true, user: userData };
  }

  if (existingUserObject?.email !== email) {
    toast.error("Email does not exist! Try sign up.");
    return;
  }

  if (existingUserObject?.password !== password) {
    toast.error("Incorrect password!");
    return;
  }

  document.cookie = "auth=true; path=/; max-age=604800";

  return { success: true, user: existingUserObject };
};

export const logout = () => {
  document.cookie = "auth=; path=/; max-age=0";
  return { success: true };
};
