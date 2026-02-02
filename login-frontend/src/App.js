import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Receipts from "./Receipts";
import CDAReceipt from "./CDAReceipt";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/receipts" element={<Receipts />} />
      <Route path="/cda-receipt" element={<CDAReceipt />} />
    </Routes>
  );
}

export default App;
