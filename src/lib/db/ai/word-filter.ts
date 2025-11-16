import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function isBadQuestion(text: string) {
  try {
    const prompt = `
      Kamu adalah AI moderation.
      Tugas: tentukan apakah teks ini mengandung kata kasar, penghinaan, seksual eksplisit, ujaran kebencian, atau ancaman.
      Jawab hanya "TRUE" jika teks buruk, atau "FALSE" jika aman.

      Teks: "${text}"
    `;

    const { text: output } = await generateText({
      model: google("gemini-2.0-flash"),
      prompt,
    });

    return output.trim().toUpperCase() === "TRUE";
  } catch (error) {
    console.error("Failed to filter text:", error);
    return false;
  }
}
