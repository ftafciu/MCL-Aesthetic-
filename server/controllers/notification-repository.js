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

const changeNotificationStatus = async () => {

}

module.exports = {
    createNotification,
    getNotifications,
    changeNotificationStatus
}