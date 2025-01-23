import Footer from '@/app/components/footer';
import { serif } from '@/app/components/ui/fonts';
import '@/app/globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Anthony DePaul Masonry Inc.',
  description: 'Anthony DePaul Masonry Inc.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col items-center w-full max-w-screen min-h-screen bg-theme-light-gray ${serif.className} text-lg subpixel-antialiased text-theme-dark-gray`}
      >
        <div className="fixed w-full p-1 text-center bg-neutral-900/85 text-theme-gold font-sans z-50">
          This website is for demonstration purposes only and is not the official site. For more information, visit the&nbsp;
          <Link
            href="https://adepaul.dev/projects/anthonydepaulmasonryinc.com"
            className="underline text-nowrap"
          >
            write-up
          </Link>
          .
        </div>
        <main className="relative grow w-full flex flex-col items-stretch">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
