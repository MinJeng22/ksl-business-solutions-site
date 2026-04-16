import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { WA_LINK } from "../../constants/contact.js";
import AIChatbot from "../../components/AIChatbot.jsx";

/* ══════════════════════════════════════════════════════════════
 * SALES2DO PLUGIN — CASE STUDY PAGE
 *
 * IMAGE SLOTS
 * ───────────
 * All images are referenced via IMAGE_SLOTS below.
 * To replace a placeholder:
 *   1. Drop your file into  src/assets/images/cases/sales2do/
 *   2. Update the src value here (use a Vite import or relative URL)
 *
 * Current slots:
 *   workflowDiagram  — Plugin Purpose workflow diagram
 *   step2            — Plug-in Manager screenshot
 *   step3            — Install button screenshot
 *   step4            — Plug-in info window screenshot
 *   step6            — Navigation bar with new plugin listed
 *   copy1            — Right-click menu screenshot
 *   copy2            — Copy To icon screenshot
 *   copy3            — Copy From icon in DO Entry screenshot
 * ══════════════════════════════════════════════════════════════ */
const IMAGE_SLOTS = {
  workflowDiagram: null,
  step2:  null,
  step3:  null,
  step4:  null,
  step6:  null,
  copy1:  null,
  copy2:  null,
  copy3:  null,
};

/* Shared styles */
const S = {
  label: {
    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.5rem",
  },
  h2: {
    fontSize: "clamp(1.4rem, 2.6vw, 2rem)", fontWeight: 700,
    color: "#2f315a", lineHeight: 1.2, marginBottom: "1rem",
  },
  h3: {
    fontSize: "1rem", fontWeight: 700, color: "#2f315a", marginBottom: "0.5rem",
  },
  body: {
    fontSize: "0.92rem", color: "#555", lineHeight: 1.82,
  },
  section: {
    padding: "4rem 0", borderBottom: "0.5px solid rgba(47,49,90,0.08)",
  },
  imgSlot: (src) => ({
    width: "100%",
    borderRadius: 12,
    border: "1px solid rgba(47,49,90,0.1)",
    overflow: "hidden",
    background: src ? "transparent" : "#f0f0f5",
    minHeight: src ? "auto" : 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "0.5rem",
  }),
};

function ImgSlot({ src, alt, caption }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={S.imgSlot(src)}>
        {src
          ? <img src={src} alt={alt || ""} style={{ width: "100%", display: "block", borderRadius: 12 }} />
          : <div style={{ padding: "2rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", opacity: 0.3, marginBottom: "0.5rem" }}>🖼️</div>
              <div style={{ fontSize: "0.75rem", color: "#a8abcc", fontWeight: 500 }}>
                {alt || "Screenshot placeholder"}
              </div>
            </div>
        }
      </div>
      {caption && <p style={{ fontSize: "0.78rem", color: "#a8abcc", textAlign: "center", fontStyle: "italic" }}>{caption}</p>}
    </div>
  );
}

function StepBadge({ n }) {
  return (
    <div style={{
      width: 30, height: 30, borderRadius: "50%",
      background: "#2f315a", color: "#ffffff",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      fontSize: "0.8rem", fontWeight: 700, flexShrink: 0, marginRight: "0.75rem",
    }}>{n}</div>
  );
}

