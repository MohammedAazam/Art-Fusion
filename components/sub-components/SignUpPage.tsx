"use client";
import React, { useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const initialValues = {
  role: "",
  userId: "",
  dob: "",
  age: "",
  as: "",
  name: "",
  password: "",
};

const schema = Yup.object().shape({
  userId: Yup.string().required("required field !"),
  password: Yup.string().required("required field !").min(8),
  dob: Yup.date().when("role", {
    is: (value: string) => value == "ARTIST",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  age: Yup.number().when("role", {
    is: "ARTIST",
    then: (schema) => schema.required().max(100),
    otherwise: (schema) => schema.optional(),
  }),
  as: Yup.string().when("role", {
    is: "ARTIST",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema,
  }),
  role: Yup.string().required(),
  name: Yup.string().required().min(2),
});

export default function SignUpPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1">
        <img
          className="w-full h-full object-cover" /* https://images.unsplash.com/photo-1611425143678-08fc480cafde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDM4fHxjYW1lcmElMjBjcmV3fGVufDB8fHx8MTY4NjE0NzQxOHww&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450 */
          src="https://images.unsplash.com/photo-1496559249665-c7e2874707ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDF8fG1hbiUyMHJlY29yZGluZyUyMHdpdGglMjBjYW1lcmF8ZW58MHx8fHwxNjg2MTQ3ODYyfDA&ixlib=rb-4.0.3&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450"
          alt=""
        />
      </div>

      <div className="bg-white flex flex-col justify-center flex-1 w-full h-[100vh] overflow-y-scroll">
        <div className=" w-full h-screen bg-white p-8 px-8">
          <div className="px-28 flex flex-col">
            {error && (
              <div className="px-3 text-center animate-fade-in py-2 bg-red-300 text-red-700 text-md rounded-md">
                <span>Something went wrong !</span>
              </div>
            )}
          </div>
          <h1 className=" text-3xl  text-primary font-bold text-center">
            {/* <pre>{JSON.stringify(session)}</pre> */}
            Art Fusion
          </h1>
          <h2 className="text-3xl py-3 text-slate-800 font-semibold text-center">
            Create Account
          </h2>
          <Formik
            validationSchema={schema}
            initialValues={initialValues}
            onSubmit={(values) => {
              signIn("credentials", {
                userId: values.userId,
                password: values.password,
                role: values.role,
                dob: values.dob,
                as: values.as,
                age: values.age,
                name: values.name,
                redirect: false,
                for: "sign-up",
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
                  {/* <pre>{JSON.stringify(values.role)}</pre> */}
                  <div className="px-28 flex flex-col items-center gap-3 pt-4">
                    <Label className="text-lg">You want to continue as ?</Label>
                    <RadioGroup
                      name="role"
                      {...props}
                      onValueChange={(value) =>
                        props.setFieldValue("role", value)
                      }
                      className="flex gap-8"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ARTIST" />
                        <Label
                          className="text-md font-bold text-primary"
                          htmlFor="ARTIST"
                        >
                          Talent/Technician
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="PROD_OWNER" />
                        <Label
                          className="text-md font-bold text-primary"
                          htmlFor="PROD_OWNER"
                        >
                          Production House
                        </Label>
                      </div>
                    </RadioGroup>
                    {touched.role && errors.role && (
                      <span className="text-sm text-red-500 p-1">
                        {errors.role}
                      </span>
                    )}
                  </div>

                  {values.role && (
                    <>
                      <div className="px-28 pt-4 flex gap-3 justify-between">
                        <div className="block space-y-1">
                          <Label>Full Name</Label>
                          <Field {...props} as={Input} name={"name"} />
                          {touched.name && errors.name && (
                            <span className="text-sm text-red-500 p-1">
                              {errors.name}
                            </span>
                          )}
                        </div>
                        <div className="block space-y-1">
                          <Label>Email</Label>
                          <Field {...props} as={Input} name={"userId"} />
                          {touched.userId && errors.userId && (
                            <span className="text-sm text-red-500 p-1">
                              {errors.userId}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="px-28 pt-4 block space-y-1">
                        <Label>Password</Label>
                        <Field
                          {...props}
                          as={Input}
                          type={"password"}
                          name={"password"}
                        />
                        {touched.password && errors.password && (
                          <span className="text-sm text-red-500 p-1">
                            {errors.password}
                          </span>
                        )}
                      </div>

                      {values.role == "ARTIST" && (
                        <>
                          <div className="px-28 pt-4 block space-y-1">
                            <Label>Profession</Label>
                            <Field {...props} as={Input} name={"as"} />
                            {touched.as && errors.as && (
                              <span className="text-sm text-red-500 p-1">
                                {errors.as}
                              </span>
                            )}
                          </div>
                          <div className="px-28 pt-4 block space-y-1">
                            <Label>D.O.B</Label>
                            <Field
                              {...props}
                              as={Input}
                              type={"date"}
                              name={"dob"}
                            />
                            {touched.dob && errors.dob && (
                              <span className="text-sm text-red-500 p-1">
                                {errors.dob}
                              </span>
                            )}
                          </div>

                          <div className="px-28 pt-4 block space-y-1">
                            <Label>Age</Label>
                            <Field {...props} as={Input} name={"age"} />
                            {touched.age && errors.age && (
                              <span className="text-sm text-red-500 p-1">
                                {errors.age}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}

                  <div className="px-28 flex py-2 ">
                    <button
                      onClick={() => handleSubmit()}
                      className="w-full py-2 bg-blue-700 shadow-lg shadow-blue-700 hover:shadow-gray-500 hover:border-2 border-gray-700   hover:bg-gray-50  hover:text-blue-700 text-white font-semibold rounded-lg"
                    >
                      Create
                    </button>
                  </div>
                </>
              );
            }}
          </Formik>
          <h3 className="text-sm pb-10  mt-10 dark:text-black font-semibold text-center">
            <Link href="/sign-in" className="underline">
              Already have an account?
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
