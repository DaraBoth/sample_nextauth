import { getGroupByUserID } from '@/app/services/api';
import { auth } from '@/lib'
import Link from 'next/link';
import React from 'react'

export type Group = {
    id: number,
    grp_name: string,
    status: number,
    description: string,
    admin_id: number,
    create_date: string
}

type Data = {
    data: Group[]
}

const Page = async () => {

    const session = await auth();
    const groups: Data = await getGroupByUserID(Number(session?.user?.email)); // email ng = groupID

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-1 sm:gap-1 md:grid-cols-3 gap-4">
                {
                    groups.data.map((group, index) => {
                        return (
                            <Link key={group.id} href={`/table?id=${group.id}`}>
                                <div className="p-3 md:p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    <h5 className="mb-2 text-2xl  font-semibold tracking-tight text-gray-900 dark:text-white">{group.grp_name}</h5>
                                    <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{group.description}</p>
                                    <span className="text-left w-full mb-3 font-normal text-gray-500 dark:text-gray-400">{group.create_date}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Page