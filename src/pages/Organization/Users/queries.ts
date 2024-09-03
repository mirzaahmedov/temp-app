import type { HttpResponseType } from "@/definitions/http";
import type { UserType } from "@/definitions/user";
import { httpClient } from "@/utils/http";

export type GetUserProfileResponse = HttpResponseType<{
  user: UserType;
  users: UserType[];
}>;
export const getUserProfileQuery = async () => {
  const { data } = await httpClient.get<GetUserProfileResponse>("auth/get");
  return data;
};

export const createUserQuery = async (data: UserType) => {
  const response = await httpClient.post("auth/create", data);
  return response;
};

export const updateUserQuery = async (data: UserType) => {
  const response = await httpClient.put("auth/update", data);
  return response;
};
