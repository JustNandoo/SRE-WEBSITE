'use client';
import { useActionState } from 'react'
import { signUpCredentials } from '../../../../lib/actions'
import Link from 'next/link'
import AuthButton from '../AuthButton';
import GoogleButton from '../GoogleButton';
const FormRegister = () => {
    const [state, formAction] = useActionState(signUpCredentials,null);
    return (
        <form className="space-y-8" action={formAction}>
            {
                state?.message ? (
                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">{state.message}</div>
                ) : null
            }
            <div>
                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Full Name</label>
                <input type="text" name="name" id="name" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-b-lg w-full p-2' placeholder='Full Name' />
                <div aria-live="polite">
                    <span className='text-red-500  text-sm mt-2'>{state?.error?.name}</span>
                </div>
            </div>
            <div>
                <label htmlFor="email" className='block text-sm font-medium leading-6 text-gray-900'>Email</label>
                <input type="email" name="email" id="email" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-b-lg w-full p-2' placeholder='srepens@pens.ac.id'/>
                <div aria-live="polite">
                    <span className='text-red-500  text-sm mt-2'>{state?.error?.email}</span>
                </div>
            </div>
            <div>
                <label htmlFor="password" className='block text-sm font-medium leading-6 text-gray-900'>Password</label>
                <input type="password" name="password" id="password" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-b-lg w-full p-2'  placeholder='password'/>
                <div aria-live="polite">
                    <span className='text-red-500  text-sm mt-2'>{state?.error?.password}</span>
                </div>
            </div>
            <div>
                <label htmlFor="confPassword" className='block text-sm font-medium leading-6 text-gray-900'>Confirm Password</label>
                <input type="password" name="confPassword" id="confPassword" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-b-lg w-full p-2' placeholder='confirm password'/>
                <div aria-live="polite">
                    <span className='text-red-500  text-sm mt-2'>{state?.error?.confPassword}</span>
                </div>
            </div>
            <AuthButton label="Sign Up"/>
            <div className="flex items-center justify-between">
            <p className='text-center' >Already have an account? </p> <Link href="/login" className='text-sm font-semibold leading-6 text-[#012e21] hover:text-[#012e20]'>Sign in</Link>
            </div>
        </form>
    )
}

export default FormRegister
