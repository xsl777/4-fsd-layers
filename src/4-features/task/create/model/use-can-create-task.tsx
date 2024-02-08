import { useSession } from "@/5-entities/session";

export function useCanCreateTask() {
  const session = useSession((s) => s.currentSession);
  return !!session;
}
