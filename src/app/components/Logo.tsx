import React from "react";

export function Logo({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 * scale, transform: `scale(${scale})`, transformOrigin: "left center" }}>
      {/* Icon Wrapper */}
      <div style={{ position: "relative", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center" }}>
        
        {/* Heart */}
        <svg width="34" height="34" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
          <path fill="#ff0000" d="M50 85C50 85 8 58 8 30C8 16 20 6 32 6C42 6 47 13 50 17C53 13 58 6 68 6C80 6 92 16 92 30C92 58 50 85 50 85Z" />
        </svg>

        {/* Cursor & Ripples */}
        <div style={{ position: "absolute", bottom: -2, right: -4 }}>
          {/* Ripples */}
          <div style={{ position: "absolute", top: 1, left: -2, width: 14, height: 14, border: "2px solid white", borderRadius: "50%" }}></div>
          <div style={{ position: "absolute", top: 4, left: 1, width: 8, height: 8, border: "2px solid white", borderRadius: "50%" }}></div>
          
          {/* Pointing Hand Icon (SVG outline) */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", top: 8, left: 5 }}>
            <path d="M14 6.5V2.5a2.5 2.5 0 0 0-5 0v11l-2.6-2.6a1.5 1.5 0 0 0-2.1 2.1l5.7 5.7c.6.6 1.4 1 2.3 1H17a4 4 0 0 0 4-4v-5a3 3 0 0 0-3-3h-4z"/>
          </svg>
        </div>

      </div>

      {/* Text */}
      <span style={{ 
        fontFamily: "'Bebas Neue', sans-serif", 
        fontSize: 38, 
        color: "#f5f0e6", 
        letterSpacing: "1px", 
        lineHeight: 1,
        transform: "translateY(2px)"
      }}>
        TAPS
      </span>
    </div>
  );
}
