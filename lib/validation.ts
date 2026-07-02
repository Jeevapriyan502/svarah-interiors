const GMAIL_REGEX =
  /^[a-zA-Z0-9](?:[a-zA-Z0-9._+-]{0,62}[a-zA-Z0-9])?@gmail\.com$/i;

const INDIAN_PHONE_REGEX = /^(\+91|91|0)?[6-9]\d{9}$/;

export function normalizePhone(phone: string) {
  return phone.replace(/[\s\-().]/g, "");
}

export function isValidGmail(email: string) {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || trimmed.length > 254) return false;
  return GMAIL_REGEX.test(trimmed);
}

export function isValidIndianPhone(phone: string) {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;
  return INDIAN_PHONE_REGEX.test(normalized);
}

export function formatIndianPhone(phone: string) {
  const normalized = normalizePhone(phone).replace(/^(\+91|91|0)/, "");
  return normalized.length === 10 ? `+91 ${normalized}` : phone.trim();
}

export const validationMessages = {
  gmail: "Please enter a valid Gmail address (example@gmail.com).",
  phone:
    "Please enter a valid 10-digit Indian mobile number (e.g. 9025331605 or +91 9025331605).",
};
