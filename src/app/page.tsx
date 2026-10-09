"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      const heroHeight = heroSection ? heroSection.clientHeight : window.innerHeight;
      if (window.scrollY > heroHeight - 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check immediately on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <main className="flex flex-col w-full">

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="hero-section">
        {/* Header */}
        <header
          className="site-header"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: "24px 2vw",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pointerEvents: "none",
          }}
        >
          <div style={{ width: 60, height: 60, position: "relative", pointerEvents: "auto" }}>
            <Image
              src="/ms39/assets/headerlogo.png"
              alt="Amanat Eye Hospital Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <Link
            href="/book-appointment"
            className="book-now-btn"
            style={{
              pointerEvents: "auto",
              backgroundColor: isScrolled ? "#723838" : "#ffffff",
              borderColor: isScrolled ? "#723838" : "#ffffff",
              color: isScrolled ? "#ffffff" : "#381212",
              padding: "10px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              textDecoration: "none",
              fontFamily: "var(--font-inter), sans-serif",
              transition: "all 0.3s ease"
            }}
          >
            Book Now
          </Link>
        </header>

        {/* Hero Body */}
        <div className="hero-content" style={{ padding: "100px 0 60px 0" }}>
          <div className="content-container hero-flex-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
            {/* Left Text */}
            <div className="hero-text-container" style={{ flex: "1 1 360px", maxWidth: 520 }}>
              <h1
                className="section-title-white"
                style={{ fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 600, marginBottom: 18, lineHeight: 1.18 }}
              >
                <span className="hero-title-line-1">Get Glasses Free Life</span>
                <span className="hero-title-line-2">With MS-39 Guided Femto LASIK</span>
              </h1>
              <p className="hero-subtitle" style={{ color: "#ffffff", fontFamily: "var(--font-poppins), 'Poppins', sans-serif", fontWeight: 600, fontSize: "clamp(14px, 1.5vw, 17px)", opacity: 0.92 }}>
                Because your eyes deserve more than a standard measurement.
              </p>
            </div>

            {/* Right Device Image */}
            <div className="hero-device-container" style={{ flex: "0 0 auto", width: "clamp(380px, 44vw, 560px)", position: "relative", marginBottom: "-140px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ms39/assets/device.png"
                alt="MS-39 Diagnostic Device"
                className="hero-device-image"
                style={{ objectFit: "contain", width: "100%", height: "auto", filter: "drop-shadow(0 10px 40px rgba(0,0,0,0.5))" }}
              />
            </div>
          </div>
        </div>
      </section>


      {/* ============================================
          WHAT MAKES MS-39 DIFFERENT
          ============================================ */}
      <section style={{ backgroundColor: "#ffffff", padding: "160px 0 48px 0" }}>
        <div className="content-container">
          <h2
            className="section-title-maroon"
            style={{ fontSize: "clamp(22px, 3.5vw, 40px)", marginBottom: 24 }}
          >
            What Makes MS-39 Different?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(16px, 1.8vw, 22px)",
              color: "#000000",
              lineHeight: 1.75,
            }}
          >
            Your eyes have unique microscopic details that standard scans can miss. MS-39 Guided Femto-LASIK
            is designed to capture those details&mdash;so your treatment plan is based on your eyes, not averages. It
            combines{" "}
            <strong style={{ fontWeight: 700 }}>
              corneal topography + wavefront analysis + tear film evaluation
            </strong>{" "}
            to build a highly detailed
            map of your eye&apos;s optical system.
          </p>
        </div>
      </section>

      {/* ============================================
          WHAT CAN YOU EXPECT
          ============================================ */}
      <section style={{ backgroundColor: "#ffffff", padding: "0 0 0 0" }}>
        <div className="content-container">
          <h2
            className="section-title-maroon"
            style={{ fontSize: "clamp(20px, 3vw, 36px)", marginBottom: 24 }}
          >
            What Can You Expect?
          </h2>

          {/* Grid + Image side-by-side */}
          <div className="expect-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "clamp(20px, 3vw, 40px)", flexWrap: "nowrap" }}>
            {/* 3x2 Grid */}
            <div
              className="expect-grid"
              style={{
                flex: "1 1 65%",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(40px, 6vw, 100px) clamp(10px, 1.5vw, 24px)",
              }}
            >
              {[
                "Detailed eye examination",
                "Advanced corneal measurements",
                "Personalized consultation",
                "Explanation of suitable options",
                "Guidance from experienced specialists",
                "Modern diagnostic equipment",
              ].map((item, i) => (
                <div key={i} className="expect-item" style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif", fontSize: "clamp(16px, 1.7vw, 20px)", fontWeight: 500, gap: 14 }}>
                  <span className="expect-arrow" style={{ fontSize: "clamp(18px, 2vw, 24px)" }}>→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Doctor Image */}
            <div
              className="doctor-image-container interactive-image-container"
              style={{
                flex: "0 0 32%",
                maxWidth: 400,
                overflow: "hidden",
              }}
            >
              <Image
                src="/ms39/assets/doc.jpeg"
                alt="Eye specialist doctor"
                width={340}
                height={340}
                className="interactive-image"
                style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          YOUR CONSULTATION JOURNEY
          ============================================ */}
      <section style={{ backgroundColor: "#ffffff", padding: "0 0 64px 0" }}>
        <div className="content-container">
          <h2
            className="section-title-maroon"
            style={{ fontSize: "clamp(20px, 3vw, 36px)", marginBottom: 12 }}
          >
            Your Consultation Journey
          </h2>
          <p
            style={{
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(13px, 1.3vw, 15px)",
              color: "#333333",
              marginBottom: 4,
            }}
          >
            Every patient&apos;s eyes are different. That&apos;s why we begin with a step-by-step evaluation.
          </p>
          <p
            style={{
              fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(13px, 1.3vw, 15px)",
              color: "#333333",
              marginBottom: 24,
            }}
          >
            During your visit, our team will:
          </p>

          {/* Journey Image */}
          <div className="interactive-image-container" style={{ maxWidth: 860, margin: "0 auto", width: "100%", position: "relative", backgroundColor: "#ffffff", borderRadius: 12, overflow: "hidden" }}>
            <Image
              src="/ms39/assets/con_jon.png"
              alt="Consultation journey steps 1 through 5"
              width={1200}
              height={675}
              className="interactive-image"
              style={{ objectFit: "cover", width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </div>
      </section>

      {/* ============================================
          NOT ALL EYES QUALIFY (Dark Section)
          ============================================ */}
      <section className="dark-section">
        <div className="dark-section-content" style={{ padding: "64px 0" }}>
          <div className="content-container">
            {/* Heading */}
            <h2
              className="section-title-white"
              style={{ fontSize: "clamp(22px, 3.5vw, 40px)", marginBottom: 24 }}
            >
              Not all eyes qualify. That&apos;s the point!
            </h2>

            {/* Content Row */}
            <div className="dark-content-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "clamp(20px, 4vw, 60px)", flexWrap: "wrap" }}>
              {/* Left Text */}
              <div style={{ flex: "1 1 400px" }}>
                <p
                  style={{
                    color: "#e0e0e0",
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: "clamp(16px, 1.7vw, 20px)",
                    marginBottom: 28,
                    lineHeight: 1.7,
                  }}
                >
                  We don&apos;t believe in rushing patients into surgery.Before recommending MS-39 Guided Femto-LASIK, a full diagnostic evaluation is performed to determine:
                </p>
                <ul className="dark-bullet-list" style={{ marginBottom: 28 }}>
                  <li style={{ fontSize: "clamp(16px, 1.7vw, 20px)", marginBottom: 12 }}>Corneal thickness</li>
                  <li style={{ fontSize: "clamp(16px, 1.7vw, 20px)", marginBottom: 12 }}>Eye shape and stability</li>
                  <li style={{ fontSize: "clamp(16px, 1.7vw, 20px)", marginBottom: 12 }}>Degree of refractive error</li>
                  <li style={{ fontSize: "clamp(16px, 1.7vw, 20px)", marginBottom: 12 }}>Overall eye health</li>
                </ul>
                <p
                  style={{
                    color: "#e0e0e0",
                    fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                    fontSize: "clamp(16px, 1.7vw, 20px)",
                    lineHeight: 1.7,
                    fontWeight: 600,
                  }}
                >
                  Only when it&apos;s safe and suitable do we move forward.
                </p>
              </div>

              {/* Right Images (Overlapping Layout) */}
              <div
                className="dark-images-wrapper"
                style={{
                  flex: "1 1 400px",
                  position: "relative",
                  maxWidth: 560,
                  height: "clamp(300px, 40vw, 440px)",
                }}
              >
                {/* Top Left Image */}
                <div
                  className="interactive-image-container"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "80%",
                    height: "85%",
                    borderRadius: 24,
                    overflow: "hidden",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                    zIndex: 1,
                  }}
                >
                  <Image
                    src="/ms39/assets/dev2.png"
                    alt="Patient undergoing eye examination"
                    width={420}
                    height={300}
                    className="interactive-image"
                    style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                  />
                </div>
                {/* Bottom Right Image */}
                <div
                  className="interactive-image-container"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "60%",
                    height: "60%",
                    borderRadius: 24,
                    overflow: "hidden",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
                    zIndex: 2,
                  }}
                >
                  <Image
                    src="/ms39/assets/dev3.jpg"
                    alt="MS-39 device scan readout"
                    width={340}
                    height={200}
                    className="interactive-image"
                    style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          WHY CHOOSE AMANAT EYE HOSPITAL
          ============================================ */}
      <section style={{ backgroundColor: "#ffffff", padding: "64px 0" }}>
        <div className="content-container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            {/* Left Hospital Image */}
            <div
              className="hospital-image-container interactive-image-container"
              style={{ flex: "1 1 auto", width: "clamp(320px, 50vw, 640px)" }}
            >
              <Image
                src="/ms39/assets/amanat_pic.jpg"
                alt="Amanat Eye Hospital building"
                width={640}
                height={480}
                className="interactive-image"
                style={{ objectFit: "cover", width: "100%", height: "auto", display: "block" }}
              />
            </div>

            {/* Right Text */}
            <div style={{ flex: "1 1 auto", maxWidth: 720 }}>
              <h2
                className="section-title-maroon"
                style={{ fontSize: "clamp(22px, 3vw, 40px)", marginBottom: 20 }}
              >
                Why Choose Amanat Eye Hospital?
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  color: "#444444",
                  marginBottom: 20,
                }}
              >
                Because technology alone isn&apos;t enough.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  fontWeight: 600,
                  color: "#111111",
                  marginBottom: 14,
                }}
              >
                We combine:
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 20px 0",
                }}
              >
                {[
                  "MS-39 diagnostic precision",
                  "Experienced refractive surgeons",
                  "Patient-first evaluation process",
                  "Transparent consultation approach",
                ].map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                      fontSize: "clamp(15px, 1.5vw, 19px)",
                      color: "#333333",
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ color: "#723838", marginTop: 2, fontSize: "1.2em" }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontSize: "clamp(15px, 1.5vw, 19px)",
                  color: "#444444",
                  marginBottom: 12,
                }}
              >
                Every decision is guided by one principle:
              </p>
              <p
                style={{
                  fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                  fontSize: "clamp(16px, 1.6vw, 20px)",
                  fontWeight: 700,
                  color: "#111111",
                }}
              >
                Your vision deserves careful thinking, not quick decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          BOOK YOUR APPOINTMENT (CTA)
          ============================================ */}
      <section id="book-appointment" style={{ backgroundColor: "#ffffff", padding: "0 0 64px 0", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "90%", maxWidth: 1600 }}>
          <div className="cta-section">
            <div className="cta-section-content" style={{ padding: "60px 48px" }}>
              <h2
                className="section-title-white"
                style={{ fontSize: "clamp(22px, 3.5vw, 40px)", marginBottom: 16 }}
              >
                Book Your Appointment
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-inter), 'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(13px, 1.4vw, 16px)",
                  color: "rgba(255,255,255,0.85)",
                  marginBottom: 32,
                }}
              >
                Take the first step by scheduling a comprehensive eye assessment.
              </p>
              <Link href="/book-appointment" className="cta-consult-btn">
                Book Your Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
            <footer className="site-footer" style={{ padding: "48px 0 24px 0", backgroundColor: "#e2e1df" }}>
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
