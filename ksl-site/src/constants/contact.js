/**
 * contact.js — Company contact information
 * -----------------------------------------
 * Update these values to change contact details across the whole site.
 */

export const CONTACT = {
  address:   "No. 9, 2nd Floor, Taman Zabidin, Jalan Temerloh, 28400. Mentakab, Malaysia.",
  email:     "Support@ksleow.com.my",
  phone:     "017-905 2323",
  whatsapp:  "60179052323",
  facebook:  "https://www.facebook.com/ksleowbs",
  linkedin:  "",   // add LinkedIn URL here when available
};

export const WA_MSG = encodeURIComponent(
  "Hi, I would like to learn more about KSL Business Solutions. Thank you."
);

export const WA_LINK = `https://wa.me/${CONTACT.whatsapp}?text=${WA_MSG}`;
