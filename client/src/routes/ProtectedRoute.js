import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children }) => {
    const isAuthenticated = false
    return isAuthenticated ? children : <Navigate to='/login' />
}

export { RequireAuth }
