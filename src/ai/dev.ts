import { config } from 'dotenv';
config();

import '@/ai/flows/extract-job-skills.ts';
import '@/ai/flows/suggest-resume-improvements.ts';
import '@/ai/flows/generate-resume-from-linkedin.ts';
