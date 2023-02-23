/* eslint-disable @next/next/no-img-element */
import React from "react";


const blogs = [
  {
    id: 1,
    name: 'Title',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHw%3D&w=1000&q=80',
    imageAlt: "Title",
    views: 'Views 124',
    desc: 'Description',
  },
  {
    id: 2,
    name: 'Title',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHw%3D&w=1000&q=80',
    imageAlt: "Title",
    views: 'Views 124',
    desc: 'Description',
  },
  {
    id: 3,
    name: 'Title',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHw%3D&w=1000&q=80',
    imageAlt: "Title",
    views: 'Views 124',
    desc: 'Description',
  },
  {
    id: 4,
    name: 'Title',
    href: '#',
    imageSrc: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YmxvZ3xlbnwwfHwwfHw%3D&w=1000&q=80',
    imageAlt: "Title",
    views: 'Views 124',
    desc: 'Description',
  },
  

]

function Home() {
  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Recent posts</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="group relative">
                <div className="min-h-40 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                  <img
                    src={blog.imageSrc}
                    alt={blog.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={blog.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {blog.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{blog.desc}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{blog.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Home;