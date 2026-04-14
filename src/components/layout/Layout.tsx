import { Outlet } from 'react-router-dom'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}