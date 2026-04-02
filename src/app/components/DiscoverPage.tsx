import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Music2, Flame, Laugh, Heart, X, Star, ChevronDown, MessageCircle, Share2, MoreHorizontal, Play, MapPin, Loader2 } from "lucide-react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuth } from "../contexts/AuthContext";

const HARDCODED_PROFILES = [
  {
    id: "1", name: "Aanya Sharma", age: 20, year: "2nd Year", major: "Psychology",
    college: "IIT Delhi", distance: "0.3 km away",
    photo: "https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwdW5pdmVyc2l0eSUyMGNhbXB1cyUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NzMyMzUwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    photos: ["https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", "https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    spotify: { playlist: "sad girl autumn + banger tuesdays", topArtists: ["Mitski", "Phoebe Bridgers", "Arctic Monkeys", "Rex Orange County"], nowPlaying: "Motion Sickness — Phoebe Bridgers" },
    hotTake: "9am lectures should be illegal and the prof who schedules them should be fined",
    hotTakeAgree: 847, hotTakeDisagree: 231,
    humor: "my love language is texting you memes at 3am and pretending it means nothing",
    prompts: [
      { question: "The most unhinged thing I believe:", answer: "Manifesting grades is 100% real and I'm done arguing." },
      { question: "Red flag I'd totally ignore:", answer: "Uses Comic Sans ironically. It's giving quirky, I'm sorry." },
    ],
    interests: ["Philosophy 🧠", "Indie music 🎵", "Monsoon drives ☔", "Overthinker 🌀", "Coffee snob ☕"],
    bio: "studying how people tick, still figuring myself out. speak in song lyrics unironically.",
  },
  {
    id: "2", name: "Rohan Verma", age: 21, year: "3rd Year", major: "Computer Science",
    college: "IIT Delhi", distance: "0.8 km away",
    photo: "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGNvbGxlZ2UlMjBzdHVkZW50JTIwY2FzdWFsfGVufDF8fHx8MTc3MzIzNTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    photos: ["https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    spotify: { playlist: "lo-fi chill + midnight coding sessions", topArtists: ["Frank Ocean", "Tyler the Creator", "Tame Impala", "Saba"], nowPlaying: "Nights — Frank Ocean" },
    hotTake: "Pineapple on pizza is genuinely fine and your food opinions are too strong",
    hotTakeAgree: 512, hotTakeDisagree: 903,
    humor: "Technically a morning person if you count 4am as morning",
    prompts: [
      { question: "Looking for someone who:", answer: "Can hold a conversation about both tech and feelings. Rare but they exist." },
      { question: "Unpopular opinion:", answer: "Lo-fi beats are overrated — lo-fi jazz supremacy." },
    ],
    interests: ["Coding 💻", "Basketball 🏀", "Dark humour 😈", "Night owl 🦉", "Chai > Coffee ☕"],
    bio: "cs student by day, existential crisis enthusiast by night. currently building something cool.",
  },
  {
    id: "3", name: "Zara Khan", age: 19, year: "1st Year", major: "Economics",
    college: "IIT Delhi", distance: "1.2 km away",
    photo: "https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwbGF1Z2hpbmclMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMjM1MDk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    photos: ["https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    spotify: { playlist: "main character moments only", topArtists: ["Taylor Swift", "Gracie Abrams", "Sabrina Carpenter", "Beabadoobee"], nowPlaying: "Please Please Please — Sabrina Carpenter" },
    hotTake: "Economics is just vibes with a spreadsheet and I'm okay with that",
    hotTakeAgree: 1204, hotTakeDisagree: 88,
    humor: "I have two moods: over-explaining everything or completely shutting down",
    prompts: [
      { question: "Best conversation starter:", answer: "What's your most controversial food opinion?" },
      { question: "I'll instantly like you if:", answer: "You have a hot take about something completely mundane." },
    ],
    interests: ["Markets 📈", "Gossip Girl reruns 📺", "Baking 🍰", "Debate team ⚔️", "Chaotic good ✨"],
    bio: "1st year eco student with opinions about everything. will argue for fun.",
  },
  {
    id: "4", name: "Dev Nair", age: 22, year: "4th Year", major: "Mechanical Engg.",
    college: "IIT Delhi", distance: "0.5 km away",
    photo: "https://images.unsplash.com/photo-1764451850143-428a7f9e931d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNtaWxpbmclMjBhZXN0aGV0aWMlMjBwaG90b3xlbnwxfHx8fDE3NzMyMzUwOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    photos: ["https://images.unsplash.com/photo-1764451850143-428a7f9e931d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    spotify: { playlist: "old hindi + existential indie", topArtists: ["Arijit Singh", "Radiohead", "The Strokes", "Kishore Kumar"], nowPlaying: "Creep — Radiohead" },
    hotTake: "Engineering college taught me more about myself than any subject ever did",
    hotTakeAgree: 2100, hotTakeDisagree: 14,
    humor: "My personality is 'reads the room and then still says the thing'",
    prompts: [
      { question: "Last thing I got way too invested in:", answer: "Whether a hot dog is a sandwich. (It is. Argue with the wall.)" },
      { question: "Two truths and a lie:", answer: "Cried at an F1 race. Make great pasta. Actually understood quantum." },
    ],
    interests: ["F1 🏎️", "Cooking 🍝", "Trekking 🏔️", "Overthinker 🌀", "Final year panic 😅"],
    bio: "4th year mech student surviving placement season on pasta and bad jokes.",
  },
];

