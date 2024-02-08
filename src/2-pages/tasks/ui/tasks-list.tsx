import { useTasks } from "@/5-entities/task";
import { UserPreview, useUsers } from "@/5-entities/user";
import { RemoveTaskButton } from "@/4-features/task/remove";
import { UpdateTaskButton } from "@/4-features/task/update";
import { useCanViewTaskFn } from "@/4-features/task/view";
import { ROUTER_PATHS } from "@/6-shared/constants/routes";
import { Link, generatePath } from "react-router-dom";
import { BoardPreviewById } from "@/5-entities/board";

const taskUrl = (taskId: string) =>
  generatePath(ROUTER_PATHS.HOME + ROUTER_PATHS.TASK, { taskId });

export function TasksList({ className }: { className?: string }) {
  const { tasks } = useTasks();
  const users = useUsers((s) => s.usersMap());

  const canViewTask = useCanViewTaskFn();

  return (
    <div className={className}>
      <h2 className="text-lg mb-2 font-semibold">Все Задачи</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-start">Название:</th>
            <th className="text-start">Автор:</th>
            <th className="text-start">Доска:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks
            .filter((task) => canViewTask(task.id))
            .map((task) => (
              <tr
                key={task.id}
                className="px-5 py-2 border-b border-b-slate-3 "
              >
                <td className="p-2">
                  <Link to={taskUrl(task.id)} className="text-xl text-blue-500">
                    {task.title}
                  </Link>
                </td>
                <td className="p-2">
                  <UserPreview size="md" {...users[task.authorId]} />
                </td>
                <td className="p-2">
                  <BoardPreviewById size="md" boardId={task.boardId} />
                </td>

                <td className="p-2">
                  <div className="flex gap-2 ml-auto">
                    <UpdateTaskButton taskId={task.id} />
                    <RemoveTaskButton taskId={task.id} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
