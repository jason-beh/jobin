import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import languages from '../utils/languages';

export default function Record({ setDisplayText, setTranslatedText, setHelpData, helpData }) {
  const [chosenLanguage, setChosenLanguage] = useState('Mandarin Chinese');

  const { finalTranscript, listening, isMicrophoneAvailable, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>Please enable microphone permission access to use speech translation.</span>;
  }

  useEffect(() => {
    setDisplayText(finalTranscript);
    translate(finalTranscript);
  }, [finalTranscript]);

  async function translate(text) {
    if (text == '') return;

    let { data } = await axios({
      method: 'post',
      url: `/api/speech/translate`,
      data: {
        language: 'en', // default its english
        text,
      },
    });

    setTranslatedText(data);
    setHelpData({ skills: helpData.skills, message: data });
  }

  return (
    <div className="mb-3 sm:mb-0">
      <label
        htmlFor="skills"
        className="block mb-1 text-xs font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        Speak in your native language:
      </label>
      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md"
        defaultValue={languages[chosenLanguage].stt}
        onChange={(e) => setChosenLanguage(e.target.value)}
      >
        {Object.keys(languages).map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          if (listening) {
            SpeechRecognition.stopListening();
          } else {
            setDisplayText('speak into your microphone...');
            SpeechRecognition.startListening({ language: languages[chosenLanguage].stt });
          }
        }}
        className="inline-flex mt-4 items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
      >
        {listening ? 'Stop Recording' : 'Record'}
      </button>
    </div>
  );
}
