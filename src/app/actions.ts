"use server";

import { generateMarketingVisuals } from '@/ai/flows/generate-marketing-visuals-flow';
import type { GenerateMarketingVisualsInput } from '@/ai/flows/generate-marketing-visuals-flow';

interface ActionResult {
  imageUrl?: string;
  error?: string;
}

export async function generateVisualsAction(input: GenerateMarketingVisualsInput): Promise<ActionResult> {
  try {
    const result = await generateMarketingVisuals(input);
    if (!result.imageUrl) {
        throw new Error("Image URL was not returned from the generation service.");
    }
    return { imageUrl: result.imageUrl };
  } catch (error) {
    console.error("Error in generateVisualsAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { error: `Failed to generate visual: ${errorMessage}` };
  }
}
