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
  industry: z.string().optional().describe('The target industry for the job application (e.g., "Technology", "Healthcare").'),
  location: z.string().optional().describe('The geographical location for the job (e.g., "San Francisco, CA").'),
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
  prompt: `You are a world-class career coach and resume expert. Your task is to provide highly personalized and actionable suggestions to improve a user's resume for a specific job application.

Analyze the following information:
1.  **User's Profile:**
    {{{userProfile}}}

2.  **Job Description:**
    {{{jobDescription}}}

3.  **Target Context:**
    - Industry: {{{industry}}}
    - Location: {{{location}}}

Based on all this information, generate a list of specific improvements. Consider the following:
- **Keyword Optimization:** Identify keywords from the job description that are missing from the resume.
- **Industry Trends:** Incorporate current trends, technologies, and jargon relevant to the specified industry and location.
- **Impact Metrics:** Suggest where the user can quantify their achievements with numbers and data.
- **Action Verbs:** Recommend stronger, more dynamic action verbs.
- **Company-Specifics:** If the company is well-known, infer its culture and values and suggest how the resume can reflect them.
- **Formatting & Readability:** Briefly mention any formatting changes that could improve clarity for this specific role.

Return your suggestions as a clear, concise list.
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
