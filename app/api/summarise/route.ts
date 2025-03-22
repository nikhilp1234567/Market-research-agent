import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import env from "dotenv";

env.config({ path: ".env.local" });

export async function POST(req: Request) {
  console.log("[POST] /api/summarise endpoint called");
  const dataToSummarise = await req.json();
  console.log("[DEBUG] Received form data:", JSON.stringify(dataToSummarise, null, 2));

  let summary = await getSummaries(dataToSummarise);
  console.log("[DEBUG] Generated summary:", summary);

  return new Response(JSON.stringify(summary), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function GET(req: Request) {
  console.log("[GET] /api/summarise endpoint called");

  const url = new URL(req.url);
  const dataToSummarise = url.searchParams.get('data');

    if (!dataToSummarise) {
      return new Response(JSON.stringify({error: "No data provided "}), {
        status: 400,
        headers: { "Content-Type": "application/json"},
      })
    }

    let summary = await getSummaries(JSON.parse(dataToSummarise));

    return new Response(JSON.stringify(summary), {
      headers: { "Content-Type": "application/json"},
    });
}


async function getSummaries(data: { data: string[] }) {
  console.log("[DEBUG] Starting summarisation process...");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const dataToBePassedIn = JSON.stringify(data.data);
  const prompt = `summarise the following as a single paragraph of prose. Make it as concise as possible, preferably one or two short sentences: ${dataToBePassedIn}`;
  console.log("[DEBUG] Prompt being sent to Gemini:", prompt);
  const result = await model.generateContent(prompt);
  console.log("[DEBUG] Raw response from Gemini:", result);
  return result.response.text();
}
