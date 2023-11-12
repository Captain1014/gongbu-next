// useSpeechSynthesis.js
import { useEffect, useCallback, useState } from 'react';

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);

  const initializeSpeechSynthesis = useCallback(() => {
    const synthesis = window.speechSynthesis;

    synthesis.onvoiceschanged = () => {
      setVoices(synthesis.getVoices());
    };

    setSpeechSynthesis(synthesis);
  }, []);

  useEffect(() => {
    initializeSpeechSynthesis();

    return () => {
      if (speechSynthesis) {
        speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [initializeSpeechSynthesis, speechSynthesis]);

  const readText = (text, voiceIndex = 0) => {
    if (!speechSynthesis) {
      console.error('Speech synthesis not available.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[voiceIndex];
    speechSynthesis.speak(utterance);
  };

  return { readText, voices };
};
