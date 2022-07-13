import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignupForm() {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8 my-auto mx-auto md:w-10/12 h-full">
      <div className="hidden md:block -mb-16 sm:-mb-48 lg:m-0 lg:relative">
        <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0"></div>
      </div>
      <div>
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-2xl">
            <div>
              <h1 className="text-3xl text-slate-100 font-semibold text-center">
                Super Pay{"\u00ae"}
              </h1>
              <h2 className="mt-6 text-3xl font-medium text-slate-100">
                Crear una cuenta nueva
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                O{" "}
                <Link href="/auth/signin">
                  <a className="font-medium text-violet-200 hover:text-violet-300">
                    ¡Iniciar sesión!
                  </a>
                </Link>
              </p>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <Formik
                  initialValues={initialValues}
                  onSubmit={(values, actions) => {
                    signIn("credentials", {
                      email: values.email,
                      password: values.password,
                      callbackUrl: "http://localhost:3000/",
                    });
                    //let response = loginUser(values);
                    //console.log(response);
                  }}
                >
                  <Form>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Correo Electrónico
                      </label>
                      <div className="mt-1">
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="user@example.com"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="email" component="span" />
                      </div>
                    </div>

                    <div className="space-y-1 mt-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Contraseña
                      </label>
                      <div className="mt-1">
                        <Field
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="password" component="span" />
                      </div>
                    </div>
                    <div className="space-y-1 mt-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Confirme la Contraseña
                      </label>
                      <div className="mt-1">
                        <Field
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          autoComplete=""
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                          name="confirm-password"
                          component="span"
                        />
                      </div>
                    </div>

                    <div className="relative flex items-start mt-4">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          aria-describedby="terms-description"
                          name="terms"
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms"
                          className="font-medium text-gray-100"
                        >
                          Acepto los Términos y Condiciones
                        </label>
                        <p id="comments-description" className="text-slate-300">
                          Lea y acepte las políticas de usuarios.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Continuar
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
