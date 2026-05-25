import { Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import Receipts from "./Receipts";
import CDAReceipt from "./CDAReceipt";
import Bills from "./Bills";
import CdaBillPage from "./CdaBillPage";
import PCDAReceipt from "./PCDAReceipt";
import PCDABills from "./PCDABills";
import PCdaBillPage from "./PCdaBillPage";
import CashReceipt from "./CashReceipt";
import ChequeDdReceipt from "./ChequeDdReceipt";

function App() {

  return (

    <Routes>

      <Route path="/" element={<LoginPage />} />

      <Route path="/receipts" element={<Receipts />} />

      <Route path="/cda-receipt" element={<CDAReceipt />} />

      <Route path="/bills" element={<Bills />} />

      <Route path="/cdabillpage" element={<CdaBillPage />} />

      <Route path="/pcda-receipt" element={<PCDAReceipt />} />

      <Route path="/pcdabills" element={<PCDABills />} />

      <Route path="/pcdabillpage" element={<PCdaBillPage />} />

      <Route path="/cash" element={<CashReceipt />} />

      <Route
        path="/cheque-dd-receipt"
        element={<ChequeDdReceipt />}
      />

    </Routes>

  );
}

export default App;