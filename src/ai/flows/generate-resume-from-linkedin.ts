// src/ai/flows/generate-resume-from-linkedin.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a resume from a LinkedIn profile URL.
 *
 * - generateResumeFromLinkedIn - A function that takes a LinkedIn profile URL and returns a complete UserProfile object.
 * - GenerateResumeFromLinkedInInput - The input type for the generateResumeFromLinkedIn function.
 * - UserProfile - The Zod schema for the returned UserProfile object.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { UserProfile, UserProfileSchema } from '@/lib/types';


const GenerateResumeFromLinkedInInputSchema = z.object({
  linkedinUrl: z.string().url().describe('The URL of the LinkedIn profile.'),
});
export type GenerateResumeFromLinkedInInput = z.infer<typeof GenerateResumeFromLinkedInInputSchema>;


export async function generateResumeFromLinkedIn(
  input: GenerateResumeFromLinkedInInput
): Promise<UserProfile> {
  return generateResumeFromLinkedInFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeFromLinkedInPrompt',
  input: { schema: GenerateResumeFromLinkedInInputSchema },
  output: { schema: UserProfileSchema },
  prompt: `You are an expert resume writer and data scraper. Your task is to generate a complete, professional resume profile based on a given LinkedIn profile URL.

You must invent realistic and high-quality data for the profile, even if the URL doesn't seem to correspond to a real person. The data should be consistent with the type of person who would have the given LinkedIn URL.

For the experience section, generate detailed descriptions for each role, highlighting key achievements and responsibilities using action verbs. Each description should be a few bullet points, separated by newlines.

Generate a complete user profile in JSON format that strictly follows the provided schema. Ensure all required fields are present.

LinkedIn Profile URL: {{{linkedinUrl}}}
`,
});

const generateResumeFromLinkedInFlow = ai.defineFlow(
  {
    name: 'generateResumeFromLinkedInFlow',
    inputSchema: GenerateResumeFromLinkedInInputSchema,
    outputSchema: UserProfileSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
