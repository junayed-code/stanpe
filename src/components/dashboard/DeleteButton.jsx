"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";

const DeleteButton = ({ taskID, ...rest }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const toastID = toast.loading("Loading...");
      const res = await fetch(`/api/tasks/${taskID}`, {
        method: "DELETE",
      });
      if (res.status >= 400) {
        throw new Error((await res.json())?.message || "Something went wrong");
      }
      toast.dismiss(toastID);
      toast.success("Task successfully deleted.");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <button
      {...rest}
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 focus:outline-none"
    >
      <MdDeleteForever size={24} />
    </button>
  );
};

export default DeleteButton;
