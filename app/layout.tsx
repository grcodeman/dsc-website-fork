import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from 'next/font/google';

// Define fonts with next/font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Data Science Club at WMU",
  description: "Student club at WMU focused on Data Science, AI and ML",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
