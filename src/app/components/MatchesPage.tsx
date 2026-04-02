import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Search } from "lucide-react";

const NEW_MATCHES = [
  { id: "1", name: "Aanya", photo: "https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", matchedOn: "Spotify vibe", matchEmoji: "🎵", time: "2m ago", isNew: true },
  { id: "2", name: "Rohan", photo: "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", matchedOn: "Hot take", matchEmoji: "🔥", time: "1h ago", isNew: true },
  { id: "3", name: "Zara", photo: "https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", matchedOn: "Humor prompt", matchEmoji: "😂", time: "3h ago", isNew: false },
  { id: "4", name: "Dev", photo: "https://images.unsplash.com/photo-1764451850143-428a7f9e931d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", matchedOn: "Liked your take", matchEmoji: "⭐", time: "Yesterday", isNew: false },
];

const CONVERSATIONS = [
  { id: "1", name: "Aanya S.", photo: "https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", lastMessage: "ok but why is your Arctic Monkeys era so valid rn", time: "2m", unread: 3, online: true, matchTag: "🎵 music match" },
  { id: "2", name: "Rohan V.", photo: "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", lastMessage: "pineapple on pizza is genuinely fine though", time: "45m", unread: 1, online: true, matchTag: "🔥 hot take" },
  { id: "3", name: "Zara K.", photo: "https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", lastMessage: "you: sends meme at 2am also you: this means nothing", time: "2h", unread: 0, online: false, matchTag: "😂 humor match" },
  { id: "4", name: "Dev N.", photo: "https://images.unsplash.com/photo-1764451850143-428a7f9e931d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200", lastMessage: "wait is a hot dog a sandwich or not", time: "Yesterday", unread: 0, online: false, matchTag: "⭐ super tap" },
];

export function MatchesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredMatches = NEW_MATCHES.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));
  const filteredConvs = CONVERSATIONS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.lastMessage.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: "20px 16px" }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 }}>Your taps 💬</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.38)", fontFamily: "'Inter', sans-serif" }}>
          {NEW_MATCHES.filter((m) => m.isNew).length} new matches on IIT Delhi
        </p>
      </div>

      {/* Search */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#161210", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "10px 14px", marginBottom: 24 }}>
        <Search size={15} color="rgba(255,255,255,0.28)" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your matches..." style={{ background: "none", border: "none", outline: "none", color: "white", fontSize: 14, fontFamily: "'Inter', sans-serif", flex: 1 }} />
      </div>

      {/* New Matches */}
      {filteredMatches.length > 0 && (
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>new matches ✨</span>
          <span style={{ fontSize: 12, color: "#ff5c2b", fontFamily: "'Inter', sans-serif", fontWeight: 600, cursor: "pointer" }}>See all</span>
        </div>
        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 4 }}>
          {filteredMatches.map((match, i) => (
            <motion.div key={match.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
              onClick={() => navigate(`/app/matches/${match.id}`)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer", flexShrink: 0 }}>
              <div style={{ position: "relative" }}>
                <img src={match.photo} alt={match.name}
                  style={{ width: 66, height: 66, borderRadius: "50%", objectFit: "cover", border: match.isNew ? "2.5px solid #ff5c2b" : "2px solid rgba(255,255,255,0.09)" }} />
                <div style={{ position: "absolute", bottom: -2, right: -2, width: 23, height: 23, borderRadius: "50%", background: "#161210", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, border: "2px solid #0c0a08" }}>
                  {match.matchEmoji}
                </div>
                {match.isNew && <div style={{ position: "absolute", top: 0, right: 0, width: 13, height: 13, borderRadius: "50%", background: "#ff5c2b", border: "2px solid #0c0a08" }} />}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: match.isNew ? "white" : "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>{match.name}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif" }}>{match.time}</div>
            </motion.div>
          ))}
        </div>
      </div>
      )}

      {/* Conversations */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", marginBottom: 12 }}>messages 📨</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {filteredConvs.map((conv, i) => (
            <motion.div key={conv.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
              onClick={() => navigate(`/app/matches/${conv.id}`)}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderRadius: 16, cursor: "pointer", transition: "background 0.2s" }}
              whileHover={{ background: "rgba(255,255,255,0.025)" }}>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <img src={conv.photo} alt={conv.name}
                  style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", border: conv.unread > 0 ? "2px solid #ff5c2b" : "2px solid rgba(255,255,255,0.07)" }} />
                {conv.online && <div style={{ position: "absolute", bottom: 1, right: 1, width: 12, height: 12, borderRadius: "50%", background: "#1DB954", border: "2px solid #0c0a08" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: conv.unread > 0 ? 700 : 600, color: conv.unread > 0 ? "white" : "rgba(255,255,255,0.65)" }}>{conv.name}</span>
                    <span style={{ fontSize: 10, background: "rgba(255,255,255,0.05)", borderRadius: 50, padding: "2px 7px", color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>{conv.matchTag}</span>
                  </div>
                  <span style={{ fontSize: 11, color: conv.unread > 0 ? "#ff5c2b" : "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif", flexShrink: 0 }}>{conv.time}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: 13, color: conv.unread > 0 ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, margin: 0 }}>{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#ff5c2b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, fontFamily: "'Inter', sans-serif", flexShrink: 0, marginLeft: 8 }}>{conv.unread}</div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
