// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // This is where Tailwind's styles are injected

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Image Gallery',
  description: 'A modern image gallery with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}