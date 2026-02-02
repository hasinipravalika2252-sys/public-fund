import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const today = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role,
        }),
      });

      const message = await response.text();

      if (message === "Login successful") {
        alert("Login successful");
        navigate("/receipts");
      } else {
        setError(message);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Login page</h1>

      <form style={styles.form} onSubmit={handleSubmit}>
        <label style={styles.label}>Username:</label>
        <input
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label style={styles.label}>Password:</label>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label style={styles.label}>Role:</label>
        <input
          style={styles.input}
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <label style={styles.label}>Date:</label>
        <input style={styles.input} type="date" value={today} readOnly />

        {error && <p style={styles.error}>{error}</p>}

        <button style={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

/* ✅ STYLES — UNCHANGED */
const styles = {
  page: {
    backgroundColor: "#e3f2fd",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "20px",
    textAlign: "center",
    color: "#0d6efd",
  },
  form: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "10px",
    width: "380px",
    boxShadow: "0 0 10px #90caf9",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  label: { fontSize: "16px" },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #90caf9",
  },
  button: {
    backgroundColor: "#0d6efd",
    color: "white",
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
  error: { color: "red" },
};
