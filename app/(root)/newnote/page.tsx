import React from 'react'
import NewNoteForm from './_form/NewNoteForm';
import { auth } from '@/lib';

const Page = async () => {
    const session:any = await auth();

    return (
        <NewNoteForm userID={session?.user?.email} />
    );
}

export default Page