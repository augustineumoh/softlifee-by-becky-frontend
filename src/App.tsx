import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
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

export default function App() {
  return (
    <BrowserRouter>
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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}