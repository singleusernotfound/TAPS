import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, Pointer, Music2, Flame, Laugh, Building2, Check, Camera, Plus, X, Loader2 } from "lucide-react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import { ONBOARDING_COLLEGES as COLLEGES } from "../../lib/constants";



const HOT_TAKES_OPTIONS = [
  "9am lectures should be illegal",
  "Pineapple on pizza is fine",
  "Group projects are punishment",
  "Attendance % shouldn't affect grades",
  "Campus food is underrated",
  "Final year is overrated",
  "The library is a vibe",
  "Manifesting grades actually works",
];

const HUMOR_PROMPTS_OPTIONS = [
  "My love language is...",
  "The most unhinged thing I believe is...",
  "Red flag I'd totally ignore:",
  "Two truths and a lie:",
  "I'll instantly like you if...",
  "Best conversation starter:",
];

const SPOTIFY_ARTISTS = [
  "Mitski", "Frank Ocean", "Arctic Monkeys", "Taylor Swift",
  "Tame Impala", "Tyler the Creator", "Phoebe Bridgers", "Radiohead",
  "Arijit Singh", "Sabrina Carpenter", "Gracie Abrams", "Rex Orange County",
  "Big Thief", "Bon Iver", "Sufjan Stevens", "Beabadoobee",
];

