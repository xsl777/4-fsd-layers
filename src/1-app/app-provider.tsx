import { ComposeChildren } from "@/6-shared/lib/react";
import { Confirmations } from "@/3-widgets/confirmations";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <Confirmations />
      {children}
    </ComposeChildren>
  );
}
