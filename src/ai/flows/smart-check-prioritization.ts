'use server';

/**
 * @fileOverview AI-assisted prioritization of seat verification order for TTEs.
 *
 * - prioritizeSeats - A function that prioritizes seat verification based on several factors and provides an AI explanation.
 * - PrioritizeSeatsInput - The input type for the prioritizeSeats function.
 * - PrioritizeSeatsOutput - The return type for the prioritizeSeats function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SeatSchema = z.object({
  seatNumber: z.string().describe('The seat number.'),
  isPresentConfirmed: z.boolean().describe('Whether presence is confirmed.'),
  isTicketVerified: z.boolean().describe('Whether the ticket is verified.'),
  suspiciousPatternScore: z
    .number()
    .describe('A score indicating the suspiciousness of the seat.'),
});

const PrioritizeSeatsInputSchema = z.object({
  seats: z.array(SeatSchema).describe('An array of seat objects to prioritize.'),
  occupancyRate: z.number().describe('The overall occupancy rate of the coach.'),
});
export type PrioritizeSeatsInput = z.infer<typeof PrioritizeSeatsInputSchema>;

const PrioritizeSeatsOutputSchema = z.object({
  prioritizedSeats: z
    .array(SeatSchema)
    .describe('The seats, prioritized based on the input factors.'),
  explanation: z
    .string()
    .describe('An AI-generated explanation for the prioritization.'),
});
export type PrioritizeSeatsOutput = z.infer<typeof PrioritizeSeatsOutputSchema>;

export async function prioritizeSeats(
  input: PrioritizeSeatsInput
): Promise<PrioritizeSeatsOutput> {
  return prioritizeSeatsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'prioritizeSeatsPrompt',
  input: {schema: PrioritizeSeatsInputSchema},
  output: {schema: PrioritizeSeatsOutputSchema},
  prompt: `You are an AI assistant that helps prioritize seat verification for Ticket Examiners (TTEs) on Indian Railways.

Given the following information about the seats in a coach, your task is to prioritize the order in which the TTE should check the seats.

Consider these factors when prioritizing:

- **Presence Confirmation:** Seats where presence is confirmed but the ticket is not verified should be prioritized higher.
- **Ticket Status:** Seats with unverified tickets should be prioritized higher.
- **Suspicious Patterns:** Seats with higher suspicious pattern scores should be prioritized higher.
- **Occupancy Rates:** In coaches with high occupancy rates, focus on seats that are likely to be occupied but have unverified tickets.

Here's the seat information:

Occupancy Rate: {{{occupancyRate}}}

{{#each seats}}
Seat Number: {{{seatNumber}}}
  Presence Confirmed: {{{isPresentConfirmed}}}
  Ticket Verified: {{{isTicketVerified}}}
  Suspicious Pattern Score: {{{suspiciousPatternScore}}}
{{/each}}

Provide a prioritized list of seats and a clear explanation of why you prioritized them in that order.  The prioritizedSeats output should be the same list of seats provided, but re-ordered.

Output:
Prioritized Seats:
Explanation: `,
});

const prioritizeSeatsFlow = ai.defineFlow(
  {
    name: 'prioritizeSeatsFlow',
    inputSchema: PrioritizeSeatsInputSchema,
    outputSchema: PrioritizeSeatsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
