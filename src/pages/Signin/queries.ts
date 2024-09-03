import type { UserType } from "@/definitions/user";
import { httpClient } from "@/utils/http";
import { z } from "zod";

export const SigninPayloadSchema = z.object({
  login: z.string().min(1, "Обязательное поле"),
  password: z.string().min(1, "Обязательное поле"),
});

export type SigninPayloadType = z.infer<typeof SigninPayloadSchema>;
export type SigninResponseType = {
  data: {
    user: UserType;
    token: string;
  };
  success: boolean;
};

export const signinQuery = async (payload: SigninPayloadType) => {
  const { data } = await httpClient.post<SigninResponseType>(
    "/auth/login",
    payload
  );
  return data;
};
