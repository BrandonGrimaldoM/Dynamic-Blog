/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from 'cookies-next';
import { setBlogData } from "../reducers/blog-reducer";
import axios from 'axios';


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

function EditBlog() {

  const profileData = useSelector((state: any) => state.profile);
  const blogData = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();
  const currenlyBlog = useSelector((state: any) => state.currenly)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [edited, setEdited] = useState(false);
  const [newText, setNewText] = useState(false);
  const [newDesc, setNewDesc] = useState(false);



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
  const [documents, setDocument] = useState<RootObject[]>([]);



  const handleEdit = () => {
    setEdited(true);
    setTimeout(() => {
      setEdited(false);
    }, 5000);
  }

  useEffect(() => {
    setBlog(blogData);
    setTitle(blogs.filter((item) => item.id === currenlyBlog).map((blog) => blog.title).toString());
    setDescription(blogs.filter((item) => item.id === currenlyBlog).map((blog) => blog.description).toString())
    setDocument(blogs.filter((item) => item.id === currenlyBlog).map((blog) => blog));

    setFormData(prevState => ({ title: title, description: description }));

  }, [blogs, blogData])


  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [formTitle, setFormTitle] = useState({
    html: 'h2',
    text: '',
    blogId: currenlyBlog,
  });

  const [formText, setFormText] = useState({
    html: 'p',
    text: '',
    blogId: currenlyBlog,
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }
  const handleChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormTitle(prevFormTitle => ({ ...prevFormTitle, [name]: value }));
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormText(prevFormText => ({ ...prevFormText, [name]: value }));
  }


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };


        const responseNewPost = await axios.patch(`http://localhost:3000/blog/${currenlyBlog}`, formData, config);
        dispatch(setBlogData([]));

      }

      // redirect to login page
    } catch (error) {
      console.log(error)

      return;
    }

  }

  async function handleSubmitText(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };
        const responseNewDoc = await axios.post("http://localhost:3000/blog/docs", formTitle, config);

        dispatch(setBlogData([]));
      }
      setNewText(!newText);
    } catch (error) {
      console.log(error)
      return;
    }

  }

  async function handleSubmitP(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };
        const responseNewDoc = await axios.post("http://localhost:3000/blog/docs", formText, config);

        dispatch(setBlogData([]));
      }
      setNewDesc(!newDesc)
    } catch (error) {
      console.log(error)
      return;
    }

  }

  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-5">Edit post</h1>

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
                  defaultValue={title}
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
                  defaultValue={description}
                />
              </div>
            </div>

          </div>
          <div className="mt-10">
            {
              edited ?
                <button
                  type="submit"
                  className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edited
                </button> :
                <button onClick={handleEdit}
                  type="submit"
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit basic info
                </button>
            }
          </div>
        </form>
        <div className="border-b border-black">

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-5 mt-5 pt-5">Edit document</h2>
        </div>

        {documents.map((rootObject) => {
          return rootObject.documents.map((doc) => {
            return (
              doc.html === "h2" ? <h2 key={doc.id} className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left mb-5 mt-5 pt-5">{doc.text}</h2> :
                doc.html === "p" ? <p key={doc.id}>{doc.text}</p> : null
            )
          })
        })}

        <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className={`grid grid-cols-1 gap-y-6 gap-x-8 ${newText || newDesc ? "sm:grid-cols-1" : "sm:grid-cols-3"} `}>

            {
              newText ? <div className="sm:col-span-2">
                <label htmlFor="text" className="block text-sm font-semibold leading-6 text-gray-900">
                  Title
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="text"
                    id="title"
                    autoComplete="on"
                    className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    onChange={handleChangeTitle}
                  />
                </div>
                <br></br>
                <button
                  type="button"
                  onClick={
                    handleSubmitText
                  }
                  className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>

              </div> : <div className="hidden"></div>
            }

            {
              newDesc ? <div className="sm:col-span-2">
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                    Text
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="text"
                      id="texts"
                      rows={4}
                      className="block w-full rounded-md border-0 py-2 px-3.5 text-sm leading-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      onChange={handleChangeText}
                    />
                  </div>
                </div>
                <br></br>
                <button
                  type="button"
                  onClick={handleSubmitP}
                  className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>

              </div> : <div className="hidden"></div>
            }

            {
              newText || newDesc ? <div className="hidden"></div> :
                <button
                  type="button"
                  onClick={() => setNewText(!newText)}
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Title
                </button>
            }

            {
              newText || newDesc ? <div className="hidden"></div> :
                <button
                  type="button"
                  onClick={() => setNewDesc(!newDesc)}
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Text
                </button>

            }

            {
              newText || newDesc ? <div className="hidden"></div> :
                <button
                  type="button"
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Image
                </button>

            }






          </div>
          <div className="mt-10">
            {
              edited ?
                <button
                  type="submit"
                  className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edited
                </button> :
                <button onClick={handleEdit}
                  type="submit"
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit basic info
                </button>
            }
          </div>
        </form>

      </div>
    </React.Fragment>
  )
}
export default EditBlog;