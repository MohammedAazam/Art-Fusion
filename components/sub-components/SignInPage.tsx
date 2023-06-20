"use client";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const initialValues = {
  userId: "",
  password: "",
};

const schema = Yup.object().shape({
  userId: Yup.string().required("required field !"),
  password: Yup.string().required("required field !"),
});

export default function SignInPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="flex h-full w-full">
      <div className="w-1/2">
        <img
          className="w-full h-full object-cover" /* https://images.unsplash.com/photo-1611425143678-08fc480cafde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDM4fHxjYW1lcmElMjBjcmV3fGVufDB8fHx8MTY4NjE0NzQxOHww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450 */
          src="https://images.unsplash.com/photo-1496559249665-c7e2874707ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDF8fG1hbiUyMHJlY29yZGluZyUyMHdpdGglMjBjYW1lcmF8ZW58MHx8fHwxNjg2MTQ3ODYyfDA&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450"
          alt=""
        />
      </div>

      <div className="bg-white flex flex-col justify-center flex-1">
        <div className=" w-full h-screen bg-white p-8 px-8">
          <div className="px-28 flex flex-col">
            {error && (
              <div className="px-3 text-center animate-fade-in py-2 bg-red-300 text-red-700 text-md rounded-md">
                <span>Credentials are invalid !</span>
              </div>
            )}
          </div>
          <h1 className=" text-3xl mt-7  dark:text-black font-bold text-center">
            {/* <pre>{JSON.stringify(session)}</pre> */}
            Art Fusion
          </h1>
          <h2 className="text-xl  mt-7 dark:text-black font-semibold text-center">
            Log In
          </h2>
          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={(values) => {
              signIn("credentials", {
                userId: values.userId,
                password: values.password,
                redirect: false,
                for:"sign-in"
              }).then((value) => {
                if (value?.error) setError(value.error);
                else {
                  router.refresh();
                }
              });
            }}
          >
            {({ values, touched, errors, handleSubmit, ...props }) => {
              return (
                <>
                  <div className="text-sm p-28 flex flex-col text-black py-6">
                    <label>Email or Phone no.</label>
                    <Field
                      {...props}
                      name={"userId"}
                      className={"p-2 rounded-lg w-full bg-gray-300 mt-1"}
                    />
                    {touched.userId && errors.userId && (
                      <span className="text-sm text-red-500 p-1">
                        {errors.userId}
                      </span>
                    )}
                  </div>
                  <div className="text-sm  p-28 flex flex-col text-black py-0">
                    <label>Password</label>
                    <Field
                      {...props}
                      name={"password"}
                      className=" p-2 rounded-lg bg-gray-300 mt-1"
                      type="password"
                      placeholder="password"
                    />
                    {touched.password && errors.password && (
                      <span className="text-sm text-red-500 p-1">
                        {errors.password}
                      </span>
                    )}
                  </div>
                  <div className="text-sm  p-28 flex flex-row text-black py-2 justify-end">
                    <p>Forgot Password</p>
                  </div>
                  <div className="px-28 flex py-2 ">
                    <button
                      onClick={() => handleSubmit()}
                      className="w-full py-2 bg-blue-700 shadow-lg shadow-blue-700 hover:shadow-gray-500 hover:border-2 border-gray-700   hover:bg-gray-50  hover:text-blue-700 text-white font-semibold rounded-lg"
                    >
                      Log in
                    </button>
                  </div>
                </>
              );
            }}
          </Formik>

          <div className="px-28 flex py-2">
            {/**<button
              onClick={() => signIn("google")}
              className="p-24 py-2 w-full flex items-center mb-4 bg-white shadow-lg hover:shadow-gray-500 border-2 border-gray-700 text-blue-600 font-bold rounded-lg"
            >
              <FcGoogle className=" mr-2 text-xl" />
              <span className="flex items-center">Sign in with google</span>
            </button>*/}
          </div>
          <h3 className="text-sm  mt-10 dark:text-black font-semibold text-center">
            <Link href="/join" className="underline">
              {"don't have an account?"}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
