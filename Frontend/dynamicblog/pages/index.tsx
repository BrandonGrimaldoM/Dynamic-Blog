/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


function Home() {
  interface RootObject {
    id: number;
    title: string;
    date: string;
    description: string;
    image?: any;
    url?:any;
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
                  href="https://github.com/BrandonGrimaldoM/Dynamic-Blog"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  target="_blank"
     
                >
                  Github
                </a>

              </div>
            </div>
          </div>
         
        </div>

      </div>


      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent posts</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {blogs.filter((view)=> view.state === "published").slice(-4).reverse().map((blog) => (
              <div key={blog.id} className="group relative">
                <div className="min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                  <img
                    src={blog.url}
                    alt={blog.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex-1 justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 truncate font-bold">
                      <Link href={"/blog/"+blog.title}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {blog.title}
                      </Link>
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