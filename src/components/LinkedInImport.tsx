"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Linkedin, DownloadCloud } from "lucide-react";
import type { UserProfile } from "@/lib/types";

interface LinkedInImportProps {
  handleImport: (url: string) => Promise<void>;
  isLoading: boolean;
  generatedProfile: UserProfile | null;
  handleAcceptProfile: () => void;
}

export default function LinkedInImport({
  handleImport,
  isLoading,
  generatedProfile,
  handleAcceptProfile
}: LinkedInImportProps) {
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const onImportClick = () => {
    if (linkedinUrl) {
      handleImport(linkedinUrl);
    }
  };

  const isUrlValid = linkedinUrl.startsWith("https://www.linkedin.com/in/");

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-primary flex items-center gap-2">
            <Linkedin /> LinkedIn Profile Import
          </CardTitle>
          <CardDescription>
            Paste your LinkedIn profile URL to auto-generate a resume with AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              type="url"
              placeholder="https://www.linkedin.com/in/your-profile"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={onImportClick} disabled={isLoading || !isUrlValid}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <DownloadCloud className="mr-2 h-4 w-4" />
              )}
              Import & Generate
            </Button>
          </div>
          
          {generatedProfile && (
            <div className="pt-4 space-y-4 bg-secondary p-6 rounded-lg">
                <h3 className="text-xl font-bold font-headline text-primary">Generated Profile Preview</h3>
                <div className="space-y-2">
                    <p><span className="font-semibold">Name:</span> {generatedProfile.name}</p>
                    <p><span className="font-semibold">Title:</span> {generatedProfile.title}</p>
                    <p><span className="font-semibold">Summary:</span> {generatedProfile.summary}</p>
                </div>
                <Button onClick={handleAcceptProfile}>
                    Use this Profile
                </Button>
                <p className="text-sm text-muted-foreground pt-2">
                    Using this profile will replace the current data in the "Resume Editor" tab.
                </p>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
