import { Route } from 'react-router-dom'
import { Register } from '../../features/authentication/Register'

const RegisterRoute = () => {
    return (
        <Route
            key='registration-route'
            path='register'
            element={<Register />}
        />
    )
}

export { RegisterRoute }
