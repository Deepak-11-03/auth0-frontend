
import { auth0 } from "@/lib/auth0";
import Auth from './components/Auth';
import { SessionData } from "@auth0/nextjs-auth0/types";

export default async function Home() {
  const session: SessionData | null = await auth0.getSession();
  if (!session) {
    return (
      <main className='flex flex-col gap-4 items-center justify-center h-screen bg-gray-900 text-white'>
        <h1 className='text-2xl font-bold'>Welcome to our app!</h1>
        <a href="/auth/login">    
          <button className='px-4 py-2 rounded-sm bg-white text-black'>Log in</button>
        </a>
      </main>
    );
  }

  return (
    <main>
      <Auth session={session}/>
    </main>
  )
}