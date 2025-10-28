import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { description, budget } = await req.json();

    if (!description) {
      return new Response("Missing description", { status: 400 });
    }

    // TODO: Get categories from Drizzle
    const categories: any[] = [];

    const categoryNames = categories
      .map((c: { name: string }) => c.name)
      .join(", ");

    // Use AI to classify the service request
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `You are a service classification assistant. Based on the customer's service request description, determine the most appropriate service category.

Available categories: ${categoryNames}

Customer request: "${description}"
${budget ? `Budget: $${budget}` : ""}

Respond with ONLY the category name from the list above, nothing else. If the request doesn't fit any category well, respond with "General" or the closest match.`,
      temperature: 0.3,
    });

    const categoryName = text.trim();

    // Find the matching category
    const matchedCategory =
      categories.find(
        (cat: { name: string; slug: string }) =>
          cat.name.toLowerCase() === categoryName.toLowerCase() ||
          cat.slug.toLowerCase() === categoryName.toLowerCase()
      ) || categories.find((cat: { slug: string }) => cat.slug === "handyman");

    if (!matchedCategory) {
      return Response.json({
        category: null,
        confidence: 0.5,
        message: "Could not determine category",
      });
    }

    // Calculate confidence
    const isExactMatch =
      matchedCategory.name.toLowerCase() === categoryName.toLowerCase();
    const confidence = isExactMatch ? 0.95 : 0.7;

    return Response.json({
      category: {
        id: matchedCategory.id,
        name: matchedCategory.name,
        slug: matchedCategory.slug,
      },
      confidence,
    });
  } catch (error) {
    console.error("Error classifying service:", error);
    return Response.json(
      { error: "Failed to classify service" },
      { status: 500 }
    );
  }
}
