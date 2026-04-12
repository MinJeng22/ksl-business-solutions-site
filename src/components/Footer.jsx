import { LOGO } from "../assets/assets.js";
import { CONTACT, WA_LINK } from "../constants/contact.js";

export default function Footer({ onContact }) {
  const linkStyle = {
    display: "block", fontSize: "0.82rem", color: "#6b6f91",
    lineHeight: 2, textDecoration: "none", transition: "color 0.2s",
  };

  return (
    <>
      <footer style={{
        background: "#ffffff",
        borderTop: "0.5px solid rgba(47,49,90,0.1)",
        padding: "3.5rem 4vw",
        display: "grid",
        gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr",
        gap: "2rem",
      }}>
        {/* Brand */}
        <div>
          <img src={LOGO} alt="KSL Business Solutions" style={{ height: 46, objectFit: "contain", marginBottom: "1rem" }} />
          <p style={{ fontSize: "0.82rem", color: "#6b6f91", lineHeight: 1.78 }}>
            KSL Business Solutions Sdn. Bhd.<br />
            Pahang's leading AutoCount Authorized Dealer — delivering software, training, IT networking, and plugin development.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "0.72rem", fontWeight: 600, color: "#2f315a", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.9rem" }}>Contact</h4>
          <p style={{ fontSize: "0.82rem", color: "#6b6f91", lineHeight: 1.85 }}>
            {CONTACT.address}
          </p>
          <div style={{ marginTop: "0.6rem" }}>
            <a href={`tel:${CONTACT.phone}`} style={linkStyle} onMouseOver={e => e.currentTarget.style.color = "#2f315a"} onMouseOut={e => e.currentTarget.style.color = "#6b6f91"}>
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} style={linkStyle} onMouseOver={e => e.currentTarget.style.color = "#2f315a"} onMouseOut={e => e.currentTarget.style.color = "#6b6f91"}>
              {CONTACT.email}
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ fontSize: "0.72rem", fontWeight: 600, color: "#2f315a", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.9rem" }}>Services</h4>
          {["AutoCount Software", "Technical Services", "Professional Training", "IT Hardware & Networking", "Plugin Development", "FeedMe POS Support"].map(s => (
            <span key={s} style={{ display: "block", fontSize: "0.82rem", color: "#6b6f91", lineHeight: 2 }}>{s}</span>
          ))}
        </div>

        {/* Social */}
        <div>
          <h4 style={{ fontSize: "0.72rem", fontWeight: 600, color: "#2f315a", textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: "0.9rem" }}>Follow Us</h4>
          <a href={CONTACT.facebook} target="_blank" rel="noreferrer" style={linkStyle} onMouseOver={e => e.currentTarget.style.color = "#2f315a"} onMouseOut={e => e.currentTarget.style.color = "#6b6f91"}>
            Facebook
          </a>
          <a href={WA_LINK} target="_blank" rel="noreferrer" style={linkStyle} onMouseOver={e => e.currentTarget.style.color = "#2f315a"} onMouseOut={e => e.currentTarget.style.color = "#6b6f91"}>
            WhatsApp
          </a>
        </div>
      </footer>

      <div style={{ background: "#ffffff", borderTop: "0.5px solid rgba(47,49,90,0.08)", padding: "1rem 4vw", textAlign: "center", fontSize: "0.75rem", color: "#6b6f91" }}>
        © {new Date().getFullYear()} KSL Business Solutions Sdn. Bhd. All rights reserved.
      </div>
    </>
  );
}
