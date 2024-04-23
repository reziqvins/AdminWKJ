import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProductPage from "./Page/ProductPage";
import Layout from "./Components/Layout/Layout";
import Dashboard from "./Page/Dashboard";
import ChatPage from "./Page/ChatPage";
import OrdersPage from "./Page/OrdersPage";
import SettingPage from "./Page/SettingsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} /> {/* Root path */}
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Products" element={<ProductPage />} />
          <Route path="/Chats" element={<ChatPage />} />
          <Route path="/Orders" element={<OrdersPage />} />
          <Route path="/Settings" element={<SettingPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
