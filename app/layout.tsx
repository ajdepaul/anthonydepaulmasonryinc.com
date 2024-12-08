import Footer from '@/app/components/footer';
import { serif } from '@/app/components/ui/fonts';
import '@/app/globals.css'; import type { Metadata } from 'next';

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
        <main className="relative grow w-full flex flex-col items-stretch">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
