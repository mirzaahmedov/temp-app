export const SESSION_KEY = "access_token";

export const setSession = (payload: unknown) => {
  if (!payload) {
    localStorage.removeItem(SESSION_KEY);
    return;
  }
  localStorage.setItem(SESSION_KEY, String(payload));
};

export const getSession = () => {
  return localStorage.getItem(SESSION_KEY);
};
