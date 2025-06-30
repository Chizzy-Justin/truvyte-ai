
// src/hooks/useTypewriter.js
import { useState, useEffect, useRef } from 'react';

export default function useTypewriter(
  texts,
  {
    typingSpeed = 100,
    deletingSpeed = 50,
    pause = 2000,
    cursorBlinkSpeed = 500
  } = {}
) {
  const [display, setDisplay] = useState(texts[0] || '');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(texts[0]?.length || 0);
  const [deleting, setDeleting] = useState(true); // start by deleting the first
  const [blink, setBlink] = useState(true);
  const initialMount = useRef(true);

  // Handle initial pause before deleting the first phrase
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      const timer = setTimeout(() => {
        setDeleting(true);
      }, pause);
      return () => clearTimeout(timer);
    }
  }, [pause]);

  // Type / delete effect
  useEffect(() => {
    const currentText = texts[textIndex];
    let timer;

    // Deleting phase
    if (deleting) {
      if (charIndex >= 0) {
        timer = setTimeout(() => {
          setDisplay(currentText.slice(0, charIndex));
          setCharIndex(charIndex - 1);
        }, deletingSpeed);
      } else {
        // Move to next text, switch to typing
        setDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        setCharIndex(0);
      }
    }
    // Typing phase
    else {
      if (charIndex <= currentText.length) {
        timer = setTimeout(() => {
          setDisplay(currentText.slice(0, charIndex));
          setCharIndex(charIndex + 1);
        }, typingSpeed);
      } else {
        // Pause before deleting this new phrase
        timer = setTimeout(() => {
          setDeleting(true);
        }, pause);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, deleting, pause, texts, textIndex, typingSpeed, deletingSpeed]);

  // Cursor blink effect
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlink((prev) => !prev);
    }, cursorBlinkSpeed);
    return () => clearInterval(blinkTimer);
  }, [cursorBlinkSpeed]);

  return { text: display, showCursor: blink };
}



