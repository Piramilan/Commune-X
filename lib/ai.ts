import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function classifyServiceRequest(description: string) {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `Classify this service request into one of these categories: Plumbing, Electrical, Cleaning, Landscaping, Painting, Handyman, HVAC, Roofing, Moving, General.

Service request: "${description}"

Respond with ONLY the category name.`,
    temperature: 0.3,
  });

  return { category: result.text.trim() };
}
