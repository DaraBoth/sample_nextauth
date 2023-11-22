"use client"
import React, { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { signOut } from 'next-auth/react';
import Link from 'next/link'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleSignout = async () => {
        return await signOut();
    }

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <Image
                            width={0}
                            height={0}
                            typeof='image/png'
                            className="h-8 w-auto"
                            priority={true}
                            src={"/heart.svg"}
                            alt="" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {!mobileMenuOpen && <Bars3Icon className="h-6 w-6" aria-hidden="true" />}
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Link href="/" className="text-sm font-semibold leading-6 text-gray-900">
                        Home
                    </Link>
                    <Link href="/note" className="text-sm font-semibold leading-6 text-gray-900">
                        Note
                    </Link>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    <button
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={handleSignout}
                    >
                        <span aria-hidden="true"><ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /></span>
                    </button>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <Image
                                width={0}
                                height={0}
                                className="h-8 w-auto"
                                priority={true}
                                src={"/heart.svg"}
                                alt=""
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    href="/"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    onClick={() => setMobileMenuOpen(false)}
                                    href="/note"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Note
                                </Link>

                            </div>
                            <div className="py-6">
                                <button
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    onClick={handleSignout}
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}

export default Header