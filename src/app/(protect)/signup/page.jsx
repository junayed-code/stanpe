"use client";

import Field from "@/components/field";
import Button from "@/components/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useFormik } from "formik";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/utils/schemas";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

export default function SignUp() {
  const { createNewUser, logInWithGoogle } = useAuth();
  const router = useRouter();

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      console.log({ values });
      try {
        const { name, email, password } = values;
        await createNewUser(name, email, password);
        resetForm();
        router.replace("/dashboard");
        toast.success("You are successfully signed up.");
      } catch (err) {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          setFieldError("email", "This email is already used.");
        }
      }
    },
  });

  const handleLoginWithGoogle = async () => {
    logInWithGoogle().then(() => {
      router.replace("/dashboard");
      toast.success("You are successfully signed in.");
    });
  };

  return (
    <main>
      <div className="container min-h-screen grid place-items-center py-6">
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-md shadow-md">
          <h3 className="text-5xl font-semibold mb-7">Create new account</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <Field
              value={values.name}
              error={touched.name && errors.name}
              onBlur={handleBlur}
              onChange={handleChange}
              id="name"
              placeholder="Enter your name"
            />
            <Field
              value={values.email}
              error={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="Enter your email"
            />
            <Field
              value={values.password}
              error={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              id="password"
              type="password"
              placeholder="Enter your password"
            />
            <Button
              disabled={isSubmitting}
              btn="primary"
              type="submit"
              className="text-xl mt-2"
            >
              Sign Up
            </Button>
          </form>

          <p className="text-xl mt-3">
            Already have an account?{" "}
            <Link className="text-blue-400" href="/signin">
              Sign In
            </Link>
          </p>

          <div className="flex items-center justify-between before:w-2/5 before:border-t-2 after:w-2/5 after:border-t-2 my-5 text-xl font-medium">
            OR
          </div>

          <Button
            disabled={isSubmitting}
            onClick={handleLoginWithGoogle}
            btn="secondary"
            className="text-xl w-full"
          >
            <FaGoogle />
            <span>Google Sign In</span>
          </Button>
        </div>
      </div>
    </main>
  );
}
