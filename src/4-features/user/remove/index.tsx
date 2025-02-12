import { useBoards } from "@/5-entities/board";
import { useSession } from "@/5-entities/session";
import { useUsers } from "@/5-entities/user";
import { useGetConfirmation } from "@/6-shared/lib/confirmation";
import { RemoveIcon } from "@/6-shared/ui/ui-icons";

function useRemoveUser() {
  const getConfirmation = useGetConfirmation();
  const { currentSession, removeSession } = useSession();
  const { boards, removeBoard, updateBoard } = useBoards();
  const removeUser = useUsers((s) => s.removeUser);

  return async (userId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить пользователя?",
    });

    if (!confirmation) return;

    if (currentSession?.userId === userId) {
      await removeSession();
    }

    for await (const board of boards) {
      const newBoard = {
        ...board,
        editorsIds: board.editorsIds.filter((id) => id !== userId),
      };

      if (newBoard.ownerId === userId) {
        await removeBoard(newBoard.id);
      } else {
        await updateBoard(newBoard.id, newBoard);
      }
    }

    await removeUser(userId);
  };
}

export function RemoveUserButton({ userId }: { userId: string }) {
  const removeUser = useRemoveUser();
  return (
    <button onClick={() => removeUser(userId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
