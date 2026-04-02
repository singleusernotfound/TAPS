import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import { useAuth } from "../contexts/AuthContext";
import { Edit3, Music2, Flame, Laugh, Settings, ChevronRight, Star, Shield, Bell, HelpCircle, LogOut, Camera, Plus, Loader2 } from "lucide-react";

const SETTINGS_ITEMS = [
  { icon: Bell, label: "Notifications", value: "On", color: "#a78bfa" },
  { icon: Shield, label: "Privacy", value: "Campus only", color: "#1DB954" },
  { icon: Settings, label: "Preferences", value: "Customize", color: "#ff5c2b" },
  { icon: Star, label: "Taps Premium", value: "Upgrade ✨", color: "#fbbf24", highlight: true },
  { icon: HelpCircle, label: "Help", value: "", color: "#818cf8" },
  { icon: LogOut, label: "Sign out", value: "", color: "#e83268" },
];

const MY_INTERESTS = ["Indie music 🎵", "Philosophy 🧠", "Road trips ☔", "Dark humour 😈", "Coffee snob ☕", "Overthinker 🌀", "Night owl 🦉", "Chai > Coffee ☕"];

export function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState<any>({});
  
  const profileStrength = 72;

  useEffect(() => {
    const fetchMe = async () => {
      if (currentUser) {
        try {
          const d = await getDoc(doc(db, "users", currentUser.uid));
          if (d.exists()) {
            setUserData(d.data());
            setEditData(d.data());
          }
        } catch(e) {}
      } else {
        const mock = localStorage.getItem("taps_mockUser");
        if (mock) {
            const parsed = JSON.parse(mock);
            setUserData(parsed);
            setEditData(parsed);
        }
      }
    };
    fetchMe();
  }, [currentUser]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.uid), editData);
      } else {
        localStorage.setItem("taps_mockUser", JSON.stringify(editData));
      }
      setUserData(editData);
      setIsEditing(false);
    } catch (error) {
       console.error("Failed to save profile", error);
    } finally {
      setIsSaving(false);
    }
  };

  const name = userData?.name || "Arjun";
  const age = userData?.age || 21;
  const college = userData?.college || "IIT Delhi";
  const photo = userData?.photos?.[0] || "https://images.unsplash.com/photo-1622179986499-fa3dfabc8ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200";
  const hotTake = userData?.hotTake || "Texting 'haha' instead of 'lol' is a personality trait";
  const humorAnswer = userData?.humorAnswer || "My entire personality is being surprisingly relatable at the worst moments";
  const humorPrompt = userData?.humorPrompt || "their humor 😂";
  const artists = userData?.spotifyArtists || ["Radiohead", "Bon Iver", "Big Thief", "Sufjan Stevens"];

  const MY_PROMPTS = [
    { type: "spotify", icon: Music2, color: "#1DB954", bg: "rgba(29,185,84,0.09)", label: "their vibe 🎵", value: "late night drives + emotional indie", artists: artists },
    { type: "hottake", icon: Flame, color: "#fbbf24", bg: "rgba(251,191,36,0.09)", label: "hot take 🌶️", value: hotTake },
    { type: "humor", icon: Laugh, color: "#ff5c2b", bg: "rgba(255,92,43,0.09)", label: humorPrompt, value: humorAnswer },
  ];

  return (
    <>
      {/* 
        INSTAGRAM-STYLE FULLSCREEN EDIT MODAL
      */}
      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ y: "100%" }} 
            animate={{ y: 0 }} 
            exit={{ y: "100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(circle at 10% 20%, rgba(232, 50, 104, 0.06), transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 92, 43, 0.05), transparent 40%), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 35L23.5 33.6C18.2 28.8 14.5 25.4 14.5 21C14.5 17.5 17.2 14.8 20.6 14.8C22.5 14.8 24.3 15.7 25 17.1C25.7 15.7 27.5 14.8 29.4 14.8C32.8 14.8 35.5 17.5 35.5 21C35.5 25.4 31.8 28.8 26.5 33.6L25 35Z' fill='rgba(255, 92, 43, 0.03)'/%3E%3Cpath d='M75 85L73.5 83.6C68.2 78.8 64.5 75.4 64.5 71C64.5 67.5 67.2 64.8 70.6 64.8C72.5 64.8 74.3 65.7 75 67.1C75.7 65.7 77.5 64.8 79.4 64.8C82.8 64.8 85.5 67.5 85.5 71C85.5 75.4 81.8 78.8 76.5 83.6L75 85Z' fill='rgba(232, 50, 104, 0.02)'/%3E%3C/svg%3E") #0c0a08`, zIndex: 999, overflowY: "auto", display: "flex", flexDirection: "column" }}
          >
            {/* Header */}
            <div style={{ position: "sticky", top: 0, background: "rgba(12,10,8,0.9)", backdropFilter: "blur(15px)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.05)", zIndex: 10 }}>
              <button onClick={() => { setIsEditing(false); setEditData(userData || {}); }} style={{ background: "none", border: "none", color: "white", fontSize: 16, fontFamily: "'Inter', sans-serif", cursor: "pointer", padding: 0 }}>Cancel</button>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: "'Inter', sans-serif" }}>Edit profile</h2>
              <button onClick={handleSave} disabled={isSaving} style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 16, fontWeight: 700, fontFamily: "'Inter', sans-serif", cursor: isSaving ? "default" : "pointer", padding: 0 }}>
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : "Done"}
              </button>
            </div>
            
            {/* Avatar Section */}
            <div style={{ padding: "32px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <img src={photo} alt={name} style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(255,255,255,0.1)" }} />
              </div>
              <button style={{ background: "none", border: "none", color: "#3b82f6", fontSize: 14, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>Edit picture or avatar</button>
            </div>

            {/* Form Fields Section */}
            <div style={{ padding: "0 20px 60px" }}>
              {/* Info Box */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ background: "#161210", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ width: 85, fontSize: 15, color: "white", paddingLeft: 16, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Name</div>
                    <input value={editData.name || ""} onChange={e => setEditData({...editData, name: e.target.value})} style={{ flex: 1, background: "none", border: "none", padding: "16px", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none" }} placeholder="Name" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <div style={{ width: 85, fontSize: 15, color: "white", paddingLeft: 16, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Age</div>
                    <input type="number" value={editData.age || ""} onChange={e => setEditData({...editData, age: e.target.value})} style={{ flex: 1, background: "none", border: "none", padding: "16px", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none" }} placeholder="Age" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ width: 85, fontSize: 15, color: "white", paddingLeft: 16, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>College</div>
                    <input value={editData.college || ""} onChange={e => setEditData({...editData, college: e.target.value})} style={{ flex: 1, background: "none", border: "none", padding: "16px", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none" }} placeholder="College" />
                  </div>
                </div>
              </div>

              {/* Prompts Box */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", marginBottom: 10, paddingLeft: 12 }}>YOUR PROMPTS</div>
                <div style={{ background: "#161210", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "16px" }}>
                    <div style={{ fontSize: 14, color: "#fbbf24", marginBottom: 10, fontFamily: "'Inter', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Flame size={14} /> Hot take</div>
                    <textarea value={editData.hotTake || ""} onChange={e => setEditData({...editData, hotTake: e.target.value})} style={{ width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", borderRadius: 0, padding: "0 0 10px 0", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none", resize: "vertical", minHeight: 40, boxSizing: "border-box" }} placeholder="Write a hot take..." />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", padding: "16px" }}>
                    <div style={{ fontSize: 14, color: "#ff5c2b", marginBottom: 10, fontFamily: "'Inter', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}><Laugh size={14} /> {humorPrompt}</div>
                    <textarea value={editData.humorAnswer || ""} onChange={e => setEditData({...editData, humorAnswer: e.target.value})} style={{ width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.1)", borderRadius: 0, padding: "0 0 10px 0", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none", resize: "vertical", minHeight: 40, boxSizing: "border-box" }} placeholder="Write a humorous answer..." />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ padding: "20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px" }}>My profile 👤</h1>
          <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.55)" }}>
            <Settings size={16} />
          </button>
        </div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden", marginBottom: 20 }}>
          <div style={{ height: 90, background: "linear-gradient(135deg, rgba(255,92,43,0.35), rgba(232,50,104,0.35))", position: "relative" }}>
            <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 18px)" }} />
          </div>
          <div style={{ padding: "0 20px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: -28, marginBottom: 14 }}>
              <div style={{ position: "relative" }}>
                <img src={photo} alt={name}
                  style={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover", border: "3px solid #161210", display: "block", background: "#161210" }} />
                <button style={{ position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "2px solid #161210", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Camera size={10} color="white" />
                </button>
              </div>
              
              <button 
                onClick={() => setIsEditing(true)} 
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 50, padding: "8px 16px", color: "white", fontSize: 13, fontWeight: 600, fontFamily: "'Syne', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              >
                <Edit3 size={12} /> Edit
              </button>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 20, fontWeight: 800 }}>{name}, {age}</span>
                <div style={{ background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.22)", borderRadius: 50, padding: "2px 8px", fontSize: 10, color: "#1DB954", fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>✓ verified</div>
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", fontFamily: "'Inter', sans-serif" }}>Student · {college}</div>
            </div>

            {/* Strength */}
            <div style={{ marginTop: 16, background: "#100e0c", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>profile strength</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: profileStrength >= 70 ? "#1DB954" : "#ff5c2b", fontFamily: "'Inter', sans-serif" }}>{profileStrength}%</span>
              </div>
              <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                <div style={{ width: `${profileStrength}%`, height: "100%", background: "linear-gradient(to right, #ff5c2b, #e83268)", borderRadius: 3 }} />
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", marginTop: 6 }}>Add a humor prompt to get 40% more visibility 🚀</p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", marginTop: 14 }}>
              {[{ label: "Likes", value: "47" }, { label: "Matches", value: "12" }, { label: "Comments", value: "28" }].map((stat, i) => (
                <div key={stat.label} style={{ flex: 1, textAlign: "center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.05)" : "none", padding: "8px 0" }}>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.32)", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Interests */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>my interests</span>
            <button style={{ background: "none", border: "none", color: "#ff5c2b", fontSize: 12, fontFamily: "'Inter', sans-serif", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <Plus size={12} /> Add
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {MY_INTERESTS.map((tag) => (
              <span key={tag} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 50, padding: "6px 12px", fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>my prompts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {MY_PROMPTS.map((prompt) => (
              <motion.div key={prompt.type} whileTap={{ scale: 0.98 }}
                style={{ background: prompt.bg, border: `1px solid ${prompt.color}20`, borderRadius: 18, padding: "14px 16px", cursor: "pointer" }}
                onClick={() => setIsEditing(true)}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 9, background: `${prompt.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <prompt.icon size={14} color={prompt.color} />
                  </div>
                  <span style={{ fontSize: 11, color: prompt.color, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>{prompt.label}</span>
                  <div style={{ marginLeft: "auto" }}><Edit3 size={12} color="rgba(255,255,255,0.25)" /></div>
                </div>
                
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.78)", fontFamily: "'Inter', sans-serif", margin: 0 }}>"{prompt.value}"</p>

                {prompt.type === "spotify" && (prompt as any).artists && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                    {(prompt as any).artists.map((a: string) => (
                      <span key={a} style={{ background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.18)", borderRadius: 50, padding: "3px 8px", fontSize: 11, color: "#1DB954", fontFamily: "'Inter', sans-serif" }}>{a}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
            <button onClick={() => setIsEditing(true)} style={{ background: "rgba(255,255,255,0.02)", border: "1.5px dashed rgba(255,255,255,0.09)", borderRadius: 18, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", width: "100%" }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,92,43,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={13} color="#ff5c2b" />
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>Add another prompt</span>
            </button>
          </div>
        </div>

        {/* Settings */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>settings</div>
          <div style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
            {SETTINGS_ITEMS.map((item, i) => (
              <motion.button key={item.label} whileTap={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                onClick={async () => {
                  if (item.label === "Sign out") {
                    try { await signOut(auth); } catch(e) {}
                    localStorage.removeItem("taps_mockUser");
                    navigate("/");
                  }
                }}
                style={{ width: "100%", background: "none", border: "none", borderBottom: i < SETTINGS_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${item.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <item.icon size={15} color={item.color} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: item.label === "Sign out" ? "#e83268" : "rgba(255,255,255,0.82)", flex: 1, fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                {item.value && <span style={{ fontSize: 12, color: item.highlight ? "#fbbf24" : "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif", fontWeight: item.highlight ? 700 : 400 }}>{item.value}</span>}
                <ChevronRight size={13} color="rgba(255,255,255,0.18)" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Premium */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(255,92,43,0.1))", border: "1px solid rgba(251,191,36,0.18)", borderRadius: 20, padding: 18, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⭐</div>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>Taps Premium</div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 14 }}>See who liked you, boost your profile, unlimited rewinds + campus top spot</p>
          <button style={{ background: "linear-gradient(135deg, #fbbf24, #ff5c2b)", border: "none", borderRadius: 50, padding: "10px 28px", color: "white", fontSize: 14, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer", boxShadow: "0 6px 20px rgba(251,191,36,0.3)" }}>
            Upgrade · ₹49/month
          </button>
        </motion.div>
      </div>
    </>
  );
}
