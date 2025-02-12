import { UpdateBoardData, useBoards } from "@/5-entities/board";
import { useCanUpdateBoardFn } from "./use-can-update-board";
import { useGetConfirmation } from "@/6-shared/lib/confirmation";
import { useSession } from "@/5-entities/session";

export function useUpdateBoard(boardId: string) {
  const session = useSession((s) => s.currentSession);
  const getConfirmation = useGetConfirmation();
  const canUpdateFn = useCanUpdateBoardFn();

  const updateModalRaw = useBoards((s) => s.updateBoard);

  const updateBoard = async (data: UpdateBoardData, onUpdate: () => void) => {
    if (!canUpdateFn(boardId)) return;

    if (session?.userId !== data.ownerId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать доску другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateModalRaw(boardId, data);
    onUpdate();
  };

  return { updateBoard };
}
