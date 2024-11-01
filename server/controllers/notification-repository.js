const Notification = require("../models/notification");

const createNotification = async (notificationInfo) => {
    try {
        const newNotification = new Notification({ ...notificationInfo });
        await newNotification.save();
        return { result: true, message: "Notification created successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const getNotifications = async () => {
    try {
        const now = new Date();
        const startDate = new Date(
            Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                now.getHours(),
                now.getMinutes(),
                now.getSeconds()
            )
        );
        const endDate = startDate;
        endDate.setDate(endDate.getDate() + 2);
        const notifications = await Notification.find({
            nextSessionDate: {
                $gte: startDate,
                $lte: endDate
            }
        })
        return { result: true, notifications };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const changeNotificationStatus = async (notificationId) => {
    try {
        const edited = await Notification.findByIdAndUpdate(notificationId, { status: "cleared" });
        if (!edited) {
            throw new Error("The notification does not exist!");
        }
        return { result: true, message: "Notification cleared!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
}

const postponeNotification = async (notificationId, newDate) => {
    try {
        const edited = await Notification.findByIdAndUpdate(notificationId, { date: newDate });
        if (!edited) {
            throw new Error("The notification does not exist!");
        }
        return { result: true, message: "Notification postponed!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
}

module.exports = {
    createNotification,
    getNotifications,
    changeNotificationStatus,
    postponeNotification
}