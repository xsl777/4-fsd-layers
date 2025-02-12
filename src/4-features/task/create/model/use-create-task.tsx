import { CreateTaskData, useTasks } from "@/5-entities/task";
import { useCanCreateTask } from "./use-can-create-task";
import { useSession } from "@/5-entities/session";

export function useCreateTask() {
  const session = useSession((s) => s.currentSession);
  const canCreate = useCanCreateTask();
  const createTaskRaw = useTasks((s) => s.createTask);

  const createTask = async (data: CreateTaskData, onCreate: () => void) => {
    if (!canCreate || !session?.userId) return;

    await createTaskRaw({ ...data, authorId: session.userId });

    onCreate();
  };

  return { createTask };
}
