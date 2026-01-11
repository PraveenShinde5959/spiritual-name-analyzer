
import React from 'react';
import { SOCIAL_SHARE_LINKS } from '../constants';

interface SocialShareButtonsProps {
  shareText: string;
  shareUrl?: string; // Optional URL for sharing, defaults to current page
  className?: string;
}

export const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({
  shareText,
  shareUrl = window.location.href,
  className = '',
}) => {
  return (
    <div className={`flex justify-center space-x-4 mt-6 ${className}`}>
      <a
        href={SOCIAL_SHARE_LINKS.whatsapp(shareText, shareUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Share on WhatsApp"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.5 3.44 1.44 4.96L2.05 22l5.25-1.38c1.45.79 3.08 1.22 4.74 1.22 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.06c-1.4.0-2.73-.39-3.89-1.07l-.28-.16-2.91.76.77-2.82-.18-.29c-.73-1.18-1.11-2.54-1.11-3.95 0-4.47 3.63-8.1 8.1-8.1 2.18 0 4.23.85 5.77 2.4s2.4 3.6 2.4 5.77c0 4.47-3.63 8.1-8.1 8.1zm4.52-6.16c-.25-.13-.74-.37-.87-.4-.12-.04-.2-.04-.29.04-.09.08-.34.4-.41.48-.07.08-.15.09-.28.05-.14-.04-.58-.21-.83-.49-.25-.29-.33-.68-.19-.71.1-.02.21-.04.29-.04.08-.0 0-.08-.1-.23-.1-.16-.3-.7-.7-.84-.29-.14-.5-.12-.69-.12-.19-.0-.41-.0-.63-.0-.22 0-.58.08-.88.4-.29.31-1.13 1.07-1.13 2.6c0 1.52 1.16 2.97 1.32 3.18.16.21 2.22 3.39 5.37 4.6.73.28 1.33.45 1.8.58.74.2 1.39.17 1.91.1.52-.07 1.6-.66 1.83-1.3.23-.64.23-1.17.16-1.3.16-.13-.06-.2-.14-.24z"/>
        </svg>
      </a>
      <a
        href={SOCIAL_SHARE_LINKS.twitter(shareText, shareUrl)}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Share on Twitter"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
          <path d="M22.46 6c-.77.34-1.6.57-2.46.68.88-.53 1.56-1.37 1.88-2.37-.83.49-1.75.84-2.74 1.02-1.63-1.73-4.52-2.12-6.66-.9-2.14 1.22-3.23 3.62-2.5 6.07C7.68 9.61 4.5 7.9 2.2 5.09c-.83 1.4-1.28 2.95-1.28 4.63 0 3.2 1.63 6.02 4.1 7.64-1.43-.04-2.76-.44-3.92-1.08v.07c0 2.6 1.85 4.75 4.3 5.23-.45.12-.92.19-1.4.19-.34 0-.67-.03-1-.09.68 2.13 2.66 3.69 5.01 3.73-1.83 1.44-4.13 2.29-6.62 2.29-.43 0-.85-.02-1.27-.06 2.37 1.51 5.18 2.38 8.18 2.38 9.8 0 15.17-8.12 15.17-15.17v-.68c1.04-.75 1.94-1.68 2.65-2.67z"/>
        </svg>
      </a>
      {/* Instagram share is more complex for direct text/URL share from web,
          typically involves opening instagram.com and user manually pasting.
          This will just open Instagram. */}
      <a
        href="https://www.instagram.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        aria-label="Share on Instagram"
      >
        <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24" className="w-5 h-5">
          <path d="M7.5 2C4.46 2 2 4.46 2 7.5v9C2 19.54 4.46 22 7.5 22h9c3.04 0 5.5-2.46 5.5-5.5v-9C22 4.46 19.54 2 16.5 2h-9zm0 2h9C18.42 4 20 5.58 20 7.5v9c0 1.92-1.58 3.5-3.5 3.5h-9C5.58 20 4 18.42 4 16.5v-9C4 5.58 5.58 4 7.5 4zm4.5 4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm4.5-5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
        </svg>
      </a>
    </div>
  );
};
