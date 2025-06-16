import React from 'react'
import { IoLogoGoogle } from 'react-icons/io5'
import { signIn } from '../../../auth'
import { signInWithGoogle } from '../api/googleLogin'

const GoogleButton = () => {
    return (
        <form action={async()=>{
            await signInWithGoogle();
        }}>
            <button type='submit' className='flex items-center justify-center w-full p-2 bg-[#4285F4] text-white rounded-lg shadow-md cursor-pointer hover:bg-[#357AE8]'>
                <IoLogoGoogle className='w-6 h-6' />
                <span className='ml-2'>Sign in with Google</span>
            </button>
        </form>
    )
}

export default GoogleButton
