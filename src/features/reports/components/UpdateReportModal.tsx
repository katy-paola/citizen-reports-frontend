import { useUpdateReport } from "../hooks/useUpdateReport";
import { type Status } from "../types";
import { useForm } from "react-hook-form";
import {
  updateReportSchema,
  type UpdateReportForm,
} from "../validations/updateReport.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/Button";
import { Form } from "../../../shared/components/FormWrapper";
import { Select } from "../../../shared/components/Select";

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
      <UpdateReportFormUI
        reportId={openId}
        reportStatus={status}
        setOpenId={setOpenId}
      />
    </dialog>
  );
}

function UpdateReportFormUI({
  reportId,
  reportStatus,
  setOpenId,
}: {
  reportId: number;
  reportStatus: Status;
  setOpenId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const { mutate: update, isPending, isError } = useUpdateReport(reportId);

  const form = useForm<UpdateReportForm>({
    resolver: zodResolver(updateReportSchema),
    defaultValues: {
      status: reportStatus,
    },
    mode: "onBlur",
  });

  const onSubmit = (data: UpdateReportForm) => {
    update({ status: data.status }, { onSuccess: () => setOpenId(null) });
  };

  return (
    <Form form={form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h2>Update report</h2>

        <Form.Field
          control={form.control}
          name="status"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Status</Form.Label>
              <Form.Control>
                <Select {...field}>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="process">Process</Select.Option>
                  <Select.Option value="resolved">Resolved</Select.Option>
                </Select>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
        <Button type="button" onClick={() => setOpenId(null)}>
          Close
        </Button>
        <Button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => form.reset()}
        >
          Clear
        </Button>
        {isError && <p>Something went wrong</p>}
      </form>
    </Form>
  );
}
