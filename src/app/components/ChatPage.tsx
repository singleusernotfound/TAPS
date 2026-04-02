import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Send, Music2, Flame, Smile, Image, Heart } from "lucide-react";

const CHAT_DATA: Record<string, { name: string; photo: string; major: string; year: string; online: boolean; matchTag: string; messages: { id: string; from: "me" | "them"; text: string; time: string; reaction?: string }[] }> = {
  "1": {
    name: "Aanya", photo: "https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    major: "Psychology", year: "2nd Year", online: true, matchTag: "🎵 matched on Spotify",
    messages: [
      { id: "1", from: "them", text: "ok but why is your Arctic Monkeys era so valid rn 😭", time: "2:14 PM" },
      { id: "2", from: "me", text: "it's permanent. I'm never leaving this era", time: "2:15 PM" },
      { id: "3", from: "them", text: "same honestly. R U Mine? goes crazy at 3am specifically", time: "2:15 PM", reaction: "❤️" },
      { id: "4", from: "me", text: "WAIT you also have Phoebe Bridgers?? we're literally the same person", time: "2:17 PM" },
      { id: "5", from: "them", text: "Motion Sickness is genuinely a spiritual experience", time: "2:17 PM" },
      { id: "6", from: "them", text: "also I laughed at your 9am lecture take, that was me filing a formal complaint to the universe", time: "2:18 PM" },
    ],
  },
  "2": {
    name: "Rohan", photo: "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    major: "Computer Science", year: "3rd Year", online: true, matchTag: "🔥 matched on hot take",
    messages: [
      { id: "1", from: "them", text: "pineapple on pizza is genuinely fine though", time: "1:30 PM" },
      { id: "2", from: "me", text: "I respect the audacity", time: "1:32 PM" },
      { id: "3", from: "them", text: "wait your lo-fi jazz take is actually correct", time: "1:33 PM" },
      { id: "4", from: "me", text: "finally someone said it!! lo-fi beats got stale after 2020", time: "1:35 PM" },
      { id: "5", from: "them", text: "frank ocean at 4am hits different anyways", time: "1:36 PM" },
    ],
  },
  "3": {
    name: "Zara", photo: "https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    major: "Economics", year: "1st Year", online: false, matchTag: "😂 matched on humor",
    messages: [
      { id: "1", from: "them", text: "you: *sends meme at 2am* also you: this means nothing 💀", time: "11:20 AM" },
      { id: "2", from: "me", text: "I literally wrote that about myself why does it hurt more coming from you", time: "11:22 AM" },
      { id: "3", from: "them", text: "because you know it's true 😭", time: "11:22 AM" },
    ],
  },
  "4": {
    name: "Dev", photo: "https://images.unsplash.com/photo-1764451850143-428a7f9e931d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    major: "Mechanical Engg.", year: "4th Year", online: false, matchTag: "⭐ super tapped",
    messages: [
      { id: "1", from: "them", text: "wait is a hot dog a sandwich or not", time: "Yesterday" },
      { id: "2", from: "me", text: "...it's a taco actually", time: "Yesterday" },
      { id: "3", from: "them", text: "I've never respected someone more and been more infuriated simultaneously", time: "Yesterday" },
    ],
  },
};

const QUICK_REPLIES = ["lol same 💀", "okay no way", "this is so real", "wait explain", "that's unhinged", "you get me"];

export function ChatPage() {
  const { id } = useParams<{ id: string }>();
  const chat = CHAT_DATA[id || "1"];
  const [messages, setMessages] = useState(chat?.messages || []);
  const [input, setInput] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat) return null;

  const sendMessage = (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;
    const newMsg = { id: Date.now().toString(), from: "me" as const, text: msgText, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setShowEmoji(false);
    setTimeout(() => {
      const replies = ["okay that actually made me laugh", "wait no I see your point though", "we should grab chai at the quad", "this conversation is going places", "you're funny, wasn't expecting that"];
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), from: "them" as const, text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }, 1400);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 138px)" }}>
      {/* Chat Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ position: "relative" }}>
          <img src={chat.photo} alt={chat.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,92,43,0.3)" }} />
          {chat.online && <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: "#1DB954", border: "2px solid #0c0a08" }} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>{chat.name}</div>
          <div style={{ fontSize: 12, color: chat.online ? "#1DB954" : "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>
            {chat.online ? "Active now" : "Last seen recently"} · {chat.year} {chat.major}
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 50, padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>{chat.matchTag}</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>Today · IIT Delhi Campus 🎓</div>

        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.2 }}
            style={{ display: "flex", flexDirection: msg.from === "me" ? "row-reverse" : "row", alignItems: "flex-end", gap: 8 }}>
            {msg.from === "them" && (
              <img src={chat.photo} alt={chat.name} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0, marginBottom: 2 }} />
            )}
            <div style={{ maxWidth: "72%", position: "relative" }}>
              <div style={{
                background: msg.from === "me" ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "#1c1a18",
                padding: "10px 14px",
                borderRadius: msg.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                fontSize: 14, lineHeight: 1.5,
                color: msg.from === "me" ? "white" : "rgba(255,255,255,0.85)",
                fontFamily: "'Inter', sans-serif",
                border: msg.from === "them" ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                {msg.text}
              </div>
              {msg.reaction && (
                <div style={{ position: "absolute", bottom: -8, right: msg.from === "me" ? 8 : "auto", left: msg.from === "them" ? 8 : "auto", fontSize: 13, background: "#161210", borderRadius: 50, padding: "2px 6px", border: "1px solid rgba(255,255,255,0.09)" }}>
                  {msg.reaction}
                </div>
              )}
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "'Inter', sans-serif", marginTop: 4, textAlign: msg.from === "me" ? "right" : "left", paddingLeft: msg.from === "me" ? 0 : 4, paddingRight: msg.from === "me" ? 4 : 0 }}>{msg.time}</div>
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      <div style={{ padding: "8px 16px 0", display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
        {QUICK_REPLIES.map((reply) => (
          <button key={reply} onClick={() => sendMessage(reply)}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 50, padding: "6px 12px", fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>
            {reply}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div style={{ padding: "10px 16px 16px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[Image, Music2, Flame].map((Icon, i) => (
            <button key={i} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.28)", padding: 4, display: "flex", alignItems: "center" }}><Icon size={17} /></button>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#161210", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 20, padding: "8px 14px", gap: 8 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Message..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "white", fontSize: 14, fontFamily: "'Inter', sans-serif" }} />
          <button onClick={() => setShowEmoji(!showEmoji)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.28)", display: "flex", alignItems: "center", padding: 0 }}>
            <Smile size={16} />
          </button>
        </div>
        <button onClick={() => sendMessage()}
          style={{ width: 40, height: 40, borderRadius: "50%", background: input.trim() ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "rgba(255,255,255,0.07)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() ? "pointer" : "default", transition: "all 0.2s", flexShrink: 0 }}>
          <Send size={16} color={input.trim() ? "white" : "rgba(255,255,255,0.28)"} />
        </button>
      </div>

      {/* Emoji picker */}
      <AnimatePresence>
        {showEmoji && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            style={{ position: "absolute", bottom: 80, right: 16, background: "#1c1a18", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 18, padding: 12, display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 200, boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 10 }}>
            {["😂", "💀", "🫠", "❤️", "🔥", "😭", "💅", "😈", "✨", "👀", "🤌", "💯"].map((emoji) => (
              <button key={emoji} onClick={() => { setInput((p) => p + emoji); setShowEmoji(false); }}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, padding: 4, borderRadius: 8 }}>
                {emoji}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
