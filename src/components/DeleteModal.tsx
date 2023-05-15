import React from "react";

const DeleteModal: React.FC<{
  deleteModal: React.RefObject<HTMLDialogElement>;
  handleDelete: (id: string) => void;
}> = ({ deleteModal, handleDelete }) => {
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "DELETE",
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

  const deleteUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      Id: { value: string };
    };

    postData("https://techwondoe-assignment-server.onrender.com/data", {
      id: target?.Id.value,
    }).then((data) => {
      handleDelete(target?.Id.value);
      deleteModal?.current?.close();
    });
  };

  return (
    <dialog ref={deleteModal} className="rounded-xl p-6">
      <form onSubmit={deleteUser} className="grid place-content-center gap-4">
        <input id="Id" name="Id" type="text" className="hidden" />
        <h1 className="font-medium">Are you sure?</h1>
        <p>Do you really want to delete this user? </p>
        <div className="w-full flex justify-around">
          <button
            className="bg-red-600 rounded text-white p-2 px-4 col-span-2"
            type="submit"
          >
            Delete
          </button>
          <div
            className="cursor-pointer bg-gray-300 rounded text-black p-2 px-4 col-span-2 "
            onClick={() => deleteModal?.current?.close()}
          >
            Cancel
          </div>
        </div>
      </form>
    </dialog>
  );
};

export default DeleteModal;
