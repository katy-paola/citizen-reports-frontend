import { useDeleteReport } from "../hooks/useDeleteReport";
import Button from "../../../shared/components/Button";
import { Dialog } from "../../../shared/components/Dialog";
import { useDialog } from "../../../shared/context/dialogContext";

export default function DeleteConfirmationModal({
  reportId,
  showModal,
  setShowModal,
}: {
  reportId: number | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog shouldOpen={showModal} onOpenChange={setShowModal}>
      {reportId && <DeleteConfirmationContent reportId={reportId} />}
    </Dialog>
  );
}

function DeleteConfirmationContent({ reportId }: { reportId: number }) {
  const { close } = useDialog();
  const { mutate: deleteReport, isPending } = useDeleteReport(reportId);

  const handleDelete = () => {
    deleteReport(undefined, {
      onSuccess: close,
    });
  };

  return (
    <div>
      <p>Are you sure you want to delete this report?</p>
      <p>This action cannot be undone.</p>

      <Button onClick={handleDelete} disabled={isPending}>
        {isPending ? "Deleting..." : "Yes, Delete"}
      </Button>

      <Button type="button" onClick={close}>
        No, cancel
      </Button>
    </div>
  );
}
