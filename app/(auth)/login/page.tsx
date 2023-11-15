"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'

const Page = () => {
    const router = useRouter()
    const [InputValue, setInputValue] = useState({
        isLoading: 0,
        username: "",
        password: ""
    })

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target } = event;
        setInputValue({ ...InputValue, [target.name]: target.value })
    }

    const onSubmit = async () => {
        setInputValue({ ...InputValue, isLoading: 1 })
        if (InputValue.isLoading != 1) {
            const result = await signIn('credentials', {
                username: InputValue.username,
                password: InputValue.password,
                redirect: false
            })
            if (result?.ok) {
                setInputValue({ ...InputValue, isLoading: 2 })
                router.push("/");
            } else {
                setInputValue({ ...InputValue, isLoading: 0 })
            }
        }
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    NextAuth Sample
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" method="POST">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                id="username"
                                name="username"
                                type="username"
                                autoComplete="username"
                                required
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block  text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                onChange={handleChange}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                required
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={onSubmit} disabled={InputValue.isLoading == 1}
                            type="submit"
                            className={clsx("block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline- focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                                {
                                    'bg-yellow-400 text-white': InputValue.isLoading == 1,
                                    'bg-green-500 text-white': InputValue.isLoading == 2,
                                },
                            )}
                        >
                            {InputValue.isLoading == 0 && "Sign In"}
                            {InputValue.isLoading == 1 && "loading...."}
                            {InputValue.isLoading == 2 && "Success"}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don&apos;t have an account?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Go register
                    </a>
                </p>
            </div>
        </div>

    )
}

export default Page