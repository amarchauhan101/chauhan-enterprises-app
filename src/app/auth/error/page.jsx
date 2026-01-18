"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error === 'OAuthSignin' && 'Error in constructing an authorization URL.'}
            {error === 'OAuthCallback' && 'Error in handling the response from an OAuth provider.'}
            {error === 'OAuthCreateAccount' && 'Could not create OAuth provider user in the database.'}
            {error === 'EmailCreateAccount' && 'Could not create email provider user in the database.'}
            {error === 'Callback' && 'Error in the OAuth callback handler route.'}
            {error === 'OAuthAccountNotLinked' && 'Email on the account is already linked, but not with this OAuth account.'}
            {error === 'EmailSignin' && 'Sending the e-mail with the verification token failed.'}
            {error === 'CredentialsSignin' && 'The authorize callback returned null in the Credentials provider.'}
            {error === 'SessionRequired' && 'The content of this page requires you to be signed in at all times.'}
            {!error && 'An unknown authentication error occurred.'}
          </p>
        </div>
        <div className="mt-8">
          <Link href="/auth/signin">
            <Button className="w-full">
              Try Again
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}