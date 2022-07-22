import { Route } from 'react-router-dom'
import { Feed } from '../../features/feed/Feed'
import { RequireAuth } from '../ProtectedRoute'

const FeedRoute = () => {
    return (
        <Route
            key='feed-route'
            path='feed'
            element={
                <RequireAuth>
                    <Feed />
                </RequireAuth>
            }
        ></Route>
    )
}

export { FeedRoute }
