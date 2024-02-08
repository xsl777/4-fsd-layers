import { BoardPage } from "@/2-pages/board";
import { BoardsPage } from "@/2-pages/boards";
import { TaskPage } from "@/2-pages/task";
import { TasksPage } from "@/2-pages/tasks";
import { UsersPage } from "@/2-pages/users";
import { RootLayout } from "@/3-widgets/root-layout";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { ROUTER_PATHS } from "@/6-shared/constants/routes";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
    element: <RootLayout />,
    children: [
      {
        path: "",
        loader: () => redirect(ROUTER_PATHS.USERS),
      },
      {
        path: ROUTER_PATHS.BOARD,
        element: <BoardPage />,
      },
      {
        path: ROUTER_PATHS.BOARDS,
        element: <BoardsPage />,
      },
      {
        path: ROUTER_PATHS.USERS,
        element: <UsersPage />,
      },
      {
        path: ROUTER_PATHS.TASK,
        element: <TaskPage />,
      },
      {
        path: ROUTER_PATHS.TASKS,
        element: <TasksPage />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
