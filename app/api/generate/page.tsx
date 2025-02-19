import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generate(req, res) {
  const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = req;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}
