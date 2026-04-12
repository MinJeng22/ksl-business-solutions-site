/**
 * assets.js — Centralized asset registry
 * ----------------------------------------
 * All images and logos are imported here.
 * To replace an asset: swap the file in the correct folder, keep the filename.
 * To rename a file: update only the import path below.
 *
 * Folder layout:
 *   src/assets/logos/           → company logo
 *   src/assets/logos/partners/  → partner logos (replace placeholders)
 *   src/assets/images/          → case study photos (replace placeholders)
 */

/* ── Company Logo ── */
import kslLogo from "./logos/ksl_logo.png";
export const LOGO = kslLogo;

/* ── Partner Logos ── */
import mdot        from "./logos/partners/mdot.png";
import alfex       from "./logos/partners/alfex.png";
import autocount   from "./logos/partners/autocount.png";
import sitegiant   from "./logos/partners/sitegiant.png";
import superprintz from "./logos/partners/superprintz.png";

export const PARTNER_LOGOS = {
  mdot,
  alfex,
  autocount,
  sitegiant,
  superprintz,
};

/* ── Case Study Images ── */
import caseNetworking from "./images/case-networking.jpg";
import casePlugin     from "./images/case-plugin.jpg";

export const CASE_IMAGES = {
  networking: caseNetworking,
  plugin:     casePlugin,
};
