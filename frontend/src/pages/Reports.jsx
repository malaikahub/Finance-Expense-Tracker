// Report.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import * as XLSX from "xlsx"; // For Excel Export
import jsPDF from "jspdf"; // For PDF Export
import "jspdf-autotable"; // For table formatting in PDF
import "./Report.css";

const Report = () => {
  // Dummy transaction data
  const [transactions] = useState([
    { id: 1, date: "2025-08-01", description: "Groceries", amount: 2500 },
    { id: 2, date: "2025-08-05", description: "Electric Bill", amount: 4000 },
    { id: 3, date: "2025-08-10", description: "Internet Bill", amount: 2000 },
  ]);

  // ---------- Export to Excel ----------
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "Transactions_Report.xlsx");
  };

  // ---------- Export to PDF ----------
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 14, 15);
    doc.autoTable({
      startY: 25,
      head: [["ID", "Date", "Description", "Amount"]],
      body: transactions.map((t) => [t.id, t.date, t.description, t.amount]),
    });
    doc.save("Transactions_Report.pdf");
  };

  return (
    <div>
      {/* ---------- HERO SECTION ---------- */}
      <section className="report-hero">
        <img
          src="/images/report.jpg"
          alt="Report Hero"
          className="report-hero-image"
        />
      </section>

      {/* ---------- TRANSACTION TABLE ---------- */}
      <section className="transaction-section">
        <h2 className="transaction-title">Transaction Report</h2>

        <div className="transaction-table-wrapper">
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.date}</td>
                  <td>{t.description}</td>
                  <td>{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---------- Export Buttons ---------- */}
        <div className="export-buttons">
          <button className="btn-primary" onClick={exportToExcel}>
            Export to Excel
          </button>
          <button className="btn-secondary" onClick={exportToPDF}>
            Export to PDF
          </button>
        </div>
      </section>
    </div>
  );
};

export default Report;
