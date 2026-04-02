import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { ArrowRight, Loader2, Pointer } from "lucide-react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    
    setLoading(true);
    setError("");

    try {
      if (import.meta.env.VITE_FIREBASE_API_KEY || auth.app.options.apiKey !== "YOUR_API_KEY") {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/app/discover");
      } else {
        // Mock login
        console.warn("Using placeholder Firebase config. Mocking successful login!");
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network request
        const mockUser = localStorage.getItem("taps_mockUser");
        if (mockUser) {
           navigate("/app/discover");
        } else {
           setError("No mock account found. Please sign up first.");
        }
      }
    } catch (err: any) {
      if (err.message.includes("API key")) {
        setError("Firebase missing credentials. Please update src/lib/firebase.ts!");
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#0c0a08", minHeight: "100vh", fontFamily: "'Syne', sans-serif", color: "#ffffff", display: "flex", flexDirection: "column" }}>
      
      {/* Top bar with back to site */}
      <div style={{ padding: "16px 20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 50, padding: "7px 14px",
            color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif"
          }}
        >
          ← Back
        </button>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #ff5c2b, #e83268)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Pointer size={22} color="white" />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>Welcome back</h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", textAlign: "center" }}>Enter your details to get back to swiping.</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input 
              type="email" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              disabled={loading}
              style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 12, padding: "14px", color: "white", fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: loading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <>Log in <ArrowRight size={16} /></>}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>
            Don't have an account?{" "}
            <button onClick={() => navigate("/onboarding")} style={{ background: "none", border: "none", color: "#ff5c2b", cursor: "pointer", fontWeight: 600, padding: 0 }}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
