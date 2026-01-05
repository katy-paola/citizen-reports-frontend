import { useUpdateReport } from "../hooks/useUpdateReport";
import { type Status } from "../types";
import { useForm } from "react-hook-form";
import {
  updateReportSchema,
  type UpdateReportForm,
} from "../validations/updateReport.schema";
import { zodResolver } from "@hookform/resolvers/zod";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateReportForm>({
    resolver: zodResolver(updateReportSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: UpdateReportForm) => {
    update({ status: data.status }, { onSuccess: () => setOpenId(null) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Update report</h2>

      <div>
        <select {...register("status")} defaultValue={reportStatus}>
          <option value="pending">Pending</option>
          <option value="process">Process</option>
          <option value="resolved">Resolved</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
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
