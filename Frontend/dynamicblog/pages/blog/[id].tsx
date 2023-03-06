/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";

const Post = () => {
  const router = useRouter()
  const { id } = router.query

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
  const blogData = useSelector((state: any) => state.blog);

  
  useEffect(() => {

    setBlog(blogData.filter((item: { title: string; }) => item.title === id).map((blog: RootObject[]) => blog));

    if (blogs.length === 0) {
      console.log("no")
    }

  }, [id])



  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">{id}</h1>
        {blogs.map((rootObject) => {
          return rootObject.documents.map((doc) => {
            return (
              doc.html === "h2" ? <h2 key={doc.id} className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left mb-5 mt-5 pt-5">{doc.text}</h2> :
                doc.html === "p" ? <p key={doc.id}>{doc.text}</p> : null
            )
          })
        })}
      </div>
    </React.Fragment>
  )
}

export default Post