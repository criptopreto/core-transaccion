import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import useUser from "../lib/useUser.js";
import fetchJson, { FetchError } from "../lib/fetchJson";
import Router from "next/router";
import useSocket from "../config/useSocket.js";
import { useEffect } from "react";

const initialValues = {
  username: "",
  password: "",
};

export default function Loginform() {
  const socket = useSocket();
  const [errorMsg, setErrorMsg] = useState("");
  const [enviando, setEnviando] = useState(null);
  const { mutateUser } = useUser({
    redirectIfFound: false,
  });

  useEffect(() => {
    if (socket) {
      socket.on("socket:session", (data) => {
        localStorage.setItem("session_id", data.session_id);
        socket.auth = { session_id: data.session_id };
        socket.emit("socket:join", {});
        Router.push("/home");
      });
      socket.on("connect", (data) => {
        console.log("Connections", socket);
      });
    }
  }, [socket]);

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
              <h2 className="mt-6 text-3xl font-medium text-slate-300">
                Inicia Sesión en tu cuenta
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                O{" "}
                <Link href="/auth/signup">
                  <a className="font-medium text-blue-300 hover:text-blue-400">
                    ¡Registrate ahora!
                  </a>
                </Link>
              </p>
            </div>
            <div className="mt-8">
              {errorMsg && (
                <p className="px-3 py-2 bg-gradient-to-br from-red-200 to-red-300 rounded text-center text-red-800">
                  Credenciales Inválidas
                </p>
              )}
            </div>
            <div className="mt-2">
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    setEnviando(true);
                    let user = await mutateUser(
                      await fetchJson("/api/auth/signin", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(values),
                      }),
                      false
                    );
                    if (user?.isLoggedIn) {
                      localStorage.setItem("socket", user.token);
                      socket.auth = { user_id: user.token };
                      socket.connect();
                    } else {
                      throw new Error("Credenciales inválidas");
                    }
                  } catch (error) {
                    setEnviando(false);
                    console.log(error.message);
                    if (error instanceof FetchError) {
                      resetForm({ values: { ...values, password: "" } });
                      setErrorMsg(error.data.message);
                    } else {
                      resetForm({ values: { ...values, password: "" } });
                      setErrorMsg("Error", error);
                    }
                  }
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-gray-300"
                      >
                        Correo Electrónico
                      </label>
                      <div className="mt-1">
                        <Field
                          id="username"
                          name="username"
                          type="email"
                          autoComplete="username"
                          placeholder="user@example.com"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage name="username" component="span" />
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

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center"></div>

                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-blue-200 hover:text-blue-300"
                        >
                          ¿Olvidaste tu contraseña?
                        </a>
                      </div>
                    </div>

                    <div className="mt-3">
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={enviando}
                      >
                        {enviando ? "Iniciando Sesion..." : "Iniciar Sesión"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
