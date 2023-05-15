import React, { useRef } from "react";
import { usePagination, useSortBy, useTable } from "react-table";
import { Column } from "react-table";
import Badge from "./Badge";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

interface UserType {
  id: string;
  name: string;
  status: boolean;
  email: string;
  last_login: string;
  role: string;
  img: string;
}

const DataTable = ({
  columns,
  data = [],
  handleEdit,
  handleDelete,
}: {
  columns: Column<{}>[];
  data: {}[];
  handleEdit: (user: UserType) => void;
  handleDelete: (id: string) => void;
}) => {
  const resData = React.useMemo(() => data, [data]);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const editModal = useRef<HTMLDialogElement>(null);
  const deleteModal = useRef<HTMLDialogElement>(null);

  const handleDeleteClick = (user: any) => {
    deleteModal?.current?.showModal();
    let form = deleteModal.current?.querySelector("form");
    form = form as typeof form & {
      Id: { value: string };
    };

    form.Id.value = user.id;
  };

  const handleEditClick = (user: any) => {
    editModal?.current?.showModal();
    let form = editModal.current?.querySelector("form");
    form = form as typeof form & {
      Email: { value: string };
      Name: { value: string };
      Role: { value: string };
      Status: { value: boolean };
      Id: { value: string };
    };

    form.Name.value = user.name;
    form.Email.value = user.email;
    form.Status.checked = user.status;
    form.Role.value = user.role;
    form.Id.value = user.id;
  };

  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PATCH",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
  }

  const editUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      Email: { value: string };
      Name: { value: string };
      Role: { value: string };
      Status: { value: boolean };
      Id: { value: string };
    };

    let user = {
      id: target?.Id.value,
      name: target?.Name.value,
      status: target?.Status.value,
      email: target?.Email.value,
      last_login: Date.now().toString(),
      role: target?.Role.value,
      img: "https://randomuser.me/api/portraits/men/20.jpg",
    };

    postData("https://techwondoe-assignment-server.onrender.com/data", user).then(
      (data) => {
        handleEdit(user);
        editModal?.current?.close();
      }
    );
  };

  return (
    <>
      <table className="w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="border-t" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return column.Header !== "disabled" ? (
                  <th
                    className="text-left p-3 text-gray-600"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <>&darr;</>
                        ) : (
                          <>&darr;</>
                        )
                      ) : (
                        <>&darr;</>
                      )}
                    </span>
                  </th>
                ) : (
                  <></>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className="border-t" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return cell.column.Header === "disabled" ? (
                    <></>
                  ) : (
                    <td
                      className="p-2 text-center self-center"
                      {...cell.getCellProps()}
                    >
                      {cell.column.Header === "Name" ? (
                        <div
                          key={cell.row.values.id}
                          className="flex gap-5 p-2"
                        >
                          <img
                            src={cell.row.values.img}
                            alt=""
                            className="my-auto w-12 h-12 rounded-full"
                          />
                          <div className="text-left">
                            <p className="text-lg font-medium">{cell.value}</p>
                            <p className="text-sm text-gray-400">
                              {cell.row.values.email}
                            </p>
                          </div>
                        </div>
                      ) : cell.column.Header === "Last Login" ? (
                        <div key={cell.row.values.id} className="text-left">
                          <p>
                            {new Date(parseInt(cell.value))
                              .toDateString()
                              .slice(4)}
                          </p>
                          <p className="text-gray-500 ">
                            {new Date(parseInt(cell.value))
                              .toLocaleTimeString()
                              .slice(0, -6)}{" "}
                            {new Date(parseInt(cell.value))
                              .toLocaleTimeString()
                              .slice(-2)}
                          </p>
                        </div>
                      ) : cell.column.Header === "Role" ? (
                        <p
                          key={cell.row.values.id}
                          className="text-gray-500 text-left"
                        >
                          {cell.value}
                        </p>
                      ) : cell.column.Header === "Status" ? (
                        cell.value ? (
                          <Badge key={cell.row.values.id}>
                            <RiCheckboxBlankCircleFill size={8} />
                            <p>Active</p>
                          </Badge>
                        ) : (
                          <Badge key={cell.row.values.id} isActive={false}>
                            <RiCheckboxBlankCircleFill size={8} />
                            <p>Inactive</p>
                          </Badge>
                        )
                      ) : (
                        <></>
                      )}
                    </td>
                  );
                })}

                <td className="p-2 text-center cursor-pointer">
                  <TrashIcon
                    onClick={() => handleDeleteClick(row?.original)}
                    className="w-5"
                  />
                </td>
                <td
                  className="p-2 text-center cursor-pointer"
                  onClick={() => handleEditClick(row?.original)}
                >
                  <PencilIcon className="w-5" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Modal func={editUser} modal={editModal} />
      <DeleteModal deleteModal={deleteModal} handleDelete={handleDelete} />
      <div className="pagination flex justify-between mt-3 border-t px-5 py-2">
        <button
          className="px-3 py-1 border rounded"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<- Previous"}
        </button>

        <div className="flex gap-3">
          {Array.from(Array(pageCount).keys()).map((curr) => (
            <button
              className={`${
                pageIndex === curr ? "bg-gray-300" : "bg-gray-100"
              } p-2 w-10 h-10 rounded`}
              onClick={() => gotoPage(curr)}
              key={curr}
              value={curr}
            >
              {curr + 1}
            </button>
          ))}
        </div>

        <button
          className="px-3 py-1 border rounded"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {"Next ->"}
        </button>
      </div>
    </>
  );
};

export default DataTable;
