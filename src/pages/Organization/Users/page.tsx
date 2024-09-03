import { useQuery } from "@tanstack/react-query";
import {
  type SortingState,
  type ColumnFilter,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { getUserProfileQuery } from "./queries";
import { useAuth } from "@/features/auth/hook";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./columns";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import UserDialog from "./dialog";
import { UserType } from "@/definitions/user";
import { Button } from "@/components/ui/button";

const OrganizationUsers = () => {
  const [userData, setUserData] = useState<UserType | undefined>();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter[]>([]);

  const { credentials } = useAuth();
  const { data: userProfile } = useQuery({
    queryKey: ["user/profile"],
    queryFn: getUserProfileQuery,
  });

  const table = useReactTable({
    data: userProfile?.data.users ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    state: {
      sorting,
      columnFilters,
    },
  });

  return credentials?.admin_status ? (
    <main>
      <div className="w-ful flex items-center gap-10 px-10 py-5 pb-0">
        <h2 className="text-2xl font-medium text-gray-700">Пользователи</h2>
        <div className="flex-1 flex items-center gap-2">
          <SearchIcon className="text-gray-400" />
          <Input
            placeholder="Поиск по логину"
            value={(table.getColumn("login")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("login")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <Button
          onClick={() => {
            setOpenCreateDialog(true);
          }}
        >
          Создать
        </Button>
      </div>
      <div className="p-10 pt-5">
        {Array.isArray(userProfile?.data.users) ? (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => {
                      console.log(row, row.original);
                      setUserData(row.original);
                      setOpenEditDialog(true);
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>
      <UserDialog open={openCreateDialog} onOpenChange={setOpenCreateDialog} />
      <UserDialog
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        defaultValues={userData}
      />
    </main>
  ) : (
    <main>
      <div className="flex justify-center items-center h-full">
        <h1 className="text-4xl">У вас нет прав доступа к этой странице</h1>
      </div>
    </main>
  );
};

export default OrganizationUsers;
