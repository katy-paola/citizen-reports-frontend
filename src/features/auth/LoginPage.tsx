import { useNavigate } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginForm } from "./validations/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../shared/components/Button";
import { Form } from "../../shared/components/FormWrapper";
import { Input } from "../../shared/components/Input";

export const LoginPage = () => {
  const { mutate: login, isPending, error } = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
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
    <section className="main-layout">
      <a href="/reports">← Back to reports</a>
      <Form form={form}>
        <form className="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <Form.Field
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Email</Form.Label>
                <Form.Control>
                  <Input
                    {...field}
                    type="email"
                    placeholder="example@gmail.com"
                  />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Form.Field
            control={form.control}
            name="password"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Password</Form.Label>
                <Form.Control>
                  <Input {...field} type="password" placeholder="********" />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Button className="login-button" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
      {error && <p>{error.response.data.message}</p>}
    </section>
  );
};
