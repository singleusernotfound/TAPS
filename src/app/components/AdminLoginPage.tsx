import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, ArrowRight, Pointer } from "lucide-react";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin credentials for the prototype
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("taps_admin_auth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div style={{ background: "#0c0a08", minHeight: "100vh", fontFamily: "'Syne', sans-serif", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #ff5c2b, #e83268)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Lock size={20} color="white" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>Admin Portal</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>Restricted access for Taps staff.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }} 
            autoFocus
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "14px 16px", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }} 
          />
          
          {error && <div style={{ color: "#ff5c2b", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{error}</div>}

          <button 
            type="submit"
            style={{ background: "white", border: "none", borderRadius: 12, padding: "14px", color: "black", fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}
          >
            Login to Dashboard <ArrowRight size={16} />
          </button>
        </form>

        <button 
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 12, fontFamily: "'Inter', sans-serif", marginTop: 24, cursor: "pointer", width: "100%" }}
        >
          ← Back to main site
        </button>
      </div>
    </div>
  );
}
