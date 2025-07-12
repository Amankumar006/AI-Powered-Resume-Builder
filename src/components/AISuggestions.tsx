"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Loader2, Lightbulb } from "lucide-react";

interface AISuggestionsProps {
  suggestions: string[];
  handleGetSuggestions: () => void;
  isLoading: boolean;
}

export default function AISuggestions({ suggestions, handleGetSuggestions, isLoading }: AISuggestionsProps) {
  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-primary flex items-center gap-2">
            <Lightbulb /> AI Content Suggestions
          </CardTitle>
          <CardDescription>
            Get AI-powered suggestions to improve your resume based on your profile and the job description.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGetSuggestions} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Lightbulb className="mr-2 h-4 w-4" />
            )}
            Generate Suggestions
          </Button>

          {suggestions.length > 0 && (
            <div className="pt-4 space-y-3">
               <h4 className="font-semibold text-lg">Here are your suggestions:</h4>
              <ul className="list-disc list-inside bg-secondary p-4 rounded-md space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-secondary-foreground">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
