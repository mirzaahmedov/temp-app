import Property from "@/components/property";
import { getDefaultRequisiteQuery } from "./queries";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hook";
import { useNavigate } from "react-router-dom";

const Organization = () => {
  const navigate = useNavigate();
  const { credentials, setCredentials, setIsAuthenticated } = useAuth();
  const { data: requisite } = useQuery({
    queryKey: ["default/requisite"],
    queryFn: getDefaultRequisiteQuery,
  });

  if (!requisite?.success) {
    return <div>Error something went wrong</div>;
  }

  const { data } = requisite;
  return (
    <main className="mx-auto max-w-4xl">
      <div className="p-20">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl">Организация</h1>
          <div className="flex gap-4">
            {credentials?.admin_status && (
              <Button
                onClick={() => {
                  navigate("users");
                }}
              >
                Пользователи
              </Button>
            )}

            <Button
              className="col-span-2 text-destructive"
              variant="secondary"
              onClick={() => {
                setIsAuthenticated(false);
                setCredentials(null);
              }}
            >
              Выход
            </Button>
          </div>
        </div>
        <div>
          <ul className="mt-5 flex flex-col gap-4 ">
            <Property
              className="col-span-3"
              name="org_name"
              label="Наименования организации"
              value={data.user?.name}
            />
            <Property
              className="col-span-2"
              name="account_number"
              label="Расчетный счет"
              value={data.account_number?.account_number}
            />
            <Property name="mfo" label="МФО" value={data.bank?.mfo} />
            <Property
              className="col-span-3"
              name="bank_name"
              label="Название банка"
              value={data.bank?.name}
            />
            <Property
              name="shot_number"
              label="Счет"
              value={data.shot?.shot_number}
            />
            <Property
              className="col-span-2"
              name="shot_balance"
              label="Начальное сальдо"
              value={data.shot?.shot_balance}
            />
            <Property
              className="col-span-6"
              name="inn"
              label="Идентификационный номер"
              value={data.user?.inn}
            />
            <Property
              className="col-span-6"
              name="budget"
              label="Бюджет"
              value={data.user?.budget}
            />
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Organization;
