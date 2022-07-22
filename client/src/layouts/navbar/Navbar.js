import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='p-3'>
            <Link to='/' className='inline-block mx-3'>
                Home
            </Link>
            <Link to='/login' className='inline-block mx-3'>
                Login
            </Link>
            <Link to='/register' className='inline-block mx-3'>
                Register
            </Link>
            <Link to='/feed' className='inline-block mx-3'>
                Feed
            </Link>
        </div>
    )
}

export { Navbar }
