/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from 'cookies-next';
import { NextPageContext } from 'next';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "../reducers/profile-reducer";

function Profile() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [profileid, setProfileid] = useState("");
  const [userid, setUserid] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const profileData = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();




  useEffect(() => {
    setFirstName(profileData.profile.first_name);
    setLastName(profileData.profile.last_name);
    setEmail(profileData.profile.email);
    setUser(profileData.user);
    setProfileid(profileData.profile.id);
    setUserid(profileData.id);
    setImageUrl(profileData.profile.avatar.data);
    console.log(imageUrl)

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormDataUser(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    // ...Enviar formulario
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

      }

      // redirect to login page
    } catch (error) {
      alert("Empty fields or username occupied");

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
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form onSubmit={handleSubmit} method="POST">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="space-y-6 bg-white px-4 py-5 sm:p-6">

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Photo</label>
                      <div className="mt-1 flex items-center">
                        <span className="inline-block h-50 w-50 overflow-hidden rounded-full bg-gray-100">
                          <img
                            src={imageUrl}
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

  // Verificar si la cookie existe
  const token = getCookie('token') ? true : false;

  if (!token) {
    // Si la cookie no existe, redirigir al usuario a la página de inicio de sesión
    if (res) {
      res.writeHead(302, { Location: '/' });
      res.end();
    } else {
      // Si se ejecuta en el lado del cliente, redirigir utilizando la API del navegador
      window.location.href = '/';
    }
  }

  // Si la cookie existe, continuar con la renderización de la página
  return { props: {} };
}


export default Profile;