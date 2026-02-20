import { useState, useRef } from "react";

const BRAND = {
  black: "#212322",
  red: "#C10016",
  coral: "#EE5340",
  lightRed: "#fce8ea",
  lightCoral: "#fdf0ee",
  offWhite: "#fafaf9",
  muted: "#6b7280",
  border: "#e5e7eb",
  white: "#ffffff",
};

const LOGO_URI = "data:image/png;base64,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";

const DEFAULT_SECTIONS = [
  {
    id: 1,
    title: "Enterprise Data Strategy & Architecture",
    items: [
      "Demonstrates understanding of enterprise data strategy and alignment with organizational goals",
      "Designs and maintains logical and semantic data models for consistent enterprise reporting",
      "Establishes standard definitions for KPIs, metrics and dimensions across business units",
      "Defines and maintains a roadmap for analytics capabilities, data sources and integrations",
      "Identifies, evaluates and integrates new internal and external data sources to enhance insights",
    ],
  },
  {
    id: 2,
    title: "Data Platform Integration & Management",
    items: [
      "Implements, configures and manages enterprise BI and data platforms (e.g., Power BI, data warehouses)",
      "Ensures seamless integration with core, digital and ancillary systems",
      "Builds interactive dashboards, reports and visualizations that are actionable and accessible",
      "Works effectively with relational databases, data warehouses or cloud-based data platforms",
      "Maintains high proficiency in Excel and Word for large datasets and executive-ready documentation",
    ],
  },
  {
    id: 3,
    title: "Advanced Analytics & Insights Generation",
    items: [
      "Conducts in-depth quantitative and qualitative analysis to uncover trends, risks and opportunities",
      "Applies advanced techniques such as segmentation, forecasting and propensity analysis",
      "Generates actionable recommendations that support strategic initiatives",
      "Partners with Marketing to measure campaign performance and optimize digital member journeys",
      "Uses data to inform personalization, cross-sell and member engagement strategies",
    ],
  },
  {
    id: 4,
    title: "Data Governance & Quality",
    items: [
      "Supports and helps lead data governance practices including standards, lineage and quality checks",
      "Partners with Technology and business owners to ensure data accuracy, timeliness and security",
      "Identifies and resolves data quality issues proactively",
      "Maintains documentation standards for data definitions, processes and analytical frameworks",
      "Demonstrates ethical use of data in all analytical activities",
    ],
  },
  {
    id: 5,
    title: "Stakeholder Communication & Consulting",
    items: [
      "Presents findings, trends and recommendations clearly to senior leadership and cross-functional teams",
      "Tailors communication effectively to both technical and non-technical audiences",
      "Serves as an internal consultant and subject-matter expert for data and analytics",
      "Translates business questions into clear analytical approaches",
      "Uses storytelling and data visualization to drive understanding and action",
    ],
  },
  {
    id: 6,
    title: "Performance Measurement & Continuous Improvement",
    items: [
      "Leads the design and maintenance of enterprise scorecards and dashboards for leadership",
      "Ensures KPIs accurately reflect performance across member growth, digital adoption and portfolio health",
      "Provides analytical support to operational and frontline teams with timely problem-solving",
      "Stays current with trends in data analytics, BI, AI and machine learning",
      "Continuously evaluates and recommends tools and methodologies to elevate data capabilities",
    ],
  },
];

const LEVELS = {
  B: { label: "Beginner", score: 1, color: BRAND.muted, bg: "#f3f4f6", accent: "#4b5563" },
  I: { label: "Intermediate", score: 2, color: BRAND.coral, bg: BRAND.lightCoral, accent: "#c94530" },
  M: { label: "Master", score: 3, color: BRAND.red, bg: BRAND.lightRed, accent: BRAND.red },
};

function getReadiness(avg) {
  if (avg >= 2.6) return { label: "Strong Promotion Candidate", color: BRAND.red, bg: BRAND.lightRed, icon: "★" };
  if (avg >= 2.0) return { label: "Promotion Ready", color: "#1d6c3a", bg: "#dcfce7", icon: "✓" };
  if (avg >= 1.5) return { label: "Developing", color: "#92400e", bg: "#fef3c7", icon: "◑" };
  return { label: "Not Yet Ready", color: "#7f1d1d", bg: "#fee2e2", icon: "○" };
}

function getLevelLabel(avg) {
  if (avg >= 2.6) return "Master";
  if (avg >= 2.0) return "Intermediate";
  if (avg >= 1.0) return "Beginner";
  return "—";
}

