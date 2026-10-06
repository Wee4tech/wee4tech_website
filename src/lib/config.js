// Override with REACT_APP_API_BASE_URL in a .env file when needed.
export const API_BASE =
  process.env.REACT_APP_API_BASE_URL || "https://roshanbags.com/EcommerceAPI";

// NOTE: sign-in is checked in the browser only (same behaviour as before).
// Real protection must come from the API (token required on GetContactus / GetCareersApplied).
export const ADMIN_EMAIL = "it@wee4techsolutions.com";

// Friendly names for the websites that post to the shared Contact Us API.
// Key = hostname (without www.). Add new sites here.
export const SITE_LABELS = {
  "wee4techsolutions.com": "Wee4 Tech Solutions",
  "3drendershop.com": "3D Render Shop",
};

export const SITE_COLORS = {
  "wee4techsolutions.com": "blue",
  "3drendershop.com": "cyan",
};
