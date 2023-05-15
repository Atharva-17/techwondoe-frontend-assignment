import React, { useRef } from "react";

interface UserType {
  id: string;
  name: string;
  status: boolean;
  email: string;
  last_login: string;
  role: string;
  img: string;
}

const Modal: React.FC<{
  func: (e: React.SyntheticEvent) => void;
  modal: React.RefObject<HTMLDialogElement>;
}> = ({ func, modal }) => {
  return (
    <dialog ref={modal} className="rounded-xl">
      <p
        onClick={() => modal?.current?.close()}
        className="float-right m-1 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </p>
      <form onSubmit={func} className="grid gap-6 mb-3 md:grid-cols-1 mt-8">
        <input id="Id" name="Id" type="text" className="hidden" />
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="Name"
        >
          Name
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1"
          id="Name"
          name="Name"
          type="text"
        />
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="Email"
        >
          Email
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1"
          id="Email"
          name="Email"
          type="email"
        />
        <label
          className="inline mb-2 text-sm font-medium text-gray-900"
          htmlFor="Status"
        >
          Status
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg inline p-1"
          id="Status"
          name="Status"
          type="checkbox"
        />
        <label
          className="block mb-2 text-sm font-medium text-gray-900"
          htmlFor="Role"
        >
          Role
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1"
          id="Role"
          name="Role"
          type="text"
        />
        <button
          type="submit"
          className="bg-blue-600 rounded text-white p-2 col-span-2"
        >
          Submit
        </button>
      </form>
    </dialog>
  );
};

export default Modal;
