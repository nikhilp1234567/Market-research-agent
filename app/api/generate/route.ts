import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import env from "dotenv";

env.config({ path: ".env.local" });

export async function GET() {
  return new Response(JSON.stringify({ message: "Success" }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  console.log("the post method has been called successfully");
  const dataFromForm = await req.json();

  try {
    const title = dataFromForm.name;
    const description = dataFromForm.campaignDescription;
    const category = dataFromForm.campaignCategory;
    const employment = dataFromForm.employmentSituation;
    const files = dataFromForm.files;
    const gender = dataFromForm.gender;
    const goal = dataFromForm.goal;
    const income = dataFromForm.householdIncome;
    const interests = dataFromForm.interests;
    const locations = dataFromForm.locations;
    const maritalStatus = dataFromForm.maritalStatus;
    const links = dataFromForm.relevantLinks;

    console.log(`the title: ${title} and description: ${description} have been extracted`);

    let demographics = await getTargetMarket(title, description, employment, gender, income, interests, locations, maritalStatus);
    console.log(`the demographics are ${demographics}`);

    // let initialFeedback = await getInitialFeedback(
    //   title,
    //   description,
    //   category,
    //   employment,
    //   files,
    //   gender,
    //   goal,
    //   income,
    //   interests,
    //   locations,
    //   maritalStatus,
    //   links
    // );
    // console.log(initialFeedback);

    //generate synthetic demographic data

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

async function getInitialFeedback(
  title: string,
  description: string,
  category: string,
  employment: string,
  files: File[],
  gender: string,
  goal: string,
  income: string,
  interests: string,
  locations: string,
  maritalStatus: string[],
  links: string
) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const schema = {
    description: "List of demographic profiles",
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
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const result = await model.generateContent(``);
  return result.response.text();
}

async function getTargetMarket(
  title: string,
  description: string,
  employment: string,
  gender: string,
  income: string,
  interests: string,
  locations: string,
  maritalStatus: string[]
) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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
   household income, marital status, number of dependents, ethnicity, and industry/job role. 
   The demographics should be representative of those who would realistically be selected for market research based on the following product, 
   business, or service idea provided here: 
   name is ${title}, description is ${description}. Take into account the following demographic constraints which have been inputted: 
  
  employment industries, roles, sectors etc: ${employment}
  gender / genders: ${gender}
  income range: ${income}
  interests and behaviours: ${interests}
  locations: ${locations}
  marital status: ${maritalStatus}
  
  If any of these are unclear or not filled out, you are allowed to use the full range of that demographic.`
  );
  return result.response.text();
}
