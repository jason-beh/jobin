import axios from 'axios';
import { getSession } from 'next-auth/client';
import { v4 as uuidv4 } from 'uuid';
import serviceAccount from '../../../utils/gcp';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send('unauthenticated');
  }

  if (req.method === 'POST') {
    let { language, text } = req.body;

    // console.log(language);
    // console.log(text);

    if (language == '' || text == '') return;

    // Imports the Google Cloud client library
    const { Translate } = require('@google-cloud/translate').v2;

    // Creates a client
    const translate = new Translate({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      projectId: serviceAccount.project_id,
    });

    async function translateText() {
      let translations = await translate.translate(text, language);
      return translations[0];
    }

    let translations = await translateText();

    return res.send(translations);
  } else {
    return res.status(404).send('Error');
  }
}
