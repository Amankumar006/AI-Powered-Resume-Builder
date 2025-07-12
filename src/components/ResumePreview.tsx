"use client";

import type { UserProfile } from "@/lib/types";
import {
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Globe,
  MapPin,
  Sparkles,
  Award,
  Link as LinkIcon,
  Download,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Card, CardContent } from "./ui/card";

interface ResumePreviewProps {
  profile: UserProfile;
}

const ResumePreview = ({ profile }: ResumePreviewProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Card id="resume-preview" className="relative w-full max-w-4xl mx-auto overflow-hidden bg-white shadow-2xl rounded-lg">
      <div className="p-4 sm:p-8 md:p-12">
        <header className="text-center mb-8 border-b-2 border-primary pb-6">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-2">
            {profile.title}
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-700 mb-8">
          {profile.email && <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-primary transition-colors"><Mail size={14} /> {profile.email}</a>}
          {profile.phone && <a href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors"><Phone size={14} /> {profile.phone}</a>}
          {profile.website && <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary transition-colors"><Globe size={14} /> {profile.website}</a>}
          {profile.location && <div className="flex items-center gap-2"><MapPin size={14} /> {profile.location}</div>}
        </div>

        <main className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-headline font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4 flex items-center gap-3">
                <Briefcase /> Experience
              </h2>
              <div className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                    <p className="font-semibold text-gray-600">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                    <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                      {exp.description.split('\n').map((line, i) => line && <li key={i}>{line}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-headline font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4 flex items-center gap-3">
                <GraduationCap /> Education
              </h2>
              <div className="space-y-6">
                {profile.education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-bold text-gray-800">{edu.institution}</h3>
                    <p className="font-semibold text-gray-600">{edu.degree}</p>
                     <p className="text-sm text-muted-foreground">{edu.startDate} - {edu.endDate}</p>
                    <p className="mt-1 text-gray-700">{edu.details}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="text-2xl font-headline font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4 flex items-center gap-3">
                <Sparkles /> Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full">{skill}</span>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-headline font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4 flex items-center gap-3">
                <Award /> Certifications
              </h2>
              <ul className="space-y-2 list-inside list-disc text-gray-700">
                {profile.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-headline font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4 flex items-center gap-3">
                <LinkIcon /> Portfolio
              </h2>
              <ul className="space-y-2 text-gray-700">
                {profile.portfolioLinks.map((link, index) => (
                  <li key={index} className="truncate">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors underline">{link}</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>
      <div className="absolute top-4 right-4 no-print">
        <Button onClick={handlePrint} variant="default">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </Card>
  );
};

export default ResumePreview;
