import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/sidebar';
import NoSelectedUser from '../components/noselectedUser';
import Chat from '../components/Chat';
function Home() {
  const {selectedUser} = useChatStore();
  return (
    <div className='h-screen bg-base-200 w-full'>
      
      <div className='flex items-center justify-center pt-20 px-4 w-full'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden w-full'>
            <Sidebar/>
            {!selectedUser ? <NoSelectedUser/>:<Chat/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home