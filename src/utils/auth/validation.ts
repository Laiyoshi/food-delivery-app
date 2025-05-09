export const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhoneValid = (phone: string) =>
  /^\+?[78]\d{10}$/.test(phone.replace(/\D/g, ""));

export const isCardValid = (card: string) =>
  /^\d{16}$/.test(card.replace(/\s+/g, ""));

export const isNameValid = (name: string) => name.trim().length <= 30;

export const isPasswordValid = (password: string) => password.length >= 6;