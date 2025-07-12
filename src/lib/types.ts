export interface UserProfile {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  certifications: string[];
  portfolioLinks: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  details: string;
}
