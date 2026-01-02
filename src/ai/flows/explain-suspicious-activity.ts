'use server';

/**
 * @fileOverview Explains potentially suspicious login activity based on login metadata.
 *
 * - explainSuspiciousActivity - A function that handles the explanation of suspicious login activity.
 * - ExplainSuspiciousActivityInput - The input type for the explainSuspiciousActivity function.
 * - ExplainSuspiciousActivityOutput - The return type for the explainSuspiciousActivity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainSuspiciousActivityInputSchema = z.object({
  time: z.string().describe('The time of the login attempt.'),
  device: z.string().describe('The device used for the login attempt.'),
  frequency: z.string().describe('The frequency of login attempts from this user.'),
});
export type ExplainSuspiciousActivityInput = z.infer<
  typeof ExplainSuspiciousActivityInputSchema
>;

const ExplainSuspiciousActivityOutputSchema = z.object({
  explanation: z.string().describe('The human-readable explanation for the potentially suspicious login activity.'),
});
export type ExplainSuspiciousActivityOutput = z.infer<
  typeof ExplainSuspiciousActivityOutputSchema
>;

export async function explainSuspiciousActivity(
  input: ExplainSuspiciousActivityInput
): Promise<ExplainSuspiciousActivityOutput> {
  return explainSuspiciousActivityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainSuspiciousActivityPrompt',
  input: {schema: ExplainSuspiciousActivityInputSchema},
  output: {schema: ExplainSuspiciousActivityOutputSchema},
  prompt: `You are an AI assistant that analyzes login metadata and provides human-readable explanations for potentially suspicious activity.

  Here is the login metadata:
  Time: {{{time}}}
  Device: {{{device}}}
  Frequency: {{{frequency}}}

  Explain why this login activity might be suspicious. Focus on providing clear, concise, and easily understandable reasons for the flags.  Do not make any assumptions about the intentions of the user.
  `,
});

const explainSuspiciousActivityFlow = ai.defineFlow(
  {
    name: 'explainSuspiciousActivityFlow',
    inputSchema: ExplainSuspiciousActivityInputSchema,
    outputSchema: ExplainSuspiciousActivityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
