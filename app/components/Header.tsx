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
                    <Link href="/" className="-m-1.5 p-1.5 text-lg font-semibold leading-6 text-gray-900">
                        Tinynotie
                    </Link>
                </div>
                <div className="lg:flex lg:flex-1 lg:justify-end">
                    <button
                        className="text-sm font-semibold leading-6 text-gray-900"
                        onClick={handleSignout}
                    >
                        <span aria-hidden="true"><ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /></span>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header