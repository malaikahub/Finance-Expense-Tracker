import "./Transactions.css";
import { useState, useEffect } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newTransaction, setNewTransaction] = useState({
    type: "",
    category: "",
    amount: "",
    description: "",
  });

  // Fetch transactions when component mounts
  useEffect(() => {
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions");
      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setTransactions(data);
      } else {
        console.error("Failed to fetch transactions:", data);
        setTransactions([]); // <-- prevent map error
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]); // <-- prevent map error
    }
  };

  fetchTransactions();
}, []);


   

  // Handle input changes
  const handleChange = (field, value) => {
    setNewTransaction({ ...newTransaction, [field]: value });
  };

  // Save new transaction
  const handleSave = async () => {
    if (!newTransaction.type || !newTransaction.amount) {
      alert("Type and Amount are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newTransaction, user_id: 1 }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save transaction");
      }

      setTransactions([...transactions, data]);
      setNewTransaction({ type: "", category: "", amount: "", description: "" });
      setError(null);
    } catch (err) {
      console.error("Error saving transaction:", err);
      alert(err.message);
    }
  };

  return (
    <div className="transactions">
      {/* Banner */}
      <div className="transactions-banner">
        <img src="/images/online-transaction.jpg" alt="Transactions Banner" />
      </div>

      {/* Transaction Table */}
      <div className="transactions-table-container">
        <h2 className="transactions-table-heading">Transaction Records</h2>

        {loading && <p>Loading transactions...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {!loading && !error && (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td>{txn.id}</td>
                    <td>{txn.type}</td>
                    <td>{txn.category || "-"}</td>
                    <td>{txn.amount}</td>
                    <td>{txn.description || "-"}</td>
                    <td>{new Date(txn.date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No transactions found
                  </td>
                </tr>
              )}

              {/* Row for adding a new transaction */}
              <tr>
                <td>New</td>
                <td>
                  <input
                    type="text"
                    value={newTransaction.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    placeholder="Type"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newTransaction.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder="Category"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={newTransaction.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    placeholder="Amount"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Description"
                  />
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Buttons */}
        <div className="transactions-buttons-row">
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn-add"
            onClick={() =>
              setNewTransaction({ type: "", category: "", amount: "", description: "" })
            }
          >
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}
