import { Board, BoardPreview, useBoards } from "@/5-entities/board";

export function BoardPreviewById({
  boardId,
  size,
}: {
  boardId?: string;
  size: "sm" | "md" | "lg";
}) {
  const board = useBoards((s) =>
    boardId ? s.getBoardById(boardId) : undefined,
  ) as Board | undefined;

  return board ? (
    <BoardPreview size={size} board={board} />
  ) : (
    <div>Не выбрано</div>
  );
}
