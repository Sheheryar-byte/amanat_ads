"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    city: "",
    age: "",
    topics: [] as string[],
    contactMethod: [] as string[],
    preferredTime: [] as string[],
    notes: "",
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero is 70vh tall; switch color after scrolling past it
      const heroHeight = window.innerHeight * 0.7;
      setIsScrolled(window.scrollY > heroHeight - 80);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async () => {
    const entry = { ...formData, submittedAt: new Date().toISOString() };
    
    // Save to Database (MongoDB)
    try {
      const res = await fetch('/ms39/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        alert(`Warning: Database connection failed (Status ${res.status}). Error: ${errorData.error || 'Unknown'}\n\nPlease make sure your MONGODB_URI secret was saved correctly in GitHub Settings -> Secrets before the deployment ran.`);
      }
    } catch (e) {
      console.error("Failed to save to database", e);
      alert("Error connecting to the database server.");
    }
    
    // Build WhatsApp Message
    const text = `*New Appointment Request*
*Name:* ${formData.fullName}
*Mobile:* ${formData.mobileNumber}
*City:* ${formData.city}
*Age:* ${formData.age}
*Topics:* ${formData.topics.join(", ") || "None"}
*Contact Method:* ${formData.contactMethod.join(", ") || "None"}
*Preferred Time:* ${formData.preferredTime.join(", ") || "None"}
*Notes:* ${formData.notes || "None"}`;

    // Redirect to WhatsApp
    const whatsappUrl = `https://wa.me/923000545879?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");

    setShowSuccess(true);
  };

  const handleCheckboxChange = (field: "topics" | "contactMethod" | "preferredTime", value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };



  const inputStyle = {
    width: "100%",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#f9f9f9",
    fontFamily: "var(--font-inter), 'Inter', sans-serif",
    fontSize: "15px",
    color: "#333",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-inter), 'Inter', sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    color: "#111",
    marginBottom: "8px",
  };

  const sectionTitleStyle = {
    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
    fontSize: "clamp(24px, 4vw, 32px)",
    fontWeight: 700,
    color: "#000",
    marginBottom: "32px",
  };

  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontFamily: "var(--font-inter), 'Inter', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: "#333",
    cursor: "pointer",
    marginBottom: "12px",
  };

  return (
    <main style={{ minHeight: "100vh", position: "relative", backgroundColor: "#fff" }}>

      {/* ── Success Modal ─────────────────────────────── */}
      {showSuccess && (
        <div
          onClick={() => setShowSuccess(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(6px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              padding: "56px 48px",
              maxWidth: "440px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
            }}
          >
            {/* Check circle */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#fef2f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#723838" opacity="0.15" />
                <path
                  d="M11 21l6 6 12-13"
                  stroke="#723838"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                fontSize: "26px",
                fontWeight: 800,
                color: "#111",
                marginBottom: "12px",
              }}
            >
              Booking Received!
            </h2>
            <p
              style={{
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: "15px",
                color: "#666",
                lineHeight: 1.7,
                marginBottom: "36px",
              }}
            >
              Thank you, <strong>{formData.fullName || "there"}</strong>!<br />
              Our team will reach out to you at <strong>{formData.mobileNumber || "your number"}</strong> soon.
            </p>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setShowSuccess(false)}
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  border: "2px solid #e0e0e0",
                  backgroundColor: "#fff",
                  color: "#555",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}
              >
                Close
              </button>
              <a
                href="/ms39"
                style={{
                  padding: "12px 28px",
                  borderRadius: "10px",
                  backgroundColor: "#723838",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                }}
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Hero Section for Parallax / Lazy Scrolling Effect */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "70vh",
          width: "100%",
          zIndex: 0,
          background: "url('/ms39/assets/background.jpg') center/cover no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Header inside Hero so it stays at top */}
        <header
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            padding: "24px 5vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 50,
          }}
        >
          <Link href="/ms39">
            <div style={{ width: 85, height: 85, position: "relative" }}>
              <Image
                src="/ms39/assets/headerlogo.png"
                alt="Amanat Eye Hospital Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </Link>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", pointerEvents: "auto", alignItems: "stretch" }}>
            <Link
              href="/book-appointment"
              style={{
                backgroundColor: isScrolled ? "#723838" : "#ffffff",
                color: isScrolled ? "#ffffff" : "#381212",
                padding: "10px 24px",
                borderRadius: "8px",
                fontWeight: "bold",
                textDecoration: "none",
                textAlign: "center",
                fontFamily: "var(--font-inter), sans-serif",
                transition: "all 0.3s ease",
              }}
            >
              Book Now
            </Link>
            <a
              href="https://amanateyehospital.com/refractive"
              target="_blank"
              rel="noopener noreferrer"
              className="learn-more-btn"
              style={{
                backgroundColor: isScrolled ? "transparent" : "rgba(0,0,0,0.1)",
                border: isScrolled ? "1.5px solid #723838" : "1.5px solid #ffffff",
                color: isScrolled ? "#723838" : "#ffffff",
                padding: "6px 12px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "14px",
                textDecoration: "none",
                textAlign: "center",
                fontFamily: "var(--font-inter), sans-serif",
                transition: "all 0.3s ease"
              }}
            >
              Learn More
            </a>
          </div>
        </header>

        <h1
          style={{
            fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
            fontSize: "clamp(40px, 8vw, 80px)",
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            padding: "0 20px",
          }}
        >
          Appointment<br />Booking Form
        </h1>
      </div>

      {/* Form Section sliding over the hero */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#ffffff",
          width: "100%",
          minHeight: "100vh",
          padding: "60px 5vw",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>

          <h2 style={sectionTitleStyle}>Personal Details</h2>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Full Name</label>
            <input
              type="text"
              placeholder="Jane Smith"
              style={inputStyle}
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Mobile Number</label>
            <input
              type="tel"
              placeholder="+92 111 1111 111"
              style={inputStyle}
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>City</label>
            <select
              style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="Rawalpindi">Rawalpindi</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Peshawar">Peshawar</option>
            </select>
          </div>

          <div style={{ marginBottom: "64px" }}>
            <label style={labelStyle}>Age</label>
            <input
              type="number"
              placeholder="18"
              style={inputStyle}
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
          </div>

          <h2 style={{ ...sectionTitleStyle, marginBottom: "8px" }}>Interested in Information About</h2>
          <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#111", marginBottom: "24px" }}>
            (Select all that apply)
          </p>

          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: "15px", fontWeight: 600, color: "#111", marginBottom: "16px" }}>
              Which topic would you like to learn about?
            </p>
            {[
              "Laser vision correction options",
              "Lens implant options",
              "Advanced eye procedures",
              "Not sure - need guidance",
            ].map((topic) => (
              <label key={topic} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  style={{ width: "16px", height: "16px", accentColor: "#723838", cursor: "pointer" }}
                  checked={formData.topics.includes(topic)}
                  onChange={() => handleCheckboxChange("topics", topic)}
                />
                {topic}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: "15px", fontWeight: 600, color: "#111", marginBottom: "16px" }}>
              Preferred contact method
            </p>
            {["Call", "WhatsApp"].map((method) => (
              <label key={method} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  style={{ width: "16px", height: "16px", accentColor: "#723838", cursor: "pointer" }}
                  checked={formData.contactMethod.includes(method)}
                  onChange={() => handleCheckboxChange("contactMethod", method)}
                />
                {method}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontFamily: "var(--font-inter), 'Inter', sans-serif", fontSize: "15px", fontWeight: 600, color: "#111", marginBottom: "16px" }}>
              Preferred time
            </p>
            {["Morning", "Evening"].map((time) => (
              <label key={time} style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  style={{ width: "16px", height: "16px", accentColor: "#723838", cursor: "pointer" }}
                  checked={formData.preferredTime.includes(time)}
                  onChange={() => handleCheckboxChange("preferredTime", time)}
                />
                {time}
              </label>
            ))}
          </div>

          <div style={{ marginBottom: "48px" }}>
            <label style={labelStyle}>Additional notes</label>
            <textarea
              placeholder="Anything..."
              style={{ ...inputStyle, minHeight: "100px", resize: "vertical" }}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "64px" }}>
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: "#723838",
                color: "white",
                padding: "16px 48px",
                borderRadius: "8px",
                fontFamily: "var(--font-inter), 'Inter', sans-serif",
                fontSize: "16px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(114, 56, 56, 0.3)",
              }}
            >
              Submit
            </button>
          </div>

        </div>
      </div>

      {/* ============================================
          FOOTER
          ============================================ */}
            <footer className="site-footer" style={{ padding: "48px 0 24px 0", backgroundColor: "#e2e1df", position: "relative", zIndex: 10 }}>
        <div className="content-container" style={{ position: "relative" }}>
          {/* Main Grid */}
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1fr 1.2fr",
              gap: 40,
              marginBottom: 40,
            }}
          >
            {/* About Column */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ width: 100, height: 100, position: "relative", marginBottom: 20 }}>
                <Image
                  src="/ms39/assets/footerlogo.png"
                  alt="Amanat Eye Hospital Logo"
                  fill
                  style={{ objectFit: "contain", objectPosition: "left" }}
                />
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "#723838",
                  marginBottom: 16,
                }}
              >
                About Amanat Eye Hospital
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontSize: 13,
                  color: "#444444",
                  lineHeight: 1.6,
                  textAlign: "justify"
                }}
              >
                Since 1958, Amanat Eye Hospital has been a trusted leader in premium eye care, setting the standard for ophthalmic excellence across Pakistan. With facilities in Rawalpindi, Islamabad, Peshawar, and Lahore, we offer refractive surgery, cataract and glaucoma treatment, pediatric eye care, oculoplastics, retina care, and general OPD services. Every treatment plan is built around what the patient actually needs, using equipment like the SCHWIND MS-39 and SCHWIND AMARIS® 1050RS for accurate diagnosis and surgery.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#723838",
                  marginBottom: 20,
                  textTransform: "uppercase"
                }}
              >
                SERVICES
              </h4>
              {[
                { name: "Refractive Center", url: "https://amanateyehospital.com/refractive" },
                { name: "Cataract Center", url: "https://amanateyehospital.com/cataract" },
                { name: "Glaucoma Center", url: "https://amanateyehospital.com/glaucoma" },
                { name: "Retina & Vitreus Center", url: "https://amanateyehospital.com/retina" },
                { name: "Pediatric Eye Care", url: "https://amanateyehospital.com/pediatric" },
                { name: "Oculoplastic Center", url: "https://amanateyehospital.com/oculoplasty" },
                { name: "Contact Lens Fitting", url: "https://amanateyehospital.com/contact-lens-fitting" },
                { name: "General OPD", url: "https://amanateyehospital.com/general-opd" }
              ].map((service) => (
                <a
                  key={service.name}
                  href={service.url}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: 13,
                    color: "#444444",
                    marginBottom: 16,
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#723838"}
                  onMouseLeave={e => e.currentTarget.style.color = "#444444"}
                >
                  {service.name}
                </a>
              ))}
            </div>

            {/* Our Presence */}
            <div>
              <h4
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#723838",
                  marginBottom: 20,
                  textTransform: "uppercase"
                }}
              >
                OUR PRESENCE
              </h4>
              {[
                { name: "Rawalpindi", url: "https://amanateyehospital.com/rawalpindi" },
                { name: "Islamabad", url: "https://amanateyehospital.com/islamabad" },
                { name: "Lahore", url: "https://amanateyehospital.com/lahore" },
                { name: "Peshawar", url: "https://amanateyehospital.com/peshawar" },
              ].map((city) => (
                <a
                  key={city.name}
                  href={city.url}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: 13,
                    color: "#444444",
                    marginBottom: 16,
                    textDecoration: "none",
                    transition: "color 0.2s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = "#723838"}
                  onMouseLeave={e => e.currentTarget.style.color = "#444444"}
                >
                  {city.name}
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#723838",
                  marginBottom: 20,
                  textTransform: "uppercase"
                }}
              >
                CONTACT INFO
              </h4>

              {/* Email */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <svg style={{ color: "#723838", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:info@amanathospital.com" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif", fontSize: 13, color: "#444", textDecoration: "none" }}>
                  info@amanathospital.com
                </a>
              </div>

              {/* Phone */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <svg style={{ color: "#723838", flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif", fontSize: 13, color: "#444" }}>+92 51 843 9993</span>
              </div>

              {/* Hours */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                <svg style={{ color: "#723838", marginTop: 2, flexShrink: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif", fontSize: 13, color: "#444", lineHeight: 1.6 }}>
                  Mon - Sat 9 am - 8 pm<br />
                  Sunday 11 pm - 1 am (Rawalpindi)
                </span>
              </div>
            </div>
          </div>

          {/* Social Icons - Right Aligned at Bottom */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 20, marginTop: 20 }}>
            {/* Facebook */}
            <a href="https://www.facebook.com/amanateyehospitals/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "#111", transition: "color 0.2s", display: "flex" }} onMouseEnter={e => e.currentTarget.style.color = "#723838"} onMouseLeave={e => e.currentTarget.style.color = "#111"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://www.instagram.com/amanateyehospitals/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "#111", transition: "color 0.2s", display: "flex" }} onMouseEnter={e => e.currentTarget.style.color = "#723838"} onMouseLeave={e => e.currentTarget.style.color = "#111"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@amanateyehospital" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "#111", transition: "color 0.2s", display: "flex" }} onMouseEnter={e => e.currentTarget.style.color = "#723838"} onMouseLeave={e => e.currentTarget.style.color = "#111"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.87a8.29 8.29 0 0 0 4.84 1.55V7a4.85 4.85 0 0 1-1.07-.31z" />
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" aria-label="WhatsApp" style={{ color: "#111", transition: "color 0.2s", display: "flex" }} onMouseEnter={e => e.currentTarget.style.color = "#723838"} onMouseLeave={e => e.currentTarget.style.color = "#111"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/company/amanat-eye-hospital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: "#111", transition: "color 0.2s", display: "flex" }} onMouseEnter={e => e.currentTarget.style.color = "#723838"} onMouseLeave={e => e.currentTarget.style.color = "#111"}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="https://www.youtube.com/channel/UCEbfMFShEnzdViZTCJrto6w" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "#111", transition: "color 0.2s", display: "flex" }} onMouseEnter={e => e.currentTarget.style.color = "#723838"} onMouseLeave={e => e.currentTarget.style.color = "#111"}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#e2e1df" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

    </main>
  );
}