export default function Sales2DOPage({ onContact }) {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, []);

  const [licenseTab, setLicenseTab] = useState("online"); // "online" | "offline"

  return (
    <div style={{ background: "#f5f5f8", minHeight: "100vh" }}>

      {/* ── Hero banner ── */}
      <div style={{ background: "#2f315a", paddingTop: "7rem", paddingBottom: "4rem" }}>
        <div className="content-wrap">
          <button
            onClick={() => navigate(-1)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.75)", padding: "0.4rem 1rem", borderRadius: 50,
              fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
              marginBottom: "2rem", transition: "background 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
            onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
          >
            ← Back
          </button>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
            {/* Icon */}
            <div style={{
              width: 76, height: 76, borderRadius: 18,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2rem", flexShrink: 0,
            }}>
              🔌
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.5rem" }}>
                Case Study · AutoCount Plugin Development
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#ffffff", lineHeight: 1.15, marginBottom: "0.9rem" }}>
                Sales2DO Plugin
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.78, maxWidth: 580, marginBottom: "1.5rem" }}>
                A custom AutoCount Accounting plugin that enables businesses operating on a Sales-to-DO workflow to generate Delivery Orders directly from Invoices or Cash Sales.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button
                  onClick={onContact}
                  style={{ background: "#c9a84c", color: "#1e2040", padding: "0.72rem 1.9rem", borderRadius: 50, fontSize: "0.9rem", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseOut={e => e.currentTarget.style.opacity = "1"}
                >
                  Enquire About This Plugin
                </button>
                <a href={WA_LINK} target="_blank" rel="noreferrer"
                  style={{ background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.25)", padding: "0.72rem 1.9rem", borderRadius: 50, fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", transition: "background 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.18)"}
                  onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Demo Video ── */}
      <div style={{ background: "#ffffff", ...S.section }}>
        <div className="content-wrap">
          <div style={S.label}>Watch the Demo</div>
          <h2 style={S.h2}>Watch the Demo Video</h2>
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 48px rgba(47,49,90,0.12)", border: "1px solid rgba(47,49,90,0.08)" }}>
            <div style={{ paddingBottom: "56.25%", position: "relative", background: "#0f1128" }}>
              {/* Replace the src URL below with the real Sales2DO demo video embed URL */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.35)", gap: "0.75rem",
              }}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="rgba(255,255,255,0.2)"><polygon points="5,3 19,12 5,21"/></svg>
                <div style={{ fontSize: "0.82rem", fontWeight: 500 }}>Demo video coming soon</div>
                <div style={{ fontSize: "0.72rem", opacity: 0.5 }}>Replace iframe src with the real video URL</div>
              </div>
              {/* Uncomment and replace URL when ready:
              <iframe
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Sales2DO Plugin Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
              /> */}
            </div>
          </div>
        </div>
      </div>

      {/* ── Plugin Purpose ── */}
      <div style={{ background: "#f5f5f8", ...S.section }}>
        <div className="content-wrap">
          <div style={S.label}>Overview</div>
          <h2 style={S.h2}>Plugin Purpose</h2>

          <div className="case-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "start" }}>
            <div>
              <p style={S.body}>
                In AutoCount Accounting's standard business workflow, the process typically flows from
                <strong> Delivery Orders (DO)</strong> to <strong>Sales</strong> (Invoices or Cash Sales).
              </p>
              <p style={{ ...S.body, marginTop: "1rem" }}>
                However, for companies that operate with a <strong>Sales-to-DO workflow</strong>, the
                Sales2DO plugin bridges this gap. It enables users to generate a DO directly from
                existing Invoices or Cash Sales via integrated <em>"Copy to DO"</em> and{" "}
                <em>"Copy from Invoice/Cash Sale"</em> functions.
              </p>
            </div>
            <ImgSlot
              src={IMAGE_SLOTS.workflowDiagram}
              alt="Sales2DO workflow diagram"
              caption="Figure 1 — Sales → DO workflow enabled by the Sales2DO plugin"
            />
          </div>
        </div>
      </div>

      {/* ── Install the Plugin ── */}
      <div style={{ background: "#ffffff", ...S.section }}>
        <div className="content-wrap">
          <div style={S.label}>Setup</div>
          <h2 style={S.h2}>Install the Plugin</h2>

          {/* Step 1 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "2rem" }}>
            <StepBadge n={1} />
            <p style={{ ...S.body, paddingTop: 4 }}>
              Install the <strong>Sales2DO.app</strong> plugin file (provided by KSL Business Solutions).
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <StepBadge n={2} />
              <p style={{ ...S.body, paddingTop: 4 }}>
                Open AutoCount Accounting and log in to the account book. Navigate to the
                <strong> Tools</strong> menu in the top navigation bar, then select{" "}
                <strong>Plug-in Manager</strong>.
              </p>
            </div>
            <ImgSlot src={IMAGE_SLOTS.step2} alt="Plug-in Manager in Tools menu" caption="Step 2 — Tools → Plug-in Manager" />
          </div>

          {/* Step 3 */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <StepBadge n={3} />
              <p style={{ ...S.body, paddingTop: 4 }}>
                In the Plug-in Manager window, click the <strong>Install</strong> button on the right-hand side.
                A file browser will appear. Locate and select the <strong>Sales2DO.app</strong> plugin file,
                then open it.
              </p>
            </div>
            <ImgSlot src={IMAGE_SLOTS.step3} alt="Install button in Plug-in Manager" caption="Step 3 — Click Install and select the .app file" />
          </div>

          {/* Step 4 */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <StepBadge n={4} />
              <p style={{ ...S.body, paddingTop: 4 }}>
                A <strong>Plug-in info</strong> window will pop up. Review the plugin details and click{" "}
                <strong>Install</strong>. If a success message appears, click <strong>OK</strong>.
              </p>
            </div>
            <ImgSlot src={IMAGE_SLOTS.step4} alt="Plug-in info window" caption="Step 4 — Review and confirm installation" />
          </div>

          {/* Step 5 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "2rem" }}>
            <StepBadge n={5} />
            <p style={{ ...S.body, paddingTop: 4 }}>
              <strong>Log out</strong> of AutoCount Accounting completely, then log back in to the account book.
            </p>
          </div>

          {/* Step 6 */}
          <div style={{ marginBottom: "2rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <StepBadge n={6} />
              <p style={{ ...S.body, paddingTop: 4 }}>
                You will see the new plugin listed in the navigation bar.
              </p>
            </div>
            <ImgSlot src={IMAGE_SLOTS.step6} alt="Navigation bar with Sales2DO plugin" caption="Step 6 — Sales2DO now appears in the navigation bar" />
          </div>
        </div>
      </div>

      {/* ── Copy Sales into DO ── */}
      <div style={{ background: "#f5f5f8", ...S.section }}>
        <div className="content-wrap">
          <div style={S.label}>Usage</div>
          <h2 style={S.h2}>Copy Sales into Delivery Order</h2>
          <p style={{ ...S.body, marginBottom: "2rem" }}>
            There are <strong>3 ways</strong> to copy a Sales document into a new Delivery Order:
          </p>

          {/* Method 1 */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#c9a84c", color: "#1e2040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>1</div>
              <h3 style={{ ...S.h3, marginBottom: 0 }}>Via Right-Click Menu</h3>
            </div>
            <p style={{ ...S.body, paddingLeft: "2.15rem" }}>
              Right-click on any Invoice or Cash Sales entry in the listing screen. Select the
              <em> "Copy to DO"</em> option from the context menu.
            </p>
            <ImgSlot src={IMAGE_SLOTS.copy1} alt="Right-click menu with Copy to DO" caption='Method 1 — Right-click → "Copy to DO"' />
          </div>

          {/* Method 2 */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#c9a84c", color: "#1e2040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>2</div>
              <h3 style={{ ...S.h3, marginBottom: 0 }}>Via the "Copy To" Icon in Invoices or Cash Sales</h3>
            </div>
            <p style={{ ...S.body, paddingLeft: "2.15rem" }}>
              Open an Invoice or Cash Sales record. Click the <em>"Copy To"</em> icon in the toolbar
              of the view screen to create a new DO from that document.
            </p>
            <ImgSlot src={IMAGE_SLOTS.copy2} alt="Copy To icon in Invoice view screen" caption='Method 2 — "Copy To" icon in Invoice / Cash Sales view' />
          </div>

          {/* Method 3 */}
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "#c9a84c", color: "#1e2040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0 }}>3</div>
              <h3 style={{ ...S.h3, marginBottom: 0 }}>Via the "Copy From" Icon in the DO Entry Screen</h3>
            </div>
            <p style={{ ...S.body, paddingLeft: "2.15rem" }}>
              While creating a new Delivery Order, click the <em>"Copy From"</em> icon in the DO
              Entry screen. Select the source Invoice or Cash Sales document to import its data.
            </p>
            <ImgSlot src={IMAGE_SLOTS.copy3} alt="Copy From icon in DO Entry screen" caption='Method 3 — "Copy From" icon in the DO Entry screen' />
          </div>
        </div>
      </div>

      {/* ── Plugin Settings ── */}
      <div style={{ background: "#ffffff", ...S.section }}>
        <div className="content-wrap">
          <div style={S.label}>Configuration</div>
          <h2 style={S.h2}>Sales2DO Plugin Settings</h2>

          <div className="case-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {/* Setting 1 */}
            <div style={{ background: "#f5f5f8", borderRadius: 14, padding: "1.4rem", border: "1px solid rgba(47,49,90,0.08)" }}>
              <h3 style={S.h3}>Insert Doc No. in Sales and Delivery Order</h3>
              <p style={S.body}>
                Configure whether the source Sales document number is automatically inserted
                into the corresponding Delivery Order, ensuring clear traceability between records.
              </p>
            </div>
            {/* Setting 2 */}
            <div style={{ background: "#f5f5f8", borderRadius: 14, padding: "1.4rem", border: "1px solid rgba(47,49,90,0.08)" }}>
              <h3 style={S.h3}>Enable Smart Copy Quantity Control</h3>
              <p style={S.body}>
                When enabled, the plugin intelligently tracks previously copied quantities and
                prevents duplicating items that have already been fully transferred to a DO.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Activate Plugin License ── */}
      <div style={{ background: "#f5f5f8", ...S.section }}>
        <div className="content-wrap">
          <div style={S.label}>Activation</div>
          <h2 style={S.h2}>Activate Plugin License</h2>

          {/* Tab switcher */}
          <div style={{ display: "flex", background: "#e8e8f0", borderRadius: 50, padding: 4, gap: 2, marginBottom: "2rem", width: "fit-content" }}>
            {[["online", "Online Activation"], ["offline", "Offline Activation"]].map(([key, label]) => (
              <button key={key}
                onClick={() => setLicenseTab(key)}
                style={{
                  fontSize: "0.82rem", fontWeight: 600,
                  padding: "0.45rem 1.3rem", borderRadius: 50, border: "none",
                  cursor: "pointer", fontFamily: "inherit",
                  background: licenseTab === key ? "#2f315a" : "transparent",
                  color:      licenseTab === key ? "#ffffff" : "#6b6f91",
                  transition: "background 0.2s, color 0.2s",
                }}
              >{label}</button>
            ))}
          </div>

          {licenseTab === "online" && (
            <div style={{ maxWidth: 640 }}>
              <h3 style={S.h3}>Online Activation</h3>
              <p style={{ ...S.body, marginBottom: "1.25rem" }}>
                Ensure your device is connected to the internet, then follow these steps:
              </p>
              {[
                "Open AutoCount Accounting and navigate to the Sales2DO plugin from the navigation bar.",
                "Go to Plugin Settings → License.",
                "Click Activate Online and enter the license key provided by KSL Business Solutions.",
                "Click Submit. The plugin will verify the key and activate automatically.",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#2f315a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                  <p style={S.body}>{step}</p>
                </div>
              ))}
            </div>
          )}

          {licenseTab === "offline" && (
            <div style={{ maxWidth: 640 }}>
              <h3 style={S.h3}>Offline Activation</h3>
              <p style={{ ...S.body, marginBottom: "1.25rem" }}>
                For machines without internet access, use offline activation:
              </p>
              {[
                "Open AutoCount Accounting and navigate to the Sales2DO plugin from the navigation bar.",
                "Go to Plugin Settings → License → Activate Offline.",
                "A unique Machine ID will be displayed. Copy or note this down.",
                "Send the Machine ID to KSL Business Solutions (via WhatsApp or Email).",
                "We will generate an offline activation code and send it back to you.",
                "Enter the activation code in the Offline Activation field and click Confirm.",
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#2f315a", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                  <p style={S.body}>{step}</p>
                </div>
              ))}
              <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", borderRadius: 10, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.25)" }}>
                <p style={{ fontSize: "0.83rem", color: "#6b6f91", lineHeight: 1.65 }}>
                  💡 <strong>Tip:</strong> Contact KSL Business Solutions via WhatsApp at{" "}
                  <a href="https://wa.me/60179052323" target="_blank" rel="noreferrer" style={{ color: "#2f315a", fontWeight: 600 }}>017-905 2323</a>{" "}
                  or email <a href="mailto:dev@ksleow.com.my" style={{ color: "#2f315a", fontWeight: 600 }}>dev@ksleow.com.my</a> for activation assistance.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ background: "#2f315a", padding: "4rem 0" }}>
        <div className="content-wrap" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 700, color: "#ffffff", marginBottom: "0.75rem" }}>
            Interested in the Sales2DO plugin?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto 1.75rem" }}>
            Contact KSL Business Solutions for pricing, installation, and support across Pahang.
          </p>
          <button
            onClick={onContact}
            style={{ background: "#c9a84c", color: "#1e2040", padding: "0.85rem 2.5rem", borderRadius: 50, fontSize: "0.95rem", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s" }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            Enquire Now
          </button>
        </div>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
}
