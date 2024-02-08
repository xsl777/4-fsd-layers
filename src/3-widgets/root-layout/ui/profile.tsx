import { useSession } from "@/5-entities/session";
import { getAvatarUrl } from "@/5-entities/user";

export function Profile() {
  const { currentSession } = useSession();

  if (!currentSession) return null;

  return (
    <div className="flex gap-2 items-center justify-end">
      <img className="w-8 h-8" src={getAvatarUrl(currentSession.avatarId)} />
      <div className="text-lg">{currentSession.name}</div>
    </div>
  );
}
