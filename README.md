# KSL Business Solutions — Website

Official website for **KSL Business Solutions Sdn. Bhd.**  
Built with React + Vite.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 📁 Project Structure

```
ksl-site/
├── index.html                    ← HTML entry point
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx                  ← React root mount
    ├── App.jsx                   ← Main layout — assembles all sections
    ├── styles/
    │   └── global.css            ← CSS variables, resets, responsive breakpoints
    ├── constants/
    │   └── contact.js            ← ⭐ Contact info (phone, email, address, WhatsApp)
    ├── assets/                   ← ⭐ All static files — images, logos, icons
    │   ├── assets.js             ← ⭐ Central asset registry (edit paths here)
    │   ├── logos/
    │   │   ├── ksl_logo.png      ← Main company logo
    │   │   └── partners/
    │   │       ├── mdot.png          ← [ Replace with real logo ]
    │   │       ├── alfex.png         ← [ Replace with real logo ]
    │   │       ├── autocount.png     ← [ Replace with real logo ]
    │   │       ├── sitegiant.png     ← [ Replace with real logo ]
    │   │       └── superprintz.png   ← [ Replace with real logo ]
    │   └── images/
    │       ├── case-networking.jpg   ← [ Replace with real project photo ]
    │       └── case-plugin.jpg       ← [ Replace with real project photo ]
    └── components/
        ├── ParticleBackground.jsx ← Canvas particle animation + mouse interaction
        ├── Nav.jsx                ← Fixed header (hidden on hero, appears on scroll)
        ├── Hero.jsx               ← Full-screen hero with particle BG + pause button
        ├── Stats.jsx              ← Key numbers bar
        ├── Partners.jsx           ← Partner logo strip (with placeholders)
        ├── Services.jsx           ← 6-card services grid
        ├── CaseStudies.jsx        ← 2 case study cards
        ├── Products.jsx           ← 4-card product grid
        ├── Careers.jsx            ← Join the team CTA
        ├── Footer.jsx             ← Full footer with contact details
        └── ContactModal.jsx       ← Popup with WhatsApp / Email / Facebook buttons
```

---

## ✏️ How to Update Content

### Contact Information
Edit **one file** — `src/constants/contact.js`:
```js
export const CONTACT = {
  address:  "No. 9, 2nd Floor, Taman Zabidin, ...",
  email:    "Support@ksleow.com.my",
  phone:    "017-905 2323",
  whatsapp: "60179052323",
  facebook: "https://www.facebook.com/ksleowbs",
};
```
All components (Nav, Footer, Modal) automatically use these values.

### Replace Partner Logos
1. Drop the real logo PNG/SVG into `src/assets/logos/partners/`
2. Name it exactly as shown in the folder structure (e.g. `mdot.png`)
3. Done — the `Partners` component will automatically display the image

### Replace Case Study Photos
1. Drop the photo into `src/assets/images/`
2. Name it `case-networking.jpg` or `case-plugin.jpg`
3. The placeholder icon disappears automatically

### Replace the Main Logo
Swap out `src/assets/logos/ksl_logo.png` with the new file (keep the same filename).

### Add / Remove Services
Edit the `SERVICES` array at the top of `src/components/Services.jsx`.

### Add / Remove Products
Edit the `PRODUCTS` array at the top of `src/components/Products.jsx`.

---

## 🎨 Theme Colors

All colors are defined as CSS variables in `src/styles/global.css`:

| Variable        | Value     | Used for              |
|-----------------|-----------|------------------------|
| `--brand`       | `#2f315a` | Primary navy blue      |
| `--brand-light` | `#3d4075` | Hover states           |
| `--gold`        | `#c9a84c` | Accent / labels        |
| `--gold-light`  | `#e8c97a` | Hero tagline text      |
| `--white`       | `#ffffff` | Backgrounds            |
| `--light-bg`    | `#f5f5f8` | Section alternates     |
| `--muted`       | `#6b6f91` | Body / secondary text  |

---

## 🌐 Deployment

This site builds to a standard static bundle.  
Compatible with: **GitHub Pages**, **Netlify**, **Vercel**, **any static host**.

```bash
npm run build
# Output folder: dist/
```

For GitHub Pages, set the base in `vite.config.js`:
```js
export default defineConfig({
  base: "/your-repo-name/",
  plugins: [react()],
});
```
