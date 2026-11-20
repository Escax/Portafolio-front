import { useEffect, useState } from "react";

export function useTyping(words: string[], speed = 70, pause = 1500) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const finished = !deleting && text === word;
    const empty = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (finished) return setDeleting(true);
        if (empty) {
          setDeleting(false);
          setIndex((i) => i + 1);
          return;
        }
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      finished ? pause : deleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}