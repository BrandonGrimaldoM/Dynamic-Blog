/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Fragment } from 'react'
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
  XMarkIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  UserCircleIcon
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react';
import { useSelector, useDispatch} from "react-redux";
import { setCurrenlyBlogData } from "../reducers/currenly-blog-reducer";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function BlogEditer() {
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
  const [profileid, setProfileid] = useState(0);
  const [profileFirstname, setProfileFirstname] = useState("");
  const [profileLastName, setProfileLastName] = useState("");
  const blogData = useSelector((state: any) => state.blog);
  const profileData = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    setBlog(blogData);
    if(profileData.length !== 0){

      setProfileid(profileData.profile.id);
      setProfileFirstname(profileData.profile.first_name);
      setProfileLastName(profileData.profile.last_name);
    }
  }, [blogData, profileData])

  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-5">Blog Editor</h1>

        {blogs.filter((blog) => blog.profile.id === profileid)
          .map((blog) => (
            <div key={blog.id} className="mt-5 lg:flex lg:items-center lg:justify-between rounded border border-neutral-400 border-dotted p-2">
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {blog.title}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <UserCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {profileFirstname + " " + profileLastName}
                  </div>
                </div>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">

                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    Created on {blog.date}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex lg:mt-0 lg:ml-4">
                <span className="hidden sm:block">
                  <Link href='/edit-blog' onClick={() => dispatch(setCurrenlyBlogData(blog.id))}>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Edit
                    </button>
                  </Link>
                </span>

                <span className="ml-3 hidden sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                    View
                  </button>
                </span>

                <span className="sm:ml-3">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                    Publish
                  </button>
                </span>

                <span className="sm:ml-3 max-sm:hidden">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    <XMarkIcon className="-ml-0.5 mr-0.2 h-5 w-5" aria-hidden="true" />

                  </button>
                </span>

                {/* Dropdown */}
                <Menu as="div" className="relative ml-3 sm:hidden">
                  <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                    More
                    <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Edit
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            View
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Delete
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          ))}


        <Link href='/create-blog'>
          <button
            type="button"
            className="mt-5 inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Create
          </button>
        </Link>

      </div>
    </React.Fragment>
  )
}
export default BlogEditer;