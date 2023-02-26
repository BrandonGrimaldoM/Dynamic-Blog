/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function Login() {
  return (
    <React.Fragment>
      <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
        <div className="flex items-center justify-center mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Login</h2>
          <img
            className="block h-8 w-auto ml-5 translate-y-1"
            src="/images/icon-blog.svg"
            alt="Dynamic Blog"
          />
          
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                User name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="user"
                  id="user"
                  autoComplete="user"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="password"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="flex gap-x-4 sm:col-span-2">
              <p className="text-sm leading-6 text-gray-600">
                If you don't have an account you can register here{' '}
                <Link href="/register" className="font-semibold text-blue-600">
                  Sign up
                </Link>
                .
              </p>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

    </React.Fragment>
  )
}
export default Login;