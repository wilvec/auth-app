import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import AuthProvider from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/Dashboard";
import Products from "./pages/products";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;
