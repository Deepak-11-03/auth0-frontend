'use client'
import axios from 'axios';
import { useState } from 'react'
import Spinner from './Spinner';

const Auth = ({ session }: any) => {

    const user = session?.user;
    const [isSending, setIsSending] = useState(false);


    const sendTokenToBackend = async () => {
        if (!user) return;

        if (user) {
            setIsSending(true);
            await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/callback`, { email: user?.email, token: session?.tokenSet.accessToken });
            setIsSending(false);
        }
    };
    return (
        <div className='flex flex-col gap-4 items-center justify-center h-screen bg-gray-900 text-white'>
            <h1 className='text-bold text-2xl'>Welcome, {user.name}</h1>
            <button disabled={isSending} className={`px-4 py-2 flex flex-row gap-2 items-center rounded-sm  text-black ${isSending ? 'bg-gray-300' : 'bg-white'}`} onClick={sendTokenToBackend}>
                {isSending && <Spinner />}
                <span>{isSending ? 'Sending...' : 'Send Token to Backend'}</span>
            </button>
            <a href="/auth/logout">
                <button disabled={isSending} className='px-4 py-2 rounded-sm bg-red-600 text-white'>
                    Logout
                </button>
            </a>
        </div>
    )
}

export default Auth

