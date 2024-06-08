/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import SectionStart from "../../Components/Shared/SectionStart";
import { Card } from "@material-tailwind/react";
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import useAuth from "../../Hooks/useAuth";
import { useMemo, useState } from "react";
import { Link, ScrollRestoration } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSkeleton from "../../Components/LoadingSkeleton";
import useAxiosCommon from "../../Hooks/useAxiosCommon"

const MyAddedPets = () => {
  const { user } = useAuth();
  const axiosCommon = useAxiosCommon();

  const {
    data: myAddedPets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myAddedPets", user?.email],
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
            to={`/dashboard/updatePet/${row.original._id}`}
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
        cell: ({ row }) => (
          <button
            onClick={() => handleDelete(row.original._id)}
            className="bg-[#FF407D] text-white p-2 rounded hover:bg-[#d15079]"
          >
            <RiDeleteBin6Fill size={20} />
          </button>
        ),
      },
      {
        header: "Adopted",
        accessorKey: "adoptedBtn",
        cell: ({ row }) => (
          <button
            disabled={row.original.adopted}
            onClick={() => handleAdopted(row.original._id)}
            className="bg-[#FF407D] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:bg-gray-400 text-white p-2 rounded hover:bg-[#d15079]"
          >
            {row.original.adopted ? "Adopted" : "Mark as Adopted"}
          </button>
        ),
      },
    ],
    []
  );

  //delete
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosCommon.delete(`/pet/${id}`);
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Deleted!",
        text: "Your Pet has been deleted.",
        icon: "success",
      });
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await mutateAsync(id);
      }
    });
  };

  //patch adopted to true
  const handleAdopted = (id) => {
    Swal.fire({
      title: "Is That Already Adopted?",
      text: "If Yes then Click Yes, Otherwise Don't!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, its Adopted!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosCommon.patch(`/pet/${id}`, {
            adopted: true,
          });
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: "Marked as Adopted.",
              icon: "success",
            });
            refetch();
          } else {
            toast.success("Marked As Adopted");
          }
        } catch (err) {
          toast.error(err.message);
        }
      }
    });
  };

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 10, // Set the initial page size to 4
      },
    },
  });

  if (isLoading) return <LoadingSkeleton type={'card'} />;
  return (
    <div className="my-10 flex flex-col justify-center">
      <ScrollRestoration />
      <SectionStart heading={`My Added Pets`} />
      <div data-aos="zoom-in-right" className="my-10">
        <Card className="h-full lg:w-[90%] mx-auto overflow-scroll xl:overflow-hidden">
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
          {myAddedPets.length > 10 && (
            <div className="flex">
              <button
                onClick={() => table.setPageIndex(0)}
                className="p-3 m-2 border border-gray-200 rounded bg-[#FF407D] text-white hover:bg-[#d15079]"
              >
                First Page
              </button>
              <button
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                className="p-3 m-2 disabled:bg-gray-400 border border-gray-200 rounded bg-[#FF407D] text-white hover:bg-[#d15079]"
              >
                Previous Page
              </button>
              <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
                className="p-3 m-2 disabled:bg-gray-400 border border-gray-200 rounded bg-[#FF407D] text-white hover:bg-[#d15079]"
              >
                Next Page
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount - 1)}
                className="p-3 m-2 border border-gray-200 rounded bg-[#FF407D] text-white hover:bg-[#d15079]"
              >
                Last Page
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default MyAddedPets;
