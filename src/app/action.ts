"use server";

import { turso } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const age = Number.parseInt(formData.get("age") as string);

  if (!name || isNaN(age)) {
    throw new Error("名前と年齢を正しく入力してください");
  }

  try {
    await turso.execute({
      sql: "INSERT INTO users (name, age) VALUES (?, ?)",
      args: [name, age],
    });

    // Revalidate the home page to show the updated user list
    revalidatePath("/");
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("ユーザー登録中にエラーが発生しました");
  }
}
