"use client";

import { Progress } from "@/components/ui/progress";
import { Logo } from "@/components/logo";

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col items-center justify-center">
      <div className="w-full max-w-xs space-y-4">
        <Logo className="text-4xl text-center" />
        <div className="flex items-center gap-4 text-primary">
          <Progress value={progress} className="h-2" />
          <span className="text-sm font-mono w-12 text-right">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
