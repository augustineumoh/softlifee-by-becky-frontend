import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/homePage'
import ShopPage from './pages/shopPage'
import NewArrivalsPage from './pages/newArrivalsPage'
import ProductPage from './pages/productPage'
import CartPage from './pages/cartPage'
import CheckoutPage from './pages/checkoutPage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/notFoundPage'
import GiftIdeaPage from './pages/GiftIdeaPage'
import OrderSuccessPage from './pages/Ordersuccesspage'
import { useEffect } from 'react'
import { useAuth } from './store/authStore'
import AccountEditPage from './pages/AccountEditPage'
import OrderDetailPage from './pages/OrderDetailPage'
import ReturnPolicyPage from './pages/ReturnPolicyPage'
import FAQPage from './pages/FAQPage'
import UnsubscribePage from './pages/UnsubscribePage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ResetPasswordPage from './pages/ResetPasswordPage'



export default function App() {
   const { loadUser } = useAuth()

  useEffect(() => {
    loadUser() // restore session on page refresh

    // Ping the API on first load to wake up the Railway server so images
    // and product data don't suffer a cold-start delay when the user navigates.
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
    fetch(`${API_BASE}/products/?page=1`, { method: 'GET' }).catch(() => {})
  }, [])
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"                              element={<HomePage />} />
          <Route path="/shop"                          element={<ShopPage />} />
          <Route path="/shop/:category"                element={<ShopPage />} />
          <Route path="/shop/:category/:subcategory"   element={<ShopPage />} />
          <Route path="/new-arrivals"                  element={<NewArrivalsPage />} />
          <Route path="/product/:slug"                 element={<ProductPage />} />
          <Route path="/cart"                          element={<CartPage />} />
          <Route path="/checkout"                      element={<CheckoutPage />} />
          <Route path="/login"                         element={<LoginPage />} />
          <Route path="/register"                      element={<RegisterPage />} />
          <Route path="/account"                       element={<AccountPage />} />
          <Route path="/about"                         element={<AboutPage />} />
          <Route path="/contact"                       element={<ContactPage />} />
          <Route path="/giftideas"                     element={<GiftIdeaPage />} />
          <Route path="/order-success"                element={<OrderSuccessPage />} />
          <Route path="*"                              element={<NotFoundPage />} />
          <Route path="/account/edit"                 element={<AccountEditPage />} />
          <Route path="/account/orders/:orderNumber"  element={<OrderDetailPage />} />
          <Route path="/returns-policy"               element={<ReturnPolicyPage />} />
          <Route path="/privacy-policy"              element={<PrivacyPolicyPage />} />
          <Route path="/privacy"                     element={<PrivacyPolicyPage />} />
          <Route path="/faqs"                         element={<FAQPage />} />
          <Route path="/unsubscribe"                  element={<UnsubscribePage />} />
          <Route path="/forgot-password"              element={<ForgotPasswordPage />} />
          <Route path="/reset-password"               element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}