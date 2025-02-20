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
    const title = dataFromForm.ideaTitle;
    const description = dataFromForm.ideaDescription;
    console.log(`the title: ${title} and description: ${description} have been extracted`);

    //
    let initialFeedback = await getInitialFeedback(title, description);
    console.log(initialFeedback);

    //generate synthetic demographic data
    // let demographics = await getTargetMarket(title, description);
    // console.log(`the demographics are ${demographics}`);

    return new Response(JSON.stringify(initialFeedback), {
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
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const schema = {
    description: "Structured feedback for a product, service, or idea.",
    type: SchemaType.OBJECT,
    properties: {
      overallSatisfactionScore: {
        type: SchemaType.INTEGER,
        description: "A score from 1 to 10 indicating overall satisfaction.",
        minimum: 1,
        maximum: 10,
      },
      likelihoodToUse: {
        type: SchemaType.INTEGER,
        description: "A score from 1 to 10 indicating how likely the participant is to use or purchase it.",
        minimum: 1,
        maximum: 10,
      },
      easeOfUse: {
        type: SchemaType.INTEGER,
        description: "A score from 1 to 10 indicating how easy it is to use or understand.",
        minimum: 1,
        maximum: 10,
      },
      valueForMoney: {
        type: SchemaType.INTEGER,
        description: "A score from 1 to 10 evaluating if the price is fair for the value provided.",
        minimum: 1,
        maximum: 10,
      },
      comparisonToAlternatives: {
        type: SchemaType.STRING,
        description: "A comparison statement on how this product/service ranks against competitors.",
      },
      mostLikedFeatures: {
        type: SchemaType.STRING,
        description: "A feature that the user find most appealing.",
      },
      areasForImprovement: {
        type: SchemaType.STRING,
        description: "A written response describing what main thing needs improvement.",
      },
      painPoints: {
        type: SchemaType.STRING,
        description: "A main frustration or challenge the user would face if they were to use it.",
      },
      targetAudienceFit: {
        type: SchemaType.STRING,
        description: "A statement of whether the participant believes they are the right target audience for this.",
      },
      suggestionsForEnhancement: {
        type: SchemaType.STRING,
        description: "A statement of the most important suggested change or enhancement.",
      },
    },
    required: [
      "overallSatisfactionScore",
      "likelihoodToUse",
      "easeOfUse",
      "valueForMoney",
      "comparisonToAlternatives",
      "mostLikedFeatures",
      "areasForImprovement",
      "painPoints",
      "targetAudienceFit",
      "suggestionsForEnhancement",
    ],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const result = await model.generateContent(
    `“Provide structured feedback for the following product, service, or idea. The feedback should include an overall satisfaction score, 
    likelihood to use, ease of use, value for money, comparison to alternatives, most liked feature, area for improvement, key pain point, 
    how well it fits the target audience, and a suggested enhancement. 
    Ensure the feedback is realistic and reflects genuine user opinions.
    Use the following product/service/idea description to generate appropriate feedback:
    name: ${name},
    description: ${description}`
  );

  return result.response.text();
}

async function getTargetMarket(name: String, description: String) {
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
   household income, marital status, number of dependents, ethnicity, and industry/job role. The demographics should be representative of 
   those who would realistically be selected for market research based on the following product, business, or service idea provided here: 
   name is ${name}, description is ${description}`
  );
  return result.response.text();
}
