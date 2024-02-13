"use client"
import Link from "next/link";
import React from "react";

export default function Setting() {

    return (
        <nav className="2xl:container 2xl:mx-auto ">
            {/* For large and Medium-sized Screen */}
            <div className="flex justify-between">
                <Link href={"/"} className="rounded-md flex w-10 h-10 font-normal text-sm  text-indigo-700 border-indigo-700 focus:outline-none justify-center items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                </Link>
            </div>
        </nav>
    );
}
