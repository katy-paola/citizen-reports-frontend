import { useEffect, useRef } from "react";
import { DialogContext } from "../context/dialogContext";

export function Dialog({
  shouldOpen,
  onOpenChange,
  children,
}: {
  shouldOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (shouldOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!shouldOpen && dialog.open) {
      dialog.close();
    }
  }, [shouldOpen]);

  const close = () => onOpenChange(false);

  return (
    <DialogContext.Provider value={{ close }}>
      <dialog ref={dialogRef}>{children}</dialog>
    </DialogContext.Provider>
  );
}
