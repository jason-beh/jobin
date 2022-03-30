import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, FilterIcon, XIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function Home() {
  const people = [
    {
      name: 'Nancy Chu',
      role: 'Front-end Developer',
      imageUrl: '/images/person1.png',
      skills: ['Coding', 'Wordpress'],
      colors: ['blue', 'green'],
    },
    {
      name: 'Wong Jie Ren',
      role: 'Video Editor',
      imageUrl: '/images/person2.png',
      skills: ['Premier Pro'],
      colors: ['red'],
    },
    {
      name: 'Elizabeth Dwane',
      role: 'Fitness Instructor',
      imageUrl: '/images/person3.png',
      skills: ['Yoga'],
      colors: ['yellow'],
    },
    {
      name: 'Natasha Otoshiki',
      role: 'Professional Writer',
      imageUrl: '/images/person4.png',
      skills: ['Copywriting'],
      colors: ['green'],
    },
    {
      name: 'Aini Fais',
      role: 'Graphic Designer',
      imageUrl: '/images/person5.png',
      skills: ['Design', 'Adobe Illustrator'],
      colors: ['purple', 'rose'],
    },
    {
      name: 'Suba Natharandram',
      role: 'Back-end Developer',
      imageUrl: '/images/person6.png',
      skills: ['Coding'],
      colors: ['blue'],
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const [open, setOpen] = useState(true);

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
        <div className={classNames(open === true ? '' : 'hidden', 'relative bg-indigo-600')}>
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="pr-16 sm:text-center sm:px-16">
              <p className="font-medium text-white">
                <span className="md:hidden">20% off your first gig order!</span>
                <span className="hidden md:inline">
                  Big news! We're excited to offer a 20% off your first gig order.
                </span>
                <span className="block sm:ml-2 sm:inline-block">
                  <a href="#" className="text-white font-bold underline">
                    {' '}
                    Learn more <span aria-hidden="true">&rarr;</span>
                  </a>
                </span>
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
              <button
                onClick={() => setOpen(false)}
                className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mt-5 mb-4">Open To Work</h1>

        <Menu as="div" className="relative w-full lg:w-54 lg:mt-6 inline-block text-left">
          <div className="w-full lg:w-32">
            <Menu.Button className="inline-flex justify-center w-full lg:w-54 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
              <FilterIcon className="h-5 w-5 mr-2"></FilterIcon>
              Filters
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
            <Menu.Items className="origin-top-right absolute left-0 mt-2 w-full lg:w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                      Location
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
                      Skills
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
                      Urgent Only
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <div className="mx-auto py-12 pt-8 px-4 max-w-7xl sm:px-6 lg:px-0 lg:py-24">
          <div className="space-y-12">
            <ul
              role="list"
              className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="space-y-4">
                    <div className="aspect-w-3 aspect-h-2">
                      <img
                        className="object-cover shadow-lg rounded-lg"
                        src={person.imageUrl}
                        alt={person.imageUrl}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="text-lg leading-6 font-medium space-y-2">
                        <h3>{person.name}</h3>
                        <p className="text-gray-600 text-sm">{person.role}</p>
                        {person.skills.map((skill, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-3 py-0.5 rounded-full mr-2 text-sm font-medium bg-${person.colors[index]}-100 text-${person.colors[index]}-800`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    );
  } else {
    return null;
  }
}
