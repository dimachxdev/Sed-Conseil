import { useState, useEffect, useRef } from "react";
import { Target, Search, Sparkles, Award, ArrowRight, Globe, MapPin, ChevronRight, Cpu, Zap, Wand2, Loader2, Send, Bot, X, Video, PenTool, PanelsTopLeft } from "lucide-react";

/* ─── GLOBAL STYLES ─────────────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,800;0,900;1,400;1,500;1,800;1,900&family=Inter:wght@400;500;600&display=swap');
    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    :root {
      --blue-ia:#3B82F6; --blue-night:#0F172A; --gray-secondary:#64748B;
      --bg-white:#FFFFFF; --bg-soft:#F8FAFC;
      --border:#f1f5f9;
      --font-display:'Noto Sans',system-ui,-apple-system,sans-serif;
      --font-body:'Inter',system-ui,-apple-system,sans-serif;
    }
    html { scroll-behavior:smooth; }
    body { 
      font-family:var(--font-body); 
      font-weight:400; 
      line-height:1.6; 
      background:var(--bg-white); 
      color:var(--blue-night); 
      overflow-x:hidden; 
      -webkit-font-smoothing:antialiased; 
      position:relative;
    }
    body::before {
      content:'GOOGLE ADS META ADS LINKEDIN ADS TIKTOK ADS';
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      font-family:var(--font-display);
      font-weight:900;
      font-size:clamp(120px,15vw,240px);
      color:var(--blue-night);
      opacity:0.03;
      white-space:nowrap;
      overflow:hidden;
      pointer-events:none;
      z-index:0;
      transform:rotate(-45deg);
      transform-origin:center;
      letter-spacing:0.1em;
      text-transform:uppercase;
    }
    ::selection { background:rgba(59,130,246,0.2); color:var(--blue-night); }

    @keyframes fadeUp   { from{opacity:0;transform:translateY(28px);}  to{opacity:1;transform:translateY(0);} }
    @keyframes fadeIn   { from{opacity:0;}                              to{opacity:1;} }
    @keyframes scaleIn  { from{opacity:0;transform:scale(.95);}         to{opacity:1;transform:scale(1);} }
    @keyframes slideUp  { from{transform:translateY(80px);opacity:0;}   to{transform:translateY(0);opacity:1;} }
    @keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:.4;} }
    @keyframes spin     { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
    @keyframes bounce   { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-5px);} }
    @keyframes glow     { 0%,100%{box-shadow:0 0 20px rgba(59,130,246,.3);} 50%{box-shadow:0 0 44px rgba(59,130,246,.6);} }
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
    .card-hover:hover { transform:translateY(-7px) scale(1.015); box-shadow:0 28px 64px rgba(59,130,246,.15); border-color:rgba(59,130,246,.3) !important; }
    .card-hover:hover .exp-icon { transform:rotate(12deg) scale(1.15) !important; }

    .nav-link { position:relative; background:none; border:none; font-family:var(--font-body); font-size:11px; font-weight:900; text-transform:uppercase; letter-spacing:0.25em; cursor:pointer; color:var(--gray-secondary); padding-bottom:4px; transition:color .25s; }
    .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; background:var(--blue-ia); transition:width .3s cubic-bezier(.16,1,.3,1); border-radius:2px; }
    .nav-link:hover,.nav-link.active { color:var(--blue-ia); }
    .nav-link:hover::after,.nav-link.active::after { width:100%; }

    .btn-primary { display:inline-flex; align-items:center; gap:12px; padding:22px 44px; border-radius:3rem; background:var(--blue-night); color:white; font-family:var(--font-body); font-size:15px; font-weight:900; border:none; cursor:pointer; box-shadow:0 8px 32px rgba(15,23,42,.15); transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,background .3s; position:relative; overflow:hidden; }
    .btn-primary::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,.08) 0%,transparent 60%); pointer-events:none; }
    .btn-primary:hover { background:var(--blue-ia); transform:translateY(-3px) scale(1.02); box-shadow:0 18px 50px rgba(59,130,246,.35); }
    .btn-primary:active { transform:scale(.97); }
    .btn-primary .arrow { transition:transform .3s cubic-bezier(.16,1,.3,1); }
    .btn-primary:hover .arrow { transform:translateX(7px); }

    .btn-blue { width:100%; padding:18px; border-radius:3rem; background:var(--blue-ia); color:white; border:none; font-family:var(--font-body); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.25em; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:transform .25s,box-shadow .25s,background .25s; box-shadow:0 4px 20px rgba(59,130,246,.25); }
    .btn-blue:hover:not(:disabled) { background:#2563eb; transform:translateY(-2px); box-shadow:0 10px 36px rgba(59,130,246,.4); }
    .btn-blue:disabled { opacity:.5; cursor:not-allowed; }

    .btn-audit { background:var(--blue-ia); color:white; padding:13px 22px; border-radius:3rem; font-family:var(--font-body); font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.25em; border:none; cursor:pointer; transition:transform .25s,box-shadow .25s,background .25s; box-shadow:0 4px 16px rgba(59,130,246,.25); }
    .btn-audit:hover { background:var(--blue-night); transform:translateY(-2px); box-shadow:0 8px 24px rgba(15,23,42,.2); }

    .field { width:100%; padding:20px 24px; background:var(--bg-soft); border-radius:3rem; border:2px solid #f1f5f9; outline:none; font-family:var(--font-body); font-weight:500; font-size:14px; color:var(--blue-night); transition:border-color .25s,box-shadow .25s,background .25s; line-height:1.6; }
    .field:focus { border-color:var(--blue-ia); background:var(--bg-white); box-shadow:0 0 0 4px rgba(59,130,246,.1); }
    .field::placeholder { color:var(--gray-secondary); font-weight:400; }

    .glass { background:rgba(255,255,255,.92); backdrop-filter:blur(24px) saturate(180%); -webkit-backdrop-filter:blur(24px) saturate(180%); border:1px solid rgba(255,255,255,.7); box-shadow:0 8px 32px rgba(0,0,0,.06); }

    .maturity-btn { padding:36px 40px; border:2px solid #f1f5f9; border-radius:3rem; background:var(--bg-white); cursor:pointer; display:flex; align-items:center; justify-content:space-between; transition:border-color .25s,background .25s,transform .3s cubic-bezier(.16,1,.3,1),box-shadow .25s; }
    .maturity-btn:hover { border-color:var(--blue-ia); background:var(--bg-soft); transform:translateX(5px); box-shadow:0 8px 28px rgba(59,130,246,.12); }
    .maturity-btn:hover .chevron { color:var(--blue-ia) !important; transform:translateX(5px) !important; }
    .chevron { color:#bfdbfe; transition:color .25s,transform .3s; }

    .idea-card { padding:24px; background:var(--bg-white); border:1px solid #f1f5f9; border-radius:3rem; box-shadow:0 4px 20px rgba(0,0,0,.05); transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s; animation:scaleIn .4s cubic-bezier(.16,1,.3,1) both; }
    .idea-card:hover { transform:translateY(-5px); box-shadow:0 14px 44px rgba(59,130,246,.15); }

    .chat-bubble-ai   { background:var(--bg-white); color:var(--blue-night); border:1px solid #f1f5f9; border-radius:3rem 3rem 3rem 0.5rem; box-shadow:0 2px 12px rgba(0,0,0,.05); }
    .chat-bubble-user { background:var(--blue-ia); color:white; border-radius:3rem 3rem 0.5rem 3rem; }

    .display-title { font-family:var(--font-display); font-weight:800; font-style:italic; text-transform:uppercase; letter-spacing:-0.02em; line-height:1.1; color:var(--blue-night); }

    .badge { display:inline-flex; align-items:center; gap:10px; background:var(--blue-night); color:white; padding:10px 20px; border-radius:3rem; font-size:10px; font-weight:900; text-transform:uppercase; letter-spacing:0.25em; box-shadow:0 8px 24px rgba(15,23,42,.2); position:relative; overflow:hidden; font-family:var(--font-body); }
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

    /* ─── HAMBURGER MENU ─── */
    .hamburger { display:none; background:none; border:none; cursor:pointer; padding:8px; z-index:100; }
    .hamburger span { display:block; width:22px; height:2px; background:var(--blue-night); margin:5px 0; border-radius:2px; transition:all .3s cubic-bezier(.16,1,.3,1); }
    .hamburger.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
    .hamburger.open span:nth-child(2) { opacity:0; }
    .hamburger.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }

    .mobile-nav-overlay { 
      position:fixed; top:0; left:0; right:0; bottom:0; z-index:999;
      background:var(--blue-night); 
      display:flex; flex-direction:column; align-items:center; justify-content:center; gap:32px;
      opacity:0; pointer-events:none; transition:opacity .35s ease;
    }
    .mobile-nav-overlay.open { opacity:1; pointer-events:all; }
    .mobile-nav-overlay .nav-link { font-size:14px !important; letter-spacing:0.3em !important; color:rgba(255,255,255,.6) !important; }
    .mobile-nav-overlay .nav-link:hover, .mobile-nav-overlay .nav-link.active { color:var(--blue-ia) !important; }
    .mobile-nav-overlay .nav-link::after { background:var(--blue-ia) !important; }
    .mobile-nav-overlay .mobile-close-btn { position:absolute; top:24px; right:24px; background:none; border:none; color:white; cursor:pointer; padding:8px; }

    /* ─── TOP BAR RESPONSIVE ─── */
    .top-bar-locations { display:flex; align-items:center; gap:26px; }
    .top-bar-tagline { display:flex; align-items:center; gap:8px; font-style:italic; }

    /* ─── TABLET (769px — 1024px) ─── */
    @media (max-width: 1024px) {
      .founder-section { grid-template-columns: 1fr !important; gap: 56px !important; padding: 48px 40px !important; }
      .expertises-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .blog-featured { grid-template-columns: 1fr !important; }
      .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .crea-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
      .about-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
      .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr !important; gap: 32px !important; }
      .home-expertises-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .expertise-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
      .crea-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .founder-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
    }

    /* ─── MOBILE (≤768px) ─── */
    @media (max-width: 768px) {
      .hamburger { display:block; }
      .desktop-nav { display:none !important; }

      .top-bar-locations { gap:14px !important; }
      .top-bar-locations span { font-size:8px !important; }
      .top-bar-tagline { font-size:8px !important; }

      nav { padding: 12px 0 !important; }

      .founder-section { grid-template-columns: 1fr !important; gap: 36px !important; padding: 32px 24px !important; }
      .expertises-grid { grid-template-columns: 1fr !important; }
      .expertises-grid .glass { padding: 28px 24px !important; border-radius: 2rem !important; }
      .blog-featured { grid-template-columns: 1fr !important; }
      .blog-featured-visual { min-height: 220px !important; }
      .blog-grid { grid-template-columns: 1fr !important; }
      .crea-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
      .about-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
      .home-expertises-grid { grid-template-columns: 1fr !important; }
      .home-expertises-grid .glass { padding: 28px 24px !important; border-radius: 2rem !important; }
      .card-hover.glass { padding: 28px 24px !important; border-radius: 2rem !important; }
      .expertise-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
      .crea-cards-grid { grid-template-columns: 1fr !important; }
      .founder-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
      .final-cta-box { border-radius: 2rem !important; }
      .hero-cta-row { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
      .stats-row { grid-template-columns: 1fr 1fr !important; }
      .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; text-align:center; }
      .footer-grid > div { align-items:center !important; }

      .audit-form-grid { grid-template-columns: 1fr !important; }
      .maturity-grid { grid-template-columns: 1fr !important; }

      .btn-primary { padding:18px 32px !important; font-size:13px !important; }
      .btn-audit { padding:11px 18px !important; font-size:9px !important; }
      .maturity-btn { padding:24px 28px !important; }

      .section-padding-lg { padding-top:72px !important; padding-bottom:72px !important; }
      .section-padding-xl { padding-top:100px !important; padding-bottom:72px !important; }

      .cta-box { padding:48px 28px !important; border-radius:2.5rem !important; }
      .vision-box { padding:32px 28px !important; border-radius:2.5rem !important; }
      .audit-card { padding:36px 28px !important; border-radius:2.5rem !important; }

      .chat-widget { width:calc(100vw - 32px) !important; height:calc(100vh - 120px) !important; max-height:500px !important; right:16px !important; bottom:16px !important; border-radius:2rem !important; }

      .blog-cta-box { padding:56px 28px !important; border-radius:2.5rem !important; }
    }

    /* ─── SMALL MOBILE (≤480px) ─── */
    @media (max-width: 480px) {
      .top-bar-locations span:not(:first-child) { display:none; }
      .btn-primary { padding:16px 26px !important; font-size:12px !important; gap:8px !important; }
      .badge { font-size:8px !important; padding:8px 14px !important; gap:7px !important; }
    }
  `}</style>
);

/* ─── LOGO ──────────────────────────────────────────────────────────────── */
const Logo = ({ size=40, pulse=true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="logo-svg" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5L93.3 30V80L50 105L6.7 80V30L50 5Z" fill="white" stroke="currentColor" strokeWidth=".5"/>
    <path d="M50 20L30 35M50 50L25 50M50 80L35 65" stroke="var(--blue-ia)" strokeWidth="2.5" strokeLinecap="round" opacity=".6"/>
    <circle cx="28" cy="35" r="3" fill="var(--blue-ia)"/>
    <circle cx="22" cy="50" r="3" fill="var(--blue-ia)"/>
    <circle cx="33" cy="65" r="3" fill="var(--blue-ia)"/>
    <path d="M50 20V80M50 20L75 35V65L50 80" fill="var(--blue-night)"/>
    <path d="M55 40H70M55 50H65M55 60H70" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="50" cy="50" r="8" fill="var(--blue-ia)" style={pulse ? {animation:"pulse 2s infinite"} : {}}/>
    <circle cx="50" cy="50" r="14" stroke="var(--blue-ia)" strokeWidth="1" strokeDasharray="4 4"/>
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
        <div className="slide-up glass chat-widget" style={{ width:356, height:500, borderRadius:"3rem", boxShadow:"0 32px 80px rgba(0,0,0,.18)", display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ background:"var(--blue-night)", padding:"20px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", color:"white" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ padding:8, background:"var(--blue-ia)", borderRadius:"50%", display:"flex" }}><Bot size={18}/></div>
              <div>
                <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em" }}>Assistant Stratégique ✨</p>
                <p style={{ fontFamily:"var(--font-body)", fontSize:9, color:"var(--blue-ia)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.25em", marginTop:3 }}>SEAD AI Core</p>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} style={{ background:"none", border:"none", color:"white", cursor:"pointer", padding:6, borderRadius:8, transition:"background .2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.1)"} onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <X size={18}/>
            </button>
          </div>
          <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:12, background:"var(--bg-soft)" }}>
            {msgs.map((m,i) => (
              <div key={i} className="fade-in" style={{ display:"flex", justifyContent: m.role==="user"?"flex-end":"flex-start" }}>
                <div className={m.role==="user"?"chat-bubble-user":"chat-bubble-ai"} style={{ maxWidth:"85%", padding:"12px 16px", fontFamily:"var(--font-body)", fontSize:12, fontWeight:400, lineHeight:1.6 }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ display:"flex", justifyContent:"flex-start" }}>
                <div className="chat-bubble-ai" style={{ padding:"14px 18px", display:"flex", gap:4, alignItems:"center" }}>
                  {[0,.2,.4].map((d,i) => <div key={i} style={{ width:6,height:6,background:"var(--blue-ia)",borderRadius:"50%",animation:`bounce 1s infinite ${d}s`}}/>)}
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>
          <div style={{ padding:14, background:"var(--bg-white)", borderTop:"1px solid #f1f5f9", display:"flex", gap:8 }}>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder="Question stratégique..."
              style={{ flex:1, padding:"11px 16px", background:"var(--bg-soft)", border:"1.5px solid #f1f5f9", borderRadius:"3rem", outline:"none", fontFamily:"var(--font-body)", fontSize:12, fontWeight:400, transition:"border-color .2s,box-shadow .2s" }}
              onFocus={e=>{e.target.style.borderColor="var(--blue-ia)";e.target.style.boxShadow="0 0 0 3px rgba(59,130,246,.1)";}}
              onBlur={e=>{e.target.style.borderColor="#f1f5f9";e.target.style.boxShadow="none";}}
            />
            <button onClick={send} style={{ padding:11, background:"var(--blue-ia)", color:"white", border:"none", borderRadius:"3rem", cursor:"pointer", display:"flex", transition:"background .2s,transform .2s" }}
              onMouseEnter={e=>{e.currentTarget.style.background="#2563eb";e.currentTarget.style.transform="scale(1.06)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="var(--blue-ia)";e.currentTarget.style.transform="scale(1)";}}>
              <Send size={14}/>
            </button>
          </div>
        </div>
      ) : (
        <button onClick={()=>setOpen(true)} style={{ background:"var(--blue-ia)", color:"white", padding:18, borderRadius:"50%", border:"none", boxShadow:"0 8px 32px rgba(59,130,246,.4)", cursor:"pointer", display:"flex", animation:"glow 3s ease-in-out infinite", transition:"transform .25s,background .25s" }}
          onMouseEnter={e=>{e.currentTarget.style.background="var(--blue-night)";e.currentTarget.style.transform="scale(1.12)";}}
          onMouseLeave={e=>{e.currentTarget.style.background="var(--blue-ia)";e.currentTarget.style.transform="scale(1)";}}>
          <Bot size={26}/>
        </button>
      )}
    </div>
  );
};

/* ─── NAVBAR ────────────────────────────────────────────────────────────── */
const Navbar = ({ page, go, scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (id) => { go(id); setMenuOpen(false); };
  return (
    <>
    <nav style={{ 
      width:"100%", 
      transition:"all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
      ...(scrolled ? { 
        background:"rgba(255,255,255,.99)", 
        backdropFilter:"blur(32px) saturate(180%)",
        WebkitBackdropFilter:"blur(32px) saturate(180%)",
        padding:"14px 0", 
        boxShadow:"0 4px 24px rgba(0,0,0,.08), 0 0 0 1px rgba(0,0,0,.04)", 
        borderBottom:"1px solid rgba(241,245,249,.9)"
      } : { 
        background:"transparent", 
        padding:"20px 0",
        boxShadow:"none"
      }) 
    }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
      <div className="logo-wrap" style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer" }} onClick={()=>navigate("home")}>
        <Logo size={40}/>
        <div>
          <div style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:900, letterSpacing:"-0.02em", color:"var(--blue-ia)", fontStyle:"italic", textTransform:"uppercase", lineHeight:1 }}>SEAD <span style={{ color:"var(--blue-night)", fontWeight:900 }}>CONSEIL</span></div>
          <div style={{ fontFamily:"var(--font-body)", fontSize:7, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--blue-ia)", marginTop:3 }}>IA-BOOSTED • EXPERT-DRIVEN</div>
        </div>
      </div>
      <div className="desktop-nav" style={{ display:"flex", alignItems:"center", gap:28 }}>
        {[["expertises","Expertises"],["crea","Direction Créa"],["blog","Blog"],["about","Qui sommes-nous"]].map(([id,label]) => (
          <button key={id} onClick={()=>go(id)} className={`nav-link ${page===id?"active":""}`}>{label}</button>
        ))}
        <button className="btn-audit" onClick={()=>go("audit")}>Lancer l'audit ✨</button>
      </div>
      <button className={`hamburger ${menuOpen?"open":""}`} onClick={()=>setMenuOpen(!menuOpen)} aria-label="Menu">
        <span/><span/><span/>
      </button>
    </div>
    </nav>
    <div className={`mobile-nav-overlay ${menuOpen?"open":""}`}>
      <button className="mobile-close-btn" onClick={()=>setMenuOpen(false)} aria-label="Fermer">
        <X size={28}/>
      </button>
      {[["expertises","Expertises"],["crea","Direction Créa"],["blog","Blog"],["about","Qui sommes-nous"]].map(([id,label]) => (
        <button key={id} onClick={()=>navigate(id)} className={`nav-link ${page===id?"active":""}`}>{label}</button>
      ))}
      <button className="btn-audit" onClick={()=>navigate("audit")} style={{ marginTop:12 }}>Lancer l'audit ✨</button>
    </div>
    </>
  );
};

/* ─── HOME ──────────────────────────────────────────────────────────────── */
const Home = ({ go }) => {
  const tickers = ["Google Ads","Meta Ads","TikTok Ads","Snapchat Ads","Direction Créa","ROAS","CPA","UGC","Creative Strategy","Performance Max"];
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{ position:"relative", paddingTop:"clamp(80px,12vw,160px)", paddingBottom:"clamp(64px,10vw,128px)", overflow:"hidden" }}>
        <div className="orb" style={{ top:"-8%", right:"-4%", width:680, height:680, background:"#dbeafe" }}/>
        <div className="orb" style={{ bottom:"15%", left:"-8%", width:380, height:380, background:"#e0f2fe", animationDelay:"4.5s" }}/>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:2 }}>
          <div className="badge fade-up" style={{ marginBottom:44 }}>
            <Award size={13} style={{ color:"var(--blue-ia)" }}/><span>Expert Formateur Certifié Google Ads</span>
          </div>
          <h1 className="display-title fade-up d1" style={{ 
            fontSize:"clamp(36px,7vw,96px)", 
            marginBottom:36,
            maxWidth:900,
            lineHeight:0.95,
            letterSpacing:"-0.04em"
          }}>
            L'IA traite la donnée.<br/><span style={{ color:"var(--blue-ia)", fontStyle:"italic" }}>Nous pilotons le profit.</span>
          </h1>
          <p className="fade-up d2" style={{ 
            fontFamily:"var(--font-body)", 
            fontSize:"clamp(16px,2vw,24px)", 
            color:"var(--gray-secondary)", 
            maxWidth:680,
            marginBottom:56, 
            lineHeight:1.5, 
            fontWeight:500
          }}>
            SEAD CONSEIL transforme l'acquisition complexe en résultats clairs. Nous utilisons l'IA pour la puissance brute, mais c'est notre vision métier qui protège votre rentabilité.
          </p>
          <div className="fade-up d3 hero-cta-row" style={{ display:"flex", alignItems:"center", gap:32, flexWrap:"wrap" }}>
            <button className="btn-primary" onClick={()=>go("audit")} style={{ fontSize:"clamp(14px,1.5vw,20px)", padding:"clamp(16px,2vw,28px) clamp(28px,3vw,56px)" }}>
              Audit Stratégique Offert <ArrowRight size={20} className="arrow"/>
            </button>
            <div className="hero-social-proof" style={{ display:"flex", alignItems:"center", gap:16 }}>
              <div style={{ display:"flex" }}>
                {[1,2,3].map(i => <div key={i} style={{ width:40, height:40, borderRadius:"50%", border:"3px solid white", background:"#e2e8f0", marginLeft:i>1?-12:0, boxShadow:"0 4px 12px rgba(0,0,0,.1)" }}/>)}
              </div>
              <div>
                <p style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.15em", color:"var(--blue-night)" }}>+150 Annonceurs</p>
                <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.15em", color:"var(--gray-secondary)" }}>Accompagnés avec succès</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{ background:"#0f172a", padding:"18px 0", overflow:"hidden", borderTop:"1px solid rgba(255,255,255,.04)", borderBottom:"1px solid rgba(255,255,255,.04)" }}>
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...tickers,...tickers].map((t,i) => (
              <span key={i} style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:i%3===0?"var(--blue-ia)":"var(--gray-secondary)", display:"flex", alignItems:"center", gap:24 }}>
                {t} <span style={{ color:"var(--blue-night)", opacity:0.3 }}>•</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPERTISE / MÉTHODE ── */}
      <section className="section-padding-lg" style={{ paddingTop:128, paddingBottom:128, background:"var(--bg-soft)", position:"relative" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
          <div className="expertise-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
            {/* Left — Card */}
            <Reveal>
              <div style={{ background:"var(--bg-white)", padding:"clamp(28px,4vw,64px)", borderRadius:"3rem", boxShadow:"0 24px 80px rgba(0,0,0,.08)", border:"1px solid #f1f5f9", position:"relative" }}>
                <div style={{ display:"inline-flex", padding:16, background:"var(--blue-ia)", borderRadius:"1.5rem", color:"white", marginBottom:28, boxShadow:"0 12px 32px rgba(59,130,246,.25)" }}>
                  <Cpu size={36}/>
                </div>
                <h2 className="display-title" style={{ fontSize:"clamp(24px,3.5vw,48px)", marginBottom:24, lineHeight:1 }}>
                  L'IA est une commodité, la stratégie est un <span style={{ color:"var(--blue-ia)" }}>avantage.</span>
                </h2>
                <p style={{ fontFamily:"var(--font-body)", fontSize:16, color:"var(--gray-secondary)", lineHeight:1.7, fontWeight:500, fontStyle:"italic", borderLeft:"4px solid var(--blue-ia)", paddingLeft:24, marginBottom:32 }}>
                  "Confier son budget à un algorithme seul, c'est comme mettre un pilote automatique sans destination. Nous définissons la trajectoire, l'IA accélère le voyage."
                </p>
                <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                  <div style={{ padding:20, background:"var(--bg-soft)", borderRadius:"1.5rem" }}>
                    <span style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:900, color:"var(--blue-night)", display:"block", marginBottom:4 }}>+45%</span>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.2em", color:"var(--gray-secondary)" }}>CTR Moyen</span>
                  </div>
                  <div style={{ padding:20, background:"var(--bg-soft)", borderRadius:"1.5rem" }}>
                    <span style={{ fontFamily:"var(--font-display)", fontSize:28, fontWeight:900, color:"var(--blue-night)", display:"block", marginBottom:4 }}>-30%</span>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.2em", color:"var(--gray-secondary)" }}>CPA Ciblé</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Right — 3 étapes */}
            <div style={{ display:"flex", flexDirection:"column", gap:48 }}>
              {[
                { num:"01", title:"Audit Stratégique Humain", desc:"Analyse profonde de votre business modèle. L'IA ne comprend pas votre rentabilité réelle, nous oui. Nous identifions les fuites de budget que les logiciels ignorent.", tag:null },
                { num:"02", title:"Pilotage Média Multi-Hub", desc:"Google Ads, Meta, TikTok. Une gestion granulaire qui allie le Smart Bidding à une surveillance humaine quotidienne depuis nos 3 centres d'opérations.", tag:"PARIS • DUBLIN • DAKAR" },
                { num:"03", title:"Direction Créa Publicitaire", desc:"La créa est le nouveau ciblage. Nous concevons vos hooks, vos scripts et vos visuels pour forcer l'attention et déclencher l'action.", tag:null }
              ].map((step,i) => (
                <Reveal key={i} delay={i*.1}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12, flexWrap:"wrap" }}>
                      <span style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3vw,40px)", fontWeight:900, color:"var(--blue-ia)", fontStyle:"italic" }}>{step.num}</span>
                      <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(18px,2vw,26px)", fontWeight:900, textTransform:"uppercase", letterSpacing:"-0.03em", color:"var(--blue-night)" }}>{step.title}</h3>
                      {step.tag && <span style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:900, padding:"5px 12px", background:"#e2e8f0", borderRadius:100, letterSpacing:"0.1em", color:"var(--gray-secondary)" }}>{step.tag}</span>}
                    </div>
                    <p style={{ fontFamily:"var(--font-body)", fontSize:15, color:"var(--gray-secondary)", lineHeight:1.7, fontWeight:500 }}>{step.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CREATIVE STRATEGY ── */}
      <section className="section-padding-lg" style={{ paddingTop:128, paddingBottom:128, background:"var(--bg-white)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
          <Reveal>
            <div style={{ textAlign:"center", maxWidth:800, margin:"0 auto 72px" }}>
              <p style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.35em", color:"var(--blue-ia)", marginBottom:20, fontStyle:"italic" }}>Creative Strategy</p>
              <h2 className="display-title" style={{ fontSize:"clamp(32px,5.5vw,72px)", marginBottom:24, letterSpacing:"-0.04em" }}>
                L'IA génère des images.<br/><span style={{ color:"var(--blue-ia)" }}>Nous créons du désir.</span>
              </h2>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"clamp(16px,1.5vw,20px)", color:"var(--gray-secondary)", fontWeight:500, lineHeight:1.6 }}>
                Dans un monde saturé de contenus automatisés, seule une direction de création stratégique et humaine permet de sortir du lot.
              </p>
            </div>
          </Reveal>

          <div className="crea-cards-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
            {[
              { Icon:Video, title:"UGC & Vidéo Performance", desc:"Scénarisation et production de contenus TikTok & Reels optimisés pour la conversion brute." },
              { Icon:PenTool, title:"Copywriting Émotionnel", desc:"Des textes qui ne vendent pas un produit, mais une solution à un problème psychologique." },
              { Icon:PanelsTopLeft, title:"Design d'Assets Statiques", desc:"Bannières et carrousels conçus pour maximiser le CTR sur tous les placements Ads." }
            ].map((c,i) => (
              <Reveal key={i} delay={i*.1}>
                <div className="card-hover" style={{ padding:"clamp(28px,3vw,48px)", background:"var(--bg-soft)", borderRadius:"3rem", border:"1px solid #f1f5f9", height:"100%", transition:"border-color .3s" }}>
                  <div className="exp-icon" style={{ marginBottom:28, color:"var(--blue-ia)" }}><c.Icon size={30}/></div>
                  <h4 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(17px,1.5vw,22px)", fontWeight:900, fontStyle:"italic", textTransform:"uppercase", marginBottom:14, letterSpacing:"-0.02em", lineHeight:1.1, color:"var(--blue-night)" }}>{c.title}</h4>
                  <p style={{ fontFamily:"var(--font-body)", color:"var(--gray-secondary)", lineHeight:1.7, fontWeight:500, fontSize:14 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONDATEUR — SECTION DARK ── */}
      <section style={{ paddingTop:"clamp(64px,8vw,128px)", paddingBottom:"clamp(64px,8vw,128px)", background:"var(--blue-night)", color:"white", overflow:"hidden", position:"relative" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:2 }}>
          <div className="founder-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"clamp(40px,5vw,80px)", alignItems:"center" }}>
            {/* Photo / Visual */}
            <Reveal>
              <div style={{ aspectRatio:"4/5", background:"rgba(255,255,255,.04)", borderRadius:"3rem", border:"1px solid rgba(255,255,255,.1)", overflow:"hidden", position:"relative", boxShadow:"0 32px 80px rgba(0,0,0,.4)" }}>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ animation:"float 6s ease-in-out infinite", filter:"drop-shadow(0 8px 24px rgba(59,130,246,.3))" }}>
                    <Logo size={160} pulse={false}/>
                  </div>
                </div>
                <div style={{ position:"absolute", bottom:"clamp(16px,3vw,40px)", left:"clamp(16px,3vw,40px)", padding:"clamp(16px,2vw,32px)", background:"var(--blue-ia)", borderRadius:"1.5rem", boxShadow:"0 16px 48px rgba(59,130,246,.4)" }}>
                  <span style={{ fontFamily:"var(--font-display)", fontSize:"clamp(18px,2.5vw,28px)", fontWeight:900, fontStyle:"italic", textTransform:"uppercase", letterSpacing:"-0.03em", lineHeight:1, display:"block", color:"white" }}>Baba Touré</span>
                  <span style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.15em", color:"rgba(255,255,255,.7)", marginTop:6, display:"block" }}>Directeur de Créa & Expert Google Ads</span>
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <div>
              <Reveal>
                <h3 className="display-title" style={{ fontSize:"clamp(28px,4.5vw,56px)", color:"white", marginBottom:32, letterSpacing:"-0.04em" }}>
                  L'expérience de terrain <br/><span style={{ color:"#60a5fa" }}>bat tous les outils.</span>
                </h3>
              </Reveal>
              <Reveal delay={.1}>
                <p style={{ fontFamily:"var(--font-body)", fontSize:"clamp(16px,1.5vw,22px)", color:"var(--gray-secondary)", fontWeight:500, lineHeight:1.7, marginBottom:40 }}>
                  "J'ai formé des centaines de marketeurs et audité des milliers de comptes. Ma conviction ? La technologie doit être au service de la stratégie, et non l'inverse."
                </p>
              </Reveal>
              <Reveal delay={.2}>
                <div className="founder-stats" style={{ display:"flex", gap:"clamp(24px,4vw,56px)", flexWrap:"wrap", marginBottom:36 }}>
                  {[
                    { val:"10+", label:"Années d'expertise" },
                    { val:"Dublin", label:"Hub Média Europe" },
                    { val:"Dakar", label:"Hub Créatif" }
                  ].map((s,i) => (
                    <div key={i}>
                      <div style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,3.5vw,48px)", fontWeight:900, color:"white", fontStyle:"italic", textTransform:"uppercase", letterSpacing:"-0.04em" }}>{s.val}</div>
                      <div style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--gray-secondary)", marginTop:6 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={.3}>
                <button onClick={()=>{}} style={{ display:"inline-flex", alignItems:"center", gap:10, fontFamily:"var(--font-body)", fontSize:12, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.15em", color:"#60a5fa", fontStyle:"italic", textDecoration:"underline", textUnderlineOffset:8, background:"none", border:"none", cursor:"pointer" }}>
                  Suivre mes analyses sur LinkedIn <ArrowRight size={16}/>
                </button>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding:"clamp(48px,6vw,88px) 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal>
            <div className="final-cta-box" style={{ background:"var(--blue-ia)", borderRadius:"clamp(2rem,4vw,5rem)", padding:"clamp(48px,6vw,128px) clamp(28px,5vw,96px)", textAlign:"center", color:"white", position:"relative", overflow:"hidden", boxShadow:"0 32px 80px rgba(59,130,246,.3)" }}>
              <div style={{ position:"absolute", top:0, right:0, width:380, height:380, background:"rgba(255,255,255,.1)", borderRadius:"50%", transform:"translate(50%,-50%)", filter:"blur(80px)", pointerEvents:"none" }}/>
              <div style={{ position:"relative", zIndex:2 }}>
                <h2 className="display-title" style={{ fontSize:"clamp(32px,5.5vw,72px)", color:"white", marginBottom:24, letterSpacing:"-0.04em" }}>
                  Prêt à Scaler ?
                </h2>
                <p style={{ fontFamily:"var(--font-body)", fontSize:"clamp(16px,1.8vw,24px)", color:"rgba(255,255,255,.8)", fontWeight:500, maxWidth:640, margin:"0 auto 44px", lineHeight:1.6, fontStyle:"italic" }}>
                  "Ne laissez plus votre budget Ads au hasard. Offrez-vous une vision humaine, augmentée par l'IA."
                </p>
                <button className="btn-primary" onClick={()=>go("audit")} style={{ background:"var(--blue-night)", fontSize:"clamp(14px,1.5vw,22px)", padding:"clamp(18px,2.5vw,32px) clamp(28px,3.5vw,64px)", margin:"0 auto" }}>
                  Lancer mon Audit Offert <ArrowRight size={20} className="arrow"/>
                </button>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:24, marginTop:28, fontFamily:"var(--font-body)", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.3em", opacity:.8 }}>
                  <span>Paris</span>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"white" }}/>
                  <span>Dublin</span>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"white" }}/>
                  <span>Dakar</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

/* ─── EXPERTISES ────────────────────────────────────────────────────────── */
const Expertises = () => (
  <div className="section-padding-lg" style={{ paddingTop:128, paddingBottom:128 }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
      <Reveal>
        <h2 className="display-title" style={{ fontSize:"clamp(39px,8vw,89px)", marginBottom:88 }}>
          Nos <span style={{ color:"var(--blue-ia)" }}>Expertises.</span>
        </h2>
      </Reveal>
      <div className="expertises-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
        {[
          { Icon:Search, title:"Audit & Stratégie", desc:"Diagnostic chirurgical de vos comptes Google et Meta pour identifier les fuites de budget et maximiser le ROAS." },
          { Icon:Target, title:"Pilotage Ads", desc:"Gestion haute performance multi-leviers pilotée par le profit réel, non par les vanity metrics." },
          { Icon:Sparkles, title:"Direction Créa", desc:"Conception de scripts UGC et d'assets visuels basés sur la psychologie publicitaire et les données comportementales." }
        ].map((c,i) => (
          <Reveal key={i} delay={i*.12}>
            <div className="card-hover glass" style={{ padding:48, borderRadius:"3rem", border:"1px solid rgba(241,245,249,.8)", height:"100%" }}>
              <div className="exp-icon" style={{ marginBottom:28 }}><c.Icon size={30} style={{ color:"var(--blue-ia)" }}/></div>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:21, fontWeight:800, fontStyle:"italic", textTransform:"uppercase", marginBottom:12, letterSpacing:"-0.02em", lineHeight:1.1 }}>{c.title}</h3>
              <p style={{ fontFamily:"var(--font-body)", color:"var(--blue-night)", lineHeight:1.6, fontWeight:400, fontSize:14 }}>{c.desc}</p>
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
    <div className="section-padding-lg" style={{ paddingTop:128, paddingBottom:128 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
        <div className="crea-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:88, alignItems:"start" }}>
          <div>
            <Reveal>
              <h2 className="display-title" style={{ fontSize:"clamp(38px,5vw,78px)", marginBottom:36 }}>
                L'IA génère.<br/><span style={{ color:"var(--blue-ia)" }}>Nous pensons.</span>
              </h2>
            </Reveal>
            <Reveal delay={.1}>
              <p style={{ fontFamily:"var(--font-body)", fontSize:17, color:"var(--blue-night)", marginBottom:36, lineHeight:1.6, fontWeight:400 }}>
                La créa est le nouveau ciblage. Testez notre labo créatif IA ci-dessous.
              </p>
            </Reveal>
            <Reveal delay={.2}>
              <div style={{ padding:28, background:"var(--bg-soft)", border:"1px solid rgba(59,130,246,.2)", borderRadius:"3rem", boxShadow:"0 4px 24px rgba(59,130,246,.1)" }}>
                <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--blue-ia)", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
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
                <h4 style={{ fontFamily:"var(--font-body)", color:"var(--blue-ia)", fontWeight:900, fontStyle:"italic", textTransform:"uppercase", fontSize:10, letterSpacing:"0.25em", marginBottom:8 }}>{idea.title}</h4>
                <p style={{ fontFamily:"var(--font-display)", color:"var(--blue-night)", fontWeight:800, fontSize:15, marginBottom:8, fontStyle:"italic" }}>"{idea.hook}"</p>
                <p style={{ fontFamily:"var(--font-body)", color:"var(--blue-night)", fontSize:12, lineHeight:1.6, fontWeight:400 }}>{idea.script}</p>
              </div>
            )) : (
              <Reveal delay={.15}>
                <div style={{ background:"var(--blue-night)", borderRadius:"3rem", aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:"0 28px 64px rgba(15,23,42,.35)" }}>
                  <Cpu size={270} style={{ position:"absolute", bottom:-55, right:-55, color:"rgba(255,255,255,.03)" }}/>
                  <p style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:800, fontStyle:"italic", textTransform:"uppercase", color:"white", textAlign:"center", lineHeight:1.1, letterSpacing:"-0.02em", position:"relative", zIndex:1 }}>
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
      <div className="scale-in glass" style={{ maxWidth:480, width:"100%", borderRadius:"3rem", padding:"56px 52px", textAlign:"center", boxShadow:"0 40px 80px rgba(0,0,0,.1)" }}>
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
    <section style={{ paddingTop:180, paddingBottom:128, background:"var(--bg-soft)", backdropFilter:"blur(16px)", minHeight:"100vh" }}>
      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <h1 className="display-title fade-up" style={{ fontSize:"clamp(46px,6vw,78px)", marginBottom:24 }}>
            Lancer <span style={{ color:"var(--blue-ia)" }}>L'Audit.</span>
          </h1>
          {/* Progress bar */}
          <div style={{ maxWidth:280, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ width:34, height:34, borderRadius:"50%", border:"2px solid", borderColor:step>=n?"var(--blue-ia)":"#e2e8f0", background:step>=n?"var(--blue-ia)":"var(--bg-white)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"var(--font-body)", fontSize:12, fontWeight:900, color:step>=n?"white":"var(--gray-secondary)", transition:"all .35s cubic-bezier(.16,1,.3,1)" }}>
                  {step>n ? "✓" : n}
                </div>
              ))}
            </div>
            <div style={{ height:3, background:"#f1f5f9", borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", background:"var(--blue-ia)", borderRadius:3, width:`${(step/3)*100}%`, transition:"width .55s cubic-bezier(.16,1,.3,1)" }}/>
            </div>
          </div>
        </div>

        <div className="glass scale-in audit-card" style={{ padding:"52px 60px", borderRadius:"3rem", boxShadow:"0 24px 64px rgba(0,0,0,.08)", border:"1px solid rgba(255,255,255,.7)" }}>
          {step===1 && (
            <div className="fade-up">
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:800, fontStyle:"italic", textTransform:"uppercase", marginBottom:28, letterSpacing:"-0.02em" }}>Maturité de votre projet ?</h3>
              <div className="maturity-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {["Lancement","Croissance","Consolidation","Redressement"].map(l => (
                  <button key={l} className="maturity-btn" onClick={()=>{ setForm({...form,maturity:l}); setStep(2); }}>
                    <span style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:800, textTransform:"uppercase", fontStyle:"italic", letterSpacing:"-0.02em" }}>{l}</span>
                    <ChevronRight size={17} className="chevron"/>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step===2 && (
            <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:800, fontStyle:"italic", textTransform:"uppercase", textAlign:"center", letterSpacing:"-0.02em" }}>Coordonnées</h3>
              <div className="audit-form-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                <input className="field" type="text" placeholder="Société"    value={form.companyName} onChange={e=>setForm({...form,companyName:e.target.value})}/>
                <input className="field" type="text" placeholder="Prénom Nom" value={form.contactName} onChange={e=>setForm({...form,contactName:e.target.value})}/>
              </div>
              <input className="field" type="url" placeholder="https://votre-site.com" value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/>
              <div style={{ display:"flex", gap:12, marginTop:4 }}>
                <button onClick={()=>setStep(1)} style={{ padding:"17px 28px", background:"#f1f5f9", border:"none", borderRadius:"3rem", fontFamily:"var(--font-body)", fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:"0.25em", cursor:"pointer", transition:"background .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.background="#e2e8f0"} onMouseLeave={e=>e.currentTarget.style.background="#f1f5f9"}>Retour</button>
                <button onClick={()=>setStep(3)} disabled={!form.companyName||!form.contactName||!form.website}
                  style={{ flex:1, padding:"17px 28px", background:(!form.companyName||!form.contactName||!form.website)?"var(--gray-secondary)":"var(--blue-night)", color:"white", border:"none", borderRadius:"3rem", fontFamily:"var(--font-body)", fontWeight:900, fontSize:11, textTransform:"uppercase", letterSpacing:"0.25em", cursor:"pointer", transition:"background .3s" }}>
                  Continuer
                </button>
              </div>
            </div>
          )}
          {step===3 && (
            <div className="fade-up" style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <h3 style={{ fontFamily:"var(--font-display)", fontSize:27, fontWeight:800, fontStyle:"italic", textTransform:"uppercase", textAlign:"center", letterSpacing:"-0.02em" }}>Investissement</h3>
              <select className="field" style={{ cursor:"pointer" }} value={form.budget} onChange={e=>setForm({...form,budget:e.target.value})}>
                <option value="">Sélectionnez une fourchette</option>
                <option value="10k-50k">10k€ — 50k€ / mois</option>
                <option value="50k-100k">50k€ — 100k€ / mois</option>
                <option value="100k+">+100k€ / mois</option>
              </select>
              <input className="field" type="email" placeholder="Email pro" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
              <button onClick={finish} disabled={!form.email||!form.budget} className="btn-blue"
                style={{ padding:"21px", fontSize:15, fontStyle:"italic", letterSpacing:"-0.01em", marginTop:6, borderRadius:"3rem" }}>
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
  <div className="section-padding-lg" style={{ paddingTop:128, paddingBottom:128 }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
      <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:96, alignItems:"center" }}>
        <div>
          <Reveal><p style={{ fontFamily:"var(--font-body)", fontSize:11, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--blue-ia)", marginBottom:22, fontStyle:"italic" }}>Qui sommes-nous</p></Reveal>
          <Reveal delay={.1}><h2 className="display-title" style={{ fontSize:"clamp(30px,4.5vw,62px)", marginBottom:32 }}>L'autorité par<br/><span style={{ color:"var(--blue-ia)" }}>l'expérience.</span></h2></Reveal>
          <Reveal delay={.2}>
            <blockquote style={{ fontFamily:"var(--font-body)", fontSize:16, color:"var(--blue-night)", lineHeight:1.6, fontWeight:400, borderLeft:"4px solid var(--blue-ia)", paddingLeft:28, margin:"0 0 26px 0" }}>
              "SEAD CONSEIL n'est pas une agence d'exécution. C'est le carrefour où la puissance de l'IA rencontre l'intuition stratégique."
            </blockquote>
          </Reveal>
          <Reveal delay={.3}>
            <p style={{ fontFamily:"var(--font-body)", color:"var(--blue-night)", lineHeight:1.6, fontWeight:400, fontSize:15 }}>
              Fondée par Baba Touré, expert certifié Google Ads et formateur reconnu, SEAD CONSEIL opère depuis Paris, Dublin et Dakar pour des clients qui exigent des résultats réels.
            </p>
          </Reveal>
        </div>
        <Reveal delay={.15}>
          <div style={{ background:"var(--blue-night)", borderRadius:"3rem", aspectRatio:"4/5", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", boxShadow:"0 32px 80px rgba(15,23,42,.35)" }}>
            <div style={{ position:"absolute", fontSize:70, fontWeight:800, color:"rgba(255,255,255,.025)", transform:"rotate(-90deg)", userSelect:"none", whiteSpace:"nowrap", fontFamily:"var(--font-display)", fontStyle:"italic" }}>BABA TOURE</div>
            <div style={{ animation:"float 6s ease-in-out infinite" }}><Logo size={176} pulse={false}/></div>
          </div>
        </Reveal>
      </div>
    </div>
  </div>
);

/* ─── BLOG ─────────────────────────────────────────────────────────────── */
const BLOG_ARTICLES = [
  { id:1, title:"Performance Max : le guide ultime pour scaler sans perdre en ROAS", excerpt:"Comment structurer vos campagnes PMax pour maximiser le profit réel tout en gardant le contrôle sur l'algorithme Google.", category:"Google Ads", date:"12 Fév 2026", readTime:"8 min", color:"var(--blue-ia)", gradient:"linear-gradient(135deg,#1e3a8a 0%,#3B82F6 50%,#60a5fa 100%)" },
  { id:2, title:"UGC Ads : pourquoi vos créas statiques ne convertissent plus", excerpt:"L'ère du scroll rapide exige des formats natifs. Décryptage des mécaniques psychologiques derrière les meilleures UGC ads.", category:"Creative Strategy", date:"5 Fév 2026", readTime:"6 min", color:"#7c3aed", gradient:"linear-gradient(135deg,#4c1d95 0%,#7c3aed 50%,#a78bfa 100%)" },
  { id:3, title:"IA × Acquisition : comment nous utilisons Claude pour auditer en 30 secondes", excerpt:"Notre méthodologie propriétaire combine l'analyse IA instantanée avec 12 ans d'expertise terrain pour des diagnostics chirurgicaux.", category:"IA & Automation", date:"28 Jan 2026", readTime:"5 min", color:"#0891b2", gradient:"linear-gradient(135deg,#164e63 0%,#0891b2 50%,#67e8f9 100%)" },
  { id:4, title:"Meta Ads 2026 : les 5 signaux faibles à surveiller ce trimestre", excerpt:"Advantage+ Shopping, Reels Ads, API Conversions étendue… Les changements silencieux qui vont redéfinir vos performances.", category:"Meta Ads", date:"20 Jan 2026", readTime:"7 min", color:"var(--blue-ia)", gradient:"linear-gradient(135deg,#0F172A 0%,#1e40af 50%,#3B82F6 100%)" },
  { id:5, title:"Budget Ads : la méthode SEAD pour allouer sans gaspiller", excerpt:"Notre framework de répartition budgétaire basé sur le MER et le profit incrémental, testé sur +2M€ de spend mensuel.", category:"Stratégie", date:"14 Jan 2026", readTime:"9 min", color:"#059669", gradient:"linear-gradient(135deg,#064e3b 0%,#059669 50%,#6ee7b7 100%)" },
  { id:6, title:"TikTok Ads : de 0 à 100k€/mois en 90 jours — étude de cas", excerpt:"Comment nous avons accompagné une DNVB française dans son scale TikTok avec un ROAS moyen de 4.2x sur la période.", category:"Case Study", date:"6 Jan 2026", readTime:"10 min", color:"#e11d48", gradient:"linear-gradient(135deg,#881337 0%,#e11d48 50%,#fda4af 100%)" },
];

const Blog = ({ go }) => (
  <div>
    {/* ── HERO ── */}
    <section className="section-padding-xl" style={{ position:"relative", paddingTop:220, paddingBottom:128, overflow:"hidden" }}>
      <div className="orb" style={{ top:"-10%", right:"-6%", width:600, height:600, background:"rgba(59,130,246,.08)" }}/>
      <div className="orb" style={{ bottom:"10%", left:"-10%", width:340, height:340, background:"rgba(59,130,246,.06)", animationDelay:"4.5s" }}/>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px", position:"relative", zIndex:2 }}>
        <Reveal>
          <div className="badge" style={{ marginBottom:40 }}>
            <Sparkles size={13} style={{ color:"#60a5fa" }}/><span>Insights & Stratégies</span>
          </div>
        </Reveal>
        <Reveal delay={.08}>
          <h1 className="display-title" style={{ fontSize:"clamp(46px,8vw,96px)", marginBottom:32 }}>
            Le <span style={{ color:"var(--blue-ia)" }}>Blog.</span>
          </h1>
        </Reveal>
        <Reveal delay={.18}>
          <p style={{ fontFamily:"var(--font-body)", fontSize:"clamp(16px,1.8vw,21px)", color:"var(--gray-secondary)", maxWidth:620, lineHeight:1.6, fontWeight:400 }}>
            Veille stratégique, frameworks actionnables et retours d'expérience terrain — par l'équipe SEAD CONSEIL.
          </p>
        </Reveal>
      </div>
    </section>

    {/* ── FEATURED ARTICLE ── */}
    <section style={{ paddingBottom:88 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
        <Reveal>
          <div className="card-hover blog-featured" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", borderRadius:"3.5rem", overflow:"hidden", border:"1px solid var(--border)", background:"var(--bg-white)", boxShadow:"0 8px 40px rgba(0,0,0,.06)", cursor:"pointer" }}>
            <div className="blog-featured-visual" style={{ background:BLOG_ARTICLES[0].gradient, position:"relative", overflow:"hidden", minHeight:380 }}>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:48 }}>
                <div style={{ fontFamily:"var(--font-display)", fontSize:120, fontWeight:900, color:"rgba(255,255,255,.07)", position:"absolute", top:28, right:36, lineHeight:1, fontStyle:"italic" }}>01</div>
                <Logo size={52} pulse={false}/>
              </div>
            </div>
            <div style={{ padding:"52px 48px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
                <span style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--blue-ia)", background:"rgba(59,130,246,.08)", padding:"6px 14px", borderRadius:100 }}>{BLOG_ARTICLES[0].category}</span>
                <span style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.2em", color:"var(--gray-secondary)" }}>{BLOG_ARTICLES[0].date}</span>
              </div>
              <h2 style={{ fontFamily:"var(--font-display)", fontSize:26, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:18, color:"var(--blue-night)" }}>{BLOG_ARTICLES[0].title}</h2>
              <p style={{ fontFamily:"var(--font-body)", color:"var(--gray-secondary)", lineHeight:1.7, fontWeight:400, fontSize:14, marginBottom:28 }}>{BLOG_ARTICLES[0].excerpt}</p>
              <div style={{ display:"flex", alignItems:"center", gap:10, fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--blue-ia)" }}>
                Lire l'article <ArrowRight size={14}/>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>

    {/* ── ARTICLES GRID ── */}
    <section style={{ paddingTop:44, paddingBottom:128 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
        <Reveal>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:56 }}>
            <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.3em", color:"var(--blue-ia)", fontStyle:"italic" }}>Dernières publications</p>
            <div style={{ height:1, flex:1, background:"var(--border)", marginLeft:32 }}/>
          </div>
        </Reveal>
        <div className="blog-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
          {BLOG_ARTICLES.slice(1).map((article,i) => (
            <Reveal key={article.id} delay={i*.1}>
              <article className="card-hover glass" style={{ borderRadius:"3rem", border:"1px solid rgba(241,245,249,.8)", overflow:"hidden", cursor:"pointer", height:"100%", display:"flex", flexDirection:"column" }}>
                <div style={{ position:"relative", overflow:"hidden" }}>
                  <div style={{ aspectRatio:"16/9", background:article.gradient, transition:"transform .5s cubic-bezier(.16,1,.3,1)", position:"relative" }}
                    onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";}}>
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ fontFamily:"var(--font-display)", fontSize:72, fontWeight:900, color:"rgba(255,255,255,.08)", fontStyle:"italic", lineHeight:1 }}>{String(i+2).padStart(2,"0")}</div>
                    </div>
                  </div>
                </div>
                <div style={{ padding:"32px 32px 36px", flex:1, display:"flex", flexDirection:"column" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.2em", color:article.color, background:"rgba(59,130,246,.06)", padding:"5px 12px", borderRadius:100 }}>{article.category}</span>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.2em", color:"var(--gray-secondary)" }}>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:900, fontStyle:"italic", textTransform:"uppercase", letterSpacing:"-0.01em", lineHeight:1.15, marginBottom:12, color:"var(--blue-night)", flex:1 }}>{article.title}</h3>
                  <p style={{ fontFamily:"var(--font-body)", color:"var(--gray-secondary)", lineHeight:1.7, fontWeight:400, fontSize:13, marginBottom:20 }}>{article.excerpt}</p>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, borderTop:"1px solid var(--border)" }}>
                    <span style={{ fontFamily:"var(--font-body)", fontSize:9, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.2em", color:"var(--gray-secondary)" }}>{article.date}</span>
                    <ArrowRight size={14} style={{ color:"var(--blue-ia)", transition:"transform .3s cubic-bezier(.16,1,.3,1)" }}/>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section style={{ paddingBottom:128 }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
        <Reveal>
          <div className="blog-cta-box" style={{ background:"var(--blue-night)", borderRadius:"4rem", padding:"88px 72px", textAlign:"center", position:"relative", overflow:"hidden", boxShadow:"0 32px 80px rgba(15,23,42,.35)" }}>
            <div className="orb" style={{ top:"-30%", right:"-10%", width:400, height:400, background:"#1e3a8a", opacity:.3 }}/>
            <div className="orb" style={{ bottom:"-20%", left:"-8%", width:300, height:300, background:"#1e40af", opacity:.25, animationDelay:"3s" }}/>
            <div style={{ position:"relative", zIndex:2 }}>
              <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.3em", color:"#60a5fa", marginBottom:28, fontStyle:"italic" }}>Passez à l'action</p>
              <h2 className="display-title" style={{ fontSize:"clamp(32px,5vw,64px)", color:"white", marginBottom:24 }}>
                Vos concurrents lisent.<br/><span style={{ color:"#60a5fa" }}>Vous, agissez.</span>
              </h2>
              <p style={{ fontFamily:"var(--font-body)", fontSize:16, color:"var(--gray-secondary)", fontWeight:400, maxWidth:480, margin:"0 auto 44px", lineHeight:1.65 }}>
                Recevez un diagnostic complet de vos campagnes avec recommandations IA en moins de 48h.
              </p>
              <button className="btn-primary" onClick={()=>go("audit")} style={{ margin:"0 auto" }}>
                Lancer mon Audit Gratuit ✨ <ArrowRight size={20} className="arrow"/>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  </div>
);

/* ─── FOOTER ────────────────────────────────────────────────────────────── */
const Footer = ({ go }) => (
  <footer style={{ paddingTop:88, paddingBottom:44, background:"rgba(255,255,255,.9)", backdropFilter:"blur(16px)", borderTop:"1px solid #f1f5f9" }}>
    <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 32px" }}>
      <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"5fr 2fr 2fr 2fr", gap:48, marginBottom:56 }}>
        <div>
          <div className="logo-wrap" style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, cursor:"pointer" }} onClick={()=>go("home")}>
            <Logo size={42} pulse={false}/>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:19, fontWeight:900, letterSpacing:"-0.02em", color:"var(--blue-ia)", fontStyle:"italic", textTransform:"uppercase", lineHeight:1 }}>SEAD CONSEIL</div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:7, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--gray-secondary)", fontStyle:"italic", marginTop:4 }}>IA-BOOSTED • EXPERT-DRIVEN</div>
            </div>
          </div>
          <p style={{ fontFamily:"var(--font-body)", color:"var(--blue-night)", fontWeight:400, fontSize:13, lineHeight:1.6, maxWidth:272 }}>
            L'agence conseil en acquisition qui transforme vos budgets en profit réel. Piloté depuis Paris, Dublin et Dakar.
          </p>
        </div>
        {[
          { title:"Implantations", items:["Paris (QG)","Dublin (Hub)","Dakar (Hub)"], pages:null },
          { title:"Plan", items:["Expertises","Direction Créa","Blog","Audit"], pages:["expertises","crea","blog","audit"] },
          { title:"Contact", items:["hello@seadconseil.fr","@babatoure"], pages:null }
        ].map((col,i) => (
          <div key={i} style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <p style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--blue-ia)", fontStyle:"italic" }}>{col.title}</p>
            {col.items.map((item,j) => (
              <p key={j} onClick={col.pages ? ()=>go(col.pages[j]) : undefined}
                style={{ fontFamily:"var(--font-body)", fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.25em", color:"var(--gray-secondary)", cursor:col.pages?"pointer":"default", fontStyle:"italic", transition:"color .2s" }}
                onMouseEnter={e=>{if(col.pages)e.currentTarget.style.color="var(--blue-ia)";}}
                onMouseLeave={e=>{e.currentTarget.style.color="var(--gray-secondary)";}}>
                {item}
              </p>
            ))}
          </div>
        ))}
      </div>
      <div style={{ paddingTop:24, borderTop:"1px solid #f8fafc", textAlign:"center", fontFamily:"var(--font-body)", fontSize:8, fontWeight:900, color:"var(--gray-secondary)", textTransform:"uppercase", letterSpacing:"0.35em" }}>
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
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 60);
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    // Vérifier l'état initial au chargement
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = id => { setPage(id); window.scrollTo({ top:0, behavior:"smooth" }); };
  const pages = { home:Home, expertises:Expertises, crea:DirectionCrea, about:AboutUs, audit:Audit, blog:Blog };
  const Page = pages[page] || Home;

  return (
    <>
      <GlobalStyles/>
      <div style={{ minHeight:"100vh", background:"white", overflowX:"hidden" }}>
        {/* Top bar */}
        <div style={{ background:"rgba(15,23,42,.97)", backdropFilter:"blur(16px)", color:"var(--gray-secondary)", padding:"11px 32px", fontFamily:"var(--font-body)", fontSize:10, fontWeight:900, textTransform:"uppercase", letterSpacing:"0.25em", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, zIndex:60, borderBottom:"1px solid rgba(255,255,255,.04)" }}>
          <div className="top-bar-locations" style={{ display:"flex", alignItems:"center", gap:26 }}>
            {[["PARIS (QG)",true],["DUBLIN",false],["DAKAR",false]].map(([c,a]) => (
              <span key={c} style={{ display:"flex", alignItems:"center", gap:7, color:a?"white":"inherit", transition:"color .2s" }}>
                <MapPin size={10} style={{ color:a?"var(--blue-ia)":"var(--gray-secondary)", fill:a?"rgba(59,130,246,.18)":"none" }}/>{c}
              </span>
            ))}
          </div>
          <div className="top-bar-tagline" style={{ display:"flex", alignItems:"center", gap:8, fontStyle:"italic" }}>
            <Globe size={10} style={{ color:"var(--blue-ia)", animation:"pulse 2s infinite" }}/> IA-BOOSTED • EXPERT-DRIVEN
          </div>
        </div>

        <div style={{ position:"sticky", top:40, zIndex:55 }}>
          <Navbar page={page} go={go} scrolled={scrolled}/>
        </div>
        <AIAssistant/>

        <main style={{ position:"relative", zIndex:10 }}>
          <Page go={go} setCurrentPage={setPage}/>
        </main>

        <Footer go={go}/>
      </div>
    </>
  );
}
