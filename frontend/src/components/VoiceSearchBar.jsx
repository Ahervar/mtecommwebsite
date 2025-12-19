import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

const VoiceSearchBar = ({ onVoiceResult }) => {
  const [isListening, setIsListening] = useState(false);
  // NEW: Ref to hold the recognition instance so we can stop it from outside
  const recognitionRef = useRef(null); 

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN'; 
    recognition.interimResults = false;
    
    // Save instance to ref
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onVoiceResult(transcript); 
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // NEW: Logic to stop listening when tapping outside or scrolling
  useEffect(() => {
    const handleOutsideAction = () => {
      if (isListening && recognitionRef.current) {
        recognitionRef.current.abort(); // Immediately stop the microphone
        setIsListening(false);
      }
    };

    if (isListening) {
      // Listen for clicks and scrolls outside the component
      document.addEventListener('mousedown', handleOutsideAction);
      window.addEventListener('scroll', handleOutsideAction);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideAction);
      window.removeEventListener('scroll', handleOutsideAction);
    };
  }, [isListening]);

  return (
    <button
      type="button"
      onClick={(e) => {
        // Prevent the click from immediately triggering 'handleOutsideAction'
        e.stopPropagation();
        startVoiceSearch();
      }}
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