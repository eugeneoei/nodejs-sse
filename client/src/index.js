import reportWebVitals from './reportWebVitals'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { App } from './App'
import { appRoutes } from './routes'

const rootElement = document.getElementById('root')
render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}>
                {appRoutes}
            </Route>
        </Routes>
    </BrowserRouter>,
    rootElement
)

reportWebVitals()
