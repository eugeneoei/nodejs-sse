import { Route } from 'react-router-dom'
import { Login } from '../../features/authentication/Login'

const LoginRoute = () => {
    return <Route key='login-route' path='login' element={<Login />} />
}

export { LoginRoute }
