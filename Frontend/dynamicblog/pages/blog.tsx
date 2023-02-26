/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

function Blog() {
  const callouts = [
    {
      name: 'Title',
      description: 'Description',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Title',
      description: 'Description',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Title',
      description: 'Description',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]
  return (
    <React.Fragment>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Blog</h1>


        <div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
            <div className="mx-auto max-w-2xl py-16 sm:py-24 ">

              <div className="mt-6 space-y-12 grid grid-cols-1 gap-x-6 ">
                {callouts.map((callout) => (
                  <div key={callout.name} className="group relative">
                    <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64">
                      <img
                        src={callout.imageSrc}
                        alt={callout.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      <Link href={callout.href}>
                        <span className="absolute inset-0" />
                        {callout.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">{callout.description}</p>
                  </div>
                ))}
              </div>



              <nav aria-label="Page navigation" className="mt-20 font-semibold flex items-center justify-center">
                <ul className="inline-flex -space-x-px ">
                  <li>
                    <Link href="#" className="px-3 py-2 ml-0 leading-tight text-white-500 bg-white border  hover:bg-blue-100 hover:text-white-700 dark:bg-blue-800 dark dark:text-white-400 dark:hover:bg-blue-700 dark:hover:text-white">Previous</Link>
                  </li>
                  <li>
                    <Link href="#" className="px-3 py-2 leading-tight text-white-500 bg-white border hover:bg-blue-100 hover:text-white-700 dark:bg-blue-800 dark dark:text-white-400 dark:hover:bg-blue-700 dark:hover:text-white">1</Link>
                  </li>
                  <li>
                    <Link href="#" className="px-3 py-2 leading-tight text-white-500 bg-white border hover:bg-blue-100 hover:text-white-700 dark:bg-blue-800 dark dark:text-white-400 dark:hover:bg-blue-700 dark:hover:text-white">2</Link>
                  </li>
                  <li>
                    <Link href="#" aria-current="page" className="px-3 py-2 text-blue-600 border bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark dark:bg-blue-700 dark:text-white">3</Link>
                  </li>
                  <li>
                    <Link href="#" className="px-3 py-2 leading-tight text-white-500 bg-white border hover:bg-blue-100 hover:text-white-700 dark:bg-blue-800 dark dark:text-white-400 dark:hover:bg-blue-700 dark:hover:text-white">4</Link>
                  </li>
                  <li>
                    <Link href="#" className="px-3 py-2 leading-tight text-white-500 bg-white border hover:bg-blue-100 hover:text-white-700 dark:bg-blue-800 dark dark:text-white-400 dark:hover:bg-blue-700 dark:hover:text-white">5</Link>
                  </li>
                  <li>
                    <Link href="#" className="px-3 py-2 leading-tight text-white-500 bg-white border  hover:bg-blue-100 hover:text-white-700 dark:bg-blue-800 dark dark:text-white-400 dark:hover:bg-blue-700 dark:hover:text-white">Next</Link>
                  </li>
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