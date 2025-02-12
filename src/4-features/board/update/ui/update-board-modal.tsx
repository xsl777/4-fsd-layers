import { UiModal } from "@/6-shared/ui/ui-modal";
import { UiButton } from "@/6-shared/ui/ui-button";
import { Controller, useForm } from "react-hook-form";
import { UiTextField } from "@/6-shared/ui/ui-text-field";
import { useUpdateBoard } from "../model/use-update-board";
import { UpdateBoardData, useBoards } from "@/5-entities/board";
import { UserMultiSelect, UserSelect } from "@/5-entities/user";

export function UpdateBoardModal({
  onClose,
  boardId,
}: {
  onClose: () => void;
  boardId: string;
}) {
  const board = useBoards((s) => s.getBoardById(boardId));

  const { control, handleSubmit } = useForm<UpdateBoardData>({
    defaultValues: board,
  });

  const { updateBoard } = useUpdateBoard(boardId);

  const onSubmit = handleSubmit((data) => updateBoard(data, onClose));

  return (
    <UiModal isOpen onClose={onClose} width="md">
      <form onSubmit={onSubmit}>
        <UiModal.Header>
          <h1>Редактирование доски</h1>
        </UiModal.Header>
        <UiModal.Body className="flex flex-col gap-4">
          <Controller
            control={control}
            name="name"
            rules={{ required: "Название доски - обязательное поле" }}
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
            name="ownerId"
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
            name="editorsIds"
            render={({ field: { value, onChange }, fieldState }) => (
              <UserMultiSelect
                label="Редакторы"
                userIds={value ?? []}
                onChangeUserIds={onChange}
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
