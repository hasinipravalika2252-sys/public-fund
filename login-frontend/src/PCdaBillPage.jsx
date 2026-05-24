import React, { useState, useEffect } from "react";
import "./CdaBillPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PCdaBillPage = () => {
  const navigate = useNavigate();

  const [typeValue, setTaxValue] = useState("Nill");

  const [receiptData, setReceiptData] = useState({});

  const [bill, setBill] = useState({
    rvno: "",
    billNo: "",
    billDate: "",
    billAmount: "",
    type: "",
    purpose: ""
  });

  const [drdlPersonnel, setDrdlPersonnel] = useState([]);
  const [otherPersonnel, setOtherPersonnel] = useState([]);

  const [selectedPerson, setSelectedPerson] = useState({
    idno: "",
    persno: "",
    name: ""
  });

  const [amount, setAmount] = useState("");
  const [cashbookAmount, setCashbookAmount] = useState("");
  const [baseAmount, setBaseAmount] = useState("");

  const [tdsAmount, setTdsAmount] = useState("");
  const [netAmount, setNetAmount] = useState("");

  const [savedRecords, setSavedRecords] = useState([]);

  const [rowLocked, setRowLocked] = useState(false);

  const handlePersonClick = (person) => {
    setSelectedPerson({
      idno: person.idno,
      persno: person.persno,
      name: person.name
    });
  };

  const handleAmountChange = (e) => {
    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    if (bill.billAmount && Number(value) > Number(bill.billAmount)) {
      alert("Amount should be less than Bill Amount");
      return;
    }

    setAmount(value);
    setCashbookAmount(value);
    setBaseAmount(value);
  };

  useEffect(() => {
    if (typeValue !== "Nill" && baseAmount !== "") {

      const base = parseFloat(baseAmount);
      const percent = parseFloat(typeValue);

      const tds = (base * percent) / 100;
      const net = base - tds;

      setTdsAmount(tds.toFixed(2));
      setNetAmount(net.toFixed(2));

    } else {

      setTdsAmount("");
      setNetAmount("");

    }
  }, [typeValue, baseAmount]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/receipts/latest")
      .then((response) => {
        const data = { ...response.data };

        if (data.chequeReceiptDate) {
          data.chequeReceiptDate = data.chequeReceiptDate.split("T")[0];
        }

        if (data.bankCreditDate) {
          data.bankCreditDate = data.bankCreditDate.split("T")[0];
        }

        setReceiptData(data);
      })
      .catch((error) => {
        console.error("Error fetching latest receipt:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/bill/latest")
      .then((response) => {
        const data = { ...response.data };

        if (data.billDate) {
          data.billDate = data.billDate.split("T")[0];
        }

        setBill({
          rvno: data.rvno || "",
          billNo: data.billNo || "",
          billDate: data.billDate || "",
          billAmount: data.billAmount || "",
          type: data.type || "",
          purpose: data.purpose || ""
        });
      })
      .catch((error) => {
        console.error("Error fetching latest bill:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/personnel/drdl")
      .then((response) => {
        setDrdlPersonnel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching DRDL personnel:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/personnel/other")
      .then((response) => {
        setOtherPersonnel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Other personnel:", error);
      });
  }, []);

  const handleChange = (e) => {
    setBill({
      ...bill,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {

    const data = {
      rvno: bill.rvno,
      persno: selectedPerson.persno,
      amount: amount,
      cashbookAmount: cashbookAmount,
      taxflag: typeValue === "Nill" ? 0 : Number(typeValue),
      alertflag: "N"
    };

    axios
      .post(
        "http://localhost:8080/api/rdetails/save",
        data,
        {
          params: { billAmount: bill.billAmount }
        }
      )
      .then((response) => {

        alert(response.data);

        if (response.data && response.data.toLowerCase().includes("success")) {

          const newRecord = {
            persno: selectedPerson.persno,
            name: selectedPerson.name,
            amount: amount
          };

          setSavedRecords((prev) => [newRecord, ...prev]);

        }

        if (response.data && response.data.toLowerCase().includes("all payment")) {
          setRowLocked(true);
        }

        setAmount("");
        setCashbookAmount("");
        setBaseAmount("");
        setTdsAmount("");
        setNetAmount("");

        setSelectedPerson({
          idno: "",
          persno: "",
          name: ""
        });

      })
      .catch((error) => {

        alert(error.response?.data || "Error saving details");

      });
  };

  return (
  <div className="container">

    <div style={{ position: "absolute", top: "20px", right: "20px" }}>
      <button className="small-btn" onClick={() => navigate("/receipts")}>
        Menu
      </button>
    </div>

    <h2 className="title">PUBLIC FUND</h2>
    <h3 className="subtitle">BILL FROM PCDA</h3>
    

      <div className="top-rows">

        <div>
          <label>REC No</label>
          <input className="small-input" value={receiptData.recNo || ""} readOnly />
        </div>

        <div>
          <label>PCDA DVNO</label>
          <input className="small-input" value={receiptData.dvnoRefno || ""} readOnly />
        </div>

        <div>
          <label>PCDA CHEQUE No</label>
          <input className="small-input" value={receiptData.chequeReceiptNo || ""} readOnly />
        </div>

        <div>
          <label>PCDA CHEQUE DATE</label>
          <input type="date" className="small-input" value={receiptData.chequeReceiptDate || ""} readOnly />
        </div>

        <div>
          <label>PCDA CHEQUE SLIP TOTAL AMOUNT</label>
          <input type="number" className="small-input" value={receiptData.amount || ""} readOnly />
        </div>

        <div>
          <label>BANK CREDIT DATE</label>
          <input type="date" className="small-input" value={receiptData.bankCreditDate || ""} readOnly />
        </div>

      </div>

      <table className="bill-table">
        <thead>
          <tr>
            <th>RVNO</th>
            <th>Bill No</th>
            <th>Bill Date</th>
            <th>Bill Amount</th>
            <th>Tax</th>
            <th>Purpose</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td><input className="table-input" name="rvno" value={bill.rvno} onChange={handleChange} /></td>
            <td><input className="table-input" name="billNo" value={bill.billNo} onChange={handleChange} /></td>
            <td><input type="date" className="table-input" name="billDate" value={bill.billDate} onChange={handleChange} /></td>
            <td><input type="number" className="table-input" name="billAmount" value={bill.billAmount} onChange={handleChange} /></td>
            <td><input className="table-input" name="type" value={bill.type} onChange={handleChange} /></td>
            <td><input className="table-input" name="purpose" value={bill.purpose} onChange={handleChange} /></td>
          </tr>
        </tbody>
      </table>

      {savedRecords.length > 0 && (
        <div style={{marginBottom:"20px"}}>
          <h4>Saved Records</h4>

          <table className="bill-table">
            <thead>
              <tr>
                <th>PERSNO</th>
                <th>Name</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {savedRecords.map((rec, index) => (
                <tr key={index}>
                  <td>{rec.persno}</td>
                  <td>{rec.name}</td>
                  <td>{rec.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="middle-rows">

        <div>
          <label>ID No</label>
          <input className="small-input" value={selectedPerson.idno} readOnly />
        </div>

        <div>
          <label>PER No</label>
          <input className="small-input" value={selectedPerson.persno} readOnly />
        </div>

        <div>
          <label>Name</label>
          <input className="small-input" value={selectedPerson.name} readOnly />
        </div>

        <div>
          <label>Amount</label>
          <input
            type="text"
            className="small-input"
            value={amount}
            onChange={handleAmountChange}
            disabled={rowLocked}
          />
        </div>

        <div>
          <label>Cashbook Amount</label>
          <input type="text" className="small-input" value={cashbookAmount} readOnly />
        </div>

        <div>
          <label>Tax</label>
          <select
            className="small-input"
            value={typeValue}
            onChange={(e) => setTaxValue(e.target.value)}
            disabled={rowLocked}
          >
            <option>Nill</option>
            <option>2</option>
            <option>10</option>
          </select>
        </div>

      </div>

      {typeValue !== "Nill" && (
        <div className="epic-tax-row">

          <label>CGST</label>
          <input className="epic-small" defaultValue="0.00" />
          <input className="epic-small" defaultValue="0.00" />

          <label>SGST</label>
          <input className="epic-small" defaultValue="0.00" />
          <input className="epic-small" defaultValue="0.00" />

          <label>Base Amount</label>
          <input className="epic-medium" value={baseAmount} readOnly />

          <label>Net Amount</label>
          <input className="epic-medium" value={netAmount} readOnly />

          <label>TDS Amount</label>
          <input className="epic-medium" value={tdsAmount} readOnly />

        </div>
      )}

      <div className="save-container">
        <button className="save-btn" onClick={handleSave} disabled={rowLocked}>SAVE</button>
      </div>

      <div className="bottom-section">

        <div className="box">
          <strong>DRDO Employee Details</strong>

          {drdlPersonnel.map((p) => (
            <div
              key={p.persno}
              onClick={() => !rowLocked && handlePersonClick(p)}
              style={{ cursor: "pointer" }}
            >
              {p.persno} - {p.name} - {p.idno}
            </div>
          ))}

        </div>

        <div className="box">
          <strong>Other Persons Details</strong>

          {otherPersonnel.map((p) => (
            <div
              key={p.persno}
              onClick={() => !rowLocked && handlePersonClick(p)}
              style={{ cursor: "pointer" }}
            >
              {p.persno} - {p.name} - {p.idno}
            </div>
          ))}

        </div>

      </div>

      <div className="center-btn">
        <button className="small-btn" onClick={() => navigate("/pcdabills")}> Add Another Bill</button>
      </div>

      <div className="left-btn">
        <button className="small-btn" onClick={() => navigate("/pcda-receipt")}>
          Add another Receipt
        </button>
      </div>

    </div>
  );
};

export default PCdaBillPage;