import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceSearchBar = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);

  const startVoiceSearch = () => {
    // 1. Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; // Indian English accent support
    recognition.interimResults = false;

    // 2. Handle Events
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceResult(transcript); // Send text back to App.jsx
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    // 3. Start listening
    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startVoiceSearch}
      className={`p-2 transition-all rounded-full flex items-center justify-center ${
        isListening ? 'text-red-600 bg-red-100 animate-pulse' : 'text-gray-400 hover:text-blue-600'
      }`}
      title="Search by voice"
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      {isListening && <span className="ml-2 text-xs font-bold uppercase tracking-wider">Listening...</span>}
    </button>
  );
};

export default VoiceSearchBar;