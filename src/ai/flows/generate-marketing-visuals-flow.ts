'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating marketing visuals for drink products.
 *
 * - generateMarketingVisuals - A function that handles the generation of product marketing images.
 * - GenerateMarketingVisualsInput - The input type for the generateMarketingVisuals function.
 * - GenerateMarketingVisualsOutput - The return type for the generateMarketingVisuals function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateMarketingVisualsInputSchema = z.object({
  drinkName: z.string().describe('The name of the drink, e.g., "Grape Soda".'),
  drinkColor: z
    .string()
    .describe(
      'The primary color associated with the drink, e.g., "purple", "cherry red".'
    ),
  visualDescription: z
    .string()
    .describe(
      'A detailed description of the visual elements around the drink can, e.g., "realistic, glossy grapes piled across the width around the base of the can."'
    ),
});
export type GenerateMarketingVisualsInput = z.infer<
  typeof GenerateMarketingVisualsInputSchema
>;

const GenerateMarketingVisualsOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe('The data URI of the generated marketing image (image/png).'),
});
export type GenerateMarketingVisualsOutput = z.infer<
  typeof GenerateMarketingVisualsOutputSchema
>;

export async function generateMarketingVisuals(
  input: GenerateMarketingVisualsInput
): Promise<GenerateMarketingVisualsOutput> {
  return generateMarketingVisualsFlow(input);
}

const marketingVisualsPrompt = ai.definePrompt({
  name: 'marketingVisualsPrompt',
  input: { schema: GenerateMarketingVisualsInputSchema },
  output: { schema: GenerateMarketingVisualsOutputSchema },
  prompt:
    'Generate a square marketing image for a drink product. The image should feature: A bold monochrome {{{drinkColor}}} background, smooth studio gradient, clean and minimal. A {{{drinkName}}} can placed centered and upright, with crisp studio lighting and soft shadow. {{visualDescription}}',
});

const generateMarketingVisualsFlow = ai.defineFlow(
  {
    name: 'generateMarketingVisualsFlow',
    inputSchema: GenerateMarketingVisualsInputSchema,
    outputSchema: GenerateMarketingVisualsOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: (await marketingVisualsPrompt(input)).output,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image or media URL is missing.');
    }

    return { imageUrl: media.url };
  }
);
