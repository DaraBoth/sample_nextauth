"use client"
import React, { useState } from 'react'
import clsx from 'clsx'
import { signIn } from 'next-auth/react'
import { redirect } from 'next/navigation'

const FormLogin = () => {
    const [isLoading, setIsLoading] = useState(0) // 0 false / 1 true / 2 error / 3 success
    return (
        <form action={async (formData: FormData) => {
            setIsLoading(1);
            const result = await signIn('credentials', {
                username: formData.get("username"),
                password: formData.get("password"),
                redirect: false
            })
            if(result?.ok){
                setIsLoading(3);
                redirect("/");
            }else {
                setIsLoading(2);
                setTimeout(()=>{
                    setIsLoading(0);
                },1500)
            }
        }} className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    Username
                </label>
                <div className="mt-2">
                    <input
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
                    className={clsx("block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline- focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                    {
                        "bg-gray-500 text-gray-50":isLoading==1,
                        "bg-yellow-400":isLoading==2,
                        "bg-green-600":isLoading==3
                    }
                    )}
                >
                    {isLoading==0 && "Sign In"}
                    {isLoading==1 && "wait..."}
                    {isLoading==2 && "wrong information!"}
                    {isLoading==3 && "Success"}
                </button>
            </div>
        </form>
    )
}

export default FormLogin