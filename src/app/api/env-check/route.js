// API route to check environment variables (for debugging)
export async function GET() {
  const envCheck = {
    NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    MONGO_URL: !!process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
  };

  // Don't expose actual values, just check if they exist
  return Response.json({
    message: "Environment check",
    variables: envCheck,
    allSet: Object.values(envCheck).every(Boolean)
  });
}