/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from 'cookies-next';
import { setBlogData } from "../reducers/blog-reducer";
import axios from 'axios';
import { useRouter } from "next/router";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
function CreateBlog() {
  const profileData = useSelector((state: any) => state.profile);
  const blogData = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: 'draft',
    profileId: profileData.profile.id
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }
  const handleChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };


        const responseNewPost = await axios.post('http://localhost:3000/blog', formData, config);
        dispatch(setBlogData([]));
        router.push('blog-editer')
      }

      // redirect to login page
    } catch (error) {
      console.log(error)

      return;
    }

  }

  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-5">Create a new post</h1>
        <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="on"
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2.5">
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  onChange={handleChangeDesc}
                  className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  defaultValue={''}
                />
              </div>
            </div>

          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}
export default CreateBlog;