import { useState } from "react";
import { useUpdateReport } from "../hooks/useUpdateReport";
import { type Status } from "../types";

export default function UpdateReportModal({
  id,
  status,
}: {
  id: number;
  status: Status;
}) {
  return <UpdateReportForm reportId={id} reportStatus={status} />;
}

function UpdateReportForm({
  reportId,
  reportStatus,
}: {
  reportId: number;
  reportStatus: Status;
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

      {isError && <p>Something went wrong</p>}
    </form>
  );
}
