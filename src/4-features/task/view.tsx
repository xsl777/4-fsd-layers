import { Task, useTasks } from "@/5-entities/task";
import { Session, useSession } from "@/5-entities/session";

function canViewTask(task?: Task, session?: Session) {
  if (!task) return false;
  return session && task.authorId === session?.userId;
}

export function useCanViewTaskFn() {
  const session = useSession((s) => s.currentSession);
  const getTaskById = useTasks((s) => s.getTaskById);
  return (taskId: string) => {
    const task = getTaskById(taskId);
    return canViewTask(task, session);
  };
}
