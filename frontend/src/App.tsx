import { Route, Routes, useNavigate } from 'react-router-dom'
import { setNavigate } from './utils/navigate.utils'
import { MainLayout } from './Layouts/MainLayout'
import { Home } from './pages/Home'
import { CreatePost } from './pages/CreatePost'
import { EditPost } from './pages/EditPost'
import { SimpleLayout } from './Layouts/SimpleLayout'
import { PostDetail } from './pages/PostDetail'
import { Profile } from './pages/Profile'
import { Auth } from './pages/Auth'
import { NotFound } from './pages/NotFound'
import { About } from './pages/About'
import { Categories } from './pages/Categories'
import { AdminLayout } from './Layouts/AdminLayout'
import { AdminOverview } from './pages/AdminOverview'
import { AdminComments } from './pages/AdminComments'
import { AdminCategories } from './pages/AdminCategories'
import { AdminPosts } from './pages/AdminPosts'
import { AdminUsers } from './pages/AdminUsers'
import { ResetPassword } from './pages/ResetPassword'
import { ForgotPassword } from './pages/ForgotPassword'
import { AuthLayout } from './Layouts/AuthLayout'
import { AdminGuard } from './components/AdminGuard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import { SearchResults } from './pages/SearchResults'
import { CategoryPage } from './pages/CategoryPage'
import { Settings } from './pages/Settings'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'
import { Contact } from './pages/Contact'
import { Cookies } from './pages/Cookies'

function App() {
  const navigate = useNavigate();
  setNavigate(navigate)
  return (

    <>
      <Toaster position="top-left" />
      <Routes>

        <Route element={<ProtectedRoute />}>
          <Route element={<SimpleLayout />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/settings" element={<Settings />} />

          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route element={<Home />} path='/' />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/search" element={<SearchResults />} />

        </Route>
        <Route element={<SimpleLayout />}>
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/cookies" element={<Cookies />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth" element={<Auth />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<AdminGuard />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminOverview />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/posts" element={<AdminPosts />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/comments" element={<AdminComments />} />
          </Route>
        </Route>
        <Route path="/*" element={<NotFound />} />

      </Routes>
    </>
  )
}

export default App
