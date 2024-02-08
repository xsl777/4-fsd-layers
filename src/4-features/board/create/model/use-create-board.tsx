import { CreateBoardData, useBoards } from "@/5-entities/board";
import { useCanCreateBoard } from "./use-can-create-board";
import { useSession } from "@/5-entities/session";

export function useCreateBoard() {
  const session = useSession((s) => s.currentSession);
  const canCreate = useCanCreateBoard();
  const createBoardRaw = useBoards((s) => s.createBoard);

  const createBoard = async (data: CreateBoardData, onCreate: () => void) => {
    if (!canCreate || !session?.userId) return;

    await createBoardRaw({ ...data, ownerId: session.userId });

    onCreate();
  };

  return { createBoard };
}
