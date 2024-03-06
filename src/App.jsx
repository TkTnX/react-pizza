import { Header } from "./components/header/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./scss/app.scss";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
