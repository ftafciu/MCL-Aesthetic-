import { BACKEND_URL } from "../../../constants";
import { logout} from "../../authentication/scripts/login-scripts";

export const getNotifications = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/notifications/upcoming`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

export const changeStatus = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/notifications/changeStatus`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            content: 'Notification cleared successfully!'
        });
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

export const postponeNotification = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/notifications/postponeNotification`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            content: 'Notification postponed successfully!'
        });
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

