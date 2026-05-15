import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AdminProvider } from './contexts/AdminContext'
import Header from './components/Header'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'
import MobileBottomCTA from './components/MobileBottomCTA'
import ScrollToTop from './components/ScrollToTop'
import GTMInjector from './components/GTMInjector'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Rooms from './pages/Rooms'
import RoomPage from './pages/RoomPage'
import FAQ from './pages/FAQ'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import Dining from './pages/Dining'
import Wedding from './pages/Wedding'
import UjjainDarshan from './pages/UjjainDarshan'

// Amenities
import Pool from './pages/amenities/Pool'
import Gym from './pages/amenities/Gym'
import BanquetHall from './pages/amenities/BanquetHall'
import PartyHall from './pages/amenities/PartyHall'
import Amenities from './pages/amenities/Amenities'

// Blog
import BlogHome from './pages/blog/BlogHome'
import BlogPost from './pages/blog/BlogPost'
import BlogCategory from './pages/blog/BlogCategory'

// Admin — lazy loaded (reduces initial bundle)
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminContent = lazy(() => import('./pages/admin/AdminContent'))
const AdminRooms = lazy(() => import('./pages/admin/AdminRooms'))
const AdminImages = lazy(() => import('./pages/admin/AdminImages'))
const AdminSEO = lazy(() => import('./pages/admin/AdminSEO'))
const AdminGTM = lazy(() => import('./pages/admin/AdminGTM'))
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'))
const AdminBlog = lazy(() => import('./pages/admin/AdminBlog'))
const AdminBlogEditor = lazy(() => import('./pages/admin/AdminBlogEditor'))

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatingCTA />
      <MobileBottomCTA />
    </>
  )
}

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
    </div>
  )
}

export default function App() {
  return (
    <AdminProvider configKey="msp_config">
      <GTMInjector />
      <ScrollToTop />
      <Suspense fallback={<AdminFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
        <Route path="/rooms" element={<PublicLayout><Rooms /></PublicLayout>} />
        <Route path="/rooms/:slug" element={<PublicLayout><RoomPage /></PublicLayout>} />
        <Route path="/dining" element={<PublicLayout><Dining /></PublicLayout>} />
        <Route path="/wedding" element={<PublicLayout><Wedding /></PublicLayout>} />
        <Route path="/ujjain-darshan" element={<PublicLayout><UjjainDarshan /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />

        {/* Amenities */}
        <Route path="/amenities" element={<PublicLayout><Amenities /></PublicLayout>} />
        <Route path="/amenities/pool" element={<PublicLayout><Pool /></PublicLayout>} />
        <Route path="/amenities/gym" element={<PublicLayout><Gym /></PublicLayout>} />
        <Route path="/amenities/banquet" element={<PublicLayout><BanquetHall /></PublicLayout>} />
        <Route path="/amenities/party-hall" element={<PublicLayout><PartyHall /></PublicLayout>} />

        {/* Blog */}
        <Route path="/blog" element={<PublicLayout><BlogHome /></PublicLayout>} />
        <Route path="/blog/category/:cat" element={<PublicLayout><BlogCategory /></PublicLayout>} />
        <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="rooms" element={<AdminRooms />} />
          <Route path="images" element={<AdminImages />} />
          <Route path="seo" element={<AdminSEO />} />
          <Route path="gtm" element={<AdminGTM />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="blog" element={<AdminBlog />} />
          <Route path="blog/new" element={<AdminBlogEditor />} />
          <Route path="blog/edit/:slug" element={<AdminBlogEditor />} />
        </Route>
      </Routes>
      </Suspense>
    </AdminProvider>
  )
}
