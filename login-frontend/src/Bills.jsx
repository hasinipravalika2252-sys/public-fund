import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bills.css";

export default function Bills() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recNo: "",
    dvno: "",
    chequeNo: "",
    chequeDate: "",
    chequeTotal: "",
    bankCreditDate: "",
    type: "",
    purpose: "",
    billNo: "",
    billDate: "",
    billAmount: "",
  });

  const [types, setTypes] = useState([]);
  const [purposes, setPurposes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/receipts/latest")
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          recNo: data.recNo || "",
          dvno: data.dvnoRefno || "",
          chequeNo: data.chequeReceiptNo || "",
          chequeDate: data.chequeReceiptDate || "",
          chequeTotal: data.amount || "",
          bankCreditDate: data.bankCreditDate || "",
        }));
      })
      .catch((err) =>
        console.error("Error fetching latest receipt:", err)
      );
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/purpose/types")
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch((err) => console.error("Error fetching types:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "billNo") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "billAmount") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }

    if (name === "type") {
      fetch(`http://localhost:8080/api/purpose/by-type/${value}`)
        .then((res) => res.json())
        .then((data) => setPurposes(data))
        .catch((err) => console.error("Error fetching purposes:", err));

      setFormData({ ...formData, type: value, purpose: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let missingFields = [];

    if (!formData.type) missingFields.push("Type");
    if (!formData.purpose) missingFields.push("Purpose");
    if (!formData.billNo) missingFields.push("Bill No");
    if (!formData.billDate) missingFields.push("Bill Date");
    if (!formData.billAmount) missingFields.push("Bill Amount");

    if (missingFields.length > 0) {
      alert("Please fill the following:\n\n" + missingFields.join("\n"));
      return false;
    }

    return true;
  };

  const saveBillToBackend = async () => {
  const response = await fetch("http://localhost:8080/api/bill/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contno: Number(formData.recNo),
      billNo: formData.billNo,
      billDate: formData.billDate,
      type: formData.type,
      purpose: formData.purpose,
      billAmount: Number(formData.billAmount),
    }),
  });

  const message = await response.text();

  // ✅ Custom alert based on response
  if (!response.ok) {

  // 🔥 CUSTOM MESSAGE 1
  if (message.includes("TOTAL AMOUNT EXCEEDS BILL AMOUNT")) {
    alert("Bill amount exceeds Cheque Slip Amount\n(Bill amount <= Cheque Slip Amount)");
    return null;
  }

  // 🔥 CUSTOM MESSAGE 2 (YOUR REQUIRED ONE)
  if (message.includes("BILLNO")) {
    alert("BILLNO + BILLDATE COMBINATION SHOULD NOT REPEAT");
    return null;
  }

  // 🔥 DEFAULT (IMPORTANT)
  alert(message);
  return null;
}

  return message;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    const message = await saveBillToBackend();
    if (!message) return;

    alert("Bill Saved Successfully\nRVNO: " + message);

    setFormData((prev) => ({
      ...prev,
      type: "",
      purpose: "",
      billNo: "",
      billDate: "",
      billAmount: "",
    }));

    navigate("/cdabillpage");
  } catch (error) {
    alert("Server error. Please try again.");
  }
};

  const handleAddReceipt = () => {
  navigate("/cda-receipt");
};
  return (
    <div className="page-bg">
      <div className="form-card">

        <div className="menu-container">
          <button className="menu-btn" onClick={() => navigate("/receipts")}>
            Menu
          </button>
        </div>

        <h2 className="main-title">PUBLIC FUND</h2>

        <form onSubmit={handleSubmit}>

          <div className="receipt-box">
            <h3 className="receipt-title">Receipt Details</h3>

            <div className="row">
              <div className="col">
                <div className="inline-field">
                  <span className="label">REC NO :</span>
                  <span className="value">{formData.recNo}</span>
                </div>
              </div>

              <div className="col">
                <div className="inline-field">
                  <span className="label">CDA DVNO :</span>
                  <span className="value">{formData.dvno}</span>
                </div>
              </div>

              <div className="col">
                <div className="inline-field">
                  <span className="label">CDA CHEQUE NO :</span>
                  <span className="value">{formData.chequeNo}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <div className="inline-field">
                  <span className="label">CDA CHEQUE DATE :</span>
                  <span className="value">{formData.chequeDate}</span>
                </div>
              </div>

              <div className="col">
                <div className="inline-field">
                  <span className="label">BANK CREDIT DATE :</span>
                  <span className="value">{formData.bankCreditDate}</span>
                </div>
              </div>
              <div className="col">
                <div className="inline-field">
                  <span className="label">CHEQUE SLIP TOTAL AMOUNT :</span>
                  <span className="value">{formData.chequeTotal}</span>
                </div>
              </div>

            </div>
          </div>

          <h3 className="bill-title">Bill Details</h3>
          <div className="row-gap"></div>

          {/* ✅ MERGED INTO SINGLE ROW */}
          <div className="row bill-row">

            <div className="col">
              <label>TYPE</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="">Select</option>
                {types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <label>PURPOSE</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                disabled={!formData.type}
              >
                <option value="">Select</option>
                {purposes.map((purpose, index) => (
                  <option key={index} value={purpose}>
                    {purpose}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <label>BILL NO</label>
              <input
                type="text"
                name="billNo"
                value={formData.billNo}
                onChange={handleChange}
                maxLength={10}
              />
            </div>

            <div className="col small-col">
              <label>BILL DATE</label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                name="billDate"
                value={formData.billDate}
                onChange={handleChange}
              />
            </div>

            <div className="col small-col">
              <label>BILL AMOUNT</label>
              <input
                type="text"
                name="billAmount"
                value={formData.billAmount}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="save-container">
            <button type="submit" className="save-btn">
              SAVE BILL
            </button>
          </div>

          <div className="add-container">
            <button
              type="button"
              className="add-btn"
              onClick={handleAddReceipt}
            >
              + Add Another Receipt
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}