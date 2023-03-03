/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';



function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

function Register() {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        user: '',
        email: '',
        password: '',
    });

    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
      }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const password = (event.currentTarget.elements.namedItem(
            "password"
        ) as HTMLInputElement).value;
        const confirmPassword = (event.currentTarget.elements.namedItem(
            "confirm_password"
        ) as HTMLInputElement).value;

        if (password !== confirmPassword || password == "") {
            const passwordError = document.getElementById("password-error");
            if (passwordError) {
                passwordError.innerText = "Passwords do not match";
                setTimeout(() => {
                    passwordError.innerText ="";
                }, 5000);
              }
            return;
        }



        // ...Enviar formulario
        try {
            const response = await axios.post('http://localhost:3000/login', formData);
            
            // redirect to login page
        } catch (error) {
            alert("Empty fields or username occupied");
        
            return;
        }

        router.push('/login');
    }

    return (
        <React.Fragment>
            <div className="isolate bg-white py-24 px-6 sm:py-32 lg:px-8">
                <div className="flex items-center justify-center mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sign up</h2>
                    <img
                        className="block h-8 w-auto ml-5 translate-y-1"
                        src="/images/icon-blog.svg"
                        alt="Dynamic Blog"
                    />
                </div>
                <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    autoComplete="on"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    autoComplete="on"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">
                                User name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="user"
                                    id="user"
                                    autoComplete="on"
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="email"
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">

                                Repeat Password
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="password"
                                    name="confirm_password"
                                    id="confirm_password"
                                    autoComplete="confirm_password"
                                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                />
                                <span id="password-error" className="text-red-500 text-sm"></span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>

        </React.Fragment>
    )
}
export default Register;