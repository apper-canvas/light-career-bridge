// Token management
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

// Validation helpers
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Password validation with stronger requirements
export const validatePassword = (password) => {
  // Require at least 8 characters with uppercase, lowercase, number, and special character
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&=#_-])[A-Za-z\d@$!%*?&=#_-]{8,}$/.test(password);
};

// Calculate password strength (0-4)
export const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  
  let score = 0;
  
  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character type checks
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  
  // Normalize score to 0-4 range
  return Math.min(Math.floor(score / 1.5), 4);
};

// Get color and label for password strength
export const getPasswordStrengthInfo = (strength) => {
  switch (strength) {
    case 0:
      return { color: 'gray', label: 'None' };
    case 1:
      return { color: 'red', label: 'Weak' };
    case 2:
      return { color: 'orange', label: 'Fair' };
    case 3:
      return { color: 'yellow', label: 'Good' };
    case 4:
      return { color: 'green', label: 'Strong' };
    default:
      return { color: 'gray', label: 'None' };
  }
};

// Simulated password hashing function (in a real app, use bcrypt or similar)
export const hashPassword = (password) => {
  // This is a simple hash simulation for demo purposes only
  // In production, use a proper hashing library like bcrypt
  const hash = Array.from(password).reduce((a, b) => a + b.charCodeAt(0), 0) * 42;
  return `hashed_${hash}_${Date.now()}`;
};