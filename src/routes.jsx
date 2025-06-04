import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DishDetails from "./pages/DishDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import SellerDashboard from "./pages/SellerDashboard";
import AddDish from "./pages/AddDish";
import OrderHistory from "./pages/OrderHistory";
import ComponentPreview from "./pages/ComponentPreview";
import CheckoutPage from "./pages/CheckoutPage"; // Ny import
import OrderConfirmationPage from "./pages/OrderConfirmationPage"; // Ny import
import SellerOrdersPage from "./pages/SellerOrdersPage"; // Ny import
import ProtectedRoute from "./components/ProtectedRoute";

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dish/:id" element={<DishDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <CheckoutPage />
        </ProtectedRoute>
      } />
      <Route path="/order-confirmation/:orderId" element={ // Route för orderbekräftelse
          <OrderConfirmationPage />
      } />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller"
        element={
          <ProtectedRoute>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/seller/orders" // Ny route för säljarordrar
        element={
          <ProtectedRoute><SellerOrdersPage /></ProtectedRoute>
        }
      />
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddDish />
          </ProtectedRoute>
        }
      />
      <Route path="/orders" element={<OrderHistory />} />
      <Route path="/preview" element={<ComponentPreview />} />
    </Routes>
  );
}
