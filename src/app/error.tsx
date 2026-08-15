'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center space-y-4">
      <h1 className="text-4xl font-bold text-rose-400">Application Error</h1>
      <p className="text-xs text-muted-foreground max-w-md">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-all"
      >
        Try Again
      </button>
    </div>
  );
}
