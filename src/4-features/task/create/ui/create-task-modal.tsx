import { UiModal } from "@/6-shared/ui/ui-modal";
import { UiButton } from "@/6-shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/6-shared/ui/ui-text-field";
import { CreateTaskData } from "@/5-entities/task";
import { useCreateTask } from "../model/use-create-task";
import { BoardSelect } from "@/5-entities/board/ui/board-select";

export function CreateTaskModal({ onClose }: { onClose: () => void }) {
  const { control, handleSubmit } = useForm<CreateTaskData>({
    defaultValues: {
      title: "",
    },
  });

  const { createTask } = useCreateTask();

  const onSubmit = handleSubmit((data) => createTask(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Создание задачи</h1>
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
            Создать
          </UiButton>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
