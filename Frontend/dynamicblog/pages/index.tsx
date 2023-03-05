/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Home() {
  interface RootObject {
    id: number;
    title: string;
    date: string;
    description: string;
    image?: any;
    state: string;
    profileId: number;
    profile: Profile;
    documents: Document[];
  }

  interface Document {
    id: number;
    html: string;
    text: string;
    image?: any;
    blogId: number;
  }

  interface Profile {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: any;
  }

  const [blogs, setBlog] = useState<RootObject[]>([]);
  const blogData = useSelector((state: any) => state.blog);
  useEffect(() => {
    setBlog(blogData);
  }, [blogData])


  return (
    <React.Fragment>


      <div className="bg-white">

        <div className="relative px-1">
          <div className="mx-auto max-w-2xl pt-10">
            <div className="text-center">
              <img
                className="block mx-auto h-40 w-40"
                src="/images/icon-blog.svg"
                alt="Dynamic Blog"
              />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Dynamic blog creation system
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                This application was created to have an initial reference on how to configure the backend for a blogging system
                and integrate it with a frontend, in this case we use next.js for the frontend and nest.js for the backend.
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                This is just a base, you can review the code and implement it in your own projects and clearly improve it.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Github
                </a>

              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

      </div>






      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent posts</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {blogs.slice(-4).reverse().map((blog) => (
              <div key={blog.id} className="group relative">
                <div className="min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                  <img
                    src='#'
                    alt={blog.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex-1 justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 truncate font-bold">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {blog.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 truncate">{blog.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{blog.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Home;