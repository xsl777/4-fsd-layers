import clsx from "clsx";
import { Board } from "../model/types";

export function BoardPreview({
  board,
  size,
}: {
  board: Board;
  size: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={clsx(
        { sm: "text-lg", md: "text-lg", lg: "text-xl" }[size],
        "whitespace-nowrap overflow-hidden text-ellipsis min-w-[50px]",
      )}
    >
      {board.name}
    </div>
  );
}
