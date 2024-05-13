import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'

const router = createBrowserRouter([
  {
    element: <Layout />,
       path: '/',
  }])
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App