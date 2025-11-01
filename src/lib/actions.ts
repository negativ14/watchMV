// app/auth/actions.ts
"use server";

export async function handleAuth(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Email:", email);
  console.log("Password:", password);

  return { success: true, message: "Authentication successful" };
}
