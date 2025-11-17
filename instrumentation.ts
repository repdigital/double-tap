export async function register() {
  // Optional instrumentation for Next.js 15+
  // Prevents "Can't resolve 'private-next-instrumentation-client'" warning in dev
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side instrumentation (if needed)
  }
}
