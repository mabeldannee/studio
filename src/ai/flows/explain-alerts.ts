// src/ai/flows/explain-alerts.ts
'use server';

/**
 * @fileOverview Provides AI-generated explanations for real-time alerts.
 *
 * - explainAlert - A function that generates explanations for alerts.
 * - ExplainAlertInput - The input type for the explainAlert function.
 * - ExplainAlertOutput - The return type for the explainAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAlertInputSchema = z.object({
  alertType: z.string().describe('The type of alert (e.g., Presence Confirmed but Ticket Unverified, Persistent Likely Vacant seats).'),
  seatNumber: z.string().optional().describe('The seat number associated with the alert, if applicable.'),
  coachNumber: z.string().optional().describe('The coach number associated with the alert, if applicable.'),
  trainNumber: z.string().optional().describe('The train number associated with the alert, if applicable.'),
  additionalContext: z.string().optional().describe('Any additional context relevant to the alert, such as presence timing.'),
  presenceTiming: z.enum(['Early', 'Late', 'Anomalous']).optional().describe("The timing of the presence confirmation (e.g., 'Late', 'Anomalous')."),
});
export type ExplainAlertInput = z.infer<typeof ExplainAlertInputSchema>;

const ExplainAlertOutputSchema = z.object({
  explanation: z.string().describe('An AI-generated explanation of the alert, including the urgency, context, and a recommendation. Crucially, it must state that the alert is a recommendation for verification, not proof of invalidity.'),
});
export type ExplainAlertOutput = z.infer<typeof ExplainAlertOutputSchema>;

export async function explainAlert(input: ExplainAlertInput): Promise<ExplainAlertOutput> {
  return explainAlertFlow(input);
}

const explainAlertPrompt = ai.definePrompt({
  name: 'explainAlertPrompt',
  input: {schema: ExplainAlertInputSchema},
  output: {schema: ExplainAlertOutputSchema},
  prompt: `You are an AI assistant for railway TTEs. Your task is to provide clear, calm, and actionable explanations for system alerts. Your response MUST be advisory and emphasize that the TTE holds the final authority.

  **CRITICAL RULES:**
  1.  **NEVER** state or imply a passenger has done something wrong.
  2.  **NEVER** claim a ticket is invalid or fraudulent.
  3.  **ALWAYS** frame the explanation as a recommendation for *manual verification*.
  4.  **ALWAYS** include the following sentence at the end: "This alert highlights a verification need, not proof of invalid travel."

  **Alert Information:**
  - Alert Type: {{{alertType}}}
  - Seat: {{{seatNumber}}}
  {{#if presenceTiming}}
  - Presence Timing: {{{presenceTiming}}}
  {{/if}}
  - Context: {{{additionalContext}}}

  **Explanation Generation:**
  Based on the data, generate an explanation.
  - If presence timing is 'Late' or 'Anomalous', explain that this pattern warrants a routine check. For example: "Presence was confirmed after a major station. This pattern suggests a routine check is advisable to ensure proper ticketing."
  - Keep the tone professional and neutral.
  - Your final output must be just the JSON object with the "explanation" field.
  `,
});

const explainAlertFlow = ai.defineFlow(
  {
    name: 'explainAlertFlow',
    inputSchema: ExplainAlertInputSchema,
    outputSchema: ExplainAlertOutputSchema,
  },
  async input => {
    // Fallback logic
    if (!process.env.GEMINI_API_KEY) {
        let explanation = "AI system offline. Please perform standard verification procedures.";
        if (input.alertType === 'Presence Confirmed but Ticket Unverified') {
            explanation = `A passenger is in seat ${input.seatNumber}, but their ticket hasn't been verified. Physical ticket and ID verification is recommended. This alert highlights a verification need, not proof of invalid travel.`
        }
        return { explanation };
    }
    const {output} = await explainAlertPrompt(input);
    return output!;
  }
);
