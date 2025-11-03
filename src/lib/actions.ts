// app/auth/actions.ts
"use server";

export async function handleAuth(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  return { success: true, message: "Authentication successful" };
}
