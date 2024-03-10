import { Home } from "./pages/Home.tsx";

import { NotFound } from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import { Cart } from "./pages/Cart.tsx";
import { FullPizza } from "./pages/FullPizza.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="pizza/:id" element={<FullPizza />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
