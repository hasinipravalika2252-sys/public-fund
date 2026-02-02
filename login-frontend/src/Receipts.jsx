import { useNavigate } from "react-router-dom";

export default function Receipts() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* Sign Out */}
      <div style={styles.signout} onClick={() => navigate("/")}>
        Sign Out
      </div>

      <h1 style={styles.title}>RECEIPTS</h1>

      <div style={styles.box}>
        <p
          style={styles.link}
          onClick={() => navigate("/cda-receipt")}

        >
          From CDA, Hyderabad
        </p>

        <p style={styles.link}>From PCDA, DELHI</p>
        <p style={styles.link}>Cash</p>
        <p style={styles.link}>Withdrawal</p>
        <p style={styles.link}>Cheque / DD</p>
        <p style={styles.link}>Direct From SBI</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial",
    position: "relative",
  },
  signout: {
    position: "absolute",
    right: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#1565c0",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  title: {
    color: "#1565c0",
    marginBottom: "20px",
    fontSize: "32px",
    fontWeight: "bold",
  },
  box: {
    border: "2px solid black",
    padding: "20px",
    width: "300px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    fontSize: "18px",
    textDecoration: "underline",
    cursor: "pointer",
  },
};
