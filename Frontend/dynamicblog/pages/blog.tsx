/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setPaginationData } from '@/reducers/pagination-reducer';
function Blog() {

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
  const [pageNum, setPageNum] = useState(1);
  const paginationBlog = useSelector((state: any) => state.page);
  const blogData = useSelector((state: any) => state.blog);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);


  const paginationVerification = async () => {
    const responsePagination = await axios.get(`http://localhost:3000/blog/pagination?page=${pageNum}&limit=5`);
    dispatch(setPaginationData(responsePagination.data));
  }

  useEffect(() => {
    paginationVerification();
    setBlog(paginationBlog);
    setCount(Math.floor(blogData.length / 5))

  }, [paginationBlog])




  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Blog</h1>


        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 ">

              <div className="mt-6 space-y-12 grid grid-cols-1 gap-x-6 ">
                {blogs.map((blog) => (
                  <div key={blog.id} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-300 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64">
                      <img
                        src="#"
                        alt="#"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                      <Link href="#">
                        <span className="absolute inset-0" />
                        {blog.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">{blog.date}</p>
                    <p className="mt-1 text-sm text-gray-900 truncate">{blog.description}</p>
                  </div>
                ))}
              </div>



              <nav aria-label="Page navigation" className="mt-20 font-semibold flex items-center justify-center">
                <ul className="inline-flex -space-x-px ">
                  {pageNum !== 1 ?
                    <li>
                      <p className="px-3 py-2 ml-0 leading-tight text-white-500 bg-white border  hover:bg-blue-100 hover:text-white-700  cursor-pointer">Previous</p>
                    </li> : <li></li>

                  }

                  {
                    (() => {
                      const items = [];
                      for (let i = 0; i <= count; i++) {

                        items.push(
                          <li key={i} onClick={() => {
                            setPageNum(i + 1);
                            setSelectedPage(i + 1);
                            dispatch(setPaginationData([]));
                          }}>
                            <p className={`px-3 py-2 leading-tight text-white-500 bg-white border hover:bg-blue-100 hover:text-white-700  cursor-pointer ${selectedPage === i + 1 ? "bg-blue-500 hover:bg-blue-500" : ""}`}>{i + 1}</p>
                          </li>
                        );
                      }
                      return items;
                    })()
                  }

                  {pageNum <= count ?
                    <li onClick={() => {

                      setPageNum(pageNum + 1);
                      setSelectedPage(pageNum + 1);
                      dispatch(setPaginationData([]));
                    }}>
                      <p className="px-3 py-2 leading-tight text-white-500 bg-white border  hover:bg-blue-100 hover:text-white-700  cursor-pointer">Next</p>
                    </li>
                    : <li></li>
                  }
                </ul>
              </nav>




            </div>
          </div>
        </div>


      </div>
    </React.Fragment>
  )
}
export default Blog;