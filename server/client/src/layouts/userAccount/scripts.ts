import { BACKEND_URL } from "../../constants";
import { logout } from "../../pages/authentication/scripts/login-scripts";

export const getMyData = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/login/user-info`, {
        method: "GET",
        headers: {
            'Content-type': "application/json"
        },
        credentials: "include"
    });
    if(response.status === 200) {
        return await response.json();
    } else if(response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!',
        });
    }
}