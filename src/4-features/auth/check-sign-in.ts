import { useSession } from "@/5-entities/session";
import { User } from "@/5-entities/user";

export function useCheckSingIn() {
  const session = useSession((s) => s.currentSession);

  return {
    isSignIn: () => !!session,
    isUserSignIn: (user: User) => user.id === session?.userId,
  };
}
