import { useCreateReport } from "../hooks/useCreateReport";
import { useForm } from "react-hook-form";
import {
  createReportSchema,
  type CreateReportForm,
} from "../validations/createReport.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/Button";
import { Form } from "../../../shared/components/FormWrapper";
import { Input } from "../../../shared/components/Input";
import { Dialog } from "../../../shared/components/Dialog";
import { useDialog } from "../../../shared/context/dialogContext";
import { toast } from "../../../shared/utils/toast";

export default function CreateReportModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog shouldOpen={showModal} onOpenChange={setShowModal}>
      <CreateReportFormUI />
    </Dialog>
  );
}

function CreateReportFormUI() {
  const { close } = useDialog();
  const { mutate: create, isPending, isError } = useCreateReport();

  const form = useForm<CreateReportForm>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: CreateReportForm) => {
    create(
      { title: data.title, description: data.description },
      {
        onSuccess: () => {
          close();
          toast.success("Report created successfully");
        },
        onError: () => {
          toast.error("Error creating report");
        },
      },
    );
  };
  return (
    <Form form={form}>
      <form className="modal-content" onSubmit={form.handleSubmit(onSubmit)}>
        <h2>Create new report</h2>
        <Form.Field
          control={form.control}
          name="title"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Title</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  type="text"
                  placeholder="Noise disturbance at night"
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <Form.Field
          control={form.control}
          name="description"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Description</Form.Label>
              <Form.Control>
                <Input
                  {...field}
                  type="text"
                  placeholder="Loud music from a nearby business continues late into the night."
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
        <div className="buttons-group">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create"}
          </Button>
          <Button
            className="button-secondary"
            type="button"
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
