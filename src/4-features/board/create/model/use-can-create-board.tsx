import { useSession } from "@/5-entities/session";

export function useCanCreateBoard() {
  const session = useSession((s) => s.currentSession);
  return !!session;
}
