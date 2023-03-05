/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter } from "next/router";

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

import Link from 'next/link';
import { getCookie, deleteCookie } from 'cookies-next';
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from '@/reducers/profile-reducer';
import { setBlogData } from '@/reducers/blog-reducer';
import axios from 'axios';

interface Props {
  children?: ReactNode;
}


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [homeState, setHomeState] = useState(false);
  const [blogState, setBlogState] = useState(false);
  const [contactState, setContactState] = useState(false);
  const [loginToken, setLoginToken] = useState(false);
  const profileData = useSelector((state: any) => state.profile);
  const blogData = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();


  const loginVerification = async () => {
    try {
      const token = getCookie('token');
      const user = getCookie('user');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const responseProfile = await axios.get('http://localhost:3000/profile/' + user, config);
      dispatch(setProfileData(responseProfile.data))
    } catch (error) {
      console.log(error);
    }
  }

  const blogVerification = async () => {
    const responseBlog = await axios.get('http://localhost:3000/blog');
    dispatch(setBlogData(responseBlog.data));
  }

  useEffect(() => {
    if (getCookie('token')) {
      console.log(getCookie('token'))
      setLoginToken(true);
      if (profileData.length === 0) {
        loginVerification();
      }
    } else {
      setLoginToken(false);
    }
  }, [profileData])


  useEffect(() => {
    if (blogData.length === 0) {
      blogVerification();
    }
  }, [blogData])


  useEffect(() => {
    if (router.pathname === "/") {
      setHomeState(true);
      setBlogState(false);
      setContactState(false);
    } else if (router.pathname === "/blog") {
      setBlogState(true);
      setHomeState(false);
      setContactState(false);
    } else if (router.pathname === "/contact") {
      setContactState(true);
      setHomeState(false);
      setBlogState(false);
    } else {
      setContactState(false);
      setHomeState(false);
      setBlogState(false);
    }
  }, [router.pathname]);


  const navigation = [
    { name: 'Home', href: '/', current: homeState },
    { name: 'Blog', href: '/blog', current: blogState },
    { name: 'Contact', href: '/contact', current: contactState },
  ]



  return (
    <React.Fragment>
      <Disclosure as="nav" className="bg-blue-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="/images/icon-blog.svg"
                      alt="Dynamic Blog"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="/images/icon-blog.svg"
                      alt="Dynamic Blog"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  {loginToken ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-blue-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR23EZUFSx997R8J4UMU0cXDfDlQ0CicAGESQVIJANw&s"
                            alt="User"
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/blog-editer"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                Your blogs
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/login"
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                onClick={() => { deleteCookie('token'), deleteCookie('user'), dispatch(setProfileData([])) }}
                              >
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>) : (
                    <div className="lg:flex lg:flex-1 lg:justify-end ">
                      <Link href="/login" className="text-sm leading-6 text-white font-bold">
                        Log in <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        {children}
      </main>

      <footer className='w-full h-8 bg-blue-800 '>
        <p className='text-center font-bold leading-8 text-white'>Dynamic Blog</p>
      </footer>
    </React.Fragment>
  )
}
export default Layout;