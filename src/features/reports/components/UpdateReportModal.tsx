import { useState } from "react";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { type Status } from "../types";

export default function UpdateReportModal({
  showModal,
  openId,
  setOpenId,
  status,
}: {
  showModal: boolean;
  openId: number;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
  status: Status;
}) {
  return (
    <dialog open={showModal}>
      <UpdateReportForm
        reportId={openId}
        reportStatus={status}
        setOpenId={setOpenId}
      />
    </dialog>
  );
}

function UpdateReportForm({
  reportId,
  reportStatus,
  setOpenId,
}: {
  reportId: number;
  reportStatus: Status;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { mutate: update, isPending, isError } = useUpdateReport(reportId);
  const [status, setStatus] = useState<Status>(reportStatus);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    update(
      { status },
      {
        onSuccess: (updatedReport) => {
          setStatus(updatedReport.status);
        },
      }
    );

    setOpenId(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update report</h2>

      <div>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Status)}
          required
        >
          <option value="pending">Pending</option>
          <option value="process">Process</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
      <button type="button" onClick={() => setOpenId(null)}>
        Close
      </button>

      {isError && <p>Something went wrong</p>}
    </form>
  );
}
