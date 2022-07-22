import { LoginRoute } from './authentication/LoginRoute'
import { RegisterRoute } from './authentication/RegisterRoute'
import { FeedRoute } from './feed/FeedRoute'

const appRoutes = [LoginRoute(), RegisterRoute(), FeedRoute()]

export { appRoutes }