const STEPS = [
  { id: "welcome" },
  { id: "auth" },
  { id: "name" },
  { id: "college" },
  { id: "photos" },
  { id: "spotify" },
  { id: "hottake" },
  { id: "humor" },
  { id: "done" },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [collegeSearch, setCollegeSearch] = useState("");
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedHotTake, setSelectedHotTake] = useState("");
  const [selectedHumorPrompt, setSelectedHumorPrompt] = useState("");
  const [humorAnswer, setHumorAnswer] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setAuthError("");
    try {
      // Check if Firebase is actually configured before calling it
      if ((import.meta as any).env.VITE_FIREBASE_API_KEY || auth.app.options.apiKey !== "YOUR_API_KEY") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          college: selectedCollege,
          photos,
          spotifyArtists: selectedArtists,
          hotTake: selectedHotTake,
          humorPrompt: selectedHumorPrompt,
          humorAnswer,
        });
      } else {
        // Mock save if Firebase is just the placeholder config
        console.warn("Using placeholder Firebase config. Mocking successful signup!");
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network request
        // Save to localStorage for mock propagation directly to Profile component
        localStorage.setItem("taps_mockUser", JSON.stringify({
          name, college: selectedCollege, photos, hotTake: selectedHotTake, 
          humorPrompt: selectedHumorPrompt, humorAnswer, spotifyArtists: selectedArtists
        }));
      }
      
      setDirection(1);
      setStep((s) => s + 1);
    } catch (error: any) {
      if (error.message.includes("API key")) {
        setAuthError("Firebase missing credentials. Please update src/lib/firebase.ts!");
      } else {
        setAuthError(error.message);
      }
      setDirection(-1);
      setStep(1); // send back to auth step
    } finally {
      setIsSaving(false);
    }
  };

  const goNext = () => {
    if (STEPS[step].id === "humor") {
      handleSaveProfile();
    } else if (step < STEPS.length - 1) { 
      setDirection(1); 
      setStep((s) => s + 1); 
    } else {
      navigate("/app/discover");
    }
  };

  const goBack = () => {
    if (step > 0) { setDirection(-1); setStep((s) => s - 1); }
  };

  const toggleArtist = (artist: string) => {
    setSelectedArtists((prev) => prev.includes(artist) ? prev.filter((a) => a !== artist) : prev.length < 6 ? [...prev, artist] : prev);
  };

  const filteredColleges = COLLEGES.filter((c) => c.toLowerCase().includes(collegeSearch.toLowerCase()));

  const canContinue = () => {
    if (isSaving) return false;
    const id = STEPS[step].id;
    if (id === "auth") return email.includes("@") && password.length >= 6;
    if (id === "name") return name.trim().length > 1;
    if (id === "college") return !!selectedCollege;
    if (id === "photos") return photos.length > 0;
    if (id === "spotify") return selectedArtists.length >= 3;
    if (id === "hottake") return !!selectedHotTake;
    if (id === "humor") return !!selectedHumorPrompt && humorAnswer.trim().length > 5;
    return true;
  };

  const progress = (step / (STEPS.length - 1)) * 100;

  return (
    <div style={{ background: "#0c0a08", minHeight: "100vh", fontFamily: "'Syne', sans-serif", color: "#ffffff", display: "flex", flexDirection: "column" }}>

      {/* Top bar with back to site */}
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        {/* Back to site link — always visible */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 50, padding: "7px 14px",
            color: "rgba(255,255,255,0.45)", fontSize: 13, fontFamily: "'Inter', sans-serif",
            cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
        >
          <ChevronLeft size={14} />
          Back to Taps
        </button>

        {/* Progress bar */}
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ height: "100%", background: "linear-gradient(to right, #ff5c2b, #e83268)", borderRadius: 2 }} />
        </div>

        {/* Back step (when not on first step) */}
        {step > 0 && step < STEPS.length - 1 ? (
          <button onClick={goBack} style={{ background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.5)", flexShrink: 0 }}>
            <X size={15} />
          </button>
        ) : (
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", flexShrink: 0 }}>{step + 1} / {STEPS.length}</span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "28px 20px 20px", overflow: "hidden" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step} custom={direction} initial={{ opacity: 0, x: direction * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: direction * -40 }} transition={{ duration: 0.28, ease: "easeOut" }}>

            {/* WELCOME */}
            {STEPS[step].id === "welcome" && (
              <div style={{ textAlign: "center", paddingTop: 32 }}>
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 15 }}
                  style={{ width: 90, height: 90, borderRadius: 26, background: "linear-gradient(135deg, #ff5c2b, #e83268)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 20px 60px rgba(255,92,43,0.35)" }}>
                  <Pointer size={38} color="white" />
                </motion.div>
                <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-2px", marginBottom: 10 }}>taps 👋</h1>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.48)", fontFamily: "'Inter', sans-serif", lineHeight: 1.65, maxWidth: 300, margin: "0 auto 36px" }}>
                  Dating for college students, built different. Match on music, opinions, and actual humor — with people on your campus.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300, margin: "0 auto" }}>
                  {[
                    { icon: Music2, text: "Match on Spotify playlists", color: "#1DB954" },
                    { icon: Flame, text: "Hot takes, not small talk", color: "#fbbf24" },
                    { icon: Laugh, text: "Humor-first profiles", color: "#ff5c2b" },
                    { icon: Building2, text: "Your campus only", color: "#a78bfa" },
                  ].map((feat) => (
                    <div key={feat.text} style={{ display: "flex", alignItems: "center", gap: 12, background: "#161210", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "12px 16px", textAlign: "left" }}>
                      <feat.icon size={17} color={feat.color} />
                      <span style={{ fontSize: 14, fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.7)" }}>{feat.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AUTH */}
            {STEPS[step].id === "auth" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>Create an account 🔑</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 28 }}>We need an account to save your profile.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address"
                    style={{ width: "100%", background: "#161210", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "16px 18px", color: "white", fontSize: 16, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }} />
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 6 chars)"
                    style={{ width: "100%", background: "#161210", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "16px 18px", color: "white", fontSize: 16, fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" }} />
                </div>
                {authError && <div style={{ color: "#ff5c2b", fontSize: 13, marginTop: 12, fontFamily: "'Inter', sans-serif" }}>{authError}</div>}
              </div>
            )}

            {/* NAME */}
            {STEPS[step].id === "name" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>Hey, what should we call you? 😊</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 28 }}>First name only. Keep it real.</p>
                <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Your first name"
                  style={{ width: "100%", background: "#161210", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "16px 18px", color: "white", fontSize: 20, fontFamily: "'Syne', sans-serif", fontWeight: 700, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                  onFocus={(e) => (e.target.style.borderColor = "#ff5c2b")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.09)")} />
                {name.length > 1 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 14, color: "#ff5c2b", fontFamily: "'Inter', sans-serif", marginTop: 10 }}>
                    Nice to meet you, {name}! 👋
                  </motion.p>
                )}
              </div>
            )}

            {/* COLLEGE */}
            {STEPS[step].id === "college" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>Where do you study? 🎓</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 20 }}>Only students from your college can see your profile.</p>
                <input autoFocus value={collegeSearch} onChange={(e) => setCollegeSearch(e.target.value)} placeholder="Search your college..."
                  style={{ width: "100%", background: "#161210", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "13px 16px", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none", marginBottom: 12, boxSizing: "border-box" }}
                  onFocus={(e) => (e.target.style.borderColor = "#a78bfa")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.09)")} />
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {filteredColleges.map((college) => (
                    <motion.button key={college} whileTap={{ scale: 0.98 }} onClick={() => setSelectedCollege(college)}
                      style={{ background: selectedCollege === college ? "rgba(167,139,250,0.12)" : "#161210", border: `1px solid ${selectedCollege === college ? "rgba(167,139,250,0.35)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 18 }}>🎓</span>
                        <span style={{ fontSize: 15, fontWeight: 600, color: selectedCollege === college ? "#a78bfa" : "rgba(255,255,255,0.75)", fontFamily: "'Inter', sans-serif" }}>{college}</span>
                      </div>
                      {selectedCollege === college && <Check size={15} color="#a78bfa" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* PHOTOS */}
            {STEPS[step].id === "photos" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>Show your face 📸</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 24 }}>Upload some photos of yourself. People with 3+ get 4x more matches.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                  {[...photos, ...Array(6 - photos.length).fill(null)].map((photo, i) => (
                    <div key={i} onClick={() => {
                      if (photo) {
                        setPhotos(p => p.filter((_, index) => index !== i));
                      } else {
                        document.getElementById('photo-upload')?.click();
                      }
                    }} style={{ aspectRatio: "3/4", borderRadius: 16, background: photo ? "transparent" : "#161210", border: photo ? "none" : "1.5px dashed rgba(255,255,255,0.1)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                      {photo ? (
                        <>
                          <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          <div style={{ position: "absolute", top: 6, right: 6, background: "rgba(0,0,0,0.5)", borderRadius: "50%", padding: 4 }}><X size={12} color="white" /></div>
                          {i === 0 && <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", background: "rgba(255,92,43,0.9)", borderRadius: 50, padding: "2px 10px", fontSize: 10, fontWeight: 700, fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>main ✨</div>}
                        </>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                          {i === photos.length ? <Camera size={18} color="rgba(255,255,255,0.22)" /> : <Plus size={14} color="rgba(255,255,255,0.15)" />}
                          {i === photos.length && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "'Inter', sans-serif", textAlign: "center", padding: "0 6px" }}>add one</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <input id="photo-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPhotos(p => [...p, reader.result as string]);
                    };
                    reader.readAsDataURL(file);
                  }
                  e.target.value = "";
                }} />
              </div>
            )}

            {/* SPOTIFY */}
            {STEPS[step].id === "spotify" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>What are you listening to? 🎵</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 20 }}>Pick 3 to 6 artists. This is how people judge you and that's okay.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SPOTIFY_ARTISTS.map((artist) => {
                    const selected = selectedArtists.includes(artist);
                    return (
                      <motion.button key={artist} whileTap={{ scale: 0.95 }} onClick={() => toggleArtist(artist)}
                        style={{ background: selected ? "rgba(29,185,84,0.18)" : "rgba(255,255,255,0.04)", border: `1px solid ${selected ? "rgba(29,185,84,0.45)" : "rgba(255,255,255,0.09)"}`, borderRadius: 50, padding: "8px 16px", fontSize: 13, color: selected ? "#1DB954" : "rgba(255,255,255,0.55)", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: selected ? 700 : 400, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6 }}>
                        {selected && <Check size={11} />}
                        {artist}
                      </motion.button>
                    );
                  })}
                </div>
                {selectedArtists.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 14, fontSize: 13, color: "#1DB954", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                    {selectedArtists.length}/6 picked {selectedArtists.length >= 3 && "— solid taste ✓"}
                  </motion.div>
                )}
              </div>
            )}

            {/* HOT TAKE */}
            {STEPS[step].id === "hottake" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>Drop your hot take 🌶️</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 20 }}>Pick one you actually believe. People will vote and comment — that's how conversations start.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {HOT_TAKES_OPTIONS.map((take) => (
                    <motion.button key={take} whileTap={{ scale: 0.98 }} onClick={() => setSelectedHotTake(take)}
                      style={{ background: selectedHotTake === take ? "rgba(251,191,36,0.12)" : "#161210", border: `1px solid ${selectedHotTake === take ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.06)"}`, borderRadius: 14, padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s" }}>
                      <span style={{ fontSize: 14, fontFamily: "'Inter', sans-serif", color: selectedHotTake === take ? "#fbbf24" : "rgba(255,255,255,0.72)", fontWeight: selectedHotTake === take ? 600 : 400 }}>{take}</span>
                      {selectedHotTake === take && <Check size={15} color="#fbbf24" />}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* HUMOR */}
            {STEPS[step].id === "humor" && (
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6, lineHeight: 1.2 }}>Make them laugh 😂</h1>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "'Inter', sans-serif", lineHeight: 1.5, marginBottom: 18 }}>This is the most important section. Be yourself. Be weird if you want.</p>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.32)", fontFamily: "'Inter', sans-serif", marginBottom: 8 }}>choose a prompt:</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {HUMOR_PROMPTS_OPTIONS.map((p) => (
                      <button key={p} onClick={() => setSelectedHumorPrompt(p)}
                        style={{ background: selectedHumorPrompt === p ? "rgba(255,92,43,0.1)" : "rgba(255,255,255,0.03)", border: `1px solid ${selectedHumorPrompt === p ? "rgba(255,92,43,0.28)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, padding: "11px 14px", textAlign: "left", cursor: "pointer", fontSize: 14, color: selectedHumorPrompt === p ? "#ff5c2b" : "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", width: "100%", transition: "all 0.2s" }}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedHumorPrompt && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div style={{ fontSize: 14, color: "#ff5c2b", fontFamily: "'Inter', sans-serif", marginBottom: 8, fontWeight: 600 }}>{selectedHumorPrompt}</div>
                    <textarea autoFocus value={humorAnswer} onChange={(e) => setHumorAnswer(e.target.value)} placeholder="Your answer (the funnier the better)..." rows={3}
                      style={{ width: "100%", background: "#161210", border: "1px solid rgba(255,92,43,0.2)", borderRadius: 14, padding: "13px 16px", color: "white", fontSize: 15, fontFamily: "'Inter', sans-serif", outline: "none", resize: "none", boxSizing: "border-box", lineHeight: 1.5 }} />
                  </motion.div>
                )}
              </div>
            )}

            {/* DONE */}
            {STEPS[step].id === "done" && (
              <div style={{ textAlign: "center", paddingTop: 20 }}>
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", damping: 12 }} style={{ fontSize: 80, marginBottom: 20 }}>🎉</motion.div>
                <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-1px", marginBottom: 10, lineHeight: 1.2 }}>
                  {name || "You"}'re officially on Taps!
                </h2>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", lineHeight: 1.65, marginBottom: 30 }}>
                  Your profile is live on{" "}
                  <span style={{ color: "#a78bfa", fontWeight: 600 }}>{selectedCollege || "your campus"}</span>. Someone out there is going to love your hot take. 🧡
                </p>
                <div style={{ background: "#161210", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: 16, marginBottom: 24, textAlign: "left" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "'Inter', sans-serif", marginBottom: 12, letterSpacing: "0.3px" }}>your profile summary</div>
                  {[
                    { icon: Music2, color: "#1DB954", label: "Music", value: selectedArtists.slice(0, 3).join(", ") || "Not set" },
                    { icon: Flame, color: "#fbbf24", label: "Take", value: selectedHotTake || "Not set" },
                    { icon: Laugh, color: "#ff5c2b", label: "Humor", value: humorAnswer || "Not set" },
                    { icon: Building2, color: "#a78bfa", label: "Campus", value: selectedCollege || "Not set" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <item.icon size={13} color={item.color} />
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "'Inter', sans-serif", width: 60, flexShrink: 0 }}>{item.label}</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.68)", fontFamily: "'Inter', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <div style={{ padding: "0 20px 44px" }}>
        <div style={{ display: "flex", gap: 12 }}>
          {step > 0 && STEPS[step].id !== "done" && (
            <motion.button whileTap={{ scale: 0.97 }} onClick={goBack} disabled={isSaving}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 50, padding: "16px 22px",
                color: "white", fontSize: 16, fontWeight: 700, fontFamily: "'Syne', sans-serif",
                cursor: isSaving ? "default" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                transition: "all 0.25s",
              }}>
              <ChevronLeft size={18} />
            </motion.button>
          )}

          <motion.button whileTap={{ scale: 0.97 }} onClick={goNext} disabled={!canContinue()}
            style={{
              flex: 1,
              background: canContinue() ? "linear-gradient(135deg, #ff5c2b, #e83268)" : "rgba(255,255,255,0.06)",
              border: "none", borderRadius: 50, padding: "17px",
              color: canContinue() ? "white" : "rgba(255,255,255,0.22)",
              fontSize: 16, fontWeight: 700, fontFamily: "'Syne', sans-serif",
              cursor: canContinue() ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.25s",
              boxShadow: canContinue() ? "0 8px 32px rgba(255,92,43,0.3)" : "none",
            }}>
            {isSaving ? <Loader2 size={16} className="animate-spin" /> : STEPS[step].id === "done" ? "Let's find my match ✨" : STEPS[step].id === "welcome" ? <>Let's go <ArrowRight size={16} /></> : <>Continue <ArrowRight size={16} /></>}
          </motion.button>
        </div>

        {/* Skip hint for optional steps */}
        {(STEPS[step].id === "photos") && (
          <button onClick={goNext} style={{ width: "100%", marginTop: 12, background: "none", border: "none", color: "rgba(255,255,255,0.28)", fontSize: 13, fontFamily: "'Inter', sans-serif", cursor: "pointer" }}>
            skip for now
          </button>
        )}
      </div>
    </div>
  );
}
