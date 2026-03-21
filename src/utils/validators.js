export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!email.includes("@")) return "Invalid email";
  return null;
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.{8,})/;
  if (!password) return "Password is required";
  if (!regex.test(password)) {
    return "Password must have uppercase, lowercase, symbol, and be at least 8 characters long.";
  }
  return null;
};

export const validateFullName = (fullname) => {
  if (!fullname) return "Full name is required";
  return null;
};
