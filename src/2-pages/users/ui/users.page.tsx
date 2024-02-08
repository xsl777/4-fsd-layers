import { UiCetnerContentLayout } from "@/6-shared/ui/layouts/ui-center-content-layout";
import { CreateUserForm } from "@/4-features/user/create";
import { User } from "@/5-entities/user";
import { useCheckSingIn } from "@/4-features/auth/check-sign-in";
import { SignOutButton } from "@/4-features/auth/sign-out";
import { SignInUserButton } from "@/4-features/auth/sing-in-user";
import { RemoveUserButton } from "@/4-features/user/remove";
import { UsersList } from "./user-list";

export function UsersPage() {
  const { isUserSignIn } = useCheckSingIn();

  const getUserActions = (user: User) => {
    return (
      <>
        {isUserSignIn(user) ? (
          <SignOutButton />
        ) : (
          <SignInUserButton user={user} />
        )}
        <RemoveUserButton userId={user.id} />
      </>
    );
  };

  return (
    <UiCetnerContentLayout className="py-10">
      <h1 className="text-3xl ">Пользователи</h1>
      <CreateUserForm className="mt-10" />
      <UsersList userActions={getUserActions} />
    </UiCetnerContentLayout>
  );
}