function ScoreBar({ value, max = 3 }) {
  const pct = Math.round((value / max) * 100);
  const color = value >= 2.6 ? BRAND.red : value >= 2.0 ? BRAND.coral : value >= 1.5 ? "#f59e0b" : "#d1d5db";
  return (
    <div style={{ height: 8, background: "#e5e7eb", borderRadius: 4, overflow: "hidden", width: "100%" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.5s ease" }} />
    </div>
  );
}

// ─── Cover Page ────────────────────────────────────────────────────────────────
function CoverPage({ onStart, onSettings }) {
  const [empName, setEmpName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [error, setError] = useState(false);

  const handleStart = () => {
    if (!empName.trim() || !jobTitle.trim()) { setError(true); return; }
    onStart(empName.trim(), jobTitle.trim());
  };

  const inp = (hasError) => ({
    width: "100%", padding: "14px 18px",
    border: `2px solid ${hasError ? BRAND.red : BRAND.border}`,
    borderRadius: 8, fontSize: 15, fontFamily: "'Georgia', serif",
    background: BRAND.white, color: BRAND.black, outline: "none",
    boxSizing: "border-box", transition: "border-color 0.2s",
  });

  return (
    <div style={{ minHeight: "100vh", background: BRAND.black, display: "flex", flexDirection: "column" }}>
      <div style={{ height: 5, background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.coral})` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
        <div style={{ marginBottom: 48, textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <img src={LOGO_URI} alt="Soarion Credit Union" style={{ height: 48, width: "auto", objectFit: "contain", mixBlendMode: "screen" }} />
          </div>
        </div>

        <div style={{ background: BRAND.white, borderRadius: 16, padding: "52px 56px", maxWidth: 540, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontFamily: "sans-serif", letterSpacing: "0.14em", textTransform: "uppercase", color: BRAND.coral, fontWeight: "bold" }}>
              Promotion Readiness
            </span>
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 30, fontFamily: "'Georgia', serif", color: BRAND.black, lineHeight: 1.2 }}>
            Evaluation Tool
          </h1>
          <p style={{ margin: "0 0 36px", color: BRAND.muted, fontSize: 15, fontFamily: "'Georgia', serif", lineHeight: 1.6 }}>
            A structured scoring model to assess readiness across core competency areas.
          </p>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontFamily: "sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: BRAND.black, fontWeight: "bold", marginBottom: 8 }}>Employee Name</label>
            <input style={inp(error && !empName.trim())} placeholder="Full name" value={empName}
              onChange={(e) => { setEmpName(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleStart()} />
          </div>
          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 12, fontFamily: "sans-serif", letterSpacing: "0.08em", textTransform: "uppercase", color: BRAND.black, fontWeight: "bold", marginBottom: 8 }}>Role Being Evaluated For</label>
            <input style={inp(error && !jobTitle.trim())} placeholder="e.g., Data & Insights Specialist" value={jobTitle}
              onChange={(e) => { setJobTitle(e.target.value); setError(false); }}
              onKeyDown={(e) => e.key === "Enter" && handleStart()} />
          </div>

          {error && (
            <div style={{ marginBottom: 16, padding: "10px 14px", background: BRAND.lightRed, border: `1px solid ${BRAND.red}`, borderRadius: 6, color: BRAND.red, fontSize: 13, fontFamily: "sans-serif" }}>
              Please fill in both fields to continue.
            </div>
          )}

          <button onClick={handleStart} style={{ width: "100%", padding: 16, border: "none", borderRadius: 8, background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.coral})`, color: BRAND.white, fontSize: 16, fontWeight: "bold", fontFamily: "sans-serif", letterSpacing: "0.04em", cursor: "pointer", boxShadow: `0 4px 20px ${BRAND.red}44`, marginBottom: 12 }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.92"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
            Get Started →
          </button>

          <button onClick={onSettings} style={{ width: "100%", padding: "11px 16px", border: `1.5px solid ${BRAND.border}`, borderRadius: 8, background: "transparent", color: BRAND.muted, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", letterSpacing: "0.03em" }}>
            ⚙ Customize Sections & Questions
          </button>

          <p style={{ textAlign: "center", marginTop: 14, fontSize: 12, color: "#9ca3af", fontFamily: "sans-serif" }}>
            Sections and questions can be customized in Settings
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: 20, color: "#4b5563", fontSize: 11, fontFamily: "sans-serif", letterSpacing: "0.06em" }}>
        SOARION FEDERAL CREDIT UNION · CONFIDENTIAL
      </div>
    </div>
  );
}

// ─── Settings Panel ────────────────────────────────────────────────────────────
function SettingsPanel({ sections, onChange, onBack }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [editingTitle, setEditingTitle] = useState(null);
  const [titleDraft, setTitleDraft] = useState("");
  const [newQuestions, setNewQuestions] = useState({});
  const [editingQuestion, setEditingQuestion] = useState(null); // { sectionId, itemIdx }
  const [questionDraft, setQuestionDraft] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveFlash, setSaveFlash] = useState(false);
  const nextId = useRef(Math.max(...sections.map(s => s.id)) + 1);

  const totalItems = sections.reduce((a, s) => a + s.items.length, 0);

  const flash = () => { setSaveFlash(true); setTimeout(() => setSaveFlash(false), 1800); };

  // Section operations
  const addSection = () => {
    const id = nextId.current++;
    onChange([...sections, { id, title: "New Section", items: ["New competency item"] }]);
    setExpandedSection(id);
    setEditingTitle(id);
    setTitleDraft("New Section");
  };

  const removeSection = (id) => {
    if (sections.length <= 1) return;
    onChange(sections.filter(s => s.id !== id));
    if (expandedSection === id) setExpandedSection(null);
  };

  const moveSectionUp = (idx) => {
    if (idx === 0) return;
    const next = [...sections];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    onChange(next);
  };

  const moveSectionDown = (idx) => {
    if (idx === sections.length - 1) return;
    const next = [...sections];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    onChange(next);
  };

  const saveTitle = (id) => {
    if (!titleDraft.trim()) return;
    onChange(sections.map(s => s.id === id ? { ...s, title: titleDraft.trim() } : s));
    setEditingTitle(null);
    flash();
  };

  // Question operations
  const addQuestion = (sectionId) => {
    const text = (newQuestions[sectionId] || "").trim();
    if (!text) return;
    onChange(sections.map(s => s.id === sectionId ? { ...s, items: [...s.items, text] } : s));
    setNewQuestions(p => ({ ...p, [sectionId]: "" }));
    flash();
  };

  const removeQuestion = (sectionId, itemIdx) => {
    onChange(sections.map(s => s.id === sectionId ? { ...s, items: s.items.filter((_, i) => i !== itemIdx) } : s));
  };

  const saveQuestion = (sectionId, itemIdx) => {
    if (!questionDraft.trim()) return;
    onChange(sections.map(s => s.id === sectionId ? { ...s, items: s.items.map((it, i) => i === itemIdx ? questionDraft.trim() : it) } : s));
    setEditingQuestion(null);
    flash();
  };

  const moveQuestionUp = (sectionId, idx) => {
    if (idx === 0) return;
    onChange(sections.map(s => {
      if (s.id !== sectionId) return s;
      const items = [...s.items];
      [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
      return { ...s, items };
    }));
  };

  const moveQuestionDown = (sectionId, idx) => {
    onChange(sections.map(s => {
      if (s.id !== sectionId) return s;
      if (idx >= s.items.length - 1) return s;
      const items = [...s.items];
      [items[idx], items[idx + 1]] = [items[idx + 1], items[idx]];
      return { ...s, items };
    }));
  };

  const S = {
    page: { minHeight: "100vh", background: BRAND.offWhite, fontFamily: "'Georgia', serif" },
    topBar: { height: 4, background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.coral})` },
    header: { background: BRAND.black, padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    logo: { width: 34, height: 34, background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.coral})`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 16, fontFamily: "serif" },
    body: { maxWidth: 860, margin: "0 auto", padding: "32px 24px" },
    sectionCard: { background: BRAND.white, borderRadius: 10, marginBottom: 12, border: `1px solid ${BRAND.border}`, overflow: "hidden" },
    sectionHeader: (expanded) => ({
      display: "flex", alignItems: "center", gap: 12, padding: "14px 18px",
      background: expanded ? BRAND.black : BRAND.white,
      cursor: "pointer", userSelect: "none",
      borderBottom: expanded ? `2px solid ${BRAND.red}` : "none",
    }),
    sectionNum: (expanded) => ({
      width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
      background: expanded ? BRAND.red : "#f3f4f6",
      color: expanded ? BRAND.white : BRAND.muted,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: "bold", fontFamily: "monospace",
    }),
    iconBtn: (color = BRAND.muted, hoverBg = "#f3f4f6") => ({
      background: "none", border: "none", cursor: "pointer",
      color, padding: "4px 7px", borderRadius: 5, fontSize: 14,
      fontFamily: "sans-serif", display: "flex", alignItems: "center",
    }),
    primaryBtn: { padding: "9px 18px", borderRadius: 6, border: "none", background: BRAND.red, color: BRAND.white, fontSize: 13, fontWeight: "bold", fontFamily: "sans-serif", cursor: "pointer" },
    ghostBtn: { padding: "9px 18px", borderRadius: 6, border: `1.5px solid ${BRAND.border}`, background: "transparent", color: BRAND.muted, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer" },
    textArea: { width: "100%", padding: "10px 13px", border: `1.5px solid ${BRAND.border}`, borderRadius: 6, fontSize: 13, fontFamily: "'Georgia', serif", color: BRAND.black, resize: "vertical", minHeight: 60, boxSizing: "border-box", outline: "none" },
    questionRow: (idx) => ({
      display: "flex", gap: 10, alignItems: "flex-start",
      padding: "11px 18px", background: idx % 2 === 0 ? BRAND.white : "#fafaf9",
      borderBottom: `1px solid ${BRAND.border}`,
    }),
  };

  return (
    <div style={S.page}>
      <div style={S.topBar} />
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_URI} alt="Soarion Credit Union" style={{ height: 32, width: "auto", objectFit: "contain", mixBlendMode: "screen" }} />
          <div>
            <div style={{ color: BRAND.white, fontSize: 16, fontWeight: "bold" }}>Settings</div>
            <div style={{ color: "#9ca3af", fontSize: 11, fontFamily: "sans-serif", letterSpacing: "0.06em" }}>Customize Sections & Questions</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {saveFlash && (
            <span style={{ color: "#4ade80", fontSize: 12, fontFamily: "sans-serif", animation: "fadeIn 0.3s" }}>✓ Saved</span>
          )}
          <button onClick={() => setShowResetConfirm(true)} style={{ ...S.ghostBtn, color: BRAND.red, borderColor: BRAND.red + "55", fontSize: 12 }}>
            Reset to Default
          </button>
          <button onClick={onBack} style={{ ...S.primaryBtn, background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.coral})` }}>
            ← Back to Home
          </button>
        </div>
      </div>

      {showResetConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: BRAND.white, borderRadius: 12, padding: 32, maxWidth: 400, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Reset to Default?</div>
            <p style={{ color: BRAND.muted, fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              This will restore all original sections and questions. Any customizations will be lost.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button style={S.ghostBtn} onClick={() => setShowResetConfirm(false)}>Cancel</button>
              <button style={{ ...S.primaryBtn, background: BRAND.red }} onClick={() => {
                onChange(JSON.parse(JSON.stringify(DEFAULT_SECTIONS)));
                setShowResetConfirm(false);
                flash();
              }}>Yes, Reset</button>
            </div>
          </div>
        </div>
      )}

      <div style={S.body}>
        {/* Stats bar */}
        <div style={{ display: "flex", gap: 20, marginBottom: 24, padding: "14px 20px", background: BRAND.white, borderRadius: 10, border: `1px solid ${BRAND.border}` }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: "bold", fontFamily: "monospace", color: BRAND.red }}>{sections.length}</div>
            <div style={{ fontSize: 11, color: BRAND.muted, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sections</div>
          </div>
          <div style={{ width: 1, background: BRAND.border }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: "bold", fontFamily: "monospace", color: BRAND.coral }}>{totalItems}</div>
            <div style={{ fontSize: 11, color: BRAND.muted, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total Questions</div>
          </div>
          <div style={{ width: 1, background: BRAND.border }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: "bold", fontFamily: "monospace", color: BRAND.muted }}>{sections.length * 3}</div>
            <div style={{ fontSize: 11, color: BRAND.muted, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Max Score ({totalItems * 3} pts)</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ fontSize: 12, color: BRAND.muted, fontFamily: "sans-serif", margin: 0 }}>
              Tip: Click a section to expand and edit its questions.
            </p>
          </div>
        </div>

        {/* Section cards */}
        {sections.map((section, sIdx) => {
          const expanded = expandedSection === section.id;
          return (
            <div key={section.id} style={S.sectionCard}>
              {/* Section header row */}
              <div style={S.sectionHeader(expanded)} onClick={() => setExpandedSection(expanded ? null : section.id)}>
                <div style={S.sectionNum(expanded)}>{sIdx + 1}</div>

                {editingTitle === section.id ? (
                  <input
                    autoFocus
                    style={{ flex: 1, padding: "6px 10px", border: `2px solid ${BRAND.red}`, borderRadius: 6, fontSize: 14, fontFamily: "'Georgia', serif", color: BRAND.black, outline: "none" }}
                    value={titleDraft}
                    onChange={e => setTitleDraft(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") saveTitle(section.id); if (e.key === "Escape") setEditingTitle(null); }}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <div style={{ flex: 1, fontSize: 14, fontWeight: "bold", color: expanded ? BRAND.white : BRAND.black, fontFamily: "'Georgia', serif" }}>
                    {section.title}
                    <span style={{ fontSize: 11, fontWeight: "normal", color: expanded ? "#9ca3af" : BRAND.muted, marginLeft: 10, fontFamily: "sans-serif" }}>
                      {section.items.length} question{section.items.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                <div style={{ display: "flex", gap: 2, alignItems: "center" }} onClick={e => e.stopPropagation()}>
                  {editingTitle === section.id ? (
                    <>
                      <button style={{ ...S.iconBtn("#4ade80"), fontSize: 12 }} onClick={() => saveTitle(section.id)}>✓ Save</button>
                      <button style={{ ...S.iconBtn(BRAND.muted), fontSize: 12 }} onClick={() => setEditingTitle(null)}>✕</button>
                    </>
                  ) : (
                    <>
                      <button title="Edit title" style={S.iconBtn(expanded ? "#9ca3af" : BRAND.muted)} onClick={() => { setEditingTitle(section.id); setTitleDraft(section.title); setExpandedSection(section.id); }}>✎</button>
                      <button title="Move up" style={S.iconBtn(expanded ? "#9ca3af" : BRAND.muted)} disabled={sIdx === 0} onClick={() => moveSectionUp(sIdx)}>↑</button>
                      <button title="Move down" style={S.iconBtn(expanded ? "#9ca3af" : BRAND.muted)} disabled={sIdx === sections.length - 1} onClick={() => moveSectionDown(sIdx)}>↓</button>
                      <button title="Remove section" style={{ ...S.iconBtn(BRAND.red), opacity: sections.length <= 1 ? 0.3 : 1 }} onClick={() => sections.length > 1 && removeSection(section.id)}>✕</button>
                    </>
                  )}
                </div>
              </div>

              {/* Expanded: questions */}
              {expanded && (
                <div>
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} style={S.questionRow(iIdx)}>
                      <div style={{ width: 22, textAlign: "center", paddingTop: 2, color: BRAND.muted, fontSize: 12, fontFamily: "monospace", flexShrink: 0 }}>{iIdx + 1}.</div>

                      {editingQuestion && editingQuestion.sectionId === section.id && editingQuestion.itemIdx === iIdx ? (
                        <div style={{ flex: 1 }}>
                          <textarea
                            autoFocus
                            style={S.textArea}
                            value={questionDraft}
                            onChange={e => setQuestionDraft(e.target.value)}
                            onKeyDown={e => { if (e.key === "Escape") setEditingQuestion(null); }}
                          />
                          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                            <button style={S.primaryBtn} onClick={() => saveQuestion(section.id, iIdx)}>Save</button>
                            <button style={S.ghostBtn} onClick={() => setEditingQuestion(null)}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ flex: 1, fontSize: 13, color: "#374151", lineHeight: 1.55, paddingTop: 2 }}>{item}</div>
                      )}

                      {!(editingQuestion && editingQuestion.sectionId === section.id && editingQuestion.itemIdx === iIdx) && (
                        <div style={{ display: "flex", gap: 2, flexShrink: 0, alignItems: "center" }}>
                          <button title="Edit" style={S.iconBtn(BRAND.muted)} onClick={() => { setEditingQuestion({ sectionId: section.id, itemIdx: iIdx }); setQuestionDraft(item); }}>✎</button>
                          <button title="Move up" style={{ ...S.iconBtn(BRAND.muted), opacity: iIdx === 0 ? 0.3 : 1 }} onClick={() => moveQuestionUp(section.id, iIdx)}>↑</button>
                          <button title="Move down" style={{ ...S.iconBtn(BRAND.muted), opacity: iIdx === section.items.length - 1 ? 0.3 : 1 }} onClick={() => moveQuestionDown(section.id, iIdx)}>↓</button>
                          <button title="Remove" style={{ ...S.iconBtn(BRAND.red), opacity: section.items.length <= 1 ? 0.3 : 1 }} onClick={() => section.items.length > 1 && removeQuestion(section.id, iIdx)}>✕</button>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add question */}
                  <div style={{ padding: "14px 18px", background: "#f0f9ff", borderTop: `1px solid ${BRAND.border}` }}>
                    <div style={{ fontSize: 11, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", color: BRAND.coral, fontWeight: "bold", marginBottom: 8 }}>
                      Add Question
                    </div>
                    <textarea
                      style={{ ...S.textArea, minHeight: 50, marginBottom: 8, background: BRAND.white }}
                      placeholder="Type a new competency question and click Add..."
                      value={newQuestions[section.id] || ""}
                      onChange={e => setNewQuestions(p => ({ ...p, [section.id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) addQuestion(section.id); }}
                    />
                    <button style={S.primaryBtn} onClick={() => addQuestion(section.id)}>+ Add Question</button>
                    <span style={{ marginLeft: 10, fontSize: 11, color: BRAND.muted, fontFamily: "sans-serif" }}>or Cmd/Ctrl + Enter</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add section */}
        <button
          onClick={addSection}
          style={{ width: "100%", padding: "14px", border: `2px dashed ${BRAND.border}`, borderRadius: 10, background: "transparent", color: BRAND.muted, fontSize: 14, fontFamily: "sans-serif", cursor: "pointer", marginTop: 4 }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = BRAND.red; e.currentTarget.style.color = BRAND.red; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.muted; }}
        >
          + Add New Section
        </button>
      </div>
    </div>
  );
}

// ─── Main Evaluator App ────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("cover");
  const [sections, setSections] = useState(JSON.parse(JSON.stringify(DEFAULT_SECTIONS)));
  const [employeeName, setEmployeeName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [evaluatorName, setEvaluatorName] = useState("");
  const [ratings, setRatings] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [completedDate] = useState(new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));

  const totalItems = sections.reduce((a, s) => a + s.items.length, 0);
  const ratedCount = Object.keys(ratings).length;

  const setRating = (sectionId, itemIdx, level) =>
    setRatings(prev => ({ ...prev, [`${sectionId}-${itemIdx}`]: level }));
  const getRating = (sectionId, itemIdx) => ratings[`${sectionId}-${itemIdx}`] || null;

  const sectionAvg = (section) => {
    const scores = section.items.map((_, i) => {
      const r = getRating(section.id, i);
      return r ? LEVELS[r].score : null;
    }).filter(Boolean);
    return scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  };

  const sectionComplete = (section) => section.items.every((_, i) => getRating(section.id, i));

  const overallAvg = () => {
    const all = Object.values(ratings).map(r => LEVELS[r].score);
    return all.length ? all.reduce((a, b) => a + b, 0) / all.length : 0;
  };

  const readiness = getReadiness(overallAvg());

  const handleStart = (name, title) => {
    setEmployeeName(name);
    setJobTitle(title);
    setActiveSection(sections[0]?.id || null);
    setRatings({});
    setScreen("eval");
  };

  const handleSectionsChange = (updated) => {
    setSections(updated);
    // Clean up ratings for removed items
    const validKeys = new Set(updated.flatMap(s => s.items.map((_, i) => `${s.id}-${i}`)));
    setRatings(prev => Object.fromEntries(Object.entries(prev).filter(([k]) => validKeys.has(k))));
  };

  const handleEmailSummary = () => {
    const avg = overallAvg();
    const designation = avg > 0 ? getReadiness(avg).label : "Incomplete";
    let body = `PROMOTION READINESS SUMMARY\n${"=".repeat(50)}\n\n`;
    body += `Employee: ${employeeName}\nRole: ${jobTitle}\nEvaluator: ${evaluatorName || "Not specified"}\nDate Completed: ${completedDate}\n\n`;
    body += `OVERALL SCORE: ${avg.toFixed(2)} / 3.00\nREADINESS DESIGNATION: ${designation}\n\n`;
    body += `SECTION SCORES\n${"-".repeat(40)}\n`;
    sections.forEach(s => {
      const a = sectionAvg(s);
      body += `${s.id}. ${s.title}\n   Score: ${a > 0 ? a.toFixed(2) : "—"} / 3.00  (${a > 0 ? getLevelLabel(a) : "Not rated"})\n`;
    });
    body += `\nScoring: Beginner=1pt  Intermediate=2pts  Master=3pts`;
    window.location.href = `mailto:?subject=${encodeURIComponent(`Promotion Readiness – ${employeeName} – ${jobTitle}`)}&body=${encodeURIComponent(body)}`;
  };

  if (screen === "cover") return <CoverPage onStart={handleStart} onSettings={() => setScreen("settings")} />;
  if (screen === "settings") return <SettingsPanel sections={sections} onChange={handleSectionsChange} onBack={() => setScreen("cover")} />;

  const current = sections.find(s => s.id === activeSection) || sections[0];

  const S = {
    app: { fontFamily: "'Georgia', serif", background: BRAND.offWhite, minHeight: "100vh", color: BRAND.black },
    topBar: { height: 4, background: `linear-gradient(90deg, ${BRAND.red}, ${BRAND.coral})` },
    header: { background: BRAND.black, color: BRAND.white, padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" },
    logo: { width: 34, height: 34, background: `linear-gradient(135deg, ${BRAND.red}, ${BRAND.coral})`, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: 16, fontFamily: "serif", flexShrink: 0 },
    layout: { display: "flex", minHeight: "calc(100vh - 76px)" },
    sidebar: { width: 250, background: "#1a1c1b", padding: "18px 0", flexShrink: 0 },
    sidebarLabel: { fontFamily: "sans-serif", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#4b5563", padding: "0 16px 10px" },
    navItem: (active, complete) => ({
      display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", cursor: "pointer",
      background: active ? "#2a1215" : "transparent",
      borderLeft: `3px solid ${active ? BRAND.red : "transparent"}`,
      color: active ? BRAND.white : complete ? "#6b7280" : "#4b5563",
    }),
    navDot: (active, complete) => ({
      width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
      background: active ? BRAND.red : complete ? "#2d3530" : "#252827",
      color: active ? BRAND.white : complete ? BRAND.coral : "#4b5563",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 10, fontWeight: "bold", fontFamily: "monospace",
    }),
    navTitle: { fontSize: 11, fontFamily: "sans-serif", lineHeight: 1.3 },
    divider: { height: 1, background: "#252827", margin: "10px 16px" },
    main: { flex: 1, padding: "26px 32px", maxWidth: 820 },
    sectionCard: { background: BRAND.white, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", overflow: "hidden" },
    itemRow: (idx) => ({ display: "flex", alignItems: "center", gap: 14, padding: "13px 24px", background: idx % 2 === 0 ? BRAND.white : "#fafaf9", borderBottom: `1px solid ${BRAND.border}` }),
    levelBtn: (active, key) => ({
      padding: "5px 11px", borderRadius: 20,
      border: `1.5px solid ${active ? LEVELS[key].color : BRAND.border}`,
      background: active ? LEVELS[key].bg : BRAND.white,
      color: active ? LEVELS[key].accent : "#9ca3af",
      fontSize: 11, fontWeight: active ? "bold" : "normal",
      cursor: "pointer", fontFamily: "sans-serif", whiteSpace: "nowrap",
    }),
    btn: (primary) => ({
      padding: "10px 20px", borderRadius: 6, border: "none",
      background: primary ? BRAND.red : "#e5e7eb",
      color: primary ? BRAND.white : "#6b7280",
      fontSize: 13, cursor: "pointer", fontFamily: "sans-serif", fontWeight: "bold",
    }),
    summaryCard: { background: BRAND.white, borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", padding: 24, marginBottom: 14 },
  };

  return (
    <div style={S.app}>
      <style>{`@media print { .no-print { display: none !important; } .print-only { display: block !important; } } .print-only { display: none; }`}</style>
      <div style={S.topBar} />
      <div style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src={LOGO_URI} alt="Soarion Credit Union" style={{ height: 32, width: "auto", objectFit: "contain", mixBlendMode: "screen" }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: "bold" }}>Promotion Readiness Evaluator</div>
            <div style={{ fontSize: 11, color: "#9ca3af", fontFamily: "sans-serif", letterSpacing: "0.05em" }}>
              {employeeName && <><strong style={{ color: "#d1d5db" }}>{employeeName}</strong> · </>}
              {jobTitle && <span style={{ color: BRAND.coral }}>{jobTitle}</span>}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 20, fontWeight: "bold", fontFamily: "monospace" }}>{ratedCount}/{totalItems}</div>
            <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Rated</div>
          </div>
          <button className="no-print" onClick={() => setScreen("settings")} title="Settings" style={{ background: "#252827", border: "none", color: "#9ca3af", cursor: "pointer", padding: "8px 12px", borderRadius: 6, fontSize: 16 }}>⚙</button>
        </div>
      </div>

      <div style={S.layout}>
        <div style={S.sidebar}>
          <div style={S.sidebarLabel}>Competency Areas</div>
          {sections.map((s, idx) => {
            const complete = sectionComplete(s);
            const active = s.id === activeSection && screen === "eval";
            return (
              <div key={s.id} style={S.navItem(active, complete)} onClick={() => { setActiveSection(s.id); setScreen("eval"); }}>
                <div style={S.navDot(active, complete)}>{complete ? "✓" : idx + 1}</div>
                <div style={S.navTitle}>{s.title}</div>
              </div>
            );
          })}
          <div style={S.divider} />
          <div style={S.navItem(screen === "summary", false)} onClick={() => setScreen("summary")}>
            <div style={S.navDot(screen === "summary", false)}>◎</div>
            <div style={S.navTitle}>Summary & Recommendation</div>
          </div>
        </div>

        <div style={S.main}>
          {/* Eval view */}
          {screen === "eval" && current && (
            <>
              <div style={{ display: "flex", gap: 12, marginBottom: 18, alignItems: "center" }} className="no-print">
                <input style={{ padding: "8px 12px", border: `1.5px solid ${BRAND.border}`, borderRadius: 6, fontSize: 13, fontFamily: "'Georgia', serif", color: BRAND.black, outline: "none", minWidth: 180, background: BRAND.white }} placeholder="Evaluator Name" value={evaluatorName} onChange={e => setEvaluatorName(e.target.value)} />
                <span style={{ marginLeft: "auto", fontSize: 12, color: "#9ca3af", fontFamily: "sans-serif" }}>{Math.round((ratedCount / totalItems) * 100)}% complete</span>
              </div>
              <div style={S.sectionCard}>
                <div style={{ background: BRAND.black, padding: "16px 24px", borderBottom: `3px solid ${BRAND.red}` }}>
                  <div style={{ fontSize: 16, fontWeight: "bold", color: BRAND.white }}>
                    {sections.findIndex(s => s.id === current.id) + 1}. {current.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 4, fontFamily: "sans-serif" }}>
                    {current.items.filter((_, i) => getRating(current.id, i)).length} of {current.items.length} rated
                    {sectionAvg(current) > 0 && ` · Avg: ${sectionAvg(current).toFixed(2)} — ${getLevelLabel(sectionAvg(current))}`}
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, padding: "7px 24px", background: "#f9fafb", borderBottom: `1px solid ${BRAND.border}` }}>
                  {Object.entries(LEVELS).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontFamily: "sans-serif", color: v.accent }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: v.color }} />{v.label}
                    </div>
                  ))}
                </div>
                {current.items.map((item, i) => {
                  const rated = getRating(current.id, i);
                  return (
                    <div key={i} style={S.itemRow(i)}>
                      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.55, color: "#374151" }}>{item}</div>
                      <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                        {Object.keys(LEVELS).map(k => (
                          <button key={k} style={S.levelBtn(rated === k, k)} onClick={() => setRating(current.id, i, k)}>{LEVELS[k].label}</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }} className="no-print">
                <button style={S.btn(false)} disabled={sections.findIndex(s => s.id === activeSection) === 0} onClick={() => { const idx = sections.findIndex(s => s.id === activeSection); if (idx > 0) setActiveSection(sections[idx - 1].id); }}>← Previous</button>
                {sections.findIndex(s => s.id === activeSection) < sections.length - 1
                  ? <button style={S.btn(true)} onClick={() => { const idx = sections.findIndex(s => s.id === activeSection); setActiveSection(sections[idx + 1].id); }}>Next Section →</button>
                  : <button style={S.btn(true)} onClick={() => setScreen("summary")}>View Summary →</button>}
              </div>
            </>
          )}

          {/* Summary view */}
          {screen === "summary" && (
            <>
              <div className="print-only" style={{ marginBottom: 12, fontSize: 12, fontFamily: "sans-serif", color: BRAND.muted }}>
                Completed: {completedDate} · Evaluator: {evaluatorName || "Not specified"}
              </div>
              <div style={S.summaryCard}>
                <div style={{ fontSize: 10, fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 10 }}>Overall Readiness Assessment</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 30, background: readiness.bg, color: readiness.color, fontWeight: "bold", fontSize: 18, marginBottom: 14 }}>
                  <span>{readiness.icon}</span><span>{readiness.label}</span>
                  <span style={{ fontFamily: "monospace", fontSize: 14, opacity: 0.8 }}>({overallAvg().toFixed(2)} / 3.00)</span>
                </div>
                <ScoreBar value={overallAvg()} />
                <div style={{ marginTop: 12, fontSize: 12, color: BRAND.muted, fontFamily: "sans-serif" }}>
                  <strong>Employee:</strong> {employeeName} &nbsp;·&nbsp; <strong>Role:</strong> {jobTitle}
                  {evaluatorName && <> &nbsp;·&nbsp; <strong>Evaluator:</strong> {evaluatorName}</>}
                </div>
              </div>

              <div style={S.summaryCard}>
                <div style={{ fontSize: 10, fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 14 }}>Section Scores</div>
                {sections.map(s => {
                  const avg = sectionAvg(s);
                  return (
                    <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{ fontSize: 12, fontFamily: "sans-serif", color: "#6b7280", width: 220, flexShrink: 0 }}>{sections.indexOf(s) + 1}. {s.title}</div>
                      <div style={{ flex: 1 }}><ScoreBar value={avg} /></div>
                      <div style={{ fontFamily: "monospace", fontSize: 12, color: avg >= 2.6 ? BRAND.red : avg >= 2.0 ? BRAND.coral : "#9ca3af", width: 36, textAlign: "right" }}>{avg > 0 ? avg.toFixed(2) : "—"}</div>
                      <div style={{ fontSize: 11, fontFamily: "sans-serif", fontWeight: "bold", color: avg >= 2.6 ? BRAND.red : avg >= 2.0 ? BRAND.coral : "#9ca3af", width: 80, textAlign: "right", textTransform: "uppercase", letterSpacing: "0.04em" }}>{avg > 0 ? getLevelLabel(avg) : "—"}</div>
                    </div>
                  );
                })}
              </div>

              <div style={S.summaryCard}>
                <div style={{ fontSize: 10, fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 14 }}>Rating Distribution</div>
                <div style={{ display: "flex", gap: 14 }}>
                  {Object.entries(LEVELS).reverse().map(([k, v]) => {
                    const count = Object.values(ratings).filter(r => r === k).length;
                    return (
                      <div key={k} style={{ flex: 1, textAlign: "center", padding: 16, background: v.bg, borderRadius: 8, border: `1px solid ${v.color}33` }}>
                        <div style={{ fontSize: 28, fontWeight: "bold", color: v.accent, fontFamily: "monospace" }}>{count}</div>
                        <div style={{ fontSize: 10, color: v.accent, fontFamily: "sans-serif", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{v.label}</div>
                        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{Math.round((count / totalItems) * 100)}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={S.summaryCard}>
                <div style={{ fontSize: 10, fontFamily: "sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", marginBottom: 14 }}>Promotion Thresholds</div>
                {[
                  { label: "Strong Promotion Candidate", range: "2.6 – 3.0", desc: "Master-level across most competencies. Independently driving analytics and influencing cross-functional teams.", c: BRAND.red, bg: BRAND.lightRed, min: 2.6, max: 3.01 },
                  { label: "Promotion Ready", range: "2.0 – 2.5", desc: "Solid Intermediate-to-Master performance with minimal guidance needed.", c: "#1d6c3a", bg: "#dcfce7", min: 2.0, max: 2.6 },
                  { label: "Developing", range: "1.5 – 1.9", desc: "Progress evident but targeted development plan recommended before re-evaluation.", c: "#92400e", bg: "#fef3c7", min: 1.5, max: 2.0 },
                  { label: "Not Yet Ready", range: "< 1.5", desc: "Significant gaps remain. Structured development and mentoring required.", c: "#7f1d1d", bg: "#fee2e2", min: 0, max: 1.5 },
                ].map(t => {
                  const avg = overallAvg();
                  const active = avg > 0 && avg >= t.min && avg < t.max;
                  return (
                    <div key={t.label} style={{ display: "flex", gap: 14, padding: "11px 15px", borderRadius: 8, background: active ? t.bg : "#f9fafb", marginBottom: 8, border: `2px solid ${active ? t.c + "55" : "transparent"}` }}>
                      <div style={{ fontFamily: "monospace", fontSize: 12, color: t.c, fontWeight: "bold", minWidth: 68 }}>{t.range}</div>
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: 13, color: t.c, fontFamily: "sans-serif" }}>{t.label}</div>
                        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{t.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="no-print" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button style={S.btn(false)} onClick={() => { setActiveSection(sections[0]?.id); setScreen("eval"); }}>← Back to Evaluation</button>
                <div style={{ flex: 1 }} />
                <button style={{ ...S.btn(false), display: "flex", alignItems: "center", gap: 6 }} onClick={handleEmailSummary}>✉ Email Summary</button>
                <button style={{ ...S.btn(true), background: BRAND.black, display: "flex", alignItems: "center", gap: 6 }} onClick={() => window.print()}>⎙ Print Summary</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
