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
            <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 gap-4">
                {
                    groups.data.map((group, index) => {
                        return (
                            <Link key={group.id} href={`/table?id=${group.id}`}>
                                <div className="p-3 md:p-4 bg-slate-50 border border-gray-200 hover:shadow rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
                                    <p className="mb-2 font-semibold tracking-tight text-gray-900 dark:text-white">{group.grp_name}</p>
                                    <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">{group.description}</p>
                                    <p className="mb-0 text-xs text-gray-500 dark:text-gray-400">{group.create_date}</p>
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