import { useSession } from "@/5-entities/session";
import { UiButton } from "@/6-shared/ui/ui-button";

function useSignOut() {
  return useSession((s) => s.removeSession);
}

export function SignOutButton({ className }: { className?: string }) {
  const signOut = useSignOut();
  return (
    <UiButton
      className={className}
      variant="secondary"
      onClick={() => signOut()}
    >
      Выйти
    </UiButton>
  );
}
