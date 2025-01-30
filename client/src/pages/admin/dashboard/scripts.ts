import { BACKEND_URL } from "../../../constants";
import { logout } from "../../authentication/scripts/login-scripts";

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

export const changeStatus = async (navigator: any, message: any, notificationId: string) => {
    const response = await fetch(`${BACKEND_URL}/notifications/changeStatus`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ notificationId })
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

export const postponeNotification = async (navigator: any, message: any, notificationId: string, date: any) => {
    const theDate = new Date(date);
    const newDate = new Date(Date.UTC(theDate.getFullYear(), theDate.getMonth(), theDate.getDate()));
    const response = await fetch(`${BACKEND_URL}/notifications/postponeNotification`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ notificationId, newDate })
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            content: 'Notification postponed successfully!'
        });
        return true;
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

export const retrieveStats = async (navigator: any, message: any, statsType: string) => {
    const response = await fetch(`${BACKEND_URL}/stats/${statsType}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include'
    });
    if (response.status === 401) {
        logout(navigator, message);
    } else if (response.status === 200) {
        return await response.json();
    } else {
        message.open({
            type: 'error',
            content: "Something went wrong!"
        })
    }
}

export const filterProfits = async(navigator: any, message: any, startDate: Date, endDate: Date)=>{
    const response = await fetch(`${BACKEND_URL}/stats/time-range-profits`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({startDate, endDate})
    })
    if (response.status === 401) {
        logout(navigator, message);
    } else if (response.status === 200) {
        return await response.json();
    } else {
        message.open({
            type: 'error',
            content: "Something went wrong!"
        })
    }

}

export const filterExpenses = async(navigator: any, message: any, startDate: Date, endDate: Date)=>{
    const response = await fetch(`${BACKEND_URL}/stats/time-range-expenses`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({startDate, endDate})
    })
    if (response.status === 401) {
        logout(navigator, message);
    } else if (response.status === 200) {
        return await response.json();
    } else {
        message.open({
            type: 'error',
            content: "Something went wrong!"
        })
    }

}
