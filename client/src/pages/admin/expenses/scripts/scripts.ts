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
    const startDate1 = new Date(startDate);
    const endDate1 = new Date(endDate);
    const response = await fetch(`${BACKEND_URL}/expenses/getByTimeRange`, {
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

export const createExpense = async (navigator: any, message: any, name: string, quantity: number, date: Date, dependency: any) => {
    const tempDate = new Date(date);
    const response = await fetch(`${BACKEND_URL}/expenses/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, quantity, date: new Date(Date.UTC(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate(), tempDate.getHours(), tempDate.getMinutes(), tempDate.getSeconds())) }),
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