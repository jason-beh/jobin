import { doc, setDoc } from 'firebase/firestore';
import { getSession } from 'next-auth/client';
import { database, dbMap } from '../../../utils/firebase';
const cloudinary = require('cloudinary').v2;

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(403).send('Forbidden');
  }
  if (req.method === 'POST') {
    const docRef = doc(database, dbMap.USERS, session.user.email);

    await setDoc(docRef, req.body, { merge: true });
    return res.status(200).send('success');
  } else {
    return res.status(404).send('Error');
  }
}
