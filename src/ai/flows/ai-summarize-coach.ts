'use server';

/**
 * @fileOverview AI-powered coach summary generator.
 *
 * - aiSummarizeCoach - A function that generates an AI summary of a coach.
 * - AiSummarizeCoachInput - The input type for the aiSummarizeCoach function.
 * - AiSummarizeCoachOutput - The return type for the aiSummarizeCoach function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSummarizeCoachInputSchema = z.object({
  coachOverview: z.string().describe('Overview of the current situation in the coach, including occupancy rates, ticket verification status, and any alerts.'),
  riskHotspots: z.string().describe('Description of potential risk areas within the coach, such as seats with confirmed presence but unverified tickets.'),
  suggestedCheckOrder: z.string().describe('A prioritized order for checking seats within the coach, based on risk and occupancy.'),
});
export type AiSummarizeCoachInput = z.infer<typeof AiSummarizeCoachInputSchema>;

const AiSummarizeCoachOutputSchema = z.object({
  summary: z.string().describe('A comprehensive AI-generated summary of the coach, including overall situation, risk areas, and suggested check order.'),
});
export type AiSummarizeCoachOutput = z.infer<typeof AiSummarizeCoachOutputSchema>;

export async function aiSummarizeCoach(input: AiSummarizeCoachInput): Promise<AiSummarizeCoachOutput> {
  return aiSummarizeCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSummarizeCoachPrompt',
  input: {schema: AiSummarizeCoachInputSchema},
  output: {schema: AiSummarizeCoachOutputSchema},
  prompt: `You are an AI assistant for train ticket examiners (TTEs), generating summaries of train coaches.

  Based on the provided coach overview, risk hotspots, and suggested check order, create a concise and informative summary for the TTE.

  Overview: {{{coachOverview}}}
  Risk Hotspots: {{{riskHotspots}}}
  Suggested Check Order: {{{suggestedCheckOrder}}}

  Summary:`,
});

const aiSummarizeCoachFlow = ai.defineFlow(
  {
    name: 'aiSummarizeCoachFlow',
    inputSchema: AiSummarizeCoachInputSchema,
    outputSchema: AiSummarizeCoachOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
