/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  BellIcon,
  MenuIcon,
  PlusIcon,
  XIcon,
  ChevronDownIcon,
  ChatAltIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import classNames from '../utils/classNames';
import Footer from './Footer';
import Head from 'next/head';

const navigation = [
  {
    link: '/',
    title: 'Home',
  },
  {
    link: '/community',
    title: 'Community',
  },
  {
    link: '/upskill',
    title: 'Upskill',
  },
  {
    link: '/contact',
    title: 'Contact',
  },
];

const trendingPosts = [
  {
    id: 1,
    user: {
      name: 'Floyd Miles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    body: 'Floyd Miles submitted a gig proposal.',
    comments: 291,
    time: '2 mins ago',
  },
  // More posts...
];

export default function Layout({ children, pageTitle = '' }) {
  const [profileImage, setProfileImage] = useState('/images/user-placeholder.jpeg');
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login');
    }

    if (!loading && session) {
      let { image, name } = session.dbUser;
      if (image != null && image != '') {
        setProfileImage(image);
      }
    }
  }, [loading, session]);

  return (
    <div>
      {pageTitle != '' ? (
        <Head>
          <title>{pageTitle} | Jobin</title>
        </Head>
      ) : null}

      <Disclosure as="nav" className="bg-blue-900">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <a href="/">
                      <img className="h-10" src="/images/logo-white-inline.png" alt="inline logo" />
                    </a>
                  </div>
                  <div className="hidden md:block"></div>
                </div>
                <div className="hidden md:flex items-center justify-between">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      href="/"
                      className="text-white hover:bg-blue-700 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Home
                    </a>
                    <a
                      href="/community"
                      className="text-white hover:bg-blue-700 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Community
                    </a>
                    <a
                      href="/upskill"
                      className="text-white hover:bg-blue-700 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Upskill
                    </a>
                    <a
                      href="/contact"
                      className="text-white hover:bg-blue-700 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Contact
                    </a>
                  </div>
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-blue-900 rounded-full px-3 py-2 hover:bg-blue-800 flex items-center text-sm text-white focus:outline-none">
                              <img className="h-8 w-8 rounded-full" src={profileImage} alt="" />
                              <ChevronDownIcon className="ml-2 w-5 h-5" />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 static z-50 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/profile"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/matched"
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Matched Gigs
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    onClick={signOut}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Logout
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700">
                        <button
                          type="button"
                          className="p-1 rounded-full text-white focus:outline-none"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
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
                      <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {trendingPosts.map((post, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <li key={post.id} className="flex py-4 px-4 space-x-3">
                                  <div className="flex-shrink-0">
                                    <img
                                      className="h-8 w-8 rounded-full"
                                      src={post.user.imageUrl}
                                      alt={post.user.name}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm text-gray-800">{post.body}</p>
                                    <div className="mt-2 flex">
                                      <span className="inline-flex items-center text-sm">
                                        <button
                                          type="button"
                                          className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                                        >
                                          <span className="font-medium text-gray-700">
                                            {post.time}
                                          </span>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </li>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-700 hover:bg-opacity-75 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.link}
                    className="text-white hover:bg-blue-700 hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-blue-400">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={profileImage} alt="Logo" />
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <a
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 hover:bg-opacity-75"
                  >
                    Profile
                  </a>
                  <a
                    href="/matched"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 hover:bg-opacity-75"
                  >
                    Matched Gigs
                  </a>
                  <a
                    href="#"
                    onClick={signOut}
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 hover:bg-opacity-75"
                  >
                    Logout
                  </a>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main>
        <div className="w-10/12 sm:max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {pageTitle != '' ? <h1 className="text-3xl font-bold mt-5 mb-10">{pageTitle}</h1> : null}

          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
