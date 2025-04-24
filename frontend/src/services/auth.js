export const register = async (name, email, password) => {
  return fetch("https://print-store.onrender.com/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((resp) => resp.json());
};

export const login = async (email, password) => {
  return fetch("https://print-store.onrender.com/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((resp) => resp.json());
};

export const logout = async () => {
  return fetch("https://print-store.onrender.com/auth/logout", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
};

// export const refresh = async () => {
//   return fetch("http://localhost:3000/auth/refresh", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((resp) => resp.json());
// };

// export const verify = async (token) => {
//   return fetch("http://localhost:3000/auth/verify", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ token }),
//   }).then((resp) => resp.json());
// };

export const resetPassword = async (token, password) => {
  return fetch("https://print-store.onrender.com/auth/reset-password", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, password }),
  }).then((resp) => resp.json());
};

export const changePassword = async (oldPassword, newPassword) => {
  return fetch("https://print-store.onrender.com/auth/change-password", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  }).then((resp) => resp.json());
};

// export const updateUser = async (name, email) => {
//   return fetch("http://localhost:3000/auth/update-user", {
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name, email }),
//   }).then((resp) => resp.json());
// };

// export const updateAvatar = async (avatar) => {
//   const formData = new FormData();
//   formData.append("avatar", avatar);
//   return fetch("http://localhost:3000/auth/update-avatar", {
//     method: "post",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     body: formData,
//   }).then((resp) => resp.json());
// };

// export const getUser = async () => {
//   return fetch("http://localhost:3000/auth/user", {
//     method: "get",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }).then((resp) => resp.json());
// };
