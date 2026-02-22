export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const isAdmin = () => {
  return localStorage.getItem("role") === "admin";
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
