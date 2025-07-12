// src/ai/flows/suggest-resume-improvements.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to suggest improvements to a resume based on industry trends and job profile information.
 *
 * - suggestResumeImprovements - A function that takes user profile and job description as input and returns suggestions to improve the resume.
 * - SuggestResumeImprovementsInput - The input type for the suggestResumeImprovements function.
 * - SuggestResumeImprovementsOutput - The return type for the suggestResumeImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResumeImprovementsInputSchema = z.object({
  userProfile: z
    .string()
    .describe('The user profile information as a JSON string, including skills, experience, and education.'),
  jobDescription: z.string().describe('The job description for which the resume is being tailored.'),
});
export type SuggestResumeImprovementsInput = z.infer<
  typeof SuggestResumeImprovementsInputSchema
>;

const SuggestResumeImprovementsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggestions to improve the resume content.'),
});
export type SuggestResumeImprovementsOutput = z.infer<
  typeof SuggestResumeImprovementsOutputSchema
>;

export async function suggestResumeImprovements(
  input: SuggestResumeImprovementsInput
): Promise<SuggestResumeImprovementsOutput> {
  return suggestResumeImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestResumeImprovementsPrompt',
  input: {schema: SuggestResumeImprovementsInputSchema},
  output: {schema: SuggestResumeImprovementsOutputSchema},
  prompt: `You are a resume expert. Given the user profile and job description, suggest improvements to the resume content.

User Profile:
{{{userProfile}}}

Job Description:
{{{jobDescription}}}

Suggest specific improvements to the user's resume based on the job description and industry trends. Focus on skills, experience, and keywords that the user should highlight or add.

Return your suggestions in a list.
`,
});

const suggestResumeImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestResumeImprovementsFlow',
    inputSchema: SuggestResumeImprovementsInputSchema,
    outputSchema: SuggestResumeImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
