import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './layouts/navbar/Navbar'

const App = () => {
    const [isInitialising, setIsInitialising] = useState(true)

    useEffect(() => {
        console.log('hi')
        setTimeout(() => {
            setIsInitialising(false)
        }, 3000)
    })

    if (isInitialising) {
        return (
            // Note: initialise user auth on load. show spinner if initialising else components
            <div className='bg-indigo-500 relative flex justify-center items-center h-20'>
                <div className='w-8 h-8 border-2 border-t-transparent border-white rounded-full animate-spin'></div>
            </div>
        )
    }
    return (
        <div className='prose'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export { App }
