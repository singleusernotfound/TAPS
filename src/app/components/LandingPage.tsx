import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Music2, Flame, Laugh, Building2, Heart,
  ChevronDown, Star, ArrowRight, Play, Users, Zap, Lock, Download
} from "lucide-react";
import { Logo } from "./Logo";
import { AVAILABLE_CAMPUSES as COLLEGES } from "../../lib/constants";

const PROFILE_CARDS = [
  {
    name: "Aanya", age: 20, year: "2nd Year", major: "Psychology",
    photo: "https://images.unsplash.com/photo-1556560984-36a7ec2ba544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwdW5pdmVyc2l0eSUyMGNhbXB1cyUyMGxpZmVzdHlsZWVufDF8fHx8MTc3MzIzNTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    playlist: "sad girl autumn + banger tuesdays",
    hotTake: "9am lectures should be illegal",
    humor: "I speak fluent sarcasm and bad decisions",
  },
  {
    name: "Rohan", age: 21, major: "CS", year: "3rd Year",
    photo: "https://images.unsplash.com/photo-1758270705555-015de348a48a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGNvbGxlZ2UlMjBzdHVkZW50JTIwY2FzdWFsfGVufDF8fHx8MTc3MzIzNTA5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    playlist: "lo-fi chill + midnight coding sessions",
    hotTake: "pineapple on pizza is fine and I'm done arguing",
    humor: "my love language is memes at 3am and pretending it means nothing",
  },
];

