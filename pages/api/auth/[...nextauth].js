import { doc, getDoc, setDoc } from 'firebase/firestore';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { database, dbMap } from '../../../utils/firebase';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      const { name, email } = user;

      try {
        const docRef = doc(database, dbMap.USERS, email);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(docRef, {
            name,
            email,
            createdAt: new Date(),
          });
        }

        return Promise.resolve(true);
      } catch (err) {
        console.log('Server error');
        console.log(err);
        throw new Error('Error in signin callback');
      }
    },

    session: async (session, user) => {
      try {
        const docRef = doc(database, dbMap.USERS, session.user.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let user = docSnap.data();
          session.dbUser = user;
          session.id = user._id;
        }
      } catch (err) {
        console.log('Server error');
        console.log(err);
        throw new Error('Error in session callback');
      }
      return Promise.resolve(session);
    },
  },

  // Enable debug messages in the console if you are having problems
  debug: false,

  // A database is optional, but required to persist accounts in a database
  //   database: process.env.DATABASE_URL,
});
