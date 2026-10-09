"use client";

import React, { useState } from "react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    name: "Javeria Arshad",
    role: "(Senior Talent Executive)",
    image: "/ms39/assets/pop1.jpg",
    videoLink: "https://www.youtube.com/watch?v=64cXh887RY4&t=1s",
    text: "For Javeria, glasses and contact lenses often got in the way of the life she wanted to live. Water sports became difficult, contact lenses were uncomfortable during long events, and managing them at weddings, social gatherings, and professional commitments was an ongoing challenge. Looking for a long-term solution, she chose MS-39 Guided Femto LASIK at Amanat Eye Hospital. Today, she enjoys greater freedom and convenience without the daily dependence on glasses or contact lenses."
  },
  {
    name: "Yusma Akhand",
    role: "(Content Creator)",
    image: "/ms39/assets/pop2.png",
    videoLink: "https://www.youtube.com/watch?v=FFwz0e69668",
    text: "For 13 years, Yusma relied on glasses to see the world clearly. She had always dreamed of life without them and counted down to her 18th birthday—the milestone that made her eligible for vision correction surgery. When the time came, she chose MS-39 Guided Femto LASIK at Amanat Eye Hospital. Today, she enjoys the freedom of clear vision without glasses, allowing her to create content and embrace everyday moments with greater confidence."
  },
  {
    name: "Aman Ali",
    role: "(Content Creator)",
    image: "/ms39/assets/pop3.jpg",
    videoLink: "https://www.youtube.com/watch?v=XkvQEkrj9j0",
    text: "After wearing glasses for 7 years, Aman decided it was time to experience life with clearer vision. He chose Clear SUPRA at Amanat Eye Hospital, where Dr. Aamir Asrar recommended a personalised treatment plan based on his eyes and visual needs"
  },
  {
    name: "Azka Malik",
    role: "(Content Creator)",
    image: "/ms39/assets/pop4.png",
    videoLink: "https://www.youtube.com/watch?v=W90aX5nEZcY",
    text: "With a prescription of -5.75, Azka had relied on glasses for clear vision in both her personal and professional life. Looking for a long-term solution, she chose MS-39 Guided Femto LASIK at Amanat Eye Hospital under the care of Dr. Aamir Asrar."
  }
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const toggleExpand = (idx: number) => {
    setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div style={{ width: "100%", padding: "60px 0", backgroundColor: "#ffffff", overflow: "hidden" }}>
      <h2 style={{ 
        textAlign: "center", 
        fontSize: "clamp(24px, 4vw, 36px)", 
        fontWeight: "bold", 
        fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
        color: "#111",
        marginBottom: "60px"
      }}>
        Every Goodbye to Glasses Has a Story!
      </h2>

      <div style={{ 
        position: "relative", 
        width: "100%", 
        maxWidth: "1400px", 
        margin: "0 auto", 
        height: "460px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: "1200px"
      }}>
        {TESTIMONIALS.map((t, idx) => {
          let diff = idx - activeIndex;
          while (diff < -2) diff += TESTIMONIALS.length;
          while (diff > 1) diff -= TESTIMONIALS.length;

          let translateX = "0%";
          let translateZ = "0px";
          let rotateY = "0deg";
          let zIndex = 10;
          let filter = "grayscale(0%)";
          let opacity = 1;
          let pointerEvents: "auto" | "none" = "none";

          if (diff === 0) {
            translateX = "0%";
            translateZ = "0px";
            rotateY = "0deg";
            zIndex = 20;
            filter = "grayscale(0%)";
            opacity = 1;
            pointerEvents = "auto";
          } else if (diff === -1) {
            translateX = "-65%";
            translateZ = "-120px";
            rotateY = "12deg";
            zIndex = 10;
            filter = "grayscale(100%)";
            opacity = 0.8;
            pointerEvents = "auto"; // allow clicking side cards to navigate if we wanted, but let's just enable pointer events so hover works
          } else if (diff === 1) {
            translateX = "65%";
            translateZ = "-120px";
            rotateY = "-12deg";
            zIndex = 10;
            filter = "grayscale(100%)";
            opacity = 0.8;
            pointerEvents = "auto";
          } else {
            // Hidden items
            translateX = "0%";
            translateZ = "-400px";
            rotateY = "0deg";
            zIndex = 0;
            opacity = 0;
            pointerEvents = "none";
          }

          const isExpanded = expandedCards[idx];
          const maxTextLength = 160;
          const isTruncated = t.text.length > maxTextLength;
          const displayText = (isTruncated && !isExpanded) ? t.text.substring(0, maxTextLength) + "..." : t.text;

          return (
            <div 
              key={idx}
              onClick={() => {
                if (diff !== 0) setActiveIndex(idx);
              }}
              style={{
                position: "absolute",
                width: "min(600px, 80vw)",
                height: "400px",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                transform: `translateX(${translateX}) translateZ(${translateZ}) rotateY(${rotateY})`,
                zIndex,
                filter,
                opacity,
                pointerEvents,
                cursor: diff !== 0 ? "pointer" : "default",
                boxShadow: diff === 0 ? "0 20px 40px rgba(0,0,0,0.4)" : "0 10px 20px rgba(0,0,0,0.2)"
              }}
            >
              {/* Background Image */}
              <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
                <img src={t.image} alt={t.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              
              {/* Gradient Overlay */}
              <div style={{ 
                position: "absolute", 
                inset: 0, 
                background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
                zIndex: 2
              }} />

              {/* Content */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "30px",
                zIndex: 3,
                color: "white",
                fontFamily: "var(--font-poppins), 'Poppins', sans-serif",
                opacity: diff === 0 ? 1 : 0.6,
                transition: "opacity 0.6s ease"
              }}>
                <h3 style={{ fontSize: "24px", fontWeight: "bold", margin: "0 0 4px 0" }}>{t.name}</h3>
                <p style={{ fontSize: "14px", margin: "0 0 12px 0", color: "#e0e0e0" }}>{t.role}</p>
                <p style={{ fontSize: "13px", lineHeight: "1.5", color: "#cccccc", marginBottom: "16px" }}>
                  {displayText}
                  {isTruncated && !isExpanded && (
                    <span 
                      onClick={(e) => { e.stopPropagation(); toggleExpand(idx); }} 
                      style={{ color: "#d13131", fontWeight: "bold", cursor: "pointer" }}
                    >
                       See more...
                    </span>
                  )}
                  {isExpanded && (
                    <span 
                      onClick={(e) => { e.stopPropagation(); toggleExpand(idx); }} 
                      style={{ color: "#d13131", fontWeight: "bold", cursor: "pointer" }}
                    >
                       Show less
                    </span>
                  )}
                </p>
                
                <a 
                  href={t.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    display: "inline-flex", 
                    alignItems: "center", 
                    gap: "6px",
                    color: "#d13131", 
                    fontSize: "12px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    letterSpacing: "0.5px"
                  }}
                >
                  <span style={{ fontSize: "10px" }}>▶</span> HEAR {t.name.split(" ")[0].toUpperCase()}&apos;S STORY IN HER OWN WORDS
                </a>
              </div>
            </div>
          );
        })}

        {/* Navigation Arrows Container */}
        <div style={{ 
          position: "absolute", 
          width: "min(600px, 80vw)", 
          height: "400px", 
          pointerEvents: "none", 
          zIndex: 40, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between" 
        }}>
          <button 
            onClick={goPrev}
            style={{
              pointerEvents: "auto",
              transform: "translateX(-50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(114, 56, 56, 0.9)",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            aria-label="Previous story"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button 
            onClick={goNext}
            style={{
              pointerEvents: "auto",
              transform: "translateX(50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(114, 56, 56, 0.9)",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
            aria-label="Next story"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
