import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import env from "dotenv";

env.config({ path: ".env.local" });

export async function POST(req: Request) {
  console.log("[POST] /api/generate endpoint called");
  const dataFromForm = await req.json();
  console.log("[DEBUG] Received form data:", JSON.stringify(dataFromForm, null, 2));
  let numberOfProfiles = 5;

  let aggregatedSentiment = [];
  let aggregatedgoodfitforMarket = [];
  let aggregatedWhatUsersLike = [];
  let aggregatedPainPoints = [];
  let aggregatedWillingnessToPay = [];
  let aggregatedWouldBuy = [];
  let aggregatedReason = [];
  let aggregatedBarrierForAdoption = [];
  let aggregatedSuggestedImprovements = [];
  let aggregatedAdditionalFeedback = [];

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

    const parsedDemographics = JSON.parse(demographics);
    console.log(`[DEBUG] Parsed ${parsedDemographics.length} demographic profiles`);

    for (let i of parsedDemographics) {
      console.log(`[DEBUG] Processing demographic profile`, i);
      let demoAge = i.age;
      let demoGender = i.gender;
      let demoLocation = i.location;
      let demoEducationLevel = i.educationLevel;
      let demoEmploymentStatus = i.employmentStatus;
      let demoHouseholdIncome = i.householdIncome;
      let demoMaritalStatus = i.maritalStatus;
      let demoNumberOfDependents = i.numberOfDependents;
      let demoEthnicity = i.ethnicity;
      let demoIndustryAndJobRole = i.industryAndJobRole;

      const feedback = await getInitialFeedback(
        title,
        description,
        category,
        goal,
        links,
        demoAge,
        demoGender,
        demoLocation,
        demoEducationLevel,
        demoEmploymentStatus,
        demoHouseholdIncome,
        demoMaritalStatus,
        demoNumberOfDependents,
        demoEthnicity,
        demoIndustryAndJobRole,
        files
      );

      console.log(`[DEBUG] Received feedback for demographic ${i}`);
      const parsedFeedback = JSON.parse(feedback);

      aggregatedSentiment.push(parsedFeedback.sentiment);
      aggregatedgoodfitforMarket.push(parsedFeedback.goodFitForMarket);
      aggregatedWhatUsersLike.push(parsedFeedback.whatUsersLike);
      aggregatedPainPoints.push(parsedFeedback.painPoints);
      aggregatedWillingnessToPay.push(parsedFeedback.willingnessToPay);
      aggregatedWouldBuy.push(parsedFeedback.wouldBuy);
      aggregatedReason.push(parsedFeedback.reason);
      aggregatedBarrierForAdoption.push(parsedFeedback.barrierForAdoption);
      aggregatedSuggestedImprovements.push(parsedFeedback.suggestedImprovements);
      aggregatedAdditionalFeedback.push(parsedFeedback.additionalFeedback);
    }

    const finalAggregatedResults = {
      demographicProfiles: parsedDemographics,
      sentiment: aggregatedSentiment,
      goodFitForMarket: aggregatedgoodfitforMarket,
      whatUsersLike: aggregatedWhatUsersLike,
      painPoints: aggregatedPainPoints,
      willingnessToPay: aggregatedWillingnessToPay,
      wouldBuy: aggregatedWouldBuy,
      reason: aggregatedReason,
      barrierForAdoption: aggregatedBarrierForAdoption,
      suggestedImprovements: aggregatedSuggestedImprovements,
      additionalFeedback: aggregatedAdditionalFeedback,
    };

    //generate synthetic demographic data
    return new Response(JSON.stringify(finalAggregatedResults), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    console.error("[ERROR] Processing request failed:", e);
    if (e instanceof Error) {
      console.error("[ERROR] Stack trace:", e.stack);
    }
    return new Response(JSON.stringify({ error: "An error occurred while processing your request" }), {
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
    },
  });

  const result = await model.generateContent(
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
  return result.response.text();
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
        description: "One word overall sentiment towards the product/service/idea (one from either good, neutral, or bad)",
        nullable: false,
      },
      goodFitForMarket: {
        type: SchemaType.STRING,
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
        type: SchemaType.STRING,
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
    },
  });

  const result = await model.generateContent(`
    
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
  return result.response.text();
}