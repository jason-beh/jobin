import { PaperClipIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';

export default function Matched() {
  const gigs = [
    {
      name: 'Siti Binti Abdullah',
      description:
        'I am looking to build a website using Wordpress for my upcoming niece wedding. I figured its the modern way of doing things and I need it urgently, can you pls help me? I have attached a screenshot at the bottom for your reference. It will be great if you can add some copywriting too!',
      email: 'tim@gmail.com',
      amount: 50,
      skills: ['WordPress', 'Copywriting'],
      colors: ['red', 'yellow'],
      date: '30 seconds ago',
      attachments: ['mockup.png'],
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ];

  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/login');
    }
  }, [loading, session]);

  if (!loading && session) {
    return (
      <Layout pageTitle="Matched Gigs">
        {gigs.map((gig, index) => (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-10">
            <div className="flex justify-between items-center flex-col sm:flex-row px-4 py-5 sm:px-6">
              <div className="">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Order Matched!</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-4 lg:mb-0 text-center lg:text-left">
                  {gig.date}
                </p>
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex mr-3 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                >
                  Decline
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Profile Picture</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <img
                      className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                      src={gig.imageUrl}
                      alt=""
                    />
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{gig.name}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{gig.email}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Skills</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {gig.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-3 py-0.5 rounded-full mr-2 text-sm font-medium bg-${gig.colors[index]}-100 text-${gig.colors[index]}-800`}
                      >
                        {skill}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Proposed Amount</dt>
                  <dd className="mt-1 text-sm text-gray-900">{`$${gig.amount}`}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">About</dt>
                  <dd className="mt-1 text-sm text-gray-900">{gig.description}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul
                      role="list"
                      className="border border-gray-200 rounded-md divide-y divide-gray-200"
                    >
                      {gig.attachments.map((attachment, index) => (
                        <li
                          key={index}
                          className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                        >
                          <div className="w-0 flex-1 flex items-center">
                            <PaperClipIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            <span className="ml-2 flex-1 w-0 truncate">{attachment}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <a
                              href="#"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Download
                            </a>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </Layout>
    );
  } else {
    return null;
  }
}
