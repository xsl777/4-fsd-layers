import { Session, useSession } from "@/5-entities/session";
import { BoardPartial, useBoards } from "@/5-entities/board";
import { RemoveIcon } from "@/6-shared/ui/ui-icons";
import { useGetConfirmation } from "@/6-shared/lib/confirmation";
import { useTasks } from "@/5-entities/task";

function canRemoveBoard(board?: BoardPartial, session?: Session) {
  if (!board) return false;
  return session?.userId === board?.ownerId;
}

function useCanRemoveBoardFn() {
  const session = useSession((s) => s.currentSession);
  const getBoardById = useBoards((s) => s.getBoardById);
  return (boardId: string) => {
    const board = getBoardById(boardId);
    return canRemoveBoard(board, session);
  };
}

function useCanRemoveBoard(boardId: string) {
  const board = useBoards((s) => s.getBoardById(boardId));
  const session = useSession((s) => s.currentSession);
  return canRemoveBoard(board, session);
}

function useRemoveBoard() {
  const getConfirmation = useGetConfirmation();
  const canRemoveFn = useCanRemoveBoardFn();

  const { unlinkBoard } = useTasks();
  const { removeBoard } = useBoards();

  return async (boardId: string) => {
    const confirmation = await getConfirmation({
      description: "Вы действительно хотите удалить доску?",
    });

    if (canRemoveFn(boardId) && confirmation) {
      await unlinkBoard(boardId);
      await removeBoard(boardId);
    }
  };
}

export function RemoveBoardButton({ boardId }: { boardId: string }) {
  const canRemove = useCanRemoveBoard(boardId);
  const removeBoard = useRemoveBoard();

  if (!canRemove) return null;
  return (
    <button onClick={() => removeBoard(boardId)}>
      <RemoveIcon className="w-8 h-8 text-rose-500" />
    </button>
  );
}
