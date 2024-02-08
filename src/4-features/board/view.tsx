import { BoardPartial, useBoards } from "@/5-entities/board";
import { Session, useSession } from "@/5-entities/session";

function canViewBoard(board?: BoardPartial, session?: Session) {
  if (!board) return false;
  return (
    session &&
    (board?.editorsIds.includes(session.userId) ||
      board.ownerId === session?.userId)
  );
}

export function useCanViewBoardFn() {
  const session = useSession((s) => s.currentSession);
  const getBoardById = useBoards((s) => s.getBoardById);
  return (boardId: string) => {
    const board = getBoardById(boardId);
    return canViewBoard(board, session);
  };
}
