import { Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ChevronDownIcon, SearchIcon, StarIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/Layout';

const publishingOptions = [
  {
    name: 'Published',
    description: 'This job posting can be viewed by anyone who has the link.',
    current: true,
  },
  {
    name: 'Draft',
    description: 'This job posting will no longer be publicly accessible.',
    current: false,
  },
];

const files = [
  {
    title: 'Sales Entry Workshop',
    category: 'Richiamo Coffee Sdn.Bhd',
    stars: 4,
    reviews: 5,
    source: '/images/upskill-richiato.png',
    description: 'Entry weekly sales data and visualise it into the Power BI dashboard (Beginner)',
  },
  {
    title: 'Microsoft APAC Enabler Program-Cloud & AI',
    category: 'Microsoft',
    stars: 5,
    reviews: 5,
    source: '/images/upskill-microsoft.png',
    description:
      'Provide industry required online training in clouds & AI training for PWDs (Advanced)',
  },
  {
    title: 'Art Teacher Practioner Program',
    category: 'Academy of Singapore Teachers',
    stars: 5,
    reviews: 5,
    source: '/images/upskill-singapore.png',
    description:
      'Offer art education in studio fundamentals such as art materials and artistic process (Intermediate)',
  },
  {
    title: 'Content Design Workshop ',
    category: 'Perkeso',
    stars: 4,
    reviews: 5,
    source: '/images/upskill-perkeso.png',
    description: 'Offer content and design workshop for online marketing (Intermediate)',
  },
  {
    title: 'Microsoft APAC Enabler Program-UI UX Design',
    category: 'Microsoft',
    stars: 5,
    reviews: 5,
    source: '/images/upskill-microsoft.png',
    description:
      'Provide industry required online training in UI UX design skills using photoshop and css (Advanced)',
  },
  // More files...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Banner() {
  const [open, setOpen] = useState(true);

  return (
    <div className={classNames(open === true ? '' : 'hidden', 'relative bg-indigo-600')}>
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">30 New courses from design to marketing!</span>
            <span className="hidden md:inline">
              Big news! We're excited to announce a 30 new courses from design to marketing!
            </span>
            <span className="block sm:ml-2 sm:inline-block">
              <a href="#" className="text-white font-bold underline">
                Learn more <span aria-hidden="true">&rarr;</span>
              </a>
            </span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Upskill() {
  const [selected, setSelected] = useState(publishingOptions[0]);

  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login');
    }
  }, [loading, session]);

  if (!loading && session) {
    return (
      <Layout>
        <Banner></Banner>
        <h1 className="text-3xl font-bold mt-5 mb-10">Upskilling Opportunities</h1>
        {/* Page heading */}
        <header className="bg-gray-50 py-8">
          <div className="max-w-7xl flex flex-col justify-end items-end mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-start xl:justify-start">
            <div className="flex w-full items-center mb-4 md:max-w-3xl md:mx-auto lg:mx-0 xl:px-0">
              <div className="w-full">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 sm:text-sm"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                  Sort By Relevance
                  <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Date
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Title
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                            'block px-4 py-2 text-sm'
                          )}
                        >
                          Category
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>

        <main className="pt-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {files.map((file) => (
                <li key={file.source} className="relative">
                  <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                    <img
                      src={file.source}
                      alt=""
                      className="object-cover pointer-events-none group-hover:opacity-75"
                    />
                    <button type="button" className="absolute inset-0 focus:outline-none">
                      <span className="sr-only">View details for {file.title}</span>
                    </button>
                  </div>
                  <div className="flex mt-1">
                    {[...Array(file.stars)].map((star, index) => (
                      <StarIcon key={index} className="text-yellow-300 h-6"></StarIcon>
                    ))}
                    {[...Array(5 - file.stars)].map((star, index) => (
                      <StarIcon key={index} className="text-gray-300 h-6"></StarIcon>
                    ))}
                  </div>
                  <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                    {file.title}
                  </p>
                  <p className="block text-sm font-normal text-gray-500 py-2 pointer-events-none">
                    {file.reviews} Reviews
                  </p>
                  <p className="block text-sm font-normal text-gray-600 pointer-events-none">
                    {file.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </Layout>
    );
  } else {
    return null;
  }
}
