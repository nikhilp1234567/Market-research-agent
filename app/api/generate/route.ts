import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import env from "dotenv";
import { init } from "next/dist/compiled/webpack/webpack";

export async function GET() {
  return new Response(JSON.stringify({ message: "Success" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  console.log("the post method has been called successfully");
  const dataFromForm = await req.json();

  try {
    const title = dataFromForm.ideaTitle;
    const description = dataFromForm.ideaDescription;
    console.log(`the title: ${title} and description: ${description} have been extracted`);

    //
    let initialFeedback = await getInitialFeedback(title, description);
    console.log(initialFeedback);

    //generate synthetic demographic data
    let demographics = await getTargetMarket(title, description);
    console.log(`the demographics are ${demographics}`);

    return new Response(JSON.stringify(demographics), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    console.error("Error processing request:", e);
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), {
      status: e instanceof Error ? 500 : 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getInitialFeedback(name: string, description: string) {
  //need to set the gemini thing up here. then structure its outup
}

async function getTargetMarket(name: String, description: String) {
  const genAI = new GoogleGenerativeAI("AIzaSyBXZeaBIqZ_2JBZyIQf7c4-ioKA984WfMY");

  const schema = {
    description: "List of demographic profiles",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        age: { type: SchemaType.STRING, description: "Age range", nullable: false },
        gender: { type: SchemaType.STRING, description: "Gender identity", nullable: false },
        location: { type: SchemaType.STRING, description: "City or country", nullable: false },
        educationLevel: { type: SchemaType.STRING, description: "Highest education attained", nullable: false },
        employmentStatus: { type: SchemaType.STRING, description: "Employment status", nullable: false },
        householdIncome: { type: SchemaType.STRING, description: "Income range", nullable: false },
        maritalStatus: { type: SchemaType.STRING, description: "Marital status", nullable: false },
        numberOfDependents: { type: SchemaType.NUMBER, description: "Number of dependents", nullable: false },
        ethnicity: { type: SchemaType.STRING, description: "Ethnic background", nullable: false },
        industryAndJobRole: { type: SchemaType.STRING, description: "Industry and job role", nullable: false },
      },
      required: [
        "age",
        "gender",
        "location",
        "educationLevel",
        "employmentStatus",
        "householdIncome",
        "maritalStatus",
        "numberOfDependents",
        "ethnicity",
        "industryAndJobRole",
      ],
    },
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const result = await model.generateContent(
    `Generate an array of 25 unique demographic profiles, each containing age, gender, location, education level, employment status, 
   household income, marital status, number of dependents, ethnicity, and industry/job role. The demographics should be representative of 
   those who would realistically be selected for market research based on the following product, business, or service idea provided here: 
   name is ${name}, description is ${description}`
  );
  return result.response.text();
}
