import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("⚠️ Missing Google API Key. Set VITE_GOOGLE_API_KEY in your .env file.");
}

const ai = new GoogleGenAI({ apiKey });

async function run(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // latest model name
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    return response.text; // ✅ correct way in new SDK
  } catch (error) {
    console.error("Gemini API error:", error);
    return (
      "⚠️ Notice: This application requires a valid API key to function. To use it:\n\n" +
      "1. Fork the project from GitHub.\n" +
      "2. Obtain your own Google API key.\n" +
      "3. Add the key to a `.env` file in the root directory with the name `VITE_GOOGLE_API_KEY`.\n\n" +
      "Ensure the project is built and deployed correctly with your configuration.\n\n" +
      "Thank you for your interest and support! 😊"
    );
  }
}

export default run;
