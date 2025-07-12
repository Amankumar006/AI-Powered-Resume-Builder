"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Loader2, Wand2 } from "lucide-react";
import { Badge } from "./ui/badge";

interface JobDescriptionFormProps {
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  handleAnalyze: () => void;
  extractedSkills: string[];
  extractedRequirements: string[];
  isAnalyzing: boolean;
}

export default function JobDescriptionForm({
  jobDescription,
  setJobDescription,
  handleAnalyze,
  extractedSkills,
  extractedRequirements,
  isAnalyzing
}: JobDescriptionFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-primary">Job Description</CardTitle>
        <CardDescription>Paste the job description below to extract keywords and skills.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={10}
        />
        <Button onClick={handleAnalyze} disabled={isAnalyzing || !jobDescription}>
          {isAnalyzing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Analyze
        </Button>
        {(extractedSkills.length > 0 || extractedRequirements.length > 0) && (
          <div className="space-y-4 pt-4">
            {extractedSkills.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Extracted Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {extractedSkills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </div>
              </div>
            )}
            {extractedRequirements.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Extracted Requirements:</h4>
                 <div className="flex flex-wrap gap-2">
                  {extractedRequirements.map(req => <Badge key={req} variant="outline">{req}</Badge>)}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
