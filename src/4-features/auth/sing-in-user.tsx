import { useSession } from "@/5-entities/session";
import { User } from "@/5-entities/user";
import { UiButton } from "@/6-shared/ui/ui-button";

function useSignInUser() {
  const createSession = useSession((s) => s.createSession);

  return (user: User) => {
    createSession({
      userId: user.id,
      ...user,
    });
  };
}

export function SignInUserButton({
  className,
  user,
}: {
  className?: string;
  user: User;
}) {
  const singInUser = useSignInUser();
  return (
    <UiButton
      className={className}
      variant="primary"
      onClick={() => singInUser(user)}
    >
      Войти как
    </UiButton>
  );
}
