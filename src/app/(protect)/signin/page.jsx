"use client";

import Field from "@/components/field";
import Button from "@/components/button";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useFormik } from "formik";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

export default function SignUp() {
  const { logInUser, logInWithGoogle } = useAuth();
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
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        const { email, password } = values;
        await logInUser(email, password);
        resetForm();
        router.replace("/dashboard");
        toast.success("You are successfully signed in.");
      } catch {
        setFieldError(
          "password",
          "Incorrect email or password! Please try again."
        );
      }
    },
  });

  const handleLoginWithGoogle = () => {
    logInWithGoogle().then(() => {
      router.replace("/dashboard");
      toast.success("You are successfully signed in.");
    });
  };

  return (
    <main>
      <div className="container min-h-screen grid place-items-center py-6">
        <div className="max-w-md w-full mx-auto bg-white p-8 rounded-md shadow-md">
          <h3 className="text-5xl font-semibold mb-7">Sign in account</h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
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
              btn="primary"
              disabled={isSubmitting}
              type="submit"
              className="text-xl mt-2"
            >
              Sign In
            </Button>
          </form>

          <p className="text-xl mt-3">
            New to Stanpe?{" "}
            <Link className="text-blue-400" href="/signup">
              Sign Up
            </Link>
          </p>

          <div className="flex items-center justify-between before:w-2/5 before:border-t-2 after:w-2/5 after:border-t-2 my-5 text-xl font-medium">
            OR
          </div>

          <Button
            onClick={handleLoginWithGoogle}
            disabled={isSubmitting}
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
