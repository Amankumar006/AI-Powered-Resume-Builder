"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rss } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Rss className="w-7 h-7 text-primary" />
        <h1 className="text-2xl font-bold text-primary font-headline">
          ResuMaster
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="user avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
