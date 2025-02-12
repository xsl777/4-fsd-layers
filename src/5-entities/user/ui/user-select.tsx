import { User, UserPreview, useUsers } from "@/5-entities/user";
import { UiSelect } from "@/6-shared/ui/ui-select-field";

export function UserSelect({
  className,
  label,
  onChangeUserId,
  userId,
  required,
  error,
}: {
  error?: string;

  className?: string;
  userId?: string;
  label?: string;
  onChangeUserId: (id?: string) => void;
  required?: boolean;
}) {
  const user = useUsers((s) => (userId ? s.getUserById(userId) : undefined));
  const users = useUsers((s) => s.users);

  const options = required ? users : [undefined, ...users];

  const onChangeUser = (user?: User) => {
    onChangeUserId(user?.id);
  };
  console.log(options);

  return (
    <UiSelect
      error={error}
      className={className}
      label={label}
      options={options}
      value={user}
      onChange={onChangeUser}
      getLabel={(user) => user?.name ?? ""}
      renderPreview={(user) =>
        user ? (
          <UserPreview size="sm" className="shrink-0 px-1" {...user} />
        ) : (
          <div>Не выбрано</div>
        )
      }
      renderOption={(user) =>
        user ? <UserPreview size="sm" {...user} /> : <div>Не выбрано</div>
      }
    />
  );
}
