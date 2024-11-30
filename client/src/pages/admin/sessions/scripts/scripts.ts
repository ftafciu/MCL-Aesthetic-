import { BACKEND_URL } from "../../../../constants/index";
import { logout } from "../../../authentication/scripts/login-scripts";

export const getSessions = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/session/all-sessions`, {
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
};

export const getSessionsByClient = async (navigator: any, message: any, clientId: string | null) => {
    const response = await fetch(`${BACKEND_URL}/session/${clientId}`, {
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
};

export const getSessionsByTimeRange = async (navigator: any, message: any, startDate: Date, endDate: Date) => {
    const startDate1 = new Date(startDate);
    const endDate1 = new Date(endDate);
    const response = await fetch(`${BACKEND_URL}/session/filter-by-date`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstDate: new Date(Date.UTC(startDate1.getFullYear(), startDate1.getMonth(), startDate1.getDate(), 0, 0, 0)),
            lastDate: new Date(Date.UTC(endDate1.getFullYear(), endDate1.getMonth(), endDate1.getDate(), 23, 59, 59))
        }),
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
};

export const getDailySessions = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/session/daily-sessions`, {
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
};

export const createSession = async (navigator: any, message: any, sessionType: string, sessionInfo: any) => {
    const theDate = new Date(sessionInfo.date);
    console.log(theDate);
    const response = await fetch(`${BACKEND_URL}/session/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sessionType, sessionInfo: {
                ...sessionInfo, date: new Date(Date.UTC(
                    theDate.getFullYear(),
                    theDate.getMonth(),
                    theDate.getDate(),
                    0,
                    0,
                    0
                ))
            }
        }),
        credentials: 'include'
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            message: 'Session created successfully!'
        });
        navigator('/sessions')
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
};

export const editSession = async () => {

};

export const deleteSession = async (navigator: any, message: any, sessionId: string, sessionType: string) => {
    const response = await fetch(`${BACKEND_URL}/session/delete/${sessionId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sessionType }),
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
};

export const getFinishedSessions = async (navigator: any, message: any, startDate: Date, endDate: Date) => {
    const startDate1 = new Date(startDate);
    const endDate1 = new Date(endDate);
    const response = await fetch(`${BACKEND_URL}/session/finished-sessions`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            startDate: new Date(Date.UTC(startDate1.getFullYear(), startDate1.getMonth(), startDate1.getDate(), 0, 0, 0)),
            endDate: new Date(Date.UTC(endDate1.getFullYear(), endDate1.getMonth(), endDate1.getDate(), 23, 59, 59))
        }),
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