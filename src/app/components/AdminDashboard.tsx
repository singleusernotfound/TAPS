import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Shield, Users, Trash2, LogOut, Loader2, ArrowLeft } from "lucide-react";

export function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if auth token exists
    const isAuth = localStorage.getItem("taps_admin_auth");
    if (!isAuth) {
      navigate("/admin");
      return;
    }

    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const fetchedUsers: any[] = [];
        snapshot.forEach((d) => {
          fetchedUsers.push({ id: d.id, ...d.data() });
        });
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("taps_admin_auth");
    navigate("/admin");
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "users", userId));
        setUsers((prev) => prev.filter((u) => u.id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user. Make sure your Firebase rules allow this.");
      }
    }
  };

  return (
    <div style={{ background: "#0c0a08", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#ffffff" }}>
      {/* Top Navbar */}
      <nav style={{ background: "#161210", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 5%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Shield size={20} color="#ff5c2b" />
          <span style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>Taps Admin</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <ArrowLeft size={14} /> View Site
          </button>
          <button onClick={handleLogout} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 14px", color: "white", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ padding: "40px 5%", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Syne', sans-serif", marginBottom: 6 }}>Registered Users</h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Manage your platform's users and content.</p>
          </div>
          <div style={{ background: "rgba(255,92,43,0.1)", border: "1px solid rgba(255,92,43,0.2)", borderRadius: 12, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #ff5c2b, #e83268)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Users size={18} color="white" />
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{users.length}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>Total Users</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
            <Loader2 size={32} className="animate-spin" color="#ff5c2b" />
          </div>
        ) : (
          <div style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>User</th>
                    <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Email</th>
                    <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>College</th>
                    <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Hot Take</th>
                    <th style={{ padding: "16px 20px", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.5px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: "40px 20px", textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 14 }}>
                        No users have registered yet (or Firebase is missing configs).
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <img src={user.photos?.[0] || `https://ui-avatars.com/api/?name=${user.name || "U"}&background=random`} alt={user.name} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
                            <span style={{ fontSize: 14, fontWeight: 500 }}>{user.name || "Unknown"}</span>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{user.email || "N/A"}</td>
                        <td style={{ padding: "16px 20px", fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
                          <span style={{ background: "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 50, fontSize: 12 }}>{user.college || "N/A"}</span>
                        </td>
                        <td style={{ padding: "16px 20px", fontSize: 13, color: "rgba(255,255,255,0.5)", maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          "{user.hotTake || "No hot take"}"
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <button onClick={() => handleDeleteUser(user.id)} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, padding: "8px", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} title="Delete User" onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.2)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
