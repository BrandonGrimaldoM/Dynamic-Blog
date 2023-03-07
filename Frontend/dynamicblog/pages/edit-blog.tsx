/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCookie } from 'cookies-next';
import { setBlogData } from "../reducers/blog-reducer";
import axios from 'axios';
import { NextPageContext } from 'next';

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
  const [newImage, setNewImage] = useState(false);

  const [editTitle, setEditTitle] = useState(false);
  const [editText, setEditText] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [auxDocId, setauxDocId] = useState(0);
  




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
    url?: any;
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

    setFormData(prevState => ({ title: title, description: description, image: null }));

  }, [blogs, blogData])


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
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

  const [formImage, setFormImage] = useState({
    html: 'img',
    image: null,
    blogId: currenlyBlog,
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
    const { name, value, files } = event.target;
    if (name === "images" && files !== null && event.target.files !== null) {
      console.log("soy avatar");
      const file = event.target.files[0];
      fileToBuffer(file)
        .then((buffer) => {
          console.log(buffer)
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

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormTitle(prevFormTitle => ({ ...prevFormTitle, [name]: value }));
  }

  const handleChangeText = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormText(prevFormText => ({ ...prevFormText, [name]: value }));
  }

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    if (name === "docimages" && files !== null && event.target.files !== null) {
      console.log("soy imagensita");
      const file = event.target.files[0];
      fileToBuffer(file)
        .then((bufferdoc) => {
          console.log(bufferdoc)
          setFormImage((prevFormImage: any) => ({ ...prevFormImage, image: bufferdoc }));
        })
        .catch((error) => {
          console.error(error);
        });
    }
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

  async function handleSubmitUpdateTitle(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };
        const responseNewDoc = await axios.patch("http://localhost:3000/blog/docs/" + auxDocId, formTitle, config);
        setFormTitle(prev => ({ ...prev, text: '' }));
        dispatch(setBlogData([]));
      }
      setEditTitle(!editTitle);
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
      setNewDesc(!newDesc);
    } catch (error) {
      console.log(error)
      return;
    }

  }

  async function handleSubmitUpdateText(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };
        const responseNewDoc = await axios.patch("http://localhost:3000/blog/docs/" + auxDocId, formText, config);
        setFormText(prev => ({ ...prev, text: '' }));
        dispatch(setBlogData([]));
      }
      setEditText(!editText);
    } catch (error) {
      console.log(error)
      return;
    }

  }

  async function handleSubmitImage(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };
        const responseNewDoc = await axios.post("http://localhost:3000/blog/docs", formImage, config);
        console.log(formImage);
        dispatch(setBlogData([]));
      }
      setNewImage(!newImage)
    } catch (error) {
      console.log(error)
      return;
    }

  }

  async function handleSubmitUpdateImage(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };
        const responseNewDoc = await axios.patch("http://localhost:3000/blog/docs/" + auxDocId, formImage, config);
        setFormImage(prev => ({ ...prev, image: null }));
        console.log(formImage);
        dispatch(setBlogData([]));
      }
      setEditImage(!editImage)
    } catch (error) {
      console.log(error)
      return;
    }

  }

  async function handleSubmitDeleteDocument(event: React.MouseEvent<HTMLButtonElement>, id: number) {
    event.preventDefault();
    // ...Enviar formulario
    try {
      if (getCookie('token')) {
        const config = {
          headers: { Authorization: `Bearer ${getCookie('token')}` }
        };

        const responseNewDoc = await axios.delete("http://localhost:3000/blog/docs/" + id, config);
        dispatch(setBlogData([]));
      }
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

              doc.html === "h2" ?

                (editTitle && auxDocId === doc.id ?
                  <div>

                    <div className="sm:col-span-2 border-2 border-green-400 p-2 border-dotted">
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
                          defaultValue={doc.text}
                          onChange={handleChangeTitle}
                        />
                      </div>
                      <br></br>
                      <button
                        type="button"
                        onClick={handleSubmitUpdateTitle}
                        className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>

                    </div>
                    <br />
                  </div>

                  :
                  <div>

                    <div className="border-2 border-neutral-400 p-2 border-dotted">
                      <h2 key={doc.id} className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left mb-5 mt-5 pt-5">{doc.text}</h2>
                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => { setEditTitle(!editTitle), setauxDocId(doc.id) }}
                          className="mr-5 block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={(even) =>  handleSubmitDeleteDocument(even,doc.id) }
                          className="ml-5 block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <br />
                  </div>
                )

                :


                doc.html === "p" ?

                  (
                    editText && auxDocId === doc.id ?
                      <div>

                        <div className="sm:col-span-2">
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
                                defaultValue={doc.text}
                              />
                            </div>
                          </div>
                          <br></br>
                          <button
                            type="button"
                            onClick={handleSubmitUpdateText}
                            className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>

                        </div>
                        <br />
                      </div>


                      :
                      <div>

                        <div className="border-2 border-neutral-400 p-2 border-dotted">
                          <p key={doc.id}>{doc.text}</p>
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => { setEditText(!editText), setauxDocId(doc.id) }}
                              className="mr-5 block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={(even) =>  handleSubmitDeleteDocument(even,doc.id) }
                              className="ml-5 block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <br />
                      </div>
                  )
                  :


                  doc.html === "img" ?
                    (

                      editImage && auxDocId === doc.id ?

                        <div>

                          <div className="sm:col-span-2">
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
                                    htmlFor="file-upload3"
                                    className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                                  >
                                    <span>Upload a file</span>
                                    <input id="file-upload3" name="docimages" type="file" className="sr-only" onChange={handleChangeImage} />
                                  </label>
                                  <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                              </div>
                            </div>
                            <br></br>
                            <button
                              type="button"
                              onClick={handleSubmitUpdateImage}
                              className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Save
                            </button>

                          </div>
                          <br />
                        </div>
                        :

                        <div>

                          <div className="border-2 border-neutral-400 p-2 border-dotted">
                            <img key={doc.id} src={doc.url} alt="Simple image blog" className="bg-cover w-full h-auto my-5" />
                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => { setEditImage(!editImage), setauxDocId(doc.id) }}
                                className="mr-5 block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={(even) =>  handleSubmitDeleteDocument(even,doc.id) }
                                className="ml-5 block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          <br />
                        </div>
                    )
                    : null
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
              newImage ? <div className="sm:col-span-2">
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
                        htmlFor="file-upload2"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input id="file-upload2" name="docimages" type="file" className="sr-only" onChange={handleChangeImage} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                <br></br>
                <button
                  type="button"
                  onClick={handleSubmitImage}
                  className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>

              </div> : <div className="hidden"></div>
            }

            {
              newText || newDesc || newImage ? <div className="hidden"></div> :
                <button
                  type="button"
                  onClick={() => setNewText(!newText)}
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Title
                </button>
            }

            {
              newText || newDesc || newImage ? <div className="hidden"></div> :
                <button
                  type="button"
                  onClick={() => setNewDesc(!newDesc)}
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Text
                </button>

            }

            {
              newText || newDesc || newImage ? <div className="hidden"></div> :
                <button
                  type="button"
                  onClick={() => setNewImage(!newImage)}
                  className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Image
                </button>

            }






          </div>

        </form>

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

export default EditBlog;