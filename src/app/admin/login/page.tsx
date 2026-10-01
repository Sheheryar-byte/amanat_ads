"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!password) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/ms39/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        // Cookie is now set server-side — navigate to the dashboard
        window.location.href = "/ms39/admin";
      } else {
        const data = await res.json();
        setError(data.error ?? "Incorrect password. Try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a0a0a 0%, #2c1010 50%, #1a0a0a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "20px",
          padding: "56px 48px",
          width: "100%",
          maxWidth: "420px",
          textAlign: "center",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔐</div>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: "#ffffff",
            marginBottom: "8px",
          }}
        >
          Admin Panel
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginBottom: "36px" }}>
          Amanat Eye Hospital — Appointments Dashboard
        </p>

        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          style={{
            width: "100%",
            padding: "14px 18px",
            borderRadius: "10px",
            border: error ? "1px solid #e74c3c" : "1px solid rgba(255,255,255,0.15)",
            backgroundColor: "rgba(255,255,255,0.08)",
            color: "#fff",
            fontSize: "15px",
            outline: "none",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p style={{ color: "#e74c3c", fontSize: "13px", marginBottom: "12px" }}>
            ✗ {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            backgroundColor: loading ? "#555" : "#723838",
            color: "#fff",
            fontSize: "16px",
            fontWeight: 700,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            marginTop: "4px",
          }}
          onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#8a4444"; }}
          onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#723838"; }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>

        <Link
          href="/ms39"
          style={{
            display: "block",
            marginTop: "24px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "13px",
            textDecoration: "none",
          }}
        >
          ← Back to landing page
        </Link>
      </div>
    </main>
  );
}
