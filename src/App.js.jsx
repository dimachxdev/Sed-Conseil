import { useState, useEffect, useRef } from "react";
import { Target, Search, Sparkles, Award, ArrowRight, Globe, MapPin, ChevronRight, Cpu, Zap, Wand2, Loader2, Send, Bot, X } from "lucide-react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,300;1,9..40,500;1,9..40,700&display=swap');
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    :root {
      --blue:#2563eb; --blue-light:#3b82f6; --blue-dim:#eff6ff;
      --dark:#0f172a; --mid:#475569; --soft:#64748b;
      --border:#f1f5f9; --white:#ffffff;
      --font-display:'Playfair Display',Georgia,serif;
      --font-body:'DM Sans',system-ui,sans-serif;
    }
    html { scroll-behavior:smooth; }
    body { font-family:var(--font-body); background:var(--white); color:var(--dark); overflow-x:hidden; -webkit-font-smoothing:antialiased; }
    ::selection { background:#bfdbfe; color:#1e3a8a; }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(28px);}  to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn   { from{opacity:0;}                              to{opacity:1;} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.95);}         to{opacity:1;transform:scale(1);} }
    @keyframes slideUp  { from{transform:translateY(80px);opacity:0;}   to{transform:translateY(0);opacity:1;} }
    @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:.4;} }
    @keyframes spin     { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    @keyframes bounce   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
    @keyframes glow     { 0%,100%{box-shadow:0 0 20px rgba(37,99,235,.3);} 50%{box-shadow:0 0 44px rgba(37,99,235,.65);} }
    @keyframes shimmer  { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
    @keyframes float    { 0%,100%{transform:translateY(0) rotate(0deg);} 50%{transform:translateY(-14px) rotate(1.5deg);} }
    @keyframes marquee  { from{transform:translateX(0);} to{transform:translateX(-50%);} }

    .fade-up  { animation:fadeUp  .75s cubic-bezier(.16,1,.3,1) both; }
    .fade-in  { animation:fadeIn  .55s ease both; }
    .scale-in { animation:scaleIn .5s  cubic-bezier(.16,1,.3,1) both; }
    .slide-up { animation:slideUp .45s cubic-bezier(.16,1,.3,1) both; }

    .d1{animation-delay:.08s;} .d2{animation-delay:.18s;} .d3{animation-delay:.28s;}
    .d4{animation-delay:.38s;} .d5{animation-delay:.48s;} .d6{animation-delay:.6s;}

    .card-hover { transition:transform .35s cubic-bezier(.16,1,.3,1),box-shadow .35s ease,border-color .35s ease; will-change:transform; }
    .card-hover:hover { transform:translateY(-7px) scale(1.015); box-shadow:0 28px 64px rgba(37,99,235,.13); border-color:#bfdbfe !important; }
    .card-hover:hover .exp-icon { transform:rotate(12deg) scale(1.15) !important; }

    .nav-link { position:relative; background:none; border:none; font-family:var(--font-body); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; cursor:pointer; color:#475569; padding-bottom:4px; transition:color .25s; }
    .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:var(--blue); transition:width .3s cubic-bezier(.16,1,.3,1); border-radius:2px; }
    .nav-link:hover,.nav-link.active { color:var(--blue); }
    .nav-link:hover::after,.nav-link.active::after { width:100%; }

    .btn-primary { display:inline-flex; align-items:center; gap:12px; padding:22px 44px; border-radius:16px; background:var(--dark); color:white; font-family:var(--font-body); font-size:15px; font-weight:900; border:none; cursor:pointer; box-shadow:0 8px 32px rgba(15,23,42,.25); transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,background .3s; position:relative; overflow:hidden; }
    .btn-primary::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.08) 0%,transparent 60%); pointer-events:none; }
    .btn-primary:hover { background:var(--blue); transform:translateY(-3px) scale(1.02); box-shadow:0 18px 50px rgba(37,99,235,.38); }
    .btn-primary:active { transform:scale(.97); }
    .btn-primary .arrow { transition:transform .3s cubic-bezier(.16,1,.3,1); }
    .btn-primary:hover .arrow { transform:translateX(7px); }

    .btn-blue { width:100%; padding:18px; border-radius:14px; background:var(--blue); color:white; border:none; font-family:var(--font-body); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:transform .25s,box-shadow .25s,background .25s; box-shadow:0 4px 20px rgba(37,99,235,.3); }
    .btn-blue:hover:not(:disabled) { background:#1d4ed8; transform:translateY(-2px); box-shadow:0 10px 36px rgba(37,99,235,.4); }
    .btn-blue:disabled { opacity:.5; cursor:not-allowed; }

    .btn-audit { background:var(--blue); color:white; padding:13px 22px; border-radius:10px; font-family:var(--font-body); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; border:none; cursor:pointer; transition:transform .25s,box-shadow .25s,background .25s; box-shadow:0 4px 16px rgba(37,99,235,.3); }
    .btn-audit:hover { background:var(--dark); transform:translateY(-2px); box-shadow:0 8px 24px rgba(15,23,42,.25); }

    .field { width:100%; padding:20px 24px; background:#f8fafc; border-radius:14px; border:2px solid #f1f5f9; outline:none; font-family:var(--font-body); font-weight:700; font-size:14px; color:var(--dark); transition:border-color .25s,box-shadow .25s,background .25s; }
    .field:focus { border-color:#93c5fd; background:white; box-shadow:0 0 0 4px rgba(37,99,235,.08); }
    .field::placeholder { color:#94a3b8; font-weight:500; }

    .glass { background:rgba(255,255,255,.85); backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%); border:1px solid rgba(255,255,255,.65); }

    .maturity-btn { padding:36px 40px; border:2px solid #f1f5f9; border-radius:2.5rem; background:white; cursor:pointer; display:flex; align-items:center; justify-content:space-between; transition:border-color .25s,background .25s,transform .3s cubic-bezier(.16,1,.3,1),box-shadow .25s; }
    .maturity-btn:hover { border-color:var(--blue); background:#eff6ff; transform:translateX(5px); box-shadow:0 8px 28px rgba(37,99,235,.1); }
    .maturity-btn:hover .chevron { color:var(--blue) !important; transform:translateX(5px) !important; }
    .chevron { color:#bfdbfe; transition:color .25s,transform .3s; }

    .idea-card { padding:24px; background:white; border:1px solid #f1f5f9; border-radius:24px; box-shadow:0 4px 20px rgba(0,0,0,.05); transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s; animation:scaleIn .4s cubic-bezier(.16,1,.3,1) both; }
    .idea-card:hover { transform:translateY(-5px); box-shadow:0 14px 44px rgba(37,99,235,.13); }

    .chat-bubble-ai   { background:white; color:#334155; border:1px solid #f1f5f9; border-radius:18px 18px 18px 4px; box-shadow:0 2px 12px rgba(0,0,0,.05); }
    .chat-bubble-user { background:var(--blue); color:white; border-radius:18px 18px 4px 18px; }

    .display-title { font-family:var(--font-display); font-weight:900; font-style:italic; text-transform:uppercase; letter-spacing:-.04em; line-height:.9; color:var(--dark); }

    .badge { display:inline-flex; align-items:center; gap:10px; background:var(--dark); color:white; padding:10px 20px; border-radius:100px; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:.2em; box-shadow:0 8px 24px rgba(15,23,42,.2); position:relative; overflow:hidden; font-family:var(--font-body); }
    .badge::before { content:''; position:absolute; inset:0; background:linear-gradient(90deg,transparent,rgba(255,255,255,.07),transparent); background-size:200%; animation:shimmer 2.5s infinite; pointer-events:none; }

    .ticker-wrap { overflow:hidden; }
    .ticker-inner { display:flex; gap:64px; animation:marquee 20s linear infinite; white-space:nowrap; }
    .ticker-inner:hover { animation-play-state:paused; }

    .orb { position:absolute; border-radius:50%; pointer-events:none; filter:blur(110px); opacity:.5; animation:float 9s ease-in-out infinite; }

    .exp-icon { transition:transform .4s cubic-bezier(.16,1,.3,1); }
    .logo-svg { transition:transform .4s cubic-bezier(.16,1,.3,1); }
    .logo-wrap:hover .logo-svg { transform:rotate(15deg) scale(1.1); }

    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:transparent; }
    ::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:3px; }
    ::-webkit-scrollbar-thumb:hover { background:#cbd5e1; }
  `}</style>
);

/* ─── LOGO ──────────────────────────────────────────────────────────────── */
const Logo = ({ size=40, pulse=true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z" fill="white" stroke="currentColor" strokeWidth=".5"/>
    <path d="M50 20L30 35M50 50L25 50M50 80L35 65" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" opacity=".6"/>
    <circle cx="28" cy="35" r="3" fill="#3B82F6"/>
    <circle cx="22" cy="50" r="3" fill="#3B82F6"/>
    <circle cx="33" cy="65" r="3" fill="#3B82F6"/>
    <path d="M50 20V80M50 20L75 35V65L50 80" fill="#0F172A"/>
    <path d="M55 40H70M55 50H65M55 60H70" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="8" fill="#3B82F6" style={pulse ? {animation:"pulse 2s infinite"} : {}}/>
    <circle cx="50" cy="50" r="14" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4"/>
  </svg>
);

/* ─── REVEAL ON SCROLL ──────────────────────────────────────────────────── */
const Reveal = ({ children, delay=0, style={} }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){setVis(true);obs.disconnect();} }, { threshold:.12 });
    if(ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={vis ? "fade-up" : ""} style={{ opacity:vis?undefined:0, animationDelay:`${delay}s`, ...style }}>
      {children}
    </div>
  );
};

/* ─── AI ASSISTANT ──────────────────────────────────────────────────────── */
const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { role:"ai", text:"Bonjour ! Je suis l'assistant IA de SEAD CONSEIL. Comment puis-je vous aider sur vos campagnes ?" }
  ]);
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior:"smooth" }); }, [msgs, typing]);

  const send = async () => {
    if (!input.trim() || typing) return;
    const msg = input; setInput("");
    setMsgs(p => [...p, { role:"user", text:msg }]); setTyping(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:"Tu es l'assistant expert de SEAD CONSEIL, fondée par Baba Touré. Professionnel, visionnaire, axé sur le profit. Spécialiste Google Ads, Meta Ads, Creative Strategy. Encourage l'audit gratuit. Réponds en français, 2-3 phrases max.",
          messages:[{ role:"user", content:msg }] })
      });
      const d = await r.json();
      setMsgs(p => [...p, { role:"ai", text: d.content?.[0]?.text || "Réessayez ?" }]);
    } catch { setMsgs(p => [...p, { role:"ai", text:"Saturation temporaire. Baba Touré vous répond sous peu !" }]); }
    finally { setTyping(false); }
  };

  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:200 }}>
      {open ? (
        <div className="slide-up glass" style={{ width:356, height:500, borderRadius:"2.5rem", boxShadow:"0 32px 80px rgba(0,0,0,.18)", display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ background:"#0f172a", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", color:"white" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ padding:8, background:"#2563eb", borderRadius:"50%", display:"flex" }}><Bot size={18}/></div>
              <div>
                <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:".2em" }}>Assistant Stratégique ✨</p>
                <p style={{ fontFamily:"var(--font-body)", fontSize:9, color:"#60a5fa", fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", marginTop:3 }}>SEAD AI Core</p>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{ background:"none", border:"none", color:"white", cursor:"pointer", padding:6, borderRadius:8, transition:"background .2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.1)"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <X size={18}/>
            </button>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:12, background:"#f8fafc" }}>
            {msgs.map((m,i) => (
              <div key={i} className="fade-in" style={{ display:"flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
                <div className={m.role==="user"?"chat-bubble-user":"chat-bubble-ai"} style={{ maxWidth:"85%", padding:"12px 16px", fontFamily:"var(--font-body)", fontSize:12, fontWeight:500, lineHeight:1.65 }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display:"flex", justifyContent:"flex-start" }}>
                <div className="chat-bubble-ai" style={{ padding:"14px 18px", display:"flex", gap:4, alignItems:"center" }}>
                  {[0,.2,.4].map((d,i) => <div key={i} style={{ width:6,height:6,background:"#2563eb",borderRadius:"50%",animation:`bounce 1s infinite ${d}s`}}/>)}
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>
          <div style={{ padding:14, background:"white", borderTop:"1px solid #f1f5f9", display:"flex", gap:8 }}>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder="Question stratégique..."
              style={{ flex:1, padding:"11px 16px", background:"#f8fafc", border:"1.5px solid #f1f5f9", borderRadius:12, outline:"none", fontFamily:"var(--font-body)", fontSize:12, fontWeight:700, transition:"border-color .2s,box-shadow .2s" }}
              onFocus={e=>{e.target.style.borderColor="#93c5fd";e.target.style.boxShadow="0 0 0 3px rgba(37,99,235,.08)";}}
              onBlur={e=>{e.target.style.borderColor="#f1f5f9";e.target.style.boxShadow="none";}}
            />
            <button onClick={send} style={{ padding:11, background:"#2563eb", color:"white", border:"none", borderRadius:12, cursor:"pointer", display:"flex", transition:"background .2s,transform .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#1d4ed8";e.currentTarget.style.transform="scale(1.06)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#2563eb";e.currentTarget.style.transform="scale(1)";}}>
              <Send size={14}/>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={()=>setOpen(true)} style={{ background:"#2563eb", color:"white", padding:18, borderRadius:"50%", border:"none", boxShadow:"0 8px 32px rgba(37,99,235,.45)", cursor:"pointer", display:"flex", animation:"glow 3s ease-in-out infinite", transition:"transform .25s,background .25s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="#0f172a";e.currentTarget.style.transform="scale(1.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="#2563eb";e.currentTarget.style.transform="scale(1)";}}>
          <Bot size={26}/>
        </button>
      )}
    </div>
  );
};

/* ─── NAVBAR ────────────────────────────────────────────────────────────── */
const Navbar = ({ page, go, scrolled }) => (
  <nav style={{ position:"fixed", top:40, width:"100%", zIndex:50, transition:"all .4s cubic-bezier(.16,1,.3,1)",
    ...(scrolled ? { background:"rgba(255,255,255,.92)", backdropFilter:"blur(24px) saturate(180%)", padding:"12px 0", boxShadow:"0 4px 24px rgba(0,0,0,.07)", borderBottom:"1px solid rgba(241,245,249,.8)" }
                 : { background:"transparent", padding:"20px 0" }) }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div className="logo-wrap" style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer" }} onClick={()=>go("home")}>
        <Logo size={40}/>
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:900, letterSpacing:"-.04em", color:"#1d4ed8", fontStyle:"italic", textTransform:"uppercase", lineHeight:1 }}>SEAD <span style={{ color:"var(--dark)", fontWeight:300 }}>CONSEIL</span></div>
          <div style={{ fontFamily:"var(--font-body)", fontSize:7, fontWeight:900, textTransform:"uppercase", letterSpacing:".2em", color:"#2563eb", marginTop:3 }}>IA-Boosted • Expert-Driven</div>
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:28 }}>
        {[["expertises","Expertises"],["crea","Direction Créa"],["about","Qui sommes-nous"]].map(([id,label]) => (
          <button key={id} onClick={()=>go(id)} className={`nav-link ${page===id?"active":""}`}>{label}</button>
        ))}
        <button className="btn-audit" onClick={()=>go("audit")}>Lancer l'audit ✨</button>
      </div>
    </div>
  </nav>
);

/* ─── HOME ──────────────────────────────────────────────────────────────── */
const Home = ({ go }) => {
  const tickers = ["Google Ads","Meta Ads","TikTok Ads","Snapchat Ads","Direction Créa","ROAS","CPA","UGC","Creative Strategy","Performance Max"];
  return (
    <div>
      <section style={{ position:"relative", paddingTop:240, paddingBottom:160, overflow:"hidden" }}>
        <div className="orb" style={{ top:"-8%", right:"-4%", width:680, height:680, background:"#dbeafe" }}/>
        <div className="orb" style={{ bottom:"15%", left:"-8%", width:380, height:380, background:"#e0f2fe", animationDelay:"4.5s" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:2 }}>
          <div className="badge fade-up" style={{ marginBottom:44 }}>
            <Award size={13} style={{ color:"#60a5fa" }}/><span>Expert Formateur Certifié Google Ads</span>
          </div>
          <h1 className="display-title fade-up d1" style={{ fontSize:"clamp(46px,8vw,104px)", marginBottom:36 }}>
            L'IA traite la donnée.<br/><span style={{ color:"#2563eb" }}>Nous pilotons le profit.</span>
          </h1>
          <p className="fade-up d2" style={{ fontFamily:"var(--font-body)", fontSize:"clamp(16px,1.8vw,21px)", color:"#64748b", maxWidth:660, marginBottom:56, lineHeight:1.55, fontStyle:"italic" }}>
            SEAD CONSEIL transforme l'acquisition complexe en résultats clairs. Nous utilisons l'IA pour la vitesse, mais c'est notre vision métier qui protège votre rentabilité.
          </p>
          <div className="fade-up d3" style={{ display:"flex", alignItems:"center", gap:32, flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={()=>go("audit")}>
              Audit Stratégique ✨ <ArrowRight size={20} className="arrow"/>
            </button>
            <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".2em", color:"#94a3b8", fontStyle:"italic" }}>Analyse IA instantanée disponible</p>
          </div>
        </div>
      </section>
      <div style={{ background:"#0f172a", padding:"18px 0", overflow:"hidden", borderTop:"1px solid rgba(255,255,255,.04)", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...tickers,...tickers].map((t,i) => (
              <span key={i} style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:".25em", color:i%3===0?"#60a5fa":"#475569", display:"flex", alignItems:"center", gap:24 }}>
                {t} <span style={{ color:"#334155" }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── EXPERTISES ────────────────────────────────────────────────────────── */
const Expertises = () => (
  <div style={{ paddingTop:128, paddingBottom:128 }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
      <Reveal>
        <h2 className="display-title" style={{ fontSize:"clamp(46px,8vw,96px)", marginBottom:88 }}>
          Nos <span style={{ color:"#2563eb" }}>Expertises.</span>
        </h2>
      </Reveal>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {[
          { Icon:Search, title:"Audit & Stratégie", desc:"Diagnostic chirurgical de vos comptes Google et Meta pour identifier les fuites de budget et maximiser le ROAS." },
          { Icon:Target, title:"Pilotage Ads", desc:"Gestion haute performance multi-leviers pilotée par le profit réel, non par les vanity metrics." },
          { Icon:Sparkles, title:"Direction Créa", desc:"Conception de scripts UGC et d'assets visuels basés sur la psychologie publicitaire et les données comportementales." }
        ].map((c,i) => (
          <Reveal key={i} delay={i*.12}>
            <div className="card-hover glass" style={{ padding:48, borderRadius:"3rem", border:"1px solid rgba(241,245,249,.8)", height:"100%" }}>
              <div className="exp-icon" style={{ marginBottom:28 }}><c.Icon size={30} style={{ color:"#2563eb" }}/></div>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:21, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", marginBottom:12, letterSpacing:"-.02em", lineHeight:1 }}>{c.title}</h3>
              <p style={{ fontFamily:"var(--font-body)", color:"#64748b", lineHeight:1.75, fontStyle:"italic", fontSize:14 }}>{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </div>
);

/* ─── DIRECTION CREA ────────────────────────────────────────────────────── */
const DirectionCrea = () => {
  const [input, setInput] = useState("");
  const [ideas, setIdeas] = useState(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:`Tu es Baba Touré, Directeur de Création Social Ads ROIstes. Réponds UNIQUEMENT en JSON valide, sans markdown, sans backticks. Format: [{"title":"...","hook":"...","script":"..."}]`,
          messages:[{ role:"user", content:`Génère 3 angles publicitaires UGC ultra-percutants pour: ${input}. Maximise le clic.` }] })
      });
      const d = await r.json();
      setIdeas(JSON.parse((d.content?.[0]?.text||"[]").replace(/```json|```/g,"").trim()));
    } catch { setIdeas([{title:"Erreur",hook:"Réessayez",script:"Service temporairement surchargé."}]); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ paddingTop:128, paddingBottom:128 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:88, alignItems:"start" }}>
          <div>
            <Reveal>
              <h2 className="display-title" style={{ fontSize:"clamp(38px,5vw,78px)", marginBottom:36 }}>
                L'IA génère.<br/><span style={{ color:"#2563eb" }}>Nous pensons.</span>
              </h2>
            </Reveal>
            <Reveal delay={.1}>
              <p style={{ fontFamily:"var(--font-body)", fontSize:17, color:"#64748b", marginBottom:36, lineHeight:1.55, fontStyle:"italic" }}>
                La créa est le nouveau ciblage. Testez notre labo créatif IA ci-dessous.
              </p>
            </Reveal>
            <Reveal delay={.2}>
              <div style={{ padding:28, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:"2.5rem", boxShadow:"0 4px 24px rgba(37,99,235,.08)" }}>
                <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:".2em", color:"#2563eb", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                  <Wand2 size={13}/> Laboratoire Créatif ✨
                </p>
                <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Décrivez votre produit/offre ici..." className="field" style={{ resize:"vertical", minHeight:96, marginBottom:12, fontFamily:"var(--font-body)" }}/>
                <button className="btn-blue" onClick={generate} disabled={loading||!input}>
                  {loading ? <><Loader2 size={14} style={{ animation:"spin 1s linear infinite" }}/> Analyse en cours...</>
                           : <><Zap size={14}/> Générer 3 Concepts Créa ✨</>}
                </button>
              </div>
            </Reveal>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16, paddingTop:8 }}>
            {ideas ? ideas.map((idea,i) => (
              <div key={i} className="idea-card" style={{ animationDelay:`${i*.1}s` }}>
                <h4 style={{ fontFamily:"var(--font-body)", color:"#2563eb", fontWeight:900, fontStyle:"italic", textTransform:"uppercase", fontSize:10, letterSpacing:".12em", marginBottom:8 }}>{idea.title}</h4>
                <p style={{ fontFamily:"var(--font-display)", color:"#0f172a", fontWeight:700, fontSize:15, marginBottom:8, fontStyle:"italic" }}>"{idea.hook}"</p>
                <p style={{ fontFamily:"var(--font-body)", color:"#64748b", fontSize:12, lineHeight:1.75, fontStyle:"italic" }}>{idea.script}</p>
              </div>
            )) : (
              <Reveal delay={.15}>
                <div style={{ background:"#0f172a", borderRadius:"3.5rem", aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:"0 28px 64px rgba(15,23,42,.35)" }}>
                  <Cpu size={270} style={{ position:"absolute", bottom:-55, right:-55, color:"rgba(255,255,255,.03)" }}/>
                  <p style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", color:"white", textAlign:"center", lineHeight:1.1, letterSpacing:"-.03em", position:"relative", zIndex:1 }}>
                    Prêt pour le<br/>brainstorming IA ?
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── AUDIT ─────────────────────────────────────────────────────────────── */
const Audit = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ maturity:"", companyName:"", contactName:"", website:"", budget:"", email:"" });
  const [done, setDone] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [gen, setGen] = useState(false);

  const genAnalysis = async () => {
    setGen(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          system:"Tu es Baba Touré, expert SEA fondateur de SEAD CONSEIL. Ton est visionnaire, direct, rassurant. Réponds en 2-3 phrases max en français.",
          messages:[{ role:"user", content:`Analyse pour: Société ${form.companyName}, Maturité: ${form.maturity}, Budget: ${form.budget}, Site: ${form.website}. Conseil brillant + précise que tu approfondis personnellement.` }] })
      });
      const d = await r.json();
      setAnalysis(d.content?.[0]?.text || "Diagnostic personnalisé en préparation...");
    } catch { setAnalysis("Erreur technique. Baba revient vers vous sous 24h avec votre audit complet !"); }
    finally { setGen(false); }
  };

  const finish = () => { setDone(true); genAnalysis(); };
  const reset  = () => { setDone(false); setStep(1); setForm({maturity:"",companyName:"",contactName:"",website:"",budget:"",email:""}); setAnalysis(""); };

  if (done) return (
    <div style={{ paddingTop:200, paddingBottom:128, display:"flex", justifyContent:"center", background:"#f8fafc", minHeight:"100vh" }}>
      <div className="scale-in glass" style={{ maxWidth:480, width:"100%", borderRadius:"3.5rem", padding:"56px 52px", textAlign:"center", boxShadow:"0 40px 80px rgba(0,0,0,.1)" }}>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:28 }}><Logo size={58}/></div>
        <h2 className="display-title" style={{ fontSize:34, marginBottom:10 }}>Diagnostic Transmis.</h2>
        <div style={{ margin:"32px 0", padding:"26px 30px", background:"#eff6ff", borderRadius:"2.5rem", border:"1px solid #bfdbfe", textAlign:"left" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <Sparkles size={13} style={{ color:"#2563eb" }}/>
            <span style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:".2em", color:"#2563eb" }}>Flash Audit IA ✨</span>
          </div>
          {gen ? (
            <div style={{ display:"flex", alignItems:"center", gap:10, color:"#64748b", fontStyle:"italic", fontSize:13, fontFamily:"var(--font-body)", padding:"10px 0" }}>
              <Loader2 size={14} style={{ animation:"spin 1s linear infinite" }}/> Calcul des opportunités de profit...
            </div>
          ) : (
            <p style={{ fontFamily:"var(--font-body)", color:"#334155", fontStyle:"italic", fontSize:14, lineHeight:1.75, fontWeight:500 }}>"{analysis}"</p>
          )}
        </div>
        <p style={{ fontFamily:"var(--font-body)", color:"#94a3b8", marginBottom:32, fontWeight:700, fontStyle:"italic", fontSize:10, textTransform:"uppercase", letterSpacing:".2em" }}>Baba Touré étudie votre dossier personnellement.</p>
        <button className="btn-primary" onClick={reset} style={{ margin:"0 auto" }}>Retour</button>
      </div>
    </div>
  );

  return (
    <section style={{ paddingTop:180, paddingBottom:128, background:"rgba(248,250,252,.6)", backdropFilter:"blur(12px)", minHeight:"100vh" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <h1 className="display-title fade-up" style={{ fontSize:"clamp(46px,6vw,78px)", marginBottom:24 }}>
            Lancer <span style={{ color:"#2563eb" }}>L'Audit.</span>
          </h1>
          {/* Progress bar */}
          <div style={{ maxWidth:280, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ width:34, height:34, borderRadius:"50%", border:"2px solid", borderColor:step>=n?"#2563eb":"#e2e8f0", background:step>=n?"#2563eb":"white", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-body)", fontSize:12, fontWeight:900, color:step>=n?"white":"#94a3b8", transition:"all .35s cubic-bezier(.16,1,.3,1)" }}>
                  {step>n ? "✓" : n}
                </div>
              ))}
            </div>
            <div style={{ height:3, background:"#f1f5f9", borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", background:"#2563eb", borderRadius:3, width:`${(step/3)*100}%`, transition:"width .55s cubic-bezier(.16,1,.3,1)" }}/>
            </div>
          </div>
        </div>

        <div className="glass scale-in" style={{ padding:"52px 60px", borderRadius:"3.5rem", boxShadow:"0 24px 64px rgba(0,0,0,.07)", border:"1px solid rgba(255,255,255,.7)" }}>
          {step===1 && (
            <div className="fade-up">
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", marginBottom:28, letterSpacing:"-.03em" }}>Maturité de votre projet ?</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {["Lancement","Croissance","Consolidation","Redressement"].map(l => (
                  <button key={l} className="maturity-btn" onClick={()=>{ setForm({...form,maturity:l}); setStep(2); }}>
                    <span style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:900, textTransform:"uppercase", fontStyle:"italic", letterSpacing:"-.02em" }}>{l}</span>
                    <ChevronRight size={17} className="chevron"/>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step===2 && (
            <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", textAlign:"center", letterSpacing:"-.03em" }}>Coordonnées</h3>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <input className="field" type="text" placeholder="Société"    value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})}/>
                <input className="field" type="text" placeholder="Prénom Nom" value={form.contactName} onChange={e=>setForm({...form,contactName:e.target.value})}/>
              </div>
              <input className="field" type="url" placeholder="https://votre-site.com" value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/>
              <div style={{ display:"flex", gap:12, marginTop:4 }}>
                <button onClick={()=>setStep(1)} style={{ padding:"17px 28px", background:"#f1f5f9", border:"none", borderRadius:14, fontFamily:"var(--font-body)", fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:".15em", cursor:"pointer", transition:"background .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#e2e8f0"} onMouseLeave={e=>e.currentTarget.style.background="#f1f5f9"}>Retour</button>
                <button onClick={()=>setStep(3)} disabled={!form.companyName||!form.contactName||!form.website}
                  style={{ flex:1, padding:"17px 28px", background:(!form.companyName||!form.contactName||!form.website)?"#94a3b8":"#0f172a", color:"white", border:"none", borderRadius:14, fontFamily:"var(--font-body)", fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:".15em", cursor:"pointer", transition:"background .3s" }}>
                  Continuer
                </button>
              </div>
            </div>
          )}
          {step===3 && (
            <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", textAlign:"center", letterSpacing:"-.03em" }}>Investissement</h3>
              <select className="field" style={{ cursor:"pointer" }} value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}>
                <option value="">Sélectionnez une fourchette</option>
                <option value="10k-50k">10k€ — 50k€ / mois</option>
                <option value="50k-100k">50k€ — 100k€ / mois</option>
                <option value="100k+">+100k€ / mois</option>
              </select>
              <input className="field" type="email" placeholder="Email pro" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              <button onClick={finish} disabled={!form.email||!form.budget} className="btn-blue"
                style={{ padding:"21px", fontSize:15, fontStyle:"italic", letterSpacing:"-.01em", marginTop:6, borderRadius:18 }}>
                Valider mon Audit IA ✨
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

/* ─── ABOUT ─────────────────────────────────────────────────────────────── */
const AboutUs = () => (
  <div style={{ paddingTop:128, paddingBottom:128 }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"center" }}>
        <div>
          <Reveal><p style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:".3em", color:"#2563eb", marginBottom:22, fontStyle:"italic" }}>Qui sommes-nous</p></Reveal>
          <Reveal delay={.1}><h2 className="display-title" style={{ fontSize:"clamp(38px,5.5vw,78px)", marginBottom:32 }}>L'autorité par<br/><span style={{ color:"#2563eb" }}>l'expérience.</span></h2></Reveal>
          <Reveal delay={.2}>
            <blockquote style={{ fontFamily:"var(--font-body)", fontSize:16, color:"#475569", lineHeight:1.75, fontStyle:"italic", borderLeft:"4px solid #2563eb", paddingLeft:28, margin:"0 0 26px 0" }}>
              "SEAD CONSEIL n'est pas une agence d'exécution. C'est le carrefour où la puissance de l'IA rencontre l'intuition stratégique."
            </blockquote>
          </Reveal>
          <Reveal delay={.3}>
            <p style={{ fontFamily:"var(--font-body)", color:"#64748b", lineHeight:1.8, fontStyle:"italic", fontSize:15 }}>
              Fondée par Baba Touré, expert certifié Google Ads et formateur reconnu, SEAD CONSEIL opère depuis Paris, Dublin et Dakar pour des clients qui exigent des résultats réels.
            </p>
          </Reveal>
        </div>
        <Reveal delay={.15}>
          <div style={{ background:"#0f172a", borderRadius:"4rem", aspectRatio:"4/5", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:"0 32px 80px rgba(15,23,42,.35)" }}>
            <div style={{ position:"absolute", fontSize:70, fontWeight:900, color:"rgba(255,255,255,.025)", transform:"rotate(-90deg)", userSelect:"none", whiteSpace:"nowrap", fontFamily:"var(--font-display)", fontStyle:"italic" }}>BABA TOURE</div>
            <div style={{ animation:"float 6s ease-in-out infinite" }}><Logo size={176} pulse={false}/></div>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
);

/* ─── FOOTER ────────────────────────────────────────────────────────────── */
const Footer = ({ go }) => (
  <footer style={{ paddingTop:88, paddingBottom:44, background:"rgba(255,255,255,.9)", backdropFilter:"blur(16px)", borderTop:"1px solid #f1f5f9" }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"5fr 2fr 2fr 2fr", gap:48, marginBottom:56 }}>
        <div>
          <div className="logo-wrap" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, cursor:"pointer" }} onClick={()=>go("home")}>
            <Logo size={42} pulse={false}/>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:19, fontWeight:900, letterSpacing:"-.04em", color:"#1d4ed8", fontStyle:"italic", textTransform:"uppercase", lineHeight:1 }}>SEAD CONSEIL</div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:7, fontWeight:900, textTransform:"uppercase", letterSpacing:".2em", color:"#94a3b8", fontStyle:"italic", marginTop:4 }}>IA-Boosted • Expert-Driven</div>
            </div>
          </div>
          <p style={{ fontFamily:"var(--font-body)", color:"#64748b", fontStyle:"italic", fontSize:13, lineHeight:1.8, maxWidth:272 }}>
            L'agence conseil en acquisition qui transforme vos budgets en profit réel. Piloté depuis Paris, Dublin et Dakar.
          </p>
        </div>
        {[
          { title:"Implantations", items:["Paris (QG)","Dublin (Hub)","Dakar (Hub)"], pages:null },
          { title:"Plan", items:["Expertises","Direction Créa","Audit"], pages:["expertises","crea","audit"] },
          { title:"Contact", items:["hello@seadconseil.fr","@babatoure"], pages:null }
        ].map((col,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:".2em", color:"#2563eb", fontStyle:"italic" }}>{col.title}</p>
            {col.items.map((item,j) => (
              <p key={j} onClick={col.pages ? ()=>go(col.pages[j]) : undefined}
                style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".15em", color:"#94a3b8", cursor:col.pages?"pointer":"default", fontStyle:"italic", transition:"color .2s" }}
                onMouseEnter={e=>{if(col.pages)e.currentTarget.style.color="#2563eb";}}
                onMouseLeave={e=>{e.currentTarget.style.color="#94a3b8";}}>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ paddingTop:24, borderTop:"1px solid #f8fafc", textAlign:"center", fontFamily:"var(--font-body)", fontSize:8, fontWeight:900, color:"#cbd5e1", textTransform:"uppercase", letterSpacing:".35em" }}>
        © 2024 SEAD CONSEIL • IA-BOOSTED • EXPERT-DRIVEN
      </div>
    </div>
  </footer>
);

/* ─── APP ───────────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = id => { setPage(id); window.scrollTo({ top:0, behavior:"smooth" }); };
  const pages = { home:Home, expertises:Expertises, crea:DirectionCrea, about:AboutUs, audit:Audit };
  const Page = pages[page] || Home;

  return (
    <>
      <GlobalStyles/>
      <div style={{ minHeight:"100vh", background:"white", overflowX:"hidden" }}>
        {/* Top bar */}
        <div style={{ background:"rgba(15,23,42,.97)", backdropFilter:"blur(12px)", color:"#64748b", padding:"11px 32px", fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:".2em", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:60, borderBottom:"1px solid rgba(255,255,255,.04)" }}>
          <div style={{ display:"flex", alignItems:"center", gap:26 }}>
            {[["PARIS (QG)",true],["DUBLIN",false],["DAKAR",false]].map(([c,a]) => (
              <span key={c} style={{ display:"flex", alignItems:"center", gap:7, color:a?"white":"inherit", transition:"color .2s" }}>
                <MapPin size={10} style={{ color:a?"#3b82f6":"#475569", fill:a?"rgba(59,130,246,.18)":"none" }}/>{c}
              </span>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, fontStyle:"italic" }}>
            <Globe size={10} style={{ color:"#3b82f6", animation:"pulse 2s infinite" }}/> IA-Boosted • Expert-Driven
          </div>
        </div>

        <Navbar page={page} go={go} scrolled={scrolled}/>
        <AIAssistant/>

        <main style={{ position:"relative", zIndex:10 }}>
          <Page go={go} setCurrentPage={setPage}/>
        </main>

        <Footer go={go}/>
      </div>
    </>
  );
}
