/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { NextPageContext } from 'next';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "../reducers/profile-reducer";
import { setBlogData } from "../reducers/blog-reducer";
import { useRouter } from 'next/router';

function Profile() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [profileid, setProfileid] = useState("");
  const [userid, setUserid] = useState(0);
  const [fileName, setFileName] = useState("");

  const profileData = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    if (profileData.length !== 0) {
      setFirstName(profileData.profile.first_name);
      setLastName(profileData.profile.last_name);
      setEmail(profileData.profile.email);
      setUser(profileData.user);
      setProfileid(profileData.profile.id);
      setUserid(profileData.id);
    }

  }, [profileData])

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: null,
  });

  const [formDataUser, setFormDataUser] = useState({
    user: '',
    password: '',
  });

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
    let { name, value, files } = event.target;
    if (name === "avatar" && files !== null && event.target.files !== null) {
      const file = event.target.files[0];
      setFileName(file.name);
      fileToBuffer(file)
        .then((buffer) => {
          setFormData((prevState) => ({ ...prevState, [name]: buffer }));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
    console.log(formData);
  }

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataUser(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };
        const response = await axios.patch('http://localhost:3000/profile/' + profileid, formData, config);
        const responseUser = await axios.patch('http://localhost:3000/login/' + userid, formDataUser, config);
        setCookie('user', responseUser.data.user);
        const responseProfile = await axios.get('http://localhost:3000/profile/' + getCookie('user'), config);
        dispatch(setProfileData(responseProfile.data))
        setFileName("");
      }
    } catch (error) {
      console.log(error)
      return;
    }

  }

  async function handleSubmitDeleteUser(event: React.MouseEvent<HTMLButtonElement>, id: number) {
    event.preventDefault();
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };

        const responseNewDoc = await axios.delete("http://localhost:3000/login/" + id, config);
        dispatch(setProfileData([]))
        dispatch(setBlogData([]))
        deleteCookie('token')
        deleteCookie('user')
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      return;
    }

  }

  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Profile</h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what you share.
                </p>
                <button
                  type="button"
                  onClick={(even) => handleSubmitDeleteUser(even, userid)}
                  className="mt-5 block w-auto rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Delete profile
                </button>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit} method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-25 w-25 overflow-hidden rounded-full bg-gray-100 bg-cover">
                          <img
                            src={profileData.avatarImg ? profileData.avatarImg : "https://img.freepik.com/foto-gratis/muro-hormigon-blanco_53876-92803.jpg?w=1380&t=st=1678205278~exp=1678205878~hmac=001ba4c588856c41e36e5c9396556a021b49d881174e34534263b54a3deed10c"}
                            className="mx-auto h-full w-full text-gray-400"
                            alt="avatar"
                          />
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cover photo</label>
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
                              <input id="file-upload" name="avatar" type="file" className="sr-only" onChange={handleChange} />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                          <p className="text-green-500 font-bold truncate text-center">{fileName}</p>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="on"
                          defaultValue={firstName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          defaultValue={lastName}
                          onChange={handleChange}
                          autoComplete="on"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 ">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          defaultValue={email}
                          onChange={handleChange}
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 ">
                        <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                          User
                        </label>
                        <input
                          type="text"
                          name="user"
                          id="user  "
                          defaultValue={user}
                          onChange={handleChangeUser}
                          autoComplete="on"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 ">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="*****************"
                          onChange={handleChangeUser}
                          autoComplete="on"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>

                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
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

export default Profile;