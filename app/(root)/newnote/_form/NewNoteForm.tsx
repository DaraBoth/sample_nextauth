"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { createNote } from '@/app/services/api';

const NewNoteForm = (props: any) => {
    const { userID } = props;
    const router = useRouter()
    const [member, setMember] = useState('');
    const [isLoading, setIsLoading] = useState(0) // 0 false / 1 true / 2 error / 3 success
    const [memberList, setMemberList] = useState<string[]>([]);
    const handleCancel = () => {
        // Handle the cancel logic or navigate back
        return router.push("/");
    };
    const handleAddMember = () => {
        if (member && !memberList.includes(member)) {
            setMemberList([...memberList, member]);
            setMember('');
        }
    };
    return (
        <form action={async (formData: FormData) => {
            setIsLoading(1)
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            const user_id = userID;
            if (title && description && user_id) {
                createNote({ user_id, grp_name: title, description, status: 1, member: JSON.stringify(memberList) })
                setIsLoading(3)
            } else {
                alert("Please fill all fields.")
                setIsLoading(0)
            }
        }} className="flex flex-col md:flex-row">
            <div className="md:w-1/2 px-8 md:p-8">
                <h2 className="text-2xl font-semibold mb-6">Create New Note</h2>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Enter title"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="w-full px-3 py-2 border rounded-md min-h-[40px] focus:outline-none focus:border-blue-500"
                        placeholder="Enter description"
                        rows={4}
                    />
                </div>

            </div>

            <div className="md:w-1/2 px-8 md:p-8">
                <div className="hidden md:w-full md:flex justify-end mb-[14px]">
                    <button
                        type="button"
                        className="border  px-3 py-2 rounded-md hover:border-blue-500 focus:outline-none"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading == 1}
                        className="bg-blue-500 text-white px-3 py-2 ml-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        {isLoading == 0 && "Create Note"}
                        {isLoading == 1 && "Creating Note..."}
                        {isLoading == 3 && "Created"}
                    </button>
                </div>
                <div className="mb-4">
                    <h3 className="block text-gray-700 text-sm font-bold mb-2">Add Member</h3>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            id="member"
                            name="member"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            placeholder="Enter member's name"
                            value={member}
                            onChange={(e) => setMember(e.target.value)}
                        />
                        <button
                            type="button"
                            className="ml-2 border border-blue-700 px-3 py-2 rounded-md hover:border-blue-900 focus:outline-none"
                            onClick={handleAddMember}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-5 w-5 text-blue-700"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="memberList" className="block text-gray-700 text-sm font-bold mb-2">
                        Members
                    </label>
                    <ul className="list-none grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {memberList.map((memberItem, index) => (
                            <li
                                key={memberItem}
                                className="bg-gray-200 p-2 border rounded-md flex justify-between items-center"
                            >
                                <span className="truncate">{memberItem}</span>
                                <button
                                    type="button"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => setMemberList(memberList.filter((m) => m !== memberItem))}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M18 12H6"
                                        />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="md:hidden w-full flex justify-end my-4 ">
                    <button
                        disabled={isLoading == 1}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        {isLoading == 0 && "Create Note"}
                        {isLoading == 1 && "Creating Note..."}
                        {isLoading == 3 && "Created"}
                    </button>
                    <button
                        type="button"
                        className="border ml-2 px-3 py-2 rounded-md hover:border-blue-500 focus:outline-none"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    );
}

export default NewNoteForm