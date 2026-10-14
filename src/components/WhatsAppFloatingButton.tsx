import React from "react";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href="https://wa.me/923000545879"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float-btn"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/ms39/assets/wapp.jpg"
        alt="WhatsApp"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
          transform: "scale(1.12)",
          display: "block",
        }}
      />
    </a>
  );
}
