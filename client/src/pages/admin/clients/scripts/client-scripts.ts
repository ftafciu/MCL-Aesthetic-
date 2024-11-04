import { BACKEND_URL } from "../../../../constants/index";
import { logout } from "../../../authentication/scripts/login-scripts";

export const getClients = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/clients/all`, {
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

export const createClient = async (
    navigator: any,
    message: any,
    name: string,
    surname: string,
    email: string,
    phoneNumber: string,
    birthday: Date,
    bodyParts: any,
    faceTreatment: any
) => {
    const response = await fetch(`${BACKEND_URL}/clients/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            surname,
            email,
            phoneNumber,
            birthday,
            plannedTreatment: {
                plannedFaceTreatment: faceTreatment,
                plannedBodyParts: bodyParts,
                plannedBodyTreatment: false
            }
        }),
        credentials: 'include'
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            content: 'Expense created successfully!'
        });
        navigator("/client");
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        const responseMessage = await response.json();
        message.open({
            type: 'error',
            content: responseMessage.message
        });
    }
}

export const deleteClient = async (navigator: any, message: any, clientId: string, dependency: any) => {
    const response = await fetch(`${BACKEND_URL}/clients/${clientId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            content: 'Client deleted successfully!'
        });
        dependency(true);
    } else if (response.status === 404) {
        message.open({
            type: 'error',
            content: 'Client does not exist!'
        })
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

export const getClientData = async (navigator: any, message: any, clientId: string | undefined) => {
    const response = await fetch(`${BACKEND_URL}/clients/filter`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ filter: { _id: clientId } }),
        credentials: 'include'
    });
    if (response.status === 200) {
        const clients = await response.json();
        return clients[0];
    } else if (response.status === 404) {
        message.open({
            type: 'error',
            content: 'Client does not exist!'
        })
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

export const editClient = async (navigator: any, message: any, clientId: string | undefined, newInfo: any) => {
    const response = await fetch(`${BACKEND_URL}/clients/edit/${clientId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ newInfo }),
        credentials: 'include'
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            content: 'Client edited successfully!'
        });
        navigator("/client");
    } else if (response.status === 404) {
        message.open({
            type: 'error',
            content: 'Client does not exist!'
        })
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        const responseMessage = await response.json();
        message.open({
            type: 'error',
            content: responseMessage.message
        });
    }
}