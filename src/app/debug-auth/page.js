// Debug page to check OAuth configuration
export default function AuthDebug() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const googleRedirectUri = `${baseUrl}/api/auth/callback/google`;
  
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Auth Configuration Debug</h1>
      <div style={{ marginBottom: '10px' }}>
        <strong>NEXTAUTH_URL:</strong> {process.env.NEXTAUTH_URL || 'Not set'}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Google Client ID:</strong> {process.env.GOOGLE_CLIENT_ID || 'Not set'}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <strong>Expected Redirect URI:</strong> 
        <div style={{ 
          background: '#f0f0f0', 
          padding: '10px', 
          margin: '5px 0',
          border: '1px solid #ccc'
        }}>
          {googleRedirectUri}
        </div>
      </div>
      <div style={{ marginTop: '20px', color: '#666' }}>
        <p>Add the "Expected Redirect URI" above to your Google Cloud Console OAuth client.</p>
        <p>Path: Google Cloud Console → APIs & Credentials → OAuth 2.0 Client IDs → Your Client → Authorized redirect URIs</p>
      </div>
    </div>
  );
}