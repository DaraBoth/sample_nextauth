import React from 'react'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'
import FormLogin from './_formLogin/FormLogin'

const Page = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    NextAuth
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <FormLogin />
                <p className="mt-10 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <a target="_blank" href="https://www.tinynotie.bio" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Go register
                    </a>
                </p>
            </div>
        </div>

    )
}

export default Page