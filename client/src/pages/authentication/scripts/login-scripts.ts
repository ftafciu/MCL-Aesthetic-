import { BACKEND_URL } from "../../../constants/index";

export const login = async (navigation: any, message: any, gmail: string, password: string) => {
    if (gmail && password) {
        const response = await fetch(`${BACKEND_URL}/login/admin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ gmail, password }),
        });

        if (response.status === 200) {
            message.open({
                type: 'success',
                content: 'Login successful',
            });
            navigation("/dashboard");
        } else if (response.status === 404) {
            message.open({
                type: 'error',
                content: 'User does not exist!',
            });
        } else {
            message.open({
                type: 'error',
                content: 'Invalid credentials!',
            });
        }
    } else {
        message.open({
            type: 'error',
            content: 'Data is incomplete!',
        });
    }
};

export const logout = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/login/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (response.status === 200) {
        message.open({
            type: 'info',
            content: 'Logging out!',
        });
        navigator("/auth/signin");
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!',
        });
    }
};