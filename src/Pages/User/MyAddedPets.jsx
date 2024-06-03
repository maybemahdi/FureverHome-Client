/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import SectionStart from "../../Components/Shared/SectionStart";
import { Card } from "@material-tailwind/react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useMemo, useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { Link } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

const MyAddedPets = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const { data: myAddedPets = [], isLoading } = useQuery({
    queryKey: ["myAddedPets"],
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosCommon.get(`/pets/${user.email}`);
        return data;
      }
      return [];
    },
    enabled: !!user?.email,
  });

  const data = useMemo(() => myAddedPets || [], [myAddedPets]);

  const columns = useMemo(
    () => [
      {
        header: "Serial Number",
        accessorKey: "_id",
        cell: (info) => (
          <p className="flex items-center justify-center -ml-16">
            {info.row.index + 1}
          </p>
        ),
      },
      {
        header: "Pet Name",
        accessorKey: "petName",
      },
      {
        header: "Pet Category",
        accessorKey: "petCategory",
      },
      {
        header: "Pet Image",
        accessorKey: "petImage",
        cell: ({ getValue }) => (
          <img className="rounded" src={getValue()} alt="pet" width="50" />
        ),
      },
      {
        header: "Adoption Status",
        accessorKey: "adopted",
        cell: ({ getValue }) => <p>{getValue() ? "Adopted" : "Not Adopted"}</p>,
      },
      {
        header: "Update",
        accessorKey: "update",
        cell: ({ row }) => (
          <Link
            to={`/updatePet/${row.original._id}`}
            title="Update"
            className="flex -ml-6 items-center justify-center "
          >
            <FiEdit3 color="black" size={20} />
          </Link>
        ),
      },
      {
        header: "Delete",
        accessorKey: "delete",
        cell: () => (
          <button className="bg-[#FF407D] text-white p-2 rounded hover:bg-[#d15079]">
            <RiDeleteBin6Fill size={20} />
          </button>
        ),
      },
      {
        header: "Adopted",
        accessorKey: "adoptedBtn",
        cell: () => (
          <button className="bg-[#FF407D] text-white p-2 rounded hover:bg-[#d15079]">
            Adopted
          </button>
        ),
      },
    ],
    []
  );

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="my-10 flex flex-col justify-center">
      <SectionStart heading={`My Added Pets`} />
      <div className="my-10">
        <Card className="h-full w-full overflow-scroll md:overflow-hidden">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      onClick={header.column.getToggleSortingHandler()}
                      key={header.id}
                      className="border-b cursor-pointer border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        { asc: "🔼", desc: "🔽" }[
                          header.column.getIsSorted() ?? null
                        ]
                      }
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="border-b border-blue-gray-50 p-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center p-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default MyAddedPets;
