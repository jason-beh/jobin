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
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    let { previousVideo, newVideo } = req.body;

    // Extract public id from previousVideo url
    previousVideo = previousVideo.split('/');
    let lastIndex = previousVideo.length - 1;
    let secondLastIndex = previousVideo.length - 2;
    previousVideo[lastIndex] = previousVideo[lastIndex].split('.')[0];
    let previousPublicId = previousVideo[secondLastIndex] + '/' + previousVideo[lastIndex];
    // console.log(previousPublicId);

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(previousPublicId, function (result) {
      // console.log(result);
    });

    // Update profile with new video
    const docRef = doc(database, dbMap.USERS, session.user.email);

    await setDoc(
      docRef,
      {
        video: newVideo,
      },
      { merge: true }
    );

    return res.send('Success');
  } else {
    return res.status(404).send('Error');
  }
}
