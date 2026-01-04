import { useState } from "react";
import { useCreateReport } from "../hooks/useCreateReport";

export default function CreateReportModal() {
  const { mutate: create, isPending, isError } = useCreateReport();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    create(
      { title, description },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
        onError: () => {
          
        }
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create report</h2>

      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>

      {isError && <p>Something went wrong</p>}
    </form>
  );
}
