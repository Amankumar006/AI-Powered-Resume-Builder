"use client";

import type { UserProfile, Experience, Education } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, PlusCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface UserProfileFormProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
}

export default function UserProfileForm({ profile, setProfile }: UserProfileFormProps) {
  const handleProfileChange = <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleNestedChange = <T extends Experience | Education>(
    section: "experience" | "education",
    index: number,
    field: keyof T,
    value: string
  ) => {
    const sectionData = [...profile[section]];
    sectionData[index] = { ...sectionData[index], [field]: value } as T;
    setProfile({ ...profile, [section]: sectionData });
  };
  
  const handleListChange = (section: "skills" | "certifications" | "portfolioLinks", value: string) => {
    setProfile({ ...profile, [section]: value.split(',').map(s => s.trim()).filter(Boolean) });
  };

  const addListItem = (section: "experience" | "education") => {
    if (section === "experience") {
      const newExperience: Experience = { company: "", role: "", startDate: "", endDate: "", description: "" };
      setProfile({ ...profile, experience: [...profile.experience, newExperience] });
    } else {
      const newEducation: Education = { institution: "", degree: "", startDate: "", endDate: "", details: "" };
      setProfile({ ...profile, education: [...profile.education, newEducation] });
    }
  };

  const removeListItem = (section: "experience" | "education", index: number) => {
    const sectionData = [...profile[section]];
    sectionData.splice(index, 1);
    setProfile({ ...profile, [section]: sectionData });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={["contact", "experience", "education", "skills"]} className="w-full">
          <AccordionItem value="contact">
            <AccordionTrigger>Contact & Summary</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Full Name</Label><Input value={profile.name} onChange={(e) => handleProfileChange('name', e.target.value)} /></div>
                <div><Label>Job Title</Label><Input value={profile.title} onChange={(e) => handleProfileChange('title', e.target.value)} /></div>
                <div><Label>Email</Label><Input type="email" value={profile.email} onChange={(e) => handleProfileChange('email', e.target.value)} /></div>
                <div><Label>Phone</Label><Input type="tel" value={profile.phone} onChange={(e) => handleProfileChange('phone', e.target.value)} /></div>
                <div><Label>Website</Label><Input value={profile.website} onChange={(e) => handleProfileChange('website', e.target.value)} /></div>
                <div><Label>Location</Label><Input value={profile.location} onChange={(e) => handleProfileChange('location', e.target.value)} /></div>
              </div>
              <div><Label>Summary</Label><Textarea value={profile.summary} onChange={(e) => handleProfileChange('summary', e.target.value)} /></div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="experience">
            <AccordionTrigger>Work Experience</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {profile.experience.map((exp, index) => (
                <div key={index} className="p-4 border rounded-md space-y-4 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeListItem('experience', index)}><Trash2 size={16} /></Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Role</Label><Input value={exp.role} onChange={(e) => handleNestedChange("experience", index, "role", e.target.value)} /></div>
                    <div><Label>Company</Label><Input value={exp.company} onChange={(e) => handleNestedChange("experience", index, "company", e.target.value)} /></div>
                    <div><Label>Start Date</Label><Input value={exp.startDate} onChange={(e) => handleNestedChange("experience", index, "startDate", e.target.value)} /></div>
                    <div><Label>End Date</Label><Input value={exp.endDate} onChange={(e) => handleNestedChange("experience", index, "endDate", e.target.value)} /></div>
                  </div>
                  <div><Label>Description (one achievement per line)</Label><Textarea value={exp.description} onChange={(e) => handleNestedChange("experience", index, "description", e.target.value)} /></div>
                </div>
              ))}
              <Button variant="outline" onClick={() => addListItem('experience')}><PlusCircle className="mr-2" size={16} /> Add Experience</Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="education">
            <AccordionTrigger>Education</AccordionTrigger>
            <AccordionContent className="space-y-4">
              {profile.education.map((edu, index) => (
                <div key={index} className="p-4 border rounded-md space-y-4 relative">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-muted-foreground hover:text-destructive" onClick={() => removeListItem('education', index)}><Trash2 size={16} /></Button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Institution</Label><Input value={edu.institution} onChange={(e) => handleNestedChange("education", index, "institution", e.target.value)} /></div>
                    <div><Label>Degree</Label><Input value={edu.degree} onChange={(e) => handleNestedChange("education", index, "degree", e.target.value)} /></div>
                    <div><Label>Start Date</Label><Input value={edu.startDate} onChange={(e) => handleNestedChange("education", index, "startDate", e.target.value)} /></div>
                    <div><Label>End Date</Label><Input value={edu.endDate} onChange={(e) => handleNestedChange("education", index, "endDate", e.target.value)} /></div>
                  </div>
                  <div><Label>Details</Label><Textarea value={edu.details} onChange={(e) => handleNestedChange("education", index, "details", e.target.value)} /></div>
                </div>
              ))}
              <Button variant="outline" onClick={() => addListItem('education')}><PlusCircle className="mr-2" size={16} /> Add Education</Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="skills">
            <AccordionTrigger>Skills, Certifications & Portfolio</AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div><Label>Skills (comma-separated)</Label><Input value={profile.skills.join(', ')} onChange={(e) => handleListChange('skills', e.target.value)} /></div>
              <div><Label>Certifications (comma-separated)</Label><Input value={profile.certifications.join(', ')} onChange={(e) => handleListChange('certifications', e.target.value)} /></div>
              <div><Label>Portfolio Links (comma-separated)</Label><Input value={profile.portfolioLinks.join(', ')} onChange={(e) => handleListChange('portfolioLinks', e.target.value)} /></div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
