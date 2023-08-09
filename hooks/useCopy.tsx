import { useState } from "react";

export const useCopy = (): [boolean, (text: string) => void, () => void] => {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard is not enabled or available");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.error(`There was error copying text: ${text}`, error);
    }
  };

  const resetCopied = () => {
    const resetTimeout = setTimeout(() => setCopied(false), 1000);
    return () => clearTimeout(resetTimeout);
  };

  return [copied, copy, resetCopied];
};
