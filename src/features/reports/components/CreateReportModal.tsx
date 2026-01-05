import { useCreateReport } from "../hooks/useCreateReport";
import { useForm } from "react-hook-form";
import {
  createReportSchema,
  type CreateReportForm,
} from "../validations/createReport.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateReportModal() {
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
    create({ title: data.title, description: data.description });
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

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>

      {isError && <p>Something went wrong</p>}
    </form>
  );
}
