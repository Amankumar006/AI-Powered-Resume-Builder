
"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "./Header";
import UserProfileForm from "./UserProfileForm";
import JobDescriptionForm from "./JobDescriptionForm";
import ResumePreview from "./ResumePreview";
import AISuggestions from "./AISuggestions";
import LinkedInImport from "./LinkedInImport";
import { Button } from "./ui/button";
import type { UserProfile } from "@/lib/types";
import { extractJobSkills } from "@/ai/flows/extract-job-skills";
import { suggestResumeImprovements } from "@/ai/flows/suggest-resume-improvements";
import { generateResumeFromLinkedIn } from "@/ai/flows/generate-resume-from-linkedin";
import { useToast } from "@/hooks/use-toast";
import { Eye } from "lucide-react";

const initialProfile: UserProfile = {
  name: "Jane Doe",
  title: "Senior Software Engineer",
  email: "jane.doe@example.com",
  phone: "123-456-7890",
  website: "janedoe.dev",
  location: "San Francisco, CA",
  summary:
    "Innovative Senior Software Engineer with 8+ years of experience in developing and scaling web applications. Proficient in React, Node.js, and cloud infrastructure. Passionate about creating intuitive user experiences and efficient backend systems.",
  experience: [
    {
      company: "TechCorp Inc.",
      role: "Senior Software Engineer",
      startDate: "Jan 2018",
      endDate: "Present",
      description:
        "Led the development of a new microservices architecture, improving system scalability by 40%.\nMentored junior engineers and conducted code reviews to maintain code quality.\nCollaborated with product managers to define feature requirements and timelines.",
    },
    {
      company: "Innovate LLC",
      role: "Software Engineer",
      startDate: "Jun 2015",
      endDate: "Dec 2017",
      description:
        "Developed and maintained frontend features for a high-traffic e-commerce platform using React.\nOptimized application performance, reducing page load times by 25%.\nWorked in an Agile environment, participating in daily stand-ups and sprint planning.",
    },
  ],
  education: [
    {
      institution: "State University",
      degree: "B.S. in Computer Science",
      startDate: "Aug 2011",
      endDate: "May 2015",
      details: "Graduated with honors, GPA: 3.8/4.0",
    },
  ],
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS", "Docker", "PostgreSQL"],
  certifications: ["AWS Certified Developer - Associate"],
  portfolioLinks: ["https://github.com/janedoe"],
};

const LOCAL_STORAGE_KEY_PROFILE = 'resuMasterProfile';
const LOCAL_STORAGE_KEY_JOB_DESC = 'resuMasterJobDescription';

export default function ResuMasterDashboard() {
  const [activeTab, setActiveTab] = useState("editor");
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [jobDescription, setJobDescription] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [extractedRequirements, setExtractedRequirements] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [generatedProfile, setGeneratedProfile] = useState<UserProfile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
      const savedJobDescription = localStorage.getItem(LOCAL_STORAGE_KEY_JOB_DESC);
      if (savedJobDescription) {
        setJobDescription(savedJobDescription);
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      // If parsing fails, we'll just use the initial state
    }
  }, []);

  // Save profile to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error("Failed to save profile to localStorage", error);
    }
  }, [profile]);

  // Save job description to localStorage whenever it changes
  useEffect(() => {
     try {
      localStorage.setItem(LOCAL_STORAGE_KEY_JOB_DESC, jobDescription);
    } catch (error) {
      console.error("Failed to save job description to localStorage", error);
    }
  }, [jobDescription]);


  const handleAnalyzeJobDescription = async () => {
    if (!jobDescription) return;
    setIsAnalyzing(true);
    try {
      const result = await extractJobSkills({ jobDescription });
      setExtractedSkills(result.skills);
      setExtractedRequirements(result.requirements);
      toast({ title: "Analysis Complete", description: "Skills and requirements extracted." });
    } catch (error) {
      toast({ variant: "destructive", title: "Analysis Failed", description: "Could not analyze the job description." });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleGetSuggestions = async () => {
    if (!jobDescription || !profile) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please provide both a profile and a job description." });
      return;
    }
    setIsSuggesting(true);
    setSuggestions([]);
    try {
      const result = await suggestResumeImprovements({
        userProfile: JSON.stringify(profile),
        jobDescription,
        industry: profile.title,
        location: profile.location,
      });
      setSuggestions(result.suggestions);
      toast({ title: "Suggestions Ready", description: "AI has generated resume improvements." });
    } catch (error) {
      toast({ variant: "destructive", title: "Suggestion Failed", description: "Could not generate suggestions." });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleLinkedInImport = async (linkedinUrl: string) => {
    setIsImporting(true);
    setGeneratedProfile(null);
    try {
      const result = await generateResumeFromLinkedIn({ linkedinUrl });
      setGeneratedProfile(result);
      toast({ title: "Profile Generated", description: "AI has created a resume profile from the URL." });
    } catch (error) {
      toast({ variant: "destructive", title: "Import Failed", description: "Could not generate a profile from the URL." });
    } finally {
      setIsImporting(false);
    }
  };

  const handleAcceptGeneratedProfile = () => {
    if (generatedProfile) {
      setProfile(generatedProfile);
      setGeneratedProfile(null);
      setActiveTab("editor");
      toast({ title: "Profile Imported!", description: "You can now edit your new resume." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center border-b">
            <TabsList className="bg-transparent p-0 m-2">
              <TabsTrigger value="editor">Resume Editor</TabsTrigger>
              <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
              <TabsTrigger value="import">LinkedIn Import</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="editor">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[calc(100vh-120px)] gap-4 md:gap-8 p-4 md:p-8">
              <div className="lg:h-full lg:overflow-y-auto space-y-6 pr-0 lg:pr-4">
                <UserProfileForm profile={profile} setProfile={setProfile} />
                <JobDescriptionForm 
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                  handleAnalyze={handleAnalyzeJobDescription}
                  extractedSkills={extractedSkills}
                  extractedRequirements={extractedRequirements}
                  isAnalyzing={isAnalyzing}
                />
                 <div className="h-16 lg:hidden" />
              </div>
              <div className={`lg:h-full lg:overflow-y-auto ${showPreview ? 'block' : 'hidden'} lg:block`}>
                <div className="pr-0 lg:pr-4">
                  <ResumePreview profile={profile} />
                </div>
              </div>
            </div>
             <div className="fixed bottom-4 right-4 lg:hidden">
              <Button onClick={() => setShowPreview(!showPreview)} size="lg">
                <Eye className="mr-2" />
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="suggestions">
            <AISuggestions 
              suggestions={suggestions} 
              handleGetSuggestions={handleGetSuggestions} 
              isLoading={isSuggesting} 
            />
          </TabsContent>
          <TabsContent value="import">
            <LinkedInImport
              handleImport={handleLinkedInImport}
              isLoading={isImporting}
              generatedProfile={generatedProfile}
              handleAcceptProfile={handleAcceptGeneratedProfile}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
