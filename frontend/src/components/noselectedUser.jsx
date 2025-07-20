import React from 'react'
import { MessageCircleCode} from "lucide-react";

function NoSelectedUser() {
  return (
    <div className='w-full'>
        <div className='w-full h-full flex flex-col items-center justify-center p-16 bg-base-100/50'>
            <div className='p-3 bg-warning/20 rounded-2xl animate-bounce'>
                <MessageCircleCode className='text-warning'/>
            </div>
            <h1 className='text-2xl font-bold text-warning mb-4'>Welcome to chatty!</h1>
            <p className='text-center'>Select a conversation from sidebar to start chatting</p>
        </div>
    </div>
  )
}

export default NoSelectedUser