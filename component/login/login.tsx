"use client";

import { Button, Image } from "@nextui-org/react";
import clsx from "clsx";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = useCallback((data) => {
    fetch("/api/login", { body: JSON.stringify(data), method: "POST" })
      .then((resp) => {
        if (resp.status < 200 || resp.status >= 400) {
          throw new Error("Bad response from server: " + resp.status);
        }
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => {
        alert(`Login failed. TODO: using toast to show error message. ${err}`);
      });
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Image className="w-64 h-24 mb-2" src="/logo.svg" alt="logo" />

        <div
          className={clsx(
            "w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700",
            {
              "opacity-50 pointer-events-none": isLoading,
            }
          )}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  You username
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="your username"
                  {...register("username")}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password")}
                />
              </div>
              <div className="flex items-center justify-between pointer-events-none opacity-50">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <Button
                color="primary"
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Sign in
              </Button>
              <div className="text-sm font-light text-gray-500 dark:text-gray-400 flex flex-row">
                Don’t have an account yet?
                <div
                  onClick={() => {
                    alert("This feature is not available yet");
                  }}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500 pl-1"
                >
                  Sign up
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