const FEATURES = [
  {
    icon: Music2,
    color: "#1DB954",
    bg: "rgba(29,185,84,0.12)",
    title: "Match on music",
    desc: "Your playlist says more about you than your bio ever will. We match you based on what you're actually listening to.",
    tag: "Spotify",
  },
  {
    icon: Flame,
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.12)",
    title: "Hot takes, not small talk",
    desc: "Answer spicy opinions and find someone who actually has a brain. Debates > 'hey how r u'.",
    tag: "Spicy 🌶️",
  },
  {
    icon: Laugh,
    color: "#ff5c2b",
    bg: "rgba(255,92,43,0.12)",
    title: "Be funny, be real",
    desc: "Humor prompts let your actual personality show. No filter. No cringe bio. Just you, weirdly charming.",
    tag: "No cringe",
  },
  {
    icon: Building2,
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
    title: "Your campus only",
    desc: "Every college has its own private server. Only your uni can see your profile. Zero randos.",
    tag: "Private",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya K.", college: "IIT Bombay",
    text: "Met Arjun because we both had Mitski AND Phoebe Bridgers on our playlist. Now 6 months in. Genuinely scary how well it works.",
    avatar: "https://images.unsplash.com/photo-1765307639918-a99f7f3d9f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    name: "Dev M.", college: "NIT Trichy",
    text: "The hot takes section is unhinged in the best way. Someone agreed pineapple pizza is fine and honestly that's my person.",
    avatar: "https://images.unsplash.com/photo-1622179986499-fa3dfabc8ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    name: "Zara S.", college: "Ashoka University",
    text: "Finally not getting matched with 30-year-olds. Campus-only literally changed everything. Plus the UI doesn't make me want to cry.",
    avatar: "https://images.unsplash.com/photo-1655468289134-bb764181b0e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % PROFILE_CARDS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: `radial-gradient(circle at 10% 20%, rgba(232, 50, 104, 0.06), transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 92, 43, 0.05), transparent 40%), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 35L23.5 33.6C18.2 28.8 14.5 25.4 14.5 21C14.5 17.5 17.2 14.8 20.6 14.8C22.5 14.8 24.3 15.7 25 17.1C25.7 15.7 27.5 14.8 29.4 14.8C32.8 14.8 35.5 17.5 35.5 21C35.5 25.4 31.8 28.8 26.5 33.6L25 35Z' fill='rgba(255, 92, 43, 0.03)'/%3E%3Cpath d='M75 85L73.5 83.6C68.2 78.8 64.5 75.4 64.5 71C64.5 67.5 67.2 64.8 70.6 64.8C72.5 64.8 74.3 65.7 75 67.1C75.7 65.7 77.5 64.8 79.4 64.8C82.8 64.8 85.5 67.5 85.5 71C85.5 75.4 81.8 78.8 76.5 83.6L75 85Z' fill='rgba(232, 50, 104, 0.02)'/%3E%3C/svg%3E") #0c0a08`, minHeight: "100vh", fontFamily: "'Syne', sans-serif", color: "#ffffff", overflowX: "hidden" }}>
      {/* Navbar */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: scrollY > 60 ? "rgba(12,10,8,0.95)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
          borderBottom: scrollY > 60 ? "1px solid rgba(255,255,255,0.06)" : "none",
          transition: "all 0.3s ease",
          padding: "18px 5%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <Logo scale={0.75} />
        </button>

        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden md:flex">
          {["Features", "Campus", "How it works", "Download"].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 15, fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none", border: "none", color: "rgba(255,255,255,0.75)", fontSize: 14, 
              fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "color 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
            Log in
          </button>
          <button
            onClick={() => navigate("/onboarding")}
            style={{
              background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 50,
              padding: "10px 24px", color: "white", fontSize: 14, fontWeight: 700,
              fontFamily: "'Syne', sans-serif", cursor: "pointer", letterSpacing: "0.3px",
            }}>
            Join for free
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 5% 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,92,43,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "30%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,50,104,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 1280, margin: "0 auto", gap: 60, flexWrap: "wrap" }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ flex: "1 1 420px", maxWidth: 580 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,92,43,0.12)", border: "1px solid rgba(255,92,43,0.25)",
              borderRadius: 50, padding: "6px 16px", marginBottom: 28,
            }}>
              <Zap size={14} color="#ff5c2b" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#ff5c2b", letterSpacing: "1px", fontFamily: "'Inter', sans-serif" }}>
                for college students only
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 24 }}>
              Dating that feels{" "}
              <span style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                human
              </span>{" "}
              again.
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(255,255,255,0.5)", marginBottom: 40, fontFamily: "'Inter', sans-serif", fontWeight: 400, maxWidth: 480 }}>
              Taps is where college students actually connect — through music, hot takes, and humor. Your campus. Your people. No weirdos from outside.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/onboarding")}
                style={{
                  background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 50,
                  padding: "16px 36px", color: "white", fontSize: 16, fontWeight: 700,
                  fontFamily: "'Syne', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 8px 32px rgba(255,92,43,0.3)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,92,43,0.45)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(255,92,43,0.3)"; }}>
                Get started free <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("/app")}
                style={{
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 50, padding: "16px 36px", color: "white", fontSize: 16, fontWeight: 600,
                  fontFamily: "'Syne', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
                <Play size={15} fill="white" /> See how it works
              </button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 48, fontFamily: "'Inter', sans-serif" }}>
              {[{ num: "50K+", label: "Students" }, { num: "200+", label: "Campuses" }, { num: "12K+", label: "Matches Made" }].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Syne', sans-serif" }}>{stat.num}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Phone Mockup */}
          <motion.div initial={{ opacity: 0, y: 60, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }} style={{ flex: "0 0 auto", position: "relative" }}>
            <div style={{
              width: 320, background: "#161210", borderRadius: 40,
              border: "2px solid rgba(255,255,255,0.07)", overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
            }}>
              {/* Top bar */}
              <div style={{
                background: "#100e0c", padding: "16px 20px 12px",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
                  <Logo scale={0.5} />
                </button>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>IIT Delhi</div>
              </div>

              {/* Card preview */}
              <motion.div key={activeCard} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <div style={{ position: "relative" }}>
                  <img src={PROFILE_CARDS[activeCard].photo} alt={PROFILE_CARDS[activeCard].name}
                    style={{ width: "100%", height: 260, objectFit: "cover", objectPosition: "top", display: "block" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(12,10,8,0.95) 0%, transparent 100%)", padding: "40px 16px 14px" }}>
                    <div style={{ fontSize: 20, fontWeight: 800 }}>{PROFILE_CARDS[activeCard].name}, {PROFILE_CARDS[activeCard].age}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", marginTop: 2 }}>{PROFILE_CARDS[activeCard].year} · {PROFILE_CARDS[activeCard].major}</div>
                  </div>
                </div>

                <div style={{ padding: "12px 16px 0" }}>
                  <div style={{ background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.2)", borderRadius: 14, padding: "10px 12px", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                    <Music2 size={15} color="#1DB954" />
                    <div>
                      <div style={{ fontSize: 9, color: "#1DB954", fontWeight: 700, letterSpacing: "0.5px", fontFamily: "'Inter', sans-serif" }}>their vibe</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif", marginTop: 1 }}>{PROFILE_CARDS[activeCard].playlist}</div>
                    </div>
                  </div>
                  <div style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 14, padding: "10px 12px", marginBottom: 10, display: "flex", alignItems: "center", gap: 10 }}>
                    <Flame size={15} color="#fbbf24" />
                    <div>
                      <div style={{ fontSize: 9, color: "#fbbf24", fontWeight: 700, letterSpacing: "0.5px", fontFamily: "'Inter', sans-serif" }}>hot take</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "'Inter', sans-serif", marginTop: 1 }}>{PROFILE_CARDS[activeCard].hotTake}</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "8px 16px 20px" }}>
                  {[{ icon: "✕", bg: "rgba(255,255,255,0.07)", size: 42 }, { icon: "♥", bg: "linear-gradient(135deg,#ff5c2b,#e83268)", size: 52 }, { icon: "⭐", bg: "rgba(251,191,36,0.15)", size: 42 }].map((btn, i) => (
                    <div key={i} style={{ width: btn.size, height: btn.size, borderRadius: "50%", background: btn.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: i === 1 ? 22 : 16, cursor: "pointer", boxShadow: i === 1 ? "0 8px 24px rgba(255,92,43,0.4)" : "none" }}>{btn.icon}</div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Floating badges */}
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ position: "absolute", top: 80, right: -60, background: "#161210", border: "1px solid rgba(29,185,84,0.3)", borderRadius: 16, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              <Music2 size={15} color="#1DB954" />
              <span style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap" }}>Spotify matched! 🎵</span>
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              style={{ position: "absolute", bottom: 100, left: -70, background: "#161210", border: "1px solid rgba(255,92,43,0.3)", borderRadius: 16, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              <Heart size={14} color="#ff5c2b" fill="#ff5c2b" />
              <span style={{ fontSize: 12, fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.8)", whiteSpace: "nowrap" }}>new match nearby!</span>
            </motion.div>
          </motion.div>
        </div>

        <a href="#features" style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.25)", textDecoration: "none", fontSize: 11, letterSpacing: "2px", fontFamily: "'Inter', sans-serif" }}>
          SCROLL
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ChevronDown size={18} /></motion.div>
        </a>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1 }}>
              Matching that feels{" "}
              <span style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>natural.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginTop: 14, fontSize: 17, fontFamily: "'Inter', sans-serif", maxWidth: 480, margin: "14px auto 0", lineHeight: 1.6 }}>
              You're more than a photo and a height. Taps gets that.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {FEATURES.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 28, position: "relative", overflow: "hidden" }}
                whileHover={{ y: -4 }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${feature.color}40, transparent)` }} />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: feature.bg, border: `1px solid ${feature.color}20`, borderRadius: 50, padding: "4px 12px", marginBottom: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.5px", color: feature.color, fontFamily: "'Inter', sans-serif" }}>{feature.tag}</span>
                </div>
                <div style={{ width: 46, height: 46, borderRadius: 14, background: feature.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <feature.icon size={20} color={feature.color} />
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.3px" }}>{feature.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif" }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Section */}
      <section id="campus" style={{ padding: "100px 5%", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 80, flexWrap: "wrap" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: "1 1 380px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
              <Lock size={13} color="#a78bfa" />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#a78bfa", letterSpacing: "1px", fontFamily: "'Inter', sans-serif" }}>YOUR CAMPUS ONLY</span>
            </div>
            <h2 style={{ fontSize: "clamp(30px, 4vw, 50px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 20 }}>
              Your college.<br />
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #7c6bf0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Your people.</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", marginBottom: 32, maxWidth: 440 }}>
              Every college gets its own private server. Profiles are visible only to verified students at that college. No catfishing from outside. Just your batch.
            </p>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[{ icon: Lock, label: "Private by campus", color: "#a78bfa" }, { icon: Users, label: "Verified students only", color: "#ff5c2b" }, { icon: Building2, label: "200+ colleges live", color: "#1DB954" }].map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <item.icon size={15} color={item.color} />
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ flex: "1 1 340px" }}>
            <div style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 24, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}>Live campus servers</span>
                <span style={{ fontSize: 11, color: "#1DB954", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1DB954", display: "inline-block" }} /> online
                </span>
              </div>
              {COLLEGES.map((college, i) => (
                <motion.div key={college.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  style={{ padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: i < COLLEGES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", cursor: "pointer" }}
                  whileHover={{ background: "rgba(255,255,255,0.025)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: college.active ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🎓</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{college.name}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", marginTop: 1 }}>{college.members} students</div>
                    </div>
                  </div>
                  <div style={{ background: college.active ? "rgba(255,92,43,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${college.active ? "rgba(255,92,43,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 50, padding: "3px 10px", fontSize: 11, color: college.active ? "#ff5c2b" : "rgba(255,255,255,0.25)", fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                    {college.active ? "LIVE" : "SOON"}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 64, lineHeight: 1.1 }}>
            Ready in{" "}
            <span style={{ background: "linear-gradient(135deg, #fbbf24, #ff5c2b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>3 minutes.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { step: "01", title: "Verify your college", desc: "Sign up with your college email. We make sure you're actually enrolled — no outsiders.", color: "#ff5c2b" },
              { step: "02", title: "Build your Taps profile", desc: "Photos, Spotify, hot takes, humor prompts. 5 minutes and people actually want to tap you.", color: "#e83268" },
              { step: "03", title: "Match and meet IRL", desc: "Like profiles, react to prompts, match and chat. They're literally on your campus.", color: "#1DB954" },
            ].map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 28, textAlign: "left", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 72, fontWeight: 800, color: `${step.color}12`, position: "absolute", top: -10, right: 16, lineHeight: 1, pointerEvents: "none" }}>{step.step}</div>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `${step.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, fontSize: 15, fontWeight: 800, color: step.color, fontFamily: "'Syne', sans-serif" }}>{step.step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.2px" }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif" }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "80px 5%", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 48, textAlign: "center" }}>
            Real people,{" "}
            <span style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>real matches.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: 28 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} color="#fbbf24" fill="#fbbf24" />)}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.65)", fontFamily: "'Inter', sans-serif", marginBottom: 20, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif" }}>{t.college}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" style={{ padding: "100px 5%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,92,43,0.07) 0%, rgba(232,50,104,0.05) 50%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 580, margin: "0 auto", position: "relative" }}>
          <div style={{ fontSize: 52, marginBottom: 20 }}>👋</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 62px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 18 }}>
            Your match is{" "}
            <span style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>out there.</span>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", marginBottom: 40, lineHeight: 1.6 }}>
            50,000+ students already finding their people on Taps. Free forever for students.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/onboarding")}
              style={{ background: "linear-gradient(135deg, #ff5c2b, #e83268)", border: "none", borderRadius: 50, padding: "18px 44px", color: "white", fontSize: 17, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 12px 40px rgba(255,92,43,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 16px 50px rgba(255,92,43,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(255,92,43,0.3)"; }}>
              <Download size={18} /> Join Taps — it's free
            </button>
            <button onClick={() => navigate("/app")}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 50, padding: "18px 44px", color: "rgba(255,255,255,0.6)", fontSize: 17, fontWeight: 600, fontFamily: "'Syne', sans-serif", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
              Preview the app
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px 5%", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <Logo scale={0.5} />
        </button>
        <div style={{ display: "flex", gap: 28, fontSize: 13, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", flexWrap: "wrap" }}>
          {["Privacy", "Terms", "Support", "Colleges", "Blog"].map((item) => (
            <a key={item} href="#" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>{item}</a>
          ))}
          <a href="#" onClick={(e) => { e.preventDefault(); navigate("/admin"); }} style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
            Admin
          </a>
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", fontFamily: "'Inter', sans-serif" }}>© 2026 Taps · Made for campus love 🧡</div>
      </footer>
    </div>
  );
}
