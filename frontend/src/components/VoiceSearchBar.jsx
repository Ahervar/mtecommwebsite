import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic, MicOff } from 'lucide-react'; // Matches your current icon set

const VoiceSearchBar = ({ onVoiceResult }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onVoiceResult(transcript);
    }
  }, [transcript, onVoiceResult]);

  if (!browserSupportsSpeechRecognition) return null;

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ language: 'en-IN' });
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-2 transition-all duration-200 rounded-full ${
        listening ? 'text-red-500 animate-pulse bg-red-50' : 'text-gray-400 hover:text-[#2874F0]'
      }`}
      title="Search by voice"
    >
      {listening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
};

export default VoiceSearchBar;