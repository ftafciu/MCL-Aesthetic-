import { BACKEND_URL } from "../../../../constants/index";
import { logout } from "../../../authentication/scripts/login-scripts";

export const getExpenses = async (navigator: any, message: any) => {
    const response = await fetch(`${BACKEND_URL}/expenses/getAll`, {
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

export const getExpensesByTimeRange = async (navigator: any, message: any, startDate: Date, endDate: Date) => {
    const response = await fetch(`${BACKEND_URL}/expenses/getByTimeRange`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ firstDate: startDate, lastDate: endDate }),
        credentials: 'include'
    });
    if (response.status === 200) {
        return await response.json();
    } else if (response.status === 404) {
        return [];
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

const validateInfo = (name: string, quantity: number, date: Date, message: any) => {
    if(!name) {
        message.open({
            type: 'error',
            content: 'Expense name is missing!'
        })
        return false;
    } else if(!quantity) {
        message.open({
            type: 'error',
            content: 'You need to enter a price!'
        })
        return false;
    } else if(!date) {
        message.open({
            type: 'error',
            content: 'Please select the date!'
        })
        return false;
    }
    return true;
}

export const createExpense = async (navigator: any, message: any, name: string, quantity: number, date: Date, dependency: any) => {
    const response = await fetch(`${BACKEND_URL}/expenses/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, quantity, date }),
        credentials: 'include'
    });
    if (response.status === 201) {
        message.open({
            type: 'success',
            content: 'Expense created successfully!'
        });
        dependency(true);
    } else if (response.status === 401) {
        logout(navigator, message);
    } else {
        message.open({
            type: 'error',
            content: 'Something went wrong!'
        });
    }
}

export const deleteExpense = async (navigator: any, message: any, expenseId: string, dependency: any) => {
    console.log(expenseId);
    const response = await fetch(`${BACKEND_URL}/expenses/deleteExpense/${expenseId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
    if (response.status === 200) {
        message.open({
            type: 'success',
            content: 'Expense deleted successfully!'
        });
        dependency(true);
    } else if (response.status === 404) {
        message.open({
            type: 'error',
            content: 'Expense does not exist!'
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