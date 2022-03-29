import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && session) {
      router.push('/');
    }
  }, [loading, session]);

  if (!loading && !session) {
    return (
      <>
        {!session && (
          <div className="min-h-screen bg-gray-50 flex">
            <div className="flex-1 flex flex-col justify-center relative py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full justify-between max-w-sm lg:w-84">
                <div className="flex flex-col items-between">
                  <div className="w-full flex justify-center mb-10">
                    <img className="w-32" src="images/logo-blue.png" alt="" />
                  </div>
                  <button
                    onClick={() => signIn('google')}
                    className="px-8 mb-4 hover:opacity-70 text-black rounded-md py-4 bg-white shadow-lg flex items-center justify-start"
                  >
                    <img src="images/google-icon.svg" className="w-6 w-8 mr-3"></img>
                    Sign In With Google
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="images/login-cover.jpg"
                alt=""
              />
            </div>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
}