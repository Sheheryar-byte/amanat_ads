"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Appointment {
  fullName: string;
  mobileNumber: string;
  city: string;
  age: string;
  topics: string[];
  contactMethod: string[];
  preferredTime: string[];
  notes: string;
  submittedAt: string;
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  // Middleware (src/middleware.ts) already verified the session cookie
  // before this page renders — no client-side password check needed.
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
    setAppointments(stored);
  }, []);

  const handleLogout = async () => {
    await fetch("/ms39/api/admin/logout", { method: "POST" });
    window.location.href = "/ms39/admin/login";
  };

  const handleDelete = (index: number) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to delete ALL appointments?")) {
      setAppointments([]);
      localStorage.removeItem("appointments");
    }
  };


  const filtered = appointments.filter((a) => {
    const matchesSearch =
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.mobileNumber.includes(search);
    const matchesCity = selectedCity === "All" || a.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const cities = ["All", ...Array.from(new Set(appointments.map((a) => a.city).filter(Boolean)))];

  // ─── Dashboard ────────────────────────────────────────────────────────────────
  // Middleware (src/middleware.ts) redirects unauthenticated users to /admin/login
  // before this component renders, so no login form is needed here.
  return (

    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f5f7",
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
      }}
    >
      {/* Top Bar */}
      <header
        style={{
          backgroundColor: "#723838",
          padding: "18px 5vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 4px 20px rgba(114,56,56,0.35)",
        }}
      >
        <div>
          <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: 800, margin: 0 }}>
            Admin Dashboard
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "13px", margin: 0 }}>
            Amanat Eye Hospital — Appointment Bookings
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link
            href="/ms39"
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.3)",
              transition: "all 0.2s",
            }}
          >
            ← Landing Page
          </Link>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>
      </header>

      <div style={{ padding: "32px 5vw" }}>

        {/* Stats Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {[
            { label: "Total Submissions", value: appointments.length, icon: "📋" },
            { label: "This City (Filter)", value: filtered.length, icon: "📍" },
            {
              label: "Prefer Call",
              value: appointments.filter((a) => a.contactMethod.includes("Call")).length,
              icon: "📞",
            },
            {
              label: "Prefer WhatsApp",
              value: appointments.filter((a) => a.contactMethod.includes("WhatsApp")).length,
              icon: "💬",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#fff",
                borderRadius: "14px",
                padding: "24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <span style={{ fontSize: "32px" }}>{stat.icon}</span>
              <div>
                <p style={{ fontSize: "28px", fontWeight: 800, color: "#723838", margin: 0, lineHeight: 1 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: "12px", color: "#888", margin: 0, marginTop: "4px" }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Row */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="🔍  Search by name or number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 260px",
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #e0e0e0",
              backgroundColor: "#fff",
              fontSize: "14px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {appointments.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                border: "1px solid #e74c3c",
                color: "#e74c3c",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🗑 Clear All
            </button>
          )}
        </div>

        {/* Table or Empty State */}
        {filtered.length === 0 ? (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "16px",
              padding: "80px 20px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontSize: "56px", marginBottom: "16px" }}>📭</div>
            <h2 style={{ color: "#333", fontWeight: 700, marginBottom: "8px" }}>
              No appointments yet
            </h2>
            <p style={{ color: "#aaa", fontSize: "14px" }}>
              Submissions from the booking form will appear here.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filtered.map((apt, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  padding: "28px 32px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr auto",
                  gap: "24px",
                  alignItems: "start",
                  borderLeft: "5px solid #723838",
                }}
              >
                {/* Personal Info */}
                <div>
                  <p style={{ fontSize: "18px", fontWeight: 700, color: "#111", margin: "0 0 6px 0" }}>
                    {apt.fullName || "—"}
                  </p>
                  <p style={{ fontSize: "14px", color: "#555", margin: "0 0 4px 0" }}>
                    📱 {apt.mobileNumber || "—"}
                  </p>
                  <p style={{ fontSize: "14px", color: "#555", margin: "0 0 4px 0" }}>
                    📍 {apt.city || "—"}
                  </p>
                  <p style={{ fontSize: "14px", color: "#555", margin: 0 }}>
                    🎂 Age: {apt.age || "—"}
                  </p>
                </div>

                {/* Interests */}
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#723838", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>
                    Topics
                  </p>
                  {apt.topics.length > 0 ? apt.topics.map((t) => (
                    <span
                      key={t}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#fef2f2",
                        color: "#723838",
                        fontSize: "12px",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        margin: "2px 4px 2px 0",
                        fontWeight: 500,
                      }}
                    >
                      {t}
                    </span>
                  )) : <p style={{ color: "#aaa", fontSize: "13px" }}>None selected</p>}
                </div>

                {/* Preferences */}
                <div>
                  <p style={{ fontSize: "12px", fontWeight: 700, color: "#723838", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "6px" }}>
                    Contact & Time
                  </p>
                  <p style={{ fontSize: "14px", color: "#555", margin: "0 0 4px 0" }}>
                    📞 {apt.contactMethod.join(", ") || "—"}
                  </p>
                  <p style={{ fontSize: "14px", color: "#555", margin: "0 0 8px 0" }}>
                    🕐 {apt.preferredTime.join(", ") || "—"}
                  </p>
                  {apt.notes && (
                    <p style={{ fontSize: "13px", color: "#888", fontStyle: "italic", margin: 0 }}>
                      💬 &ldquo;{apt.notes}&rdquo;
                    </p>
                  )}
                  <p style={{ fontSize: "11px", color: "#bbb", marginTop: "8px" }}>
                    🗓 {new Date(apt.submittedAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(i)}
                  style={{
                    backgroundColor: "#fff5f5",
                    border: "1px solid #fca5a5",
                    color: "#dc2626",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    alignSelf: "start",
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
