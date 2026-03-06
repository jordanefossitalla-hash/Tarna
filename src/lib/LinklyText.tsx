import { JSX } from "react";

export function linkifyText(text?: string | null) {
  const safeText = text ?? "";
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

  const elements: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  safeText.replace(urlRegex, (url, _, offset) => {
    // texte avant le lien
    if (offset > lastIndex) {
      elements.push(safeText.slice(lastIndex, offset));
    }

    const href = url.startsWith("http") || url.startsWith("Https") || url.startsWith("HTTPS")
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
  if (lastIndex < safeText.length) {
    elements.push(safeText.slice(lastIndex));
  }

  return elements;
}
