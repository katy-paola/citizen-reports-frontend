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

export default function CreateReportModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <dialog open={showModal}>
      <CreateReportFormUI setShowModal={setShowModal} />
    </dialog>
  );
}

function CreateReportFormUI({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate: create, isPending, isError } = useCreateReport();

  const form = useForm<CreateReportForm>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      title: "",
      description: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data: CreateReportForm) => {
    create(
      { title: data.title, description: data.description },
      {
        onSuccess: () => {
          setShowModal(false);
        },
      }
    );
  };
  return (
    <Form form={form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
        <Button type="button" onClick={() => setShowModal(false)}>
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
