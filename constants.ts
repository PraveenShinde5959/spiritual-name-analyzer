
export enum NavigationRoute {
  Home = '/',
  Analyzer = '/analyzer',
  Reports = '/reports',
  Pricing = '/pricing',
  About = '/about',
}

export const NAV_LINKS = [
  // All navigation links removed as per user request.
];

export const SOCIAL_SHARE_LINKS = {
  whatsapp: (text: string, url: string) => `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
  instagram: (text: string) => `https://www.instagram.com/share?text=${encodeURIComponent(text)}`, // Instagram doesn't support direct text share easily for web
  twitter: (text: string, url: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
};

export const SAMPLE_REPORT_PDF_URL = 'https://www.africau.edu/images/default/sample.pdf'; // Placeholder URL