type ReactedPrompt = { profileId: string; type: "humor" | "hotTake" | number; emoji: string };

export function DiscoverPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [passed, setPassed] = useState<Set<string>>(new Set());
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [commentModal, setCommentModal] = useState<{ open: boolean; prompt?: string }>({ open: false });
  const [commentText, setCommentText] = useState("");
  const [reactedPrompts, setReactedPrompts] = useState<ReactedPrompt[]>([]);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const q = query(collection(db, "users"));
        const snapshot = await getDocs(q);
        const fetchedProfiles: any[] = [];
        snapshot.forEach((doc) => {
          if (currentUser && doc.id === currentUser.uid) return;
          const data = doc.data();
          fetchedProfiles.push({
            id: doc.id,
            name: data.name || "Unknown",
            age: 20,
            year: "Student",
            major: "Undecided",
            college: data.college || "Unknown",
            distance: "nearby",
            photo: data.photos && data.photos.length > 0 ? data.photos[0] : "https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
            photos: data.photos || ["https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
            spotify: { playlist: "vibes", topArtists: data.spotifyArtists || ["Unknown"], nowPlaying: "" },
            hotTake: data.hotTake || "",
            hotTakeAgree: 1200, hotTakeDisagree: 300,
            humor: data.humorAnswer || "",
            prompts: [
              { question: data.humorPrompt || "Prompt", answer: data.humorAnswer || "" }
            ],
            interests: ["Campus Life"],
            bio: "Student living the campus life."
          });
        });
        setProfiles(fetchedProfiles.length > 0 ? fetchedProfiles : HARDCODED_PROFILES);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        setProfiles(HARDCODED_PROFILES);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, [currentUser]);

  const profile = profiles[currentIndex];

  const handleAction = (action: "like" | "pass" | "super") => {
    const id = profile.id;
    if (action === "like" || action === "super") {
      setSwipeDir("right");
      if (Math.random() > 0.5 || action === "super") {
        setTimeout(() => setShowMatchAnimation(true), 300);
        setTimeout(() => setShowMatchAnimation(false), 2600);
      }
    } else {
      setSwipeDir("left");
      setPassed((prev) => new Set([...prev, id]));
    }
    setTimeout(() => {
      setSwipeDir(null);
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
      setExpandedSection(null);
      setActivePhotoIndex(0);
    }, 350);
  };

  const handleCommentOnPrompt = (promptText: string) => {
    setCommentModal({ open: true, prompt: promptText });
  };

  const sendComment = () => {
    if (!commentText.trim()) return;
    handleAction("like");
    setCommentModal({ open: false });
    setCommentText("");
  };

  const reactToPrompt = (profileId: string, type: "humor" | "hotTake" | number, emoji: string) => {
    setReactedPrompts((prev) => {
      const exists = prev.find((r) => r.profileId === profileId && r.type === type);
      if (exists) return prev.filter((r) => !(r.profileId === profileId && r.type === type));
      return [...prev, { profileId, type, emoji }];
    });
  };

  const isReacted = (profileId: string, type: "humor" | "hotTake" | number) =>
    reactedPrompts.some((r) => r.profileId === profileId && r.type === type);

  if (loading) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}><Loader2 size={32} className="animate-spin" color="#ff5c2b" /></div>;

  if (!profile) return <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "60vh", padding: 20, textAlign: "center" }}><div style={{ fontSize: 60, marginBottom: 20 }}>👻</div><h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>You've seen everyone!</h2><p style={{ color: "rgba(255,255,255,0.45)" }}>Check back later or expand your campus filter.</p></div>;

  const hotTakePercent = Math.round((profile.hotTakeAgree / (profile.hotTakeAgree + profile.hotTakeDisagree)) * 100);

  return (
    <div style={{ padding: "16px", maxWidth: 520, margin: "0 auto", position: "relative" }}>
      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
        {["Everyone", "Music vibes", "Hot takes", "Funny only", "2nd Year", "3rd Year"].map((f, i) => (
          <button key={f} style={{ background: i === 0 ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "rgba(255,255,255,0.05)", border: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)", borderRadius: 50, padding: "6px 14px", color: i === 0 ? "white" : "rgba(255,255,255,0.45)", fontSize: 12, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>{f}</button>
        ))}
      </div>

      {/* Progress */}
      <div style={{ display: "flex", gap: 5, marginBottom: 14, justifyContent: "center" }}>
        {profiles.map((_: any, i: number) => (
          <div key={i} style={{ height: 3, borderRadius: 2, background: i === currentIndex ? "#ff5c2b" : "rgba(255,255,255,0.1)", width: i === currentIndex ? 22 : 7, transition: "all 0.3s" }} />
        ))}
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={profile.id}
          ref={cardRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x;
            if (swipe > 100) handleAction("like");
            else if (swipe < -100) handleAction("pass");
          }}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0, x: swipeDir === "right" ? 300 : swipeDir === "left" ? -300 : 0, rotate: swipeDir === "right" ? 10 : swipeDir === "left" ? -10 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, overflow: "hidden", touchAction: "none" }}>

          {/* Photo */}
          <div style={{ position: "relative" }}>
            <img src={profile.photos[activePhotoIndex] || profile.photo} alt={profile.name}
              style={{ width: "100%", height: 400, objectFit: "cover", objectPosition: "top", display: "block" }} />

            {profile.photos.length > 1 && (
              <div style={{ position: "absolute", top: 10, left: 10, right: 10, display: "flex", gap: 4 }}>
                {profile.photos.map((_: string, i: number) => (
                  <div key={i} onClick={() => setActivePhotoIndex(i)} style={{ flex: 1, height: 3, borderRadius: 2, background: i === activePhotoIndex ? "white" : "rgba(255,255,255,0.35)", cursor: "pointer" }} />
                ))}
              </div>
            )}

            {swipeDir && (
              <div style={{ position: "absolute", inset: 0, background: swipeDir === "right" ? "rgba(255,92,43,0.18)" : "rgba(100,100,110,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 72 }}>
                {swipeDir === "right" ? "❤️" : "✕"}
              </div>
            )}

            <div style={{ position: "absolute", left: 0, top: 0, width: "40%", height: "100%", cursor: "pointer" }} onClick={() => setActivePhotoIndex((p) => (p > 0 ? p - 1 : profile.photos.length - 1))} />
            <div style={{ position: "absolute", right: 0, top: 0, width: "40%", height: "100%", cursor: "pointer" }} onClick={() => setActivePhotoIndex((p) => (p + 1) % profile.photos.length)} />

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(12,10,8,1) 0%, rgba(12,10,8,0.6) 40%, transparent 100%)", padding: "50px 20px 18px" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px" }}>{profile.name.split(" ")[0]}, {profile.age}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{profile.year} · {profile.major}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                    <MapPin size={11} color="rgba(255,255,255,0.35)" />
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif" }}>{profile.distance}</span>
                  </div>
                </div>
                <button style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}>
                  <MoreHorizontal size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div style={{ padding: "16px 20px 0" }}>
            <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", fontStyle: "italic" }}>"{profile.bio}"</p>
          </div>

          {/* Interests */}
          <div style={{ padding: "12px 20px 0", display: "flex", flexWrap: "wrap", gap: 7 }}>
            {profile.interests.map((tag: string) => (
              <span key={tag} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 50, padding: "5px 12px", fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif" }}>{tag}</span>
            ))}
          </div>

          {/* SPOTIFY */}
          <div style={{ padding: "14px 20px 0" }}>
            <div style={{ background: "rgba(29,185,84,0.07)", border: "1px solid rgba(29,185,84,0.18)", borderRadius: 18, overflow: "hidden" }}>
              <div onClick={() => setExpandedSection(expandedSection === "spotify" ? null : "spotify")}
                style={{ width: "100%", padding: "13px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(29,185,84,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Music2 size={16} color="#1DB954" />
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontSize: 10, color: "#1DB954", fontWeight: 700, letterSpacing: "0.5px", fontFamily: "'Inter', sans-serif" }}>their vibe 🎵</div>
                    <div style={{ fontSize: 14, color: "white", fontWeight: 600, marginTop: 1 }}>{profile.spotify.playlist}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={(e) => { e.stopPropagation(); handleCommentOnPrompt(`loved your playlist: "${profile.spotify.playlist}"`); }}
                    style={{ background: "rgba(29,185,84,0.18)", border: "1px solid rgba(29,185,84,0.3)", borderRadius: 8, padding: "4px 10px", fontSize: 12, color: "#1DB954", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    ❤️ Like
                  </button>
                  <motion.div animate={{ rotate: expandedSection === "spotify" ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={15} color="rgba(255,255,255,0.35)" />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {expandedSection === "spotify" && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 16px 16px", borderTop: "1px solid rgba(29,185,84,0.1)" }}>
                      <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 12, padding: "10px 12px", marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #1DB954, #158a3c)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Play size={14} fill="white" color="white" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{profile.spotify.nowPlaying}</div>
                          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>now playing</div>
                        </div>
                        <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
                          {[4, 7, 5, 8, 3, 6].map((h, i) => (
                            <motion.div key={i} animate={{ height: [h, h + 4, h] }} transition={{ repeat: Infinity, duration: 0.6 + i * 0.1, ease: "easeInOut" }} style={{ width: 3, background: "#1DB954", borderRadius: 2, height: h }} />
                          ))}
                        </div>
                      </div>
                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>top artists</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {profile.spotify.topArtists.map((artist: string) => (
                            <span key={artist} style={{ background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.18)", borderRadius: 50, padding: "4px 10px", fontSize: 12, color: "#1DB954", fontFamily: "'Inter', sans-serif" }}>{artist}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* HOT TAKE */}
          <div style={{ padding: "10px 20px 0" }}>
            <div style={{ background: "rgba(251,191,36,0.07)", border: "1px solid rgba(251,191,36,0.18)", borderRadius: 18, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Flame size={16} color="#fbbf24" />
                </div>
                <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>hot take 🌶️</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif", fontWeight: 500, margin: "0 0 12px" }}>"{profile.hotTake}"</p>

              <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.07)", overflow: "hidden", marginBottom: 7 }}>
                <div style={{ width: `${hotTakePercent}%`, height: "100%", background: "linear-gradient(to right, #fbbf24, #ff5c2b)", borderRadius: 3, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.35)", marginBottom: 12 }}>
                <span>🔥 {profile.hotTakeAgree.toLocaleString()} agree</span>
                <span>{hotTakePercent}% campus agrees</span>
                <span>{profile.hotTakeDisagree.toLocaleString()} disagree 🧊</span>
              </div>

              <div style={{ display: "flex", gap: 7 }}>
                {["🔥 Agree", "🧊 Nah", "💬 Reply"].map((btn) => (
                  <button key={btn} onClick={() => { if (btn === "💬 Reply") handleCommentOnPrompt(profile.hotTake); else { reactToPrompt(profile.id, "hotTake", btn[0]); } }}
                    style={{ flex: 1, background: isReacted(profile.id, "hotTake") ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${isReacted(profile.id, "hotTake") ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.07)"}`, borderRadius: 10, padding: "7px 4px", fontSize: 12, color: isReacted(profile.id, "hotTake") ? "#fbbf24" : "rgba(255,255,255,0.45)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* HUMOR */}
          <div style={{ padding: "10px 20px 0" }}>
            <div style={{ background: "rgba(255,92,43,0.07)", border: "1px solid rgba(255,92,43,0.18)", borderRadius: 18, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(255,92,43,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Laugh size={16} color="#ff5c2b" />
                </div>
                <span style={{ fontSize: 11, color: "#ff5c2b", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>their humor 😂</span>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.85)", fontFamily: "'Inter', sans-serif", fontWeight: 500, margin: "0 0 12px" }}>"{profile.humor}"</p>
              <div style={{ display: "flex", gap: 7 }}>
                {["😂", "💀", "🫠", "💬"].map((emoji) => (
                  <button key={emoji} onClick={() => { if (emoji === "💬") { handleCommentOnPrompt(profile.humor); } else { reactToPrompt(profile.id, "humor", emoji); handleAction("like"); } }}
                    style={{ flex: 1, background: isReacted(profile.id, "humor") ? "rgba(255,92,43,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${isReacted(profile.id, "humor") ? "rgba(255,92,43,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 10, padding: "8px", fontSize: 16, cursor: "pointer", transition: "all 0.2s" }}>
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Extra Prompts */}
          <div style={{ padding: "10px 20px 0" }}>
            {profile.prompts.map((prompt: { question: string; answer: string }, i: number) => (
              <div key={i} style={{ background: "#100e0c", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 18, padding: "14px 16px", marginBottom: i < profile.prompts.length - 1 ? 8 : 0 }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif", marginBottom: 5 }}>{prompt.question}</div>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif", margin: "0 0 12px" }}>{prompt.answer}</p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => handleCommentOnPrompt(prompt.answer)}
                    style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "7px", fontSize: 12, color: "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <MessageCircle size={12} /> Comment
                  </button>
                  <button onClick={() => { reactToPrompt(profile.id, i, "❤️"); handleAction("like"); }}
                    style={{ flex: 1, background: isReacted(profile.id, i) ? "rgba(255,92,43,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${isReacted(profile.id, i) ? "rgba(255,92,43,0.25)" : "rgba(255,255,255,0.07)"}`, borderRadius: 10, padding: "7px", fontSize: 12, color: isReacted(profile.id, i) ? "#ff5c2b" : "rgba(255,255,255,0.4)", cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                    <Heart size={12} fill={isReacted(profile.id, i) ? "#ff5c2b" : "none"} />
                    {isReacted(profile.id, i) ? "Liked!" : "Like this"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: 20 }} />
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 18, padding: "20px 0", position: "sticky", bottom: 0 }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleAction("pass")}
          style={{ width: 54, height: 54, borderRadius: "50%", background: "#161210", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
          <X size={20} color="rgba(255,255,255,0.45)" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleAction("super")}
          style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.22)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Star size={17} color="#fbbf24" fill="#fbbf24" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleAction("like")}
          style={{ width: 66, height: 66, borderRadius: "50%", background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 32px rgba(255,92,43,0.45)" }}>
          <Heart size={25} fill="white" color="white" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => handleCommentOnPrompt("their profile")}
          style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.22)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <MessageCircle size={17} color="#a78bfa" />
        </motion.button>
        <motion.button whileTap={{ scale: 0.9 }}
          style={{ width: 54, height: 54, borderRadius: "50%", background: "#161210", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <Share2 size={17} color="rgba(255,255,255,0.35)" />
        </motion.button>
      </div>

      {/* Comment Modal */}
      <AnimatePresence>
        {commentModal.open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 200 }}
              onClick={() => setCommentModal({ open: false })} />
            <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ position: "fixed", bottom: 80, left: 16, right: 16, background: "#161210", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 20, zIndex: 201, maxWidth: 520, margin: "0 auto" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>Replying to</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", fontFamily: "'Inter', sans-serif", fontStyle: "italic", marginBottom: 14, padding: "10px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 12, borderLeft: "3px solid #ff5c2b" }}>
                "{commentModal.prompt}"
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <input autoFocus value={commentText} onChange={(e) => setCommentText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendComment()}
                  placeholder="Say something nice..."
                  style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "12px 14px", color: "white", fontSize: 14, outline: "none", fontFamily: "'Inter', sans-serif" }} />
                <button onClick={sendComment}
                  style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 12, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                  <Heart size={18} fill="white" color="white" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Match Animation */}
      <AnimatePresence>
        {showMatchAnimation && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
            style={{ position: "fixed", inset: 0, background: "rgba(12,10,8,0.96)", zIndex: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
            <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, -5, 5, 0] }} transition={{ duration: 0.6, repeat: 2 }} style={{ fontSize: 80 }}>🎉</motion.div>
            <div style={{ fontSize: 36, fontWeight: 800, background: "linear-gradient(135deg, #ff5c2b, #e83268)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-1px" }}>It's a match!</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>You and {profile.name.split(" ")[0]} tapped each other 👋</div>
            <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
              <button onClick={() => { setShowMatchAnimation(false); navigate("/app/matches"); }}
                style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 50, padding: "14px 30px", color: "white", fontSize: 15, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer" }}>
                Send a message
              </button>
              <button onClick={() => setShowMatchAnimation(false)}
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "14px 30px", color: "rgba(255,255,255,0.55)", fontSize: 15, fontWeight: 600, fontFamily: "'Syne', sans-serif", cursor: "pointer" }}>
                Keep going
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
