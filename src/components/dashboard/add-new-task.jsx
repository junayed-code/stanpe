"use client";

import Button from "@/components/button";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";
import { useFormik } from "formik";
import { taskSchema } from "@/utils/schemas";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const initialValues = {
  title: "",
  description: "",
};

const Form = () => {
  const { currentUser } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  // prettier-ignore
  const { values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues,
      validationSchema: taskSchema,
      onSubmit: async (values, { resetForm }) => {
        const toastID = toast.loading("Please wait...", {
          duration: Infinity,
        });

        try {
          const data = { ...values, email: currentUser.email}
          const res = await fetch("/api/tasks", {
            method: "POST",
            body: JSON.stringify(data),
          });
          await queryClient.invalidateQueries("tasks");
          if (res.status >= 400) {
            throw new Error((await res.json())?.message || "Something went wrong");
          }
          toast.dismiss(toastID);
          toast.success("Todo successfully added.");
          resetForm();
        } catch (error) {
          toast.dismiss(toastID);
          toast.error(error.message);
        }
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 text-slate-700 mt-8 text-left"
    >
      <label htmlFor="title">
        <input
          id="title"
          name="title"
          value={values.title}
          onBlur={handleBlur}
          onChange={handleChange}
          className="focus:outline-none text-2xl font-bold px-4 py-3 bg-white rounded-md w-full"
          placeholder="Title"
          type="text"
        />
        <p className="text-rose-500 pl-1">{touched.title && errors.title}</p>
      </label>
      <label htmlFor="title">
        <textarea
          id="description"
          name="description"
          value={values.description}
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Taks description"
          className="w-full focus:outline-none text-xl font-medium px-4 py-2 bg-white rounded-md resize-none h-28"
        ></textarea>
        <p className="text-rose-500 pl-1">
          {touched.description && errors.description}
        </p>
      </label>
      {/* Form submit button */}
      <Button
        btn="secondary"
        type="submit"
        disabled={isSubmitting}
        className="text-xl self-end w-28 mt-2"
      >
        Add
      </Button>
    </form>
  );
};

const Modal = ({ onToggleModal }) => (
  <motion.div
    onClick={onToggleModal}
    className="bg-black/40 fixed inset-0 grid place-items-center cursor-pointer"
  >
    <motion.div
      onClick={e => e.stopPropagation()}
      layoutId="modal-pop"
      initial={{ borderRadius: 16 }}
      className="max-w-xl w-full max-h-[calc(100vh-10rem)] bg-indigo-100 cursor-default p-5 relative"
    >
      {/* Modal close button */}
      <button className="absolute top-3 right-3" onClick={onToggleModal}>
        <IoClose className="text-2xl text-slate-700" />
      </button>

      {/* Add new task form */}
      <Form />
    </motion.div>
  </motion.div>
);

const AddNewTask = () => {
  const [isOpenModal, setOpenModal] = useState(false);

  const handleToggleModal = () => setOpenModal(prev => !prev);

  return (
    <section className="text-right">
      <Button
        btn="primary"
        onClick={handleToggleModal}
        className="text-xl relative"
      >
        Add Task
        <motion.span
          layoutId="modal-pop"
          className="absolute inset-0 rounded-full pointer-events-none"
        ></motion.span>
      </Button>

      {/* Task input modal */}
      {isOpenModal && <Modal onToggleModal={handleToggleModal} />}
    </section>
  );
};

export default AddNewTask;
