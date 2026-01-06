import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginForm } from "./validations/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../shared/components/Button";

export const LoginPage = () => {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: LoginForm) => {
    login(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          navigate("/admin");
        },
      }
    );
  };

  return (
    <section>
      <a href="/reports">← Back to reports</a>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
        <input type="password" {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
        <Button disabled={isPending}>Login</Button>
      </form>
    </section>
  );
};
