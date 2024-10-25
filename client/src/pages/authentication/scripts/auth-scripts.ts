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
    if (!pathname.includes("/auth/signin")) navigator("/auth/signin");
  } else if (response.status === 200) {
    const user = await response.json();
    if (!pathname.includes("/auth") && user.role === "client")
      navigator("/auth/signin");
    if (pathname.includes("/auth") && user.role === "admin")
      navigator("/dashboard");
  }
};