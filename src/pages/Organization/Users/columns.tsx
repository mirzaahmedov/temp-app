import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { UserType } from "@/definitions/user";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<UserType>[] = [
  {
    header: "ID",
    accessorKey: "id",
  },
  {
    header: "Логин",
    accessorKey: "login",
  },
  {
    header: "Тип пользователя",
    accessorKey: "admin_status",
    cell: ({ cell }) => (
      <div>
        {cell.getValue() ? (
          <Badge variant="default">Администратор</Badge>
        ) : (
          <Badge variant="outline">Пользователь</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "createdat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full"
      >
        Дата создания <ArrowUpDown className="size-4 ml-2" />
      </Button>
    ),
    cell: ({ cell }) => {
      const date = cell.getValue();
      return (
        <div className="text-center">
          {typeof date === "string"
            ? new Date(date).toLocaleDateString()
            : String(date)}
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "updatedat",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="w-full"
      >
        Дата обновления <ArrowUpDown className="size-4 ml-2" />
      </Button>
    ),
    cell: ({ cell }) => {
      const date = cell.getValue();
      return (
        <div className="text-center">
          {typeof date === "string"
            ? new Date(date).toLocaleDateString()
            : String(date)}
        </div>
      );
    },
    enableSorting: true,
  },
];
