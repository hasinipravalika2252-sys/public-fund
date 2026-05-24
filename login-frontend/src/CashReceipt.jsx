import React, { useState, useContext } from "react";
import { AppContext } from "./context/AppContext";
import axios from "axios";
import "./CashReceipt.css";

function CashReceipt() {

  const { trDate } = useContext(AppContext);

  // FORM STATE
  const [formData, setFormData] = useState({
    receiptNo: "",
    referenceNo: "",
    fromAddress: "",
    purpose: "",
    chequeReceiptDate: "",
    amount: ""
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // SAVE FUNCTION
  const handleSave = async () => {

    console.log("TR DATE FROM CONTEXT:", trDate);

    if (!trDate) {
      alert("Login date not found. Please login again.");
      return;
    }

    const updatedData = {
      ...formData,
      trDate: trDate
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/cash/save",
        updatedData
      );

      console.log("SERVER RESPONSE:", response.data);

      alert("Cash Receipt Saved Successfully");

      // optional reset
      setFormData({
        receiptNo: "",
        referenceNo: "",
        fromAddress: "",
        purpose: "",
        chequeReceiptDate: "",
        amount: ""
      });

    } catch (error) {
      console.log("SAVE ERROR:", error);
      alert("Save Failed");
    }
  };

  return (
    <div className="cash-page">

      <h1 className="main-title">PUBLIC FUND</h1>
      <h2 className="sub-title">CASH RECEIPT</h2>

      <div className="cash-container">

        <div className="form-group">
          <label>RECEIPT NO :</label>
          <input
  type="number"
  name="receiptNo"
  value={formData.receiptNo}
  onChange={(e) => {
    if (e.target.value.length <= 9) {
      handleChange(e);
    }
  }}
/>
        </div>

        <div className="form-group">
          <label>REFERENCE NO :</label>
          <input
  type="number"
  name="referenceNo"
  value={formData.referenceNo}
  onChange={(e) => {
    if (e.target.value.length <= 9) {
      handleChange(e);
    }
  }}
/>
        </div>

        <div className="form-group">
          <label>FROM ADDRESS :</label>
          <textarea
            name="fromAddress"
            rows="4"
            value={formData.fromAddress}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>PURPOSE :</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>CHEQUE RECEIPT DATE :</label>
          <input
            type="date"
            name="chequeReceiptDate"
            value={formData.chequeReceiptDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>AMOUNT :</label>
          <input
  type="number"
  name="amount"
  value={formData.amount}
  onChange={(e) => {
    if (e.target.value.length <= 9) {
      handleChange(e);
    }
  }}
/>
        </div>

      </div>

      <button className="save-btn" onClick={handleSave}>
        <span>SAVE</span>
      </button>

    </div>
  );
}

export default CashReceipt;