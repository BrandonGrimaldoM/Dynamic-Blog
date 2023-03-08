/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from 'cookies-next';
import { setBlogData } from "../reducers/blog-reducer";
import axios from 'axios';
import { useRouter } from "next/router";
import { NextPageContext } from 'next';


function CreateBlog() {
  const profileData = useSelector((state: any) => state.profile);
  const blogData = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();
  const router = useRouter();
  const [fileName, setFileName] = useState("");

  const [formData, setFormData] = useState({

  });

  useEffect(() => {
    if (profileData.length !== 0) {
      setFormData({
        title: '',
        description: '',
        state: 'draft',
        profileId: profileData.profile.id,
        image: null,
      });
    }
  }, [profileData])



  function fileToBuffer(file: File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const buffer = Buffer.from(arrayBuffer);
        resolve(buffer);
      };
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      reader.readAsArrayBuffer(file);
    });
  }


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "images" && files !== null && event.target.files !== null) {
      const file = event.target.files[0];
      setFileName(file.name);
      fileToBuffer(file)
        .then((buffer) => {
          setFormData((prevState: any) => ({ ...prevState, image: buffer }));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {

      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  }
  const handleChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };

        const responseNewPost = await axios.post('http://localhost:3000/blog', formData, config);
        dispatch(setBlogData([]));
        router.push('blog-editer')
      }

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
          <label htmlFor="message" className="my-5 block text-sm font-semibold leading-6 text-gray-900">
            Cover image
          </label>
          <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">

            <div className="space-y-1 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="images" type="file" className="sr-only" onChange={handleChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
          <p className="text-green-500 font-bold truncate text-center">{fileName}</p>
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

export async function getServerSideProps(context: NextPageContext) {
  const { req, res } = context;
  const token = getCookie('token') ? true : false;

  if (!token) {

    if (res) {
      res.writeHead(302, { Location: '/' });
      res.end();
    } else {

      window.location.href = '/';
    }
  }

  return { props: {} };
}

export default CreateBlog;