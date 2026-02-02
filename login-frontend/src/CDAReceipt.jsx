import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CDAReceipt() {
  const navigate = useNavigate();

  const now = new Date();
  const year = now.getFullYear().toString();
  const month = String(now.getMonth() + 1).padStart(2, "0");

  const [userDvPart, setUserDvPart] = useState("");
  const [chequeNo, setChequeNo] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [amount, setAmount] = useState("");
  const [creditDate, setCreditDate] = useState("");

  const [errors, setErrors] = useState({
    dv: "",
    chequeNo: "",
    chequeDate: "",
    amount: "",
  });

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const mon = d.toLocaleString("en-US", { month: "short" });
    const yr = String(d.getFullYear()).slice(-2);
    return `${day}-${mon}-${yr}`;
  };

  // ✅ BACKEND CONNECTED SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!userDvPart) newErrors.dv = "Please enter CDA DV number";
    if (!chequeNo) newErrors.chequeNo = "Please enter cheque number";
    if (!chequeDate) newErrors.chequeDate = "Please select cheque date";
    if (!amount) newErrors.amount = "Please enter amount";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const fullDvNo = `${year}${month}${userDvPart}`;

    const payload = {
      dvno: fullDvNo,
      chequeNo: Number(chequeNo),
      amount: Number(amount),
      chequeDate: chequeDate,                 // YYYY-MM-DD
      bankCreditDate: creditDate || null,     // optional
      loginDate: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/receipts/cda",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
      }

      alert("Receipt saved successfully (backend + database)");
    } catch (error) {
      console.error(error);
      alert("Error saving receipt. Check backend logs.");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>PUBLIC FUND</h1>
      <h2 style={styles.subheading}>RECEIPT FROM CDA</h2>

      <button style={styles.menuButton} onClick={() => navigate("/receipts")}>
        MENU
      </button>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>CDA DV NO :</label>
        <div style={styles.dvContainer}>
          <input style={styles.dvDate} value={year} readOnly />
          <input style={styles.dvDate} value={month} readOnly />
          <input
            style={styles.dvInput}
            value={userDvPart}
            maxLength={5}
            onChange={(e) =>
              /^[0-9]*$/.test(e.target.value) &&
              setUserDvPart(e.target.value)
            }
          />
          {userDvPart && (
            <span style={styles.subscript}>
              ({year}{month}{userDvPart})
            </span>
          )}
        </div>
        {errors.dv && <p style={styles.error}>{errors.dv}</p>}

        <label style={styles.label}>CDA CHEQUE NO :</label>
        <input
          style={styles.input}
          value={chequeNo}
          maxLength={9}
          onChange={(e) =>
            /^[0-9]*$/.test(e.target.value) &&
            setChequeNo(e.target.value)
          }
        />
        {errors.chequeNo && <p style={styles.error}>{errors.chequeNo}</p>}

        <label style={styles.label}>CDA CHEQUE DATE :</label>
        <input
          type="date"
          style={styles.input}
          value={chequeDate}
          onChange={(e) => setChequeDate(e.target.value)}
        />
        {chequeDate && (
          <span style={styles.subscript}>
            {formatDate(chequeDate)}
          </span>
        )}
        {errors.chequeDate && <p style={styles.error}>{errors.chequeDate}</p>}

        <label style={styles.label}>CHEQUE SLIP TOTAL AMOUNT :</label>
        <input
          style={styles.input}
          value={amount}
          maxLength={9}
          onChange={(e) =>
            /^[0-9]*$/.test(e.target.value) && setAmount(e.target.value)
          }
        />
        {errors.amount && <p style={styles.error}>{errors.amount}</p>}

        <label style={styles.label}>BANK CREDIT DATE :</label>
        <input
          type="date"
          style={styles.input}
          value={creditDate}
          onChange={(e) => setCreditDate(e.target.value)}
        />
        {creditDate && (
          <span style={styles.subscript}>
            {formatDate(creditDate)}
          </span>
        )}

        <button style={styles.button} type="submit">
          SAVE RECEIPT
        </button>
      </form>
    </div>
  );
}

/* ---------- STYLES ---------- */
const styles = {
  page: {
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    paddingTop: "30px",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#0d6efd",
    marginBottom: "5px",
  },
  subheading: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#0d6efd",
    marginBottom: "10px",
  },
  menuButton: {
    alignSelf: "flex-end",
    marginRight: "40px",
    marginBottom: "10px",
    padding: "6px 14px",
    backgroundColor: "#0d6efd",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  form: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    width: "450px",
    boxShadow: "0 0 10px #90caf9",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: { fontSize: "16px" },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #90caf9",
  },
  dvContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  dvDate: {
    width: "70px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #90caf9",
  },
  dvInput: {
    width: "90px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #90caf9",
  },
  subscript: {
    fontSize: "13px",
    color: "#0d6efd",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    alignSelf: "center",
    width: "200px",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
