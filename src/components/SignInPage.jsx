import React from 'react'
import { Button } from './ui/button'
import { signIn } from '../lib/auth'

function SignInPage() {
  return (
    <div>
        <form action={async ()=>{
            'use server'
            await signIn("google")
        }}>
            <Button type="submit">Sign in With google</Button>
        </form>
    </div>
  )
}

export default SignInPage