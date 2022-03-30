import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Layout';

const faqs = [
  {
    id: 1,
    question: 'Is the platform Jobin free?',
    answer: 'It will 100% be free forever?',
  },
  {
    id: 2,
    question: 'What is Jobin?',
    answer:
      'Jobin is a solution to help people with disabilities to gain additional income through obtaining gigs.',
  },
  {
    id: 3,
    question: "What's the best thing about Jobin",
    answer:
      'Jobin is a super user-friendly website that allows disabled people such as the blind to navigate easily. We are always innovating to integrate and develop new technologies to help these people.',
  },
  {
    id: 4,
    question: 'Who are the founders?',
    answer:
      'Jobin is cofounded by Tan Jun Jia, Oscar Lim Fang Jack, Hoh Jia Da and Jason Beh. Our mission is to build Jobin to help as much people as possible.',
  },
];

export default function Contact() {
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
        <div className="relative">
          <div className="lg:absolute lg:inset-0">
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover lg:absolute lg:h-full"
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                alt=""
              />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mt-10">Our Helplines</h2>
          <p className="mt-6 text-lg text-gray-500 max-w-3xl">
            We are available 24/7 to assist you. Give us a call or email and we are will attend to
            it as soon as possible.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Singapore</h3>
              <p className="mt-2 text-base text-gray-500">
                <span className="block">Blk 35 Mandalay Road # 13–37</span>
                <span className="block">Mandalay Towers Singapore 308215</span>
                <span className="block text-blue-700">+65 6298 1143</span>
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Malaysia</h3>
              <p className="mt-2 text-base text-gray-500">
                <span className="block">54, Jalan Batu Lima</span>
                <span className="block">57231, Ampang, Selangor</span>
                <span className="block text-blue-700">+65 6298 1143</span>
              </p>
            </div>
          </div>
        </div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 mt-10">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-gray-500">
              Can’t find the answer you’re looking for? Reach out to our{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                customer support
              </a>{' '}
              above.
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-12">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="text-lg leading-6 font-medium text-gray-900">{faq.question}</dt>
                  <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Layout>
    );
  } else {
    return null;
  }
}
