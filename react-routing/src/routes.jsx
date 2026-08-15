import App from './App.jsx'
import Profile from "./Profile.jsx"
import ErrorPage from "./errorElement.jsx"

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile/:name",
    element: <Profile />,
  },
]

export default routes;