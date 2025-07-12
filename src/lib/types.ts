import { z } from 'zod';

// Schemas for resume data structures
export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  details: z.string(),
});

export const UserProfileSchema = z.object({
  name: z.string().describe('The full name of the user.'),
  title: z.string().describe('The professional title (e.g., Senior Software Engineer).'),
  email: z.string().email().describe('The email address.'),
  phone: z.string().describe('The phone number.'),
  website: z.string().url().describe('A personal website or portfolio URL.'),
  location: z.string().describe('The city and state (e.g., San Francisco, CA).'),
  summary: z.string().describe('A 2-3 sentence professional summary.'),
  experience: z.array(ExperienceSchema).describe('A list of professional experiences.'),
  education: z.array(EducationSchema).describe('A list of educational qualifications.'),
  skills: z.array(z.string()).describe('A list of relevant skills.'),
  certifications: z.array(z.string()).describe('A list of professional certifications.'),
  portfolioLinks: z.array(z.string().url()).describe('A list of portfolio links (e.g., GitHub).'),
});

// TypeScript types inferred from Zod schemas
export type UserProfile = z.infer<typeof UserProfileSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
