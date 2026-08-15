import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center space-y-4">
      <h1 className="text-6xl font-black text-violet-400">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-sm text-muted-foreground max-w-md">
        The requested algorithmic resource or topic page could not be located.
      </p>
      <Link href="/" className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all">
        Back to Dashboard
      </Link>
    </div>
  );
}
