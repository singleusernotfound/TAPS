import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Building2, Users, Flame, Trophy, TrendingUp, Heart, Zap } from "lucide-react";

const CAMPUS_STATS = [
  { label: "Active today", value: "2,840", icon: Users, color: "#ff5c2b" },
  { label: "Matches today", value: "134", icon: Heart, color: "#e83268" },
  { label: "Hot takes posted", value: "89", icon: Flame, color: "#fbbf24" },
  { label: "Spotify matches", value: "47", icon: Zap, color: "#1DB954" },
];

const HOT_TAKES_TRENDING = [
  { text: "9am lectures should be abolished and the syllabus should be optional", votes: 1204, trending: true },
  { text: "Attendance percentage should not affect grades. Period.", votes: 987, trending: true },
  { text: "Campus food is genuinely fine and we're all just dramatic", votes: 342, trending: false },
  { text: "Group projects are designed to test your tolerance for mediocrity", votes: 2100, trending: true },
  { text: "The library is actually underrated for dates", votes: 456, trending: false },
];

const TOP_PROFILES = [
  { id: "1", name: "Aanya S.", year: "2nd Year", likes: 142, photo: "https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", badge: "🎵 Music Maven" },
  { id: "2", name: "Rohan V.", year: "3rd Year", likes: 118, photo: "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", badge: "🔥 Hot Take King" },
  { id: "3", name: "Zara K.", year: "1st Year", likes: 203, photo: "https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", badge: "👑 Campus Fav" },
  { id: "4", name: "Dev N.", year: "4th Year", likes: 97, photo: "https://images.unsplash.com/photo-1764451850143-428a7f9e931d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", badge: "😂 Humor God" },
];

const CAMPUS_EVENTS = [
  { title: "Friday Night Mixer", type: "Social", date: "Fri, 14 Mar · 7pm", location: "SAC Auditorium", attending: 84, color: "#ff5c2b", emoji: "🎉" },
  { title: "Lo-Fi Study Date", type: "Chill", date: "Sat, 15 Mar · 4pm", location: "Main Library", attending: 38, color: "#a78bfa", emoji: "📚" },
  { title: "Campus Hot Takes Battle", type: "Event", date: "Sun, 16 Mar · 5pm", location: "Open Air Theatre", attending: 156, color: "#fbbf24", emoji: "🔥" },
];

export function CampusPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"feed" | "leaderboard" | "events">("feed");
  const [votedTakes, setVotedTakes] = useState<Set<number>>(new Set());

  const toggleVote = (i: number) => {
    setVotedTakes((prev) => { const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next; });
  };

  return (
    <div style={{ padding: "20px 16px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px" }}>IIT Delhi 🎓</h1>
            <div style={{ background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.22)", borderRadius: 50, padding: "3px 9px", fontSize: 10, color: "#1DB954", fontFamily: "'Inter', sans-serif", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1DB954", display: "inline-block" }} /> live
            </div>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif" }}>Your campus server · 2,840 students</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
        {CAMPUS_STATS.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <stat.icon size={16} color={stat.color} />
            </div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.32)", fontFamily: "'Inter', sans-serif", marginTop: 1 }}>{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 4, marginBottom: 20 }}>
        {(["feed", "leaderboard", "events"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            style={{ flex: 1, background: activeTab === tab ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "transparent", border: "none", borderRadius: 10, padding: "9px 4px", fontSize: 13, fontWeight: 600, color: activeTab === tab ? "white" : "rgba(255,255,255,0.38)", cursor: "pointer", fontFamily: "'Syne', sans-serif", transition: "all 0.2s" }}>
            {tab === "feed" ? "🔥 Hot Feed" : tab === "leaderboard" ? "🏆 Top Profiles" : "🎉 Events"}
          </button>
        ))}
      </div>

      {/* Hot Feed */}
      {activeTab === "feed" && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>trending takes on campus 🌶️</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {HOT_TAKES_TRENDING.map((take, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "14px 16px" }}>
                {take.trending && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,92,43,0.1)", border: "1px solid rgba(255,92,43,0.18)", borderRadius: 50, padding: "2px 8px", fontSize: 10, color: "#ff5c2b", fontFamily: "'Inter', sans-serif", fontWeight: 700, marginBottom: 8 }}>
                    <TrendingUp size={10} /> trending
                  </div>
                )}
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(255,255,255,0.82)", fontFamily: "'Inter', sans-serif", margin: "0 0 12px" }}>"{take.text}"</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>🔥 {(take.votes + (votedTakes.has(i) ? 1 : 0)).toLocaleString()} votes</span>
                  <button onClick={() => toggleVote(i)}
                    style={{ background: votedTakes.has(i) ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "6px 14px", fontSize: 12, color: votedTakes.has(i) ? "white" : "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
                    {votedTakes.has(i) ? "✓ Voted" : "🔥 Agree"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab === "leaderboard" && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>most liked this week 🏆</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TOP_PROFILES.sort((a, b) => b.likes - a.likes).map((profile, i) => (
              <motion.div key={profile.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                onClick={() => navigate("/app/discover")}
                style={{ display: "flex", alignItems: "center", gap: 14, background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "12px 16px", cursor: "pointer" }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: i === 0 ? "linear-gradient(135deg, #fbbf24, #f59e0b)" : i === 1 ? "rgba(255,255,255,0.1)" : i === 2 ? "linear-gradient(135deg, #ff6b35, #ea580c)" : "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>
                  {i < 3 ? (i === 0 ? "👑" : i === 1 ? "🥈" : "🥉") : i + 1}
                </div>
                <img src={profile.photo} alt={profile.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", border: i === 0 ? "2px solid #fbbf24" : "2px solid rgba(255,255,255,0.09)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{profile.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{profile.year} · {profile.badge}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: i === 0 ? "#fbbf24" : "white" }}>{profile.likes}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>taps</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: "linear-gradient(135deg, rgba(255,92,43,0.07), rgba(232,50,104,0.07))", border: "1px solid rgba(255,92,43,0.14)", borderRadius: 18, padding: 18, textAlign: "center" }}>
            <Trophy size={24} color="#fbbf24" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>You're ranked #127 this week</div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>Get 15 more likes to break into the top 100</p>
            <button style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 50, padding: "10px 24px", color: "white", fontSize: 13, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer" }}>Boost Profile ⚡</button>
          </div>
        </div>
      )}

      {/* Events */}
      {activeTab === "events" && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif", marginBottom: 14 }}>upcoming on campus 📅</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CAMPUS_EVENTS.map((event, i) => (
              <motion.div key={event.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
                <div style={{ height: 5, background: `linear-gradient(to right, ${event.color}, ${event.color}70)` }} />
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ display: "flex", gap: 12, flex: 1 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 14, background: `${event.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{event.emoji}</div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{event.title}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif", marginTop: 3 }}>{event.date}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>📍 {event.location}</div>
                      </div>
                    </div>
                    <div style={{ background: `${event.color}15`, border: `1px solid ${event.color}25`, borderRadius: 50, padding: "3px 10px", fontSize: 10, color: event.color, fontFamily: "'Inter', sans-serif", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>{event.type.toUpperCase()}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>👥 {event.attending} going</span>
                    <button style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 50, padding: "8px 18px", color: "white", fontSize: 12, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer" }}>I'm going!</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
