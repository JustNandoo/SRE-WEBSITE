import React, { useActionState } from "react";
import AuthButton from "../AuthButton";
import Link from "next/link";
import { signInCredentials } from "../../../../lib/actions";

const FormLogin = () => {
  const [state, formAction] = useActionState(signInCredentials, null);

  return (
    <div className="flex max-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form action={formAction} method="POST" className="space-y-6">
          {/* Alert Error */}
          {state?.message && (
            <div
              className="p-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {state.message}
            </div>
          )}

          {/* Input Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="srepens@pens.ac.id"
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {state?.error?.email && (
              <span className="text-red-500 text-sm mt-2">
                {state.error.email}
              </span>
            )}
          </div>

          {/* Input Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="password"
                className="block w-full rounded-md bg-white px-3 py-2.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {state?.error?.password && (
              <span className="text-red-500 text-sm mt-2">
                {state.error.password}
              </span>
            )}
          </div>

          {/* Tombol Sign In */}
          <div>
            <AuthButton label="Sign In" />
          </div>
        </form>

        {/* Link ke Register */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FormLogin;
