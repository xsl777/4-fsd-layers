import { useBoards } from "@/5-entities/board";
import { AvatarsList, UserPreview, useUsers } from "@/5-entities/user";
import { RemoveBoardButton } from "@/4-features/board/remove";
import { UpdateBoardButton } from "@/4-features/board/update";
import { useCanViewBoardFn } from "@/4-features/board/view";
import { ROUTER_PATHS } from "@/6-shared/constants/routes";
import { Link, generatePath } from "react-router-dom";

const boardUrl = (boardId: string) =>
  generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.BOARD, { boardId });

export function BoardsList({ className }: { className?: string }) {
  const { boards } = useBoards();
  const users = useUsers((s) => s.usersMap());

  const canViewBoard = useCanViewBoardFn();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все доски</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Название:</th>
            <th className="text-start">Админ:</th>
            <th className="text-start">Редакторы:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {boards
            .filter((board) => canViewBoard(board.id))
            .map((board) => (
              <tr
                key={board.id}
                className="px-5 py-2 border-b border-b-slate-3 "
              >
                <td className="p-2">
                  <Link
                    to={boardUrl(board.id)}
                    className="text-xl text-blue-500"
                  >
                    {board.name}
                  </Link>
                </td>
                <td className="p-2">
                  <UserPreview size="md" {...users[board.ownerId]} />
                </td>
                <td className="p-2">
                  <AvatarsList
                    avatarsIds={board.editorsIds.map(
                      (id) => users[id].avatarId,
                    )}
                  />
                </td>
                <td className="p-2">
                  <div className="flex gap-2 ml-auto">
                    <UpdateBoardButton boardId={board.id} />
                    <RemoveBoardButton boardId={board.id} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
