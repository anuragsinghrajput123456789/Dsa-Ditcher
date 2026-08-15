import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlgoSpark | Full-Stack MERN AI-Powered DSA Learning Hub',
  description: 'Master Data Structures & Algorithms with interactive visualizers, connected SVG roadmap trackways, browser Monaco editor, Big-O complexity analysis, and resilient AI tutoring.',
  keywords: ['DSA', 'Data Structures', 'Algorithms', 'LeetCode', 'Monaco Editor', 'AI Tutor', 'Algorithm Visualizer', 'Big O Complexity'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" theme="dark" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
