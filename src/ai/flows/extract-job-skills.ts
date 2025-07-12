// This is an AI-powered function that extracts key skills and requirements from a job description.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractJobSkillsInputSchema = z.object({
  jobDescription: z.string().describe('The job description to extract skills from.'),
});
export type ExtractJobSkillsInput = z.infer<typeof ExtractJobSkillsInputSchema>;

const ExtractJobSkillsOutputSchema = z.object({
  skills: z.array(z.string()).describe('The list of skills extracted from the job description.'),
  requirements: z.array(z.string()).describe('The list of requirements extracted from the job description.'),
});
export type ExtractJobSkillsOutput = z.infer<typeof ExtractJobSkillsOutputSchema>;

export async function extractJobSkills(input: ExtractJobSkillsInput): Promise<ExtractJobSkillsOutput> {
  return extractJobSkillsFlow(input);
}

const extractJobSkillsPrompt = ai.definePrompt({
  name: 'extractJobSkillsPrompt',
  input: {schema: ExtractJobSkillsInputSchema},
  output: {schema: ExtractJobSkillsOutputSchema},
  prompt: `You are an expert HR assistant. Read the job description and extract the key skills and requirements from the text.

Job Description: {{{jobDescription}}}

Return the skills and requirements as a JSON object.

Here is the JSON schema you must follow:
\n{{json schema=ExtractJobSkillsOutputSchema}}
`,
});

const extractJobSkillsFlow = ai.defineFlow(
  {
    name: 'extractJobSkillsFlow',
    inputSchema: ExtractJobSkillsInputSchema,
    outputSchema: ExtractJobSkillsOutputSchema,
  },
  async input => {
    const {output} = await extractJobSkillsPrompt(input);
    return output!;
  }
);
