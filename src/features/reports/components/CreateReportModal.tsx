import { useCreateReport } from "../hooks/useCreateReport";
import { useForm } from "react-hook-form";
import {
  createReportSchema,
  type CreateReportForm,
} from "../validations/createReport.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../shared/components/Button";

export default function CreateReportModal({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <dialog open={showModal}>
      <CreateReportForm setShowModal={setShowModal} />
    </dialog>
  );
}

function CreateReportForm({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { mutate: create, isPending, isError } = useCreateReport();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReportForm>({
    resolver: zodResolver(createReportSchema),
    mode: "onSubmit",
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create report</h2>

      <div>
        <input type="text" placeholder="Title" {...register("title")} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>

      <div>
        <textarea placeholder="Description" {...register("description")} />
        {errors.description && <p>{errors.description.message}</p>}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>
      <Button type="button" onClick={() => setShowModal(false)}>
        Close
      </Button>

      {isError && <p>Something went wrong</p>}
    </form>
  );
}
