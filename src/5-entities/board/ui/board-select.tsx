import { Board, BoardPreview, useBoards } from "@/5-entities/board";
import { UiSelect } from "@/6-shared/ui/ui-select-field";

export function BoardSelect({
  className,
  label,
  onChangeBoardId,
  boardId,
  required,
  error,
}: {
  error?: string;

  className?: string;
  boardId?: string;
  label?: string;
  onChangeBoardId: (id?: string) => void;
  required?: boolean;
}) {
  const board = useBoards((s) =>
    boardId ? s.getBoardById(boardId) : undefined,
  ) as Board | undefined;
  const boards = useBoards((s) => s.boards) as Board[] | undefined;

  const options = required ? boards : [undefined, ...(boards ?? [])];

  const onChangeBoard = (board?: Board) => {
    onChangeBoardId(board?.id);
  };
  console.log(options);

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={board}
      onChange={onChangeBoard}
      getLabel={(board) => board?.name ?? ""}
      renderPreview={(board) =>
        board ? <BoardPreview size="sm" board={board} /> : <div>Не выбрано</div>
      }
      renderOption={(board) =>
        board ? <BoardPreview size="sm" board={board} /> : <div>Не выбрано</div>
      }
    />
  );
}
