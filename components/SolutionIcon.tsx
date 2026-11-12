import { Bot, MessageSquare, Workflow, Plug } from "lucide-react";
import type { Solution } from "@/lib/solutions";
const map = { bot: Bot, message: MessageSquare, workflow: Workflow, plug: Plug };
export function SolutionIcon({ name, size = 22 }: { name: Solution["icon"]; size?: number }) {
  const I = map[name];
  return <I size={size} strokeWidth={1.5} aria-hidden />;
}
