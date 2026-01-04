import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { useState } from "react";

export const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const login = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    login.mutate(
      {
        email: form.get("email") as string,
        password: form.get("password") as string,
      },
      {
        onSuccess: () => {
          navigate("/admin");
        },
        onError: (e) => {
          setErrorMessage(e.response.data.message);
        },
      }
    );
  };

  return (
    <section>
      <a href="/reports">Back to reports</a>
      <form onSubmit={handleSubmit}>
        <input name="email" />
        <input name="password" type="password" />
        <button disabled={login.isPending}>Login</button>
      </form>
      {errorMessage !== "" && <p>{errorMessage}</p>}
    </section>
  );
};
