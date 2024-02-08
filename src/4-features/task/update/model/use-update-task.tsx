import { UpdateTaskData, useTasks } from "@/5-entities/task";
import { useCanUpdateTaskFn } from "./use-can-update-task";
import { useGetConfirmation } from "@/6-shared/lib/confirmation";
import { useSession } from "@/5-entities/session";

export function useUpdateTask(taskId: string) {
  const session = useSession((s) => s.currentSession);
  const getConfirmation = useGetConfirmation();
  const canUpdateFn = useCanUpdateTaskFn();

  const updateModalRaw = useTasks((s) => s.updateTask);

  const updateTask = async (data: UpdateTaskData, onUpdate: () => void) => {
    if (!canUpdateFn(taskId)) return;

    if (session?.userId !== data.authorId) {
      const confirmation = await getConfirmation({
        description:
          "Вы действительно хотите передать задачу другому пользователю?",
      });

      if (!confirmation) return;
    }

    await updateModalRaw(taskId, data);
    onUpdate();
  };

  return { updateTask };
}
