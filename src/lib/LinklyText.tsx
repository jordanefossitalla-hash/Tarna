import { JSX } from "react";

export function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

  const elements: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  text.replace(urlRegex, (url, _, offset) => {
    // texte avant le lien
    if (offset > lastIndex) {
      elements.push(text.slice(lastIndex, offset));
    }

    const href = url.startsWith("http")
      ? url
      : `https://${url}`;

    elements.push(
      <a
        key={offset}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 break-all"
      >
        {url}
      </a>
    );

    lastIndex = offset + url.length;
    return url;
  });

  // texte restant
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}