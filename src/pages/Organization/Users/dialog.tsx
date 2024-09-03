import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UserType } from "@/definitions/user";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type UserDialogProps = {
  defaultValues?: UserType;
  open: boolean;
  onOpenChange: (arg: boolean) => void;
};
const UserDialog = (props: UserDialogProps) => {
  const { defaultValues, open, onOpenChange } = props;

  const form = useForm({
    defaultValues: defaultValues ?? {
      id: "",
      login: "",
      password: "",
      admin_status: false,
      user_id: 0,
      createdat: "",
      updatedat: "",
    },
  });

  const onSubmit = useCallback((data: UserType) => {
    console.log(data);
  }, []);

  useEffect(() => {
    for (const key in defaultValues) {
      form.setValue(
        key as keyof UserType,
        defaultValues[key as keyof UserType]
      );
    }
  }, [form, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues
              ? "Информация о пользователя"
              : "Создать пользователя"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              name="login"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Логин</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!defaultValues && (
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              name="admin_status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип пользователя</FormLabel>
                  <FormControl className="flex gap-1 items-center">
                    <Switch {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit">
                {defaultValues ? "Сохранить" : "Создать"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserDialog;
