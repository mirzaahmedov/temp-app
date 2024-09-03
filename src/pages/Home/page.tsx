import { useQuery } from "@tanstack/react-query";
import { getDefaultRequisiteQuery } from "./queries";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hook";
import Property from "@/components/property";

const Home = () => {
  const navigate = useNavigate();
  const { setCredentials, setIsAuthenticated } = useAuth();

  const { data: requisite } = useQuery({
    queryKey: ["default/requisite"],
    queryFn: getDefaultRequisiteQuery,
  });

  if (!requisite?.success) {
    return <div>Error something went wrong</div>;
  }

  const { data } = requisite;
  return (
    <main className="p-20 h-full grid place-items-center">
      <Card className="w-full p-5">
        <CardHeader>
          <CardTitle className="text-4xl">Банковские операции</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col flex-wrap xl:flex-row gap-10">
          <ul className="flex-1 flex flex-col md:grid grid-cols-6 gap-10 gap-y-5">
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
              onDoubleClick={() => {
                navigate("/org");
              }}
            />
          </ul>
          <div className="flex flex-col items-center">
            <div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="col-span-2">
                  Формирование мемораль-ордера
                </Button>
                <Button variant="outline">Приходные документы</Button>
                <Button variant="outline">Расходные документы</Button>
                <Button variant="outline" className="h-16">
                  Реестр
                </Button>
                <Button variant="outline" className="h-16">
                  Дублирование
                </Button>
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
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Home;
