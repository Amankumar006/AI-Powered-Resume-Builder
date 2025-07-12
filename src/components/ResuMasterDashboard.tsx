"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "./Header";
import UserProfileForm from "./UserProfileForm";
import JobDescriptionForm from "./JobDescriptionForm";
import ResumePreview from "./ResumePreview";
import AISuggestions from "./AISuggestions";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import type { UserProfile } from "@/lib/types";
import { extractJobSkills } from "@/ai/flows/extract-job-skills";
import { suggestResumeImprovements } from "@/ai/flows/suggest-resume-improvements";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

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
  portfolioLinks: ["github.com/janedoe"],
};

export default function ResuMasterDashboard() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [jobDescription, setJobDescription] = useState("");
  const [extractedSkills, setExtractedSkills] = useState<string[]>([]);
  const [extractedRequirements, setExtractedRequirements] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const { toast } = useToast();

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
      });
      setSuggestions(result.suggestions);
      toast({ title: "Suggestions Ready", description: "AI has generated resume improvements." });
    } catch (error) {
      toast({ variant: "destructive", title: "Suggestion Failed", description: "Could not generate suggestions." });
    } finally {
      setIsSuggesting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        <Tabs defaultValue="editor" className="w-full">
          <div className="flex justify-center border-b">
            <TabsList className="bg-transparent p-0 m-2">
              <TabsTrigger value="editor">Resume Editor</TabsTrigger>
              <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
              <TabsTrigger value="matching">Job Matching</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="editor">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
              <ScrollArea className="h-[calc(100vh-150px)]">
                 <div className="space-y-6 pr-4">
                  <UserProfileForm profile={profile} setProfile={setProfile} />
                  <JobDescriptionForm 
                    jobDescription={jobDescription}
                    setJobDescription={setJobDescription}
                    handleAnalyze={handleAnalyzeJobDescription}
                    extractedSkills={extractedSkills}
                    extractedRequirements={extractedRequirements}
                    isAnalyzing={isAnalyzing}
                  />
                 </div>
              </ScrollArea>
              <ScrollArea className="h-[calc(100vh-150px)]">
                <div className="pr-4">
                  <ResumePreview profile={profile} />
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="suggestions">
            <AISuggestions 
              suggestions={suggestions} 
              handleGetSuggestions={handleGetSuggestions} 
              isLoading={isSuggesting} 
            />
          </TabsContent>
          <TabsContent value="matching">
            <div className="p-4 md:p-8">
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-primary flex items-center gap-2">
                    <Search /> Job Matching
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    This feature is coming soon! You'll be able to search for jobs and get AI-powered matching and suggestions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
