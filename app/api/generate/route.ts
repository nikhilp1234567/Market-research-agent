import { GoogleGenerativeAI, SchemaType} from "@google/generative-ai";
import env from "dotenv";

env.config({ path: ".env.local" });

export async function POST(req: Request) {
  console.log("[POST] /api/generate endpoint called");
  const dataFromForm = await req.json();
  console.log("[DEBUG] Received form data:", JSON.stringify(dataFromForm, null, 2));
  let numberOfProfiles = 5;

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

    console.log(`[DEBUG] Extracted fields: 
      Title: ${title}
      Description: ${description}
      Category: ${category}
      Employment: ${employment}
      Gender: ${gender}
      Income: ${income}
      Interests: ${interests}
      Locations: ${locations}
      Marital Status: ${maritalStatus}
      Links: ${links}`);

    console.log("[DEBUG] Starting target market generation...");
    let demographics = await getTargetMarket(title, description, employment, gender, income, interests, locations, maritalStatus, numberOfProfiles);
    console.log("[DEBUG] Received demographics:", demographics);

    let parsedDemographics;
    try {
      parsedDemographics = JSON.parse(demographics);
    console.log(`[DEBUG] Parsed ${parsedDemographics.length} demographic profiles`);
    } catch(error: any) {
      console.error("[ERROR] JSON Parsing Failed:", error);
      console.error("[ERROR] Raw Response", demographics);
      return new Response(JSON.stringify({
        error: "Invalid JSON from getTargetMarket",
        details: error.message
      }), {status: 500, headers: {"Content-Type": "application/json"}})
    }
    
    // Streaming API Response
    const stream = new ReadableStream({
      async start (controller) {
        try {
          // Send demographics first
          controller.enqueue(JSON.stringify({ demographicProfiles: parsedDemographics}));

          console.log("[DEBUG] Fetching feedback in parallel...");
          const feedbackPromises = parsedDemographics.map(async(i: any) => {
            try {
              const feedback = await getInitialFeedback(title, description, category, goal, links, i.age, gender, i.location, i.educationLevel, i.employmentStatus, i.householdIncome, maritalStatus, i.numberOfDependents, i.ethnicity, i.industryAndJobRole, files);
              controller.enqueue(JSON.stringify({ feedback: JSON.parse(feedback) }));
            } catch(error) {
              console.error("[ERROR] Failed to fetch feedbak for:", i, error);
              controller.enqueue(JSON.stringify({ feedback: { error: "Failed to generate feedback" } }));
            }  
          });

          await Promise.all(feedbackPromises);
          controller.close();
        } catch(error) {
          controller.error();
        }
      },
    });

    return new Response(stream, { headers: { "Content-Type": "application/json" } });

  } catch (e: any) {
    console.error("[ERROR] Processing request failed:", e);
    if (e instanceof Error) {
      console.error("[ERROR] Stack trace:", e.stack);
    } else {
      console.error("[ERROR] Unexpected error:", JSON.stringify(e));
    }
    return new Response(JSON.stringify({ 
      error: "An error occurred while processing your request",
      details: e.message || "Unknown error"
     }), {
      status: e instanceof Error ? 500 : 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function getTargetMarket(
  title: string,
  description: string,
  employment: string,
  gender: string,
  income: string,
  interests: string,
  locations: string,
  maritalStatus: string,
  numberOfProfiles: number
) {
  console.log("[DEBUG] Starting getTargetMarket function");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

  const schema = {
    description: "List of demographic profiles",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        id: { type: SchemaType.NUMBER, description: "serial id, should be unique, incrementing by 1 and start from 1", nullable: false },
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
        "id",
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
      maxOutputTokens: 100,
    },
  });

  const result = await model.generateContentStream(
    `Generate an array of ${numberOfProfiles} unique demographic profiles, each containing id, age, gender, location, education level, employment status, 
   household income, marital status, number of dependents, ethnicity, and industry/job role. 
   The demographics should be representative of those who would realistically be selected for market research based on the following product, 
   business, or service idea provided here: 
   the name is ${title} and the description of this product/service/idea is as follows: ${description}. Take into account the following demographic constraints which have been input: 
  
  employment industries, roles, sectors etc: ${employment}
  gender / genders: ${gender}
  income range: ${income}
  interests and behaviours: ${interests}
  locations: ${locations}
  marital status: ${maritalStatus}
  
  If any of these are unclear or not filled out, you are allowed to use the full range of that demographic.`
  );
  console.log("[DEBUG] Generated target market data");
  
  // Allow for streaming output (Text Generation) for faster interactions with the API
  let response = "";
  for await (const chunk of result.stream) {
    response += chunk.text();
    console.log("[STREAM] Chunk received: ", chunk.text());
  }
  console.log("[DEBUG] Full demographics response:", response);
  return response;
}

async function getInitialFeedback(
  title: string,
  description: string,
  category: string,
  goal: string,
  links: string,
  age: string,
  gender: string,
  location: string,
  educationLevel: string,
  employmentStatus: string,
  householdIncome: string,
  maritalStatus: string,
  numberOfDependents: number,
  ethnicity: string,
  industryAndJobRole: string,
  files: any[]
) {
  console.log("[DEBUG] Starting getInitialFeedback function");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const schema = {
    description: "Market feedback report from the perspective of the specified demographic profile",
    type: SchemaType.OBJECT,
    properties: {
      sentiment: {
        type: SchemaType.STRING,
        description: "One word overall sentiment towards the product/service/idea (one from either positive, neutral, or negative)",
        nullable: false,
      },
      goodFitForMarket: {
        type: SchemaType.BOOLEAN,
        description: "Does the demographic consider themselves a good fit for market research of this product/idea/service?",
        nullable: false,
      },
      whatUsersLike: {
        type: SchemaType.STRING,
        description: "Key aspect users appreciates about the product/service/idea",
        nullable: false,
      },
      painPoints: {
        type: SchemaType.STRING,
        description: "Any complaint or issue the user has with the product/service/idea",
        nullable: false,
      },
      willingnessToPay: {
        type: SchemaType.NUMBER,
        description:
          "How much the user is willing to pay (if applicable) on a scale of 1-10. use 0 only if the product/service/idea does not have a paid aspect (eg is free) or if unwilling to pay.",
        nullable: false,
      },
      wouldBuy: {
        type: SchemaType.BOOLEAN,
        description: "Would the user purchase the product/service? if free, would they use the product/service/idea",
        nullable: false,
      },
      reason: {
        type: SchemaType.STRING,
        description: "Reason behind their purchase/use decision",
        nullable: true,
      },
      barrierForAdoption: {
        type: SchemaType.STRING,
        description:
          "If the user wouldn't buy/use, what is the main barrier preventing adoption? Do not talk about improvements, just state the barrier for adoption.",
        nullable: true,
      },
      suggestedImprovements: {
        type: SchemaType.STRING,
        description: "A user-suggested change or feature that would improve the product/service",
        nullable: false,
      },
      additionalFeedback: {
        type: SchemaType.STRING,
        description: "Any extra comments or qualitative insights provided by the demographic",
        nullable: true,
      },
    },
    required: ["sentiment", "goodFitForMarket", "whatUsersLike", "painPoints", "willingnessToPay", "wouldBuy", "reason", "suggestedImprovements"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
      maxOutputTokens: 100,
    },
  });

  const result = await model.generateContentStream(`
    
Your task is to generate a structured market feedback report by fully adopting the 
perspective of a given demographic. You will be provided with details about a product, service, or idea, along with demographic information 
representing a potential target customer. Your response must be insightful, engaging, and representative of this specific demographic 
personality, lifestyle, and preferences. Answers must be realistic, not conflict with each other and be representative of your demographic.
It is important to not act as if you have already used the product, service or idea, but to act as if you are seeing or hearing about it for the first time in this market research. 

Market Research Details:
	•	Title: ${title}
	•	Description: ${description}
	•	Category: ${category} (e.g., product, service, idea)
	•	Goal: ${goal}
	•	Links: ${links} (if available)

Your Persona (Demographic Profile):

You are a ${age} ${gender} from ${location}.
	•	Your highest education level is ${educationLevel}, and you are currently ${employmentStatus}.
	•	Your household income falls within ${householdIncome}, and you are ${maritalStatus} with ${numberOfDependents} dependents.
	•	You identify as ${ethnicity} and work in ${industryAndJobRole}.

Instructions:
	•	Think and respond as if you are this person. consider their priorities, lifestyle, financial situation, and personal preferences.
	•	Be specific and realistic about their motivations, concerns, and buying behavior.
	•	If this persona would not buy or use the ${category}, explain why in a way that reflects their personal and financial circumstances.
	•	Provide both quantitative and qualitative insights where specified in the schema.
	•	Keep responses concise yet engaging, following the provided schema.`);
  console.log("[DEBUG] Generated initial feedback");
  
  // Allow for streaming output (Text Generation) for faster interactions with the API
  let response = ""
  for await (const chunk of result.stream) {
    response += chunk.text();
    console.log("[STREAM] Chunk received: ", chunk.text());
  }
  return response;
}
