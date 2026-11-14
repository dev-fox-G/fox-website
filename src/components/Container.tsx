import type { ReactNode } from "react";
import { cn } from "@/lib/ui";

export default function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-290 px-[1.15rem] sm:px-6", className)}>{children}</div>;
}
