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

  // Fetch latest receipt
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

  // Fetch types
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
      if (value.length > 10) return; // ✅ ADDED THIS LINE (10 digit limit)
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

  // 🔹 Common validation
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

  // 🔹 Common save function
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

    if (!response.ok) {
      alert(message || "TOTAL AMOUNT EXCEEDS BILL AMOUNT");
      return null;
    }

    return message;
  };

  // SAVE BILL
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

      navigate("/pcdabillpage");
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  // ADD RECEIPT
  const handleAddReceipt = async () => {
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

      navigate("/pcda-receipt");

    } catch (error) {
      alert("Server error. Please try again.");
    }
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
        <h4 className="sub-title">BILL FROM PCDA</h4>

        <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="col">
              <label>REC NO</label>
              <input type="text" value={formData.recNo} readOnly />
            </div>

            <div className="col">
              <label>PCDA DVNO</label>
              <input type="text" value={formData.dvno} readOnly />
            </div>

            <div className="col">
              <label>PCDA CHEQUE NO</label>
              <input type="text" value={formData.chequeNo} readOnly />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>PCDA CHEQUE DATE</label>
              <input type="date" value={formData.chequeDate} readOnly />
            </div>

            <div className="col">
              <label>CHEQUE SLIP TOTAL AMOUNT</label>
              <input type="text" value={formData.chequeTotal} readOnly />
            </div>

            <div className="col">
              <label>BANK CREDIT DATE</label>
              <input type="date" value={formData.bankCreditDate || ""} readOnly />
            </div>
          </div>

          <div className="row-gap"></div>

          <div className="row">
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
          </div>

          <div className="row">
            <div className="col">
              <label>BILL DATE</label>
              <input
                type="date"
                name="billDate"
                value={formData.billDate}
                onChange={handleChange}
              />
            </div>

            <div className="col">
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