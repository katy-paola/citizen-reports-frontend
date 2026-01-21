import { useDeleteReport } from "../hooks/useDeleteReport";
import Button from "../../../shared/components/Button";
import { Dialog } from "../../../shared/components/Dialog";
import { useDialog } from "../../../shared/context/dialogContext";
import type { ReportEntity } from "../types";
import { toast } from "../../../shared/utils/toast";

export default function DeleteConfirmationModal({
  reportId,
  reports,
  showModal,
  setShowModal,
}: {
  reportId: number | null;
  reports: ReportEntity[];
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const report = reports.find((report) => report.id === reportId);

  return (
    <Dialog shouldOpen={showModal} onOpenChange={setShowModal}>
      {report && (
        <DeleteConfirmationContent reportId={report.id} report={report} />
      )}
    </Dialog>
  );
}

function DeleteConfirmationContent({
  reportId,
  report,
}: {
  reportId: number;
  report: ReportEntity;
}) {
  const { close } = useDialog();
  const { mutate: deleteReport, isPending, error } = useDeleteReport(reportId);

  const handleDelete = () => {
    deleteReport(undefined, {
      onSuccess: () => {
        close();
        toast.info("Report deleted");
      },
      onError: () => {
        toast.error("Error deleting report");
      },
    });
  };

  return (
    <div className="modal-content">
      <h3>{report.title}</h3>
      <div>
        <p>Are you sure you want to delete this report?</p>
        <p>This action cannot be undone.</p>
      </div>

      <div className="buttons-group buttons-group-delete">
        <Button
          className="button-danger"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Yes, Delete"}
        </Button>

        <Button type="button" onClick={close}>
          No, cancel
        </Button>
      </div>
      {error && <p>Something went wrong: {error.message}</p>}
    </div>
  );
}
