import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  SigninPayloadSchema,
  signinQuery,
  type SigninPayloadType,
} from "./queries";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/features/auth/hook";
import { useNavigate } from "react-router-dom";
import { setSession } from "@/features/auth/session";

const Signin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCredentials, setIsAuthenticated } = useAuth();

  const { mutate: signin, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: signinQuery,
    onSuccess({ success, data }) {
      if (!success) {
        throw new Error();
      }
      setCredentials(data.user);
      setIsAuthenticated(true);
      setSession(data.token);
      setTimeout(() => {
        navigate("/");
      });
      toast({
        title: "You have signed in",
      });
    },
    onError() {
      toast({
        title: "Something went wrong",
        description: "Please try again later",
        variant: "destructive",
      });
    },
  });

  const form = useForm<SigninPayloadType>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: zodResolver(SigninPayloadSchema),
  });

  const onSubmit = useCallback(
    (payload: SigninPayloadType) => {
      signin(payload);
    },
    [signin]
  );

  return (
    <main className="grid place-items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full max-w-md"
        >
          <h1 className="text-4xl">Войти в аккаунт</h1>
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Логин</FormLabel>
                <FormControl>
                  <Input {...field} name="login" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input {...field} type="password" name="current-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            Войти
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Signin;
