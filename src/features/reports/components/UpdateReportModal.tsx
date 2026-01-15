import { useUpdateReport } from "../hooks/useUpdateReport";
import { type ReportEntity, type Status } from "../types";
import { useForm } from "react-hook-form";
import {
  updateReportSchema,
  type UpdateReportForm,
} from "../validations/updateReport.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/Button";
import { Form } from "../../../shared/components/FormWrapper";
import { Select } from "../../../shared/components/Select";
import { useDialog } from "../../../shared/context/dialogContext";
import { Dialog } from "../../../shared/components/Dialog";
import { useEffect } from "react";

export default function UpdateReportModal({
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
        <UpdateReportFormUI report={report} reportStatus={report.status} />
      )}
    </Dialog>
  );
}

function UpdateReportFormUI({
  report,
  reportStatus,
}: {
  report: ReportEntity;
  reportStatus: Status;
}) {
  const { close } = useDialog();
  const { mutate: update, isPending, isError } = useUpdateReport(report.id);

  const form = useForm<UpdateReportForm>({
    resolver: zodResolver(updateReportSchema),
    defaultValues: {
      status: reportStatus,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    form.reset({
      status: report.status,
    });
  }, [report, form]);

  const onSubmit = (data: UpdateReportForm) => {
    update({ status: data.status }, { onSuccess: close });
  };

  return (
    <Form form={form}>
      <form className="modal-content" onSubmit={form.handleSubmit(onSubmit)}>
        <h2>Update report</h2>

        <h3>{report.title}</h3>

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

        <div className="buttons-group">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </Button>
          <Button
            className="button-secondary"
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => form.reset()}
          >
            Clear
          </Button>
          <Button className="button-secondary" type="button" onClick={close}>
            Close
          </Button>
        </div>
        {isError && <p>Something went wrong</p>}
      </form>
    </Form>
  );
}
