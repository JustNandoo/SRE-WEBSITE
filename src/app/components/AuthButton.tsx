import React from 'react'
import { useFormStatus } from 'react-dom'

const AuthButton = ({label }: {label : string}) => {
    const {pending} = useFormStatus()
  return (
    <button
      type="submit"
      className={`inline-flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${pending ? 'cursor-not-allowed' : ''}`}
      disabled={pending}
    >
      {pending ? 'Loading...' : label}
    </button>
  )
}

export default AuthButton
