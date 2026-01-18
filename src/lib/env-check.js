// Environment configuration checker for debugging
export function checkEnvironmentConfig() {
  const requiredEnvVars = [
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'MONGO_URL'
  ];

  const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing);
    return false;
  }

  console.log('✅ All required environment variables are present');
  
  // Additional checks
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_SECRET.length < 32) {
    console.warn('⚠️  NEXTAUTH_SECRET should be at least 32 characters long');
  }

  if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.startsWith('http')) {
    console.warn('⚠️  NEXTAUTH_URL should start with http:// or https://');
  }

  return true;
}

// Auto-check in development
if (process.env.NODE_ENV === 'development') {
  checkEnvironmentConfig();
}