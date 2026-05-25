import React, { useState, useEffect } from "react";
import "./CdaBillPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CdaBillPage = () => {
  const navigate = useNavigate();

  const [typeValue, setTaxValue] = useState("Nil");

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
  const [searchText, setSearchText] = useState("");

const [filteredPersons, setFilteredPersons] = useState([]);
const [drdlSearch, setDrdlSearch] = useState("");
const [otherSearch, setOtherSearch] = useState("");

  const [amount, setAmount] = useState("");
  const [cashbookAmount, setCashbookAmount] = useState("");
  const [baseAmount, setBaseAmount] = useState("");

  const [tdsAmount, setTdsAmount] = useState("");
  const [netAmount, setNetAmount] = useState("");

  const [savedRecords, setSavedRecords] = useState([]);

  const [rowLocked, setRowLocked] = useState(false);
  const [hasBillError, setHasBillError] = useState(false);
 const handlePersonClick = (person) => {

  if (rowLocked || hasBillError) {
    alert("You have reached total amount.you can't select another person");
    return;
  }

  setSelectedPerson({
    idno: person.idno,
    persno: person.persno,
    name: person.name
  });

  setSearchText("");

  setFilteredPersons([]);
};
const handleSearch = (value) => {

  setSearchText(value);

  if (value.trim() === "") {

    setFilteredPersons([]);

    return;
  }

  const allPersons = [
    ...drdlPersonnel,
    ...otherPersonnel
  ];

  const filtered = allPersons.filter((p) => {

    return (

      p.name?.toLowerCase().includes(value.toLowerCase()) ||

      p.idno?.toString().includes(value) ||

      p.persno?.toString().includes(value)

    );
  });

  setFilteredPersons(filtered);
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
    if (typeValue !== "Nil" && baseAmount !== "") {

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

  console.log("FULL ERROR:", error);

  if (error.response) {
    if (error.response.data) {
      alert(error.response.data); // ✅ backend message
    } else if (error.response.status === 400) {
      alert("Bad Request");
    } else if (error.response.status === 500) {
      alert("Server Error");
    } else {
      alert("Unexpected Error");
    }
  } else if (error.request) {
    alert("No response from server");
  } else {
    alert("Error: " + error.message);
  }

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
      taxflag: typeValue === "Nil" ? 0 : Number(typeValue),
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

         setSavedRecords((prev) => [...prev, newRecord]);
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

        }

      if (response.data && response.data.toLowerCase().includes("all payment")) {
  setRowLocked(true);
  setHasBillError(true);
}
       

      })
   .catch((error) => {

  console.log("FULL ERROR:", error);

  if (error.response) {

    const msg =
      typeof error.response.data === "string"
        ? error.response.data
        : error.response.data?.message;

    if (msg) {
      alert(msg); // ✅ always correct message
    } else {
      alert("Server error occurred");
    }

  } else if (error.request) {
    alert("No response from server");
  } else {
    alert("Error: " + error.message);
  }

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
   
    

      <div className="receipt-box">

  <h3 className="receipt-title">Receipt Details</h3>

  <div className="receipt-row">

    <div className="receipt-item">
      <span className="label">REC NO :</span>
      <span className="value">{receiptData.recNo || ""}</span>
    </div>

    <div className="receipt-item">
      <span className="label">CDA DVNO :</span>
      <span className="value">{receiptData.dvnoRefno || ""}</span>
    </div>

    <div className="receipt-item">
      <span className="label">CDA CHEQUE NO :</span>
      <span className="value">{receiptData.chequeReceiptNo || ""}</span>
    </div>

    <div className="receipt-item">
      <span className="label">CDA CHEQUE DATE :</span>
      <span className="value">{receiptData.chequeReceiptDate || ""}</span>
    </div>

    <div className="receipt-item">
  <span className="label">BANK CREDIT DATE :</span>
  <span className="value">{receiptData.bankCreditDate || ""}</span>
</div>

<div className="receipt-item">
  <span className="label">CHEQUE SLIP TOTAL AMOUNT :</span>
  <span className="value">{receiptData.amount || ""}</span>
</div>

  </div>

</div>

      <div className="receipt-box">

  <h3 className="receipt-title">Bill Details</h3>

  <div className="receipt-row">

    <div className="receipt-item">
      <span className="label">RVNO :</span>
      <span className="value">{bill.rvno}</span>
    </div>

    <div className="receipt-item">
      <span className="label">BILL NO :</span>
      <span className="value">{bill.billNo}</span>
    </div>

    <div className="receipt-item">
      <span className="label">BILL DATE :</span>
      <span className="value">{bill.billDate}</span>
    </div>
    
    <div className="receipt-item">
      <span className="label">TAX % :</span>
      <span className="value">{bill.type}</span>
    </div>

    <div className="receipt-item">
      <span className="label">PURPOSE :</span>
      <span className="value">{bill.purpose}</span>
    </div>
    <div className="receipt-item">
      <span className="label">BILL AMOUNT :</span>
      <span className="value">{bill.billAmount}</span>
    </div>

  </div>

</div>
<h3 className="add-persons-title">Add Persons</h3>

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
          <label>Tax Percentage</label>
          <select
            className="small-input"
            value={typeValue}
            onChange={(e) => setTaxValue(e.target.value)}
            disabled={rowLocked}
          >
            <option>Nil</option>
            <option>2</option>
            <option>10</option>
          </select>
        </div>

      </div>

      {typeValue !== "Nil" && (
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

  {/* DRDL BOX */}

  <div className="box">

    <strong>DRDL Employee Details</strong>

    <input
      type="text"
      placeholder="Search by ID / PER NO / Name"
      value={drdlSearch}
      onChange={(e) => setDrdlSearch(e.target.value)}
      className="small-input"
      style={{
        width: "95%",
        marginTop: "10px",
        marginBottom: "10px"
      }}
    />

    {drdlPersonnel
      .filter((p) =>
        p.name?.toLowerCase().includes(drdlSearch.toLowerCase()) ||
        p.idno?.toString().includes(drdlSearch) ||
        p.persno?.toString().includes(drdlSearch)
      )
      .map((p) => (

        <div
          key={p.persno}
          onClick={() => handlePersonClick(p)}
          style={{ cursor: "pointer" }}
        >
          {p.persno} - {p.name} - {p.idno}
        </div>

      ))}

  </div>


  {/* OTHER BOX */}

  <div className="box">

    <strong>Other Persons Details</strong>

    <input
      type="text"
      placeholder="Search by ID / PER NO / Name"
      value={otherSearch}
      onChange={(e) => setOtherSearch(e.target.value)}
      className="small-input"
      style={{
        width: "95%",
        marginTop: "10px",
        marginBottom: "10px"
      }}
    />

    {otherPersonnel
      .filter((p) =>
        p.name?.toLowerCase().includes(otherSearch.toLowerCase()) ||
        p.idno?.toString().includes(otherSearch) ||
        p.persno?.toString().includes(otherSearch)
      )
      .map((p) => (

        <div
          key={p.persno}
          onClick={() => handlePersonClick(p)}
          style={{ cursor: "pointer" }}
        >
          {p.persno} - {p.name} - {p.idno}
        </div>

      ))}

  </div>

</div>

      <div className="center-btn">
        <button
  className="small-btn"
  style={{
    backgroundColor: hasBillError ? "grey" : "",
    cursor: hasBillError ? "not-allowed" : "pointer"
  }}
  onClick={() => {
    if (hasBillError) {
      alert("All payments completed. Cannot add another bill.");
      return;
    }
    navigate("/bills");
  }}
>
  Add Another Bill
</button>
      </div>

      <div className="left-btn">
        <button className="small-btn" onClick={() => navigate("/cda-receipt")}>
          Add another Receipt
        </button>
      </div>

    </div>
  );
};

export default CdaBillPage;