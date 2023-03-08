/* eslint-disable @next/next/no-img-element */
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
    url?: any;
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
  const blogData = useSelector((state: any) => state.blog);

  useEffect(() => {

    setBlog(blogData.filter((item: { title: string; }) => item.title === id).map((blog: RootObject[]) => blog));

  }, [id])

  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center mb-5">{id}</h1>
        {blogs.map((coreimage) => (
          coreimage ?
            <img key={coreimage.id} src={coreimage.url} alt="Simple image blog" className="bg-cover w-full h-auto" /> : null
        ))
        }
        {blogs.map((rootObject) => {
          return rootObject.documents.map((doc) => {
            return (
              doc.html === "h2" ? <h2 key={doc.id} className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl text-left mb-5 mt-5 pt-5">{doc.text}</h2> :
                doc.html === "p" ? <p key={doc.id}>{doc.text}</p> :
                  doc.html === "img" ? <img key={doc.id} src={doc.url} alt="Simple image blog" className="bg-cover w-full h-auto my-5" /> : null
            )
          })
        })}
        {blogs.map((profile) => (
          profile ?
          <p key={profile.id} className="font-bold text-black">Created by { profile.profile.first_name + " " + profile.profile.last_name }</p> : null
        ))
        }
        
      </div>
    </React.Fragment>
  )
}

export default Post