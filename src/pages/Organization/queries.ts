import { HttpResponseType } from "@/definitions/http";
import { RequisiteType } from "@/definitions/requisite";
import { httpClient } from "@/utils/http";

export type GetDefaultRequisiteResponse = HttpResponseType<RequisiteType>;
export const getDefaultRequisiteQuery = async () => {
  const { data } = await httpClient.get<GetDefaultRequisiteResponse>(
    "auth/get/default/requisite"
  );
  return data;
};
