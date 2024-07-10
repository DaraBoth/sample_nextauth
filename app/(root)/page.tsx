import Link from "next/link";
import { auth } from "@/lib";
import { getGroupByUserID } from "../services/api";

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

export default async function Home() {

    const session:any = await auth();
    const getRandomColor = () => {
        const colors = ['#fca5a5', '#fcd34d', '#68d391', '#63b3ed', '#a0aec0']; // Add more colors as needed
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    };

    try {

        const notes: Data = await getGroupByUserID(Number(session?.user?.email));

        return (
            <div className="mx-auto container pb-10 px-6">
                <div className="mb-6">
                    <Link
                        href={"/newnote"}
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline-block mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        New Note
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {notes.data.map((note) => (
                        <Link
                            key={note.id}
                            href={`/table?id=${note.id}`}
                            className="rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200"
                            style={{ backgroundColor: getRandomColor() }}
                        >
                            <div className="p-6">
                                <h4 className="text-gray-800 font-semibold text-lg mb-2">{note.grp_name}</h4>
                                <p className="text-gray-600 text-sm">{note.description}</p>
                            </div>
                            <div className="flex items-center justify-between bg-gray-100 p-4">
                                <p className="text-xs text-gray-600">{note.create_date}</p>
                                <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="icon icon-tabler icon-tabler-trash"
                                        width={20}
                                        height={20}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error (e.g., show an error message to the user)
        return (
            <div className="mx-auto container pb-10 px-6">
                <div className="mb-6">
                    <button className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 inline-block mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        New Note
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    no content
                </div>
            </div>
        )
    }
}
