import { Controller, useForm } from "react-hook-form";

import { UiModal } from "@/6-shared/ui/ui-modal";
import { UiButton } from "@/6-shared/ui/ui-button";
import { UiTextField } from "@/6-shared/ui/ui-text-field";
import { useUpdateTask } from "../model/use-update-task";
import { UpdateTaskData, useTasks } from "@/5-entities/task";
import { UserSelect } from "@/5-entities/user";
import { BoardSelect } from "@/5-entities/board";

export function UpdateTaskModal({
  onClose,
  taskId,
}: {
  onClose: () => void;
  taskId: string;
}) {
  const task = useTasks((s) => s.getTaskById(taskId));

  const { control, handleSubmit } = useForm<UpdateTaskData>({
    defaultValues: task,
  });

  const { updateTask } = useUpdateTask(taskId);

  const onSubmit = handleSubmit((data) => updateTask(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Редактирование доски</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="title"
            rules={{ required: "Название задачи - обязательное поле" }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Название"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: "Описание задачи" }}
            render={({ field, fieldState }) => (
              <UiTextField
                label="Описание"
                inputProps={{ ...field }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="authorId"
            rules={{
              required: "Администратор доски - обязательное поле",
            }}
            render={({ field: { value, onChange }, fieldState }) => (
              <UserSelect
                label="Администратор"
                userId={value}
                onChangeUserId={onChange}
                error={fieldState.error?.message}
                required
                className="w-full"
              />
            )}
          />

          <Controller
            control={control}
            name="boardId"
            render={({ field: { value, onChange }, fieldState }) => (
              <BoardSelect
                label="Выберите доску"
                boardId={value}
                onChangeBoardId={onChange}
                error={fieldState.error?.message}
                className="w-full"
              />
            )}
          />
        </UiModal.Body>
        <UiModal.Footer>
          <UiButton type="button" variant="outlined" onClick={onClose}>
            Отмена
          </UiButton>
          <UiButton type="submit" variant="primary">
            Обновить
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
