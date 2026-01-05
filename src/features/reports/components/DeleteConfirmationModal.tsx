import type React from "react";
import { useDeleteReport } from "../hooks/useDeleteReport";

export default function DeleteConfirmationModal({
  showModal,
  openId,
  setOpenId,
}: {
  showModal: boolean;
  openId: number;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { mutate: deleteReport, isPending } = useDeleteReport(openId);

  const handleDelete = () => {
    deleteReport();
    setOpenId(null);
  };

  return (
    <dialog open={showModal}>
      <p>Are you sure you want to delete this report?</p>
      <p>This action cannot be undone.</p>
      <button onClick={handleDelete} disabled={isPending}>
        {isPending ? "Deleting..." : "Yes, Delete"}
      </button>
      <button onClick={() => setOpenId(null)}>No, cancel</button>
    </dialog>
  );
}
