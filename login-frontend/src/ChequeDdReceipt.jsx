import React, { useState } from "react";
import "./ChequeDdReceipt.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChequeDdReceipt = () => {

  const navigate = useNavigate();

  const [receipt, setReceipt] = useState({
    chequeDdNo: "",
    chequeDdDate: "",
    referenceNo: "",
    purpose: "",
    fromWhom: "",
    amount: "",
    bankCreditDate: "",
  });

  const handleChange = (e) => {

    setReceipt({
      ...receipt,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SAVE FUNCTION
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {

        billNo: receipt.chequeDdNo,

        billDate: receipt.chequeDdDate,

        purpose: receipt.purpose,

        billAmount: receipt.amount

      };

      const response = await axios.post(
        "http://localhost:8080/api/bill/save",
        payload
      );

      alert("Saved Successfully");

      console.log(response.data);

      // OPTIONAL RESET
      setReceipt({
        chequeDdNo: "",
        chequeDdDate: "",
        referenceNo: "",
        purpose: "",
        fromWhom: "",
        amount: "",
        bankCreditDate: "",
      });

    } catch (error) {

      console.error(error);

      if (error.response && error.response.data) {

        alert(error.response.data);

      } else {

        alert("Save Failed");

      }
    }
  };

  return (

    <div className="cdr-page">

      <div className="cdr-header">

        <h1>PUBLIC FUND</h1>

        <h2>WITHDRAWAL</h2>

        <button
          className="cdr-menu-btn"
          onClick={() => navigate("/receipts")}
        >
          MENU
        </button>

      </div>

      <div className="cdr-form-container">

        <form onSubmit={handleSubmit}>

          <div className="cdr-row">

            <div className="cdr-field">

              <label>CHEQUE / DD NO :</label>

              <input
                type="text"
                name="chequeDdNo"
                value={receipt.chequeDdNo}
                onChange={handleChange}
              />

            </div>

            <div className="cdr-field">

              <label>CHEQUE / DD DATE :</label>

              <input
                type="date"
                name="chequeDdDate"
                value={receipt.chequeDdDate}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="cdr-row">

            <div className="cdr-field">

              <label>REFERENCE NO / LETTER NO :</label>

              <input
                type="text"
                name="referenceNo"
                value={receipt.referenceNo}
                onChange={handleChange}
              />

            </div>

            <div className="cdr-field">

              <label>PURPOSE :</label>

              <input
                type="text"
                name="purpose"
                value={receipt.purpose}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="cdr-row">

            <div className="cdr-field from-whom-field">

              <label>FROM WHOM :</label>

              <textarea
                name="fromWhom"
                value={receipt.fromWhom}
                onChange={(e) => {

                  handleChange(e);

                  e.target.style.height = "auto";

                  e.target.style.height =
                    e.target.scrollHeight + "px";
                }}
              />

            </div>

            <div className="cdr-field">

              <label>AMOUNT :</label>

              <input
                type="text"
                name="amount"
                maxLength="10"
                value={receipt.amount}
                onChange={(e) => {

                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {

                    setReceipt({
                      ...receipt,
                      amount: value,
                    });

                  } else {

                    alert("Enter only digits");

                  }
                }}
              />

            </div>

          </div>

          <div className="cdr-row">

            <div className="cdr-field single-field">

              <label>BANK CREDIT DATE:</label>

              <input
                type="date"
                name="bankCreditDate"
                value={receipt.bankCreditDate}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="cdr-save-btn-div">

            <button type="submit" className="cdr-save-btn">
              SAVE
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ChequeDdReceipt;