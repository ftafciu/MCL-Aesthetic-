import { BACKEND_URL } from "../../../constants/index";

export const authorize = async (navigator: any, pathname: string) => {
  const response = await fetch(`${BACKEND_URL}/auth/authorize`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.status === 401) {
    if (!pathname.includes("/auth")) navigator("/auth/signin");
  } else if (response.status === 200) {
    if (pathname.includes("/auth"))
      navigator("/dashboard");
  }
};

export const requestPassowrdChange = async (email: string) => {
  const response = await fetch(`${BACKEND_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email })
  });
  if (response.status === 200) {
    return true;
  }
  return false;
}

export const resetPassword = async (id: string | undefined, token: string | undefined, password: string) => {
  if (token && id) {
    const response = await fetch(`${BACKEND_URL}/auth/reset-password/${id}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ password })
    });
    if (response.status === 200) {
      return true;
    }
  }
  return false;
}