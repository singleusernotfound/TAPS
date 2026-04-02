import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Pointer, Flame, Building2, MessageCircle, User, Bell, ChevronLeft } from "lucide-react";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { path: "/app/discover", icon: Flame, label: "Discover" },
  { path: "/app/campus", icon: Building2, label: "Campus" },
  { path: "/app/matches", icon: MessageCircle, label: "Matches" },
  { path: "/app/profile", icon: User, label: "Profile" },
];

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifOpen, setNotifOpen] = useState(false);

  const isChat = location.pathname.includes("/app/matches/");

  return (
    <div style={{ background: `radial-gradient(circle at 10% 20%, rgba(232, 50, 104, 0.06), transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 92, 43, 0.05), transparent 40%), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 35L23.5 33.6C18.2 28.8 14.5 25.4 14.5 21C14.5 17.5 17.2 14.8 20.6 14.8C22.5 14.8 24.3 15.7 25 17.1C25.7 15.7 27.5 14.8 29.4 14.8C32.8 14.8 35.5 17.5 35.5 21C35.5 25.4 31.8 28.8 26.5 33.6L25 35Z' fill='rgba(255, 92, 43, 0.03)'/%3E%3Cpath d='M75 85L73.5 83.6C68.2 78.8 64.5 75.4 64.5 71C64.5 67.5 67.2 64.8 70.6 64.8C72.5 64.8 74.3 65.7 75 67.1C75.7 65.7 77.5 64.8 79.4 64.8C82.8 64.8 85.5 67.5 85.5 71C85.5 75.4 81.8 78.8 76.5 83.6L75 85Z' fill='rgba(232, 50, 104, 0.02)'/%3E%3C/svg%3E") #0c0a08`, minHeight: "100vh", fontFamily: "'Syne', sans-serif", color: "#ffffff", display: "flex", flexDirection: "column", maxWidth: "100vw", overflow: "hidden" }}>
      {/* Top Bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(12,10,8,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isChat ? (
            <button onClick={() => navigate("/app/matches")} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
              <ChevronLeft size={18} />
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <Logo scale={0.6} />
              </button>
              <div style={{ background: "rgba(255,92,43,0.12)", border: "1px solid rgba(255,92,43,0.22)", borderRadius: 50, padding: "3px 10px", fontSize: 10, color: "#ff5c2b", fontWeight: 700, letterSpacing: "0.3px", fontFamily: "'Inter', sans-serif" }}>
                IIT Delhi
              </div>
            </>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <button onClick={() => setNotifOpen(!notifOpen)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.7)", position: "relative" }}>
              <Bell size={16} />
              <span style={{ position: "absolute", top: -2, right: -2, width: 16, height: 16, background: "#ff5c2b", borderRadius: "50%", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontWeight: 700, border: "2px solid #0c0a08" }}>3</span>
            </button>

            {notifOpen && (
              <div style={{ position: "absolute", top: 50, right: 0, width: 280, background: "#161210", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.6)", zIndex: 200 }}>
                <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>Notifications</div>
                {[
                  { text: "Aanya liked your hot take 🔥", time: "2m ago", dot: "#ff5c2b" },
                  { text: "New match! Rohan on IIT Delhi 🎉", time: "15m ago", dot: "#e83268" },
                  { text: "Priya commented on your playlist 🎵", time: "1h ago", dot: "#1DB954" },
                ].map((n, i) => (
                  <div key={i} style={{ padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 10, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer" }} onClick={() => setNotifOpen(false)}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.dot, marginTop: 5, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif", lineHeight: 1.4 }}>{n.text}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", marginTop: 3 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <img src="https://images.unsplash.com/photo-1622179986499-fa3dfabc8ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" alt="avatar"
            style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,92,43,0.35)", cursor: "pointer" }}
            onClick={() => navigate("/app/profile")} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, marginTop: 66, marginBottom: 72, overflowY: "auto", overflowX: "hidden" }}>
        <Outlet />
      </div>

      {/* Bottom Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, background: "rgba(12,10,8,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 0 16px" }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button key={item.path} onClick={() => navigate(item.path)}
              style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "4px 16px", position: "relative" }}>
              {item.path === "/app/matches" && (
                <span style={{ position: "absolute", top: 0, right: 6, width: 16, height: 16, background: "#ff5c2b", borderRadius: "50%", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", fontWeight: 700, color: "white", border: "2px solid #0c0a08" }}>4</span>
              )}
              <div style={{ width: 36, height: 36, borderRadius: 12, background: isActive ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", boxShadow: isActive ? "0 4px 16px rgba(255,92,43,0.35)" : "none" }}>
                <item.icon size={18} color={isActive ? "white" : "rgba(255,255,255,0.3)"} fill={isActive && item.path === "/app/discover" ? "white" : "none"} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: isActive ? "#ff5c2b" : "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", letterSpacing: "0.3px" }}>{item.label}</span>
            </button>
          );
        })}
      </div>

      {notifOpen && <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setNotifOpen(false)} />}
    </div>
  );
}
