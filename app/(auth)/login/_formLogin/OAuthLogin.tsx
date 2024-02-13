"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

const OAuthLogin = () => {

    const googleSignin = () => signIn('google', { callbackUrl: "http://localhost:4500" })

    return (
        <p className="mt-10 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <button onClick={googleSignin} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                use Google
            </button>
        </p>
    )
}

export default OAuthLogin